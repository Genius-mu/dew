'use client';

import React, { useState, useEffect, useRef } from 'react';
import { REVIEWS } from '../data/products';
import { Star, Quote, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Community: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  const productsList = ['All', 'Dew Hydrate Serum', 'Dew Daily Cream', 'Dew Glow Cleanser'];

  const filteredReviews =
    activeFilter === 'All'
      ? REVIEWS
      : REVIEWS.filter((r) => r.productName === activeFilter);

  const featuredReview = REVIEWS[0];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Spotlight card 3D slide in
      gsap.fromTo(
        spotlightRef.current,
        { opacity: 0, x: -70, rotateY: -10, scale: 0.94 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsWrapperRef.current,
            start: 'top 80%',
          },
        }
      );

      // Supporting review cards stagger in
      gsap.fromTo(
        '.supporting-review-card',
        { opacity: 0, x: 60, scale: 0.94 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsWrapperRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative w-full py-24 sm:py-32 overflow-hidden perspective-1200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block with Glass Badge */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-white/50"
        >
          <div>
            <div className="inline-block px-4 py-1 glass-badge rounded-full mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0E3B2F]">
                Real Experiences
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0D1F2D] tracking-tight">
              Your Skin. Your Story.
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm sm:text-base text-[#0D1F2D]/80 max-w-md font-medium">
            Hear from community members who made Dew their everyday morning and evening ritual.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {productsList.map((prod) => (
            <button
              key={prod}
              type="button"
              onClick={() => setActiveFilter(prod)}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                activeFilter === prod
                  ? 'bg-[#0E3B2F] text-[#FFFFFF] shadow-sm'
                  : 'glass-pill text-[#0D1F2D] hover:bg-white/90'
              }`}
            >
              {prod}
            </button>
          ))}
        </div>

        {/* Testimonials Layout on Frosted Glass Panels */}
        <div
          ref={cardsWrapperRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10 preserve-3d"
        >
          {/* Spotlight Hero Card */}
          <div
            ref={spotlightRef}
            className="lg:col-span-6 glass-card rounded-3xl p-8 sm:p-10 border-2 border-white/95 shadow-dew-deep flex flex-col justify-between relative preserve-3d"
          >
            <Quote size={44} className="text-[#0E3B2F]/20 absolute top-6 right-6" />

            <div>
              <div className="flex items-center space-x-1 mb-3 text-[#FF6B35]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>

              <span className="inline-block px-3 py-1 glass-badge text-[#0E3B2F] text-[10px] font-extrabold uppercase tracking-wider rounded-full mb-3">
                Spotlight · {featuredReview.productName}
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D1F2D] mb-3 leading-tight">
                “{featuredReview.title}”
              </h3>

              <p className="text-sm text-[#0D1F2D]/85 leading-relaxed font-normal">
                {featuredReview.comment}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/60 flex items-center justify-between">
              <div>
                <span className="font-extrabold text-sm text-[#0D1F2D] block">
                  {featuredReview.author}
                </span>
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
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 preserve-3d">
            {filteredReviews.slice(1, 4).map((rev) => (
              <div
                key={rev.id}
                className="supporting-review-card glass-panel rounded-3xl p-6 shadow-dew-subtle hover:bg-white/70 transition-all flex flex-col justify-between preserve-3d"
              >
                <div>
                  <div className="flex items-center space-x-1 mb-2 text-[#FF6B35]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={13} className="fill-current" />
                    ))}
                  </div>

                  <span className="inline-block px-2.5 py-0.5 glass-badge text-[#0E3B2F] text-[10px] font-extrabold uppercase tracking-wider rounded-full mb-2">
                    {rev.productName}
                  </span>

                  <h4 className="text-sm font-extrabold text-[#0D1F2D] mb-2 leading-snug">
                    “{rev.title}”
                  </h4>

                  <p className="text-xs text-[#0D1F2D]/80 leading-relaxed line-clamp-4">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/60">
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
        <div className="text-center pt-2">
          <a
            href="#featured-products"
            className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-[#0E3B2F] hover:text-[#0A2E24] group"
          >
            <span>Explore all skincare essentials</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Community;
