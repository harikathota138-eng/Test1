import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, BookmarkCheck, Calculator, Sparkles, MapPin, Info } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'planner' | 'destinations' | 'my-trips' | 'splitter' | 'about') => void;
  currentView: string;
  savedTripsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  currentView,
  savedTripsCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'planner', label: 'Plan Trip' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'splitter', label: 'Expense Splitter' },
    { id: 'my-trips', label: 'My Trips', badge: savedTripsCount > 0 ? savedTripsCount : null },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id as any);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/70 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5 animate-[spin_12s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                  TripWise
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block tracking-wide">
                Smart Travel & Budget Planner
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-teal-700 bg-teal-50/80 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-teal-600 text-white">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('planner')}
              className="relative inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white transition-all bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-xl shadow-md hover:shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Plan My Trip ✈️</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => handleNavClick('planner')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg shadow-sm"
            >
              Plan Trip ✈️
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus-visible:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-1 animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg text-left ${
                  isActive
                    ? 'text-teal-700 bg-teal-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-teal-600 text-white">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
