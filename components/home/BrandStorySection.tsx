'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, ShieldCheck, TreePine, Sparkles } from 'lucide-react';

export default function BrandStorySection() {
  return (
    <section className="pt-12 sm:pt-16 pb-16 bg-belmo-ivory text-belmo-charcoal select-none border-b border-belmo-charcoal/10" id="brand-story">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-walnut">
                Section 08 • Design Philosophy & Values
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-belmo-charcoal tracking-tight leading-[1.15]">
                The Belmo Living <span className="font-serif italic font-light text-belmo-walnut">Ethos.</span>
              </h2>
              <p className="font-serif text-lg text-belmo-walnut italic">
                &ldquo;Designed for Living. Crafted for Life.&rdquo;
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-belmo-charcoal/80 font-light leading-relaxed">
              <p>
                Belmo Living was established with a singular clarity: to strip furniture design of ephemeral ornamentation and build structural centerpieces of quiet, monolithic permanence.
              </p>
              <p>
                We do not believe in disposable seasonal trends. True luxury is tactile, calm, and enduring. It lives in the weight of solid Appalachian walnut, the tectonic fissures of Italian travertine, and the unhurried contour of natural bouclé woven by master European mills.
              </p>
              <p>
                Every silhouette is engineered with architectural rigor, ensuring balanced visual lightness in open spaces alongside an uncompromising standard of generational longevity.
              </p>
            </div>

            {/* Core Values Matrix */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-belmo-charcoal/10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-belmo-walnut">
                  <TreePine className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Forest Stewardship
                  </span>
                </div>
                <p className="text-[11px] text-belmo-charcoal/60 leading-relaxed">
                  100% sustainably harvested FSC® certified Appalachian hardwoods and non-toxic plant-based finishes.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-belmo-walnut">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Generational Build
                  </span>
                </div>
                <p className="text-[11px] text-belmo-charcoal/60 leading-relaxed">
                  Precision mortise-and-tenon structural joints backed by our 10-year master atelier frame guarantee.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#e59124] to-[#f4ab3a] text-[#1a130d] font-semibold text-xs tracking-wide rounded-full shadow-[0_8px_25px_rgba(229,145,36,0.35)] hover:scale-105 transition-all"
              >
                <span>Read Full Atelier Manifesto</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#1a130d]" />
              </Link>
            </div>
          </div>

          {/* Right Dual Architectural Visuals */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6 relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-belmo-beige/40 shadow-lg mt-8">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
                alt="Belmo Living Timber Workshop and Leather Craft"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover"
              />
            </div>

            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-belmo-beige/40 shadow-xl -mt-4">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Belmo Living Architectural Living Space"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover"
              />
            </div>

            {/* Decorative Floating Seal */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-belmo-charcoal text-white rounded-2xl p-4 shadow-2xl border border-belmo-gold/30 flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-belmo-gold/60 p-0.5 bg-belmo-charcoal">
                <Image
                  src="/images/logo-circle.png"
                  alt="Belmo Living Crest"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] tracking-luxury uppercase font-semibold text-belmo-gold block">
                  Belmo Living Master Atelier
                </span>
                <span className="text-[11px] text-belmo-beige/80">
                  Custom Handcrafted in USA & Northern Italy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
