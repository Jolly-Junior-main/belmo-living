'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/data/categories';
import { ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="border-b border-belmo-charcoal/10 pb-10 mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-belmo-walnut">
            <Link href="/" className="hover:underline">Belmo Living</Link>
            <span>/</span>
            <span>Design Environments</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-belmo-charcoal font-normal tracking-tight">
            Furniture Categories
          </h1>
          <p className="text-xs md:text-sm text-belmo-charcoal/70 max-w-2xl font-light leading-relaxed">
            Eight tailored spatial disciplines. From monolithic living room sectionals to sculpted stone centerpieces and quiet executive desks.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-belmo-beige/40 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between p-6 text-white"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-belmo-charcoal/90 via-belmo-charcoal/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
                  0{idx + 1}
                </span>
                <span className="text-[11px] tracking-wider uppercase text-belmo-beige">
                  {cat.itemCount} Designs
                </span>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="font-serif text-2xl font-normal leading-tight group-hover:text-belmo-bronze-light transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-belmo-beige/80 line-clamp-2 font-light">
                  {cat.description}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold tracking-editorial uppercase text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore Pieces</span>
                  <ArrowRight className="w-3.5 h-3.5 text-belmo-bronze-light" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
