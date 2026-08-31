'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Star, CheckCircle2, MessageSquare, ThumbsUp, Send, Filter, PlusCircle, X, ShieldCheck } from 'lucide-react';

export const RatingsPage: React.FC = () => {
  const { data, addTestimonial, setInquiryProduct } = useData();
  const { company, testimonials, products } = data;

  const [starFilter, setStarFilter] = useState<number | 'All'>('All');
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  const [newReview, setNewReview] = useState({
    author: '',
    company: '',
    location: '',
    rating: 5,
    comment: '',
    productName: '',
  });

  const filteredTestimonials = starFilter === 'All'
    ? testimonials
    : testimonials.filter((t) => t.rating === starFilter);

  const ratingsBreakdown = [
    { stars: 5, count: testimonials.filter(t => t.rating === 5).length, percentage: 100 },
    { stars: 4, count: testimonials.filter(t => t.rating === 4).length, percentage: 0 },
    { stars: 3, count: testimonials.filter(t => t.rating === 3).length, percentage: 0 },
    { stars: 2, count: testimonials.filter(t => t.rating === 2).length, percentage: 0 },
    { stars: 1, count: testimonials.filter(t => t.rating === 1).length, percentage: 0 },
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) {
      alert('Please fill in your name and review details.');
      return;
    }

    addTestimonial({
      author: newReview.author,
      company: newReview.company || 'Verified Client',
      location: newReview.location || company.city,
      rating: Number(newReview.rating),
      comment: newReview.comment,
      productName: newReview.productName || products[0]?.title || 'Thermal Insulation System',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsWriteReviewOpen(false);
      setNewReview({
        author: '',
        company: '',
        location: '',
        rating: 5,
        comment: '',
        productName: '',
      });
    }, 1500);
  };

  return (
    <div className="bg-slate-100 min-h-screen py-8 border-b border-slate-200 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
        
        {/* Header Strip */}
        <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Ratings & Reviews
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Verified client testimonials and satisfaction ratings for {company.name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> Write a Review
            </button>

            <button
              onClick={() => setInquiryProduct(data.products[0] || null)}
              className="bg-[#383a7c] hover:bg-[#2b2d63] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-xs transition shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Ask For Quote
            </button>
          </div>
        </div>

        {/* Rating Score & Rating Bars Header Card */}
        <div className="bg-white border border-slate-300 rounded-xl p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Score Big Display */}
            <div className="md:col-span-4 text-center md:border-r border-slate-200 md:pr-8 space-y-2">
              <div className="text-5xl font-black text-slate-900">
                {company.rating.toFixed(1)} <span className="text-base font-normal text-slate-400">/ 5</span>
              </div>
              
              <div className="flex items-center justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-xs text-slate-600 font-semibold">
                Overall Satisfaction Score based on {testimonials.length} Ratings
              </p>

              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mt-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Verified Buyers
              </div>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="md:col-span-8 space-y-2.5 text-xs text-slate-700 max-w-xl mx-auto md:mx-0 w-full">
              {ratingsBreakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="w-8 font-bold text-slate-800 text-right">{row.stars} ★</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${row.percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-right font-medium text-slate-500">{row.percentage}%</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 border border-slate-300 rounded-xl shadow-xs flex items-center justify-between gap-4 flex-wrap text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="font-bold text-slate-700">Filter by Rating:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setStarFilter('All')}
              className={`px-4 py-1.5 rounded-full font-bold transition cursor-pointer ${
                starFilter === 'All'
                  ? 'bg-[#383a7c] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Reviews ({testimonials.length})
            </button>
            {[5, 4, 3, 2, 1].map((s) => (
              <button
                key={s}
                onClick={() => setStarFilter(s)}
                className={`px-3.5 py-1.5 rounded-full font-bold transition cursor-pointer ${
                  starFilter === s
                    ? 'bg-[#383a7c] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {s} ★ ({testimonials.filter((t) => t.rating === s).length})
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Cards Feed */}
        <div className="space-y-4">
          {filteredTestimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white border border-slate-300 rounded-xl p-6 shadow-xs space-y-3 hover:border-slate-400 transition"
            >
              {/* Author Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#383a7c] text-white font-extrabold flex items-center justify-center text-sm shadow-2xs">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{test.author}</h3>
                      {test.location && (
                        <span className="text-xs text-slate-500 font-medium">({test.location})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Buyer
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Product & Date Tag */}
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-500">
                {test.productName && (
                  <span className="bg-indigo-50 text-[#283593] font-bold px-2.5 py-1 rounded border border-indigo-100">
                    Product: {test.productName}
                  </span>
                )}
                <span>Reviewed on {test.date || 'Recent'}</span>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                &quot;{test.comment}&quot;
              </p>

              {/* Helpful footer button */}
              <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                <button className="flex items-center gap-1 hover:text-[#383a7c] font-medium transition cursor-pointer">
                  <ThumbsUp className="w-3.5 h-3.5" /> Helpful
                </button>
                <button
                  onClick={() => setInquiryProduct(data.products[0] || null)}
                  className="text-[#283593] font-bold hover:underline cursor-pointer"
                >
                  Inquire Similar Requirement
                </button>
              </div>
            </div>
          ))}

          {filteredTestimonials.length === 0 && (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-300 text-slate-500 space-y-2">
              <MessageSquare className="w-10 h-10 mx-auto text-slate-400" />
              <p className="font-bold text-sm">No reviews found for this rating filter.</p>
            </div>
          )}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 relative">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                <h3 className="font-bold text-lg text-slate-900">Write a Product Review</h3>
              </div>
              <button
                onClick={() => setIsWriteReviewOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-2">
                <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base text-slate-900">Review Submitted Successfully!</h4>
                <p className="text-xs text-slate-600">Thank you for providing your feedback for {company.name}.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={newReview.company}
                      onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                      placeholder="e.g. Thermal Infra Ltd."
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      placeholder="e.g. Greater Noida"
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Product Sourced</label>
                    <select
                      value={newReview.productName}
                      onChange={(e) => setNewReview({ ...newReview, productName: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                    >
                      <option value="">Select Product...</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Rating (1 to 5 Stars)</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-bold text-amber-600"
                    >
                      <option value={5}>5 ★★★★★ (Excellent)</option>
                      <option value={4}>4 ★★★★☆ (Good)</option>
                      <option value={3}>3 ★★★☆☆ (Average)</option>
                      <option value={2}>2 ★★☆☆☆ (Below Average)</option>
                      <option value={1}>1 ★☆☆☆☆ (Poor)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Review Comment *</label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Describe product quality, delivery timeline, installation service..."
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsWriteReviewOpen(false)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#383a7c] hover:bg-[#2c2e63] text-white font-bold rounded-lg text-xs shadow-md"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
