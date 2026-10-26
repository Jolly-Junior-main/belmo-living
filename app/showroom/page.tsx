'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { MapPin, Clock, Phone, MessageSquare, Calendar, Check, Sparkles, Compass, Users } from 'lucide-react';

export default function ShowroomPage() {
  const { bookAppointment } = useShop();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '14:00',
    location: 'Belmo Flagship Studio — 482 Broome St, Soho, NY',
    partySize: 2,
    projectScope: 'Full Penthouse Curation',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await bookAppointment(formData);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="border-b border-belmo-charcoal/10 pb-8 mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-belmo-walnut">
            <Link href="/" className="hover:underline">Belmo Living</Link>
            <span>/</span>
            <span>Flagship Sanctuaries</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-belmo-charcoal font-normal tracking-tight">
            Our Soho Showroom
          </h1>
          <p className="text-xs md:text-sm text-belmo-charcoal/70 max-w-2xl font-light leading-relaxed">
            Located in the historic cast-iron district of Soho, New York. A 6,000 square foot architectural gallery presenting Belmo Living collections under curated natural daylight.
          </p>
        </div>

        {/* Gallery Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
          <div className="md:col-span-8 relative aspect-[16/10] rounded-3xl overflow-hidden bg-belmo-charcoal shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
              alt="Belmo Living Soho Showroom Main Gallery"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 65vw"
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 z-10 bg-belmo-charcoal/80 text-white backdrop-blur-md px-4 py-2 rounded-xl text-xs font-mono">
              Main Living Salon • Ground Floor
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="relative flex-1 min-h-[200px] rounded-3xl overflow-hidden bg-belmo-charcoal shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85"
                alt="Belmo Solace Modular Display"
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 z-10 bg-belmo-charcoal/80 text-white backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] font-mono">
                The Solace Pavilion
              </div>
            </div>

            <div className="relative flex-1 min-h-[200px] rounded-3xl overflow-hidden bg-belmo-charcoal shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85"
                alt="Material and Stone Salon"
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 z-10 bg-belmo-charcoal/80 text-white backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] font-mono">
                Travertine Stone Lab
              </div>
            </div>
          </div>
        </div>

        {/* Showroom Information & Amenities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-3xl text-belmo-charcoal font-normal">
              Visiting the Flagship
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-belmo-charcoal/80 font-light leading-relaxed">
              <p>
                We invite private clients, interior designers, and architects to explore our full physical line in an unhurried, serene salon setting.
              </p>
              <p>
                During your private appointment, a dedicated Belmo Living design curator will walk you through tactile material swatches, solid timber grain samples, and prepare custom 3D spatial arrangements tailored to your floor plan.
              </p>
            </div>

            <div className="pt-4 border-t border-belmo-charcoal/10 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-belmo-walnut shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-belmo-charcoal">Address</h4>
                  <p className="text-xs text-belmo-charcoal/70">482 Broome Street, Soho, New York, NY 10013</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-belmo-walnut shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-belmo-charcoal">Hours</h4>
                  <p className="text-xs text-belmo-charcoal/70">Tuesday – Sunday: 10:00 AM – 7:00 PM EST</p>
                  <p className="text-[11px] text-belmo-charcoal/50">Private VIP Viewings available outside hours upon request</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-belmo-walnut shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-belmo-charcoal">Direct WhatsApp</h4>
                  <a
                    href="https://wa.me/18004823566?text=Hello%20Belmo%20Living,%20I%20would%20like%20to%20inquire%20about%20a%20showroom%20appointment."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-belmo-walnut font-medium underline"
                  >
                    +1 (800) 482-BELMO (WhatsApp Concierge)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-belmo-charcoal/10 shadow-xl" id="book-private-viewing">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-belmo-cream text-belmo-walnut mx-auto flex items-center justify-center border border-belmo-charcoal/10">
                  <Check className="w-8 h-8 stroke-[2]" />
                </div>
                <h3 className="font-serif text-2xl text-belmo-charcoal font-normal">
                  Appointment Scheduled
                </h3>
                <p className="text-xs sm:text-sm text-belmo-charcoal/70 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-belmo-charcoal">{formData.fullName}</span>. Your private viewing has been reserved for <span className="font-semibold text-belmo-charcoal">{formData.preferredDate}</span> at <span className="font-semibold text-belmo-charcoal">{formData.preferredTime}</span>. Our concierge team has emailed your confirmation pass.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full border border-belmo-charcoal/20 text-xs tracking-editorial uppercase text-belmo-charcoal hover:bg-belmo-cream transition-colors"
                  >
                    Modify or Book Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="space-y-1 mb-4">
                  <span className="text-[10px] tracking-luxury uppercase text-belmo-walnut font-semibold block">
                    VIP Reservation
                  </span>
                  <h3 className="font-serif text-2xl text-belmo-charcoal font-normal">
                    Reserve a Private Showroom Salon
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Eleanor Vance"
                      className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="eleanor@studio.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                      Party Size
                    </label>
                    <select
                      value={formData.partySize}
                      onChange={(e) => setFormData({ ...formData, partySize: parseInt(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                    >
                      <option value={1}>1 Guest (Solo Curation)</option>
                      <option value={2}>2 Guests (Couple / Client)</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4+ Guests (Architectural Team)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                    >
                      <option value="11:00">11:00 AM (Morning Natural Light)</option>
                      <option value="13:30">01:30 PM (Midday)</option>
                      <option value="15:00">03:00 PM (Afternoon)</option>
                      <option value="17:00">05:00 PM (Sunset / Twilight)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                    Specific Pieces or Architectural Scope
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Inspecting the Solace modular sectional and travertine dining tables for a new residence."
                    className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-belmo-charcoal hover:bg-belmo-walnut text-white text-xs tracking-editorial uppercase font-semibold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-belmo-bronze-light" />
                    <span>{loading ? 'Reserving...' : 'Confirm Private Salon Appointment'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
