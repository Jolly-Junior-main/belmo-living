'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, TreePine, Sparkles, Compass, ArrowRight, Check } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Editorial Hero */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-20 flex flex-col items-center">
          <div className="relative w-24 h-24 rounded-full ring-2 ring-belmo-gold/60 p-1.5 bg-belmo-charcoal shadow-xl mb-2">
            <Image
              src="/images/logo-circle.png"
              alt="Belmo Living Crest"
              fill
              className="object-contain p-1"
            />
          </div>
          <span className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-walnut">
            Atelier Manifesto
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-belmo-charcoal tracking-tight leading-[1.1]">
            Designed for Living. <br />
            Crafted for Life.
          </h1>
          <p className="text-sm sm:text-base text-belmo-charcoal/70 font-light max-w-2xl mx-auto leading-relaxed pt-2">
            Belmo Living is an architectural furniture atelier committed to the honest relationship between natural materials, structural stillness, and everyday human ritual.
          </p>
        </div>

        {/* Large Panoramic Editorial Photograph */}
        <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full rounded-3xl overflow-hidden shadow-2xl mb-24 bg-belmo-charcoal">
          <Image
            src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=2400&q=85"
            alt="Belmo Living Master King Bed Sanctuary"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white flex items-end justify-between">
            <span className="text-xs font-mono tracking-widest uppercase text-belmo-bronze-light">
              Belmo Living • Architectural Dialogue
            </span>
            <span className="text-xs text-white/80 hidden sm:block">
              Photographed in the Master Sanctuary
            </span>
          </div>
        </div>

        {/* Core Narrative Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          <div className="lg:col-span-5 space-y-4 sticky top-32">
            <span className="text-[10px] font-mono tracking-widest uppercase text-belmo-walnut">
              01 / THE CONVICTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-belmo-charcoal font-normal leading-tight">
              A Rejection of the Disposable.
            </h2>
            <p className="font-serif text-lg text-belmo-walnut italic">
              Furniture should outlast the architecture that contains it.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm text-belmo-charcoal/80 font-light leading-relaxed">
            <p>
              Contemporary domestic environments are often filled with furniture designed for rapid consumption and planned obsolescence. Synthetic composites, paper veneers, and hurried assembly create spaces that deteriorate before memories can take root.
            </p>
            <p>
              At Belmo Living, we approach every collection with an architectural standard of permanence. We view a sofa, a dining table, or a low-slung platform bed as a spatial anchor—a monolithic sanctuary that brings quiet focus to everyday life.
            </p>
            <p>
              Our craftsmen partner directly with sustainably managed Appalachian hardwood forests, historic stone quarries in Tivoli, and heritage textile looms in Biella, Italy. We refuse shortcuts: traditional mortise-and-tenon joinery, multi-density organic latex cores, and non-toxic cold-pressed plant finishes are our unshakeable baseline.
            </p>
          </div>
        </div>

        {/* Material Principles 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white rounded-3xl p-8 border border-belmo-charcoal/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-belmo-cream flex items-center justify-center text-belmo-walnut border border-belmo-charcoal/10">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-belmo-charcoal font-normal">
              100% Certified Hardwoods
            </h3>
            <p className="text-xs text-belmo-charcoal/70 leading-relaxed font-light">
              Every timber member is solid FSC®-certified black walnut or white oak, kiln-dried to calibrated moisture levels to prevent warping across decades.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-belmo-charcoal/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-belmo-cream flex items-center justify-center text-belmo-walnut border border-belmo-charcoal/10">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-belmo-charcoal font-normal">
              Heritage Weaving
            </h3>
            <p className="text-xs text-belmo-charcoal/70 leading-relaxed font-light">
              Our 480 g/m² tactile bouclé and full-grain aniline leathers are certified OEKO-TEX® Standard 100, free from formaldehyde and harmful chemical dyes.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-belmo-charcoal/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-belmo-cream flex items-center justify-center text-belmo-walnut border border-belmo-charcoal/10">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-belmo-charcoal font-normal">
              10-Year Master Guarantee
            </h3>
            <p className="text-xs text-belmo-charcoal/70 leading-relaxed font-light">
              We stand behind every internal frame, joint, and structural weld with a full 10-year warranty, accompanied by lifetime refurbishment support.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-belmo-charcoal text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
            Experience Belmo Living in Person.
          </h2>
          <p className="text-xs sm:text-sm text-belmo-beige/80 max-w-lg mx-auto font-light leading-relaxed">
            We welcome you to visit our Soho Flagship Studio for a private material consultation with our master architects.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/showroom#book-private-viewing"
              className="px-8 py-3.5 bg-belmo-bronze hover:bg-belmo-bronze-light text-white text-xs tracking-editorial uppercase font-semibold rounded-full transition-all duration-300 shadow-lg"
            >
              Book Private Viewing
            </Link>
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs tracking-editorial uppercase font-medium rounded-full border border-white/20 transition-all duration-300"
            >
              Explore Furniture Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
