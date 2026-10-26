'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COLLECTIONS } from '@/data/collections';
import { ArrowRight } from 'lucide-react';

export default function CollectionsPage() {
  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="border-b border-belmo-charcoal/10 pb-10 mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-belmo-walnut">
            <Link href="/" className="hover:underline">Belmo Living</Link>
            <span>/</span>
            <span>Design Series</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-belmo-charcoal font-normal tracking-tight">
            Curated Collections
          </h1>
          <p className="text-xs md:text-sm text-belmo-charcoal/70 max-w-2xl font-light leading-relaxed">
            Cohesive design expressions engineered around singular architectural philosophies, organic palettes, and structural harmony.
          </p>
        </div>

        {/* Collections Stack */}
        <div className="space-y-16">
          {COLLECTIONS.map((col, idx) => (
            <div
              key={col.slug}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl p-6 sm:p-12 border border-belmo-charcoal/10 shadow-lg ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:col-span-6 space-y-5">
                <span className="text-[10px] font-mono tracking-luxury uppercase text-belmo-walnut">
                  Series 0{idx + 1}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-belmo-charcoal font-normal leading-tight">
                  {col.title}
                </h2>
                <p className="font-serif text-sm text-belmo-walnut italic">
                  {col.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-belmo-charcoal/80 font-light leading-relaxed">
                  {col.description}
                </p>
                <blockquote className="border-l-2 border-belmo-walnut pl-4 text-xs text-belmo-charcoal/60 italic font-serif">
                  &ldquo;{col.philosophy}&rdquo;
                </blockquote>

                {/* Color Palette swatches */}
                <div className="pt-2 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-belmo-charcoal/50 mr-2">
                    Palette:
                  </span>
                  {col.palette.map((hex, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href={`/collection/${col.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-belmo-charcoal hover:bg-belmo-walnut text-white text-xs tracking-editorial uppercase rounded-full transition-all duration-300 font-medium shadow-md"
                  >
                    <span>Explore Collection Pieces</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden bg-belmo-cream shadow-md">
                <Image
                  src={col.heroImage}
                  alt={col.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
