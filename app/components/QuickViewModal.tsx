'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Star, Check, Sparkles, Droplet, ShieldCheck } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeQuickView();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0D1F2D]/60 transition-opacity"
        onClick={closeQuickView}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative transform overflow-hidden rounded-3xl glass-card text-left shadow-dew-deep transition-all sm:my-8 w-full max-w-3xl border-2 border-white/95">
          {/* Close button */}
          <button
            type="button"
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 text-[#0D1F2D]/60 hover:text-[#0D1F2D] hover:bg-white/60 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 items-center relative z-10">
            {/* Left: Product Image Stage */}
            <div className="md:col-span-5">
              <div
                className="relative aspect-[3/4] rounded-2xl overflow-hidden p-4 flex items-center justify-center glass-panel"
                style={{ backgroundColor: quickViewProduct.accentColor }}
              >
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  className="object-contain p-2 mix-blend-multiply"
                  sizes="(max-width: 768px) 100vw, 350px"
                  priority
                />
              </div>
            </div>

            {/* Right: Details & Action */}
            <div className="md:col-span-7 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2.5 py-0.5 bg-[#0E3B2F] text-[#FFFFFF] text-[10px] font-extrabold uppercase tracking-wider rounded">
                    {quickViewProduct.category}
                  </span>
                  <span className="text-xs font-semibold text-[#0D1F2D]/60">
                    {quickViewProduct.volume}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D1F2D] mb-1">
                  {quickViewProduct.name}
                </h3>

                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center text-[#FF6B35]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#0D1F2D]">
                    {quickViewProduct.rating} ({quickViewProduct.reviewCount} reviews)
                  </span>
                </div>

                <div className="text-2xl font-black text-[#0E3B2F] mb-4">
                  {quickViewProduct.formattedPrice}
                </div>

                <p className="text-xs sm:text-sm text-[#0D1F2D]/80 leading-relaxed mb-4">
                  {quickViewProduct.description}
                </p>

                {/* Key Benefits */}
                <div className="space-y-1.5 mb-6">
                  {quickViewProduct.benefits.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-[#0D1F2D]/85">
                      <Droplet size={13} className="text-[#3B9DF8] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Bag */}
              <div className="pt-4 border-t border-[#0D1F2D]/10 flex items-center space-x-4">
                <div className="inline-flex items-center border border-[#0D1F2D]/20 rounded-md bg-[#FFFFFF] p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:bg-[#E3F2F7] rounded text-[#0D1F2D]"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 text-xs font-bold text-[#0D1F2D]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:bg-[#E3F2F7] rounded text-[#0D1F2D]"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 rounded text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-dew-subtle transition-all ${
                    added
                      ? 'bg-[#0E3B2F] text-[#FFFFFF]'
                      : 'bg-[#0E3B2F] hover:bg-[#0A2E24] text-[#FFFFFF] active:scale-95'
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={16} strokeWidth={3} />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      <span>Add to Bag · ₦{(quickViewProduct.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
