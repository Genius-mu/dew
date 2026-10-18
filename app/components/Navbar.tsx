'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DewLogo } from './DewLogo';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { totalItems, openCart, openSearch } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', href: '#featured-products' },
    { label: 'Story', href: '#product-story' },
    { label: 'Ingredients', href: '#ingredients' },
    { label: 'The Ritual', href: '#the-ritual' },
    { label: 'Reviews', href: '#community' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Supaste-inspired Centered Floating Glassmorphic Pill Dock */}
      <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div
          className={`pointer-events-auto w-full max-w-4xl rounded-full glass-pill transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
            scrolled
              ? 'shadow-dew-deep ring-1 ring-white/90 scale-[0.99]'
              : 'shadow-dew-card'
          }`}
        >
          {/* Left: Standalone Dew SVG emblem without any text or wordmark */}
          <div className="flex items-center relative z-10">
            <Link
              href="/"
              aria-label="Dew Skincare Home"
              className="group flex items-center p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0E3B2F]"
            >
              <DewLogo
                size={34}
                color="#0E3B2F"
                className="transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Center: Desktop Nav Links (Supaste-style pill links) */}
          <nav className="hidden md:flex items-center space-x-1 relative z-10" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#0D1F2D]/85 hover:text-[#0E3B2F] hover:bg-white/60 transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Currency, Search, Shopping Bag */}
          <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
            {/* Currency Pill */}
            <span className="hidden sm:inline-block px-2.5 py-1 glass-badge rounded-full text-[11px] font-extrabold tracking-wider text-[#0E3B2F]">
              ₦ NGN
            </span>

            {/* Search Button */}
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search products and rituals"
              className="p-2 text-[#0D1F2D] hover:text-[#0E3B2F] hover:bg-white/60 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0E3B2F]"
            >
              <Search size={17} strokeWidth={2.4} />
            </button>

            {/* Shopping Bag Button with item counter */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`Shopping bag with ${totalItems} items`}
              className="relative p-2 text-[#0D1F2D] hover:text-[#0E3B2F] hover:bg-white/60 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0E3B2F]"
            >
              <ShoppingBag size={19} strokeWidth={2.4} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[19px] h-[19px] px-1 bg-[#0E3B2F] text-[#FFFFFF] text-[10px] font-extrabold rounded-full shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden p-2 text-[#0D1F2D] hover:bg-white/60 rounded-full focus:outline-none"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Floating Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 z-40 rounded-2xl glass-panel p-5 shadow-dew-deep animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="flex items-center justify-between text-sm font-bold text-[#0D1F2D] hover:text-[#0E3B2F] py-2 px-3 rounded-lg hover:bg-white/60 transition-colors"
              >
                <span>{link.label}</span>
                <ArrowRight size={15} className="text-[#0E3B2F]" />
              </a>
            ))}
            <div className="pt-2 border-t border-white/50 flex items-center justify-between text-xs px-3 text-[#0D1F2D]/70 font-medium">
              <span>Currency</span>
              <span className="font-extrabold text-[#0E3B2F]">Nigerian Naira (₦)</span>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
