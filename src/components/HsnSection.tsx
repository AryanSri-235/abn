'use client';

import React from 'react';
import { useData } from '@/context/DataContext';

export const HsnSection: React.FC = () => {
  const { data } = useData();
  const { hsnCodes } = data;

  return (
    <section id="hsn" className="py-10 bg-white border-b border-slate-200 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 text-center">
        
        {/* Underlined Heading */}
        <div className="inline-block mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Deals in HSN Code</h2>
          <div className="w-16 h-1 bg-[#383a7c] mx-auto mt-1.5 rounded-full"></div>
        </div>

        {/* HSN Table - Full Width */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs text-left max-w-6xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#2b388f] text-white font-bold text-left">
                  <th className="py-3.5 px-6 w-36 border-r border-indigo-800">HSN Code</th>
                  <th className="py-3.5 px-6">HSN Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {hsnCodes && hsnCodes.length > 0 ? (
                  hsnCodes.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-slate-800 border-r border-slate-200 align-top">
                        {item.code}
                      </td>
                      <td className="py-3.5 px-6 text-slate-700 leading-relaxed align-top">
                        {item.description}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="py-4 text-center text-slate-500">
                      No HSN codes available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
