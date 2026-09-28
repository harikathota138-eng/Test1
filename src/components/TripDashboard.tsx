import React, { useState } from 'react';
import {
  FullTripPlan,
  TravelOption,
  FamousPlace,
  DayItinerary,
  AccommodationOption,
  ExpenseItem,
  ChecklistItem,
  AlternativeDestination
} from '../types/trip';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  IndianRupee,
  Clock,
  Compass,
  Calendar,
  Users,
  MapPin,
  Utensils,
  Sun,
  CloudRain,
  Building,
  Share2,
  Bookmark,
  Printer,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  ShoppingBag,
  Luggage,
  ShieldAlert,
  SlidersHorizontal,
  DollarSign,
  TrendingDown,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TripDashboardProps {
  plan: FullTripPlan;
  onModifyTrip: () => void;
  onSelectAlternative: (destination: string) => void;
  onSaveTrip: (plan: FullTripPlan) => void;
  isTripSaved: boolean;
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
  onOpenChatWithPrompt?: (prompt: string) => void;
}

export const TripDashboard: React.FC<TripDashboardProps> = ({
  plan,
  onModifyTrip,
  onSelectAlternative,
  onSaveTrip,
  isTripSaved,
  onShowToast,
  onOpenChatWithPrompt
}) => {
  const { input, destinationOverview, feasibility, budgetBreakdown, travelOptions, famousPlaces, itinerary, accommodations, foodAndExperiences, weather, smartAlternatives } = plan;

  // Local state for interactive Packing Checklist
  const [checklist, setChecklist] = useState<ChecklistItem[]>(plan.packingChecklist);
  const [newChecklistText, setNewChecklistText] = useState('');

  // Local state for Group Expense Splitter
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    {
      id: 'e1',
      description: 'Advance Hotel / Homestay Booking',
      amount: Math.round(budgetBreakdown.accommodation * 0.5) || 3000,
      paidBy: 'Traveler 1',
      category: 'Stay',
      date: 'Day 1'
    },
    {
      id: 'e2',
      description: 'Train / Bus Travel Tickets',
      amount: Math.round(budgetBreakdown.transportation) || 4500,
      paidBy: 'Traveler 2',
      category: 'Transport',
      date: 'Pre-trip'
    },
    {
      id: 'e3',
      description: 'Group Welcome Dinner & Drinks',
      amount: 1800,
      paidBy: 'Traveler 1',
      category: 'Food',
      date: 'Day 1'
    },
    {
      id: 'e4',
      description: 'Local Scooters & Fuel',
      amount: 1200,
      paidBy: 'Traveler 3',
      category: 'Transport',
      date: 'Day 2'
    }
  ]);
  const [newExpDesc, setNewExpDesc] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');
  const [newExpPayer, setNewExpPayer] = useState('Traveler 1');
  const [newExpCategory, setNewExpCategory] = useState<'Transport' | 'Stay' | 'Food' | 'Activities' | 'Shopping' | 'Other'>('Food');

  // Active day in itinerary
  const [activeDay, setActiveDay] = useState<number>(1);

  // Trigger festive confetti if trip is feasible
  React.useEffect(() => {
    if (feasibility.status === 'feasible') {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if canvas not supported
      }
    }
  }, [feasibility.status]);

  // Handle Checklist Toggle
  const toggleChecklistItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const addCustomChecklistItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;
    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      text: newChecklistText.trim(),
      category: 'Essentials',
      checked: false
    };
    setChecklist(prev => [...prev, newItem]);
    setNewChecklistText('');
    onShowToast('Item added to packing checklist!', 'success');
  };

  // Handle Expense Add
  const addExpenseItem = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(newExpAmount);
    if (!newExpDesc.trim() || isNaN(amountVal) || amountVal <= 0) {
      onShowToast('Please enter a valid description and amount.', 'error');
      return;
    }
    const newExp: ExpenseItem = {
      id: `exp-${Date.now()}`,
      description: newExpDesc.trim(),
      amount: Math.round(amountVal),
      paidBy: newExpPayer,
      category: newExpCategory,
      date: `Day ${activeDay}`
    };
    setExpenses(prev => [newExp, ...prev]);
    setNewExpDesc('');
    setNewExpAmount('');
    onShowToast(`Added ₹${Math.round(amountVal)} paid by ${newExpPayer}`, 'success');
  };

  const removeExpenseItem = (id: string) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
  };

  // Group Expense Split Calculations
  const totalGroupExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const costPerMemberActual = Math.round(totalGroupExpenses / Math.max(1, input.travelers));

  // Calculate each member's paid amount
  const payersList = Array.from({ length: Math.min(8, input.travelers) }, (_, i) => `Traveler ${i + 1}`);
  const memberBalances = payersList.map(member => {
    const paid = expenses
      .filter(item => item.paidBy === member)
      .reduce((sum, item) => sum + item.amount, 0);
    const balance = paid - costPerMemberActual;
    return { member, paid, balance };
  });

  // Share handler
  const handleShareTrip = async () => {
    const shareData = {
      title: `TripWise AI: ${input.days}-Day ${input.to} Travel Plan`,
      text: `Check out our ${input.days}-day trip to ${input.to} for ${input.travelers} people! Total estimated budget: ₹${feasibility.totalEstimatedCost.toLocaleString('en-IN')}.`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        onShowToast('Trip plan shared successfully!', 'success');
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(
      `${shareData.title}\n${shareData.text}\nBudget: ₹${input.budget.toLocaleString('en-IN')}\nStatus: ${feasibility.statusTitle}\nPlan created on TripWise AI`
    );
    onShowToast('Trip summary copied to clipboard!', 'success');
  };

  // Download / Print Itinerary
  const handleDownloadItinerary = () => {
    window.print();
    onShowToast('Opening print/PDF export dialog...', 'info');
  };

  const completedChecklistCount = checklist.filter(i => i.checked).length;
  const checklistPercent = Math.round((completedChecklistCount / checklist.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 0. Top Destination Banner & Header Actions */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src={destinationOverview.heroImage}
            alt={destinationOverview.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>

          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/30">
              {destinationOverview.idealSeason}
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-500/80 backdrop-blur-md text-white text-xs font-semibold">
              {destinationOverview.vibe}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
            <div>
              <p className="text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                {input.from ? `${input.from} ➔ ${input.to}` : input.to} Trip Plan
              </p>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {destinationOverview.name} for {input.travelers} {input.travelers === 1 ? 'Traveler' : 'People'}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                {destinationOverview.tagline}
              </p>
            </div>

            {/* Quick Actions (Save, Share, Print, Re-plan) */}
            <div className="flex items-center gap-2 flex-wrap no-print">
              <button
                onClick={() => onSaveTrip(plan)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 shadow-sm ${
                  isTripSaved
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-white/90 text-slate-800 hover:bg-white'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isTripSaved ? 'Saved to My Trips' : 'Save Trip'}</span>
              </button>

              <button
                onClick={handleShareTrip}
                className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-white text-slate-800 text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 shadow-sm"
              >
                <Share2 className="w-4 h-4 text-slate-700" />
                <span>Share</span>
              </button>

              <button
                onClick={handleDownloadItinerary}
                className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-white text-slate-800 text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 shadow-sm"
                title="Download or Print full itinerary"
              >
                <Printer className="w-4 h-4 text-slate-700" />
                <span className="hidden sm:inline">Download Itinerary</span>
              </button>

              <button
                onClick={onModifyTrip}
                className="px-3.5 py-2 rounded-xl bg-teal-600/90 hover:bg-teal-500 text-white text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Edit Parameters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Trip Feasibility Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-xl text-sm font-bold border ${feasibility.statusBadge} flex items-center gap-1.5`}>
                {feasibility.status === 'feasible' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                {feasibility.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                {feasibility.status === 'exceeded' && <XCircle className="w-4 h-4 text-rose-600" />}
                {feasibility.statusTitle}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {input.days} Days · {input.travelers} Travelers · Via {input.travelPreference}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Trip Feasibility Analysis
            </h2>
            <p className="mt-1 text-slate-600 text-sm max-w-3xl leading-relaxed">
              {feasibility.message}
            </p>
          </div>

          {/* Cost per person highlight card */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">Approx Cost Per Person</span>
              <div className="text-2xl font-extrabold text-slate-900">
                ₹{feasibility.costPerPerson.toLocaleString('en-IN')}
                <span className="text-xs text-slate-500 font-normal ml-1">/ person</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar: Your Budget vs Estimated Trip Cost */}
        <div className="pt-6">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
            <span className="text-slate-600 flex items-center gap-1.5">
              <span>Your Budget:</span>
              <strong className="text-slate-900 font-bold">₹{input.budget.toLocaleString('en-IN')}</strong>
            </span>
            <span className="text-slate-600 flex items-center gap-1.5">
              <span>Estimated Trip Cost:</span>
              <strong className={`font-bold ${
                feasibility.status === 'feasible'
                  ? 'text-emerald-700'
                  : feasibility.status === 'warning'
                  ? 'text-amber-700'
                  : 'text-rose-700'
              }`}>
                ₹{feasibility.totalEstimatedCost.toLocaleString('en-IN')}
              </strong>
            </span>
          </div>

          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                feasibility.status === 'feasible'
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500'
                  : feasibility.status === 'warning'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-600'
                  : 'bg-gradient-to-r from-rose-500 to-red-600'
              }`}
              style={{
                width: `${Math.min(100, Math.max(10, (input.budget / feasibility.totalEstimatedCost) * 100))}%`
              }}
            ></div>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
            <p className="italic">
              {feasibility.recommendationTip}
            </p>
            {feasibility.status !== 'feasible' && (
              <a
                href="#alternatives"
                className="text-teal-700 font-bold hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>View Budget-Friendly Alternatives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 2. Budget Breakdown Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <IndianRupee className="w-6 h-6 text-teal-600" />
              Budget Breakdown
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Itemized estimated cost allocation across key travel categories.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-500 block">Total Estimated Cost</span>
            <span className="text-2xl font-extrabold text-slate-900">
              ₹{budgetBreakdown.total.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Transportation */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 hover:border-teal-300 transition">
            <span className="text-2xl mb-1 block">🚆</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Transport</span>
            <span className="text-lg font-extrabold text-slate-900 block mt-1">
              ₹{budgetBreakdown.transportation.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {Math.round((budgetBreakdown.transportation / budgetBreakdown.total) * 100)}% of total
            </span>
          </div>

          {/* Accommodation */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 hover:border-teal-300 transition">
            <span className="text-2xl mb-1 block">🏨</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Stay</span>
            <span className="text-lg font-extrabold text-slate-900 block mt-1">
              ₹{budgetBreakdown.accommodation.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {Math.round((budgetBreakdown.accommodation / budgetBreakdown.total) * 100)}% of total
            </span>
          </div>

          {/* Food */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 hover:border-teal-300 transition">
            <span className="text-2xl mb-1 block">🍛</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Food & Drinks</span>
            <span className="text-lg font-extrabold text-slate-900 block mt-1">
              ₹{budgetBreakdown.food.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {Math.round((budgetBreakdown.food / budgetBreakdown.total) * 100)}% of total
            </span>
          </div>

          {/* Local Transport */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 hover:border-teal-300 transition">
            <span className="text-2xl mb-1 block">🛵</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Local Transit</span>
            <span className="text-lg font-extrabold text-slate-900 block mt-1">
              ₹{budgetBreakdown.localTransport.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {Math.round((budgetBreakdown.localTransport / budgetBreakdown.total) * 100)}% of total
            </span>
          </div>

          {/* Activities */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 hover:border-teal-300 transition">
            <span className="text-2xl mb-1 block">🎟️</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Activities</span>
            <span className="text-lg font-extrabold text-slate-900 block mt-1">
              ₹{budgetBreakdown.activities.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {Math.round((budgetBreakdown.activities / budgetBreakdown.total) * 100)}% of total
            </span>
          </div>

          {/* Miscellaneous */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 hover:border-teal-300 transition">
            <span className="text-2xl mb-1 block">🛍️</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Buffer / Misc</span>
            <span className="text-lg font-extrabold text-slate-900 block mt-1">
              ₹{budgetBreakdown.miscellaneous.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {Math.round((budgetBreakdown.miscellaneous / budgetBreakdown.total) * 100)}% of total
            </span>
          </div>
        </div>
      </section>

      {/* 3. Travel Options Comparison */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-6 h-6 text-cyan-600" />
              Travel Options Comparison
            </h2>
            <span className="text-[11px] text-slate-400 bg-slate-100 px-3 py-1 rounded-full font-medium self-start sm:self-auto">
              *Approximate market estimates based on seasonal averages
            </span>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Compare duration, estimated costs for {input.travelers} people, and convenience ratings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {travelOptions.map((opt) => {
            const isUserChoice = opt.mode === input.travelPreference;
            return (
              <div
                key={opt.mode}
                className={`relative rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                  isUserChoice
                    ? 'border-teal-500 bg-teal-50/40 ring-2 ring-teal-500/20 shadow-sm'
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                }`}
              >
                {isUserChoice && (
                  <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-bold tracking-wider uppercase">
                    Your Preference
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{opt.icon}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
                      {opt.convenience}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900">{opt.title}</h3>
                  <div className="mt-2 text-2xl font-black text-slate-900">
                    ₹{opt.approxCost.toLocaleString('en-IN')}
                    <span className="text-xs font-semibold text-slate-500 block">
                      (₹{opt.approxCostPerPerson.toLocaleString('en-IN')} / person)
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-600 border-t border-slate-200/60 pt-3">
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <strong className="text-slate-700">{opt.duration}</strong>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Distance:</span>
                      <strong className="text-slate-700">{opt.distance}</strong>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Convenience:</span>
                      <strong className="text-slate-700">⭐ {opt.convenienceRating} / 5</strong>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                  <p className="text-emerald-700 font-medium">✓ {opt.pros[0]}</p>
                  {opt.cons[0] && <p className="text-rose-600">⚠ {opt.cons[0]}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Famous Places Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-teal-600" />
              Must-Visit Famous Places in {destinationOverview.name}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Hand-curated top attractions with entry details, best visiting hours, and activities.
            </p>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200/60 self-start sm:self-auto">
            {famousPlaces.length} Iconic Destinations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {famousPlaces.map((place) => (
            <div
              key={place.id}
              className="group rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
                  {place.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-bold shadow-xs">
                  {place.distance}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {place.description}
                  </p>

                  <div className="mt-3.5 space-y-1 text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Entry Fee:</span>
                      <strong className="text-slate-700 font-semibold">{place.entryFee}</strong>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Hours:</span>
                      <strong className="text-slate-700 font-semibold">{place.openingHours}</strong>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Best Time:</span>
                      <strong className="text-teal-700 font-semibold">{place.recommendedTime}</strong>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1">
                    {place.thingsToDo.map((thing, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md"
                      >
                        {thing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Day-Wise Itinerary (Timeline Design) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-teal-600" />
              Day-Wise Timeline Itinerary
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Structured step-by-step itinerary mapped across Morning, Afternoon, Evening, and Night.
            </p>
          </div>

          {/* Day selection tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full">
            {itinerary.map((day) => (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDay(day.dayNumber)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeDay === day.dayNumber
                    ? 'bg-white text-teal-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                Day {day.dayNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Day Timeline */}
        {itinerary.map((day) => {
          if (day.dayNumber !== activeDay) return null;
          return (
            <div key={day.dayNumber} className="space-y-6">
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-extrabold text-teal-950 text-base sm:text-lg">
                    {day.title}
                  </h3>
                  <p className="text-xs text-teal-800/90 mt-0.5 font-medium">
                    {day.theme}
                  </p>
                </div>
                <span className="text-xs font-bold text-teal-800 bg-white/80 px-3 py-1 rounded-full border border-teal-200 shrink-0 self-start sm:self-auto">
                  {day.activities.length} Scheduled Phases
                </span>
              </div>

              {/* Timeline Items */}
              <div className="relative pl-6 sm:pl-8 border-l-2 border-teal-200 space-y-6 sm:space-y-8 my-4">
                {day.activities.map((act, index) => {
                  const slotColors: Record<string, { bg: string; dot: string; text: string }> = {
                    Morning: { bg: 'bg-amber-100', dot: 'bg-amber-500', text: 'text-amber-800' },
                    Afternoon: { bg: 'bg-orange-100', dot: 'bg-orange-500', text: 'text-orange-800' },
                    Evening: { bg: 'bg-purple-100', dot: 'bg-purple-500', text: 'text-purple-800' },
                    Night: { bg: 'bg-indigo-100', dot: 'bg-indigo-500', text: 'text-indigo-800' }
                  };
                  const color = slotColors[act.timeSlot] || slotColors.Morning;

                  return (
                    <div key={index} className="relative group">
                      {/* Timeline Dot */}
                      <span className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-white ring-2 ring-teal-300 ${color.dot}`}></span>

                      <div className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/80 hover:border-teal-300 transition-all hover:shadow-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${color.bg} ${color.text}`}>
                              {act.timeSlot}
                            </span>
                            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {act.timeRange}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                            Est: {act.costEstimate}
                          </span>
                        </div>

                        <h4 className="text-base font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                          {act.title}
                        </h4>

                        <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {act.description}
                        </p>

                        <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-teal-600" />
                            <span>{act.location}</span>
                          </span>
                          {act.tips && (
                            <span className="text-teal-800 font-medium italic text-[11px]">
                              💡 {act.tips}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* 6. Accommodation Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-6 h-6 text-teal-600" />
            Accommodation Stays for {input.travelers} People
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Rates calculated for {Math.max(1, input.days - 1)} nights and {Math.ceil(input.travelers / 2)} rooms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accommodations.map((stay) => (
            <div
              key={stay.tier}
              className={`rounded-2xl p-6 border flex flex-col justify-between transition-all ${
                stay.isBestValue
                  ? 'border-teal-500 bg-teal-50/30 ring-2 ring-teal-500/20 shadow-md relative'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {stay.isBestValue && (
                <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-teal-600 text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
                  Best Fit For Your Budget
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                    {stay.tier}
                  </span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    ★ {stay.rating}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{stay.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{stay.bestFor}</p>

                <div className="mt-4 pt-4 border-t border-slate-200/60">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">
                      ₹{stay.pricePerNight.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500">/ room / night</span>
                  </div>
                  <div className="text-xs font-semibold text-teal-800 mt-1">
                    Total Stay: ₹{stay.totalStayCost.toLocaleString('en-IN')} for group
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  {stay.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 text-center">
                <span className="text-xs text-slate-400 font-medium">
                  Includes taxes, Wi-Fi & basic utilities
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Food & Local Experiences */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-teal-600" />
            Food, Local Delicacies & Cultural Experiences
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Approximate food cost: <strong className="text-slate-800">₹{foodAndExperiences.approxFoodCostPerDay}/day/person</strong>. Discover regional must-eats and immersive activities.
          </p>
        </div>

        {/* Famous Foods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {foodAndExperiences.famousFoods.map((food, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">{food.name}</h3>
                  <span className="text-xs font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded">
                    {food.approxCost}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{food.description}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Where to try:</span> {food.bestPlaces}
              </div>
            </div>
          ))}
        </div>

        {/* Local Experiences & Shopping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Local Experiences */}
          <div className="p-5 rounded-2xl bg-cyan-50/50 border border-cyan-200/60">
            <h3 className="font-bold text-cyan-950 text-sm mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              Recommended Local Experiences
            </h3>
            <div className="space-y-3">
              {foodAndExperiences.localExperiences.map((exp, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-cyan-100 text-xs shadow-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-0.5">
                    <span>{exp.title}</span>
                    <span className="text-cyan-700">{exp.estimatedCost}</span>
                  </div>
                  <p className="text-slate-600">{exp.description}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Duration: {exp.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shopping Suggestions */}
          <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200/60">
            <h3 className="font-bold text-teal-950 text-sm mb-3 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-teal-600" />
              Souvenir & Bazaar Shopping
            </h3>
            <div className="space-y-3">
              {foodAndExperiences.shoppingSuggestions.map((shop, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-teal-100 text-xs shadow-xs">
                  <h4 className="font-bold text-slate-900 mb-1">{shop.market}</h4>
                  <p className="text-slate-600"><strong className="text-slate-700">Items:</strong> {shop.items}</p>
                  <p className="text-teal-800 text-[11px] mt-1 font-medium">💡 {shop.tips}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Weather Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Sun className="w-6 h-6 text-amber-500" />
              Weather & Travel Advisory
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Current seasonal climate conditions and packing recommendations.
            </p>
          </div>
          <span className="text-[11px] text-slate-400 bg-slate-100 px-3 py-1 rounded-full font-medium">
            *Sample/estimated seasonal averages
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60 flex items-center gap-3">
            <Sun className="w-8 h-8 text-amber-500 shrink-0" />
            <div>
              <span className="text-xs text-amber-800 font-medium uppercase tracking-wider block">Temperature</span>
              <strong className="text-base sm:text-lg font-black text-slate-900">{weather.temperature}</strong>
            </div>
          </div>

          <div className="bg-cyan-50/60 p-4 rounded-2xl border border-cyan-200/60 flex items-center gap-3">
            <CloudRain className="w-8 h-8 text-cyan-500 shrink-0" />
            <div>
              <span className="text-xs text-cyan-800 font-medium uppercase tracking-wider block">Rain Possibility</span>
              <strong className="text-base sm:text-lg font-black text-slate-900">{weather.rainPossibility}</strong>
            </div>
          </div>

          <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-200/60 flex items-center gap-3">
            <Compass className="w-8 h-8 text-teal-600 shrink-0" />
            <div>
              <span className="text-xs text-teal-800 font-medium uppercase tracking-wider block">Condition</span>
              <strong className="text-base sm:text-lg font-black text-slate-900">{weather.condition}</strong>
            </div>
          </div>

          <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-200/60 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-purple-600 shrink-0" />
            <div>
              <span className="text-xs text-purple-800 font-medium uppercase tracking-wider block">Best Season</span>
              <strong className="text-sm font-black text-slate-900 block truncate">{weather.bestTimeToVisit}</strong>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Curated Climate Travel Tips:
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-600">
            {weather.travelTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Smart Alternative Destinations (Highlighted if budget exceeded or warning) */}
      <section
        id="alternatives"
        className={`rounded-3xl p-6 sm:p-8 shadow-sm border transition-all ${
          feasibility.status !== 'feasible'
            ? 'bg-gradient-to-br from-amber-50/90 via-white to-teal-50/60 border-amber-300 ring-2 ring-amber-400/20'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
              Smart AI Recommendation
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {feasibility.status !== 'feasible'
              ? 'Your budget may be tight for this destination. Here are great alternatives!'
              : 'Alternative Destinations that Fit Your Budget Perfectly'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Carefully curated destinations where your budget of ₹{input.budget.toLocaleString('en-IN')} gives you exceptional luxury and experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {smartAlternatives.map((alt) => (
            <div
              key={alt.id}
              className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={alt.image}
                  alt={alt.destination}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[11px] font-bold shadow-xs">
                  Save ~₹{alt.savings.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{alt.destination}</h3>
                  <span className="text-[11px] text-slate-500 font-medium block">{alt.stateOrCountry}</span>

                  <div className="mt-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-[11px] text-slate-400 block font-medium">Estimated Group Cost</span>
                    <strong className="text-base font-black text-slate-900">
                      ₹{alt.estimatedTotalCost.toLocaleString('en-IN')}
                    </strong>
                    <span className="text-[11px] text-emerald-700 font-semibold block">
                      (₹{alt.costPerPerson.toLocaleString('en-IN')} / person)
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                    <strong className="text-slate-700">Why it fits:</strong> {alt.whyItFits}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onSelectAlternative(alt.destination)}
                    className="w-full py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-600 hover:text-white text-teal-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Switch to {alt.destination}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Group Expense Splitter Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-teal-600" />
              Group Expense Splitter ({input.travelers} Members)
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Track who paid for what and see exact settlement balances per member.
            </p>
          </div>

          <div className="bg-teal-50 px-4 py-2.5 rounded-2xl border border-teal-200 text-left sm:text-right">
            <span className="text-xs text-teal-800 font-semibold block">Calculated Share Per Person</span>
            <span className="text-xl font-black text-teal-950">
              ₹{costPerMemberActual.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Member Balances Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          {memberBalances.map(({ member, paid, balance }) => (
            <div key={member} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-xs font-bold text-slate-700 block">{member}</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Paid: ₹{paid.toLocaleString('en-IN')}</span>
              <span className={`text-xs font-extrabold mt-1 block ${
                balance > 0
                  ? 'text-emerald-700'
                  : balance < 0
                  ? 'text-rose-600'
                  : 'text-slate-400'
              }`}>
                {balance > 0 ? `+₹${balance} (Gets)` : balance < 0 ? `-₹${Math.abs(balance)} (Owes)` : 'Settled'}
              </span>
            </div>
          ))}
        </div>

        {/* Add New Expense Form */}
        <form onSubmit={addExpenseItem} className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">
            Add New Expense
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <input
                type="text"
                value={newExpDesc}
                onChange={(e) => setNewExpDesc(e.target.value)}
                placeholder="Expense Description (e.g. Scuba gear, Dinner bill)"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">₹</span>
                <input
                  type="number"
                  value={newExpAmount}
                  onChange={(e) => setNewExpAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-full pl-6 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={newExpPayer}
                onChange={(e) => setNewExpPayer(e.target.value)}
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
              >
                {payersList.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs cursor-pointer shrink-0"
              >
                Add
              </button>
            </div>
          </div>
        </form>

        {/* Expenses List */}
        <div className="divide-y divide-slate-100 border-t border-slate-100 max-h-64 overflow-y-auto pr-1">
          {expenses.map((item) => (
            <div key={item.id} className="py-2.5 flex items-center justify-between gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                  {item.category}
                </span>
                <div>
                  <span className="font-semibold text-slate-900 block">{item.description}</span>
                  <span className="text-[11px] text-slate-400">Paid by {item.paidBy} · {item.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-slate-900">₹{item.amount.toLocaleString('en-IN')}</span>
                <button
                  onClick={() => removeExpenseItem(item.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition"
                  title="Remove expense"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Smart Packing Checklist Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Luggage className="w-6 h-6 text-teal-600" />
              Smart Packing Checklist for {destinationOverview.name}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Customized for {input.days} days duration and destination climate.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-teal-800">
              {completedChecklistCount} of {checklist.length} packed ({checklistPercent}%)
            </span>
            <div className="w-24 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-teal-500 transition-all duration-300"
                style={{ width: `${checklistPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Add custom item */}
        <form onSubmit={addCustomChecklistItem} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newChecklistText}
            onChange={(e) => setNewChecklistText(e.target.value)}
            placeholder="Add custom item (e.g. GoPro, Swimming Goggles)..."
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {checklist.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition cursor-pointer ${
                item.checked
                  ? 'bg-teal-50/70 border-teal-200 text-slate-500 line-through'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
              }`}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => {}}
                className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 pointer-events-none"
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs sm:text-sm font-semibold block leading-tight">{item.text}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-0.5">{item.category}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Floating AI chat launcher callout banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-cyan-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 text-2xl shrink-0">
            🤖
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg">Have Questions About {destinationOverview.name}?</h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Ask our AI Travel Assistant how to reduce costs, family safety, or where to find hidden local spots.
            </p>
          </div>
        </div>
        <button
          onClick={() => onOpenChatWithPrompt && onOpenChatWithPrompt(`Can I visit ${destinationOverview.name} in ₹${input.budget}?`)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold text-xs sm:text-sm hover:opacity-90 shadow-md cursor-pointer shrink-0"
        >
          Chat with TripWise AI 💬
        </button>
      </div>
    </div>
  );
};
