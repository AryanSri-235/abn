'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { PhotoItem } from '@/types';
import { Image as ImageIcon, PlusCircle, Maximize2, X } from 'lucide-react';

export const PhotosSection: React.FC = () => {
  const { data, setIsAdminOpen } = useData();
  const { photos } = data;

  const [activeLightbox, setActiveLightbox] = useState<PhotoItem | null>(null);

  return (
    <section id="photos" className="py-10 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Title */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-600" />
            <span>Photos & Project Gallery</span>
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Real on-site project installation images and product gallery.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActiveLightbox(photo)}
              className="bg-white border border-slate-200 hover:border-amber-500 rounded-lg overflow-hidden shadow-xs cursor-pointer group transition"
            >
              <div className="relative h-40 bg-white border-b border-slate-100 overflow-hidden flex items-center justify-center p-2">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <div className="bg-white text-slate-900 p-2 rounded-full shadow">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="p-2.5">
                <h3 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-amber-600 transition">
                  {photo.title}
                </h3>
                <span className="text-[10px] text-slate-500">{photo.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightbox && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xl p-4 relative space-y-3">
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-3 right-3 text-slate-500 hover:text-slate-900 text-lg font-bold"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-80 bg-white border border-slate-200 rounded overflow-hidden flex items-center justify-center p-2">
                <img
                  src={activeLightbox.image}
                  alt={activeLightbox.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div>
                <span className="text-amber-600 text-xs font-bold uppercase">{activeLightbox.category}</span>
                <h3 className="text-base font-bold text-slate-900">{activeLightbox.title}</h3>
                {activeLightbox.description && (
                  <p className="text-xs text-slate-600 mt-0.5">{activeLightbox.description}</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
