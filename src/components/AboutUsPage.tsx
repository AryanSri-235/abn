'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Building, MapPin, ShieldCheck, User, Award, Phone, Mail, FileText, Globe, Users, Calendar, Image as ImageIcon, Plus, X, Maximize2 } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { data, updateAbout, setInquiryProduct, setIsAdminOpen } = useData();
  const { company, about } = data;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAddImageOpen, setIsAddImageOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const companyImages = about.companyImages && about.companyImages.length > 0
    ? about.companyImages
    : ['/images/img_5.jpg', '/images/img_20.jpg', '/images/img_22.jpg'];

  const clienteleList = company.clientele && company.clientele.length > 0
    ? company.clientele
    : ['Indian Oil', 'HPCL', 'MPNL - Delhi'];

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;

    const updated = [...companyImages, newImageUrl.trim()];
    updateAbout({
      ...about,
      companyImages: updated,
    });
    setNewImageUrl('');
    setIsAddImageOpen(false);
  };

  return (
    <div className="bg-slate-100 min-h-screen py-8 border-b border-slate-200 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
        
        {/* Header Hero Banner */}
        <div className="bg-white border border-slate-300 rounded-xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-[#283593] font-bold text-xs px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-[#283593]" /> Official Company Profile
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              About {company.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              Leading Manufacturer and Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney, Utility Pipeline Installation, and Thermal Insulation Services since {about.establishedYear || 2011}.
            </p>
          </div>

          <button
            onClick={() => setInquiryProduct(data.products[0] || null)}
            className="bg-[#383a7c] hover:bg-[#2b2d63] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-xs transition shrink-0 flex items-center gap-2"
          >
            <Mail className="w-4 h-4" /> Send Business Inquiry
          </button>
        </div>

        {/* Corporate Overview & Infrastructure */}
        <div className="bg-white border border-slate-300 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#283593]" /> Corporate Overview & Infrastructure
          </h2>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Established in the year <strong>{about.establishedYear || 2011}</strong> at Greater Noida, Uttar Pradesh, 
            <strong> &quot;{company.name}&quot;</strong> is a Sole Proprietorship based firm, engaged as the foremost Manufacturer 
            and Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney, Utility Piping Installation, and Steam Pipe Thermal Insulation.
          </p>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {about.fullDescription || about.description}
          </p>
        </div>

        {/* SECTION 1: Company Album / Company Images */}
        <div className="bg-white border border-slate-300 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#283593]" />
              <h2 className="text-xl font-bold text-slate-900">Company Album & Images</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
            {companyImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className="bg-white border border-slate-300 rounded-lg overflow-hidden h-60 relative group cursor-pointer shadow-xs hover:shadow-md transition flex items-center justify-center p-2"
              >
                <img
                  src={img}
                  alt={`Company Photo ${index + 1}`}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-slate-900 font-bold text-xs px-3 py-1.5 rounded-md flex items-center gap-1 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" /> Enlarge Photo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Our Clientele */}
        <div className="bg-white border border-slate-300 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#283593]" /> Our Clientele
          </h2>
          <ul className="list-disc pl-6 text-sm text-slate-800 space-y-2 font-medium">
            {clienteleList.map((client, idx) => (
              <li key={idx} className="hover:text-[#283593] transition">{client}</li>
            ))}
          </ul>
        </div>

        {/* SECTION 3: Detailed Factsheet (Matching IndiaMART profile.html structure) */}
        <div className="bg-white border border-slate-300 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4">
            Factsheet
          </h2>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#283593] border-b border-slate-100 pb-2">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs sm:text-sm">
              <div className="flex items-start justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium w-48">Nature of Business</span>
                <span className="text-slate-900 font-bold text-right flex-1">{company.natureOfBusiness}</span>
              </div>

              <div className="flex items-start justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium w-48">Additional Business</span>
                <ul className="text-slate-900 font-bold text-right list-none space-y-0.5">
                  {(about.additionalBusiness || ["Retail Business", "Service Provision", "Works Contract", "Supplier of Services"]).map((b, i) => (
                    <li key={i}>• {b}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium w-48">Company CEO</span>
                <span className="text-slate-900 font-bold text-right flex-1">{about.ceoName || "Beena"}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium w-48">Total Number of Employees</span>
                <span className="text-slate-900 font-bold text-right flex-1">{company.employeeCount}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium w-48">GST Registration Date</span>
                <span className="text-slate-900 font-bold text-right flex-1">{company.gstRegistrationDate || "2017"}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium w-48">Legal Status of Firm</span>
                <span className="text-slate-900 font-bold text-right flex-1">{company.legalStatus}</span>
              </div>
            </div>
          </div>

          {/* Statutory Profile */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-lg font-bold text-[#283593] border-b border-slate-100 pb-2">
              Statutory Profile
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium w-48">GST No.</span>
                <span className="text-slate-900 font-bold font-mono text-right flex-1">{company.gstNumber}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl overflow-hidden max-w-4xl w-full shadow-2xl relative">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-sm text-slate-900">Company Image Preview</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-center min-h-[350px]">
              <img src={selectedImage} alt="Enlarged" className="max-h-[70vh] max-w-full object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* Add Company Image Modal */}
      {isAddImageOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900">Add Company Album Image</h3>
              <button onClick={() => setIsAddImageOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddImage} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL / Local Asset Path</label>
                <input
                  type="text"
                  placeholder="/images/img_5.jpg or https://..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-slate-800 focus:outline-none focus:border-[#383a7c]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddImageOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold transition"
                >
                  Add Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
