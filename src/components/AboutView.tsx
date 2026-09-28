import React from 'react';
import { Compass, Sparkles, ShieldCheck, DollarSign, MapPin, Bot, CheckCircle2 } from 'lucide-react';

export const AboutView: React.FC<{ onGoToPlanner: () => void }> = ({ onGoToPlanner }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Hero Intro */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-blue-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-teal-500/20 mb-4">
          <Compass className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          About TripWise AI
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          TripWise AI is the next-generation intelligent travel companion built to eliminate vacation planning stress. We combine realistic travel cost algorithms with generative AI to make dream trips achievable on any budget.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold mb-4">
            <DollarSign className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Real Budget Feasibility Engine</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Unlike generic planners that give unrealistic advice, TripWise computes dynamic per-person benchmarks for transport, stays, dining, and activities to give an honest verdict: ✅ Feasible, ⚠️ Tight, or ❌ Exceeded.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Smart Alternative Destinations</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            If your target destination exceeds your group's budget (e.g. ₹10,000 for 6 people in high season), TripWise instantly recommends hidden gem alternatives like Araku, Pondicherry, or Hyderabad that fit your wallet.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
            <MapPin className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Day-by-Day Timeline Itineraries</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every itinerary is logically organized into Morning, Afternoon, Evening, and Night time slots with estimated entrance fees, optimal photography hours, and local pro tips.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
            <Bot className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">24/7 Contextual AI Strategist</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Our embedded AI travel assistant understands your active trip constraints, advising on safety, packing checklists, hidden street food gems, and money-saving train vs flight tradeoffs in real time.
          </p>
        </div>
      </div>

      {/* Tech Stack Callout */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold">Built for Modern Travelers & Groups</h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mt-2">
          Engineered with React 19, TypeScript, Tailwind CSS, Express, and Google Gemini AI for instant intelligence and responsive design.
        </p>
        <div className="mt-6">
          <button
            onClick={onGoToPlanner}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm shadow-lg hover:opacity-90 transition cursor-pointer"
          >
            Plan Your Next Adventure ✈️
          </button>
        </div>
      </div>
    </div>
  );
};
