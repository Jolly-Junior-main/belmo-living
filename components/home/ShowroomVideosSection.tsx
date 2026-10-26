'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  MessageCircle, 
  Eye, 
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShowroomSuite {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  material: string;
  price: string;
  productSlug: string;
  videoSrc: string;
  features: string[];
  tag: string;
}

const SUITES: ShowroomSuite[] = [
  {
    id: 'walnut-suite',
    number: '01',
    title: 'Solid Walnut Haven Suite',
    subtitle: 'Low-profile monolithic platform crafted from Appalachian walnut with integrated floating nightstand and ambient illumination.',
    material: 'Kiln-Dried American Walnut • Linen Sand',
    price: '$3,950',
    productSlug: 'belmo-kanso-platform-bed',
    videoSrc: '/videos/belmo-vid-1.mp4',
    features: [
      'Mortise-and-tenon solid walnut joinery',
      'Integrated floating cantilever nightstands',
      'Warm ambient cylindrical lantern glow',
      'Direct atelier consultation • 09-08-07-33-33'
    ],
    tag: 'Flagship Showroom Suite'
  },
  {
    id: 'boucle-suite',
    number: '02',
    title: 'Bouclé Cloud Platform Suite',
    subtitle: 'Sculptural curved headboard upholstered in high-density Italian bouclé, framed with architectural track lighting and dual bedside consoles.',
    material: '480 g/m² Tactile Bouclé • Soft Ivory',
    price: '$4,200',
    productSlug: 'belmo-solace-modular-sofa',
    videoSrc: '/videos/belmo-vid-2.mp4',
    features: [
      'Ergonomic padded cloud headboard',
      'Acoustic sound-dampening wings',
      'Exclusive 15% showroom opening curation',
      'Showroom verified • Tel: 09-08-07-33-33'
    ],
    tag: 'Grand Opening Special'
  }
];

export default function ShowroomVideosSection() {
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>({
    'walnut-suite': true,
    'boucle-suite': true
  });
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({
    'walnut-suite': true,
    'boucle-suite': true
  });

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const togglePlay = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (playingStates[id]) {
      video.pause();
      setPlayingStates((prev) => ({ ...prev, [id]: false }));
    } else {
      video.play().catch(() => {});
      setPlayingStates((prev) => ({ ...prev, [id]: true }));
    }
  };

  const toggleMute = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    const nextMuted = !mutedStates[id];
    video.muted = nextMuted;
    setMutedStates((prev) => ({ ...prev, [id]: nextMuted }));

    // If unmuting, mute the other video so audio doesn't overlap
    if (!nextMuted) {
      SUITES.forEach((suite) => {
        if (suite.id !== id && videoRefs.current[suite.id]) {
          videoRefs.current[suite.id]!.muted = true;
          setMutedStates((prev) => ({ ...prev, [suite.id]: true }));
        }
      });
    }
  };

  const handleScrollDown = () => {
    const el = document.getElementById('collections-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="showroom-suites" 
      className="relative w-full py-16 sm:py-24 bg-[#141412] text-white overflow-hidden select-none border-b border-white/10"
    >
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#e59124]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#79563c]/15 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] sm:text-xs font-semibold tracking-luxury uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#e59124]" />
            <span>Section 02 • Showroom In Motion</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            Live Showroom <span className="font-serif italic font-light text-[#f4ab3a]">Suites.</span>
          </h2>

          <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Experience our master bedroom collections, solid American walnut joinery, and tactile Italian bouclé filmed directly inside the Belmo Living showroom.
          </p>
        </div>

        {/* Dual Video Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {SUITES.map((suite) => {
            const isPlaying = playingStates[suite.id];
            const isMuted = mutedStates[suite.id];

            return (
              <div
                key={suite.id}
                className="group relative bg-[#1c1c1a] rounded-[2.2rem] sm:rounded-[2.6rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-500 hover:border-[#e59124]/40"
              >
                {/* 1. Video Container (Portrait 9:16 cinematic stage) */}
                <div className="relative w-full aspect-[9/14] sm:aspect-[9/13] md:aspect-[9/12] lg:aspect-[9/13] bg-black overflow-hidden">
                  <video
                    ref={(el) => {
                      videoRefs.current[suite.id] = el;
                    }}
                    src={suite.videoSrc}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  />

                  {/* Gradient Scrims for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/50 pointer-events-none" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono tracking-widest uppercase">
                      Suite {suite.number}
                    </span>

                    <span className="px-3.5 py-1.5 rounded-full bg-[#e59124] text-[#1a130d] text-[11px] font-semibold tracking-wide uppercase shadow-lg">
                      {suite.tag}
                    </span>
                  </div>

                  {/* Floating Video Overlay Controls (Play/Pause & Sound) */}
                  <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2">
                    <button
                      onClick={() => toggleMute(suite.id)}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-lg',
                        isMuted 
                          ? 'bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/20' 
                          : 'bg-[#e59124] text-[#1a130d] font-bold ring-2 ring-white/30 scale-105'
                      )}
                      title={isMuted ? 'Unmute showroom sound' : 'Mute sound'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => togglePlay(suite.id)}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center backdrop-blur-md shadow-lg transition-all"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
                    </button>
                  </div>

                  {/* Micro Audio Hint */}
                  {isMuted && (
                    <div className="absolute bottom-6 left-5 z-10 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white/80 border border-white/10">
                        <Volume2 className="w-3 h-3 text-[#e59124]" />
                        <span>Tap sound icon to listen</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* 2. Editorial Furniture Metadata & Actions */}
                <div className="p-6 sm:p-8 space-y-5 bg-[#181816]">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono tracking-wider uppercase text-[#e59124]">
                      {suite.material}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                      {suite.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {suite.subtitle}
                  </p>

                  {/* Feature Bullets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-3 border-y border-white/10">
                    {suite.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-white/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e59124] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button: Details Only */}
                  <div className="pt-2">
                    <Link
                      href={`/product/${suite.productSlug}`}
                      className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#e59124] to-[#f4ab3a] hover:from-[#d68318] hover:to-[#eb9e29] text-[#1a130d] font-semibold text-xs tracking-wide shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                    >
                      <span>Explore Piece Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Transition Prompt to Collections */}
        <div className="mt-14 sm:mt-18 text-center">
          <button
            onClick={handleScrollDown}
            className="inline-flex items-center gap-2.5 text-white/70 hover:text-white text-xs tracking-wider uppercase font-medium transition-colors group cursor-pointer"
          >
            <span>Scroll to Explore Living Collections</span>
            <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#e59124] group-hover:text-[#1a130d] flex items-center justify-center transition-all">
              <ChevronDown className="w-4 h-4 text-[#e59124] group-hover:text-[#1a130d] animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
