'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Sparkles, Check, ShoppingBag, Eye, ArrowRight } from 'lucide-react';

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
      className="relative w-full py-24 sm:py-32 bg-[#FA7E70] text-[#FFFFFF] overflow-hidden border-b border-[#0D1F2D]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#FFFFFF] text-[#0E3B2F] rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-dew-subtle">
            <Sparkles size={14} className="text-[#0E3B2F]" />
            <span>The Daily Protocol</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#FFFFFF] tracking-tight">
            Three Steps. Your Own Rhythm.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#FFFFFF]/90 font-medium">
            Skincare doesn’t need twelve steps to deliver transformative results. Pure ingredients, sequenced with intention.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#0E3B2F] p-1.5 rounded-full space-x-1 shadow-dew-card">
            {steps.map((s) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(s.step)}
                className={`px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-150 ${
                  activeStep === s.step
                    ? 'bg-[#FFFFFF] text-[#0E3B2F] shadow-dew-subtle'
                    : 'text-[#FFFFFF]/75 hover:text-[#FFFFFF]'
                }`}
              >
                Step 0{s.step} · {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Routine Choreography: 3 Distinct Physical Products Arranged in Space */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((s) => {
            const isCurrent = activeStep === s.step;
            return (
              <div
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#FFFFFF] text-[#0D1F2D] shadow-dew-deep ring-4 ring-[#0E3B2F] scale-102'
                    : 'bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#0D1F2D] shadow-dew-subtle opacity-90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-[#0E3B2F] text-[#FFFFFF] text-xs font-extrabold uppercase tracking-wider rounded">
                      Step 0{s.step}
                    </span>
                    <span className="text-xs font-bold text-[#0E3B2F]">
                      {s.role}
                    </span>
                  </div>

                  {/* Product Stage */}
                  <div className="relative aspect-[3/4] bg-[#E3F2F7] rounded-xl overflow-hidden mb-6 p-4 flex items-center justify-center">
                    <Image
                      src={s.product.image}
                      alt={s.product.name}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickView(s.product);
                      }}
                      className="absolute bottom-3 right-3 p-2 bg-[#FFFFFF] text-[#0D1F2D] hover:text-[#0E3B2F] rounded-full shadow-dew-subtle"
                      aria-label={`Inspect ${s.product.name}`}
                    >
                      <Eye size={16} />
                    </button>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0D1F2D] mb-1">
                    {s.product.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#0E3B2F] mb-3">
                    {s.product.formattedPrice} · {s.product.volume}
                  </p>
                  <p className="text-xs text-[#0D1F2D]/80 leading-relaxed">
                    {s.instruction}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#0D1F2D]/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(s.product);
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-[#0E3B2F] hover:text-[#0A2E24] flex items-center space-x-1"
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

        {/* Bundle Banner CTA: "Build your routine" */}
        <div className="bg-[#0E3B2F] text-[#FFFFFF] rounded-2xl p-8 sm:p-10 shadow-dew-deep flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#FFFFFF]/20">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-[#FA7E70] text-[#FFFFFF] text-xs font-extrabold uppercase tracking-wider rounded mb-2">
              Save ₦5,000 Today
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] mb-2">
              The Complete Daily Dew Ritual Set
            </h3>
            <p className="text-sm text-[#FFFFFF]/80">
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
              className="px-8 py-4 bg-[#FFFFFF] hover:bg-[#FDE89D] text-[#0E3B2F] text-sm font-extrabold uppercase tracking-wider rounded-sm active:scale-95 transition-all shadow-dew-card flex items-center space-x-2"
            >
              {bundleAdded ? (
                <>
                  <Check size={18} strokeWidth={3} />
                  <span>Routine Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} strokeWidth={2.2} />
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
