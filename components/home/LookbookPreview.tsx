'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LOOKBOOK_ROOMS } from '@/data/lookbook';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/context/ShopContext';
import { Plus, ArrowRight, ShoppingBag, Eye, X } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

export default function LookbookPreview() {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<any | null>(null);
  const { addToCart } = useShop();

  const currentRoom = LOOKBOOK_ROOMS[activeRoomIndex];

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
    <section className="pt-10 sm:pt-14 pb-16 bg-belmo-cream text-belmo-charcoal select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-walnut">
              Section 07 • Editorial Architecture
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-belmo-charcoal">
              Belmo Living <span className="font-serif italic font-light text-belmo-walnut">Lookbook</span>
            </h2>
            <p className="text-xs md:text-sm text-belmo-charcoal/70 font-light leading-relaxed">
              Curated architectural residences showcasing Belmo Living pieces in harmonious domestic dialogue. Tap hotspots on each room to inspect materials and acquire pieces.
            </p>
          </div>

          <Link
            href="/lookbook"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-editorial uppercase text-belmo-walnut hover:underline"
          >
            <span>Explore All Editorial Spaces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Room Switcher Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
          {LOOKBOOK_ROOMS.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => {
                setActiveRoomIndex(idx);
                setActiveHotspot(null);
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 shrink-0 ${
                activeRoomIndex === idx
                  ? 'bg-[#20201e] text-white shadow-md'
                  : 'bg-white/85 hover:bg-white border border-black/5 text-[#1a1a1a]/80 shadow-sm'
              }`}
            >
              0{idx + 1} • {room.title}
            </button>
          ))}
        </div>

        {/* Main Interactive Room Stage */}
        <div
          onClick={() => setActiveHotspot(null)}
          className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden bg-belmo-charcoal border border-belmo-charcoal/10 shadow-2xl group cursor-crosshair"
        >
          <Image
            src={currentRoom.mainImage}
            alt={currentRoom.title}
            fill
            sizes="100vw"
            className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-1000 ease-out"
          />

          {/* Room Title Tag in Top Left */}
          <div className="absolute top-6 left-6 z-10 bg-belmo-charcoal/70 backdrop-blur-md text-white p-4 rounded-2xl border border-white/10 max-w-sm">
            <span className="text-[10px] tracking-luxury uppercase text-belmo-bronze-light font-mono block">
              {currentRoom.roomType}
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-normal text-white mt-1">
              {currentRoom.title}
            </h3>
            <p className="text-[11px] text-belmo-beige/80 mt-1 font-light leading-relaxed hidden sm:block">
              {currentRoom.architecturalNote}
            </p>
          </div>

          {/* Interactive Hotspot Pins */}
          {currentRoom.hotspots.map((spot) => {
            const isSelected = activeHotspot?.productId === spot.productId;
            return (
              <div
                key={spot.productId}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              >
                {/* Pulsing Pin Button */}
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

                {/* Popover Card */}
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
      </div>
    </section>
  );
}
