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
          { opacity: 0, scale: 0.85, y: 60, rotationX: 10 },
          { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 1.2, ease: 'back.out(1.2)' },
          '-=0.9'
        )
        .fromTo(
          creamRef.current,
          { opacity: 0, x: -50, y: 40, scale: 0.85 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 1 },
          '-=0.8'
        )
        .fromTo(
          mistRef.current,
          { opacity: 0, x: 50, y: 40, scale: 0.85 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 1 },
          '-=0.9'
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
          y: -100,
          opacity: 0,
          ease: 'power2.in',
        }, 0)
        .to(creamRef.current, {
          x: -180,
          y: 60,
          opacity: 0.2,
          scale: 0.85,
          ease: 'power2.inOut',
        }, 0)
        .to(mistRef.current, {
          x: 180,
          y: 60,
          opacity: 0.2,
          scale: 0.85,
          ease: 'power2.inOut',
        }, 0)
        .to(serumRef.current, {
          scale: 1.35,
          y: -30,
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
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between pt-24 pb-8"
    >
      <div
        ref={containerRef}
        className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between"
      >
        {/* Top Headline & Brand Story Block */}
        <div ref={textRef} className="pt-8 sm:pt-12 max-w-3xl mx-auto text-center">
          {/* Badge with NO icon as requested */}
          <div className="hero-tag inline-block px-4 py-1.5 glass-badge rounded-full mb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0E3B2F]">
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
              className="px-7 py-3.5 bg-[#0E3B2F] text-[#FFFFFF] text-xs font-extrabold tracking-wider uppercase rounded-full hover:bg-[#0A2E24] active:scale-95 transition-all shadow-dew-card"
            >
              Shop the essentials
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('the-ritual')}
              className="px-7 py-3.5 glass-panel text-[#0D1F2D] text-xs font-extrabold tracking-wider uppercase rounded-full hover:bg-white/80 active:scale-95 transition-all shadow-dew-subtle"
            >
              Explore the ritual
            </button>
          </div>
        </div>

        {/* 3D-Inspired Layered Skincare Product Composition on Glassmorphic Stages */}
        <div className="relative w-full max-w-4xl mx-auto h-[320px] sm:h-[380px] md:h-[440px] flex items-end justify-center pb-4">
          {/* Left Supporting Product: Dew Daily Cream */}
          <div
            ref={creamRef}
            className="absolute bottom-2 left-6 sm:left-16 md:left-24 w-[160px] sm:w-[210px] md:w-[260px] z-10 transition-transform"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card p-3 shadow-dew-floating">
              <Image
                src="/images/cream.jpg"
                alt="Dew Daily Cream Jar"
                fill
                priority
                className="object-contain p-2"
                sizes="(max-width: 768px) 180px, 260px"
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1.5 glass-pill rounded-lg text-center">
                <span className="text-[10px] sm:text-xs font-extrabold text-[#0E3B2F] block tracking-wide">
                  Dew Daily Cream
                </span>
                <span className="text-[9px] text-[#0D1F2D]/70 font-bold">₦10,000</span>
              </div>
            </div>
          </div>

          {/* Right Supporting Product: Dew Cloud Mist */}
          <div
            ref={mistRef}
            className="absolute bottom-2 right-6 sm:right-16 md:right-24 w-[140px] sm:w-[190px] md:w-[230px] z-10 transition-transform"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card p-3 shadow-dew-floating">
              <Image
                src="/images/mist.jpg"
                alt="Dew Cloud Mist Spray"
                fill
                priority
                className="object-contain p-2"
                sizes="(max-width: 768px) 160px, 230px"
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1.5 glass-pill rounded-lg text-center">
                <span className="text-[10px] sm:text-xs font-extrabold text-[#0E3B2F] block tracking-wide">
                  Dew Cloud Mist
                </span>
                <span className="text-[9px] text-[#0D1F2D]/70 font-bold">₦8,500</span>
              </div>
            </div>
          </div>

          {/* Hero Focal Product: Dew Hydrate Serum */}
          <div
            ref={serumRef}
            className="relative z-20 w-[180px] sm:w-[240px] md:w-[290px] mb-2 cursor-pointer group"
            onClick={() => scrollToSection('featured-products')}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card p-3 shadow-dew-deep border-2 border-white group-hover:scale-102 transition-transform duration-200">
              <Image
                src="/images/serum.jpg"
                alt="Dew Hydrate Serum - Signature Hero"
                fill
                priority
                className="object-contain p-2"
                sizes="(max-width: 768px) 240px, 320px"
              />
              {/* Text badge with NO icon */}
              <div className="absolute top-3 left-3 bg-[#0E3B2F] text-[#FFFFFF] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                Signature Hero
              </div>
              <div className="absolute bottom-3 left-3 right-3 px-3 py-2 glass-pill rounded-xl text-center shadow-sm">
                <p className="text-xs sm:text-sm font-extrabold text-[#0E3B2F] tracking-wide">
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
