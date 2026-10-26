'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Layers, ShieldCheck, Sparkles, Hammer, Check } from 'lucide-react';

interface CraftPillar {
  id: string;
  name: string;
  headline: string;
  description: string;
  image: string;
  details: string[];
  specs: { label: string; value: string }[];
}

const PILLARS: CraftPillar[] = [
  {
    id: 'timber',
    name: 'Solid Timber Joinery',
    headline: 'Kiln-Dried Appalachian Walnut & White Oak',
    description: 'We reject veneers and particleboards for structural cores. Every Belmo Living frame is crafted from certified solid Appalachian hardwoods, aged naturally and kiln-dried to an exact 7% moisture equilibrium.',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1400&q=85',
    details: [
      'Mortise-and-tenon interlocking corner blocks glued and pinned by hand',
      'Continuous bookmatched grain flow across desk tops and dining surfaces',
      'Hand-rubbed organic beeswax and cold-pressed linseed oil satin finish',
      'Certified FSC® sustainable forest provenance with full chain-of-custody'
    ],
    specs: [
      { label: 'Moisture Stability', value: '7.2% Calibrated' },
      { label: 'Structural Guarantee', value: '10-Year Master Frame' },
      { label: 'Forest Stewardship', value: '100% FSC® Certified' }
    ]
  },
  {
    id: 'textiles',
    name: 'Artisanal Textiles',
    headline: 'Tactile Italian Bouclé & Vegetable-Tanned Leathers',
    description: 'Woven in historic mills across Biella, Italy, our textured textiles balance soft organic tactility with commercial-grade 100,000 Martindale rub endurance. Double French piping and blind tufting prevent bunching over decades of daily rest.',
    image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1400&q=85',
    details: [
      '480 g/m² high-density bouclé woven from virgin wool and organic cotton',
      'Full-grain Scandinavian aniline leathers that develop rich golden patinas',
      'Treated with breathable non-fluorochemical shield against liquid spills',
      'OEKO-TEX® Standard 100 certified free from harmful chemical dyes'
    ],
    specs: [
      { label: 'Martindale Rubs', value: '100,000 Heavy Commercial' },
      { label: 'Origin', value: 'Biella, Northern Italy' },
      { label: 'Certification', value: 'OEKO-TEX® Standard 100' }
    ]
  },
  {
    id: 'stone',
    name: 'Geological Stone',
    headline: 'Quarried Tivoli Travertine & Calacatta Slabs',
    description: 'Carved from monolithic stone quarries in Tivoli, Italy. We celebrate natural voids and subterranean mineral formations, preserving tectonic character while applying breathable microscopic quartz seals.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
    details: [
      'Single-block quarry extraction ensuring cohesive crystalline flow',
      'Satin-honed tactile finish silky to fingertips without plastic gloss',
      'Internal carbon-steel tension rods counteracting seismic shear',
      'Unfilled natural fissures along vertical pillar flanks'
    ],
    specs: [
      { label: 'Extraction Origin', value: 'Tivoli Quarry, Rome' },
      { label: 'Surface Finish', value: 'Satin-Honed Silicate Seal' },
      { label: 'Density', value: '2,650 kg/m³' }
    ]
  },
  {
    id: 'ergonomics',
    name: 'Cushion Architecture',
    headline: 'Multi-Density Organic Memory & Down Baffle Layers',
    description: 'Instantaneous body contouring without the sinkhole sag of synthetic cushions. A high-resilience organic latex core is cradled in an independently channeled goose down duvet envelope.',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1400&q=85',
    details: [
      'Four internal chamber tiers preventing down feathers from migrating',
      'Hypoallergenic washed European down certified to Responsible Down Standard',
      'Organic natural Dunlop latex core offering resilient spring-back response',
      'Breathable inner ticking allowing rapid air dissipation upon sitting'
    ],
    specs: [
      { label: 'Core Material', value: 'Organic Dunlop Latex' },
      { label: 'Topper Envelope', value: 'RDS-Certified Down' },
      { label: 'Sag Tolerance', value: '< 2mm over 100k cycles' }
    ]
  }
];

export default function CraftsmanshipSection() {
  const [activeTab, setActiveTab] = useState(PILLARS[0].id);

  const activePillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <section className="pt-12 sm:pt-16 pb-16 bg-[#faf9f7] text-belmo-charcoal select-none border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <span className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-walnut">
            Section 05 • Material Philosophy
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight">
            Crafted With <span className="font-serif italic font-light text-belmo-walnut">Purpose.</span>
          </h2>
          <p className="text-xs md:text-sm text-belmo-charcoal/70 font-light leading-relaxed">
            Every millimeter is an intentional dialogue between architectural precision and unforced raw nature. We build furniture meant to be handed down through generations.
          </p>
        </div>

        {/* Tab Buttons (Pill Format) */}
        <div className="flex overflow-x-auto gap-3 pb-6 mb-12 border-b border-black/5 no-scrollbar">
          {PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setActiveTab(pillar.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 shrink-0 ${
                activeTab === pillar.id
                  ? 'bg-[#20201e] text-white shadow-md'
                  : 'bg-white/80 hover:bg-white text-belmo-charcoal/80 border border-black/5 shadow-sm'
              }`}
            >
              {pillar.name}
            </button>
          ))}
        </div>

        {/* Content Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Container */}
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-3xl overflow-hidden bg-white/50 border border-black/5 shadow-xl group">
            <Image
              src={activePillar.image}
              alt={activePillar.headline}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Floating Spec Pill */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-black/5 shadow-lg flex flex-wrap items-center justify-between gap-4">
              {activePillar.specs.map((sp) => (
                <div key={sp.label} className="text-left">
                  <span className="block text-[10px] tracking-wider uppercase text-belmo-walnut font-medium">
                    {sp.label}
                  </span>
                  <span className="text-xs font-semibold text-[#1a1a1a]">
                    {sp.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Narrative Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-belmo-walnut font-semibold">
                {activePillar.name}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] font-normal leading-snug">
                {activePillar.headline}
              </h3>
              <p className="text-xs md:text-sm text-belmo-charcoal/75 leading-relaxed font-light">
                {activePillar.description}
              </p>
            </div>

            {/* Craft Bullets */}
            <div className="space-y-3 pt-2">
              {activePillar.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#e59124]/10 text-[#e59124] flex items-center justify-center shrink-0 mt-0.5 border border-[#e59124]/30">
                    <Check className="w-3 h-3" />
                  </div>
                  <p className="text-xs text-belmo-charcoal/80 leading-relaxed font-light">
                    {detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-black/5 flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-belmo-charcoal/70">
                <ShieldCheck className="w-4 h-4 text-[#e59124]" />
                <span>Zero Compromise Material Standard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
