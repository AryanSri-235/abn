'use client';

import React from 'react';
import { useData } from '@/context/DataContext';
import { Star } from 'lucide-react';

export const RatingsSection: React.FC = () => {
  const { data } = useData();
  const { company, testimonials } = data;

  const ratingsBreakdown = [
    { stars: 5, percentage: 100 },
    { stars: 4, percentage: 0 },
    { stars: 3, percentage: 0 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ];

  return (
    <section id="ratings" className="py-10 bg-slate-50 border-b border-slate-200 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 text-center">
        
        {/* Underlined Heading */}
        <div className="inline-block mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Ratings & Reviews</h2>
          <div className="w-16 h-1 bg-[#383a7c] mx-auto mt-1.5 rounded-full"></div>
        </div>

        {/* Rating Score Breakdown Card - Full Width */}
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-xl p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 border-b border-slate-200 pb-6">
            
            {/* Score Display */}
            <div className="text-center sm:border-r border-slate-200 sm:pr-12">
              <div className="text-5xl font-extrabold text-slate-900">
                {company.rating.toFixed(1)} <span className="text-base font-normal text-slate-500">/ 5</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 my-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">Based on {company.reviewCount} rating</p>
            </div>

            {/* Bars */}
            <div className="w-full sm:w-80 space-y-2 text-xs text-slate-600">
              {ratingsBreakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="w-6 font-bold text-slate-700">{row.stars} ★</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${row.percentage}%` }}
                    />
                  </div>
                  <span className="w-10 text-right font-medium text-slate-500">{row.percentage}%</span>
                </div>
              ))}
            </div>

          </div>

          {/* User Reviews */}
          {testimonials && testimonials.length > 0 && (
            <div className="text-left space-y-3">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Most Relevant Reviews</h4>
              {testimonials.map((test) => (
                <div key={test.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="font-bold text-slate-900">{test.author} ({test.location})</strong>
                    <div className="flex gap-0.5">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600">{test.comment}</p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
