'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { formatPrice } from '@/lib/utils';
import { PRODUCTS } from '@/data/products';
import { Sliders, Check, ArrowRight, ShieldCheck, Sparkles, Layers } from 'lucide-react';

interface FabricOption {
  id: string;
  name: string;
  tone: string;
  colorHex: string;
  priceDelta: number;
  previewImage: string;
}

interface WoodOption {
  id: string;
  name: string;
  colorHex: string;
  priceDelta: number;
}

interface ConfigOption {
  id: string;
  name: string;
  dimensions: string;
  multiplier: number;
}

const FABRICS: FabricOption[] = [
  {
    id: 'boucle-creme',
    name: 'Italian Tactile Bouclé',
    tone: 'Ivory Cream',
    colorHex: '#F6F3ED',
    priceDelta: 0,
    previewImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'leather-cognac',
    name: 'Tuscan Full-Grain Leather',
    tone: 'Belmo Saddle Bronze',
    colorHex: '#8A5623',
    priceDelta: 850,
    previewImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'wool-charcoal',
    name: 'Highland Pure Wool',
    tone: 'Architectural Charcoal',
    colorHex: '#282827',
    priceDelta: 350,
    previewImage: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'linen-sand',
    name: 'Belgian Organic Linen',
    tone: 'Raw Oatmeal',
    colorHex: '#DED6C7',
    priceDelta: 200,
    previewImage: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=1600&q=85',
  },
];

const WOOD_FINISHES: WoodOption[] = [
  { id: 'walnut', name: 'Solid American Walnut', colorHex: '#583D29', priceDelta: 0 },
  { id: 'smoked-oak', name: 'Smoked Crown Oak', colorHex: '#3D352E', priceDelta: 150 },
  { id: 'white-oak', name: 'Bleached Scandinavian Oak', colorHex: '#C9BEAD', priceDelta: 100 },
];

const CONFIGURATIONS: ConfigOption[] = [
  { id: '3-seater', name: '3-Seater Grand Sofa', dimensions: '108" W x 42" D', multiplier: 1.0 },
  { id: 'sectional-l', name: 'Corner L-Sectional', dimensions: '132" W x 84" D', multiplier: 1.45 },
  { id: '2-seater', name: '2-Seater Studio Lounger', dimensions: '88" W x 42" D', multiplier: 0.85 },
];

export default function CustomizerPreview() {
  const { addToCart } = useShop();
  const [selectedFabric, setSelectedFabric] = useState<FabricOption>(FABRICS[0]);
  const [selectedWood, setSelectedWood] = useState<WoodOption>(WOOD_FINISHES[0]);
  const [selectedConfig, setSelectedConfig] = useState<ConfigOption>(CONFIGURATIONS[0]);

  const basePrice = 4850;
  const totalPrice = Math.round(
    (basePrice * selectedConfig.multiplier) + selectedFabric.priceDelta + selectedWood.priceDelta
  );

  const solaceProduct = PRODUCTS.find((p) => p.slug === 'belmo-solace-modular-sofa') || PRODUCTS[0];

  const handleAddCustomToCart = () => {
    addToCart(solaceProduct, {
      fabric: `${selectedFabric.name} (${selectedFabric.tone})`,
      woodFinish: selectedWood.name,
      configuration: selectedConfig.name,
      price: totalPrice,
      isCustom: true,
    });
  };

  return (
    <section className="pt-12 sm:pt-16 pb-16 bg-belmo-ivory text-belmo-charcoal select-none border-b border-belmo-charcoal/10" id="make-it-yours">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-walnut">
              Section 06 • Interactive Atelier Customizer
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-belmo-charcoal">
              Make It <span className="font-serif italic font-light text-belmo-walnut">Yours.</span>
            </h2>
            <p className="text-xs md:text-sm text-belmo-charcoal/70 font-light leading-relaxed">
              Every Belmo Living commission is crafted to order. Configure scale, upholstery, and solid timber sub-chassis to suit your unique architectural proportion.
            </p>
          </div>

          <Link
            href="/customize"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-editorial uppercase text-belmo-walnut hover:underline"
          >
            <span>Launch Full 3D Customizer Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Customizer Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl p-6 sm:p-10 border border-belmo-charcoal/10 shadow-xl">
          {/* Left: Dynamic Visual Preview */}
          <div className="lg:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden bg-belmo-cream border border-belmo-charcoal/5 shadow-inner">
            <Image
              src={selectedFabric.previewImage}
              alt={selectedFabric.name}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-all duration-700 ease-out"
            />
            {/* Ambient Lighting Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-belmo-charcoal/60 via-transparent to-transparent pointer-events-none" />

            {/* Spec HUD Tag in Corner */}
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-belmo-charcoal/10 shadow-sm space-y-0.5">
              <span className="text-[10px] tracking-luxury uppercase text-belmo-walnut font-semibold block">
                Live Configuration
              </span>
              <p className="text-xs font-medium text-belmo-charcoal">
                {selectedConfig.name} • {selectedFabric.tone}
              </p>
              <p className="text-[10px] text-belmo-charcoal/60">
                {selectedWood.name}
              </p>
            </div>

            {/* Dimension Tag */}
            <div className="absolute bottom-4 left-4 z-10 bg-belmo-charcoal/80 text-white backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] font-mono">
              Dimension: {selectedConfig.dimensions}
            </div>
          </div>

          {/* Right: Controls Panel */}
          <div className="lg:col-span-5 space-y-7">
            {/* 1. Configuration / Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold tracking-luxury uppercase text-belmo-charcoal text-[11px]">
                  1. Size & Configuration
                </span>
                <span className="text-belmo-charcoal/60 text-[11px]">
                  {selectedConfig.dimensions}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {CONFIGURATIONS.map((cfg) => (
                  <button
                    key={cfg.id}
                    onClick={() => setSelectedConfig(cfg)}
                    className={`py-3 px-3 rounded-xl border text-left transition-all ${
                      selectedConfig.id === cfg.id
                        ? 'border-belmo-walnut bg-belmo-cream shadow-sm font-medium'
                        : 'border-belmo-charcoal/10 hover:border-belmo-charcoal/30 bg-white'
                    }`}
                  >
                    <p className="text-xs text-belmo-charcoal font-medium leading-tight">{cfg.name}</p>
                    <p className="text-[10px] text-belmo-charcoal/50 mt-1">{cfg.dimensions}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Fabric & Material */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold tracking-luxury uppercase text-belmo-charcoal text-[11px]">
                  2. Textile & Upholstery
                </span>
                <span className="text-belmo-walnut font-medium text-[11px]">
                  {selectedFabric.name} ({selectedFabric.tone})
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {FABRICS.map((fab) => (
                  <button
                    key={fab.id}
                    onClick={() => setSelectedFabric(fab)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      selectedFabric.id === fab.id
                        ? 'border-belmo-walnut bg-belmo-cream shadow-sm ring-1 ring-belmo-walnut'
                        : 'border-belmo-charcoal/10 hover:border-belmo-charcoal/30 bg-white'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border border-black/15 shadow-inner"
                      style={{ backgroundColor: fab.colorHex }}
                    />
                    <div className="text-center">
                      <p className="text-[11px] font-medium text-belmo-charcoal leading-tight line-clamp-1">
                        {fab.tone}
                      </p>
                      <p className="text-[9px] text-belmo-charcoal/50 mt-0.5">
                        {fab.priceDelta > 0 ? `+${formatPrice(fab.priceDelta)}` : 'Included'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Wood Chassis Finish */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold tracking-luxury uppercase text-belmo-charcoal text-[11px]">
                  3. Hardwood Sub-Chassis
                </span>
                <span className="text-belmo-charcoal/60 text-[11px]">
                  {selectedWood.name}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {WOOD_FINISHES.map((wood) => (
                  <button
                    key={wood.id}
                    onClick={() => setSelectedWood(wood)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                      selectedWood.id === wood.id
                        ? 'border-belmo-walnut bg-belmo-cream shadow-sm font-medium'
                        : 'border-belmo-charcoal/10 hover:border-belmo-charcoal/30 bg-white'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: wood.colorHex }}
                    />
                    <span className="text-[11px] text-belmo-charcoal truncate">
                      {wood.name.split(' ')[1] || wood.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Total Price & Checkout Bar */}
            <div className="pt-6 border-t border-belmo-charcoal/10 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] tracking-luxury uppercase text-belmo-charcoal/60 block">
                    Bespoke Atelier Commission
                  </span>
                  <span className="font-serif text-3xl font-medium text-belmo-charcoal">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-belmo-walnut font-medium block">
                    4-5 Weeks Delivery
                  </span>
                  <span className="text-[10px] text-belmo-charcoal/50">
                    White-Glove Included
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddCustomToCart}
                  className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#e59124] to-[#f4ab3a] text-[#1a130d] text-xs font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(229,145,36,0.35)] hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-[#1a130d]" />
                  <span>Commission This Piece</span>
                </button>

                <Link
                  href="/customize"
                  className="px-6 py-3.5 rounded-full border border-black/10 bg-white/80 hover:bg-white text-[#1a1a1a] text-xs font-medium tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.02]"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#e59124]" />
                  <span>3D Studio</span>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-belmo-charcoal/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-belmo-bronze" />
                <span>Complimentary Swatch Sample Kit available upon request</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
