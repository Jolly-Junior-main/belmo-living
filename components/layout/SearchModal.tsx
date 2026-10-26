'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { formatPrice } from '@/lib/utils';
import { Search, X, ArrowUpRight } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.materials.some((m) => m.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-belmo-charcoal/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-belmo-ivory rounded-2xl shadow-2xl border border-belmo-charcoal/10 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-belmo-charcoal/10 bg-white">
          <Search className="w-5 h-5 text-belmo-walnut mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sofas, travertine tables, walnut, bouclé..."
            className="w-full bg-transparent text-sm md:text-base text-belmo-charcoal placeholder:text-belmo-charcoal/40 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="p-1.5 text-belmo-charcoal/40 hover:text-belmo-charcoal transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {query.trim() === '' ? (
            <div>
              <p className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-walnut mb-3">
                Popular Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="text-xs px-3.5 py-1.5 rounded-full bg-belmo-cream border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-walnut hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-belmo-charcoal/10">
                <p className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-walnut mb-3">
                  Signature Architectural Pieces
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTS.filter((p) => p.featured).slice(0, 4).map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/product/${prod.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors group"
                    >
                      <div className="relative w-12 h-12 rounded bg-belmo-beige/40 overflow-hidden shrink-0">
                        <Image
                          src={prod.heroImage}
                          alt={prod.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-belmo-charcoal group-hover:text-belmo-walnut truncate">
                          {prod.name}
                        </p>
                        <p className="text-[11px] text-belmo-charcoal/60">
                          {formatPrice(prod.price)}
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-belmo-charcoal/30 group-hover:text-belmo-walnut shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-serif text-base text-belmo-charcoal">
                No pieces found matching &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-belmo-charcoal/60 mt-1 max-w-sm mx-auto">
                Explore our full furniture catalog or speak with a Belmo Living interior curator for bespoke requests.
              </p>
              <Link
                href="/shop"
                onClick={() => setIsSearchOpen(false)}
                className="inline-block mt-4 text-xs font-semibold uppercase tracking-wider text-belmo-walnut hover:underline"
              >
                Browse All Furniture →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-walnut">
                {filteredProducts.length} Matching Results
              </p>
              <div className="divide-y divide-belmo-charcoal/10">
                {filteredProducts.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/product/${prod.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="py-3 flex items-center justify-between group hover:bg-white/60 px-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-14 h-14 rounded bg-belmo-beige/30 overflow-hidden shrink-0">
                        <Image
                          src={prod.heroImage}
                          alt={prod.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm font-medium text-belmo-charcoal group-hover:text-belmo-walnut transition-colors truncate">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-belmo-charcoal/60 truncate mt-0.5">
                          {prod.category} • {prod.collection}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className="text-xs font-semibold text-belmo-charcoal">
                        {formatPrice(prod.price)}
                      </span>
                      <span className="block text-[10px] text-belmo-walnut uppercase tracking-wide">
                        View Piece →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
