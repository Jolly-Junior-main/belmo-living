'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { formatPrice } from '@/lib/utils';
import { Trash2, ArrowRight, Truck, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartSubtotal, cartCount } = useShop();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const { addToast } = useShop();

  const freeDeliveryThreshold = 3000;
  const isFreeDelivery = cartSubtotal >= freeDeliveryThreshold;
  const deliveryCost = isFreeDelivery ? 0 : 350;

  const discountAmount = promoApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const estimatedTax = Math.round((cartSubtotal - discountAmount) * 0.08875);
  const grandTotal = cartSubtotal - discountAmount + deliveryCost + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BELMO10') {
      setPromoApplied(true);
      addToast('VIP Privileges Applied', '10% Private Collector courtesy applied to your order.');
    } else {
      addToast('Code Invalid', 'Please enter a valid Belmo Living VIP invitation code (Try: BELMO10).', 'error');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-28 min-h-screen bg-belmo-ivory text-belmo-charcoal select-none flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-6 space-y-5">
          <div className="w-20 h-20 rounded-full bg-belmo-cream mx-auto flex items-center justify-center text-belmo-walnut border border-belmo-charcoal/10">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h1 className="font-serif text-3xl text-belmo-charcoal font-normal">
            Your Atelier Cart is Empty
          </h1>
          <p className="text-xs sm:text-sm text-belmo-charcoal/70 leading-relaxed font-light">
            You have not yet selected any pieces for commission. Explore our architectural collections and customizer studio.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-belmo-charcoal text-white text-xs tracking-editorial uppercase rounded-full hover:bg-belmo-walnut transition-all duration-300 font-semibold shadow-lg"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="border-b border-belmo-charcoal/10 pb-8 mb-12 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-belmo-walnut">
            <Link href="/" className="hover:underline">Belmo Living</Link>
            <span>/</span>
            <span>Shopping Cart</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-belmo-charcoal font-normal tracking-tight">
            Atelier Cart ({cartCount} {cartCount === 1 ? 'Piece' : 'Pieces'})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Items Table */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            {/* White Glove Progress Box */}
            <div className="p-4 rounded-2xl bg-white border border-belmo-charcoal/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-belmo-walnut shrink-0" />
                <div>
                  <span className="font-semibold text-belmo-charcoal block">
                    White-Glove Inside Placement & Assembly
                  </span>
                  <span className="text-[11px] text-belmo-charcoal/60">
                    {isFreeDelivery
                      ? 'Complimentary qualification unlocked for your commission'
                      : `Add ${formatPrice(freeDeliveryThreshold - cartSubtotal)} more to qualify for complimentary white-glove`}
                  </span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase font-semibold ${isFreeDelivery ? 'bg-emerald-50 text-emerald-700' : 'bg-belmo-cream text-belmo-walnut'}`}>
                {isFreeDelivery ? 'Complimentary' : 'Standard $350'}
              </span>
            </div>

            {/* Items List */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-belmo-charcoal/10 shadow-sm divide-y divide-belmo-charcoal/10">
              {cart.map((item) => (
                <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-6 items-start">
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-belmo-beige/30 shrink-0 border border-belmo-charcoal/10">
                    <Image src={item.image} alt={item.productName} fill sizes="112px" className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <Link
                        href={`/product/${item.productSlug}`}
                        className="font-serif text-lg font-medium text-belmo-charcoal hover:text-belmo-walnut transition-colors"
                      >
                        {item.productName}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-belmo-charcoal/40 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-belmo-charcoal/70 space-y-0.5">
                      {item.variantName && <p>Spec: {item.variantName}</p>}
                      {item.fabric && <p>Textile: {item.fabric}</p>}
                      {item.woodFinish && <p>Hardwood: {item.woodFinish}</p>}
                      {item.configuration && <p className="font-medium text-belmo-walnut">Configuration: {item.configuration}</p>}
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center border border-belmo-charcoal/20 rounded-lg bg-belmo-cream/50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-xs text-belmo-charcoal hover:text-belmo-walnut"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-semibold text-belmo-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-xs text-belmo-charcoal hover:text-belmo-walnut"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-lg font-medium text-belmo-charcoal">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-belmo-charcoal/10 shadow-xl space-y-6">
            <h2 className="font-serif text-xl text-belmo-charcoal font-normal">
              Commission Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="VIP Code (e.g. BELMO10)"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-belmo-charcoal/15 text-xs bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-belmo-charcoal text-white text-xs tracking-wider uppercase rounded-xl hover:bg-belmo-walnut transition-colors font-medium"
              >
                Apply
              </button>
            </form>

            {/* Financial Line Items */}
            <div className="space-y-3 text-xs border-t border-b border-belmo-charcoal/10 py-4">
              <div className="flex justify-between text-belmo-charcoal/70">
                <span>Subtotal</span>
                <span className="font-medium text-belmo-charcoal">{formatPrice(cartSubtotal)}</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>VIP Collector Courtesy (10%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-belmo-charcoal/70">
                <span>White-Glove In-Home Installation</span>
                <span>
                  {isFreeDelivery ? (
                    <span className="text-emerald-700 font-medium">Complimentary</span>
                  ) : (
                    formatPrice(350)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-belmo-charcoal/70">
                <span>Estimated Sales Tax (NY 8.875%)</span>
                <span>{formatPrice(estimatedTax)}</span>
              </div>

              <div className="flex justify-between text-base font-serif font-medium text-belmo-charcoal pt-3 border-t border-belmo-charcoal/10">
                <span>Total Investment</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <div className="space-y-3">
              <Link
                href="/checkout"
                className="w-full py-4 bg-belmo-charcoal hover:bg-belmo-walnut text-white text-xs tracking-editorial uppercase font-semibold rounded-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              >
                <span>Proceed to White-Glove Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[10px] text-belmo-charcoal/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-belmo-bronze" />
                <span>Encrypted 256-bit Security & 10-Year Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
