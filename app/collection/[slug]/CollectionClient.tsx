'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COLLECTIONS } from '@/data/collections';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/context/ShopContext';
import { Heart, ShoppingBag, Sliders } from 'lucide-react';

export default function CollectionClient({ slug }: { slug: string }) {
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  if (!collection) {
    return (
      <div className="pt-40 pb-24 text-center max-w-xl mx-auto px-6">
        <h2 className="font-serif text-3xl text-belmo-charcoal mb-4">Collection Not Found</h2>
        <p className="text-xs text-belmo-charcoal/70 mb-6">The design series you are looking for is not present in our records.</p>
        <Link href="/collections" className="px-6 py-3 bg-belmo-charcoal text-white text-xs tracking-editorial uppercase rounded-md">
          View Collections
        </Link>
      </div>
    );
  }

  const collectionProducts = PRODUCTS.filter((p) => p.collectionSlug === slug);

  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
        <div className="relative rounded-3xl overflow-hidden bg-belmo-charcoal min-h-[380px] flex items-center p-8 sm:p-14 text-white shadow-xl">
          <Image
            src={collection.heroImage}
            alt={collection.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-belmo-bronze-light">
              <Link href="/collections" className="hover:underline">Collections</Link>
              <span>/</span>
              <span>{collection.title}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-tight">
              {collection.title}
            </h1>
            <p className="font-serif text-lg text-belmo-beige italic">
              {collection.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-belmo-beige/85 font-light leading-relaxed">
              {collection.description}
            </p>
          </div>
        </div>
      </div>

      {/* Pieces Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl text-belmo-charcoal font-normal">
            Pieces in This Series ({collectionProducts.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionProducts.map((prod) => {
            const inWish = isInWishlist(prod.id);
            return (
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

                  {prod.badge && (
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-medium tracking-luxury uppercase bg-belmo-charcoal/80 text-belmo-ivory backdrop-blur-md border border-white/20">
                      {prod.badge}
                    </span>
                  )}

                  <button
                    onClick={() => toggleWishlist(prod.id)}
                    className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors backdrop-blur-md ${
                      inWish ? 'bg-red-50 text-red-500' : 'bg-white/70 text-belmo-charcoal hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
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

                    <div className="flex items-center gap-2">
                      {prod.customizable && (
                        <Link
                          href={`/customize?product=${prod.slug}`}
                          className="p-2 border border-belmo-charcoal/20 hover:bg-belmo-cream rounded-md text-belmo-charcoal transition-colors"
                          title="Launch 3D Customizer"
                        >
                          <Sliders className="w-4 h-4 text-belmo-walnut" />
                        </Link>
                      )}
                      <button
                        onClick={() => addToCart(prod)}
                        className="px-4 py-2 bg-belmo-charcoal hover:bg-belmo-walnut text-white text-xs tracking-editorial uppercase rounded-md transition-colors flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
