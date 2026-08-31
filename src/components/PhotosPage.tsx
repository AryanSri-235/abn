'use client';

import React, { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { PhotoItem } from '@/types';
import { Database, Maximize2, X, Send, Image as ImageIcon, RefreshCw } from 'lucide-react';

export const PhotosPage: React.FC = () => {
  const { data, refreshPhotosFromDb, setInquiryProduct } = useData();
  const { photos, company } = data;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    refreshPhotosFromDb();
  }, []);

  const categories = ['All', ...Array.from(new Set(photos.map((p) => p.category)))];

  const filteredPhotos = selectedCategory === 'All'
    ? photos
    : photos.filter((p) => p.category === selectedCategory);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshPhotosFromDb();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="bg-slate-100 min-h-screen py-6 border-b border-slate-200 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-6">
        
        {/* Header Strip */}
        <div className="bg-white p-5 border border-slate-300 rounded-lg shadow-2xs">
          <h1 className="text-2xl font-bold text-slate-900">Photos Gallery</h1>
          <p className="text-xs text-slate-500 mt-1">
            Explore high-resolution project execution photos of {company.name} across all engineering divisions
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-3 border border-slate-300 rounded-lg shadow-2xs text-xs">
          <span className="font-bold text-slate-500 mr-2">Filter Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-bold transition ${
                selectedCategory === cat
                  ? 'bg-[#383a7c] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col group"
            >
              {/* Image Box */}
              <div
                onClick={() => setSelectedPhoto(photo)}
                className="w-full h-52 bg-white border-b border-slate-100 relative overflow-hidden flex items-center justify-center p-2 cursor-pointer"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>

              {/* Card Meta Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="inline-block text-[10px] font-bold text-[#283593] bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 mb-1">
                    {photo.category}
                  </span>
                  <h3 className="font-bold text-xs text-slate-900 line-clamp-2">{photo.title}</h3>
                  {photo.description && (
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{photo.description}</p>
                  )}
                </div>

                <button
                  onClick={() =>
                    setInquiryProduct({
                      id: photo.id,
                      title: photo.title,
                      category: photo.category,
                      description: photo.description || photo.title,
                      image: photo.image,
                      price: 'Ask Price',
                      available: true,
                    })
                  }
                  className="w-full mt-2 border border-teal-600 text-teal-700 hover:bg-teal-50 font-bold text-xs py-1.5 rounded transition shadow-2xs flex items-center justify-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" /> Ask Price
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="bg-white p-12 text-center rounded-lg border border-slate-300 text-slate-500 space-y-2">
            <ImageIcon className="w-10 h-10 mx-auto text-slate-400" />
            <p className="font-bold text-sm">No photos found in this category.</p>
          </div>
        )}

      </div>

      {/* Lightbox Fullscreen Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <div>
                <span className="text-[10px] font-bold text-[#283593] uppercase tracking-wider">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-bold text-base text-slate-900">{selectedPhoto.title}</h3>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 bg-white border-y border-slate-200 flex-1 flex items-center justify-center overflow-hidden min-h-[300px]">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[60vh] max-w-full object-contain"
              />
            </div>

            <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-600">
                {selectedPhoto.description || selectedPhoto.title}
              </p>
              <button
                onClick={() => {
                  const p = selectedPhoto;
                  setSelectedPhoto(null);
                  setInquiryProduct({
                    id: p.id,
                    title: p.title,
                    category: p.category,
                    description: p.description || p.title,
                    image: p.image,
                    price: 'Ask Price',
                    available: true,
                  });
                }}
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-5 py-2 rounded transition shadow-2xs flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-4 h-4" /> Send Inquiry for this Item
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
