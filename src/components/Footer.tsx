'use client';

import React from 'react';
import { useData } from '@/context/DataContext';
import { ShieldCheck, MapPin, Phone, Mail, Settings } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setIsAdminOpen } = useData();
  const { company } = data;

  return (
    <footer className="bg-slate-900 text-slate-400 py-10 text-xs w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white p-1 flex items-center justify-center border border-slate-700 shrink-0 overflow-hidden">
                <img
                  src={company.logo || '/images/img_3.JPG'}
                  alt={company.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-white text-sm">{company.name}</h3>
            </div>
            <p className="text-slate-400 text-xs">{company.tagline}</p>
            <div className="flex items-center gap-1 text-emerald-400 font-bold pt-1">
              <ShieldCheck className="w-4 h-4" /> GST Verified ({company.gstNumber})
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-xs mb-2">Quick Navigation</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><a href="#home" className="hover:text-amber-400">Home</a></li>
              <li><a href="#products" className="hover:text-amber-400">Products & Services</a></li>
              <li><a href="#about" className="hover:text-amber-400">About Us</a></li>
              <li><a href="#photos" className="hover:text-amber-400">Photos & Gallery</a></li>
              <li><a href="#contact" className="hover:text-amber-400">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-xs mb-2">Products & Services</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>Utility Pipeline Installation</li>
              <li>Steam Pipe Insulation Service</li>
              <li>Electric Suction Heater</li>
              <li>Fire Alarm System Service</li>
              <li>Industrial Chimney</li>
              <li>Chemical Storage Tank</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-xs mb-2">Contact Info</h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{company.city}, {company.state}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{company.phonePrimary}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{company.email}</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs gap-2">
          <span>© {new Date().getFullYear()} {company.name}. All Rights Reserved.</span>
          <span>Greater Noida, Uttar Pradesh, India</span>
        </div>
      </div>
    </footer>
  );
};
