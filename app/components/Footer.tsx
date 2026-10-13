'use client';

import React, { useState } from 'react';
import { DewLogo } from './DewLogo';
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="w-full glass-footer text-[#0D1F2D] pt-20 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#0D1F2D]/15">
          {/* Brand Column with Standalone Dew Logo Mark */}
          <div className="md:col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <DewLogo size={42} color="#0E3B2F" className="hover-scale-pill cursor-pointer" />
            </div>
            <p className="text-xs sm:text-sm text-[#0D1F2D]/80 leading-relaxed max-w-sm mb-6 font-medium">
              Thoughtful botanical skincare formulas for your everyday ritual. Clean hydration, barrier protection, and genuine skin comfort crafted for modern living.
            </p>
            <div className="space-y-2 text-xs text-[#0D1F2D]/75 font-medium">
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-[#0E3B2F]" />
                <span>Victoria Island, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} className="text-[#0E3B2F]" />
                <span>hello@dewskincare.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-[#0E3B2F]" />
                <span>+234 (0) 800 DEW CARE</span>
              </div>
            </div>
          </div>

          {/* Nav Column 1: Shop */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0E3B2F] mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-[#0D1F2D]/80">
              <li>
                <a href="#featured-products" className="hover:text-[#0E3B2F] transition-colors inline-block hover-scale-pill">
                  Dew Hydrate Serum
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#0E3B2F] transition-colors inline-block hover-scale-pill">
                  Dew Daily Cream
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#0E3B2F] transition-colors inline-block hover-scale-pill">
                  Dew Cloud Mist
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#0E3B2F] transition-colors inline-block hover-scale-pill">
                  Dew Glow Cleanser
                </a>
              </li>
              <li>
                <a href="#the-ritual" className="hover:text-[#0E3B2F] transition-colors inline-block hover-scale-pill">
                  The Daily Ritual Bundle
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: Brand & Info */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0E3B2F] mb-4">
              About Dew
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-[#0D1F2D]/80">
              <li>
                <a href="#ingredients" className="hover:text-[#0E3B2F] transition-colors inline-block hover-scale-pill">
                  Our Ingredients
                </a>
              </li>
              <li>
                <a href="#the-ritual" className="hover:text-[#0E3B2F] transition-colors inline-block hover-scale-pill">
                  The 3-Step Protocol
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-[#0E3B2F] transition-colors inline-block hover-scale-pill">
                  Community Reviews
                </a>
              </li>
              <li>
                <a href="#final-collection" className="hover:text-[#0E3B2F] transition-colors inline-block hover-scale-pill">
                  Delivery & Returns
                </a>
              </li>
              <li>
                <a href="#final-collection" className="hover:text-[#0E3B2F] transition-colors inline-block hover-scale-pill">
                  Sustainability
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup Column with Glassmorphic Card */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0E3B2F] mb-2">
              Join the Ritual
            </h4>
            <p className="text-xs text-[#0D1F2D]/80 mb-4 leading-relaxed font-medium">
              Receive 10% off your first ritual order (code: <strong>DEW10</strong>) plus seasonal skincare advice tailored to tropical climates.
            </p>

            {subscribed ? (
              <div className="p-4 glass-badge rounded-2xl flex items-center space-x-3 text-xs text-[#0E3B2F] font-bold">
                <CheckCircle2 size={18} className="text-[#0E3B2F] shrink-0" />
                <span>You’re on the list! Use code <strong>DEW10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 glass-pill text-[#0D1F2D] text-xs font-medium rounded-l-full focus:outline-none placeholder:text-[#0D1F2D]/50 border-r-0"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#0E3B2F] hover:bg-[#0A2E24] text-[#FFFFFF] text-xs font-extrabold uppercase tracking-wider rounded-r-full flex items-center transition-all hover-scale-pill"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
                {error && <p className="text-[11px] text-[#FA7E70] font-bold">{error}</p>}
              </form>
            )}

            <div className="mt-6 flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 glass-pill text-[#0E3B2F] hover:bg-white rounded-full transition-all hover-scale-pill"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 glass-pill text-[#0E3B2F] hover:bg-white rounded-full transition-all hover-scale-pill"
                aria-label="Twitter"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768m2.464-2.464L20 4"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#0D1F2D]/60 space-y-4 sm:space-y-0 font-medium">
          <p>© 2026 Dew Skincare Laboratories Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#hero" className="hover:text-[#0E3B2F] transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-[#0E3B2F] transition-colors">Terms of Service</a>
            <a href="#hero" className="hover:text-[#0E3B2F] transition-colors">Delivery Policies</a>
            <a href="#hero" className="hover:text-[#0E3B2F] transition-colors">Lagos, NG</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
