'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Mail, Phone, MapPin, MessageSquare, Check, Sparkles, Send } from 'lucide-react';

export default function ContactPage() {
  const { addToast } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bespoke Residential Commission',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Inquiry Transmitted', 'Thank you for reaching out to Belmo Living. Our design concierge will reply within one business day.');
  };

  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="border-b border-belmo-charcoal/10 pb-8 mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-belmo-walnut">
            <Link href="/" className="hover:underline">Belmo Living</Link>
            <span>/</span>
            <span>Concierge & Support</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-belmo-charcoal font-normal tracking-tight">
            Contact Belmo Living
          </h1>
          <p className="text-xs md:text-sm text-belmo-charcoal/70 max-w-2xl font-light leading-relaxed">
            Our atelier concierge is at your service for product inquiries, spatial layout guidance, custom timber finishes, and white-glove logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-belmo-charcoal font-normal">
                Direct Atelier Channels
              </h2>
              <p className="text-xs sm:text-sm text-belmo-charcoal/70 font-light leading-relaxed">
                Connect with our New York studio directly by telephone, verified WhatsApp, or email.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-belmo-charcoal/10 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-belmo-walnut text-xs font-semibold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Flagship Atelier & Gallery</span>
                </div>
                <p className="text-xs text-belmo-charcoal/80 pt-1">
                  482 Broome Street, Soho, New York, NY 10013
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-belmo-charcoal/10 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-belmo-walnut text-xs font-semibold uppercase tracking-wider">
                  <Phone className="w-4 h-4" />
                  <span>Telephone Concierge</span>
                </div>
                <p className="text-xs text-belmo-charcoal/80 pt-1">
                  +1 (800) 482-BELMO (Toll Free USA & Canada)
                </p>
                <p className="text-[11px] text-belmo-charcoal/50">
                  Monday – Saturday: 9:00 AM – 8:00 PM EST
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-belmo-charcoal/10 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-belmo-walnut text-xs font-semibold uppercase tracking-wider">
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </div>
                <p className="text-xs text-belmo-charcoal/80 pt-1">
                  Immediate responses for swatch photos and custom dimensions.
                </p>
                <a
                  href="https://wa.me/18004823566?text=Hello%20Belmo%20Living,%20I%20have%20an%20inquiry%20regarding%20your%20furniture%20collection."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-belmo-walnut font-medium underline inline-block pt-1"
                >
                  Start WhatsApp Conversation →
                </a>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-belmo-charcoal/10 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-belmo-cream text-belmo-walnut mx-auto flex items-center justify-center border border-belmo-charcoal/10">
                  <Check className="w-8 h-8 stroke-[2]" />
                </div>
                <h3 className="font-serif text-2xl text-belmo-charcoal font-normal">
                  Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-belmo-charcoal/70 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Belmo Living. A senior design associate has received your dispatch and will reply shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full border border-belmo-charcoal/20 text-xs tracking-editorial uppercase text-belmo-charcoal hover:bg-belmo-cream transition-colors"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="space-y-1 mb-4">
                  <span className="text-[10px] tracking-luxury uppercase text-belmo-walnut font-semibold block">
                    Direct Inquiry
                  </span>
                  <h3 className="font-serif text-2xl text-belmo-charcoal font-normal">
                    Transmit a Message to the Atelier
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
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                    >
                      <option value="Bespoke Residential Commission">Bespoke Residential Commission</option>
                      <option value="Architect & Trade Program">Architect & Trade Program</option>
                      <option value="Material Swatch Kit Request">Material Swatch Kit Request</option>
                      <option value="Order Status & White-Glove Tracking">Order Status & White-Glove Tracking</option>
                      <option value="Press & Media Inquiries">Press & Media Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your space, dimensions, or specific questions..."
                    className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-belmo-charcoal hover:bg-belmo-walnut text-white text-xs tracking-editorial uppercase font-semibold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-belmo-bronze-light" />
                    <span>Send Message to Belmo Living</span>
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
