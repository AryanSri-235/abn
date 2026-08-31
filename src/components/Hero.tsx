'use client';

import React, { useRef } from 'react';
import { useData } from '@/context/DataContext';
import { ChevronLeft, ChevronRight, ChevronDown, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { data, setInquiryProduct } = useData();
  const { products } = data;

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const aboutElem = document.getElementById('about');
    if (aboutElem) {
      aboutElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="bg-slate-100 min-h-[calc(100vh-170px)] flex flex-col justify-between py-6 sm:py-8 border-b border-slate-200 w-full relative">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative flex-1 flex flex-col justify-center gap-6">
        
        {/* Sleek Hero Title Banner in Upper Area */}
        <div className="text-center max-w-4xl mx-auto space-y-2 pt-2">
          <div className="inline-flex items-center gap-1.5 bg-[#383a7c]/10 text-[#383a7c] font-extrabold text-[11px] sm:text-xs px-3.5 py-1 rounded-full border border-[#383a7c]/25 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#383a7c]" />
            <span>Industrial Heating & Thermal Insulation Systems</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Featured Engineering Products & Solutions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Manufacturer & Service Provider of Mild Steel Storage Tanks, Industrial Heaters, Utility Pipelines, and Turnkey Thermal Insulation Services.
          </p>
        </div>

        {/* Carousel Container with Scroll Buttons */}
        <div className="relative w-full">
          {/* Scroll Left Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 border border-slate-300 text-slate-700 hover:text-slate-900 p-2.5 rounded-full shadow-lg hover:scale-110 transition backdrop-blur-xs cursor-pointer"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Scroll Right Button */}
          <button
            onClick={scrollRight}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 border border-slate-300 text-slate-700 hover:text-slate-900 p-2.5 rounded-full shadow-lg hover:scale-110 transition backdrop-blur-xs cursor-pointer"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Horizontal Scroll Cards Grid */}
          <div
            ref={scrollRef}
            className="flex items-center gap-4 overflow-x-auto scrollbar-none py-2 px-8 w-full"
          >
            {products.map((prod) => (
              <div
                key={prod.id}
                onClick={() => setInquiryProduct(prod)}
                className="w-64 sm:w-72 lg:w-80 shrink-0 h-72 sm:h-80 bg-white border border-slate-300 rounded-xl overflow-hidden relative group cursor-pointer shadow-xs hover:shadow-xl hover:border-[#383a7c] transition-all duration-300"
              >
                {/* Product Image */}
                <div className="w-full h-full bg-white overflow-hidden flex items-center justify-center p-3">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Bottom Dark Overlay Title Card */}
                <div className="absolute inset-x-0 bottom-0 bg-slate-900/90 backdrop-blur-xs text-white p-3.5 text-center border-t border-slate-700">
                  <h3 className="font-bold text-xs sm:text-sm text-white leading-tight line-clamp-2">
                    {prod.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Scroll Down Cue */}
      <div className="flex flex-col items-center justify-center pt-2 pb-1 text-slate-500 text-xs font-semibold">
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-1 hover:text-[#383a7c] transition cursor-pointer group"
        >
          <span>Scroll to Explore About Us</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
