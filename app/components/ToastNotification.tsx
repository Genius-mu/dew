'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, X, ShoppingBag } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { notification, clearNotification, openCart } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-200">
      <div className="bg-[#0E3B2F] text-[#FFFFFF] px-5 py-3.5 rounded-xl shadow-dew-deep flex items-center space-x-3 border border-[#FFFFFF]/20">
        <CheckCircle2 size={18} className="text-[#FDE89D] shrink-0" />
        <span className="text-xs font-bold tracking-wide">{notification}</span>
        <button
          type="button"
          onClick={openCart}
          className="ml-2 px-2.5 py-1 bg-[#FFFFFF] text-[#0E3B2F] text-[10px] font-extrabold uppercase rounded hover:bg-[#FDE89D] transition-colors"
        >
          View Bag
        </button>
        <button
          type="button"
          onClick={clearNotification}
          className="text-[#FFFFFF]/70 hover:text-[#FFFFFF] p-1"
          aria-label="Dismiss notification"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
