'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { Plus, Eye, Check, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const FeaturedProducts: React.FC = () => {
  const { addToCart, openQuickView } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Four key products
  const products = PRODUCTS.filter((p) => p.category !== 'Bundles');

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId((curr) => (curr === product.id ? null : curr));
    }, 1800);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.product-scroll-card');

      // GSAP ScrollTrigger Scrubbing Timeline that stops the user in this section
      // and brings each card into view one by one as they scroll!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=240%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              products.length - 1,
              Math.floor(self.progress * products.length)
            );
            setActiveCardIndex(index);
          },
        },
      });

      // Card 0 starts in view
      // Transition from Card 0 to Card 1
      tl.to(cards[0], {
        opacity: 0,
        x: -120,
        scale: 0.88,
        rotateY: -15,
        pointerEvents: 'none',
        duration: 1,
      })
      .fromTo(
        cards[1],
        { opacity: 0, x: 120, scale: 0.88, rotateY: 15, pointerEvents: 'none' },
        { opacity: 1, x: 0, scale: 1, rotateY: 0, pointerEvents: 'auto', duration: 1 },
        '<'
      )
      // Transition from Card 1 to Card 2
      .to(cards[1], {
        opacity: 0,
        x: -120,
        scale: 0.88,
        rotateY: -15,
        pointerEvents: 'none',
        duration: 1,
      })
      .fromTo(
        cards[2],
        { opacity: 0, x: 120, scale: 0.88, rotateY: 15, pointerEvents: 'none' },
        { opacity: 1, x: 0, scale: 1, rotateY: 0, pointerEvents: 'auto', duration: 1 },
        '<'
      )
      // Transition from Card 2 to Card 3
      .to(cards[2], {
        opacity: 0,
        x: -120,
        scale: 0.88,
        rotateY: -15,
        pointerEvents: 'none',
        duration: 1,
      })
      .fromTo(
        cards[3],
        { opacity: 0, x: 120, scale: 0.88, rotateY: 15, pointerEvents: 'none' },
        { opacity: 1, x: 0, scale: 1, rotateY: 0, pointerEvents: 'auto', duration: 1 },
        '<'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [products.length]);

  return (
    <section
      ref={sectionRef}
      id="featured-products"
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between py-12 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        {/* Section Header with Glass Badge (NO icon) */}
        <div className="text-center max-w-2xl mx-auto pt-4 sm:pt-6">
          <div className="inline-block px-4 py-1 glass-badge rounded-full mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0E3B2F]">
              The Core Collection
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0D1F2D] tracking-tight">
            Meet Your Daily Dew.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#0D1F2D]/80 font-medium">
            Scroll to reveal each targeted formula · Card {activeCardIndex + 1} of {products.length}
          </p>

          {/* Interactive Progress Indicators */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            {products.map((p, idx) => (
              <div
                key={p.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeCardIndex === idx
                    ? 'w-8 bg-[#0E3B2F]'
                    : 'w-2 bg-[#0D1F2D]/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 4 Pinned Cards Stage: Each card comes into view as you scroll */}
        <div
          ref={cardsContainerRef}
          className="relative flex-1 w-full max-w-4xl mx-auto flex items-center justify-center my-4"
          style={{ perspective: 1200 }}
        >
          {products.map((prod, index) => {
            const isInitial = index === 0;
            return (
              <div
                key={prod.id}
                className={`product-scroll-card absolute inset-0 max-w-3xl mx-auto h-[460px] sm:h-[480px] rounded-3xl glass-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-dew-deep border-2 border-white/90 transition-shadow ${
                  isInitial ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Left: Product Image Stage with Glass Pedestal */}
                <div className="relative w-full md:w-1/2 h-[220px] md:h-full rounded-2xl glass-panel p-4 flex items-center justify-center overflow-hidden border border-white/80">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-contain p-3 drop-shadow-md"
                    sizes="(max-width: 768px) 100vw, 380px"
                    priority={isInitial}
                  />
                  {/* Badge with text only (no icon) */}
                  <div className="absolute top-3 left-3 px-3 py-1 glass-badge rounded-full text-[10px] font-extrabold uppercase tracking-wider text-[#0E3B2F]">
                    0{index + 1} · {prod.category}
                  </div>
                  <button
                    type="button"
                    onClick={() => openQuickView(prod)}
                    className="absolute top-3 right-3 p-2 glass-pill text-[#0D1F2D] hover:text-[#0E3B2F] rounded-full shadow-sm"
                    aria-label={`Quick view ${prod.name}`}
                  >
                    <Eye size={17} />
                  </button>
                </div>

                {/* Right: Editorial Details */}
                <div className="w-full md:w-1/2 flex flex-col justify-between h-full text-left py-2">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0E3B2F]">
                        {prod.volume}
                      </span>
                      <div className="flex items-center space-x-1 text-xs font-bold text-[#0D1F2D]">
                        <Star size={14} className="fill-[#FF6B35] text-[#FF6B35]" />
                        <span>{prod.rating}</span>
                        <span className="text-[#0D1F2D]/50">({prod.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D1F2D] mb-1">
                      {prod.name}
                    </h3>
                    <p className="text-xs font-bold text-[#FF6B35] mb-3">
                      {prod.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-[#0D1F2D]/80 leading-relaxed mb-4 line-clamp-3">
                      {prod.description}
                    </p>

                    {/* Key Ingredients */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {prod.keyIngredients.map((ing) => (
                        <span
                          key={ing}
                          className="px-2.5 py-1 glass-badge text-[#0E3B2F] text-[11px] font-bold rounded-md"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-white/60 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#0D1F2D]/60 font-bold block uppercase tracking-wider">
                        Price
                      </span>
                      <span className="text-2xl font-black text-[#0D1F2D]">
                        {prod.formattedPrice}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAdd(prod)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all shadow-dew-subtle ${
                        addedId === prod.id
                          ? 'bg-[#0E3B2F] text-[#FFFFFF]'
                          : 'bg-[#0E3B2F] hover:bg-[#0A2E24] text-[#FFFFFF] active:scale-95'
                      }`}
                    >
                      {addedId === prod.id ? (
                        <>
                          <Check size={15} strokeWidth={3} />
                          <span>In Bag</span>
                        </>
                      ) : (
                        <>
                          <Plus size={15} strokeWidth={2.5} />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Bar */}
        <div className="text-center pb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D1F2D]/60">
            Keep scrolling to complete the showcase
          </span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
