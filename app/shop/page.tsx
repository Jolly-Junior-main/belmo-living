'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/context/ShopContext';
import { Heart, ShoppingBag, Sliders, Filter, ArrowUpDown, LayoutGrid, List, Check } from 'lucide-react';

export default function ShopPage() {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false;
      }
      if (inStockOnly && !p.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, inStockOnly, sortBy]);

  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12">
        <div className="border-b border-belmo-charcoal/10 pb-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-belmo-walnut">
            <Link href="/" className="hover:underline">Belmo Living</Link>
            <span>/</span>
            <span>Complete Showroom Catalog</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-belmo-charcoal font-normal tracking-tight">
            Shop All Furniture
          </h1>
          <p className="text-xs md:text-sm text-belmo-charcoal/70 max-w-2xl font-light leading-relaxed">
            Every Belmo Living commission is crafted to order using sustainable Appalachian hardwoods, hand-loomed Italian textiles, and monolithic geological stone.
          </p>
        </div>

        {/* Filter & Toolbar */}
        <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs tracking-editorial uppercase transition-all shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-belmo-charcoal text-white font-medium shadow-sm'
                  : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
              }`}
            >
              All Pieces ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs tracking-editorial uppercase transition-all shrink-0 ${
                  selectedCategory === cat.slug
                    ? 'bg-belmo-charcoal text-white font-medium shadow-sm'
                    : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right Controls: Sort & In Stock */}
          <div className="flex flex-wrap items-center gap-4 text-xs shrink-0">
            {/* In stock toggle */}
            <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-belmo-charcoal/10">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded accent-belmo-walnut"
              />
              <span className="text-belmo-charcoal/80">In Stock Ready to Ship</span>
            </label>

            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-belmo-charcoal/10">
              <ArrowUpDown className="w-3.5 h-3.5 text-belmo-walnut" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-belmo-charcoal focus:outline-none cursor-pointer text-xs"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Grid vs List View */}
            <div className="hidden sm:flex items-center bg-white rounded-lg border border-belmo-charcoal/10 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-belmo-cream text-belmo-walnut' : 'text-belmo-charcoal/40'}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-belmo-cream text-belmo-walnut' : 'text-belmo-charcoal/40'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-belmo-charcoal/10 p-8">
            <h3 className="font-serif text-2xl text-belmo-charcoal mb-2">No Matching Pieces</h3>
            <p className="text-xs text-belmo-charcoal/60 mb-6">
              Adjust your category filters or speak to our atelier curator for custom commissions.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setInStockOnly(false);
              }}
              className="px-6 py-2.5 bg-belmo-charcoal text-white text-xs tracking-editorial uppercase rounded-md hover:bg-belmo-walnut transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => {
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
                      <div className="flex items-center justify-between text-[11px] text-belmo-charcoal/60">
                        <span className="uppercase tracking-widest">{prod.category}</span>
                        <span>{prod.leadTime.split('—')[0]}</span>
                      </div>

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
                            title="Customize 3D"
                          >
                            <Sliders className="w-4 h-4 text-belmo-walnut" />
                          </Link>
                        )}
                        <button
                          onClick={() => addToCart(prod)}
                          className="px-4 py-2 bg-belmo-charcoal hover:bg-belmo-walnut text-white text-xs tracking-editorial uppercase rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl p-4 sm:p-6 border border-belmo-charcoal/10 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative w-full sm:w-48 aspect-[4/3] rounded-xl overflow-hidden shrink-0 bg-belmo-beige/30">
                  <Image
                    src={prod.heroImage}
                    alt={prod.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-wider text-belmo-walnut font-medium">
                      {prod.category}
                    </span>
                    {prod.badge && (
                      <span className="text-[9px] uppercase tracking-luxury px-2 py-0.5 rounded bg-belmo-charcoal/10 text-belmo-charcoal">
                        {prod.badge}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/product/${prod.slug}`}
                    className="font-serif text-xl font-medium text-belmo-charcoal hover:text-belmo-walnut transition-colors block truncate"
                  >
                    {prod.name}
                  </Link>
                  <p className="text-xs text-belmo-charcoal/70 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-belmo-charcoal/60 pt-1">
                    <span>Dimensions: {prod.dimensions.width} x {prod.dimensions.depth}</span>
                    <span>•</span>
                    <span>{prod.leadTime}</span>
                  </div>
                </div>

                <div className="text-right shrink-0 w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-4">
                  <span className="font-serif text-xl font-medium text-belmo-charcoal">
                    {formatPrice(prod.price)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="p-2 border border-belmo-charcoal/20 hover:bg-belmo-cream rounded-md text-belmo-charcoal transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(prod.id) ? 'fill-current text-red-500' : ''}`} />
                    </button>
                    <button
                      onClick={() => addToCart(prod)}
                      className="px-5 py-2.5 bg-belmo-charcoal hover:bg-belmo-walnut text-white text-xs tracking-editorial uppercase rounded-md transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
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
