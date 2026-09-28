import React, { useState } from 'react';
import { POPULAR_DESTINATIONS, PopularDestination } from '../data/popularDestinations';
import { Compass, Search, Star, Clock, IndianRupee, ArrowRight, Sparkles } from 'lucide-react';

interface PopularDestinationsSectionProps {
  onSelectDestination: (destName: string, idealDays?: number, approxBudget?: number) => void;
}

export const PopularDestinationsSection: React.FC<PopularDestinationsSectionProps> = ({
  onSelectDestination,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Trending', 'Budget-Friendly', 'Beach & Coastal', 'Hills & Nature', 'Heritage & Culture'];

  const filteredDestinations = POPULAR_DESTINATIONS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.stateOrCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bestFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="destinations-section" className="py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Explore Top Hand-Curated Getaways</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Popular & Trending Destinations
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl">
              Choose from sun-kissed beaches, Himalayan mountain escapes, and regal heritage cities tailored for smart budget travelers.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination, hills, beaches..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none shadow-xs"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                <div className="absolute top-3.5 left-3.5 flex gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                    {dest.category}
                  </span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-xl font-extrabold text-white leading-tight">{dest.name}</h3>
                    <p className="text-xs text-slate-300 font-medium">{dest.stateOrCountry}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/90 backdrop-blur text-slate-950 font-black text-xs px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{dest.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {dest.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>Ideal: <strong>{dest.idealDays} Days</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Starts: <strong>₹{dest.startingPrice.toLocaleString('en-IN')}</strong></span>
                    </div>
                  </div>

                  <div className="mt-3 bg-slate-50 p-2 rounded-xl text-[11px] text-slate-700">
                    <span className="font-bold text-teal-800">Best for: </span>
                    {dest.bestFor}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onSelectDestination(dest.name, dest.idealDays, dest.startingPrice * 3)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-teal-500/20"
                  >
                    <span>Plan Trip to {dest.name} ✈️</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
