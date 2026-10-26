'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { formatPrice } from '@/lib/utils';
import { X, Trash2, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartCount,
  } = useShop();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 3000;
  const progressToFree = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);
  const remainingForFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-belmo-charcoal/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-belmo-ivory h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-belmo-charcoal/10 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl tracking-wide text-belmo-charcoal">
              Atelier Cart
            </h2>
            <p className="text-xs text-belmo-charcoal/60 tracking-wider uppercase mt-0.5">
              {cartCount} {cartCount === 1 ? 'Curated Piece' : 'Curated Pieces'}
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="p-2 text-belmo-charcoal/60 hover:text-belmo-charcoal transition-colors rounded-full hover:bg-belmo-charcoal/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free White Glove Progress */}
        <div className="bg-belmo-cream px-6 py-3 border-b border-belmo-charcoal/10">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1.5 font-medium text-belmo-walnut">
              <Truck className="w-3.5 h-3.5" />
              White-Glove In-Home Installation
            </span>
            <span className="text-[11px] text-belmo-charcoal/70">
              {cartSubtotal >= freeDeliveryThreshold
                ? 'Complimentary'
                : `${formatPrice(remainingForFree)} away`}
            </span>
          </div>
          <div className="w-full h-1.5 bg-belmo-beige rounded-full overflow-hidden">
            <div
              className="h-full bg-belmo-walnut transition-all duration-500 rounded-full"
              style={{ width: `${progressToFree}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-belmo-charcoal/10">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-belmo-beige/40 flex items-center justify-center mb-4 text-belmo-walnut">
                <Sparkles className="w-8 h-8 stroke-[1.2]" />
              </div>
              <h3 className="font-serif text-lg text-belmo-charcoal mb-2">
                Your Atelier Cart is Empty
              </h3>
              <p className="text-xs text-belmo-charcoal/60 max-w-xs leading-relaxed mb-6">
                Explore Belmo Living architectural seating, sculpted stone, and solid American walnut centerpieces.
              </p>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-belmo-charcoal text-white text-xs tracking-editorial uppercase rounded hover:bg-belmo-walnut transition-colors"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 flex gap-4 items-start">
                <div className="relative w-20 h-20 rounded bg-belmo-beige/30 overflow-hidden shrink-0 border border-belmo-charcoal/5">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.productSlug}`}
                    onClick={() => setIsCartOpen(false)}
                    className="font-serif text-sm font-medium text-belmo-charcoal hover:text-belmo-walnut transition-colors truncate block"
                  >
                    {item.productName}
                  </Link>

                  {item.variantName && (
                    <p className="text-[11px] text-belmo-charcoal/60 truncate mt-0.5">
                      {item.variantName}
                    </p>
                  )}
                  {item.fabric && (
                    <p className="text-[11px] text-belmo-charcoal/60 truncate">
                      Fabric: {item.fabric}
                    </p>
                  )}
                  {item.configuration && (
                    <p className="text-[11px] text-belmo-bronze font-medium truncate">
                      {item.configuration}
                    </p>
                  )}

                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="flex items-center border border-belmo-charcoal/20 rounded bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-0.5 text-xs text-belmo-charcoal hover:bg-belmo-beige/40 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-medium text-belmo-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-0.5 text-xs text-belmo-charcoal hover:bg-belmo-beige/40 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-semibold text-belmo-charcoal">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                  className="text-belmo-charcoal/40 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-belmo-charcoal/10 bg-white/70 backdrop-blur-sm space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-belmo-charcoal/70">
                <span>Subtotal</span>
                <span className="font-medium text-belmo-charcoal">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
              <div className="flex justify-between text-belmo-charcoal/70">
                <span>White-Glove Delivery</span>
                <span>
                  {cartSubtotal >= freeDeliveryThreshold ? (
                    <span className="text-belmo-walnut font-medium">Complimentary</span>
                  ) : (
                    formatPrice(350)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-belmo-charcoal pt-2 border-t border-belmo-charcoal/10">
                <span>Estimated Total</span>
                <span>
                  {formatPrice(
                    cartSubtotal + (cartSubtotal >= freeDeliveryThreshold ? 0 : 350)
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-belmo-charcoal text-white text-xs tracking-editorial uppercase rounded-md hover:bg-belmo-walnut transition-all duration-300 shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[10px] text-belmo-charcoal/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-belmo-bronze" />
                <span>10-Year Master Frame Warranty & 30-Day In-Home Trial</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
