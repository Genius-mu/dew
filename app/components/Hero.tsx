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

      // Subtle scroll parallax without trapping the user
      gsap.to(creamRef.current, {
        y: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(mistRef.current, {
        y: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
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
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 sm:pt-28 sm:pb-12"
    >
      <div
        ref={containerRef}
        className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col justify-between"
      >
        {/* Top Headline & Brand Story Block */}
        <div ref={textRef} className="pt-2 sm:pt-4 max-w-2xl mx-auto text-center shrink-0">
          {/* Badge with NO icon */}
          <div className="hero-tag inline-block px-3.5 py-1 glass-badge rounded-full mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0E3B2F]">
              Meet your new daily essentials
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0D1F2D] leading-[1.08] mb-3">
            <span className="hero-headline-line block">Your skin,</span>
            <span className="hero-headline-line block font-serif italic font-normal text-[#0E3B2F]">
              in its element.
            </span>
          </h1>

          <p className="hero-subtext text-xs sm:text-sm md:text-base font-medium text-[#0D1F2D]/85 max-w-lg mx-auto mb-4">
            Thoughtful formulas. Everyday rituals. Skin that feels like you.
          </p>

          <div className="hero-cta-group flex flex-wrap items-center justify-center gap-3">
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

        {/* 3D-Inspired Layered Product Composition - Fully In View & Spaced */}
        <div className="relative w-full max-w-3xl mx-auto h-[260px] sm:h-[300px] md:h-[320px] my-auto flex items-end justify-center pb-2 shrink-0 mt-6 sm:mt-8">
          {/* Left Supporting Product: Dew Daily Cream */}
          <div
            ref={creamRef}
            className="absolute bottom-1 left-2 sm:left-10 md:left-16 w-[125px] sm:w-[155px] md:w-[185px] h-[175px] sm:h-[210px] md:h-[245px] z-10 transition-transform"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden glass-card p-2 shadow-dew-floating">
              <div className="relative w-full h-full pb-8">
                <Image
                  src="/images/cream.jpg"
                  alt="Dew Daily Cream Jar"
                  fill
                  priority
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 140px, 185px"
                />
              </div>
              <div className="!absolute bottom-2 left-2 right-2 px-2 py-1 glass-pill rounded-lg text-center z-10 shadow-sm">
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
            className="absolute bottom-1 right-2 sm:right-10 md:right-16 w-[115px] sm:w-[145px] md:w-[170px] h-[175px] sm:h-[210px] md:h-[245px] z-10 transition-transform"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden glass-card p-2 shadow-dew-floating">
              <div className="relative w-full h-full pb-8">
                <Image
                  src="/images/mist.jpg"
                  alt="Dew Cloud Mist Spray"
                  fill
                  priority
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 130px, 170px"
                />
              </div>
              <div className="!absolute bottom-2 left-2 right-2 px-2 py-1 glass-pill rounded-lg text-center z-10 shadow-sm">
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
            className="relative z-20 w-[150px] sm:w-[190px] md:w-[220px] h-[210px] sm:h-[255px] md:h-[290px] mb-1 cursor-pointer group"
            onClick={() => scrollToSection('featured-products')}
          >
            <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden glass-card p-2.5 shadow-dew-deep border-2 border-white group-hover:scale-102 transition-transform duration-200">
              <div className="relative w-full h-full pb-10">
                <Image
                  src="/images/serum.jpg"
                  alt="Dew Hydrate Serum - Signature Hero"
                  fill
                  priority
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 180px, 220px"
                />
              </div>
              {/* Text badge with NO icon pinned at top left */}
              <div className="!absolute top-2.5 left-2.5 bg-[#0E3B2F] text-[#FFFFFF] text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm z-10">
                Signature Hero
              </div>
              {/* Price pill pinned at bottom with distinct spacing */}
              <div className="!absolute bottom-2.5 left-2.5 right-2.5 px-2 py-1.5 glass-pill rounded-xl text-center shadow-sm z-10">
                <p className="text-[10px] sm:text-xs font-extrabold text-[#0E3B2F] tracking-wide truncate">
                  Dew Hydrate Serum
                </p>
                <p className="text-[9px] sm:text-[10px] font-bold text-[#0D1F2D]">₦12,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
