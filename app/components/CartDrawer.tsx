'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isOpen,
    closeCart,
    items,
    updateQuantity,
    removeFromCart,
    totalItems,
    subtotal,
    discount,
    discountPercent,
    appliedPromo,
    applyPromo,
    total,
    freeShippingThreshold,
    shippingProgress,
    clearCart,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmation'>('cart');

  // Checkout form state
  const [formData, setFormData] = useState({
    name: 'Adanna Okafor',
    email: 'adanna@example.com',
    phone: '+234 802 123 4567',
    address: '14 Adeleke Adedoyin St',
    city: 'Victoria Island',
    state: 'Lagos',
    paymentMethod: 'paystack',
  });

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromo(promoInput);
    setPromoMessage({ text: res.message, success: res.success });
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('confirmation');
  };

  const handleFinishOrder = () => {
    clearCart();
    setCheckoutStep('cart');
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Solid Backdrop */}
      <div
        className="fixed inset-0 bg-[#0D1F2D]/60 transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] shadow-dew-deep flex flex-col justify-between border-l border-[#0D1F2D]/10">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#0D1F2D]/10 flex items-center justify-between bg-[#FFFFFF]">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={20} className="text-[#0E3B2F]" />
              <h2 className="text-base font-extrabold uppercase tracking-wider text-[#0D1F2D]">
                {checkoutStep === 'cart'
                  ? `Your Bag (${totalItems})`
                  : checkoutStep === 'checkout'
                  ? 'Express Checkout'
                  : 'Ritual Confirmed'}
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-1.5 text-[#0D1F2D]/70 hover:text-[#0D1F2D] hover:bg-[#E3F2F7] rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {checkoutStep === 'cart' && (
              <>
                {/* Free Shipping Progress Indicator */}
                <div className="mb-6 p-4 bg-[#E3F2F7] rounded-xl border border-[#0D1F2D]/5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0E3B2F] mb-2">
                    <span>
                      {subtotal >= freeShippingThreshold
                        ? '🎉 You unlocked Free Delivery nationwide!'
                        : `Add ₦${(freeShippingThreshold - subtotal).toLocaleString()} more for Free Delivery`}
                    </span>
                    <span>{shippingProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#FFFFFF] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0E3B2F] transition-all duration-300"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                {items.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#E3F2F7] rounded-full flex items-center justify-center text-[#0E3B2F]">
                      <ShoppingBag size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0D1F2D] mb-2">
                      Your bag is empty
                    </h3>
                    <p className="text-xs text-[#0D1F2D]/70 mb-6 max-w-xs mx-auto">
                      Discover our everyday hydration essentials and curate your personal ritual.
                    </p>
                    <button
                      type="button"
                      onClick={closeCart}
                      className="px-6 py-3 bg-[#0E3B2F] text-[#FFFFFF] text-xs font-extrabold uppercase tracking-wider rounded-sm hover:bg-[#0A2E24]"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map(({ product, quantity }) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-4 p-3 bg-[#FFFFFF] rounded-xl border border-[#0D1F2D]/10 shadow-dew-subtle"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-16 h-20 bg-[#E3F2F7] rounded-lg overflow-hidden shrink-0 p-1">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                            sizes="80px"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-extrabold text-[#0D1F2D] truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs font-bold text-[#0E3B2F] mt-0.5">
                            {product.formattedPrice}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3 mt-2">
                            <div className="inline-flex items-center border border-[#0D1F2D]/20 rounded bg-[#FFFFFF]">
                              <button
                                type="button"
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                                className="p-1 hover:bg-[#E3F2F7] text-[#0D1F2D]"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="px-2 text-xs font-bold text-[#0D1F2D]">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                                className="p-1 hover:bg-[#E3F2F7] text-[#0D1F2D]"
                                aria-label="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(product.id)}
                              className="text-[#0D1F2D]/50 hover:text-[#FA7E70] p-1"
                              aria-label={`Remove ${product.name}`}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Line Total */}
                        <div className="text-right">
                          <span className="text-sm font-black text-[#0D1F2D]">
                            ₦{(product.price * quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Promo Code Input */}
                {items.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-[#0D1F2D]/10">
                    <form onSubmit={handleApplyPromo} className="flex space-x-2">
                      <div className="relative flex-1">
                        <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D1F2D]/40" />
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Promo code (e.g. DEW10)"
                          className="w-full pl-9 pr-3 py-2 bg-[#E3F2F7] text-xs font-bold uppercase rounded border border-[#0D1F2D]/10 focus:outline-none focus:ring-1 focus:ring-[#0E3B2F]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#0E3B2F] text-[#FFFFFF] text-xs font-bold uppercase rounded hover:bg-[#0A2E24]"
                      >
                        Apply
                      </button>
                    </form>
                    {promoMessage && (
                      <p
                        className={`text-[11px] font-bold mt-2 ${
                          promoMessage.success ? 'text-[#0E3B2F]' : 'text-[#FA7E70]'
                        }`}
                      >
                        {promoMessage.text}
                      </p>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Step 2: Checkout Form */}
            {checkoutStep === 'checkout' && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="p-3 bg-[#FDF1C8] rounded-lg border border-[#0D1F2D]/10 mb-4">
                  <p className="text-xs font-bold text-[#0E3B2F]">
                    ✨ Prototype Demonstration Storefront
                  </p>
                  <p className="text-[11px] text-[#0D1F2D]/75 mt-0.5">
                    Order details are simulated for testing. No real payment will be charged.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D1F2D] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-[#0D1F2D]/20 rounded text-xs font-medium focus:ring-1 focus:ring-[#0E3B2F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0D1F2D] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-[#0D1F2D]/20 rounded text-xs font-medium focus:ring-1 focus:ring-[#0E3B2F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0D1F2D] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-[#0D1F2D]/20 rounded text-xs font-medium focus:ring-1 focus:ring-[#0E3B2F] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D1F2D] mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-[#0D1F2D]/20 rounded text-xs font-medium focus:ring-1 focus:ring-[#0E3B2F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0D1F2D] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-[#0D1F2D]/20 rounded text-xs font-medium focus:ring-1 focus:ring-[#0E3B2F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0D1F2D] mb-1">
                      State
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 border border-[#0D1F2D]/20 rounded text-xs font-medium focus:ring-1 focus:ring-[#0E3B2F] focus:outline-none bg-[#FFFFFF]"
                    >
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja (FCT)">Abuja (FCT)</option>
                      <option value="Rivers">Rivers</option>
                      <option value="Oyo">Oyo</option>
                      <option value="Delta">Delta</option>
                      <option value="Enugu">Enugu</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D1F2D] mb-2">
                    Payment Gateway (Demo)
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 p-3 border border-[#0D1F2D]/20 rounded-lg cursor-pointer hover:bg-[#E3F2F7]">
                      <input
                        type="radio"
                        name="payment"
                        value="paystack"
                        checked={formData.paymentMethod === 'paystack'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="text-[#0E3B2F]"
                      />
                      <div className="text-xs">
                        <span className="font-extrabold text-[#0D1F2D] block">Paystack (Cards, Bank Transfer, USSD)</span>
                        <span className="text-[#0D1F2D]/60 text-[11px]">Instant Nigerian Naira checkout</span>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border border-[#0D1F2D]/20 rounded-lg cursor-pointer hover:bg-[#E3F2F7]">
                      <input
                        type="radio"
                        name="payment"
                        value="flutterwave"
                        checked={formData.paymentMethod === 'flutterwave'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="text-[#0E3B2F]"
                      />
                      <div className="text-xs">
                        <span className="font-extrabold text-[#0D1F2D] block">Flutterwave</span>
                        <span className="text-[#0D1F2D]/60 text-[11px]">African & International payment cards</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-1/3 py-3 border border-[#0D1F2D]/20 text-xs font-bold uppercase rounded text-[#0D1F2D]"
                  >
                    Back to Bag
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 bg-[#0E3B2F] hover:bg-[#0A2E24] text-[#FFFFFF] text-xs font-extrabold uppercase rounded shadow-dew-subtle"
                  >
                    Place Demo Order · ₦{total.toLocaleString()}
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Order Confirmation */}
            {checkoutStep === 'confirmation' && (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#E3F2F7] rounded-full flex items-center justify-center text-[#0E3B2F]">
                  <CheckCircle2 size={36} />
                </div>
                <span className="px-3 py-1 bg-[#E3F2F7] text-[#0E3B2F] text-xs font-bold uppercase rounded inline-block mb-2">
                  Order #DEW-2026-9812
                </span>
                <h3 className="text-2xl font-extrabold text-[#0D1F2D] mb-2">
                  Ritual Dispatched!
                </h3>
                <p className="text-xs text-[#0D1F2D]/80 mb-6 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. A simulated confirmation receipt has been sent to <strong>{formData.email}</strong>. Your skin’s new journey begins now.
                </p>

                <div className="bg-[#E3F2F7] p-4 rounded-xl text-left text-xs mb-6 space-y-1.5">
                  <div className="flex justify-between font-bold text-[#0D1F2D]">
                    <span>Recipient:</span>
                    <span>{formData.name}</span>
                  </div>
                  <div className="flex justify-between text-[#0D1F2D]/75">
                    <span>Address:</span>
                    <span>{formData.address}, {formData.city}, {formData.state}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#0E3B2F] pt-2 border-t border-[#0D1F2D]/10">
                    <span>Total Paid (Demo):</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinishOrder}
                  className="w-full py-3.5 bg-[#0E3B2F] text-[#FFFFFF] text-xs font-extrabold uppercase tracking-wider rounded-sm hover:bg-[#0A2E24]"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action (When in cart mode) */}
          {checkoutStep === 'cart' && items.length > 0 && (
            <div className="px-6 py-5 bg-[#FFFFFF] border-t border-[#0D1F2D]/10">
              <div className="space-y-2 mb-4 text-xs font-medium text-[#0D1F2D]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#0D1F2D]">₦{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#0E3B2F] font-bold">
                    <span>Promo Discount ({discountPercent}%)</span>
                    <span>-₦{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>
                    {subtotal >= freeShippingThreshold ? (
                      <strong className="text-[#0E3B2F]">FREE</strong>
                    ) : (
                      'Calculated at checkout'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[#0D1F2D] pt-2 border-t border-[#0D1F2D]/10">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-4 bg-[#0E3B2F] hover:bg-[#0A2E24] text-[#FFFFFF] text-xs font-extrabold uppercase tracking-wider rounded-sm flex items-center justify-center space-x-2 shadow-dew-card active:scale-95 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <div className="mt-3 flex items-center justify-center space-x-2 text-[11px] text-[#0D1F2D]/60">
                <ShieldCheck size={14} className="text-[#0E3B2F]" />
                <span>Encrypted 256-bit secure checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
