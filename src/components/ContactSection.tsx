'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data } = useData();
  const { company } = data;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-10 bg-white border-b border-slate-200 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Contact Us & Send Inquiry
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Get instant price quote directly from {company.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Contact Details */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4 text-xs">
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Company Address</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{company.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Call Numbers</h4>
                  <div className="text-slate-700 mt-0.5 space-y-0.5">
                    <div><a href={`tel:${company.phonePrimary}`} className="hover:text-emerald-700 font-bold">{company.phonePrimary}</a></div>
                    <div><a href={`tel:${company.phoneSecondary}`} className="hover:text-emerald-700">{company.phoneSecondary}</a></div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Email Address</h4>
                  <a href={`mailto:${company.email}`} className="text-slate-700 hover:text-blue-700 font-medium">
                    {company.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                <Clock className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Working Hours</h4>
                  <p className="text-slate-600">Mon - Sat: 09:00 AM - 07:00 PM</p>
                </div>
              </div>

            </div>

            {/* Quick Action */}
            <div className="bg-slate-900 text-white rounded-lg p-4 flex items-center justify-between gap-3 shadow-sm">
              <div>
                <div className="text-xs font-bold text-amber-400">Need Urgent Response?</div>
                <div className="text-xs text-slate-300">Message on WhatsApp directly</div>
              </div>
              <a
                href={`https://wa.me/${company.whatsapp}?text=Hello%20ABN%20Thermocare%20System,%20I%20need%20a%20quote.`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded transition flex items-center gap-1.5 shrink-0"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7">
            <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Tell Us What You Need</h3>
              <p className="text-xs text-slate-500 mb-4">We will send product price details to your mobile number.</p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded p-6 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-900 text-base">Inquiry Submitted!</h4>
                  <p className="text-xs text-slate-600">
                    Thank you {formData.name}. Our representative will contact you shortly on {formData.phone}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#383a7c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#383a7c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#383a7c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Requirement Details *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe your project requirement..."
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#383a7c]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 rounded shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" /> Submit Requirement
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
