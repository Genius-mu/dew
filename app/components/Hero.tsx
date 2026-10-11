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
          { opacity: 0, x: -40, y: 30, scale: 0.85 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.9 },
          '-=0.7'
        )
        .fromTo(
          mistRef.current,
          { opacity: 0, x: 40, y: 30, scale: 0.85 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.9 },
          '-=0.8'
        );

      // Scroll-driven Scrubbed 3D Choreography
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
        .to(textRef.current, {
          y: -80,
          opacity: 0,
          ease: 'power2.in',
        }, 0)
        .to(creamRef.current, {
          x: -140,
          y: 40,
          opacity: 0.2,
          scale: 0.85,
          ease: 'power2.inOut',
        }, 0)
        .to(mistRef.current, {
          x: 140,
          y: 40,
          opacity: 0.2,
          scale: 0.85,
          ease: 'power2.inOut',
        }, 0)
        .to(serumRef.current, {
          scale: 1.25,
          y: -20,
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
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between pt-18 pb-3 sm:pt-20 sm:pb-4"
    >
      <div
        ref={containerRef}
        className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col justify-between"
      >
        {/* Top Headline & Brand Story Block (Proportioned to fit any viewport height) */}
        <div ref={textRef} className="pt-2 sm:pt-4 max-w-2xl mx-auto text-center shrink-0">
          {/* Badge with NO icon */}
          <div className="hero-tag inline-block px-3.5 py-1 glass-badge rounded-full mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0E3B2F]">
              Meet your new daily essentials
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0D1F2D] leading-[1.08] mb-2">
            <span className="hero-headline-line block">Your skin,</span>
            <span className="hero-headline-line block font-serif italic font-normal text-[#0E3B2F]">
              in its element.
            </span>
          </h1>

          <p className="hero-subtext text-xs sm:text-sm md:text-base font-medium text-[#0D1F2D]/85 max-w-lg mx-auto mb-3.5">
            Thoughtful formulas. Everyday rituals. Skin that feels like you.
          </p>

          <div className="hero-cta-group flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('featured-products')}
              className="px-6 py-2.5 bg-[#0E3B2F] text-[#FFFFFF] text-xs font-extrabold tracking-wider uppercase rounded-full hover:bg-[#0A2E24] active:scale-95 transition-all shadow-dew-card hover-scale-pill"
            >
              Shop the essentials
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('the-ritual')}
              className="px-6 py-2.5 glass-panel text-[#0D1F2D] text-xs font-extrabold tracking-wider uppercase rounded-full hover:bg-white/80 active:scale-95 transition-all shadow-dew-subtle hover-scale-pill"
            >
              Explore the ritual
            </button>
          </div>
        </div>

        {/* 3D-Inspired Layered Product Composition - Fully In View! */}
        <div className="relative w-full max-w-3xl mx-auto h-[230px] sm:h-[260px] md:h-[280px] my-auto flex items-end justify-center pb-2 shrink-0">
          {/* Left Supporting Product: Dew Daily Cream */}
          <div
            ref={creamRef}
            className="absolute bottom-1 left-4 sm:left-12 md:left-20 w-[120px] sm:w-[150px] md:w-[180px] z-10 transition-transform"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card p-2 shadow-dew-floating">
              <Image
                src="/images/cream.jpg"
                alt="Dew Daily Cream Jar"
                fill
                priority
                className="object-contain p-1.5"
                sizes="(max-width: 768px) 140px, 180px"
              />
              <div className="absolute bottom-1.5 left-1.5 right-1.5 px-2 py-1 glass-pill rounded-lg text-center">
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
            className="absolute bottom-1 right-4 sm:right-12 md:right-20 w-[110px] sm:w-[140px] md:w-[165px] z-10 transition-transform"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card p-2 shadow-dew-floating">
              <Image
                src="/images/mist.jpg"
                alt="Dew Cloud Mist Spray"
                fill
                priority
                className="object-contain p-1.5"
                sizes="(max-width: 768px) 130px, 165px"
              />
              <div className="absolute bottom-1.5 left-1.5 right-1.5 px-2 py-1 glass-pill rounded-lg text-center">
                <span className="text-[9px] sm:text-[10px] font-extrabold text-[#0E3B2F] block tracking-wide truncate">
                  Dew Cloud Mist
                </span>
                <span className="text-[8px] sm:text-[9px] text-[#0D1F2D]/70 font-bold">₦8,500</span>
              </div>
            </div>
          </div>

          {/* Hero Focal Product: Dew Hydrate Serum (Prominently Center Stage, 100% In View) */}
          <div
            ref={serumRef}
            className="relative z-20 w-[140px] sm:w-[180px] md:w-[210px] mb-1 cursor-pointer group"
            onClick={() => scrollToSection('featured-products')}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card p-2.5 shadow-dew-deep border-2 border-white group-hover:scale-102 transition-transform duration-200">
              <Image
                src="/images/serum.jpg"
                alt="Dew Hydrate Serum - Signature Hero"
                fill
                priority
                className="object-contain p-1.5"
                sizes="(max-width: 768px) 180px, 220px"
              />
              {/* Text badge with NO icon */}
              <div className="absolute top-2 left-2 bg-[#0E3B2F] text-[#FFFFFF] text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                Signature Hero
              </div>
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 glass-pill rounded-lg text-center shadow-sm">
                <p className="text-[10px] sm:text-xs font-extrabold text-[#0E3B2F] tracking-wide truncate">
                  Dew Hydrate Serum
                </p>
                <p className="text-[9px] sm:text-[10px] font-bold text-[#0D1F2D]">₦12,500</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="flex justify-center pb-1 shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('featured-products')}
            className="flex items-center space-x-1.5 text-[10px] font-bold tracking-wider uppercase text-[#0D1F2D]/75 hover:text-[#0E3B2F] transition-colors"
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
