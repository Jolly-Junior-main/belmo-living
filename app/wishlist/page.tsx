'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="border-b border-belmo-charcoal/10 pb-8 mb-12 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-belmo-walnut">
            <Link href="/" className="hover:underline">Belmo Living</Link>
            <span>/</span>
            <span>Private Curation</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-belmo-charcoal font-normal tracking-tight">
            Curated Wishlist ({savedProducts.length})
          </h1>
          <p className="text-xs sm:text-sm text-belmo-charcoal/70 font-light">
            Your private architectural shortlist of heirloom furniture pieces saved for future commissions.
          </p>
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-belmo-charcoal/10 max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-belmo-cream mx-auto flex items-center justify-center text-belmo-walnut border border-belmo-charcoal/10">
              <Heart className="w-8 h-8 stroke-[1.2]" />
            </div>
            <h2 className="font-serif text-2xl text-belmo-charcoal font-normal">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-belmo-charcoal/60 leading-relaxed max-w-sm mx-auto">
              Browse our architectural collections and tap the heart icon on any piece to save it to your personal curation.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-belmo-charcoal text-white text-xs tracking-editorial uppercase rounded-full hover:bg-belmo-walnut transition-all duration-300 font-semibold shadow-md"
              >
                <span>Browse Furniture Showroom</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProducts.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-2xl overflow-hidden border border-belmo-charcoal/10 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] bg-belmo-beige/30 overflow-hidden">
                  <Link href={`/product/${prod.slug}`}>
                    <Image
                      src={prod.heroImage}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </Link>

                  <button
                    onClick={() => toggleWishlist(prod.id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white text-red-500 flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-belmo-walnut font-medium">
                      {prod.category}
                    </span>
                    <Link
                      href={`/product/${prod.slug}`}
                      className="font-serif text-lg font-medium text-belmo-charcoal hover:text-belmo-walnut transition-colors block line-clamp-1"
                    >
                      {prod.name}
                    </Link>
                    <p className="text-xs text-belmo-charcoal/65 line-clamp-2 leading-relaxed font-light">
                      {prod.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-belmo-charcoal/10 flex items-center justify-between">
                    <span className="font-serif text-base font-medium text-belmo-charcoal">
                      {formatPrice(prod.price)}
                    </span>

                    <button
                      onClick={() => addToCart(prod)}
                      className="px-4 py-2 bg-belmo-charcoal hover:bg-belmo-walnut text-white text-xs tracking-editorial uppercase rounded-md transition-colors flex items-center gap-1.5 shadow-sm font-semibold"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
