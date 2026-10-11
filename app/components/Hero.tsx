'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowDown, Sparkles } from 'lucide-react';
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

    // Entrance Animation Timeline
    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      entranceTl
        .fromTo(
          '.hero-tag',
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
        )
        .fromTo(
          '.hero-headline-line',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
          '-=0.5'
        )
        .fromTo(
          '.hero-subtext',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          '.hero-cta-group',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          serumRef.current,
          { opacity: 0, scale: 0.85, y: 60 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'back.out(1.2)' },
          '-=0.9'
        )
        .fromTo(
          creamRef.current,
          { opacity: 0, x: -40, y: 40, scale: 0.9 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 1 },
          '-=0.8'
        )
        .fromTo(
          mistRef.current,
          { opacity: 0, x: 40, y: 40, scale: 0.9 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 1 },
          '-=0.9'
        );

      // Scroll-driven Scrubbed Choreography
      // Pins the hero for 100vh scroll and drives the serum forward into Section 2
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        // Text fades and glides upward
        .to(textRef.current, {
          y: -120,
          opacity: 0,
          ease: 'power2.in',
        }, 0)
        // Supporting products part outward and drift backward
        .to(creamRef.current, {
          x: -160,
          y: 40,
          opacity: 0.2,
          scale: 0.85,
          ease: 'power2.inOut',
        }, 0)
        .to(mistRef.current, {
          x: 160,
          y: 40,
          opacity: 0.2,
          scale: 0.85,
          ease: 'power2.inOut',
        }, 0)
        // Serum moves forward into prominent center-stage
        .to(serumRef.current, {
          scale: 1.35,
          y: -40,
          ease: 'power2.out',
        }, 0);
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
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between pt-20 pb-8"
      style={{
        backgroundImage: `url('/sky-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Visual Anchor Container */}
      <div
        ref={containerRef}
        className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between"
      >
        {/* Top Headline & Brand Story Block */}
        <div ref={textRef} className="pt-6 sm:pt-10 max-w-3xl mx-auto text-center">
          <div className="hero-tag inline-flex items-center space-x-2 px-3.5 py-1 bg-[#FFFFFF] rounded-full shadow-dew-subtle mb-4">
            <Sparkles size={14} className="text-[#0E3B2F]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E3B2F]">
              Meet your new daily essentials
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#0D1F2D] leading-[1.08] mb-4">
            <span className="hero-headline-line block">Your skin,</span>
            <span className="hero-headline-line block font-serif italic font-normal text-[#0E3B2F]">
              in its element.
            </span>
          </h1>

          <p className="hero-subtext text-base sm:text-lg md:text-xl font-medium text-[#0D1F2D]/85 max-w-xl mx-auto mb-6">
            Thoughtful formulas. Everyday rituals. Skin that feels like you.
          </p>

          <div className="hero-cta-group flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('featured-products')}
              className="px-6 py-3.5 bg-[#0E3B2F] text-[#FFFFFF] text-sm font-bold tracking-wide uppercase rounded-sm hover:bg-[#0A2E24] active:scale-95 transition-all duration-150 shadow-dew-card"
            >
              Shop the essentials
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('the-ritual')}
              className="px-6 py-3.5 bg-[#FFFFFF] text-[#0D1F2D] text-sm font-bold tracking-wide uppercase rounded-sm hover:bg-[#E3F2F7] active:scale-95 transition-all duration-150 shadow-dew-subtle border border-[#0D1F2D]/10"
            >
              Explore the ritual
            </button>
          </div>
        </div>

        {/* 3D-Inspired Layered Skincare Product Composition */}
        <div className="relative w-full max-w-4xl mx-auto h-[320px] sm:h-[380px] md:h-[440px] flex items-end justify-center pb-4">
          {/* Left Supporting Product: Dew Daily Cream */}
          <div
            ref={creamRef}
            className="absolute bottom-2 left-6 sm:left-16 md:left-24 w-[160px] sm:w-[210px] md:w-[260px] z-10 transition-transform"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-dew-floating bg-[#FFFFFF] p-2 border border-[#0D1F2D]/10">
              <Image
                src="/images/cream.jpg"
                alt="Dew Daily Cream Jar"
                fill
                priority
                className="object-contain p-2"
                sizes="(max-width: 768px) 180px, 260px"
              />
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-[#FFFFFF] rounded text-center border-t border-[#0D1F2D]/5">
                <span className="text-[10px] sm:text-xs font-bold text-[#0E3B2F] block tracking-wide">
                  Dew Daily Cream
                </span>
                <span className="text-[9px] text-[#0D1F2D]/70 font-semibold">₦10,000</span>
              </div>
            </div>
          </div>

          {/* Right Supporting Product: Dew Cloud Mist */}
          <div
            ref={mistRef}
            className="absolute bottom-2 right-6 sm:right-16 md:right-24 w-[140px] sm:w-[190px] md:w-[230px] z-10 transition-transform"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-dew-floating bg-[#FFFFFF] p-2 border border-[#0D1F2D]/10">
              <Image
                src="/images/mist.jpg"
                alt="Dew Cloud Mist Spray"
                fill
                priority
                className="object-contain p-2"
                sizes="(max-width: 768px) 160px, 230px"
              />
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-[#FFFFFF] rounded text-center border-t border-[#0D1F2D]/5">
                <span className="text-[10px] sm:text-xs font-bold text-[#0E3B2F] block tracking-wide">
                  Dew Cloud Mist
                </span>
                <span className="text-[9px] text-[#0D1F2D]/70 font-semibold">₦8,500</span>
              </div>
            </div>
          </div>

          {/* Hero Focal Product: Dew Hydrate Serum (Prominent Center-Stage) */}
          <div
            ref={serumRef}
            className="relative z-20 w-[180px] sm:w-[240px] md:w-[290px] mb-2 cursor-pointer group"
            onClick={() => scrollToSection('featured-products')}
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-dew-deep bg-[#FFFFFF] p-3 border-2 border-[#0E3B2F]/20 group-hover:border-[#0E3B2F] transition-colors duration-200">
              <Image
                src="/images/serum.jpg"
                alt="Dew Hydrate Serum - Signature Hero"
                fill
                priority
                className="object-contain p-2"
                sizes="(max-width: 768px) 240px, 320px"
              />
              <div className="absolute top-3 left-3 bg-[#0E3B2F] text-[#FFFFFF] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                Signature Hero
              </div>
              <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 bg-[#FFFFFF] rounded text-center shadow-dew-subtle border border-[#0D1F2D]/5">
                <p className="text-xs sm:text-sm font-bold text-[#0E3B2F] tracking-wide">
                  Dew Hydrate Serum
                </p>
                <p className="text-[11px] font-bold text-[#0D1F2D]">₦12,500</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="flex justify-center pb-2">
          <button
            type="button"
            onClick={() => scrollToSection('featured-products')}
            className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-[#0D1F2D]/75 hover:text-[#0E3B2F] transition-colors"
          >
            <span>Scroll to explore</span>
            <ArrowDown size={14} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
