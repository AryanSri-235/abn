'use client';

import React from 'react';
import { useData } from '@/context/DataContext';
import { Phone, Send, MapPin, CheckCircle2, User, Star } from 'lucide-react';

export const Header: React.FC = () => {
  const { data, setInquiryProduct } = useData();
  const { company } = data;

  return (
    <header className="bg-white border-b border-slate-200 w-full shadow-2xs">
      {/* Top Strip - Full Screen Width */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Sub-metadata */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Prominent Real Logo Badge */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white p-1.5 flex items-center justify-center border border-slate-200 shrink-0 shadow-sm overflow-hidden">
            <img
              src={company.logo || '/images/img_3.JPG'}
              alt={company.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {company.name}
            </h1>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-xs sm:text-sm text-slate-600 mt-1">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <MapPin className="w-4 h-4 text-slate-500" /> {company.city}
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> GST Verified
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <User className="w-4 h-4 text-slate-500" /> {company.yearsInBusiness} yrs
              </span>
              <span className="flex items-center gap-1.5 text-amber-600 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{company.rating.toFixed(1)}</span>
                <span className="text-slate-500 font-normal">({company.reviewCount})</span>
              </span>
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <a
            href={`tel:${company.phonePrimary}`}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 border-2 border-teal-600 text-teal-700 hover:bg-teal-50 font-bold px-6 py-3 rounded-lg text-xs sm:text-sm transition shadow-xs hover:shadow-md cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now</span>
          </a>
          <button
            onClick={() => setInquiryProduct(data.products[0] || null)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-3 rounded-lg text-xs sm:text-sm transition shadow-xs hover:shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Contact Supplier</span>
          </button>
        </div>

      </div>
    </header>
  );
};
