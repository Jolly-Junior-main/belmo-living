'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const handleScrollDown = () => {
    const el = document.getElementById('showroom-suites');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden select-none flex flex-col justify-between px-6 sm:px-10 md:px-14 lg:px-20 pt-28 sm:pt-32 md:pt-36 pb-8 sm:pb-12 border-b border-black/10">
      {/* ─────────────────────────────────────────────────────────────
          BACKGROUND LAYER: MOTION GRAPHICS VIDEO
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#121210]">
        {/* Ambient blurred video fill for ultra-wide displays */}
        <video
          src="/videos/motion-graphics.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-35 scale-110 pointer-events-none"
        />

        {/* Crisp Centered Motion Graphics Video */}
        <video
          src="/videos/motion-graphics.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-contain md:object-cover object-center filter brightness-95 md:brightness-[0.88] contrast-[1.04]"
        />

        {/* Cinematic Lighting Scrims & Vignettes for Extreme Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/15 to-black/50 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/65 to-transparent pointer-events-none" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. HERO TYPOGRAPHY (LEFT-ALIGNED)
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 text-left max-w-4xl space-y-2 sm:space-y-3 pt-2 sm:pt-4">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-bold tracking-tight leading-[0.95] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
          Discover Your
        </h1>
        <p className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-normal tracking-normal -mt-2 sm:-mt-4 text-[#fceadc] drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          Perfect Space
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CENTERPIECE STAGE (UNOBSTRUCTED FOR THE ROTATING MEDALLION)
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full my-auto" />

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM CONTROLS & SCROLL PROMPT
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center gap-4 sm:gap-5 pt-2">
        {/* Scroll Indicator to Next Section (Showroom Suites) */}
        <button
          onClick={handleScrollDown}
          aria-label="Scroll to Showroom Suites"
          className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs tracking-wider uppercase font-medium transition-colors group cursor-pointer pt-1 text-white/80 hover:text-white"
        >
          <span>Scroll to Explore Live Showroom Suites</span>
          <div className="w-6 h-6 rounded-full flex items-center justify-center transition-all group-hover:scale-110 bg-white/20 text-white group-hover:bg-[#e59124]">
            <ChevronDown className="w-3.5 h-3.5 text-[#e59124] group-hover:text-white animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
