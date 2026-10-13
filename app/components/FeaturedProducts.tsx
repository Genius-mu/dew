'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { Plus, Eye, Check, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { addToCart, openQuickView } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Four key products
  const products = PRODUCTS.filter((p) => p.category !== 'Bundles');
  const currentProduct = products[activeCardIndex] || products[0];

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId((curr) => (curr === product.id ? null : curr));
    }, 1800);
  };

  const handlePrev = () => {
    setActiveCardIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCardIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="featured-products"
      className="relative w-full py-20 sm:py-28 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-block px-4 py-1 glass-badge rounded-full mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0E3B2F]">
              The Core Collection
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0D1F2D] tracking-tight leading-tight">
            Meet Your Daily Dew.
          </h2>
          <p className="text-xs sm:text-sm text-[#0D1F2D]/80 font-medium mt-2 max-w-md mx-auto">
            Pure botanical formulations crafted to balance, hydrate, and nourish your skin barrier.
          </p>

          {/* Interactive Product Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {products.map((prod, idx) => (
              <button
                key={prod.id}
                type="button"
                onClick={() => setActiveCardIndex(idx)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide transition-all ${
                  activeCardIndex === idx
                    ? 'bg-[#0E3B2F] text-white shadow-dew-card scale-102'
                    : 'glass-pill text-[#0D1F2D]/75 hover:text-[#0D1F2D] hover:bg-white/90'
                }`}
              >
                0{idx + 1} · {prod.name.replace('Dew ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Product Showcase Card Stage */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Card Frame */}
          <div className="w-full rounded-3xl glass-card p-5 sm:p-8 md:p-10 shadow-dew-deep border-2 border-white/95 relative transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
              {/* Left: Product Image Stage with Glass Pedestal */}
              <div className="relative w-full md:w-5/12 h-[220px] sm:h-[260px] md:h-[320px] rounded-2xl glass-panel p-4 flex items-center justify-center overflow-hidden border border-white/85 shrink-0">
                <Image
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  fill
                  className="object-contain p-3 drop-shadow-lg transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 360px"
                  priority
                />
                {/* Badge with category text only */}
                <div className="!absolute top-3 left-3 px-3 py-1 glass-badge rounded-full text-[10px] font-extrabold uppercase tracking-wider text-[#0E3B2F] shadow-sm z-10">
                  0{activeCardIndex + 1} · {currentProduct.category}
                </div>
                {/* Quick view button */}
                <button
                  type="button"
                  onClick={() => openQuickView(currentProduct)}
                  className="!absolute top-3 right-3 p-2 glass-pill text-[#0D1F2D] hover:text-[#0E3B2F] rounded-full shadow-sm hover-scale-pill z-10"
                  aria-label={`Quick view ${currentProduct.name}`}
                >
                  <Eye size={16} />
                </button>
              </div>

              {/* Right: Product Editorial Details */}
              <div className="w-full md:w-7/12 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#0E3B2F]">
                      {currentProduct.volume}
                    </span>
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-[#0D1F2D]">
                      <Star size={14} className="fill-[#FF6B35] text-[#FF6B35]" />
                      <span>{currentProduct.rating}</span>
                      <span className="text-[#0D1F2D]/50 text-[11px]">({currentProduct.reviewCount})</span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D1F2D] mb-1 leading-snug">
                    {currentProduct.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#FF6B35] mb-3">
                    {currentProduct.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-[#0D1F2D]/85 leading-relaxed mb-5">
                    {currentProduct.description}
                  </p>

                  {/* Key Ingredients */}
                  <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#0D1F2D]/60 block mb-2">
                      Active Botanicals
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentProduct.keyIngredients.map((ing) => (
                        <span
                          key={ing}
                          className="px-2.5 py-1 glass-badge text-[#0E3B2F] text-[11px] font-bold rounded-lg shadow-sm"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="pt-5 border-t border-white/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#0D1F2D]/60 font-bold block uppercase tracking-wider">
                      Price
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#0D1F2D]">
                      {currentProduct.formattedPrice}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(currentProduct)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all shadow-dew-card hover-scale-pill ${
                      addedId === currentProduct.id
                        ? 'bg-[#0E3B2F] text-[#FFFFFF]'
                        : 'bg-[#0E3B2F] hover:bg-[#0A2E24] text-[#FFFFFF] active:scale-95'
                    }`}
                  >
                    {addedId === currentProduct.id ? (
                      <>
                        <Check size={16} strokeWidth={3} />
                        <span>In Bag</span>
                      </>
                    ) : (
                      <>
                        <Plus size={16} strokeWidth={2.5} />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Prev / Next controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full glass-pill text-xs font-bold text-[#0D1F2D] hover:bg-white shadow-sm transition-all hover-scale-pill"
              aria-label="Previous formula"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            {/* Dots */}
            <div className="flex items-center space-x-2">
              {products.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveCardIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeCardIndex === idx
                      ? 'w-8 bg-[#0E3B2F]'
                      : 'w-2 bg-[#0D1F2D]/20 hover:bg-[#0D1F2D]/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full glass-pill text-xs font-bold text-[#0D1F2D] hover:bg-white shadow-sm transition-all hover-scale-pill"
              aria-label="Next formula"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
