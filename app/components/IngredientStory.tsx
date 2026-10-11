'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { INGREDIENTS } from '../data/products';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const IngredientStory: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentIngredient = INGREDIENTS[activeIndex];

  return (
    <section
      id="ingredients"
      className="relative w-full py-24 sm:py-32 bg-[#FDF1C8] border-b border-[#0D1F2D]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0E3B2F] text-[#FFFFFF] rounded text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            <span>Formulation Philosophy</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0D1F2D] tracking-tight">
            Good Things, Thoughtfully Chosen.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#0D1F2D]/80 font-medium">
            We believe in high-affinity botanical actives that respect your barrier. No filler fragrance, no harsh sulfates, and no hollow promises.
          </p>
        </div>

        {/* Tab Controls to explore or scrub */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-[#0D1F2D]/15">
          {INGREDIENTS.map((ing, idx) => (
            <button
              key={ing.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-150 ${
                activeIndex === idx
                  ? 'bg-[#0E3B2F] text-[#FFFFFF] shadow-dew-subtle'
                  : 'bg-[#FFFFFF] text-[#0D1F2D] hover:bg-[#FFFFFF]/80 border border-[#0D1F2D]/10'
              }`}
            >
              0{idx + 1}. {ing.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Main Stage: Editorial 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Oversized Tactile Ingredient Photography */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#FFFFFF] rounded-2xl overflow-hidden shadow-dew-deep border-2 border-[#0E3B2F] p-3">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={currentIngredient.image}
                  alt={currentIngredient.title}
                  fill
                  className="object-cover transition-all duration-500 ease-out"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>

              {/* Floating Pill Badge */}
              <div className="absolute top-6 left-6 px-3.5 py-1.5 bg-[#FFFFFF] rounded-md shadow-dew-subtle border border-[#0D1F2D]/10 flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-[#0E3B2F]" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0E3B2F]">
                  {currentIngredient.badge}
                </span>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {INGREDIENTS.map((ing, idx) => (
                <button
                  key={ing.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all p-1 bg-[#FFFFFF] ${
                    activeIndex === idx
                      ? 'border-[#0E3B2F] ring-2 ring-[#0E3B2F]/20'
                      : 'border-transparent opacity-60 hover:opacity-90'
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

          {/* Right Column: Editorial Copy & Pairing Note */}
          <div className="lg:col-span-5 bg-[#FFFFFF] rounded-2xl p-8 sm:p-10 shadow-dew-card border border-[#0D1F2D]/10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0E3B2F] block mb-2">
              Ingredient 0{activeIndex + 1} of 03
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0D1F2D] mb-2 leading-tight">
              {currentIngredient.title}
            </h3>
            <p className="text-sm font-semibold text-[#FF6B35] mb-4">
              {currentIngredient.subtitle}
            </p>
            <p className="text-base text-[#0D1F2D]/80 leading-relaxed mb-6 font-normal">
              {currentIngredient.description}
            </p>

            <div className="pt-6 border-t border-[#0D1F2D]/10 space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-xs font-bold text-[#0D1F2D]/60 uppercase tracking-wider shrink-0 mt-0.5">
                  Harvest:
                </span>
                <span className="text-xs font-semibold text-[#0D1F2D]">
                  {currentIngredient.origin}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-xs font-bold text-[#0D1F2D]/60 uppercase tracking-wider shrink-0 mt-0.5">
                  Featured In:
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
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#0E3B2F] hover:text-[#0A2E24] group"
              >
                <span>Next Ingredient</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-xs font-mono font-bold text-[#0D1F2D]/40">
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
