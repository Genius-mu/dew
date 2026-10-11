'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Truck, ShieldCheck, RefreshCw, HeartHandshake, ArrowRight } from 'lucide-react';

export const FinalCollection: React.FC = () => {
  const { addToCart } = useCart();
  const bundleProduct = PRODUCTS.find((p) => p.id === 'dew-3-step-bundle')!;

  const reassurancePoints = [
    {
      icon: Truck,
      title: 'Nationwide Delivery',
      desc: 'Fast, secure shipping across Lagos, Abuja, Port Harcourt & all Nigerian states.',
    },
    {
      icon: ShieldCheck,
      title: '100% Genuine Care',
      desc: 'Pure botanical actives formulated with verified cosmetic standards.',
    },
    {
      icon: RefreshCw,
      title: '30-Day Satisfaction',
      desc: 'Try Dew for a month. If your skin is not delighted, we make it right.',
    },
    {
      icon: HeartHandshake,
      title: 'Personal Skincare Help',
      desc: 'Direct consultation via WhatsApp and email for custom routine guidance.',
    },
  ];

  return (
    <section
      id="final-collection"
      className="relative w-full min-h-screen py-24 sm:py-32 overflow-hidden flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between z-10">
        {/* Top Header Block with Glass Badge (NO icon) */}
        <div className="text-center max-w-3xl mx-auto pt-6">
          <div className="inline-block px-4 py-1 glass-badge rounded-full mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0E3B2F]">
              Find Your Daily Dew
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#0D1F2D] tracking-tight leading-tight">
            Your next ritual{' '}
            <span className="font-serif italic font-normal text-[#0E3B2F]">
              starts here.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-[#0D1F2D]/85 font-medium max-w-xl mx-auto">
            Find the essentials that fit your everyday routine. Thoughtfully crafted to keep skin hydrated, resilient, and luminous.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#featured-products"
              className="px-8 py-3.5 bg-[#0E3B2F] hover:bg-[#0A2E24] text-[#FFFFFF] text-xs font-extrabold uppercase tracking-wider rounded-full shadow-dew-card active:scale-95 transition-all"
            >
              Shop all skincare
            </a>
            <button
              type="button"
              onClick={() => addToCart(bundleProduct)}
              className="px-8 py-3.5 glass-panel hover:bg-white/90 text-[#0D1F2D] text-xs font-extrabold uppercase tracking-wider rounded-full shadow-dew-subtle border border-white/80 active:scale-95 transition-all flex items-center space-x-2"
            >
              <span>Build your routine</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Full Family Product Composition (Serum, Cream, Cleanser, Mist) on Glass Cards */}
        <div className="my-16 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {PRODUCTS.filter((p) => p.category !== 'Bundles').map((p) => (
              <div
                key={p.id}
                className="glass-card rounded-3xl p-4 sm:p-5 shadow-dew-card border border-white/80 flex flex-col justify-between group hover:shadow-dew-deep transition-all"
              >
                <div className="relative aspect-[3/4] glass-panel rounded-2xl overflow-hidden mb-3 p-2 flex items-center justify-center">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#0D1F2D] truncate">
                    {p.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs font-bold text-[#0E3B2F]">
                      {p.formattedPrice}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(p)}
                      className="px-2.5 py-1 bg-[#0E3B2F] text-[#FFFFFF] text-[10px] font-extrabold uppercase rounded-full hover:bg-[#0A2E24] transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reassurance Row: Frosted Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
          {reassurancePoints.map((pt) => {
            const Icon = pt.icon;
            return (
              <div
                key={pt.title}
                className="glass-panel rounded-2xl p-5 shadow-dew-subtle border border-white/80 flex items-start space-x-3.5"
              >
                <div className="p-2.5 glass-badge text-[#0E3B2F] rounded-xl shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0D1F2D] mb-1">
                    {pt.title}
                  </h4>
                  <p className="text-[11px] text-[#0D1F2D]/75 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FinalCollection;
