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

      // Scroll-driven Scrubbed 3D Parallax Choreography
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=90%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to(
          textRef.current,
          {
            y: -75,
            opacity: 0,
            scale: 0.96,
            ease: 'power2.in',
          },
          0
        )
        .to(
          creamRef.current,
          {
            x: -150,
            y: 40,
            rotateY: -18,
            rotateZ: -6,
            opacity: 0.15,
            scale: 0.85,
            ease: 'power2.inOut',
          },
          0
        )
        .to(
          mistRef.current,
          {
            x: 150,
            y: 40,
            rotateY: 18,
            rotateZ: 6,
            opacity: 0.15,
            scale: 0.85,
            ease: 'power2.inOut',
          },
          0
        )
        .to(
          serumRef.current,
          {
            scale: 1.25,
            y: -24,
            rotateY: 0,
            ease: 'power2.out',
          },
          0
        );
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
      className="relative w-full h-screen min-h-[640px] overflow-hidden flex flex-col justify-between pt-20 pb-4 sm:pt-24 sm:pb-6"
    >
      <div
        ref={containerRef}
        className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col justify-between"
      >
        {/* Top Headline & Brand Story Block */}
        <div ref={textRef} className="pt-2 sm:pt-4 max-w-2xl mx-auto text-center shrink-0">
          <div className="hero-tag inline-block px-3.5 py-1 glass-badge rounded-full mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0E3B2F]">
              Meet your new daily essentials
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0D1F2D] leading-[1.08] mb-2 sm:mb-3">
            <span className="hero-headline-line block">Your skin,</span>
            <span className="hero-headline-line block font-serif italic font-normal text-[#0E3B2F]">
              in its element.
            </span>
          </h1>

          <p className="hero-subtext text-xs sm:text-sm md:text-base font-medium text-[#0D1F2D]/85 max-w-lg mx-auto mb-3.5 sm:mb-4">
            Thoughtful botanical formulas. Everyday rituals. Skin that feels like you.
          </p>

          <div className="hero-cta-group flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('featured-products')}
              className="px-6 py-2.5 bg-[#0E3B2F] text-[#FFFFFF] text-xs font-extrabold tracking-wider uppercase rounded-full hover:bg-[#0A2E24] active:scale-95 transition-all shadow-dew-card hover-scale-pill cursor-pointer"
            >
              Shop the essentials
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('the-ritual')}
              className="px-6 py-2.5 glass-panel text-[#0D1F2D] text-xs font-extrabold tracking-wider uppercase rounded-full hover:bg-white/80 active:scale-95 transition-all shadow-dew-subtle hover-scale-pill cursor-pointer"
            >
              Explore the ritual
            </button>
          </div>
        </div>

        {/* 3D Layered Product Stage with Perspective */}
        <div
          className="relative w-full max-w-3xl mx-auto h-[250px] sm:h-[280px] md:h-[310px] my-auto flex items-end justify-center pb-2 shrink-0 perspective-1200 preserve-3d"
        >
          {/* Left Supporting Product: Dew Daily Cream */}
          <div
            ref={creamRef}
            className="absolute bottom-1 left-2 sm:left-10 md:left-16 w-[120px] sm:w-[150px] md:w-[175px] h-[170px] sm:h-[205px] md:h-[235px] z-10 transition-transform preserve-3d"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden glass-card p-2 shadow-dew-floating">
              <div className="relative w-full h-full pb-7">
                <Image
                  src="/images/cream.jpg"
                  alt="Dew Daily Cream Jar"
                  fill
                  priority
                  className="object-contain p-2 mix-blend-multiply"
                  sizes="(max-width: 768px) 140px, 180px"
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
            className="absolute bottom-1 right-2 sm:right-10 md:right-16 w-[110px] sm:w-[140px] md:w-[165px] h-[170px] sm:h-[205px] md:h-[235px] z-10 transition-transform preserve-3d"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden glass-card p-2 shadow-dew-floating">
              <div className="relative w-full h-full pb-7">
                <Image
                  src="/images/mist.jpg"
                  alt="Dew Cloud Mist Spray"
                  fill
                  priority
                  className="object-contain p-2 mix-blend-multiply"
                  sizes="(max-width: 768px) 130px, 165px"
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
            className="relative z-20 w-[145px] sm:w-[185px] md:w-[215px] h-[205px] sm:h-[250px] md:h-[285px] mb-1 cursor-pointer group preserve-3d"
            onClick={() => scrollToSection('featured-products')}
          >
            <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden glass-card p-2.5 shadow-dew-deep border-2 border-white group-hover:scale-102 transition-transform duration-200">
              <div className="relative w-full h-full pb-9">
                <Image
                  src="/images/serum.jpg"
                  alt="Dew Hydrate Serum - Signature Hero"
                  fill
                  priority
                  className="object-contain p-2 mix-blend-multiply"
                  sizes="(max-width: 768px) 180px, 220px"
                />
              </div>
              {/* Text badge pinned at top left */}
              <div className="!absolute top-2.5 left-2.5 bg-[#0E3B2F] text-[#FFFFFF] text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm z-10">
                Signature Hero
              </div>
              {/* Price pill pinned at bottom */}
              <div className="!absolute bottom-2.5 left-2.5 right-2.5 px-2 py-1.5 glass-pill rounded-xl text-center shadow-sm z-10">
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
