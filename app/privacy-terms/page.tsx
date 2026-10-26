'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PrivacyTermsPage() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="border-b border-belmo-charcoal/10 pb-8 mb-12 space-y-2 text-center">
          <span className="text-[10px] font-mono tracking-widest uppercase text-belmo-walnut">
            Legal & Governance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-belmo-charcoal font-normal tracking-tight">
            Privacy Policy & Terms
          </h1>
          <p className="text-xs sm:text-sm text-belmo-charcoal/70 font-light">
            Effective Date: October 2026 • Belmo Living Legal Standards
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-6 py-2.5 rounded-full text-xs tracking-editorial uppercase transition-all font-semibold ${
              activeTab === 'privacy'
                ? 'bg-belmo-charcoal text-white shadow-md'
                : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-6 py-2.5 rounded-full text-xs tracking-editorial uppercase transition-all font-semibold ${
              activeTab === 'terms'
                ? 'bg-belmo-charcoal text-white shadow-md'
                : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
            }`}
          >
            Terms of Service & Warranty
          </button>
        </div>

        {/* Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-belmo-charcoal/10 shadow-sm space-y-8 text-xs sm:text-sm text-belmo-charcoal/80 font-light leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-belmo-charcoal font-normal">
                1. Commitment to Client Discretion
              </h2>
              <p>
                Belmo Living operates under strict confidentiality protocols. We recognize that our furniture is commissioned for private residences, executive suites, and high-profile architectural projects. We never sell, rent, or publicly disclose client lists, residential addresses, or custom spatial specifications.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-belmo-charcoal font-normal">
                2. Data Collection & Usage
              </h2>
              <p>
                We collect personal information necessary to facilitate showroom viewings, bespoke quotation generation, digital order fulfillment, and white-glove inside delivery logistics. This includes your name, email, telephone number, and residential delivery address.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-belmo-charcoal font-normal">
                3. Payment Security & Encryption
              </h2>
              <p>
                All electronic transactions conducted on Belmo Living platforms are encrypted using TLS 1.3 protocol with 256-bit encryption. Card payment data is tokenized directly via verified banking gateways and is never stored on Belmo Living servers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-belmo-charcoal font-normal">
                4. Your Rights
              </h2>
              <p>
                You may request access to, correction of, or deletion of your personal account data at any time by contacting privacy@belmoliving.com.
              </p>
            </section>
          </div>
        )}

        {/* Terms of Service */}
        {activeTab === 'terms' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-belmo-charcoal/10 shadow-sm space-y-8 text-xs sm:text-sm text-belmo-charcoal/80 font-light leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-belmo-charcoal font-normal">
                1. Scope of Agreement
              </h2>
              <p>
                These Terms of Service govern all commissions, purchases, and showroom services provided by Belmo Living. By commissioning a piece or placing an order, you agree to be bound by these standards.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-belmo-charcoal font-normal">
                2. Natural Material Variations
              </h2>
              <p>
                Belmo Living furniture is handcrafted from genuine geological stone (Roman travertine, marble) and solid kiln-dried hardwoods (American walnut, white oak). Natural mineral fissures, grain variations, and organic tone differences are intrinsic markers of authentic craft and are not considered defects.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-belmo-charcoal font-normal">
                3. 10-Year Master Frame Guarantee
              </h2>
              <p>
                Belmo Living warrants internal solid timber sub-chassis, mortise-and-tenon structural joints, and German steel brackets against structural defect for ten (10) years from delivery date. This guarantee covers normal residential usage and excludes abuse or improper chemical treatment.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-belmo-charcoal font-normal">
                4. Intellectual Property
              </h2>
              <p>
                All furniture designs, profiles, names (including the Solace Modular Sofa, Elysian Lounge Chair, and Monolith Table), website animations, frame sequences, and digital customizer interfaces are proprietary intellectual property of Belmo Living.
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
