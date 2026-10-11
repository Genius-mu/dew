'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { searchOpen, closeSearch, openQuickView, addToCart } = useCart();
  const [query, setQuery] = useState('');

  if (!searchOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.keyIngredients.some((ing) => ing.toLowerCase().includes(q))
        );
      })
    : PRODUCTS;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0D1F2D]/60 transition-opacity"
        onClick={closeSearch}
      />

      <div className="flex min-h-full items-start justify-center p-4 sm:p-6 text-center pt-16 sm:pt-24">
        <div className="relative transform overflow-hidden rounded-2xl bg-[#FFFFFF] text-left shadow-dew-deep transition-all w-full max-w-2xl border-2 border-[#0E3B2F]">
          {/* Header Input */}
          <div className="p-4 sm:p-6 border-b border-[#0D1F2D]/10 flex items-center space-x-3 bg-[#E3F2F7]">
            <Search size={22} className="text-[#0E3B2F] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, ingredients, or rituals (e.g. aloe, serum, mist)..."
              className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#0D1F2D] placeholder:text-[#0D1F2D]/50 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-[#0D1F2D]/50 hover:text-[#0D1F2D]"
              >
                <X size={18} />
              </button>
            )}
            <button
              type="button"
              onClick={closeSearch}
              className="p-1.5 bg-[#FFFFFF] text-[#0D1F2D] hover:bg-[#FFFFFF]/80 rounded-full shadow-dew-subtle"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Filter Tags */}
          <div className="px-6 py-3 bg-[#FFFFFF] border-b border-[#0D1F2D]/5 flex flex-wrap gap-2 text-xs">
            <span className="text-[#0D1F2D]/60 font-medium py-1">Popular:</span>
            {['Hydrate Serum', 'Aloe', 'Daily Cream', 'Cleanser', 'Ritual'].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 bg-[#E3F2F7] hover:bg-[#FDF1C8] text-[#0E3B2F] font-bold rounded transition-colors text-[11px]"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
            {results.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm font-bold text-[#0D1F2D]">No products found for “{query}”</p>
                <p className="text-xs text-[#0D1F2D]/60 mt-1">Try searching for aloe, serum, cream, or mist.</p>
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    closeSearch();
                    openQuickView(product);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#0D1F2D]/10 hover:border-[#0E3B2F] hover:bg-[#E3F2F7]/50 cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="relative w-14 h-16 bg-[#E3F2F7] rounded-lg overflow-hidden shrink-0 p-1">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="60px"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0E3B2F] block">
                        {product.category}
                      </span>
                      <h4 className="text-sm font-extrabold text-[#0D1F2D] truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs font-bold text-[#0E3B2F]">
                        {product.formattedPrice}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                        closeSearch();
                      }}
                      className="px-3 py-1.5 bg-[#0E3B2F] text-[#FFFFFF] text-[11px] font-bold uppercase rounded hover:bg-[#0A2E24]"
                    >
                      + Add
                    </button>
                    <ArrowRight size={16} className="text-[#0D1F2D]/40" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
