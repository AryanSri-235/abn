'use client';

import React from 'react';
import { useData } from '@/context/DataContext';
import { Star, MessageSquareQuote, ShieldCheck, PlusCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { data, setIsAdminOpen } = useData();
  const { testimonials, company } = data;

  return (
    <section id="testimonials" className="py-16 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-amber-400 font-bold text-xs tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <MessageSquareQuote className="w-4 h-4" /> Client Feedback & Reviews
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              What Our <span className="text-amber-400">Clients Say</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Verified testimonials from project heads, plant managers, and procurement officers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl flex items-center gap-2">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <div>
                <div className="text-sm font-black text-white">{company.rating.toFixed(1)} / 5.0</div>
                <div className="text-[10px] text-slate-400">Overall Rating ({company.reviewCount} reviews)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500">{test.date}</span>
                </div>

                <p className="text-slate-300 text-sm italic leading-relaxed">
                  "{test.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span>{test.author}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xs text-amber-400 font-medium">{test.company}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
                  {test.author[0]}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
