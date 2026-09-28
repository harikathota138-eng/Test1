import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Bus,
  Train,
  Plane,
  Car,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { TripInput, TravelPreference } from '../types/trip';

interface HeroSectionProps {
  onPlanTrip: (input: TripInput) => void;
  isLoading: boolean;
}

const POPULAR_ORIGINS = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'];
const POPULAR_DESTINATIONS = ['Goa', 'Manali', 'Jaipur', 'Araku Valley', 'Pondicherry', 'Kerala', 'Hyderabad'];
const QUICK_BUDGETS = [10000, 25000, 50000, 100000];
const QUICK_DAYS = [3, 4, 5, 7];
const QUICK_TRAVELERS = [1, 2, 4, 6];

export const HeroSection: React.FC<HeroSectionProps> = ({ onPlanTrip, isLoading }) => {
  const [from, setFrom] = useState('Hyderabad');
  const [to, setTo] = useState('Goa');
  const [travelers, setTravelers] = useState<number>(6);
  const [budget, setBudget] = useState<number>(10000);
  const [days, setDays] = useState<number>(4);
  const [travelPreference, setTravelPreference] = useState<TravelPreference>('Train');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!from.trim()) {
      setErrorMessage('Please enter your starting location.');
      return;
    }
    if (!to.trim()) {
      setErrorMessage('Please enter your dream destination.');
      return;
    }
    if (budget < 1000) {
      setErrorMessage('Please enter a realistic trip budget (at least ₹1,000).');
      return;
    }
    if (travelers < 1) {
      setErrorMessage('Travelers count must be at least 1.');
      return;
    }
    if (days < 1) {
      setErrorMessage('Trip duration must be at least 1 day.');
      return;
    }

    onPlanTrip({
      from: from.trim(),
      to: to.trim(),
      travelers,
      budget,
      days,
      travelPreference
    });
  };

  const travelModes: { id: TravelPreference; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'Train', label: 'Train', icon: <Train className="w-4 h-4" />, desc: 'Economical & scenic' },
    { id: 'Bus', label: 'Bus', icon: <Bus className="w-4 h-4" />, desc: 'Flexible AC sleepers' },
    { id: 'Flight', label: 'Flight', icon: <Plane className="w-4 h-4" />, desc: 'Fastest & premium' },
    { id: 'Car', label: 'Car', icon: <Car className="w-4 h-4" />, desc: 'Freedom & road trips' },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-10 sm:py-16">
      {/* Background Graphic elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-teal-900/90 via-slate-900/80 to-slate-950">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80"
          alt="Scenic travel background"
          className="w-full h-full object-cover mix-blend-overlay opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
        {/* Soft decorative glow circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Subtle anti-slop kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-200 text-xs sm:text-sm font-medium mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            <span>Smart Budget Intelligence & Day-Wise AI Planning</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Plan Your Perfect Trip with <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">AI</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Tell us your destination, budget and group size. We’ll calculate feasibility, break down expenses, and create a complete day-by-day itinerary.
          </p>

          {/* Quick value props */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Real-time budget feasibility</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Day-wise timeline itinerary</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Group expense splitter included</span>
            </span>
          </div>
        </div>

        {/* Large Trip Planning Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl border border-white/60 shadow-2xl p-6 sm:p-8 lg:p-10 text-slate-800 transition-all duration-300">
            {/* Form Top Accent */}
            <div className="absolute top-0 inset-x-8 h-1.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 rounded-t-3xl"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: From & To */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. From – Starting Location */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      1. From (Starting Location)
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="e.g. Hyderabad, Mumbai, Delhi..."
                      required
                      className="w-full pl-3.5 pr-8 py-3 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition text-sm font-semibold shadow-xs"
                    />
                  </div>
                  {/* Origin quick picks */}
                  <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-slate-400 font-medium">Popular:</span>
                    {POPULAR_ORIGINS.slice(0, 4).map((city) => (
                      <button
                        type="button"
                        key={city}
                        onClick={() => setFrom(city)}
                        className={`text-[11px] px-2 py-0.5 rounded transition ${
                          from === city
                            ? 'bg-teal-100 text-teal-800 font-bold'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. To – Destination */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-cyan-600" />
                      2. To (Destination)
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="e.g. Goa, Manali, Araku, Pondicherry..."
                      required
                      className="w-full pl-3.5 pr-8 py-3 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition text-sm font-semibold shadow-xs"
                    />
                  </div>
                  {/* Destination quick picks */}
                  <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-slate-400 font-medium">Trending:</span>
                    {POPULAR_DESTINATIONS.slice(0, 5).map((dest) => (
                      <button
                        type="button"
                        key={dest}
                        onClick={() => setTo(dest)}
                        className={`text-[11px] px-2 py-0.5 rounded transition ${
                          to === dest
                            ? 'bg-cyan-100 text-cyan-900 font-bold'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 2: Travelers, Total Budget, Number of Days */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* 3. Number of Travelers */}
                <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-2">
                    <Users className="w-3.5 h-3.5 text-teal-600" />
                    3. Travelers
                  </label>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 active:scale-95 flex items-center justify-center transition shadow-xs"
                      aria-label="Decrease travelers"
                    >
                      -
                    </button>
                    <div className="text-center flex-1">
                      <span className="text-xl font-extrabold text-slate-900">{travelers}</span>
                      <span className="text-[11px] text-slate-500 block font-medium">
                        {travelers === 1 ? 'Solo Adventurer' : `${travelers} People`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTravelers(travelers + 1)}
                      className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 active:scale-95 flex items-center justify-center transition shadow-xs"
                      aria-label="Increase travelers"
                    >
                      +
                    </button>
                  </div>
                  {/* Quick traveler shortcuts */}
                  <div className="mt-2.5 flex items-center justify-center gap-1.5 pt-1 border-t border-slate-200/60">
                    {QUICK_TRAVELERS.map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setTravelers(num)}
                        className={`text-[10px] px-2 py-0.5 rounded transition ${
                          travelers === num
                            ? 'bg-teal-600 text-white font-bold'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {num} {num === 1 ? 'Person' : 'People'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Total Budget */}
                <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                      4. Total Budget
                    </label>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={budget || ''}
                      onChange={(e) => setBudget(Math.max(0, parseInt(e.target.value) || 0))}
                      min="1000"
                      step="1000"
                      placeholder="10000"
                      required
                      className="w-full pl-7 pr-3 py-2 text-slate-900 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-base font-bold shadow-xs"
                    />
                  </div>
                  {/* Quick budget shortcuts */}
                  <div className="mt-2.5 flex items-center justify-between gap-1 pt-1 border-t border-slate-200/60 flex-wrap">
                    {QUICK_BUDGETS.map((amount) => (
                      <button
                        type="button"
                        key={amount}
                        onClick={() => setBudget(amount)}
                        className={`text-[10px] px-1.5 py-0.5 rounded transition ${
                          budget === amount
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        ₹{amount >= 100000 ? `${amount / 100000}L` : `${amount / 1000}k`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Number of Days */}
                <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    5. Number of Days
                  </label>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setDays(Math.max(1, days - 1))}
                      className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 active:scale-95 flex items-center justify-center transition shadow-xs"
                      aria-label="Decrease days"
                    >
                      -
                    </button>
                    <div className="text-center flex-1">
                      <span className="text-xl font-extrabold text-slate-900">{days}</span>
                      <span className="text-[11px] text-slate-500 block font-medium">
                        {days === 1 ? '1 Day Trip' : `${days} Days / ${days - 1} Nights`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDays(days + 1)}
                      className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 active:scale-95 flex items-center justify-center transition shadow-xs"
                      aria-label="Increase days"
                    >
                      +
                    </button>
                  </div>
                  {/* Quick days shortcuts */}
                  <div className="mt-2.5 flex items-center justify-center gap-1.5 pt-1 border-t border-slate-200/60">
                    {QUICK_DAYS.map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setDays(d)}
                        className={`text-[10px] px-2 py-0.5 rounded transition ${
                          days === d
                            ? 'bg-blue-600 text-white font-bold'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {d} Days
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 3: 6. Travel Preference */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-2.5">
                  <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                  6. Travel Preference
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {travelModes.map((mode) => {
                    const isSelected = travelPreference === mode.id;
                    return (
                      <button
                        type="button"
                        key={mode.id}
                        onClick={() => setTravelPreference(mode.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'border-teal-500 bg-teal-50/70 ring-2 ring-teal-500/30 text-teal-950 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`p-2 rounded-xl ${isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                            {mode.icon}
                          </span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{mode.label}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{mode.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Error Notification if any */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <span>⚠️ {errorMessage}</span>
                </div>
              )}

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 hover:from-teal-500 hover:via-cyan-500 hover:to-blue-500 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-xl shadow-teal-600/25 hover:shadow-teal-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing Feasibility & Building Itinerary...</span>
                    </>
                  ) : (
                    <>
                      <span>Plan My Trip ✈️</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Sample Preset Hint */}
              <div className="text-center pt-1">
                <p className="text-xs text-slate-500">
                  Try the popular test case:{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setFrom('Hyderabad');
                      setTo('Goa');
                      setTravelers(6);
                      setBudget(10000);
                      setDays(4);
                      setTravelPreference('Train');
                    }}
                    className="text-teal-700 font-semibold underline hover:text-teal-900 transition"
                  >
                    Goa Trip for 6 People with ₹10,000 Budget
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
