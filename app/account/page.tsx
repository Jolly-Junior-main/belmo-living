'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  Package,
  Calendar,
  Sliders,
  Heart,
  User,
  MapPin,
  Clock,
  Truck,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function AccountPage() {
  const { orders, appointments, quotes, wishlist } = useShop();
  const [activeTab, setActiveTab] = useState<'orders' | 'appointments' | 'quotes' | 'profile'>('orders');

  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="border-b border-belmo-charcoal/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-belmo-walnut">
              Client Concierge
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-belmo-charcoal font-normal">
              Private Client Society
            </h1>
            <p className="text-xs sm:text-sm text-belmo-charcoal/70 font-light">
              Manage your active commissions, scheduled showroom appointments, and bespoke quotes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              className="px-5 py-2.5 bg-belmo-charcoal text-white text-xs tracking-editorial uppercase rounded-full hover:bg-belmo-walnut transition-colors font-semibold shadow-sm"
            >
              Browse Collections
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-belmo-charcoal/10 pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-full text-xs tracking-editorial uppercase transition-all shrink-0 font-medium ${
              activeTab === 'orders'
                ? 'bg-belmo-charcoal text-white shadow-md'
                : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
            }`}
          >
            Commissions & Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-5 py-2.5 rounded-full text-xs tracking-editorial uppercase transition-all shrink-0 font-medium ${
              activeTab === 'appointments'
                ? 'bg-belmo-charcoal text-white shadow-md'
                : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
            }`}
          >
            Showroom Viewings ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-5 py-2.5 rounded-full text-xs tracking-editorial uppercase transition-all shrink-0 font-medium ${
              activeTab === 'quotes'
                ? 'bg-belmo-charcoal text-white shadow-md'
                : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
            }`}
          >
            Custom Quotes ({quotes.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 rounded-full text-xs tracking-editorial uppercase transition-all shrink-0 font-medium ${
              activeTab === 'profile'
                ? 'bg-belmo-charcoal text-white shadow-md'
                : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
            }`}
          >
            Client Profile
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-belmo-charcoal/10 space-y-4">
                <Package className="w-12 h-12 text-belmo-walnut mx-auto stroke-[1.2]" />
                <h3 className="font-serif text-xl text-belmo-charcoal">No Active Commissions</h3>
                <p className="text-xs text-belmo-charcoal/60 max-w-sm mx-auto">
                  You have not placed any orders yet. Discover our architectural seating and stone centerpieces.
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-6 py-2.5 bg-belmo-charcoal text-white text-xs tracking-editorial uppercase rounded-md hover:bg-belmo-walnut transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-belmo-charcoal/10 shadow-sm space-y-6"
                >
                  {/* Top order summary */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-belmo-charcoal/10 pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-base font-bold text-belmo-charcoal">
                          Order {ord.orderNumber}
                        </span>
                        <span className="px-3 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase bg-belmo-cream text-belmo-walnut border border-belmo-charcoal/10">
                          {ord.orderStatus}
                        </span>
                      </div>
                      <p className="text-xs text-belmo-charcoal/60 mt-1">
                        Commission Placed: {formatDate(ord.createdAt)} • Recipient: {ord.customer.firstName} {ord.customer.lastName}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-belmo-charcoal/60 block">Total Investment</span>
                      <span className="font-serif text-xl font-medium text-belmo-charcoal">
                        {formatPrice(ord.total)}
                      </span>
                    </div>
                  </div>

                  {/* Tracking & Logistics HUD */}
                  <div className="p-4 rounded-2xl bg-belmo-cream/50 border border-belmo-charcoal/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-belmo-walnut shrink-0" />
                      <div>
                        <span className="font-semibold text-belmo-charcoal block">
                          {ord.fulfillmentType}
                        </span>
                        <span className="text-[11px] text-belmo-charcoal/60">
                          Tracking Identifier: {ord.trackingNumber || 'Pending Schedule'}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-semibold">
                      Payment {ord.paymentStatus} via {ord.paymentMethod}
                    </span>
                  </div>

                  {/* Items list */}
                  <div className="space-y-3 pt-1">
                    <h4 className="text-[11px] font-semibold tracking-wider uppercase text-belmo-charcoal">
                      Commissioned Items ({ord.items.length})
                    </h4>
                    <div className="divide-y divide-belmo-charcoal/10">
                      {ord.items.map((it) => (
                        <div key={it.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-mono text-belmo-walnut font-semibold">{it.quantity}x</span>
                            <span className="font-serif text-sm font-medium text-belmo-charcoal truncate">
                              {it.productName}
                            </span>
                            {it.variantName && (
                              <span className="text-belmo-charcoal/60 hidden sm:inline truncate text-[11px]">
                                ({it.variantName})
                              </span>
                            )}
                          </div>
                          <span className="font-medium text-belmo-charcoal shrink-0">
                            {formatPrice(it.price * it.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Showroom Appointments */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            {appointments.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-belmo-charcoal/10 space-y-4">
                <Calendar className="w-12 h-12 text-belmo-walnut mx-auto stroke-[1.2]" />
                <h3 className="font-serif text-xl text-belmo-charcoal">No Appointments Scheduled</h3>
                <p className="text-xs text-belmo-charcoal/60 max-w-sm mx-auto">
                  Reserve a private 60-minute consultation at our Soho Flagship Studio with our master interior architect.
                </p>
                <Link
                  href="/showroom#book-private-viewing"
                  className="inline-block px-6 py-2.5 bg-belmo-charcoal text-white text-xs tracking-editorial uppercase rounded-md hover:bg-belmo-walnut transition-colors"
                >
                  Book Private Viewing
                </Link>
              </div>
            ) : (
              appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-belmo-charcoal/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xl font-medium text-belmo-charcoal">
                        Showroom Salon Viewing
                      </span>
                      <span className="px-3 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-emerald-50 text-emerald-700">
                        {apt.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-belmo-charcoal/70">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-belmo-walnut" />
                        <span>Date: {apt.preferredDate} at {apt.preferredTime}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-belmo-walnut" />
                        <span>{apt.location}</span>
                      </p>
                      <p className="text-[11px] text-belmo-charcoal/60">
                        Party Size: {apt.partySize} Guest(s) • Scope: {apt.projectScope}
                      </p>
                      {apt.notes && (
                        <p className="italic text-[11px] text-belmo-charcoal/60 pt-1">
                          &ldquo;{apt.notes}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href="https://wa.me/18004823566?text=Hello%20Belmo%20Living,%20I%20have%20a%20question%20about%20my%20upcoming%20showroom%20viewing."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-belmo-charcoal/20 hover:bg-belmo-cream text-belmo-charcoal text-xs tracking-wider uppercase rounded-xl transition-colors"
                    >
                      WhatsApp Concierge
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Custom Quotes */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            {quotes.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-belmo-charcoal/10 space-y-4">
                <Sliders className="w-12 h-12 text-belmo-walnut mx-auto stroke-[1.2]" />
                <h3 className="font-serif text-xl text-belmo-charcoal">No Bespoke Quotes Submitted</h3>
                <p className="text-xs text-belmo-charcoal/60 max-w-sm mx-auto">
                  Configure custom proportions and finishes using our interactive 3D atelier workbench.
                </p>
                <Link
                  href="/customize"
                  className="inline-block px-6 py-2.5 bg-belmo-charcoal text-white text-xs tracking-editorial uppercase rounded-md hover:bg-belmo-walnut transition-colors"
                >
                  Open Customizer Studio
                </Link>
              </div>
            ) : (
              quotes.map((q) => (
                <div
                  key={q.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-belmo-charcoal/10 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-belmo-charcoal/10 pb-4">
                    <div>
                      <h4 className="font-serif text-lg font-medium text-belmo-charcoal">
                        Custom {q.spec.baseProductName} ({q.spec.configuration})
                      </h4>
                      <p className="text-xs text-belmo-charcoal/60">
                        Submitted: {formatDate(q.createdAt)} • Request ID: {q.id}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase bg-belmo-cream text-belmo-walnut border border-belmo-charcoal/10">
                      Status: {q.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-belmo-ivory p-4 rounded-2xl">
                    <div>
                      <span className="text-[10px] uppercase text-belmo-walnut block">Textile</span>
                      <span className="font-medium text-belmo-charcoal">{q.spec.fabricName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-belmo-walnut block">Hardwood</span>
                      <span className="font-medium text-belmo-charcoal">{q.spec.woodFinishName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-belmo-walnut block">Hardware</span>
                      <span className="font-medium text-belmo-charcoal">{q.spec.hardwareName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-belmo-walnut block">Estimated Price</span>
                      <span className="font-semibold text-belmo-charcoal">{formatPrice(q.spec.estimatedPrice)}</span>
                    </div>
                  </div>

                  {q.spec.customNotes && (
                    <p className="text-xs text-belmo-charcoal/70 italic">
                      Notes: &ldquo;{q.spec.customNotes}&rdquo;
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: Profile Details */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-belmo-charcoal/10 shadow-sm max-w-2xl space-y-6">
            <h3 className="font-serif text-2xl text-belmo-charcoal font-normal">
              Client Profile & Preferences
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-belmo-cream/50 border border-belmo-charcoal/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-belmo-walnut block">Membership Tier</span>
                  <span className="font-serif text-base font-medium text-belmo-charcoal">Private Atelier Society</span>
                </div>
                <Sparkles className="w-5 h-5 text-belmo-walnut" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-belmo-charcoal/60 font-semibold block">
                  Design Preferences
                </span>
                <p className="text-xs text-belmo-charcoal/80">
                  Preferred Architectural Finish: American Walnut & Honed Roman Travertine
                </p>
                <p className="text-xs text-belmo-charcoal/80">
                  Textile Sensitivity: Natural Hypoallergenic Down & Biella Wool Bouclé
                </p>
              </div>

              <div className="pt-4 border-t border-belmo-charcoal/10 flex items-center gap-2 text-belmo-walnut">
                <ShieldCheck className="w-4 h-4" />
                <span>Protected under Belmo Living strict privacy and non-disclosure standards.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
