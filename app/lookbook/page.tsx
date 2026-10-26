'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LOOKBOOK_ROOMS } from '@/data/lookbook';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/context/ShopContext';
import { Plus, ArrowRight, ShoppingBag, X, Sparkles, Compass } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

export default function LookbookPage() {
  const [selectedRoomId, setSelectedRoomId] = useState(LOOKBOOK_ROOMS[0].id);
  const [activeHotspot, setActiveHotspot] = useState<any | null>(null);
  const { addToCart } = useShop();

  const currentRoom = LOOKBOOK_ROOMS.find((r) => r.id === selectedRoomId) || LOOKBOOK_ROOMS[0];

  const handleHotspotClick = (spot: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveHotspot(activeHotspot?.productId === spot.productId ? null : spot);
  };

  const handleQuickAdd = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      addToCart(prod);
      setActiveHotspot(null);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="border-b border-belmo-charcoal/10 pb-8 mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-belmo-walnut">
            <Link href="/" className="hover:underline">Belmo Living</Link>
            <span>/</span>
            <span>Spatial Lookbook</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-belmo-charcoal font-normal tracking-tight">
            Lookbook & Editorial Spaces
          </h1>
          <p className="text-xs md:text-sm text-belmo-charcoal/70 max-w-2xl font-light leading-relaxed">
            Real architectural environments curated by the Belmo Living design studio. Explore room harmonies, light orientation, and tap interactive pins to acquire individual pieces.
          </p>
        </div>

        {/* Room Switcher Pills */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {LOOKBOOK_ROOMS.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => {
                setSelectedRoomId(room.id);
                setActiveHotspot(null);
              }}
              className={`px-5 py-3 rounded-2xl text-xs tracking-editorial uppercase transition-all duration-300 shrink-0 font-medium ${
                selectedRoomId === room.id
                  ? 'bg-belmo-charcoal text-white shadow-lg'
                  : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
              }`}
            >
              0{idx + 1} • {room.title}
            </button>
          ))}
        </div>

        {/* Main Stage Room Canvas */}
        <div
          onClick={() => setActiveHotspot(null)}
          className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden bg-belmo-charcoal border border-belmo-charcoal/10 shadow-2xl group cursor-crosshair mb-12"
        >
          <Image
            src={currentRoom.mainImage}
            alt={currentRoom.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-1000 ease-out"
          />

          {/* Room Title Tag in Top Left */}
          <div className="absolute top-6 left-6 z-10 bg-belmo-charcoal/80 backdrop-blur-md text-white p-5 rounded-2xl border border-white/10 max-w-md">
            <span className="text-[10px] tracking-luxury uppercase text-belmo-bronze-light font-mono block">
              {currentRoom.roomType}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mt-1">
              {currentRoom.title}
            </h3>
            <p className="text-xs text-belmo-beige/85 mt-2 font-light leading-relaxed">
              {currentRoom.architecturalNote}
            </p>
          </div>

          {/* Hotspot Pins */}
          {currentRoom.hotspots.map((spot) => {
            const isSelected = activeHotspot?.productId === spot.productId;
            return (
              <div
                key={spot.productId}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              >
                <button
                  onClick={(e) => handleHotspotClick(spot, e)}
                  aria-label={`View ${spot.productName}`}
                  className="relative group/pin flex items-center justify-center cursor-pointer"
                >
                  <span className="absolute w-8 h-8 rounded-full bg-belmo-bronze/40 animate-ping" />
                  <span
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 ${
                      isSelected
                        ? 'bg-belmo-charcoal scale-125 border-2 border-belmo-bronze'
                        : 'bg-belmo-charcoal/80 hover:bg-belmo-walnut border border-white/30 backdrop-blur-md'
                    }`}
                  >
                    <Plus className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'rotate-45' : ''}`} />
                  </span>
                </button>

                {isSelected && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-white rounded-2xl p-4 shadow-2xl border border-belmo-charcoal/10 text-belmo-charcoal z-30 animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[9px] tracking-widest uppercase font-semibold text-belmo-walnut block">
                          Featured In Space
                        </span>
                        <h4 className="font-serif text-sm font-medium text-belmo-charcoal mt-0.5 leading-snug">
                          {spot.productName}
                        </h4>
                      </div>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="text-belmo-charcoal/40 hover:text-belmo-charcoal p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs font-semibold text-belmo-charcoal mt-2">
                      {formatPrice(spot.price)}
                    </p>

                    <div className="mt-3 pt-3 border-t border-belmo-charcoal/10 flex items-center gap-2">
                      <Link
                        href={`/product/${spot.productSlug}`}
                        className="flex-1 text-center py-2 bg-belmo-charcoal hover:bg-belmo-walnut text-white text-[10px] tracking-wider uppercase rounded-md transition-colors"
                      >
                        View Piece
                      </Link>
                      <button
                        onClick={(e) => handleQuickAdd(spot.productId, e)}
                        className="p-2 border border-belmo-charcoal/20 hover:bg-belmo-cream rounded-md text-belmo-charcoal transition-colors"
                        title="Add to cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Shop This Exact Room Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-belmo-charcoal/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-luxury uppercase text-belmo-walnut font-semibold block">
                Curation Breakdown
              </span>
              <h3 className="font-serif text-2xl text-belmo-charcoal font-normal mt-0.5">
                Acquire Pieces in {currentRoom.title}
              </h3>
            </div>
            <span className="text-xs text-belmo-charcoal/60">
              {currentRoom.hotspots.length} Key Furniture Elements
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {currentRoom.hotspots.map((spot) => {
              const fullProd = PRODUCTS.find((p) => p.id === spot.productId);
              return (
                <div
                  key={spot.productId}
                  className="p-4 rounded-2xl bg-belmo-ivory border border-belmo-charcoal/10 flex items-center gap-4 justify-between"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-belmo-charcoal/5">
                    {fullProd?.heroImage && (
                      <Image
                        src={fullProd.heroImage}
                        alt={spot.productName}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${spot.productSlug}`}
                      className="font-serif text-xs font-medium text-belmo-charcoal hover:text-belmo-walnut truncate block"
                    >
                      {spot.productName}
                    </Link>
                    <p className="text-xs font-semibold text-belmo-charcoal mt-0.5">
                      {formatPrice(spot.price)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleQuickAdd(spot.productId, e)}
                    className="p-2.5 bg-belmo-charcoal hover:bg-belmo-walnut text-white rounded-lg transition-colors shrink-0"
                    title="Add to Atelier Cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
