import React from 'react';
import { Compass, Heart, Github, Twitter, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'planner' | 'destinations' | 'my-trips' | 'splitter' | 'about') => void;
  onQuickDestination: (dest: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onQuickDestination }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs sm:text-sm border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">TripWise AI</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              AI-driven travel planner and budget feasibility engine. Plan full itineraries, compare transport options, and split expenses seamlessly.
            </p>
            <p className="text-[11px] text-slate-500">
              Made with precision for explorers, families & travel groups.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-3">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('planner')} className="hover:text-white transition">
                  Plan Trip
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-white transition">
                  Popular Destinations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('splitter')} className="hover:text-white transition">
                  Group Expense Splitter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('my-trips')} className="hover:text-white transition">
                  Saved Trips
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition">
                  About TripWise AI
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Places */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-3">Popular Spots</h4>
            <ul className="space-y-2 text-xs">
              {['Goa Beaches', 'Manali Snow Valley', 'Jaipur Pink City', 'Araku Valley', 'Pondicherry French Quarter', 'Hyderabad Nizami Trail'].map((spot) => (
                <li key={spot}>
                  <button
                    onClick={() => onQuickDestination(spot.split(' ')[0])}
                    className="hover:text-cyan-400 transition text-left"
                  >
                    {spot}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: AI Travel Features */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-3">AI Capabilities</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>✓ Real-Time Budget Feasibility Check</li>
              <li>✓ Dynamic Accommodation Tiers</li>
              <li>✓ Smart Low-Budget Alternatives</li>
              <li>✓ Multi-Day Timeline Itineraries</li>
              <li>✓ Interactive Packing Checklist</li>
              <li>✓ 24/7 Contextual Travel Assistant</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} TripWise AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 transition cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-400 transition cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-slate-400 transition cursor-pointer">Travel API Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
