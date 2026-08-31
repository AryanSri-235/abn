'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Mail, CheckCircle2, X, Send, ShieldCheck } from 'lucide-react';

export const InquiryModal: React.FC = () => {
  const { inquiryProduct, setInquiryProduct, data, addInquiry } = useData();
  const { company } = data;

  const [submitted, setSubmitted] = useState(false);
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  if (!inquiryProduct) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !mobile) {
      alert('Please fill in your name and 10-digit mobile number.');
      return;
    }

    addInquiry({
      name,
      phone: mobile,
      notes: notes || 'Standard price quote requested.',
      productTitle: inquiryProduct.title,
      productCategory: inquiryProduct.category,
      productImage: inquiryProduct.image,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setInquiryProduct(null);
    setSubmitted(false);
    setMobile('');
    setName('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md sm:max-w-lg w-full p-6 shadow-2xl space-y-4 relative text-slate-900 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <div className="p-2.5 rounded-xl bg-[#383a7c]/10 text-[#383a7c] border border-[#383a7c]/20">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">Request Best Price Quote</h3>
            <p className="text-xs text-slate-500">Direct response from {company.name}</p>
          </div>
        </div>

        {/* Selected Product Card Summary */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
          <img
            src={inquiryProduct.image}
            alt={inquiryProduct.title}
            className="w-14 h-14 object-contain bg-white p-1 rounded-lg shrink-0 border border-slate-200 shadow-2xs"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[#383a7c] text-[10px] font-extrabold uppercase tracking-wide">{inquiryProduct.category}</span>
            <h4 className="font-bold text-slate-900 text-sm truncate">{inquiryProduct.title}</h4>
            <span className="text-emerald-700 font-extrabold text-xs">{inquiryProduct.price}</span>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-extrabold text-emerald-900">Quote Requested Successfully!</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Thank you <strong className="text-slate-900">{name}</strong>. Our engineering desk will contact you at <strong className="text-[#383a7c]">{mobile}</strong> with final pricing & technical details.
            </p>
            <button
              onClick={handleClose}
              className="bg-[#383a7c] hover:bg-[#2b2d63] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-xs cursor-pointer mt-2"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#383a7c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (For Price Quote) *</label>
              <input
                type="tel"
                required
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#383a7c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Quantity / Specific Requirements</label>
              <textarea
                rows={2.5}
                placeholder="Specify size, capacity, or location..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#383a7c]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Get Best Price Quote Now
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct supplier connection. Verified response.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
