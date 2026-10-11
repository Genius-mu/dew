'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Check, ShoppingBag, Eye, ArrowRight } from 'lucide-react';

export const TheRitual: React.FC = () => {
  const { addToCart, openQuickView } = useCart();
  const [activeStep, setActiveStep] = useState(1);
  const [bundleAdded, setBundleAdded] = useState(false);

  const steps = [
    {
      step: 1,
      name: 'Cleanse',
      product: PRODUCTS.find((p) => p.id === 'dew-glow-cleanser')!,
      role: 'Reset & Purify',
      instruction:
        'Wash away environmental pollution, sunscreen, and daily grime while keeping your barrier lipid matrix intact.',
    },
    {
      step: 2,
      name: 'Hydrate',
      product: PRODUCTS.find((p) => p.id === 'dew-hydrate-serum')!,
      role: 'Replenish Deep Moisture',
      instruction:
        'Press 3–4 drops of botanical hydration serum into skin to draw water deep into cellular reservoirs.',
    },
    {
      step: 3,
      name: 'Moisturize',
      product: PRODUCTS.find((p) => p.id === 'dew-daily-cream')!,
      role: 'Lock In & Protect',
      instruction:
        'Seal in all active nutrients with whipped colloidal oat barrier cream for a velvet, supple finish all day.',
    },
  ];

  const bundleProduct = PRODUCTS.find((p) => p.id === 'dew-3-step-bundle')!;

  const handleAddBundle = () => {
    addToCart(bundleProduct);
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);
  };

  return (
    <section
      id="the-ritual"
      className="relative w-full py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Glass Badge (NO icon) */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-4 py-1 glass-badge rounded-full mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0E3B2F]">
              The Daily Protocol
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0D1F2D] tracking-tight">
            Three Steps. Your Own Rhythm.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#0D1F2D]/85 font-medium">
            Skincare doesn’t need twelve steps to deliver transformative results. Pure ingredients, sequenced with intention.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex glass-pill p-1.5 rounded-full space-x-1 shadow-dew-subtle">
            {steps.map((s) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(s.step)}
                className={`px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-150 ${
                  activeStep === s.step
                    ? 'bg-[#0E3B2F] text-[#FFFFFF] shadow-sm'
                    : 'text-[#0D1F2D]/75 hover:text-[#0D1F2D]'
                }`}
              >
                Step 0{s.step} · {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Routine Cards on Glass Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {steps.map((s) => {
            const isCurrent = activeStep === s.step;
            return (
              <div
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? 'glass-card border-2 border-[#0E3B2F] shadow-dew-deep scale-102'
                    : 'glass-panel hover:bg-white/70 shadow-dew-subtle'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Text badge with NO icon */}
                    <span className="px-3 py-1 bg-[#0E3B2F] text-[#FFFFFF] text-[10px] font-extrabold uppercase tracking-wider rounded-full">
                      Step 0{s.step}
                    </span>
                    <span className="text-xs font-bold text-[#0E3B2F]">
                      {s.role}
                    </span>
                  </div>

                  {/* Product Stage */}
                  <div className="relative aspect-[3/4] glass-panel rounded-2xl overflow-hidden mb-5 p-3 flex items-center justify-center border border-white/80">
                    <Image
                      src={s.product.image}
                      alt={s.product.name}
                      fill
                      className="object-contain p-2 drop-shadow-md"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickView(s.product);
                      }}
                      className="absolute bottom-3 right-3 p-2 glass-pill text-[#0D1F2D] hover:text-[#0E3B2F] rounded-full shadow-sm"
                      aria-label={`Inspect ${s.product.name}`}
                    >
                      <Eye size={16} />
                    </button>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0D1F2D] mb-1">
                    {s.product.name}
                  </h3>
                  <p className="text-xs font-bold text-[#0E3B2F] mb-2">
                    {s.product.formattedPrice} · {s.product.volume}
                  </p>
                  <p className="text-xs text-[#0D1F2D]/80 leading-relaxed">
                    {s.instruction}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(s.product);
                    }}
                    className="text-xs font-extrabold uppercase tracking-wider text-[#0E3B2F] hover:text-[#0A2E24] flex items-center space-x-1"
                  >
                    <span>Add Step 0{s.step}</span>
                    <ArrowRight size={14} />
                  </button>
                  <span className="text-[11px] font-bold text-[#0D1F2D]/50">
                    {s.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bundle Banner CTA: "Build your routine" with Glassmorphism */}
        <div className="glass-dark text-[#FFFFFF] rounded-3xl p-8 sm:p-10 shadow-dew-deep flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-block px-3 py-1 glass-badge text-[#0E3B2F] text-[10px] font-extrabold uppercase tracking-wider rounded-full mb-2">
              Save ₦5,000 Today
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] mb-2">
              The Complete Daily Dew Ritual Set
            </h3>
            <p className="text-xs sm:text-sm text-[#FFFFFF]/85">
              Get all three full-size essentials together. Cleanse, Hydrate, and Moisturize in one cohesive regimen with free priority delivery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="text-center sm:text-right">
              <span className="line-through text-xs font-bold text-[#FFFFFF]/50 block">
                ₦32,000
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#FDE89D]">
                ₦27,000
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddBundle}
              className="px-8 py-3.5 bg-[#FFFFFF] hover:bg-[#FDE89D] text-[#0E3B2F] text-xs font-extrabold uppercase tracking-wider rounded-full active:scale-95 transition-all shadow-dew-card flex items-center space-x-2 hover-scale-pill"
            >
              {bundleAdded ? (
                <>
                  <Check size={16} strokeWidth={3} />
                  <span>Routine Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} strokeWidth={2.4} />
                  <span>Build your routine</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheRitual;
