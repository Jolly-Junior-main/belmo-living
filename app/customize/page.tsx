'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { formatPrice } from '@/lib/utils';
import { PRODUCTS } from '@/data/products';
import {
  Sliders,
  Sparkles,
  Sun,
  Moon,
  Layers,
  ShieldCheck,
  FileText,
  Mail,
  Check,
  ShoppingBag,
  RotateCw,
  Eye,
  Info
} from 'lucide-react';

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

interface HardwareOption {
  id: string;
  name: string;
  colorHex: string;
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
  {
    id: 'velvet-moss',
    name: 'Forest Brushed Velvet',
    tone: 'Deep Moss',
    colorHex: '#384333',
    priceDelta: 400,
    previewImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85',
  },
];

const WOOD_OPTIONS: WoodOption[] = [
  { id: 'walnut', name: 'Solid American Walnut', colorHex: '#583D29', priceDelta: 0 },
  { id: 'smoked-oak', name: 'Smoked Crown Oak', colorHex: '#3D352E', priceDelta: 150 },
  { id: 'white-oak', name: 'Bleached White Oak', colorHex: '#C9BEAD', priceDelta: 100 },
  { id: 'espresso-ash', name: 'Espresso Black Ash', colorHex: '#1F1B18', priceDelta: 200 },
];

const HARDWARE_OPTIONS: HardwareOption[] = [
  { id: 'bronze', name: 'Brushed Champagne Bronze', colorHex: '#A98D6C' },
  { id: 'steel', name: 'Matte Blackened Steel', colorHex: '#20201E' },
  { id: 'brass', name: 'Satin Polished Brass', colorHex: '#CDB172' },
];

const CONFIG_MODES = [
  { id: '2-seater', name: '2-Seater Studio Lounger', size: '88" W x 42" D', factor: 0.85 },
  { id: '3-seater', name: '3-Seater Grand Sofa', size: '108" W x 42" D', factor: 1.0 },
  { id: 'sectional-l', name: 'Corner L-Sectional', size: '132" W x 84" D', factor: 1.45 },
  { id: 'chaise', name: 'Architectural Chaise & Lounger', size: '118" W x 68" D', factor: 1.25 },
];

function CustomizerContent() {
  const searchParams = useSearchParams();
  const requestedProductSlug = searchParams.get('product') || 'belmo-solace-modular-sofa';

  const baseProduct = PRODUCTS.find((p) => p.slug === requestedProductSlug) || PRODUCTS[0];
  const { addToCart, submitQuoteRequest, addToast } = useShop();

  const [config, setConfig] = useState(CONFIG_MODES[1]);
  const [fabric, setFabric] = useState<FabricOption>(FABRICS[0]);
  const [wood, setWood] = useState<WoodOption>(WOOD_OPTIONS[0]);
  const [hardware, setHardware] = useState<HardwareOption>(HARDWARE_OPTIONS[0]);
  const [cushionCore, setCushionCore] = useState<'Cloud Foam' | 'Goose Down Duvet' | 'Firm Latex'>('Goose Down Duvet');
  const [lightingMode, setLightingMode] = useState<'morning' | 'gallery' | 'dusk' | 'atelier'>('gallery');

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyOrDesigner: '',
    deliveryAddress: '',
    budgetRange: '$5,000 - $15,000',
    notes: '',
  });

  const basePrice = baseProduct.price;
  const totalPrice = Math.round(
    (basePrice * config.factor) + fabric.priceDelta + wood.priceDelta
  );

  const handleAddToCart = () => {
    addToCart(baseProduct, {
      fabric: `${fabric.name} (${fabric.tone})`,
      woodFinish: wood.name,
      configuration: config.name,
      price: totalPrice,
      isCustom: true,
    });
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitQuoteRequest({
      fullName: quoteForm.fullName,
      email: quoteForm.email,
      phone: quoteForm.phone,
      companyOrDesigner: quoteForm.companyOrDesigner,
      deliveryAddress: quoteForm.deliveryAddress,
      budgetRange: quoteForm.budgetRange,
      spec: {
        baseProductId: baseProduct.id,
        baseProductName: baseProduct.name,
        configuration: config.name as any,
        fabric: fabric.id,
        fabricName: `${fabric.name} (${fabric.tone})`,
        woodFinish: wood.id,
        woodFinishName: wood.name,
        hardware: hardware.id,
        hardwareName: hardware.name,
        cushionFill: 'Organic Wool & Goose Down',
        customNotes: quoteForm.notes,
        estimatedPrice: totalPrice,
        leadTime: '4-5 Weeks',
      },
    });
    setQuoteModalOpen(false);
  };

  const handleDownloadSpec = () => {
    addToast('Specification Sheet Generated', `PDF Summary for ${baseProduct.name} (${config.name}) ready for printing.`);
    window.print();
  };

  const lightingGradients = {
    morning: 'from-[#FDFBF7] via-[#F4EFE6] to-[#E5DDD0]',
    gallery: 'from-[#FFFFFF] via-[#F6F3ED] to-[#EAE4D9]',
    dusk: 'from-[#3A322C] via-[#242120] to-[#171615]',
    atelier: 'from-[#20201E] via-[#1A1A18] to-[#121210]',
  };

  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      {/* Studio Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-belmo-charcoal/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-belmo-walnut">
              <Link href="/shop" className="hover:underline">Atelier Studio</Link>
              <span>/</span>
              <span>3D Customizer</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-belmo-charcoal font-normal">
              Make It Yours • {baseProduct.name}
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={handleDownloadSpec}
              className="px-4 py-2 border border-belmo-charcoal/20 rounded-lg hover:bg-white transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export PDF Spec</span>
            </button>
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="px-4 py-2 bg-belmo-walnut text-white rounded-lg hover:bg-belmo-charcoal transition-colors flex items-center gap-1.5 font-medium"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Request Swatches</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Workbench */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Studio Stage Canvas with Lighting Switcher */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            <div
              className={`relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-belmo-charcoal/10 shadow-2xl transition-all duration-700 bg-gradient-to-b ${lightingGradients[lightingMode]}`}
            >
              <Image
                src={fabric.previewImage}
                alt={fabric.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover object-center transition-all duration-700"
              />

              {/* Lighting Mode Selector HUD */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 bg-belmo-charcoal/70 backdrop-blur-md p-1.5 rounded-full border border-white/20 text-white text-[10px] tracking-wider uppercase">
                <span className="px-2 font-mono text-belmo-beige/60">Light:</span>
                <button
                  onClick={() => setLightingMode('morning')}
                  className={`px-2.5 py-1 rounded-full transition-colors ${lightingMode === 'morning' ? 'bg-belmo-bronze text-white' : 'hover:text-white text-belmo-beige/70'}`}
                >
                  Dawn
                </button>
                <button
                  onClick={() => setLightingMode('gallery')}
                  className={`px-2.5 py-1 rounded-full transition-colors ${lightingMode === 'gallery' ? 'bg-belmo-bronze text-white' : 'hover:text-white text-belmo-beige/70'}`}
                >
                  Gallery
                </button>
                <button
                  onClick={() => setLightingMode('dusk')}
                  className={`px-2.5 py-1 rounded-full transition-colors ${lightingMode === 'dusk' ? 'bg-belmo-bronze text-white' : 'hover:text-white text-belmo-beige/70'}`}
                >
                  Dusk
                </button>
                <button
                  onClick={() => setLightingMode('atelier')}
                  className={`px-2.5 py-1 rounded-full transition-colors ${lightingMode === 'atelier' ? 'bg-belmo-bronze text-white' : 'hover:text-white text-belmo-beige/70'}`}
                >
                  Atelier
                </button>
              </div>

              {/* Dimension HUD Overlay */}
              <div className="absolute bottom-5 left-5 z-20 bg-belmo-charcoal/80 text-white backdrop-blur-md px-4 py-2 rounded-xl text-xs font-mono space-y-0.5 border border-white/10">
                <span className="text-[10px] text-belmo-bronze-light uppercase block">
                  Live Proportion
                </span>
                <p className="font-semibold">{config.name}</p>
                <p className="text-[11px] text-white/70">W x D: {config.size}</p>
              </div>

              {/* Material Chip in Top Right */}
              <div className="absolute top-5 right-5 z-20 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs text-belmo-charcoal border border-belmo-charcoal/10 shadow-sm flex items-center gap-2.5">
                <span
                  className="w-4 h-4 rounded-full border border-black/20"
                  style={{ backgroundColor: fabric.colorHex }}
                />
                <span className="font-medium text-[11px]">{fabric.tone}</span>
              </div>
            </div>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-belmo-charcoal/10 space-y-1">
                <span className="text-[10px] tracking-wider uppercase text-belmo-walnut block">Selected Textile</span>
                <span className="font-medium text-belmo-charcoal">{fabric.name}</span>
                <span className="text-[10px] text-belmo-charcoal/50 block">{fabric.tone}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-belmo-charcoal/10 space-y-1">
                <span className="text-[10px] tracking-wider uppercase text-belmo-walnut block">Hardwood Subframe</span>
                <span className="font-medium text-belmo-charcoal">{wood.name}</span>
                <span className="text-[10px] text-belmo-charcoal/50 block">FSC® Kiln-Dried</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-belmo-charcoal/10 space-y-1">
                <span className="text-[10px] tracking-wider uppercase text-belmo-walnut block">Hardware Accent</span>
                <span className="font-medium text-belmo-charcoal">{hardware.name}</span>
                <span className="text-[10px] text-belmo-charcoal/50 block">Hand-Buffed</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-belmo-charcoal/10 space-y-1">
                <span className="text-[10px] tracking-wider uppercase text-belmo-walnut block">Cushion Core</span>
                <span className="font-medium text-belmo-charcoal">{cushionCore}</span>
                <span className="text-[10px] text-belmo-charcoal/50 block">Hypoallergenic</span>
              </div>
            </div>
          </div>

          {/* Right: Customization Controls Panel */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-belmo-charcoal/10 shadow-xl space-y-6">
            {/* Step 1: Configuration */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-charcoal block">
                1. Scale & Configuration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CONFIG_MODES.map((cfg) => (
                  <button
                    key={cfg.id}
                    onClick={() => setConfig(cfg)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      config.id === cfg.id
                        ? 'border-belmo-walnut bg-belmo-cream ring-1 ring-belmo-walnut font-medium'
                        : 'border-belmo-charcoal/10 hover:border-belmo-charcoal/30 bg-white'
                    }`}
                  >
                    <p className="text-xs text-belmo-charcoal font-medium leading-tight">{cfg.name}</p>
                    <p className="text-[10px] text-belmo-charcoal/50 mt-1">{cfg.size}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Upholstery & Textiles */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <label className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-charcoal">
                  2. Textile & Finish
                </label>
                <span className="text-[11px] text-belmo-walnut font-medium">
                  {fabric.tone}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {FABRICS.map((fab) => (
                  <button
                    key={fab.id}
                    onClick={() => setFabric(fab)}
                    title={`${fab.name} (${fab.tone})`}
                    className={`aspect-square rounded-xl border flex flex-col items-center justify-center p-1 transition-all ${
                      fabric.id === fab.id
                        ? 'border-belmo-walnut ring-2 ring-belmo-walnut scale-105 shadow-md bg-belmo-cream'
                        : 'border-belmo-charcoal/15 hover:border-belmo-charcoal/40 bg-white'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-full border border-black/15 shadow-inner"
                      style={{ backgroundColor: fab.colorHex }}
                    />
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-belmo-charcoal/60 mt-1">
                {fabric.name} • {fabric.priceDelta > 0 ? `+${formatPrice(fabric.priceDelta)}` : 'Standard Included'}
              </p>
            </div>

            {/* Step 3: Wood Chassis */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-charcoal block">
                3. Solid Hardwood Chassis
              </label>
              <div className="grid grid-cols-2 gap-2">
                {WOOD_OPTIONS.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWood(w)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                      wood.id === w.id
                        ? 'border-belmo-walnut bg-belmo-cream ring-1 ring-belmo-walnut'
                        : 'border-belmo-charcoal/10 hover:border-belmo-charcoal/30 bg-white'
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-black/15 shrink-0"
                      style={{ backgroundColor: w.colorHex }}
                    />
                    <span className="text-xs text-belmo-charcoal truncate">
                      {w.name.split(' ')[1] || w.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Hardware Accents */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-charcoal block">
                4. Metal Hardware Insets
              </label>
              <div className="grid grid-cols-3 gap-2">
                {HARDWARE_OPTIONS.map((hw) => (
                  <button
                    key={hw.id}
                    onClick={() => setHardware(hw)}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      hardware.id === hw.id
                        ? 'border-belmo-walnut bg-belmo-cream ring-1 ring-belmo-walnut'
                        : 'border-belmo-charcoal/10 hover:border-belmo-charcoal/30 bg-white'
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-black/15"
                      style={{ backgroundColor: hw.colorHex }}
                    />
                    <span className="text-[10px] text-belmo-charcoal truncate text-center">
                      {hw.name.split(' ')[1] || hw.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Ergonomics Cushion Core */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-charcoal block">
                5. Cushion Ergonomics
              </label>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {(['Cloud Foam', 'Goose Down Duvet', 'Firm Latex'] as const).map((core) => (
                  <button
                    key={core}
                    onClick={() => setCushionCore(core)}
                    className={`py-2 px-1 rounded-xl border text-[11px] transition-all ${
                      cushionCore === core
                        ? 'border-belmo-walnut bg-belmo-cream font-medium text-belmo-walnut'
                        : 'border-belmo-charcoal/10 text-belmo-charcoal/70 bg-white'
                    }`}
                  >
                    {core}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Cart Actions */}
            <div className="pt-6 border-t border-belmo-charcoal/10 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] tracking-luxury uppercase text-belmo-charcoal/60 block">
                    Total Atelier Investment
                  </span>
                  <span className="font-serif text-3xl font-medium text-belmo-charcoal">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-belmo-walnut font-medium block">
                    4-5 Weeks Assembly
                  </span>
                  <span className="text-[10px] text-belmo-charcoal/50">
                    White Glove Included
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-belmo-charcoal hover:bg-belmo-walnut text-white text-xs tracking-editorial uppercase font-semibold rounded-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-belmo-bronze-light" />
                  <span>Commission This Piece</span>
                </button>

                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="w-full py-3 border border-belmo-charcoal/20 hover:bg-belmo-cream text-belmo-charcoal text-xs tracking-editorial uppercase rounded-xl transition-colors font-medium flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-belmo-walnut" />
                  <span>Request Bespoke Architectural Quote</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-belmo-charcoal/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-belmo-bronze" />
                <span>Includes 10-Year Master Frame Guarantee & In-Home Assembly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote / Bespoke Modal */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-belmo-charcoal/70 backdrop-blur-sm"
            onClick={() => setQuoteModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-belmo-ivory rounded-3xl p-8 border border-belmo-charcoal/10 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-serif text-2xl text-belmo-charcoal font-normal mb-2">
              Request Bespoke Architectural Quote
            </h3>
            <p className="text-xs text-belmo-charcoal/70 mb-6 leading-relaxed">
              Our design atelier works with interior architects and private collectors worldwide to create custom dimensions, finishes, and bespoke room groupings.
            </p>

            <form onSubmit={handleQuoteSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={quoteForm.fullName}
                  onChange={(e) => setQuoteForm({ ...quoteForm, fullName: e.target.value })}
                  placeholder="Eleanor Vance"
                  className="w-full px-4 py-2.5 rounded-lg border border-belmo-charcoal/15 bg-white focus:outline-none focus:border-belmo-walnut"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    placeholder="eleanor@studio.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-belmo-charcoal/15 bg-white focus:outline-none focus:border-belmo-walnut"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-lg border border-belmo-charcoal/15 bg-white focus:outline-none focus:border-belmo-walnut"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                  Design Firm or Residence Location
                </label>
                <input
                  type="text"
                  value={quoteForm.companyOrDesigner}
                  onChange={(e) => setQuoteForm({ ...quoteForm, companyOrDesigner: e.target.value })}
                  placeholder="e.g. Vance Architecture NY / Tribeca Loft"
                  className="w-full px-4 py-2.5 rounded-lg border border-belmo-charcoal/15 bg-white focus:outline-none focus:border-belmo-walnut"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                  Custom Dimensional or Material Notes
                </label>
                <textarea
                  rows={3}
                  value={quoteForm.notes}
                  onChange={(e) => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                  placeholder="e.g. Inquiring about a 144-inch continuous length, custom travertine side-ledge insert, and physical swatch kit sent to our studio."
                  className="w-full px-4 py-2.5 rounded-lg border border-belmo-charcoal/15 bg-white focus:outline-none focus:border-belmo-walnut"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-belmo-charcoal/20 text-belmo-charcoal hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-belmo-charcoal text-white rounded-lg hover:bg-belmo-walnut font-medium tracking-editorial uppercase text-[11px]"
                >
                  Submit Bespoke Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CustomizePage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-belmo-charcoal">Calibrating 3D Studio...</div>}>
      <CustomizerContent />
    </Suspense>
  );
}
