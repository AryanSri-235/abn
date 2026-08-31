'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { HandCoins, Scale, Users, FileCheck, Building } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data } = useData();
  const { company, about } = data;

  const [isExpanded, setIsExpanded] = useState(false);

  const specBadges = [
    {
      title: "Nature of Business",
      value: company.natureOfBusiness,
      icon: HandCoins,
    },
    {
      title: "Legal Status of Firm",
      value: company.legalStatus,
      icon: Scale,
    },
    {
      title: "Total Number of Employees",
      value: company.employeeCount,
      icon: Users,
    },
    {
      title: "GST Number",
      value: company.gstNumber,
      icon: FileCheck,
    },
    {
      title: "GST Registration Date",
      value: company.gstRegistrationDate || "2017",
      icon: Building,
    },
  ];

  return (
    <section id="about" className="py-10 bg-white border-b border-slate-200 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 text-center">
        
        {/* Underlined Heading */}
        <div className="inline-block mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">About Us</h2>
          <div className="w-16 h-1 bg-[#383a7c] mx-auto mt-1.5 rounded-full"></div>
        </div>

        {/* Narrative Description */}
        <div className="max-w-5xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed mb-8">
          <p>
            {isExpanded && about.fullDescription ? about.fullDescription : about.description}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#383a7c] font-bold text-xs mt-2 hover:underline inline-block"
          >
            {isExpanded ? '- Show Less' : '+ Read More'}
          </button>
        </div>

        {/* 5 Circular Icon Badges - Full Width Row */}
        <div className="flex flex-wrap items-center justify-evenly gap-6 sm:gap-8 pt-4 border-t border-slate-100 max-w-6xl mx-auto">
          {specBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="flex flex-col items-center min-w-[140px] text-center">
                <div className="w-16 h-16 rounded-full bg-[#f0f3fa] text-[#383a7c] flex items-center justify-center mb-2.5 shadow-2xs hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">{badge.title}</span>
                <strong className="text-xs sm:text-sm text-slate-900 font-bold mt-0.5 leading-snug">
                  {badge.value}
                </strong>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
