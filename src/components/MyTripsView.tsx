import React from 'react';
import { FullTripPlan } from '../types/trip';
import { Bookmark, Calendar, Users, IndianRupee, Trash2, ArrowRight, Compass } from 'lucide-react';

interface MyTripsViewProps {
  savedTrips: FullTripPlan[];
  onLoadTrip: (plan: FullTripPlan) => void;
  onDeleteTrip: (id: string) => void;
  onGoToPlanner: () => void;
}

export const MyTripsView: React.FC<MyTripsViewProps> = ({
  savedTrips,
  onLoadTrip,
  onDeleteTrip,
  onGoToPlanner,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Bookmark className="w-8 h-8 text-teal-600" />
            My Saved Trips
          </h1>
          <p className="mt-1 text-slate-600 text-sm">
            Saved trip itineraries, budget breakdowns, and feasibility records.
          </p>
        </div>

        <button
          onClick={onGoToPlanner}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm shadow-md hover:opacity-90 transition cursor-pointer self-start sm:self-auto"
        >
          + Plan New Trip
        </button>
      </div>

      {savedTrips.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4 text-3xl">
            🎒
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Saved Trips Yet</h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 mb-6">
            Whenever you generate a trip to Goa, Manali, Araku, or any dream destination, click the "Save Trip" button to keep it here.
          </p>
          <button
            onClick={onGoToPlanner}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition cursor-pointer"
          >
            Plan Your First Trip Now ✈️
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map((trip) => (
            <div
              key={trip.id}
              className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={trip.destinationOverview.heroImage}
                  alt={trip.destinationOverview.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${trip.feasibility.statusBadge}`}>
                    {trip.feasibility.statusTitle}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 text-white">
                  <h3 className="text-xl font-bold leading-tight">{trip.destinationOverview.name}</h3>
                  <span className="text-xs text-slate-300">Saved on {new Date(trip.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <strong className="text-slate-800">{trip.input.days} Days</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Travelers:</span>
                    <strong className="text-slate-800">{trip.input.travelers} People</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Budget:</span>
                    <strong className="text-slate-800">₹{trip.input.budget.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Estimated Cost:</span>
                    <strong className="text-teal-700">₹{trip.feasibility.totalEstimatedCost.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onLoadTrip(trip)}
                    className="flex-1 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteTrip(trip.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    title="Delete Saved Trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
