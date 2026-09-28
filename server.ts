import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { planTripEngine } from './src/utils/tripEngine';
import { TripInput } from './src/types/trip';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI if API key exists
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize Google GenAI SDK:', err);
  }
}

// Endpoint: POST /api/plan-trip
app.post('/api/plan-trip', async (req: Request, res: Response) => {
  try {
    const input: TripInput = req.body;
    if (!input || !input.to || !input.budget || !input.travelers || !input.days) {
      res.status(400).json({ error: 'Missing required trip parameters: to, budget, travelers, days' });
      return;
    }

    // Generate base verified deterministic plan with real calculation engine
    const basePlan = planTripEngine(input);

    // If Gemini is active, we can optionally enhance the personalized tips, highlights, or feasibility remarks
    if (ai) {
      try {
        const prompt = `You are TripWise AI, an expert travel strategist and budget optimizer.
Analyze this trip request:
- Origin: ${input.from || 'Not specified'}
- Destination: ${input.to}
- Travelers: ${input.travelers} people
- Total Budget: ₹${input.budget} INR
- Duration: ${input.days} days
- Travel Preference: ${input.travelPreference}

The base engine estimated total costs at ₹${basePlan.feasibility.totalEstimatedCost} (₹${basePlan.feasibility.costPerPerson} per person).
Feasibility status is: ${basePlan.feasibility.status}.

Provide a concise JSON object with:
1. "aiSummary": A 2-sentence encouraging summary of this trip from an expert travel curator perspective.
2. "budgetFeasibilityVerdict": A punchy 1-sentence verdict on whether this budget is comfortable, tight, or requires strict backpacker discipline.
3. "topHiddenGem": A unique local spot, secret sunset point, or lesser-known food delicacy in or near ${input.to}.
4. "costSavingHack": A realistic, actionable money-saving tip specifically for ${input.to} (e.g. transport pass, timing, local food area).

Respond ONLY with valid JSON. Do not wrap in markdown quotes if possible or just standard JSON.`;

        const geminiRes = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (geminiRes.text) {
          try {
            const aiData = JSON.parse(geminiRes.text.trim());
            if (aiData.budgetFeasibilityVerdict) {
              basePlan.feasibility.recommendationTip = `${aiData.budgetFeasibilityVerdict} ${aiData.costSavingHack ? `💡 Pro-Tip: ${aiData.costSavingHack}` : ''}`;
            }
            if (aiData.topHiddenGem) {
              basePlan.destinationOverview.tagline = `${basePlan.destinationOverview.tagline} • Hidden Gem: ${aiData.topHiddenGem}`;
            }
          } catch {
            // parsing failed, gracefully proceed with base plan
          }
        }
      } catch (aiErr) {
        console.warn('Gemini enhancement encountered an error; falling back to base engine:', aiErr);
      }
    }

    res.json(basePlan);
  } catch (error: any) {
    console.error('Error generating trip plan:', error);
    res.status(500).json({ error: error.message || 'Failed to generate trip plan' });
  }
});

// N8N Webhook URL configured by user
const N8N_CHAT_WEBHOOK_URL = process.env.N8N_CHAT_WEBHOOK_URL || 'https://harikathota07.app.n8n.cloud/webhook/71b6795a-3287-455e-a3cc-eed401a77692/chat';

// Endpoint: POST /api/chat
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, tripContext, history, sessionId } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const currentSessionId = sessionId || `tripwise-session-${Date.now()}`;

    // 1. Try sending directly to user's n8n AI Chat webhook
    if (N8N_CHAT_WEBHOOK_URL) {
      try {
        console.log(`Sending message to n8n chat webhook: ${N8N_CHAT_WEBHOOK_URL}`);
        
        // n8n Chat Trigger nodes commonly accept { chatInput, sessionId, action: 'sendMessage' } or { message }
        const n8nPayload = {
          action: 'sendMessage',
          chatInput: message,
          message: message,
          sessionId: currentSessionId,
          tripContext: tripContext || {},
          metadata: {
            source: 'TripWise AI Web App',
            timestamp: new Date().toISOString()
          }
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 second timeout

        const n8nResponse = await fetch(N8N_CHAT_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
          },
          body: JSON.stringify(n8nPayload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (n8nResponse.ok) {
          const contentType = n8nResponse.headers.get('content-type') || '';
          let n8nReply = '';

          if (contentType.includes('application/json')) {
            const data = await n8nResponse.json();
            // Handle various standard n8n output formats
            if (typeof data === 'string') {
              n8nReply = data;
            } else if (data.output) {
              n8nReply = typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
            } else if (data.text) {
              n8nReply = data.text;
            } else if (data.response) {
              n8nReply = data.response;
            } else if (data.reply) {
              n8nReply = data.reply;
            } else if (data.message && data.message !== 'Workflow was started' && data.message !== 'Error in workflow') {
              n8nReply = data.message;
            } else if (Array.isArray(data) && data[0]) {
              const first = data[0];
              n8nReply = first.output || first.text || first.response || first.reply || first.message || JSON.stringify(first);
            }
          } else {
            n8nReply = await n8nResponse.text();
          }

          if (n8nReply && n8nReply.trim() && !n8nReply.includes('Error in workflow')) {
            res.json({
              reply: n8nReply.trim(),
              source: 'n8n',
              sessionId: currentSessionId
            });
            return;
          }
        } else {
          console.warn(`n8n webhook returned status ${n8nResponse.status}`);
        }
      } catch (n8nErr: any) {
        console.warn('n8n webhook call failed or timed out, gracefully falling back to Gemini AI:', n8nErr.message);
      }
    }

    // 2. Fallback to Gemini AI if n8n returned error / unconfigured / timed out
    const contextPrompt = tripContext
      ? `You are TripWise AI, a friendly, enthusiastic, and highly knowledgeable travel assistant.
The user is currently planning or viewing a trip with the following parameters:
- Starting Location: ${tripContext.from || 'Flexible'}
- Destination: ${tripContext.to}
- Travelers: ${tripContext.travelers} people
- Total Budget: ₹${tripContext.budget} INR
- Trip Length: ${tripContext.days} days
- Travel Preference: ${tripContext.travelPreference}
- Feasibility Status: ${tripContext.feasibilityStatus || 'Analyzed'}
- Estimated Cost: ₹${tripContext.estimatedCost || 'Calculated'}

Your goal is to answer their travel questions in a friendly, practical, realistic, and helpful way.
Common topics include:
- Budget questions (e.g., "Can I visit Goa in ₹10,000?", "How to reduce costs?")
- Packing & essentials
- Best places for families vs couples vs friend groups
- Famous local cuisines and street food spots
- Itinerary suggestions and timings
- Safety tips and local transit advice

Keep your response nicely structured with bullet points or clean short paragraphs, friendly travel emojis, and actionable prices in INR (₹). Be concise (under 200 words unless they ask for a full day-by-day plan).`
      : `You are TripWise AI, a friendly, knowledgeable, and energetic travel assistant for planning trips across India and the world. Help users with destinations, budgets, itineraries, packing, food, and travel hacks with accurate, realistic advice in INR (₹).`;

    if (ai) {
      try {
        const fullPrompt = `${contextPrompt}

User question: "${message}"

Please respond warmly and directly:`;

        const geminiRes = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: fullPrompt,
        });

        const reply = geminiRes.text || 'I would love to help you plan that! Could you tell me a little more about your preferred travel dates or group style?';
        res.json({ reply, source: 'gemini', sessionId: currentSessionId });
        return;
      } catch (geminiErr: any) {
        console.warn('Gemini chat error, fallback to expert knowledge reply:', geminiErr);
      }
    }

    // 3. Smart verified fallback responses if both n8n and Gemini are unreachable
    const lower = message.toLowerCase();
    let reply = '';

    if (lower.includes('10,000') || lower.includes('10000') || lower.includes('budget') || lower.includes('reduce')) {
      reply = `✨ **Smart Budget Optimization for ₹10,000:**\n\n1. **Travel by Train:** Booking sleeper or 3AC trains saves both daytime hours and a whole night of hotel costs!\n2. **Group Homestays/Hostels:** Sharing 4-bed dorms or family suites drops accommodation to under ₹600-₹800/night per person.\n3. **Local Transport:** Rent scooters (₹350-₹450/day in Goa) instead of hailing private tourist taxis which charge 4x.\n4. **Street Food & Beach Shacks:** Iconic local joints offer delicious thalis for ₹150–₹250.\n\nWith these 4 rules, a 3-4 day trip is completely achievable! 🎒`;
    } else if (lower.includes('carry') || lower.includes('pack')) {
      reply = `🎒 **Smart Packing Checklist:**\n\n• **Documents:** Original Govt ID (Aadhaar/Driving License) + offline hotel bookings.\n• **Electronics:** High-capacity power bank (10,000mAh), charger & universal adapter.\n• **Clothing:** Breathable lightweight cottons/linens + comfortable walking sneakers.\n• **Sun & Health:** SPF 50+ sunscreen, polarized shades, personal meds (ORS, paracetamol).\n• **Cash:** Keep ₹2,000–₹3,000 liquid cash in small bills for auto rickshaws & street stalls!`;
    } else if (lower.includes('family') || lower.includes('families')) {
      reply = `👨‍👩‍👧‍👦 **Best Recommendations for Families:**\n\n• **Stay:** Look for resorts with swimming pools and complimentary breakfast in central, safe areas (like Candolim in North Goa or Benaulim in South Goa).\n• **Sightseeing:** Focus on spacious heritage forts with easy walking paths (Fort Aguada), calm swimming beaches (Calangute/Benaulim), and scenic boat cruises.\n• **Pacing:** Plan maximum 2 major spots per day to allow children and elders relaxing downtime.`;
    } else if (lower.includes('food') || lower.includes('famous')) {
      reply = `🍛 **Must-Try Local Food Highlights:**\n\n• Savor authentic regional seafood thalis (Goan Fish Curry, Pomfret Fry).\n• For breakfast: Hot Poi bread with Ros Omelette or classic freshly baked croissants.\n• Sweets: Don't miss traditional layered Bebinca dessert!\n• Visit busy heritage eateries where locals line up—you get the freshest food at honest local prices.`;
    } else {
      reply = `✈️ Great question! For your trip, balance is key: lock in your return train/flight tickets early, rent two-wheelers or split cabs among your group, and keep mornings open for major sights before the crowds arrive. Feel free to ask about specific places, budgeting, or packing!`;
    }

    res.json({ reply, source: 'fallback', sessionId: currentSessionId });
  } catch (error: any) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: error.message || 'Chat service encountered an error' });
  }
});


// Configure Vite or Static file serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TripWise AI server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
