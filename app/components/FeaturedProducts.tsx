'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { Plus, Eye, Check, Star, Sparkles } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { addToCart, openQuickView } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  // Filter individual 4 key products
  const featuredList = PRODUCTS.filter((p) => p.category !== 'Bundles');
  const heroProduct = featuredList.find((p) => p.isHero) || featuredList[0];
  const supportingProducts = featuredList.filter((p) => p.id !== heroProduct.id);

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId((curr) => (curr === product.id ? null : curr));
    }, 1800);
  };

  return (
    <section
      id="featured-products"
      className="relative w-full py-24 sm:py-32 bg-[#E3F2F7] border-t border-b border-[#0D1F2D]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#0D1F2D]/15">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0E3B2F] text-[#FFFFFF] rounded text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} />
              <span>The Core Collection</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0D1F2D] tracking-tight">
              Meet Your Daily Dew.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-base sm:text-lg text-[#0D1F2D]/80 max-w-md font-medium">
            Four targeted botanical formulas designed to cleanse, hydrate, protect, and refresh without complexity.
          </p>
        </div>

        {/* Editorial Layout: Large Featured Product + Supporting Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Featured Showcase: Dew Hydrate Serum (Takes 5 columns on desktop) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border-2 border-[#0E3B2F] shadow-dew-card flex flex-col justify-between relative group">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-[#0E3B2F] text-[#FFFFFF] text-xs font-bold uppercase tracking-wider rounded">
                Most Loved
              </span>
              <div className="flex items-center space-x-1 text-xs font-bold text-[#0D1F2D]">
                <Star size={14} className="fill-[#FF6B35] text-[#FF6B35]" />
                <span>{heroProduct.rating}</span>
                <span className="text-[#0D1F2D]/60">({heroProduct.reviewCount})</span>
              </div>
            </div>

            {/* Product Image Stage (solid background stage) */}
            <div className="relative w-full aspect-[4/5] bg-[#E3F2F7] rounded-xl overflow-hidden mb-6 flex items-center justify-center p-4">
              <Image
                src={heroProduct.image}
                alt={heroProduct.name}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <button
                type="button"
                onClick={() => openQuickView(heroProduct)}
                className="absolute top-4 right-4 p-2.5 bg-[#FFFFFF] text-[#0D1F2D] hover:text-[#0E3B2F] rounded-full shadow-dew-subtle opacity-90 hover:opacity-100 transition-opacity"
                aria-label={`Quick view ${heroProduct.name}`}
              >
                <Eye size={18} />
              </button>
            </div>

            {/* Details */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0E3B2F] mb-1">
                {heroProduct.category} · {heroProduct.volume}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D1F2D] mb-2">
                {heroProduct.name}
              </h3>
              <p className="text-sm text-[#0D1F2D]/80 mb-4 line-clamp-2">
                {heroProduct.description}
              </p>

              {/* Key Ingredients Pill List */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {heroProduct.keyIngredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-2.5 py-1 bg-[#E3F2F7] text-[#0E3B2F] text-[11px] font-bold rounded"
                  >
                    {ing}
                  </span>
                ))}
              </div>

              {/* Price & Action Row */}
              <div className="flex items-center justify-between pt-4 border-t border-[#0D1F2D]/10">
                <span className="text-2xl font-black text-[#0D1F2D]">
                  {heroProduct.formattedPrice}
                </span>

                <button
                  type="button"
                  onClick={() => handleAdd(heroProduct)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded text-sm font-bold tracking-wider uppercase transition-all duration-200 ${
                    addedId === heroProduct.id
                      ? 'bg-[#0E3B2F] text-[#FFFFFF]'
                      : 'bg-[#0E3B2F] hover:bg-[#0A2E24] text-[#FFFFFF] shadow-dew-subtle active:scale-95'
                  }`}
                >
                  {addedId === heroProduct.id ? (
                    <>
                      <Check size={16} strokeWidth={3} />
                      <span>Added to Bag</span>
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

          {/* Supporting Products Grid (Takes 7 columns on desktop, 3 distinct cards) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportingProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#0D1F2D]/15 shadow-dew-subtle hover:shadow-dew-card transition-shadow flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded"
                      style={{
                        backgroundColor: prod.accentColor,
                        color: '#0E3B2F',
                      }}
                    >
                      {prod.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => openQuickView(prod)}
                      className="p-1.5 text-[#0D1F2D]/60 hover:text-[#0E3B2F] rounded-full hover:bg-[#E3F2F7] transition-colors"
                      aria-label={`Quick view ${prod.name}`}
                    >
                      <Eye size={16} />
                    </button>
                  </div>

                  {/* Image stage with solid color pad */}
                  <div
                    className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 flex items-center justify-center p-3"
                    style={{ backgroundColor: prod.accentColor }}
                  >
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 250px"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-[#0D1F2D] mb-1">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#0D1F2D]/75 line-clamp-2 mb-3">
                    {prod.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#0D1F2D]/10">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-lg font-extrabold text-[#0D1F2D]">
                      {prod.formattedPrice}
                    </span>
                    <span className="text-[11px] font-medium text-[#0D1F2D]/60">
                      {prod.volume}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(prod)}
                    className={`w-full py-2.5 px-3 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all duration-150 ${
                      addedId === prod.id
                        ? 'bg-[#0E3B2F] text-[#FFFFFF]'
                        : 'bg-[#0D1F2D] hover:bg-[#0E3B2F] text-[#FFFFFF] active:scale-95'
                    }`}
                  >
                    {addedId === prod.id ? (
                      <>
                        <Check size={14} strokeWidth={3} />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
