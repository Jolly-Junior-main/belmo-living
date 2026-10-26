'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { MapPin, Calendar, Clock, MessageSquare, Phone, Users, Check, Sparkles } from 'lucide-react';

export default function ShowroomInquirySection() {
  const { bookAppointment } = useShop();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '14:00',
    location: 'Belmo Flagship Studio — 482 Broome St, Soho, NY',
    partySize: 2,
    projectScope: 'Living Room Architectural Curation',
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
    <section className="pt-12 sm:pt-16 pb-16 bg-belmo-cream text-belmo-charcoal select-none" id="visit-showroom">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Showroom Details & Experience */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-walnut">
                Section 09 • Flagship Sanctuary
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-belmo-charcoal tracking-tight">
                Visit <span className="font-serif italic font-light text-belmo-walnut">Belmo Living.</span>
              </h2>
              <p className="text-xs sm:text-sm text-belmo-charcoal/70 font-light leading-relaxed">
                Experience our tactile materials, monolithic stone tables, and ergonomic comfort in an unhurried, private gallery environment.
              </p>
            </div>

            {/* Studio Highlights */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-belmo-charcoal/10 shadow-sm">
                <MapPin className="w-5 h-5 text-belmo-walnut shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-belmo-charcoal">
                    Belmo Living Flagship Gallery
                  </h4>
                  <p className="text-xs text-belmo-charcoal/70 mt-0.5">
                    482 Broome Street, Soho, New York, NY 10013
                  </p>
                  <p className="text-[11px] text-belmo-walnut mt-1">
                    Valet parking arranged upon appointment confirmation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-belmo-charcoal/10 shadow-sm">
                <Clock className="w-5 h-5 text-belmo-walnut shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-belmo-charcoal">
                    Private Viewing Hours
                  </h4>
                  <p className="text-xs text-belmo-charcoal/70 mt-0.5">
                    Tuesday – Sunday: 10:00 AM – 7:00 PM EST
                  </p>
                  <p className="text-[11px] text-belmo-charcoal/50 mt-0.5">
                    Mondays reserved for private architectural firm walk-throughs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-belmo-charcoal/10 shadow-sm">
                <MessageSquare className="w-5 h-5 text-belmo-walnut shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-belmo-charcoal">
                    Direct WhatsApp Concierge
                  </h4>
                  <p className="text-xs text-belmo-charcoal/70 mt-0.5">
                    Instant spatial consultation and fabric swatch coordination.
                  </p>
                  <a
                    href="https://wa.me/18004823566?text=Hello%20Belmo%20Living,%20I%20would%20like%20to%20schedule%20a%20private%20showroom%20viewing."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-belmo-walnut font-medium mt-1 hover:underline"
                  >
                    <span>Message WhatsApp Concierge (+1 800-482-BELMO) →</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Amenities Badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-belmo-charcoal/70">
              <span className="px-3 py-1.5 rounded-full bg-belmo-ivory border border-belmo-charcoal/10">
                • 1-on-1 Senior Interior Architect
              </span>
              <span className="px-3 py-1.5 rounded-full bg-belmo-ivory border border-belmo-charcoal/10">
                • Physical Swatch Library
              </span>
              <span className="px-3 py-1.5 rounded-full bg-belmo-ivory border border-belmo-charcoal/10">
                • 3D Space Planning CAD
              </span>
            </div>
          </div>

          {/* Right: Functional Appointment Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-belmo-charcoal/10 shadow-xl" id="book-private-viewing">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-belmo-cream text-belmo-walnut mx-auto flex items-center justify-center border border-belmo-charcoal/10">
                  <Check className="w-8 h-8 stroke-[2]" />
                </div>
                <h3 className="font-serif text-2xl text-belmo-charcoal font-normal">
                  Private Viewing Confirmed
                </h3>
                <p className="text-xs sm:text-sm text-belmo-charcoal/70 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-belmo-charcoal">{formData.fullName}</span>. Your private consultation for <span className="font-semibold text-belmo-charcoal">{formData.preferredDate}</span> at <span className="font-semibold text-belmo-charcoal">{formData.preferredTime}</span> has been scheduled at our Soho Flagship Studio.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full border border-belmo-charcoal/20 text-xs tracking-editorial uppercase text-belmo-charcoal hover:bg-belmo-cream transition-colors"
                  >
                    Book Another Appointment
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl text-belmo-charcoal font-normal">
                    Reserve a Private Showroom Viewing
                  </h3>
                  <p className="text-xs text-belmo-charcoal/60 font-light">
                    Complimentary 60-minute private consultation with our master furniture design team.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold tracking-wider uppercase text-belmo-charcoal">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-4 py-3 rounded-xl border border-belmo-charcoal/15 text-xs text-belmo-charcoal placeholder:text-belmo-charcoal/30 focus:outline-none focus:border-belmo-walnut transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold tracking-wider uppercase text-belmo-charcoal">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="eleanor@studio.com"
                      className="w-full px-4 py-3 rounded-xl border border-belmo-charcoal/15 text-xs text-belmo-charcoal placeholder:text-belmo-charcoal/30 focus:outline-none focus:border-belmo-walnut transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold tracking-wider uppercase text-belmo-charcoal">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-belmo-charcoal/15 text-xs text-belmo-charcoal placeholder:text-belmo-charcoal/30 focus:outline-none focus:border-belmo-walnut transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold tracking-wider uppercase text-belmo-charcoal">
                      Guest Party Size
                    </label>
                    <select
                      value={formData.partySize}
                      onChange={(e) => setFormData({ ...formData, partySize: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-belmo-charcoal/15 text-xs text-belmo-charcoal bg-white focus:outline-none focus:border-belmo-walnut transition-colors"
                    >
                      <option value={1}>1 Guest (Solo Curation)</option>
                      <option value={2}>2 Guests (Couple / Client)</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4+ Guests (Architectural Team)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold tracking-wider uppercase text-belmo-charcoal">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-belmo-charcoal/15 text-xs text-belmo-charcoal focus:outline-none focus:border-belmo-walnut transition-colors bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold tracking-wider uppercase text-belmo-charcoal">
                      Preferred Time
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-belmo-charcoal/15 text-xs text-belmo-charcoal bg-white focus:outline-none focus:border-belmo-walnut transition-colors"
                    >
                      <option value="10:30">10:30 AM (Morning Salon)</option>
                      <option value="12:00">12:00 PM (Midday)</option>
                      <option value="14:00">02:00 PM (Afternoon Focus)</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:30">05:30 PM (Evening Twilight)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold tracking-wider uppercase text-belmo-charcoal">
                    Project Scope & Particular Pieces of Interest
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Planning a full penthouse interior; interested in testing the Solace Modular Sofa in Ivory Bouclé and inspecting travertine stone slabs..."
                    className="w-full px-4 py-3 rounded-xl border border-belmo-charcoal/15 text-xs text-belmo-charcoal placeholder:text-belmo-charcoal/30 focus:outline-none focus:border-belmo-walnut transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#e59124] to-[#f4ab3a] text-[#1a130d] text-xs font-semibold tracking-wide shadow-[0_8px_25px_rgba(229,145,36,0.35)] hover:shadow-[0_12px_32px_rgba(229,145,36,0.45)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#1a130d]" />
                    <span>{loading ? 'Confirming Appointment...' : 'Confirm Showroom Reservation'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
