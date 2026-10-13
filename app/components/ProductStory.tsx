'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Plus, Check, Droplets, Sparkles } from 'lucide-react';

export const ProductStory: React.FC = () => {
  const { addToCart, openQuickView } = useCart();
  const [added, setAdded] = useState(false);
  const [activeAngle, setActiveAngle] = useState<'front' | 'angle'>('front');
  const serumProduct = PRODUCTS.find((p) => p.id === 'dew-hydrate-serum') || PRODUCTS[0];

  const handleAdd = () => {
    addToCart(serumProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section
      id="product-story"
      className="relative w-full py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Story Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block px-4 py-1 glass-badge rounded-full mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0E3B2F]">
              Signature Formula
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0D1F2D] tracking-tight">
            A Little More Hydration.
          </h2>
          <p className="text-xs sm:text-sm text-[#0D1F2D]/80 font-medium mt-2 max-w-lg mx-auto">
            Every drop is crafted to merge effortlessly with your skin’s natural lipid barrier.
          </p>
        </div>

        {/* 3-Column Layout: Non-overlapping, rock-solid responsiveness */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Callout 1 & 3 */}
          <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
            {/* Story Callout 1: Hydration That Lasts */}
            <div className="glass-panel p-6 rounded-3xl shadow-dew-card border border-white/90 hover-scale-subtle">
              <span className="inline-block px-3 py-1 glass-badge rounded-full text-[10px] font-extrabold uppercase tracking-wider text-[#0E3B2F] mb-3">
                Multi-Depth
              </span>
              <h3 className="text-lg font-extrabold text-[#0D1F2D] mb-1.5">
                Hydration that lasts.
              </h3>
              <p className="text-xs sm:text-sm text-[#0D1F2D]/75 leading-relaxed">
                Multi-weight botanical humectants anchor moisture within the epidermal layers for sustained, all-day comfort.
              </p>
            </div>

            {/* Story Callout 3: Everyday Routine */}
            <div className="glass-panel p-6 rounded-3xl shadow-dew-card border border-white/90 hover-scale-subtle">
              <span className="inline-block px-3 py-1 glass-badge rounded-full text-[10px] font-extrabold uppercase tracking-wider text-[#0E3B2F] mb-3">
                Daily Ritual
              </span>
              <h3 className="text-lg font-extrabold text-[#0D1F2D] mb-1.5">
                Made for everyday routines.
              </h3>
              <p className="text-xs sm:text-sm text-[#0D1F2D]/75 leading-relaxed">
                Formulated without pore-clogging oils, synthetic colorants, or heavy silicones. Clean, weightless, and skin-identical.
              </p>
            </div>
          </div>

          {/* Center Column: The Serum Hero Bottle Stage */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative w-[220px] sm:w-[260px] md:w-[280px] aspect-[3/4] glass-card rounded-3xl p-4 shadow-dew-deep border-2 border-white/95 transition-all duration-300">
              <div className="relative w-full h-full">
                <Image
                  src={activeAngle === 'front' ? '/images/serum.jpg' : '/images/serum-angle.jpg'}
                  alt="Dew Hydrate Serum"
                  fill
                  className="object-contain p-2 drop-shadow-xl transition-all duration-300"
                  sizes="(max-width: 768px) 240px, 300px"
                  priority
                />
              </div>

              {/* Angle View Selector Pill */}
              <div className="!absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1 glass-pill p-1 rounded-full shadow-sm z-10">
                <button
                  type="button"
                  onClick={() => setActiveAngle('front')}
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                    activeAngle === 'front'
                      ? 'bg-[#0E3B2F] text-white shadow-sm'
                      : 'text-[#0D1F2D]/70 hover:text-[#0D1F2D]'
                  }`}
                >
                  Front
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAngle('angle')}
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                    activeAngle === 'angle'
                      ? 'bg-[#0E3B2F] text-white shadow-sm'
                      : 'text-[#0D1F2D]/70 hover:text-[#0D1F2D]'
                  }`}
                >
                  Angle 3/4
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Callout 2 & Efficacy Proof */}
          <div className="lg:col-span-4 flex flex-col gap-6 order-3">
            {/* Story Callout 2: Lightweight Feel */}
            <div className="glass-panel p-6 rounded-3xl shadow-dew-card border border-white/90 hover-scale-subtle">
              <span className="inline-block px-3 py-1 glass-badge rounded-full text-[10px] font-extrabold uppercase tracking-wider text-[#0E3B2F] mb-3">
                Fast-Absorbing
              </span>
              <h3 className="text-lg font-extrabold text-[#0D1F2D] mb-1.5">
                Weightless feel.
              </h3>
              <p className="text-xs sm:text-sm text-[#0D1F2D]/75 leading-relaxed">
                Fast-absorbing liquid essence that absorbs in seconds, leaving zero stickiness even in warm or humid climates.
              </p>
            </div>

            {/* Botanical Efficacy Metrics */}
            <div className="glass-panel p-6 rounded-3xl shadow-dew-card border border-white/90 hover-scale-subtle">
              <div className="flex items-center space-x-2 mb-3">
                <span className="p-1.5 glass-badge rounded-full text-[#0E3B2F]">
                  <Droplets size={14} />
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0E3B2F]">
                  Clinical Performance
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 glass-pill rounded-2xl text-center">
                  <span className="text-xl font-black text-[#0E3B2F] block">98%</span>
                  <span className="text-[10px] text-[#0D1F2D]/70 font-bold">Barrier Support</span>
                </div>
                <div className="p-3 glass-pill rounded-2xl text-center">
                  <span className="text-xl font-black text-[#0E3B2F] block">24H</span>
                  <span className="text-[10px] text-[#0D1F2D]/70 font-bold">Deep Hydration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quick-Action Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <div className="flex items-center space-x-3 glass-pill px-6 py-3 rounded-full shadow-sm">
            <span className="text-xs sm:text-sm font-bold text-[#0D1F2D]">Dew Hydrate Serum</span>
            <span className="text-xs sm:text-sm font-black text-[#0E3B2F]">₦12,500</span>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center space-x-2 px-7 py-3 bg-[#0E3B2F] hover:bg-[#0A2E24] text-[#FFFFFF] text-xs font-extrabold uppercase tracking-wider rounded-full shadow-dew-card active:scale-95 transition-all hover-scale-pill"
          >
            {added ? (
              <>
                <Check size={16} strokeWidth={3} />
                <span>In Your Bag</span>
              </>
            ) : (
              <>
                <Plus size={16} strokeWidth={2.5} />
                <span>Add Serum to Bag</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => openQuickView(serumProduct)}
            className="px-5 py-3 glass-pill hover:bg-white text-[#0D1F2D] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm transition-all hover-scale-pill"
          >
            Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductStory;
