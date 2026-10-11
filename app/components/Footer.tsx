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
    <footer className="w-full glass-dark text-[#FFFFFF] pt-20 pb-12 border-t border-white/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/20">
          {/* Brand Column with Standalone Dew Logo Mark */}
          <div className="md:col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <DewLogo size={42} color="#FFFFFF" />
            </div>
            <p className="text-xs sm:text-sm text-[#FFFFFF]/85 leading-relaxed max-w-sm mb-6">
              Thoughtful botanical skincare formulas for your everyday ritual. Clean hydration, barrier protection, and genuine skin comfort crafted for modern living.
            </p>
            <div className="space-y-2 text-xs text-[#FFFFFF]/75">
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-[#FDE89D]" />
                <span>Victoria Island, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} className="text-[#FDE89D]" />
                <span>hello@dewskincare.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-[#FDE89D]" />
                <span>+234 (0) 800 DEW CARE</span>
              </div>
            </div>
          </div>

          {/* Nav Column 1: Shop */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#FDE89D] mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-[#FFFFFF]/80">
              <li>
                <a href="#featured-products" className="hover:text-[#FFFFFF] transition-colors">
                  Dew Hydrate Serum
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#FFFFFF] transition-colors">
                  Dew Daily Cream
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#FFFFFF] transition-colors">
                  Dew Cloud Mist
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#FFFFFF] transition-colors">
                  Dew Glow Cleanser
                </a>
              </li>
              <li>
                <a href="#the-ritual" className="hover:text-[#FFFFFF] transition-colors">
                  The Daily Ritual Bundle
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: Brand & Info */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#FDE89D] mb-4">
              About Dew
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-[#FFFFFF]/80">
              <li>
                <a href="#ingredients" className="hover:text-[#FFFFFF] transition-colors">
                  Our Ingredients
                </a>
              </li>
              <li>
                <a href="#the-ritual" className="hover:text-[#FFFFFF] transition-colors">
                  The 3-Step Protocol
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-[#FFFFFF] transition-colors">
                  Community Reviews
                </a>
              </li>
              <li>
                <a href="#final-collection" className="hover:text-[#FFFFFF] transition-colors">
                  Delivery & Returns
                </a>
              </li>
              <li>
                <a href="#final-collection" className="hover:text-[#FFFFFF] transition-colors">
                  Sustainability
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup Column */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#FDE89D] mb-2">
              Join the Ritual
            </h4>
            <p className="text-xs text-[#FFFFFF]/80 mb-4 leading-relaxed">
              Receive 10% off your first ritual order (code: <strong>DEW10</strong>) plus seasonal skincare advice tailored to tropical climates.
            </p>

            {subscribed ? (
              <div className="p-4 bg-white/10 rounded-xl border border-white/20 flex items-center space-x-3 text-xs text-[#FFFFFF]">
                <CheckCircle2 size={18} className="text-[#FDE89D] shrink-0" />
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
                    className="flex-1 px-4 py-3 bg-white/90 text-[#0D1F2D] text-xs font-medium rounded-l-full focus:outline-none placeholder:text-[#0D1F2D]/50"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#FF6B35] hover:bg-[#F95721] text-[#FFFFFF] text-xs font-extrabold uppercase tracking-wider rounded-r-full flex items-center transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
                {error && <p className="text-[11px] text-[#FA7E70]">{error}</p>}
              </form>
            )}

            <div className="mt-6 flex items-center space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-[#FFFFFF]"
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
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-[#FFFFFF]"
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FFFFFF]/60 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Dew Skincare Laboratories Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6 font-medium">
            <a href="#hero" className="hover:text-[#FFFFFF] transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-[#FFFFFF] transition-colors">Terms of Service</a>
            <a href="#hero" className="hover:text-[#FFFFFF] transition-colors">Delivery Policies</a>
            <a href="#hero" className="hover:text-[#FFFFFF] transition-colors">Lagos, NG</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
