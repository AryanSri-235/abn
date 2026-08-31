'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface NavigationProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  searchQuery,
  setSearchQuery,
  activeSection,
  setActiveSection,
}) => {

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products & Services' },
    { id: 'about', label: 'About Us' },
    { id: 'photos', label: 'Photos' },
    { id: 'ratings', label: 'Ratings & Reviews' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-[#e7eaf5] border-b border-slate-300 sticky top-0 z-30 shadow-md w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col md:flex-row items-center justify-between gap-3 py-2.5 sm:py-3">
        
        {/* Navigation Tabs */}
        <div className="flex items-center overflow-x-auto w-full md:w-auto scrollbar-none gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-6 sm:px-8 py-3 text-xs sm:text-sm font-extrabold whitespace-nowrap transition rounded-md ${
                  isActive
                    ? 'bg-[#383a7c] text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Search Input */}
        <div className="flex items-center gap-3 w-full md:w-96 lg:w-[400px]">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Products/Services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 pl-10 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#383a7c] shadow-2xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 sm:top-3.5" />
          </div>
        </div>

      </div>
    </nav>
  );
};
