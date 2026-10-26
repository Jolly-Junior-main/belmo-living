'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/data/categories';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CollectionsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="collections-gallery" className="pt-10 sm:pt-14 pb-12 sm:pb-16 bg-belmo-ivory text-belmo-charcoal overflow-hidden select-none border-b border-belmo-charcoal/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-walnut">
              Curated Living • Architectural Categories
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-belmo-charcoal">
              Explore Our <span className="font-serif italic font-light text-belmo-walnut">Collections</span>
            </h2>
            <p className="text-xs md:text-sm text-belmo-charcoal/70 leading-relaxed font-light">
              From low-slung monolithic sectionals to sculpted Italian travertine centerpieces, explore eight tailored living environments.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous category"
              className="w-12 h-12 rounded-full border border-belmo-charcoal/20 flex items-center justify-center text-belmo-charcoal hover:bg-belmo-charcoal hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next category"
              className="w-12 h-12 rounded-full border border-belmo-charcoal/20 flex items-center justify-center text-belmo-charcoal hover:bg-belmo-charcoal hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Draggable Slider */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 md:px-10 pb-8 no-scrollbar scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORIES.map((cat, index) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group relative flex-shrink-0 w-[290px] sm:w-[360px] md:w-[410px] aspect-[4/5] rounded-[2.2rem] overflow-hidden bg-white snap-start shadow-sm hover:shadow-[0_25px_60px_rgba(0,0,0,0.14)] border border-black/5 transition-all duration-500"
          >
            {/* Background Image */}
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="(max-width: 768px) 300px, 420px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Card Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-widest uppercase bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 shadow-sm">
                  0{index + 1}
                </span>
                <span className="text-[11px] tracking-wider uppercase text-white/80 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-medium">
                  {cat.itemCount} Designs
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl md:text-3xl font-medium leading-tight group-hover:text-[#f4ab3a] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/80 line-clamp-2 font-light leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-3 flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-white group-hover:translate-x-1.5 transition-transform">
                  <span>Explore Series</span>
                  <div className="w-5 h-5 rounded-full bg-[#e59124] text-white flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
