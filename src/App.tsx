import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TripDashboard } from './components/TripDashboard';
import { PopularDestinationsSection } from './components/PopularDestinationsSection';
import { MyTripsView } from './components/MyTripsView';
import { ExpenseSplitterStandalone } from './components/ExpenseSplitterStandalone';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { FloatingChatbot } from './components/FloatingChatbot';
import { ToastContainer, ToastMessage } from './components/Toast';
import { TripInput, FullTripPlan } from './types/trip';
import { planTripEngine } from './utils/tripEngine';

type ViewMode = 'home' | 'planner' | 'destinations' | 'my-trips' | 'splitter' | 'about';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [currentPlan, setCurrentPlan] = useState<FullTripPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [savedTrips, setSavedTrips] = useState<FullTripPlan[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [externalChatPrompt, setExternalChatPrompt] = useState<string | null>(null);

  // Load saved trips from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tripwise_saved_trips');
      if (stored) {
        setSavedTrips(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read saved trips from localStorage:', e);
    }
  }, []);

  // Save trips to localStorage whenever updated
  const saveTripsToStorage = (trips: FullTripPlan[]) => {
    setSavedTrips(trips);
    try {
      localStorage.setItem('tripwise_saved_trips', JSON.stringify(trips));
    } catch (e) {
      console.warn('Could not write saved trips to localStorage:', e);
    }
  };

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      message,
      type
    };
    setToasts(prev => [...prev, newToast]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Generate / Plan Trip Handler
  const handlePlanTrip = async (input: TripInput) => {
    setIsLoading(true);

    try {
      // First attempt full server AI endpoint
      const response = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });

      if (!response.ok) {
        throw new Error('API server returned error, using fallback engine');
      }

      const plan: FullTripPlan = await response.json();
      setCurrentPlan(plan);
      setCurrentView('planner');
      showToast(`Trip plan generated for ${plan.destinationOverview.name}!`, 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.warn('Backend API unavailable or error; using local engine:', error);
      // Deterministic robust engine fallback
      const fallbackPlan = planTripEngine(input);
      setCurrentPlan(fallbackPlan);
      setCurrentView('planner');
      showToast(`Trip plan generated for ${fallbackPlan.destinationOverview.name}!`, 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsLoading(false);
    }
  };

  // Select alternative destination (from the smart alternatives card)
  const handleSelectAlternative = (newDestination: string) => {
    if (!currentPlan) return;
    const updatedInput: TripInput = {
      ...currentPlan.input,
      to: newDestination
    };
    handlePlanTrip(updatedInput);
  };

  // Save current trip to My Trips
  const handleSaveTrip = (plan: FullTripPlan) => {
    const existingIndex = savedTrips.findIndex(t => t.id === plan.id || (t.input.to === plan.input.to && t.input.budget === plan.input.budget));
    if (existingIndex >= 0) {
      showToast('This trip is already saved in My Trips!', 'info');
      return;
    }
    const updated = [plan, ...savedTrips];
    saveTripsToStorage(updated);
    showToast(`Saved "${plan.destinationOverview.name}" to My Trips!`, 'success');
  };

  // Delete saved trip
  const handleDeleteTrip = (id: string) => {
    const updated = savedTrips.filter(t => t.id !== id);
    saveTripsToStorage(updated);
    showToast('Trip removed from saved trips.', 'info');
  };

  // Quick Pick Destination from Catalog
  const handleQuickDestinationSelect = (destName: string, idealDays = 4, approxBudget = 15000) => {
    handlePlanTrip({
      from: currentPlan?.input.from || 'Hyderabad',
      to: destName,
      travelers: currentPlan?.input.travelers || 4,
      budget: approxBudget,
      days: idealDays,
      travelPreference: 'Train'
    });
  };

  const isCurrentTripSaved = currentPlan ? savedTrips.some(t => t.id === currentPlan.id) : false;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedTripsCount={savedTrips.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection onPlanTrip={handlePlanTrip} isLoading={isLoading} />
            <PopularDestinationsSection onSelectDestination={handleQuickDestinationSelect} />
          </>
        )}

        {currentView === 'planner' && (
          <>
            {currentPlan ? (
              <TripDashboard
                plan={currentPlan}
                onModifyTrip={() => {
                  setCurrentPlan(null);
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectAlternative={handleSelectAlternative}
                onSaveTrip={handleSaveTrip}
                isTripSaved={isCurrentTripSaved}
                onShowToast={showToast}
                onOpenChatWithPrompt={(prompt) => setExternalChatPrompt(prompt)}
              />
            ) : (
              <div className="py-8">
                <HeroSection onPlanTrip={handlePlanTrip} isLoading={isLoading} />
              </div>
            )}
          </>
        )}

        {currentView === 'destinations' && (
          <div className="pt-6">
            <PopularDestinationsSection onSelectDestination={handleQuickDestinationSelect} />
          </div>
        )}

        {currentView === 'my-trips' && (
          <MyTripsView
            savedTrips={savedTrips}
            onLoadTrip={(plan) => {
              setCurrentPlan(plan);
              setCurrentView('planner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              showToast(`Loaded "${plan.destinationOverview.name}" trip!`, 'info');
            }}
            onDeleteTrip={handleDeleteTrip}
            onGoToPlanner={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'splitter' && (
          <ExpenseSplitterStandalone />
        )}

        {currentView === 'about' && (
          <AboutView onGoToPlanner={() => setCurrentView('home')} />
        )}
      </main>

      {/* Floating AI Chatbot */}
      <FloatingChatbot
        currentPlan={currentPlan}
        externalPrompt={externalChatPrompt}
        onClearExternalPrompt={() => setExternalChatPrompt(null)}
      />

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onQuickDestination={handleQuickDestinationSelect}
      />
    </div>
  );
}
