'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DewLogo } from './DewLogo';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { totalItems, openCart, openSearch } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', href: '#featured-products' },
    { label: 'The Ritual', href: '#the-ritual' },
    { label: 'Ingredients', href: '#ingredients' },
    { label: 'Product Story', href: '#product-story' },
    { label: 'Community', href: '#community' },
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
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#FFFFFF] shadow-dew-subtle border-b border-[#0D1F2D]/10 py-3.5'
            : 'bg-[#FFFFFF] border-b border-[#0D1F2D]/10 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Standalone Dew SVG emblem without any text or wordmark */}
            <div className="flex items-center">
              <Link
                href="/"
                aria-label="Dew Skincare Home"
                className="group flex items-center p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0E3B2F]"
              >
                <DewLogo
                  size={36}
                  color="#0E3B2F"
                  className="transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Center: Desktop Nav Links (Supaste-inspired editorial spacing & typography) */}
            <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-[13px] font-semibold tracking-wider uppercase text-[#0D1F2D] hover:text-[#0E3B2F] transition-colors duration-150 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0E3B2F] hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right: Search, Currency, Shopping Bag */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Currency Tag */}
              <div className="hidden sm:flex items-center px-2.5 py-1 bg-[#E3F2F7] rounded text-[11px] font-bold tracking-wider text-[#0E3B2F]">
                NGN ₦
              </div>

              {/* Search Button */}
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search products and rituals"
                className="p-2 text-[#0D1F2D] hover:text-[#0E3B2F] hover:bg-[#E3F2F7] rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0E3B2F]"
              >
                <Search size={18} strokeWidth={2.2} />
              </button>

              {/* Shopping Bag Button with item counter */}
              <button
                type="button"
                onClick={openCart}
                aria-label={`Shopping bag with ${totalItems} items`}
                className="relative flex items-center justify-center p-2 text-[#0D1F2D] hover:text-[#0E3B2F] hover:bg-[#E3F2F7] rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0E3B2F]"
              >
                <ShoppingBag size={20} strokeWidth={2.2} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] px-1 bg-[#0E3B2F] text-[#FFFFFF] text-[11px] font-bold rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                className="md:hidden p-2 text-[#0D1F2D] hover:bg-[#E3F2F7] rounded focus:outline-none focus:ring-2 focus:ring-[#0E3B2F]"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFFFFF] border-b border-[#0D1F2D]/10 px-6 py-6 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="flex items-center justify-between text-base font-semibold text-[#0D1F2D] hover:text-[#0E3B2F] py-2 border-b border-[#0D1F2D]/5"
                >
                  <span>{link.label}</span>
                  <ArrowRight size={16} className="text-[#0E3B2F]" />
                </a>
              ))}
              <div className="pt-2 flex items-center justify-between text-sm text-[#0D1F2D]/70">
                <span>Currency: Nigerian Naira</span>
                <span className="font-bold text-[#0E3B2F]">NGN (₦)</span>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
