import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ChevronDown,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { FullTripPlan } from '../types/trip';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: 'n8n' | 'gemini' | 'fallback';
}

interface FloatingChatbotProps {
  currentPlan: FullTripPlan | null;
  externalPrompt?: string | null;
  onClearExternalPrompt?: () => void;
}

const DEFAULT_QUESTIONS = [
  'Can I visit Goa in ₹10,000?',
  'What should I carry?',
  'Which places are best for families?',
  'What food is famous here?',
  'Suggest a 3-day itinerary.',
  'How can I reduce my trip cost?'
];

export const FloatingChatbot: React.FC<FloatingChatbotProps> = ({
  currentPlan,
  externalPrompt,
  onClearExternalPrompt
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => `tripwise-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: "👋 Hi there! I'm your TripWise AI Travel Guide powered by n8n. Ask me anything about budgeting, packing, hidden local gems, or how to optimize your trip costs!",
      timestamp: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastSource, setLastSource] = useState<'n8n' | 'gemini' | 'fallback'>('n8n');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle external trigger (e.g. from dashboard banner)
  useEffect(() => {
    if (externalPrompt) {
      setIsOpen(true);
      handleSendMessage(externalPrompt);
      if (onClearExternalPrompt) {
        onClearExternalPrompt();
      }
    }
  }, [externalPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Build context object
    const tripContext = currentPlan
      ? {
          from: currentPlan.input.from,
          to: currentPlan.input.to,
          travelers: currentPlan.input.travelers,
          budget: currentPlan.input.budget,
          days: currentPlan.input.days,
          travelPreference: currentPlan.input.travelPreference,
          feasibilityStatus: currentPlan.feasibility.statusTitle,
          estimatedCost: currentPlan.feasibility.totalEstimatedCost
        }
      : null;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sessionId,
          tripContext,
          history: messages.slice(-4)
        })
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      const msgSource = data.source || 'n8n';
      setLastSource(msgSource);

      const assistantMsg: Message = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "I'm here to help! Could you please clarify your destination or budget?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: msgSource
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('Chat request failed, providing smart fallback response:', err);
      // Smart fallback
      const assistantMsg: Message = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: `✈️ **Smart Travel Tip:** For the best experience, reserve train berths 3-4 weeks in advance, rent local scooters for city travel (₹350/day), and ask hotel staff for local family-run eateries where food is delicious and 50% cheaper than tourist strips!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'fallback'
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  };


  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white font-bold text-sm shadow-2xl hover:shadow-teal-500/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Open AI Travel Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white"></span>
          </div>
          <span className="hidden sm:inline">Ask AI Assistant</span>
          <span className="sm:hidden">AI Guide</span>
          <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full font-bold">
            Chat
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] md:w-[420px] h-[540px] max-h-[85vh] rounded-3xl bg-white shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-700 via-cyan-700 to-blue-800 p-4 text-white flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-200" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base leading-tight">TripWise AI Assistant</h3>
                  <span className="text-[10px] bg-cyan-500/30 text-cyan-200 border border-cyan-400/30 px-1.5 py-0.2 rounded font-mono font-bold">
                    n8n
                  </span>
                </div>
                <span className="text-[11px] text-cyan-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Connected to n8n Webhook
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick context info banner if a trip is active */}
          {currentPlan && (
            <div className="bg-teal-50 px-3.5 py-1.5 border-b border-teal-100 flex items-center justify-between text-[11px] text-teal-800 font-medium">
              <span>Active Trip: <strong>{currentPlan.destinationOverview.name}</strong> ({currentPlan.input.days}d · {currentPlan.input.travelers}p)</span>
              <span className="font-bold">₹{currentPlan.input.budget.toLocaleString('en-IN')}</span>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-br-xs'
                      : 'bg-white border border-slate-200/80 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                  <div className="flex items-center justify-between gap-2 mt-1">
                    {msg.source && msg.sender === 'assistant' && (
                      <span className="text-[9px] font-mono px-1 rounded bg-slate-100 text-slate-500 font-semibold">
                        {msg.source === 'n8n' ? '⚡ n8n' : msg.source === 'gemini' ? '✨ Gemini' : '💡 TripWise'}
                      </span>
                    )}
                    <span
                      className={`block text-[9px] text-right flex-1 ${
                        msg.sender === 'user' ? 'text-teal-200' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 text-xs font-bold">
                  🤖
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl px-3.5 py-2 text-xs text-slate-500 flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[11px] ml-1">TripWise is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2 bg-white border-t border-slate-100 overflow-x-auto whitespace-nowrap space-x-1.5 flex shrink-0">
            {DEFAULT_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isTyping}
                className="inline-block text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-medium transition shrink-0 cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything (e.g. Can I visit in ₹10k?)..."
              disabled={isTyping}
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="p-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold disabled:opacity-40 hover:opacity-90 transition shadow-sm cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
