'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppData, CompanyInfo, AboutInfo, Product, PhotoItem, Testimonial, HsnCodeItem, Inquiry } from '@/types';
import { initialData } from '@/data/initialData';

interface DataContextType {
  data: AppData;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  inquiryProduct: Product | null;
  setInquiryProduct: (prod: Product | null) => void;
  updateCompany: (info: Partial<CompanyInfo>) => void;
  updateAbout: (info: Partial<AboutInfo>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addPhoto: (photo: Omit<PhotoItem, 'id'>) => void;
  updatePhoto: (id: string, photo: Partial<PhotoItem>) => void;
  deletePhoto: (id: string) => void;
  addTestimonial: (test: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id'>) => void;
  deleteInquiry: (id: string) => void;
  addHsnCode: (hsn: Omit<HsnCodeItem, 'id'>) => void;
  updateHsnCode: (id: string, hsn: Partial<HsnCodeItem>) => void;
  deleteHsnCode: (id: string) => void;
  resetToDefault: () => void;
  refreshPhotosFromDb: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const CURRENT_VERSION = 'v18';
const STORAGE_KEY = `abn_thermocare_data_${CURRENT_VERSION}`;

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(initialData);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Fetch photos directly from Neon PostgreSQL database API
  const refreshPhotosFromDb = async () => {
    try {
      const res = await fetch('/api/photos');
      if (res.ok) {
        const photosFromDb = await res.json();
        if (Array.isArray(photosFromDb) && photosFromDb.length > 0) {
          setData((prev) => ({
            ...prev,
            photos: photosFromDb,
          }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch photos from DB API:', err);
    }
  };

  useEffect(() => {
    try {
      // Remove any outdated cached dataset versions to force loading updated initialData
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('abn_thermocare_data_') && key !== STORAGE_KEY) {
          localStorage.removeItem(key);
        }
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.company && parsed.products) {
          setData(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load saved data from localStorage", e);
    } finally {
      setIsLoaded(true);
      refreshPhotosFromDb();
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.error("Failed to save data to localStorage", e);
      }
    }
  }, [data, isLoaded]);

  const updateCompany = (info: Partial<CompanyInfo>) => {
    setData((prev) => ({
      ...prev,
      company: { ...prev.company, ...info },
    }));
  };

  const updateAbout = (info: Partial<AboutInfo>) => {
    setData((prev) => ({
      ...prev,
      about: { ...prev.about, ...info },
    }));
  };

  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      products: [newProd, ...prev.products],
    }));
  };

  const updateProduct = (id: string, prodData: Partial<Product>) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...prodData } : p)),
    }));
  };

  const deleteProduct = (id: string) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  };

  const addPhoto = async (photoData: Omit<PhotoItem, 'id'>) => {
    const newPhoto: PhotoItem = {
      ...photoData,
      id: `photo-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      photos: [newPhoto, ...prev.photos],
    }));

    // Sync to PostgreSQL DB
    try {
      await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPhoto),
      });
    } catch (err) {
      console.error('Error saving photo to DB:', err);
    }
  };

  const updatePhoto = async (id: string, photoData: Partial<PhotoItem>) => {
    setData((prev) => ({
      ...prev,
      photos: prev.photos.map((p) => (p.id === id ? { ...p, ...photoData } : p)),
    }));

    // Sync to PostgreSQL DB
    try {
      await fetch('/api/photos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...photoData }),
      });
    } catch (err) {
      console.error('Error updating photo in DB:', err);
    }
  };

  const deletePhoto = async (id: string) => {
    setData((prev) => ({
      ...prev,
      photos: prev.photos.filter((p) => p.id !== id),
    }));

    // Sync to PostgreSQL DB
    try {
      await fetch(`/api/photos?id=${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error('Error deleting photo from DB:', err);
    }
  };

  const addTestimonial = (testData: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = {
      ...testData,
      id: `test-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      testimonials: [newTest, ...prev.testimonials],
    }));
  };

  const deleteTestimonial = (id: string) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
  };

  const addInquiry = (inqData: Omit<Inquiry, 'id'>) => {
    const newInq: Inquiry = {
      ...inqData,
      id: `inq-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      inquiries: [newInq, ...(prev.inquiries || [])],
    }));
  };

  const deleteInquiry = (id: string) => {
    setData((prev) => ({
      ...prev,
      inquiries: (prev.inquiries || []).filter((inq) => inq.id !== id),
    }));
  };

  const addHsnCode = (hsnData: Omit<HsnCodeItem, 'id'>) => {
    const newHsn: HsnCodeItem = {
      ...hsnData,
      id: `hsn-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      hsnCodes: [...(prev.hsnCodes || []), newHsn],
    }));
  };

  const updateHsnCode = (id: string, hsnData: Partial<HsnCodeItem>) => {
    setData((prev) => ({
      ...prev,
      hsnCodes: (prev.hsnCodes || []).map((h) => (h.id === id ? { ...h, ...hsnData } : h)),
    }));
  };

  const deleteHsnCode = (id: string) => {
    setData((prev) => ({
      ...prev,
      hsnCodes: (prev.hsnCodes || []).filter((h) => h.id !== id),
    }));
  };

  const resetToDefault = () => {
    setData(initialData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        isAdminOpen,
        setIsAdminOpen,
        inquiryProduct,
        setInquiryProduct,
        updateCompany,
        updateAbout,
        addProduct,
        updateProduct,
        deleteProduct,
        addPhoto,
        updatePhoto,
        deletePhoto,
        addTestimonial,
        deleteTestimonial,
        addInquiry,
        deleteInquiry,
        addHsnCode,
        updateHsnCode,
        deleteHsnCode,
        resetToDefault,
        refreshPhotosFromDb,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
