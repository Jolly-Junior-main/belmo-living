'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, RotateCcw, Building2, Check, ArrowRight } from 'lucide-react';

export default function ShippingReturnsPage() {
  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="border-b border-belmo-charcoal/10 pb-8 mb-12 space-y-2 text-center">
          <span className="text-[10px] font-mono tracking-widest uppercase text-belmo-walnut">
            Logistics & Client Protection
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-belmo-charcoal font-normal tracking-tight">
            White-Glove Delivery & Returns
          </h1>
          <p className="text-xs sm:text-sm text-belmo-charcoal/70 font-light max-w-lg mx-auto">
            Comprehensive details on our premier two-person in-home installation, transit timelines, building insurance, and 30-day trial.
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1: White Glove */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-belmo-charcoal/10 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-belmo-cream flex items-center justify-center text-belmo-walnut border border-belmo-charcoal/10">
                <Truck className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-belmo-charcoal font-normal">
                Premier White-Glove In-Home Service
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-belmo-charcoal/80 font-light leading-relaxed">
              <p>
                Unlike standard curb-drop freight services, Belmo Living furniture is delivered exclusively via professional two-person art and furniture logistics handlers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-belmo-cream/50 border border-belmo-charcoal/10 space-y-1">
                  <h4 className="font-semibold text-belmo-charcoal uppercase tracking-wider text-[11px]">
                    Room of Choice Placement
                  </h4>
                  <p className="text-xs text-belmo-charcoal/70">
                    Hand-carried up stairs or service elevators directly into your desired living room, bedroom, or terrace salon.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-belmo-cream/50 border border-belmo-charcoal/10 space-y-1">
                  <h4 className="font-semibold text-belmo-charcoal uppercase tracking-wider text-[11px]">
                    Complete Assembly & Leveling
                  </h4>
                  <p className="text-xs text-belmo-charcoal/70">
                    Precision mounting of modular sofa brackets, timber legs, and stone table pedestals with micro-leveling adjustments.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-belmo-cream/50 border border-belmo-charcoal/10 space-y-1">
                  <h4 className="font-semibold text-belmo-charcoal uppercase tracking-wider text-[11px]">
                    Zero-Waste Debris Removal
                  </h4>
                  <p className="text-xs text-belmo-charcoal/70">
                    All custom wooden crating, bubble wraps, and corner guards are loaded back into our truck for sustainable recycling.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-belmo-cream/50 border border-belmo-charcoal/10 space-y-1">
                  <h4 className="font-semibold text-belmo-charcoal uppercase tracking-wider text-[11px]">
                    Building COI Coordination
                  </h4>
                  <p className="text-xs text-belmo-charcoal/70">
                    We generate and transmit custom certificates of insurance directly to your building management office 48 hours prior to arrival.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Timelines */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-belmo-charcoal/10 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-belmo-cream flex items-center justify-center text-belmo-walnut border border-belmo-charcoal/10">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-belmo-charcoal font-normal">
                Transit & Delivery Timelines
              </h2>
            </div>

            <div className="divide-y divide-belmo-charcoal/10 text-xs sm:text-sm">
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-belmo-charcoal">In-Stock Catalog Pieces</span>
                <span className="text-belmo-walnut font-medium">Ships in 48-72 Hours (Delivered in 5-8 business days)</span>
              </div>
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-belmo-charcoal">Custom Textile & Finish Commissions</span>
                <span className="text-belmo-walnut font-medium">Handcrafted in 3-5 Weeks (White-glove booked upon completion)</span>
              </div>
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-belmo-charcoal">Monolithic Quarried Travertine Stone</span>
                <span className="text-belmo-walnut font-medium">4-6 Weeks (Quarry extraction, precision honing & curing)</span>
              </div>
            </div>
          </div>

          {/* Section 3: Returns */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-belmo-charcoal/10 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-belmo-cream flex items-center justify-center text-belmo-walnut border border-belmo-charcoal/10">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-belmo-charcoal font-normal">
                30-Day In-Home Trial & Return Policy
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-belmo-charcoal/80 font-light leading-relaxed">
              <p>
                We understand that experiencing furniture in your home’s unique natural light is essential. If a piece does not feel harmonious with your interior, you may request a return within 30 days of white-glove delivery.
              </p>
              <p>
                Returned pieces must be in pristine, unaltered condition. Our white-glove team will arrive to carefully pack and retrieve the furniture. Refunds are processed back to your original payment method less a standard return transit logistics fee of $350.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
