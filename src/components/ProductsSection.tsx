'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Product } from '@/types';
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

interface ProductsSectionProps {
  searchQuery: string;
  setActiveSection: (section: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ searchQuery, setActiveSection }) => {
  const { data, setInquiryProduct } = useData();
  const { products } = data;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredProducts = products.filter((prod) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      prod.title.toLowerCase().includes(q) ||
      prod.category.toLowerCase().includes(q) ||
      (prod.subServices && prod.subServices.some((s) => s.toLowerCase().includes(q)))
    );
  });

  const displayedProducts = isExpanded ? filteredProducts : filteredProducts.slice(0, 5);

  return (
    <section id="products" className="py-10 bg-slate-50 border-b border-slate-200 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 text-center">
        
        {/* Underlined Heading */}
        <div className="inline-block mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Products & Services</h2>
          <div className="w-16 h-1 bg-[#383a7c] mx-auto mt-1.5 rounded-full"></div>
        </div>

        {/* Product Category Cards Grid - Shows 5 by default */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-6 text-left">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between group"
            >
              {/* Product Image */}
              <div
                onClick={() => setInquiryProduct(product)}
                className="h-52 bg-white border-b border-slate-100 overflow-hidden flex items-center justify-center p-3 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Title & Sub-Services List */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2 leading-snug">
                    {product.title}
                  </h3>

                  {/* Sub-services bullet list */}
                  {product.subServices && product.subServices.length > 0 && (
                    <ul className="space-y-1 text-xs text-slate-600">
                      {product.subServices.map((sub, idx) => (
                        <li key={idx} className="line-clamp-1">
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* View Details Link */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="text-teal-700 hover:text-teal-800 font-bold text-xs flex items-center gap-1 w-fit pt-2 border-t border-slate-100"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Expand / Collapse & View Complete Range Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {filteredProducts.length > 5 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-[#383a7c] hover:bg-[#2b2d63] text-white font-bold text-xs sm:text-sm px-8 py-3 rounded-md transition shadow-2xs flex items-center gap-2"
            >
              <span>{isExpanded ? 'Show Less' : `View All Products (${filteredProducts.length - 5} More)`}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}

          <button
            onClick={() => {
              setActiveSection('products');
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50 font-bold text-xs sm:text-sm px-8 py-3 rounded-md transition shadow-2xs"
          >
            View Complete Range
          </button>
        </div>

        {/* Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-lg max-w-lg w-full p-5 shadow-xl space-y-4 text-left">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-amber-600 text-xs font-bold uppercase">{selectedProduct.category}</span>
                  <h3 className="text-lg font-bold text-slate-900">{selectedProduct.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-slate-400 hover:text-slate-700 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="h-48 bg-white border border-slate-200 rounded overflow-hidden p-2 flex items-center justify-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <p className="text-slate-700 text-xs leading-relaxed">
                {selectedProduct.description}
              </p>

              {selectedProduct.subServices && (
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Included Services / Products:</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-700 space-y-0.5">
                    {selectedProduct.subServices.map((sub, i) => (
                      <li key={i}>{sub}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-teal-700 font-extrabold text-base">{selectedProduct.price}</span>
                <button
                  onClick={() => {
                    const p = selectedProduct;
                    setSelectedProduct(null);
                    setInquiryProduct(p);
                  }}
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-4 py-2 rounded transition"
                >
                  Contact Supplier
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
