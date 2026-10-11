'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Plus, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ProductStory: React.FC = () => {
  const { addToCart, openQuickView } = useCart();
  const [added, setAdded] = useState(false);
  const serumProduct = PRODUCTS.find((p) => p.id === 'dew-hydrate-serum') || PRODUCTS[0];

  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const bottleFrontRef = useRef<HTMLDivElement>(null);
  const bottleAngleRef = useRef<HTMLDivElement>(null);
  const callout1Ref = useRef<HTMLDivElement>(null);
  const callout2Ref = useRef<HTMLDivElement>(null);
  const callout3Ref = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const ctaBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !sceneRef.current) return;

    const ctx = gsap.context(() => {
      // Main scrubbed timeline pinned across 180% scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // PHASE 1: Bottle arrives from right & tilts into view
      tl.fromTo(
        bottleFrontRef.current,
        { x: 260, y: 50, rotation: 12, scale: 0.8, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
      );

      // Title reveals
      tl.fromTo(
        titleBlockRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.5'
      );

      // PHASE 2: Product enlargement & perspective approach
      tl.to(bottleFrontRef.current, {
        scale: 1.25,
        y: -15,
        duration: 1,
        ease: 'power1.inOut',
      });

      // PHASE 3: Ingredient storytelling callouts appear around product
      tl.fromTo(
        callout1Ref.current,
        { opacity: 0, x: -60, scale: 0.85 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
        '-=0.4'
      );
      tl.fromTo(
        callout2Ref.current,
        { opacity: 0, x: 60, scale: 0.85 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
        '-=0.5'
      );
      tl.fromTo(
        callout3Ref.current,
        { opacity: 0, y: 60, scale: 0.85 },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
        '-=0.5'
      );

      // PHASE 4: 3D perspective rotation (Crossfade front bottle to 3/4 angle bottle)
      tl.to(bottleFrontRef.current, {
        opacity: 0,
        rotationY: -45,
        scale: 1.15,
        duration: 1,
        ease: 'power2.inOut',
      });
      tl.fromTo(
        bottleAngleRef.current,
        { opacity: 0, rotationY: 45, scale: 1.1 },
        { opacity: 1, rotationY: 0, scale: 1.22, duration: 1, ease: 'power2.inOut' },
        '<='
      );

      // Reveal action bar
      tl.fromTo(
        ctaBlockRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );

      // PHASE 5: Exit diagonally toward next section
      tl.to(
        [
          bottleAngleRef.current,
          callout1Ref.current,
          callout2Ref.current,
          callout3Ref.current,
          titleBlockRef.current,
          ctaBlockRef.current,
        ],
        {
          y: -100,
          opacity: 0.1,
          duration: 0.8,
          ease: 'power2.in',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleAdd = () => {
    addToCart(serumProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="product-story"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      <div
        ref={sceneRef}
        className="relative max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-16"
      >
        {/* Top Story Header with Glass Badge (NO icon) */}
        <div ref={titleBlockRef} className="text-center max-w-2xl mx-auto z-10 pt-4">
          <div className="inline-block px-4 py-1 glass-badge rounded-full mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0E3B2F]">
              Signature Formula
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0D1F2D] tracking-tight">
            A Little More Hydration.
          </h2>
          <p className="text-xs sm:text-sm text-[#0D1F2D]/80 font-medium mt-1">
            Every drop is crafted to merge effortlessly with your skin’s natural lipid barrier.
          </p>
        </div>

        {/* Central 3D Interactive Choreography Stage */}
        <div className="relative flex-1 w-full flex items-center justify-center min-h-[360px] sm:min-h-[440px]">
          {/* Front Angle Bottle Stage on Glass Card */}
          <div
            ref={bottleFrontRef}
            className="absolute z-20 w-[220px] sm:w-[280px] md:w-[320px] aspect-[3/4] glass-card rounded-3xl p-4 shadow-dew-deep border-2 border-white/90"
            style={{ perspective: 1000 }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/serum.jpg"
                alt="Dew Hydrate Serum - Front View"
                fill
                className="object-contain drop-shadow-md"
                sizes="(max-width: 768px) 280px, 340px"
              />
            </div>
          </div>

          {/* 3/4 Perspective Angle Bottle Stage (Reveals in Phase 4) */}
          <div
            ref={bottleAngleRef}
            className="absolute z-20 w-[220px] sm:w-[280px] md:w-[320px] aspect-[3/4] glass-card rounded-3xl p-4 shadow-dew-deep border-2 border-white/90 opacity-0"
            style={{ perspective: 1000 }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/serum-angle.jpg"
                alt="Dew Hydrate Serum - 3/4 Angle Detail"
                fill
                className="object-contain drop-shadow-md"
                sizes="(max-width: 768px) 280px, 340px"
              />
            </div>
          </div>

          {/* Story Callout 1 (Left): Hydration That Lasts - text only badge */}
          <div
            ref={callout1Ref}
            className="absolute left-4 sm:left-12 md:left-20 top-1/3 z-30 max-w-[210px] sm:max-w-[240px] glass-panel p-4 rounded-2xl shadow-dew-card border border-white/80"
          >
            <span className="inline-block px-2 py-0.5 glass-badge rounded text-[10px] font-extrabold uppercase tracking-wider text-[#0E3B2F] mb-1.5">
              Multi-Depth
            </span>
            <h4 className="text-base font-extrabold text-[#0D1F2D] mb-1">
              Hydration that lasts.
            </h4>
            <p className="text-xs text-[#0D1F2D]/75 leading-relaxed">
              Multi-weight botanical humectants anchor moisture within the epidermal layers for sustained comfort.
            </p>
          </div>

          {/* Story Callout 2 (Right): Lightweight, Comfortable Feel - text only badge */}
          <div
            ref={callout2Ref}
            className="absolute right-4 sm:right-12 md:right-20 top-1/4 z-30 max-w-[210px] sm:max-w-[240px] glass-panel p-4 rounded-2xl shadow-dew-card border border-white/80"
          >
            <span className="inline-block px-2 py-0.5 glass-badge rounded text-[10px] font-extrabold uppercase tracking-wider text-[#0E3B2F] mb-1.5">
              Fast-Absorbing
            </span>
            <h4 className="text-base font-extrabold text-[#0D1F2D] mb-1">
              Weightless feel.
            </h4>
            <p className="text-xs text-[#0D1F2D]/75 leading-relaxed">
              Fast-absorbing liquid essence that absorbs in seconds, leaving zero stickiness in warm or humid climates.
            </p>
          </div>

          {/* Story Callout 3 (Bottom): Everyday Routine - text only badge */}
          <div
            ref={callout3Ref}
            className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 max-w-[260px] sm:max-w-[300px] glass-panel p-4 rounded-2xl shadow-dew-card border border-white/80 text-center"
          >
            <span className="inline-block px-2.5 py-0.5 glass-badge rounded text-[10px] font-extrabold uppercase tracking-wider text-[#0E3B2F] mb-1">
              Daily Ritual
            </span>
            <h4 className="text-sm font-extrabold text-[#0D1F2D]">
              Made for everyday routines.
            </h4>
            <p className="text-[11px] text-[#0D1F2D]/70 mt-0.5">
              Formulated without pore-clogging oils, synthetic colorants, or heavy silicones.
            </p>
          </div>
        </div>

        {/* Bottom Quick-Action Bar */}
        <div ref={ctaBlockRef} className="z-10 flex flex-wrap items-center justify-center gap-3 pb-2">
          <div className="flex items-center space-x-3 glass-pill px-5 py-2.5 rounded-full shadow-sm">
            <span className="text-xs font-bold text-[#0D1F2D]">Dew Hydrate Serum</span>
            <span className="text-xs font-black text-[#0E3B2F]">₦12,500</span>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center space-x-2 px-6 py-2.5 bg-[#0E3B2F] hover:bg-[#0A2E24] text-[#FFFFFF] text-xs font-extrabold uppercase tracking-wider rounded-full shadow-dew-subtle active:scale-95 transition-all"
          >
            {added ? (
              <>
                <Check size={15} strokeWidth={3} />
                <span>In Your Bag</span>
              </>
            ) : (
              <>
                <Plus size={15} strokeWidth={2.5} />
                <span>Add Serum to Bag</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => openQuickView(serumProduct)}
            className="px-4 py-2.5 glass-pill hover:bg-white/90 text-[#0D1F2D] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm transition-all"
          >
            Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductStory;
