'use client';

import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { AboutSection } from '@/components/AboutSection';
import { ProductsSection } from '@/components/ProductsSection';
import { ProductsPage } from '@/components/ProductsPage';
import { AboutUsPage } from '@/components/AboutUsPage';
import { PhotosPage } from '@/components/PhotosPage';
import { RatingsPage } from '@/components/RatingsPage';
import { HsnSection } from '@/components/HsnSection';
import { RatingsSection } from '@/components/RatingsSection';
import { ContactSection } from '@/components/ContactSection';
import { InquiryModal } from '@/components/InquiryModal';
import { AdminModal } from '@/components/AdminModal';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  return (
    <DataProvider>
      <div className="min-h-screen bg-slate-100 font-sans text-slate-900 selection:bg-[#383a7c] selection:text-white">
        <Header />
        <Navigation
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main>
          {activeSection === 'products' ? (
            <ProductsPage searchQuery={searchQuery} />
          ) : activeSection === 'about' ? (
            <AboutUsPage />
          ) : activeSection === 'photos' ? (
            <PhotosPage />
          ) : activeSection === 'ratings' ? (
            <RatingsPage />
          ) : (
            <>
              <Hero />
              <AboutSection />
              <ProductsSection searchQuery={searchQuery} />
              <HsnSection />
              <RatingsSection />
              <ContactSection />
            </>
          )}
        </main>
        <Footer />
        <InquiryModal />
      </div>
    </DataProvider>
  );
}
