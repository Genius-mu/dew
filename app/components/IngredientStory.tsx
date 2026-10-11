'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { INGREDIENTS } from '../data/products';
import { ArrowRight } from 'lucide-react';

export const IngredientStory: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentIngredient = INGREDIENTS[activeIndex];

  return (
    <section
      id="ingredients"
      className="relative w-full py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block with Glass Badge (NO icon) */}
        <div className="max-w-3xl mb-14">
          <div className="inline-block px-4 py-1 glass-badge rounded-full mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0E3B2F]">
              Formulation Philosophy
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0D1F2D] tracking-tight">
            Good Things, Thoughtfully Chosen.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#0D1F2D]/80 font-medium">
            We prioritize bio-compatible botanical actives that support your barrier. No filler fragrance, no harsh sulfates, and no hollow promises.
          </p>
        </div>

        {/* Tab Controls to explore */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/50">
          {INGREDIENTS.map((ing, idx) => (
            <button
              key={ing.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-150 ${
                activeIndex === idx
                  ? 'bg-[#0E3B2F] text-[#FFFFFF] shadow-sm'
                  : 'glass-pill text-[#0D1F2D] hover:bg-white/90'
              }`}
            >
              0{idx + 1}. {ing.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Main Stage: Glassmorphic 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Oversized Tactile Ingredient Photography */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] glass-card rounded-3xl overflow-hidden p-3 shadow-dew-deep border-2 border-white/90">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={currentIngredient.image}
                  alt={currentIngredient.title}
                  fill
                  className="object-cover transition-all duration-500 ease-out"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>

              {/* Text-only Badge with NO icon */}
              <div className="absolute top-6 left-6 px-3.5 py-1 glass-badge rounded-full text-[10px] font-extrabold uppercase tracking-wider text-[#0E3B2F]">
                {currentIngredient.badge}
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {INGREDIENTS.map((ing, idx) => (
                <button
                  key={ing.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all p-1 glass-panel ${
                    activeIndex === idx
                      ? 'border-[#0E3B2F] ring-2 ring-[#0E3B2F]/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View ${ing.title}`}
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={ing.image}
                      alt={ing.title}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Glass Editorial Copy & Pairing Note */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-8 sm:p-10 shadow-dew-card border border-white/90">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0E3B2F] block mb-2">
              Ingredient 0{activeIndex + 1} of 03
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0D1F2D] mb-2 leading-tight">
              {currentIngredient.title}
            </h3>
            <p className="text-xs font-bold text-[#FF6B35] mb-4">
              {currentIngredient.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-[#0D1F2D]/80 leading-relaxed mb-6 font-normal">
              {currentIngredient.description}
            </p>

            <div className="pt-6 border-t border-white/60 space-y-2.5">
              <div className="flex items-start space-x-3">
                <span className="text-[11px] font-bold text-[#0D1F2D]/60 uppercase tracking-wider shrink-0 mt-0.5">
                  Origin:
                </span>
                <span className="text-xs font-medium text-[#0D1F2D]">
                  {currentIngredient.origin}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[11px] font-bold text-[#0D1F2D]/60 uppercase tracking-wider shrink-0 mt-0.5">
                  Pairing:
                </span>
                <span className="text-xs font-bold text-[#0E3B2F]">
                  {currentIngredient.pairing}
                </span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % INGREDIENTS.length)
                }
                className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-[#0E3B2F] hover:text-[#0A2E24] group"
              >
                <span>Next Ingredient</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-xs font-mono font-bold text-[#0D1F2D]/50">
                0{activeIndex + 1} / 03
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientStory;
