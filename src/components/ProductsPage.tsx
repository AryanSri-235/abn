'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Product } from '@/types';
import { Phone, Send, ChevronDown, ChevronUp, Image as ImageIcon, Star, Grid, List } from 'lucide-react';

interface ProductsPageProps {
  searchQuery: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ searchQuery }) => {
  const { data, setInquiryProduct } = useData();
  const { products, company, testimonials } = data;

  // View state: 'overview' (stacked categories matching products_and_services.html) or 'details' (sidebar + detailed spec cards)
  const [viewMode, setViewMode] = useState<'overview' | 'details'>('overview');

  // Group products by category
  const categoriesMap: Record<string, Product[]> = {};
  products.forEach((prod) => {
    if (!categoriesMap[prod.category]) {
      categoriesMap[prod.category] = [];
    }
    categoriesMap[prod.category].push(prod);
  });

  const categoryNames = Object.keys(categoriesMap);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryNames[0] || 'Installation Service');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    [categoryNames[0] || 'Installation Service']: true,
  });

  const toggleCategoryExpand = (cat: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const handleOpenCategoryDetails = (cat: string) => {
    setSelectedCategory(cat);
    setViewMode('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Products belonging to currently selected category in details view
  const currentCategoryProducts = products.filter((prod) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        prod.title.toLowerCase().includes(q) ||
        prod.category.toLowerCase().includes(q) ||
        prod.description.toLowerCase().includes(q)
      );
    }
    return prod.category === selectedCategory;
  });

  const selectedCategorySummary = currentCategoryProducts[0]?.categorySummary ||
    `Our product range includes a wide range of ${currentCategoryProducts.map(p => p.title).join(' and ')}.`;

  return (
    <div className="bg-slate-100 min-h-screen py-6 border-b border-slate-200 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-6">
        
        {/* Top Header Strip with View Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 border border-slate-300 rounded-lg shadow-2xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Products & Services</h1>
            <p className="text-xs text-slate-500">
              Browse our complete catalog of industrial engineering services & custom products
            </p>
          </div>

          {/* Switch View Toggle Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 border border-slate-300 rounded-md text-xs font-bold shrink-0">
            <button
              onClick={() => setViewMode('overview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition ${
                viewMode === 'overview'
                  ? 'bg-[#383a7c] text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> Overview
            </button>
            <button
              onClick={() => setViewMode('details')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition ${
                viewMode === 'details'
                  ? 'bg-[#383a7c] text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <List className="w-3.5 h-3.5" /> Detailed View
            </button>
          </div>
        </div>

        {/* MODE 1: OVERVIEW VIEW (Matching screenshots 1-5 of products_and_services.html) */}
        {viewMode === 'overview' && (
          <div className="space-y-6">
            {categoryNames.map((catName) => {
              const catItems = categoriesMap[catName];
              const catSummary = catItems[0]?.categorySummary || `Our product range includes ${catItems.map(i => i.title).join(', ')}.`;

              return (
                <section key={catName} className="bg-white border border-slate-300 rounded-lg p-5 shadow-2xs space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{catName}</h2>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {catSummary}
                    </p>
                  </div>

                  {/* Horizontal Grid of Product Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                    {catItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setInquiryProduct(item)}
                        className="border border-slate-200 rounded-lg p-3 flex flex-col justify-between cursor-pointer hover:border-indigo-400 hover:shadow-xs transition bg-white group"
                      >
                        <div className="w-full h-40 bg-white border border-slate-100 rounded overflow-hidden p-2 flex items-center justify-center mb-2">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-2">{item.title}</h4>
                      </div>
                    ))}
                  </div>

                  {/* View More Details Button */}
                  <div className="flex justify-end pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleOpenCategoryDetails(catName)}
                      className="border border-[#2b388f] text-[#2b388f] hover:bg-indigo-50 font-bold text-xs px-4 py-1.5 rounded transition shadow-2xs"
                    >
                      View more details
                    </button>
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* MODE 2: CATEGORY DETAILS VIEW (Matching screenshots 1-4 of installation_service.html) */}
        {viewMode === 'details' && (
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Left Sidebar Menu */}
            <aside className="w-full md:w-64 bg-white border border-slate-300 rounded-lg shrink-0 shadow-2xs self-start">
              <div className="bg-slate-50 border-b border-slate-300 p-3">
                <h3 className="font-bold text-slate-900 text-sm">Products & Services</h3>
              </div>

              <div className="divide-y divide-slate-200 text-xs">
                {categoryNames.map((cat) => {
                  const items = categoriesMap[cat];
                  const isSelected = selectedCategory === cat;
                  const isExpanded = expandedCategories[cat];

                  return (
                    <div key={cat} className="p-2">
                      <div
                        onClick={() => {
                          setSelectedCategory(cat);
                          toggleCategoryExpand(cat);
                        }}
                        className={`flex items-center justify-between p-2 rounded cursor-pointer transition font-bold ${
                          isSelected ? 'text-[#283593] bg-indigo-50' : 'text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        <span>{cat}</span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-normal">
                          <span>({items.length})</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Sub-Services List */}
                      {isExpanded && (
                        <div className="pl-4 pt-1 space-y-1">
                          {items.map((prod) => (
                            <div
                              key={prod.id}
                              onClick={() => {
                                setSelectedCategory(cat);
                                const el = document.getElementById(prod.id);
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="text-[11px] text-slate-600 hover:text-[#283593] py-1 cursor-pointer truncate"
                            >
                              {prod.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* Right Main Content Area */}
            <main className="flex-1 space-y-6">
              
              {/* Category Header Card */}
              <div className="bg-white border border-slate-300 rounded-lg p-5 shadow-2xs">
                <h2 className="text-2xl font-bold text-[#283593] mb-2">{selectedCategory}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedCategorySummary}
                </p>

                {/* Top Category Preview Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                  {currentCategoryProducts.map((prod) => (
                    <div
                      key={`preview-${prod.id}`}
                      onClick={() => {
                        const el = document.getElementById(prod.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="border border-slate-200 rounded-lg p-3 flex flex-col items-center text-center cursor-pointer hover:border-indigo-400 hover:shadow-xs transition bg-white"
                    >
                      <div className="w-full h-36 bg-white border border-slate-100 rounded overflow-hidden p-2 flex items-center justify-center mb-2">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-2">{prod.title}</h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setInquiryProduct(prod);
                        }}
                        className="text-[#283593] hover:underline font-bold text-xs mt-1"
                      >
                        Ask Price
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Product Cards List */}
              <div className="space-y-6">
                {currentCategoryProducts.map((product) => (
                  <div
                    key={product.id}
                    id={product.id}
                    className="bg-white border border-slate-300 rounded-lg p-5 shadow-2xs flex flex-col md:flex-row gap-6 scroll-mt-20"
                  >
                    {/* Left Side: Product Image & Get More Photos Button */}
                    <div className="w-full md:w-72 shrink-0 flex flex-col items-center gap-3">
                      <div className="w-full h-64 bg-white rounded-lg overflow-hidden p-3 flex items-center justify-center border border-slate-200 shadow-2xs">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <button
                        onClick={() => setInquiryProduct(product)}
                        className="w-full border border-teal-600 text-teal-700 hover:bg-teal-50 font-bold text-xs py-2 rounded-md flex items-center justify-center gap-1.5 transition shadow-2xs"
                      >
                        <ImageIcon className="w-4 h-4 text-teal-600" />
                        <span>Get More Photos</span>
                      </button>
                    </div>

                    {/* Right Side: Detailed Specs & Actions */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{product.title}</h3>
                        <button
                          onClick={() => setInquiryProduct(product)}
                          className="text-[#283593] hover:underline font-bold text-xs mt-0.5 inline-block"
                        >
                          Get Latest Price
                        </button>
                      </div>

                      {/* Specifications Table */}
                      <div className="border border-slate-200 rounded overflow-hidden text-xs">
                        <table className="w-full divide-y divide-slate-200">
                          <tbody className="divide-y divide-slate-200">
                            {product.minimumOrderQuantity && (
                              <tr className="bg-slate-50">
                                <td className="py-2 px-3 font-semibold text-slate-500 w-44 border-r border-slate-200">
                                  Minimum Order Quantity
                                </td>
                                <td className="py-2 px-3 font-bold text-slate-900">
                                  {product.minimumOrderQuantity}
                                </td>
                              </tr>
                            )}
                            {product.specifications &&
                              Object.entries(product.specifications).map(([key, val]) => (
                                <tr key={key}>
                                  <td className="py-2 px-3 font-semibold text-slate-500 w-44 border-r border-slate-200">
                                    {key}
                                  </td>
                                  <td className="py-2 px-3 font-bold text-slate-900">{val}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Description text */}
                      <p className="text-xs text-slate-700 leading-relaxed pt-1">
                        {product.description}
                      </p>

                      {/* Action Buttons Row */}
                      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => setInquiryProduct(product)}
                          className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-5 py-2.5 rounded-md text-xs transition shadow-2xs flex items-center gap-1.5"
                        >
                          <Send className="w-4 h-4" />
                          <span>Yes, I am interested!</span>
                        </button>
                        <a
                          href={`tel:${company.phonePrimary}`}
                          className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50 font-bold px-5 py-2 rounded-md text-xs transition shadow-2xs flex items-center gap-1.5"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Call Now</span>
                        </a>
                      </div>

                      {/* Sub-footer quote text */}
                      <div className="pt-2 text-[11px] text-slate-500">
                        Interested in this product?{' '}
                        <button
                          onClick={() => setInquiryProduct(product)}
                          className="text-[#283593] font-bold hover:underline"
                        >
                          Get Best Quote
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ratings & Reviews Section */}
              <div className="bg-white border border-slate-300 rounded-lg p-6 shadow-2xs space-y-6">
                <div className="text-center">
                  <div className="inline-block">
                    <h3 className="text-xl font-bold text-slate-900">Ratings & Reviews</h3>
                    <div className="w-12 h-0.5 bg-[#383a7c] mx-auto mt-1 rounded-full"></div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 border-b border-slate-200 pb-6">
                  <div className="text-center sm:border-r border-slate-200 sm:pr-8">
                    <div className="text-3xl font-extrabold text-slate-900">
                      {company.rating.toFixed(1)} <span className="text-sm font-normal text-slate-500">/ 5</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 my-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">{company.reviewCount} Ratings</p>
                  </div>

                  <div className="w-full sm:w-64 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="w-6 font-bold text-slate-700">5 ★</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                        <div className="bg-emerald-500 h-full rounded-full w-full" />
                      </div>
                      <span className="w-10 text-right font-medium text-slate-500">100%</span>
                    </div>
                  </div>
                </div>

                {/* Most Relevant Reviews Cards */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-slate-900 uppercase">Most Relevant Reviews</h4>
                  {testimonials.map((test) => (
                    <div key={test.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-2 text-xs">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <strong className="font-bold text-slate-900">{test.author}</strong>
                          {test.location && <span className="text-slate-500">| {test.location}</span>}
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(test.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500">
                        <span>{test.date}</span>
                        {test.productName && (
                          <span className="ml-2 font-medium text-slate-700">
                            | Product Name : {test.productName}
                          </span>
                        )}
                      </div>

                      <p className="text-slate-700 leading-relaxed">{test.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

            </main>

          </div>
        )}

      </div>
    </div>
  );
};
