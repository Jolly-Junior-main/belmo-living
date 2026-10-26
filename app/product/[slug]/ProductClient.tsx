'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/context/ShopContext';
import {
  Heart,
  ShoppingBag,
  Sliders,
  ShieldCheck,
  Truck,
  Star,
  Check,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ProductClient({ slug }: { slug: string }) {
  const product = PRODUCTS.find((p) => p.slug === slug);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'dimensions' | 'materials' | 'delivery'>('details');

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center max-w-xl mx-auto px-6">
        <h2 className="font-serif text-3xl text-belmo-charcoal mb-4">Piece Not Located</h2>
        <p className="text-xs text-belmo-charcoal/70 mb-6">The architectural design you are seeking is currently unavailable or has been archived.</p>
        <Link href="/shop" className="px-6 py-3 bg-belmo-charcoal text-white text-xs tracking-editorial uppercase rounded-md">
          Return to Showroom
        </Link>
      </div>
    );
  }

  const currentVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const currentPrice = product.price + (currentVariant?.priceDelta || 0);
  const inWish = isInWishlist(product.id);

  const images = product.galleryImages.length > 0 ? product.galleryImages : [product.heroImage];
  const activeImage = images[selectedImageIdx] || images[0];

  const handleAddToCart = () => {
    addToCart(product, {
      variantId: currentVariant?.id,
      variantName: currentVariant?.name,
      price: currentPrice,
      quantity,
    });
  };

  const relatedPieces = PRODUCTS.filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug).slice(0, 3);

  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-belmo-charcoal/60">
          <Link href="/" className="hover:text-belmo-walnut">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-belmo-walnut">Showroom</Link>
          <span>/</span>
          <Link href={`/category/${product.categorySlug}`} className="hover:text-belmo-walnut">{product.category}</Link>
          <span>/</span>
          <span className="text-belmo-charcoal font-medium truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          {/* Left: Gallery Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-white border border-belmo-charcoal/10 shadow-lg">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-all duration-500"
              />

              {product.badge && (
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3.5 py-1.5 rounded-full text-[10px] font-medium tracking-luxury uppercase bg-belmo-charcoal/80 text-white backdrop-blur-md border border-white/20">
                    {product.badge}
                  </span>
                </div>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Add to wishlist"
                className={`absolute top-5 right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-md ${
                  inWish ? 'bg-red-50 text-red-500' : 'bg-white/80 text-belmo-charcoal hover:bg-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWish ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnails Row */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-24 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIdx === idx
                        ? 'border-belmo-walnut shadow-md ring-1 ring-belmo-walnut'
                        : 'border-belmo-charcoal/15 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} view ${idx + 1}`} fill sizes="96px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Narrative & Ordering Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 border-b border-belmo-charcoal/10 pb-6">
              <div className="flex items-center justify-between text-xs text-belmo-charcoal/60">
                <span className="font-mono tracking-widest uppercase text-belmo-walnut">
                  {product.collection}
                </span>
                <div className="flex items-center gap-1 text-amber-600 text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-belmo-charcoal/40">({product.reviewCount} Reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-belmo-charcoal font-normal leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-belmo-charcoal/70 font-light leading-relaxed">
                {product.tagline}
              </p>

              {/* Price Row */}
              <div className="pt-3 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-medium text-belmo-charcoal">
                  {formatPrice(currentPrice)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-belmo-charcoal/40 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-[11px] text-belmo-walnut uppercase tracking-wider font-medium ml-auto">
                  {product.leadTime}
                </span>
              </div>
            </div>

            {/* Variant / Finish Options */}
            {product.variants.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold tracking-wider uppercase text-belmo-charcoal text-[11px]">
                    Select Specification
                  </span>
                  <span className="text-belmo-charcoal/70 text-[11px]">
                    {currentVariant.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        selectedVariantIdx === idx
                          ? 'border-belmo-walnut bg-white shadow-sm ring-1 ring-belmo-walnut'
                          : 'border-belmo-charcoal/10 hover:border-belmo-charcoal/30 bg-belmo-cream/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-5 h-5 rounded-full border border-black/15 shadow-inner"
                          style={{ backgroundColor: v.colorHex }}
                        />
                        <span className="text-xs font-medium text-belmo-charcoal text-left">
                          {v.name}
                        </span>
                      </div>
                      <span className="text-xs text-belmo-charcoal/70">
                        {v.priceDelta > 0 ? `+${formatPrice(v.priceDelta)}` : 'Standard'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart & Customizer CTA */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-belmo-charcoal/20 rounded-xl bg-white h-12 px-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-sm px-2 text-belmo-charcoal hover:text-belmo-walnut"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-medium text-belmo-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-sm px-2 text-belmo-charcoal hover:text-belmo-walnut"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-belmo-charcoal hover:bg-belmo-walnut text-white text-xs tracking-editorial uppercase font-semibold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire Piece • {formatPrice(currentPrice * quantity)}</span>
                </button>
              </div>

              {product.customizable && (
                <Link
                  href={`/customize?product=${product.slug}`}
                  className="w-full h-12 border border-belmo-walnut/30 hover:border-belmo-walnut bg-white hover:bg-belmo-cream text-belmo-walnut text-xs tracking-editorial uppercase font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Launch 3D Customizer Studio for This Model</span>
                </Link>
              )}

              <a
                href={`https://wa.me/18004823566?text=Hello%20Belmo%20Living,%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(product.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-xs text-belmo-charcoal/70 hover:text-belmo-walnut flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-belmo-bronze" />
                <span>Inquire directly with Belmo Atelier via WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 border-t border-belmo-charcoal/10 grid grid-cols-2 gap-3 text-[11px] text-belmo-charcoal/80">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-belmo-walnut" />
                <span>White-Glove Installation</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-belmo-walnut" />
                <span>10-Year Master Frame Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-belmo-charcoal/10 shadow-sm">
          <div className="flex border-b border-belmo-charcoal/10 gap-8 overflow-x-auto no-scrollbar mb-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-4 text-xs tracking-editorial uppercase transition-colors relative font-medium ${
                activeTab === 'details' ? 'text-belmo-walnut' : 'text-belmo-charcoal/50 hover:text-belmo-charcoal'
              }`}
            >
              Story & Craft Details
              {activeTab === 'details' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-belmo-walnut" />}
            </button>
            <button
              onClick={() => setActiveTab('dimensions')}
              className={`pb-4 text-xs tracking-editorial uppercase transition-colors relative font-medium ${
                activeTab === 'dimensions' ? 'text-belmo-walnut' : 'text-belmo-charcoal/50 hover:text-belmo-charcoal'
              }`}
            >
              Dimensions & Space Guide
              {activeTab === 'dimensions' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-belmo-walnut" />}
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`pb-4 text-xs tracking-editorial uppercase transition-colors relative font-medium ${
                activeTab === 'materials' ? 'text-belmo-walnut' : 'text-belmo-charcoal/50 hover:text-belmo-charcoal'
              }`}
            >
              Materials & Sustainability
              {activeTab === 'materials' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-belmo-walnut" />}
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`pb-4 text-xs tracking-editorial uppercase transition-colors relative font-medium ${
                activeTab === 'delivery' ? 'text-belmo-walnut' : 'text-belmo-charcoal/50 hover:text-belmo-charcoal'
              }`}
            >
              White-Glove Delivery
              {activeTab === 'delivery' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-belmo-walnut" />}
            </button>
          </div>

          {activeTab === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-belmo-charcoal">Design Philosophy</h3>
                <p className="text-xs sm:text-sm text-belmo-charcoal/80 leading-relaxed font-light">
                  {product.description}
                </p>
                <p className="text-xs sm:text-sm text-belmo-charcoal/80 leading-relaxed font-light">
                  {product.story}
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-serif text-2xl text-belmo-charcoal mb-4">Master Craftsmanship</h3>
                {product.craftDetails.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-belmo-cream text-belmo-walnut flex items-center justify-center shrink-0 mt-0.5 border border-belmo-charcoal/10">
                      <Check className="w-3 h-3" />
                    </div>
                    <p className="text-xs text-belmo-charcoal/80 leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'dimensions' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 rounded-xl bg-belmo-cream/50 border border-belmo-charcoal/10 space-y-1">
                <span className="text-[10px] tracking-wider uppercase text-belmo-walnut block">Overall Width</span>
                <span className="text-base font-medium text-belmo-charcoal">{product.dimensions.width}</span>
              </div>
              <div className="p-4 rounded-xl bg-belmo-cream/50 border border-belmo-charcoal/10 space-y-1">
                <span className="text-[10px] tracking-wider uppercase text-belmo-walnut block">Overall Depth</span>
                <span className="text-base font-medium text-belmo-charcoal">{product.dimensions.depth}</span>
              </div>
              <div className="p-4 rounded-xl bg-belmo-cream/50 border border-belmo-charcoal/10 space-y-1">
                <span className="text-[10px] tracking-wider uppercase text-belmo-walnut block">Overall Height</span>
                <span className="text-base font-medium text-belmo-charcoal">{product.dimensions.height}</span>
              </div>
              <div className="p-4 rounded-xl bg-belmo-cream/50 border border-belmo-charcoal/10 space-y-1">
                <span className="text-[10px] tracking-wider uppercase text-belmo-walnut block">Total Net Weight</span>
                <span className="text-base font-medium text-belmo-charcoal">{product.dimensions.weight}</span>
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-belmo-charcoal">Authentic Materials Specification</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.materials.map((mat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-belmo-cream/40 border border-belmo-charcoal/10 flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-belmo-walnut" />
                    <span className="text-xs font-medium text-belmo-charcoal">{mat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-4 text-xs text-belmo-charcoal/80 leading-relaxed">
              <h3 className="font-serif text-2xl text-belmo-charcoal">White-Glove Delivery Experience</h3>
              <p>
                Belmo Living commissions include full two-person white-glove inside placement, component assembly, leveling, and complete removal of all protective packing materials.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Pieces */}
      {relatedPieces.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl text-belmo-charcoal font-normal">
              Complementary Architectural Pieces
            </h2>
            <Link href="/shop" className="text-xs font-semibold tracking-editorial uppercase text-belmo-walnut hover:underline flex items-center gap-1">
              <span>View Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPieces.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-belmo-charcoal/10 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[4/3] bg-belmo-beige/30 overflow-hidden">
                  <Image src={p.heroImage} alt={p.name} fill sizes="300px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 space-y-1">
                  <span className="text-[10px] tracking-wider uppercase text-belmo-walnut font-medium">{p.category}</span>
                  <h4 className="font-serif text-base font-medium text-belmo-charcoal group-hover:text-belmo-walnut transition-colors truncate">{p.name}</h4>
                  <p className="text-xs font-semibold text-belmo-charcoal pt-1">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
