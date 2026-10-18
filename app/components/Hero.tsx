'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const serumRef = useRef<HTMLDivElement>(null);
  const creamRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance choreography
      const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      entranceTl
        .fromTo(
          '.hero-tag',
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.15 }
        )
        .fromTo(
          '.hero-headline-line',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          '-=0.4'
        )
        .fromTo(
          '.hero-subtext',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          '.hero-cta-group',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(
          serumRef.current,
          { opacity: 0, scale: 0.85, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'back.out(1.2)' },
          '-=0.8'
        )
        .fromTo(
          creamRef.current,
          { opacity: 0, x: -50, y: 30, scale: 0.85 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.9 },
          '-=0.7'
        )
        .fromTo(
          mistRef.current,
          { opacity: 0, x: 50, y: 30, scale: 0.85 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.9 },
          '-=0.8'
        );

      // Scroll-driven Scrubbed 3D Choreography where ALL 3 products slide into view in sequence!
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Headline gently lifts and softens so full focus is on the 3 products
      scrollTl.to(
        textRef.current,
        {
          y: -35,
          opacity: 0.25,
          scale: 0.96,
          ease: 'power2.inOut',
          duration: 1,
        },
        0
      );

      // STEP 1: Dew Daily Cream (left) slides forward into the spotlight!
      scrollTl.to(
        creamRef.current,
        {
          xPercent: 42,
          y: -8,
          scale: 1.1,
          rotateY: 0,
          zIndex: 30,
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut',
        },
        0
      )
      .to(
        serumRef.current,
        {
          xPercent: 12,
          scale: 0.95,
          opacity: 0.85,
          zIndex: 20,
          duration: 1,
          ease: 'power2.inOut',
        },
        0
      )
      .to(
        mistRef.current,
        {
          xPercent: 18,
          scale: 0.9,
          opacity: 0.75,
          zIndex: 15,
          duration: 1,
          ease: 'power2.inOut',
        },
        0
      );

      // Brief pause on Cream
      scrollTl.to({}, { duration: 0.3 });

      // STEP 2: Dew Hydrate Serum (center) glides forward into the main hero spotlight!
      scrollTl.to(
        creamRef.current,
        {
          xPercent: 0,
          y: 0,
          scale: 0.95,
          rotateY: -8,
          zIndex: 20,
          opacity: 0.85,
          duration: 1,
          ease: 'power2.inOut',
        }
      )
      .to(
        serumRef.current,
        {
          xPercent: 0,
          y: -10,
          scale: 1.12,
          rotateY: 0,
          zIndex: 35,
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut',
        },
        '<'
      )
      .to(
        mistRef.current,
        {
          xPercent: 0,
          y: 0,
          scale: 0.95,
          rotateY: 8,
          zIndex: 20,
          opacity: 0.85,
          duration: 1,
          ease: 'power2.inOut',
        },
        '<'
      );

      // Brief pause on Serum
      scrollTl.to({}, { duration: 0.3 });

      // STEP 3: Dew Cloud Mist (right) slides forward into the spotlight!
      scrollTl.to(
        mistRef.current,
        {
          xPercent: -42,
          y: -8,
          scale: 1.1,
          rotateY: 0,
          zIndex: 30,
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut',
        }
      )
      .to(
        serumRef.current,
        {
          xPercent: -12,
          scale: 0.95,
          opacity: 0.85,
          zIndex: 20,
          duration: 1,
          ease: 'power2.inOut',
        },
        '<'
      )
      .to(
        creamRef.current,
        {
          xPercent: -18,
          scale: 0.9,
          opacity: 0.75,
          zIndex: 15,
          duration: 1,
          ease: 'power2.inOut',
        },
        '<'
      );

      // Hold on Mist before scrolling smoothly into next section
      scrollTl.to({}, { duration: 0.3 });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-[100dvh] overflow-hidden flex flex-col justify-between pt-16 pb-2 sm:pt-20 sm:pb-3"
    >
      <div
        ref={containerRef}
        className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col justify-between"
      >
        {/* Top Headline & Brand Story Block - Compact to preserve viewport */}
        <div ref={textRef} className="pt-1 sm:pt-2 max-w-2xl mx-auto text-center shrink-0">
          <div className="hero-tag inline-block px-3 py-0.5 glass-badge rounded-full mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0E3B2F]">
              Meet your new daily essentials
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0D1F2D] leading-tight mb-1 sm:mb-2">
            <span className="hero-headline-line block">Your skin,</span>
            <span className="hero-headline-line block font-serif italic font-normal text-[#0E3B2F]">
              in its element.
            </span>
          </h1>

          <p className="hero-subtext text-xs sm:text-sm font-medium text-[#0D1F2D]/85 max-w-lg mx-auto mb-2.5 sm:mb-3">
            Thoughtful botanical formulas. Everyday rituals. Skin that feels like you.
          </p>

          <div className="hero-cta-group flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollToSection('featured-products')}
              className="px-5 py-2 bg-[#0E3B2F] text-[#FFFFFF] text-xs font-extrabold tracking-wider uppercase rounded-full hover:bg-[#0A2E24] active:scale-95 transition-all shadow-dew-card hover-scale-pill cursor-pointer"
            >
              Shop the essentials
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('the-ritual')}
              className="px-5 py-2 glass-panel text-[#0D1F2D] text-xs font-extrabold tracking-wider uppercase rounded-full hover:bg-white/80 active:scale-95 transition-all shadow-dew-subtle hover-scale-pill cursor-pointer"
            >
              Explore the ritual
            </button>
          </div>
        </div>

        {/* 3D Layered Product Stage with Perspective: Sized to 100% fit on short screens */}
        <div
          className="relative w-full max-w-3xl mx-auto h-[210px] sm:h-[235px] md:h-[250px] my-auto flex items-center justify-center shrink-0 perspective-1200 preserve-3d"
        >
          {/* Left Supporting Product: Dew Daily Cream */}
          <div
            ref={creamRef}
            className="absolute left-2 sm:left-10 md:left-16 w-[115px] sm:w-[135px] md:w-[155px] h-[165px] sm:h-[190px] md:h-[210px] z-10 transition-transform preserve-3d"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden glass-card p-2 shadow-dew-floating">
              <div className="relative w-full h-full pb-8">
                <Image
                  src="/images/cream.jpg"
                  alt="Dew Daily Cream Jar"
                  fill
                  priority
                  className="object-contain p-1.5 mix-blend-multiply"
                  sizes="(max-width: 768px) 140px, 160px"
                />
              </div>
              <div className="!absolute bottom-1.5 left-1.5 right-1.5 px-2 py-1 glass-pill rounded-lg text-center z-10 shadow-sm">
                <span className="text-[9px] sm:text-[10px] font-extrabold text-[#0E3B2F] block tracking-wide truncate">
                  Dew Daily Cream
                </span>
                <span className="text-[8px] sm:text-[9px] text-[#0D1F2D]/70 font-bold">₦10,000</span>
              </div>
            </div>
          </div>

          {/* Right Supporting Product: Dew Cloud Mist */}
          <div
            ref={mistRef}
            className="absolute right-2 sm:right-10 md:right-16 w-[115px] sm:w-[135px] md:w-[155px] h-[165px] sm:h-[190px] md:h-[210px] z-10 transition-transform preserve-3d"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden glass-card p-2 shadow-dew-floating">
              <div className="relative w-full h-full pb-8">
                <Image
                  src="/images/mist.jpg"
                  alt="Dew Cloud Mist Spray"
                  fill
                  priority
                  className="object-contain p-1.5 mix-blend-multiply"
                  sizes="(max-width: 768px) 130px, 160px"
                />
              </div>
              <div className="!absolute bottom-1.5 left-1.5 right-1.5 px-2 py-1 glass-pill rounded-lg text-center z-10 shadow-sm">
                <span className="text-[9px] sm:text-[10px] font-extrabold text-[#0E3B2F] block tracking-wide truncate">
                  Dew Cloud Mist
                </span>
                <span className="text-[8px] sm:text-[9px] text-[#0D1F2D]/70 font-bold">₦8,500</span>
              </div>
            </div>
          </div>

          {/* Hero Focal Product: Dew Hydrate Serum */}
          <div
            ref={serumRef}
            className="relative z-20 w-[130px] sm:w-[155px] md:w-[180px] h-[185px] sm:h-[215px] md:h-[235px] cursor-pointer group preserve-3d"
            onClick={() => scrollToSection('featured-products')}
          >
            <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden glass-card p-2 shadow-dew-deep border-2 border-white group-hover:scale-102 transition-transform duration-200">
              <div className="relative w-full h-full pb-8">
                <Image
                  src="/images/serum.jpg"
                  alt="Dew Hydrate Serum - Signature Hero"
                  fill
                  priority
                  className="object-contain p-1.5 mix-blend-multiply"
                  sizes="(max-width: 768px) 160px, 180px"
                />
              </div>
              {/* Text badge pinned at top left */}
              <div className="!absolute top-2 left-2 bg-[#0E3B2F] text-[#FFFFFF] text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm z-10">
                Signature Hero
              </div>
              {/* Price pill pinned at bottom */}
              <div className="!absolute bottom-1.5 left-1.5 right-1.5 px-2 py-1 glass-pill rounded-xl text-center shadow-sm z-10">
                <p className="text-[9px] sm:text-[10px] font-extrabold text-[#0E3B2F] tracking-wide truncate">
                  Dew Hydrate Serum
                </p>
                <p className="text-[8px] sm:text-[9px] font-bold text-[#0D1F2D]">₦12,500</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="flex justify-center pb-0.5 shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('featured-products')}
            className="flex items-center space-x-1.5 text-[10px] font-bold tracking-wider uppercase text-[#0D1F2D]/75 hover:text-[#0E3B2F] transition-colors cursor-pointer"
          >
            <span>Scroll to explore</span>
            <ArrowDown size={12} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
