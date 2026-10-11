'use client';

import React, { useState } from 'react';
import { REVIEWS } from '../data/products';
import { Star, CheckCircle, Quote, Sparkles, ArrowRight } from 'lucide-react';

export const Community: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const productsList = ['All', 'Dew Hydrate Serum', 'Dew Daily Cream', 'Dew Glow Cleanser'];

  const filteredReviews =
    activeFilter === 'All'
      ? REVIEWS
      : REVIEWS.filter((r) => r.productName === activeFilter);

  const featuredReview = REVIEWS[0];

  return (
    <section
      id="community"
      className="relative w-full py-24 sm:py-32 bg-[#FFFFFF] border-b border-[#0D1F2D]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#0D1F2D]/10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#E3F2F7] text-[#0E3B2F] rounded text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} />
              <span>Real Experiences</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0D1F2D] tracking-tight">
              Your Skin. Your Story.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-base sm:text-lg text-[#0D1F2D]/80 max-w-md font-medium">
            Hear from community members who made Dew their everyday morning and evening ritual.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {productsList.map((prod) => (
            <button
              key={prod}
              type="button"
              onClick={() => setActiveFilter(prod)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-150 ${
                activeFilter === prod
                  ? 'bg-[#0E3B2F] text-[#FFFFFF] shadow-dew-subtle'
                  : 'bg-[#E3F2F7] text-[#0D1F2D] hover:bg-[#E3F2F7]/80'
              }`}
            >
              {prod}
            </button>
          ))}
        </div>

        {/* Testimonials Layout: 1 Spotlight Featured Card + Supporting Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Spotlight Hero Card */}
          <div className="lg:col-span-6 bg-[#E3F2F7] rounded-2xl p-8 sm:p-10 border-2 border-[#0E3B2F] shadow-dew-card flex flex-col justify-between relative">
            <Quote size={48} className="text-[#0E3B2F]/20 absolute top-6 right-6" />

            <div>
              <div className="flex items-center space-x-1 mb-4 text-[#FF6B35]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-current" />
                ))}
              </div>

              <span className="inline-block px-2.5 py-0.5 bg-[#FFFFFF] text-[#0E3B2F] text-[11px] font-extrabold uppercase tracking-wider rounded mb-3">
                Spotlight · {featuredReview.productName}
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D1F2D] mb-4 leading-tight">
                “{featuredReview.title}”
              </h3>

              <p className="text-base text-[#0D1F2D]/85 leading-relaxed font-normal">
                {featuredReview.comment}
              </p>
            </div>

            <div className="pt-6 mt-8 border-t border-[#0D1F2D]/10 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-sm text-[#0D1F2D]">
                    {featuredReview.author}
                  </span>
                  <CheckCircle size={14} className="text-[#0E3B2F]" />
                </div>
                <span className="text-xs text-[#0D1F2D]/60 font-medium">
                  {featuredReview.location} · {featuredReview.skinType}
                </span>
              </div>
              <span className="text-xs font-bold text-[#0E3B2F]">
                Verified Ritualist
              </span>
            </div>
          </div>

          {/* Supporting Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredReviews.slice(1, 4).map((rev) => (
              <div
                key={rev.id}
                className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#0D1F2D]/15 shadow-dew-subtle hover:shadow-dew-card transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 mb-3 text-[#FF6B35]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>

                  <span className="inline-block px-2 py-0.5 bg-[#E3F2F7] text-[#0E3B2F] text-[10px] font-extrabold uppercase tracking-wider rounded mb-2">
                    {rev.productName}
                  </span>

                  <h4 className="text-base font-extrabold text-[#0D1F2D] mb-2 leading-snug">
                    “{rev.title}”
                  </h4>

                  <p className="text-xs text-[#0D1F2D]/80 leading-relaxed line-clamp-4">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#0D1F2D]/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0D1F2D]">
                      {rev.author}
                    </span>
                    <span className="text-[11px] text-[#0D1F2D]/60">
                      {rev.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Link */}
        <div className="text-center pt-4">
          <a
            href="#featured-products"
            className="inline-flex items-center space-x-2 text-sm font-bold uppercase tracking-wider text-[#0E3B2F] hover:text-[#0A2E24] group"
          >
            <span>Explore all skincare essentials</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Community;
