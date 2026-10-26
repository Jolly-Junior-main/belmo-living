'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { ArrowRight, Mail, MapPin, Phone, MessageSquare, ShieldCheck, TreePine, Sparkles } from 'lucide-react';

export default function Footer() {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    addToast('Welcome to Belmo Living Private Society', 'Thank you. You will receive private collection previews and architectural lookbooks.');
    setEmail('');
  };

  return (
    <footer className="bg-belmo-charcoal text-belmo-ivory pt-20 pb-12 border-t border-belmo-bronze/20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-semibold tracking-luxury uppercase text-belmo-gold">
              The Belmo Living Journal & Previews
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-white font-normal leading-snug">
              Quiet Elegance, Delivered to Your Inbox.
            </h3>
            <p className="text-xs text-belmo-beige/70 leading-relaxed max-w-md font-light">
              Receive private invitations to seasonal capsule releases, architectural case studies, and VIP showroom private viewings.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-white/5 border border-belmo-gold/30 flex items-center gap-3 text-belmo-gold">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs tracking-wide">
                  Your VIP membership is confirmed. Welcome to Belmo Living.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email for private salon access..."
                    className="w-full pl-11 pr-4 py-3.5 bg-white/5 rounded-xl border border-white/10 text-white placeholder:text-white/40 text-xs focus:outline-none focus:border-belmo-gold transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-belmo-bronze hover:bg-belmo-bronze-light text-white text-xs tracking-editorial uppercase rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 font-medium shadow-lg"
                >
                  <span className="text-belmo-gold-light">Request Membership</span>
                  <ArrowRight className="w-3.5 h-3.5 text-belmo-gold" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-white/40 mt-2">
              By subscribing, you agree to Belmo Living privacy standards. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Links Navigation Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-16 border-b border-white/10 text-xs">
          {/* Col 1: Brand & Logo */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-lg ring-2 ring-belmo-gold/50 group-hover:scale-105 transition-transform shrink-0">
                <Image src="/images/logo-circle.png" alt="Belmo Living Logo" fill sizes="48px" className="object-cover" />
              </div>
              <div>
                <span className="font-serif text-2xl tracking-widest uppercase font-normal text-white block">
                  Belmo
                </span>
                <span className="block text-[9px] tracking-widest uppercase text-belmo-gold font-medium -mt-1">
                  Living
                </span>
              </div>
            </Link>
            <p className="text-belmo-beige/65 text-[11px] leading-relaxed font-light">
              Architectural furniture conceived with sculptural poise, heirloom solid Appalachian hardwoods, and tactile organic textiles.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-belmo-gold-light">
              <TreePine className="w-4 h-4 text-belmo-gold" />
              <span>100% FSC® Certified Hardwoods</span>
            </div>
          </div>

          {/* Col 2: Furniture Collections */}
          <div className="space-y-3">
            <p className="font-semibold tracking-luxury uppercase text-belmo-gold text-[11px]">
              Furniture
            </p>
            <ul className="space-y-2 text-belmo-beige/70">
              <li>
                <Link href="/category/sofas-sectionals" className="hover:text-belmo-gold transition-colors">
                  Sofas & Sectionals
                </Link>
              </li>
              <li>
                <Link href="/category/chairs-loungers" className="hover:text-belmo-gold transition-colors">
                  Chairs & Loungers
                </Link>
              </li>
              <li>
                <Link href="/category/living-room-furniture" className="hover:text-belmo-gold transition-colors">
                  Living Room Tables
                </Link>
              </li>
              <li>
                <Link href="/category/bedroom-furniture" className="hover:text-belmo-gold transition-colors">
                  Bedroom Platforms
                </Link>
              </li>
              <li>
                <Link href="/category/dining-room-furniture" className="hover:text-belmo-gold transition-colors">
                  Dining Tables & Chairs
                </Link>
              </li>
              <li>
                <Link href="/category/office-furniture" className="hover:text-belmo-gold transition-colors">
                  Executive Desks
                </Link>
              </li>
              <li>
                <Link href="/category/outdoor-furniture" className="hover:text-belmo-gold transition-colors">
                  Teak Outdoor Sanctuaries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Experience */}
          <div className="space-y-3">
            <p className="font-semibold tracking-luxury uppercase text-belmo-gold text-[11px]">
              Experience
            </p>
            <ul className="space-y-2 text-belmo-beige/70">
              <li>
                <Link href="/customize" className="hover:text-belmo-gold transition-colors flex items-center gap-1.5">
                  <span>Make It Yours Customizer</span>
                  <span className="text-[9px] bg-belmo-bronze text-belmo-gold-light px-1.5 py-0.5 rounded font-mono">3D</span>
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="hover:text-belmo-gold transition-colors">
                  Belmo Living Lookbook
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-belmo-gold transition-colors">
                  Curated Series
                </Link>
              </li>
              <li>
                <Link href="/showroom" className="hover:text-belmo-gold transition-colors">
                  Flagship Showroom
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-belmo-gold transition-colors">
                  The Belmo Story
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-belmo-gold transition-colors opacity-70">
                  Management Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Client Services */}
          <div className="space-y-3">
            <p className="font-semibold tracking-luxury uppercase text-belmo-gold text-[11px]">
              Client Services
            </p>
            <ul className="space-y-2 text-belmo-beige/70">
              <li>
                <Link href="/account" className="hover:text-belmo-gold transition-colors">
                  Customer Account
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-belmo-gold transition-colors">
                  Curated Wishlist
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-belmo-gold transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-belmo-gold transition-colors">
                  White-Glove Delivery
                </Link>
              </li>
              <li>
                <Link href="/privacy-terms" className="hover:text-belmo-gold transition-colors">
                  Privacy Policy & Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Flagship Showroom & Verified Contact */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-3">
            <p className="font-semibold tracking-luxury uppercase text-belmo-gold text-[11px]">
              Flagship Studio
            </p>
            <div className="space-y-2.5 text-belmo-beige/70 text-[11px]">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-belmo-gold shrink-0 mt-0.5" />
                <span>482 Broome Street, Soho, New York, NY 10013</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-belmo-gold shrink-0" />
                <span>+1 (800) 482-BELMO</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-belmo-gold shrink-0" />
                <a
                  href="https://wa.me/18004823566?text=Hello%20Belmo%20Living,%20I%20would%20like%20to%20inquire%20about%20a%20furniture%20piece."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline underline-offset-2"
                >
                  WhatsApp Concierge
                </a>
              </p>
              <div className="pt-2">
                <Link
                  href="/showroom#book-private-viewing"
                  className="inline-block py-2 px-3 border border-belmo-gold/30 rounded-lg text-[10px] tracking-wider uppercase text-belmo-gold hover:bg-belmo-gold hover:text-belmo-charcoal transition-colors font-medium"
                >
                  Book Private Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <p>© 2026 Belmo Living. All rights reserved. Designed for Living. Crafted for Life.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-belmo-gold-light">
              <ShieldCheck className="w-3.5 h-3.5 text-belmo-gold" />
              10-Year Master Frame Guarantee
            </span>
            <Link href="/privacy-terms" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/privacy-terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
