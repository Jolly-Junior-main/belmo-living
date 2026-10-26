'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/context/ShopContext';
import { Heart, ShoppingBag, Sliders, ArrowRight, Star } from 'lucide-react';

export default function SignaturePieces() {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});

  const signatureProducts = PRODUCTS.slice(0, 6);

  const handleSelectVariant = (productId: string, variantIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVariants((prev) => ({ ...prev, [productId]: variantIndex }));
  };

  return (
    <section className="pt-10 sm:pt-14 pb-20 bg-belmo-cream text-belmo-charcoal select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-walnut">
            Curated Masterpieces • Handcrafted Editions
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-belmo-charcoal">
            Signature <span className="font-serif italic font-light text-belmo-walnut">Pieces</span>
          </h2>
          <p className="text-xs md:text-sm text-belmo-charcoal/70 font-light leading-relaxed">
            Architectural centerpieces sculpted with enduring solid timbers, quarried Roman travertine, and master hand-tailored textiles.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureProducts.map((prod) => {
            const activeVariantIdx = selectedVariants[prod.id] || 0;
            const currentVariant = prod.variants[activeVariantIdx] || prod.variants[0];
            const displayImage = currentVariant?.image || prod.heroImage;
            const displayPrice = prod.price + (currentVariant?.priceDelta || 0);
            const inWish = isInWishlist(prod.id);

            return (
              <div
                key={prod.id}
                className="group bg-white rounded-[2rem] overflow-hidden border border-black/5 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[4/3] bg-[#f7f6f4] overflow-hidden">
                  <Link href={`/product/${prod.slug}`}>
                    <Image
                      src={displayImage}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </Link>

                  {/* Badge */}
                  {prod.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/90 text-[#1a1a1a] backdrop-blur-md border border-black/5 shadow-sm">
                        {prod.badge}
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(prod.id)}
                    aria-label="Save to wishlist"
                    className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-sm ${
                      inWish
                        ? 'bg-red-50 text-red-500'
                        : 'bg-white/80 text-belmo-charcoal hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick Customize Bar on Hover */}
                  {prod.customizable && (
                    <Link
                      href={`/customize?product=${prod.slug}`}
                      className="absolute bottom-4 left-4 right-4 z-10 py-2.5 bg-white/95 hover:bg-white text-[#1a1a1a] text-xs font-semibold rounded-full shadow-lg border border-black/5 backdrop-blur-md flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                    >
                      <Sliders className="w-3.5 h-3.5 text-[#e59124]" />
                      <span>Launch 3D Customizer</span>
                    </Link>
                  )}
                </div>

                {/* Product Meta */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-belmo-charcoal/60">
                      <span className="uppercase tracking-widest text-[10px] font-medium text-belmo-walnut">
                        {prod.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 font-medium">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{prod.rating}</span>
                        <span className="text-belmo-charcoal/40 font-normal">({prod.reviewCount})</span>
                      </div>
                    </div>

                    <Link
                      href={`/product/${prod.slug}`}
                      className="text-lg font-bold text-[#1a1a1a] hover:text-belmo-walnut transition-colors block line-clamp-1"
                    >
                      {prod.name}
                    </Link>

                    <p className="text-xs text-belmo-charcoal/65 line-clamp-2 leading-relaxed font-light">
                      {prod.tagline}
                    </p>
                  </div>

                  {/* Swatches Selector */}
                  {prod.variants.length > 1 && (
                    <div className="pt-2">
                      <p className="text-[10px] uppercase tracking-wider text-belmo-charcoal/50 mb-1.5">
                        Finish / Material ({prod.variants.length})
                      </p>
                      <div className="flex items-center gap-2">
                        {prod.variants.map((v, idx) => (
                          <button
                            key={v.id}
                            onClick={(e) => handleSelectVariant(prod.id, idx, e)}
                            title={v.name}
                            className={`w-6 h-6 rounded-full border-2 transition-all p-0.5 ${
                              activeVariantIdx === idx
                                ? 'border-[#e59124] scale-110 shadow-sm'
                                : 'border-transparent hover:border-belmo-charcoal/30'
                            }`}
                          >
                            <span
                              className="w-full h-full rounded-full block border border-black/10"
                              style={{ backgroundColor: v.colorHex }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price & Action Row */}
                  <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-[#1a1a1a]">
                        {formatPrice(displayPrice)}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-belmo-charcoal/40 line-through ml-2">
                          {formatPrice(prod.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        addToCart(prod, {
                          variantId: currentVariant?.id,
                          variantName: currentVariant?.name,
                          price: displayPrice,
                        })
                      }
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e59124] to-[#f4ab3a] text-[#1a130d] font-semibold text-xs tracking-wide shadow-sm hover:shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-belmo-charcoal/20 text-xs tracking-editorial uppercase font-medium text-belmo-charcoal hover:bg-belmo-charcoal hover:text-white transition-all duration-300"
          >
            <span>View All Curated Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
