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
        x: -100,
        scale: 0.9,
        rotateY: -12,
        pointerEvents: 'none',
        duration: 1,
      })
      .fromTo(
        cards[1],
        { opacity: 0, x: 100, scale: 0.9, rotateY: 12, pointerEvents: 'none' },
        { opacity: 1, x: 0, scale: 1, rotateY: 0, pointerEvents: 'auto', duration: 1 },
        '<'
      )
      // Transition from Card 1 to Card 2
      .to(cards[1], {
        opacity: 0,
        x: -100,
        scale: 0.9,
        rotateY: -12,
        pointerEvents: 'none',
        duration: 1,
      })
      .fromTo(
        cards[2],
        { opacity: 0, x: 100, scale: 0.9, rotateY: 12, pointerEvents: 'none' },
        { opacity: 1, x: 0, scale: 1, rotateY: 0, pointerEvents: 'auto', duration: 1 },
        '<'
      )
      // Transition from Card 2 to Card 3
      .to(cards[2], {
        opacity: 0,
        x: -100,
        scale: 0.9,
        rotateY: -12,
        pointerEvents: 'none',
        duration: 1,
      })
      .fromTo(
        cards[3],
        { opacity: 0, x: 100, scale: 0.9, rotateY: 12, pointerEvents: 'none' },
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
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between pt-20 pb-4 sm:pt-22 sm:pb-6"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-between">
        {/* Compact Section Header with Glass Badge (NO icon) */}
        <div className="text-center max-w-xl mx-auto shrink-0">
          <div className="inline-block px-3.5 py-1 glass-badge rounded-full mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0E3B2F]">
              The Core Collection
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0D1F2D] tracking-tight leading-tight">
            Meet Your Daily Dew.
          </h2>
          <p className="text-[11px] sm:text-xs text-[#0D1F2D]/75 font-medium mt-1">
            Scroll to reveal each targeted formula · Card {activeCardIndex + 1} of {products.length}
          </p>

          {/* Interactive Progress Indicators */}
          <div className="flex justify-center items-center space-x-2 mt-2">
            {products.map((p, idx) => (
              <div
                key={p.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeCardIndex === idx
                    ? 'w-7 bg-[#0E3B2F]'
                    : 'w-2 bg-[#0D1F2D]/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 4 Pinned Cards Stage: Perfectly proportioned to never clip on laptops or mobiles */}
        <div
          ref={cardsContainerRef}
          className="relative w-full max-w-3xl mx-auto h-[370px] sm:h-[400px] md:h-[420px] my-auto flex items-center justify-center shrink-0"
          style={{ perspective: 1200 }}
        >
          {products.map((prod, index) => {
            const isInitial = index === 0;
            return (
              <div
                key={prod.id}
                className={`product-scroll-card absolute top-0 left-0 right-0 bottom-0 w-full h-full rounded-2xl sm:rounded-3xl glass-card p-4 sm:p-6 md:p-7 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 shadow-dew-deep border-2 border-white/90 transition-shadow ${
                  isInitial ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Left: Product Image Stage with Glass Pedestal */}
                <div className="relative w-full md:w-5/12 h-[150px] md:h-full rounded-xl sm:rounded-2xl glass-panel p-3 flex items-center justify-center overflow-hidden border border-white/80 shrink-0">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-contain p-2 drop-shadow-md"
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority={isInitial}
                  />
                  {/* Badge with text only (no icon) */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 glass-badge rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#0E3B2F]">
                    0{index + 1} · {prod.category}
                  </div>
                  <button
                    type="button"
                    onClick={() => openQuickView(prod)}
                    className="absolute top-2.5 right-2.5 p-1.5 glass-pill text-[#0D1F2D] hover:text-[#0E3B2F] rounded-full shadow-sm hover-scale-pill"
                    aria-label={`Quick view ${prod.name}`}
                  >
                    <Eye size={15} />
                  </button>
                </div>

                {/* Right: Editorial Details */}
                <div className="w-full md:w-7/12 flex flex-col justify-between h-full text-left py-0.5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0E3B2F]">
                        {prod.volume}
                      </span>
                      <div className="flex items-center space-x-1 text-xs font-bold text-[#0D1F2D]">
                        <Star size={13} className="fill-[#FF6B35] text-[#FF6B35]" />
                        <span>{prod.rating}</span>
                        <span className="text-[#0D1F2D]/50 text-[10px]">({prod.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D1F2D] mb-0.5 leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-bold text-[#FF6B35] mb-2">
                      {prod.tagline}
                    </p>
                    <p className="text-xs text-[#0D1F2D]/80 leading-relaxed mb-3 line-clamp-2">
                      {prod.description}
                    </p>

                    {/* Key Ingredients */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {prod.keyIngredients.map((ing) => (
                        <span
                          key={ing}
                          className="px-2 py-0.5 glass-badge text-[#0E3B2F] text-[10px] font-bold rounded-md"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-white/60 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] text-[#0D1F2D]/60 font-bold block uppercase tracking-wider">
                        Price
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-[#0D1F2D]">
                        {prod.formattedPrice}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAdd(prod)}
                      className={`flex items-center space-x-1.5 px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all shadow-dew-subtle hover-scale-pill ${
                        addedId === prod.id
                          ? 'bg-[#0E3B2F] text-[#FFFFFF]'
                          : 'bg-[#0E3B2F] hover:bg-[#0A2E24] text-[#FFFFFF] active:scale-95'
                      }`}
                    >
                      {addedId === prod.id ? (
                        <>
                          <Check size={14} strokeWidth={3} />
                          <span>In Bag</span>
                        </>
                      ) : (
                        <>
                          <Plus size={14} strokeWidth={2.5} />
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
        <div className="text-center pb-1 shrink-0">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0D1F2D]/60">
            Keep scrolling to complete the showcase
          </span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
