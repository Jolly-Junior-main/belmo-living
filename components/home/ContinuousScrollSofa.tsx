'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useShop } from '@/context/ShopContext';
import { Sliders, RotateCw, Sparkles, ChevronDown, Eye, Check } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { PRODUCTS } from '@/data/products';

const TOTAL_FRAMES = 140;

interface Milestone {
  range: [number, number]; // frame range [start, end]
  chapter: string;
  title: string;
  body: string;
  tag: string;
}

const MILESTONES: Milestone[] = [
  {
    range: [1, 28],
    chapter: 'CHAPTER 01 / THE SANCTUARY',
    title: 'A Better Way to Live.',
    body: 'Conceived for architectural residences bathed in morning light. The Belmo Solace anchors open spaces with quiet monolithic serenity.',
    tag: 'Architectural Scale',
  },
  {
    range: [29, 62],
    chapter: 'CHAPTER 02 / MONOLITHIC FORM',
    title: 'Grounded Proportions.',
    body: 'A deep 42-inch lounging depth paired with a low center of gravity. Designed to quiet the room rather than clamor for attention.',
    tag: 'Low-Slung Comfort',
  },
  {
    range: [63, 94],
    chapter: 'CHAPTER 03 / 360° ARCHITECTURE',
    title: 'Flawless from Every Angle.',
    body: 'As the ambient background dissolves to studio purity, the kiln-dried American walnut sub-chassis and blind-tufted seams reveal true structural honesty.',
    tag: 'FSC® Walnut Chassis',
  },
  {
    range: [95, 122],
    chapter: 'CHAPTER 04 / TACTILE OBSESSION',
    title: 'Hand-Tailored Bouclé.',
    body: 'Macro inspection reveals 480 g/m² Italian tactile bouclé, double French piping, and a channel-quilted hypoallergenic goose down topper.',
    tag: 'Artisanal Seam Work',
  },
  {
    range: [123, 140],
    chapter: 'CHAPTER 05 / THE MASTERPIECE',
    title: 'Belmo Solace Modular Sofa.',
    body: 'An enduring heirloom crafted for life. Fully customizable in 12 organic fabrics, 4 timber finishes, and modular sectionals.',
    tag: 'Ready for Your Space',
  },
];

export default function ContinuousScrollSofa() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);
  const animationFrameId = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0); // 0 to 1
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { addToCart } = useShop();

  const solaceProduct = PRODUCTS.find((p) => p.slug === 'belmo-solace-modular-sofa') || PRODUCTS[0];

  // Draw a specific frame to canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = canvas.width / dpr;
    const canvasHeight = canvas.height / dpr;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Compute 'cover' aspect ratio
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let renderW = canvasWidth;
    let renderH = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderW = canvasWidth;
      renderH = canvasWidth / imgRatio;
      offsetY = (canvasHeight - renderH) / 2;
    } else {
      renderH = canvasHeight;
      renderW = canvasHeight * imgRatio;
      offsetX = (canvasWidth - renderW) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    // Subtle luxury vignette
    const gradient = ctx.createRadialGradient(
      canvasWidth / 2,
      canvasHeight / 2,
      Math.min(canvasWidth, canvasHeight) * 0.4,
      canvasWidth / 2,
      canvasHeight / 2,
      Math.max(canvasWidth, canvasHeight) * 0.75
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.restore();
  }, []);

  // Preload frames
  useEffect(() => {
    let isCancelled = false;
    let count = 0;
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/sequences/sofa/frame_${paddedIndex}.webp`;

      img.onload = () => {
        if (isCancelled) return;
        count++;
        setLoadedCount(count);
        if (count >= 15 && !isLoaded) {
          setIsLoaded(true);
        }
        if (i === 1 || currentFrameRef.current === i) {
          drawFrame(i);
        }
      };

      img.onerror = () => {
        if (isCancelled) return;
        count++;
        setLoadedCount(count);
      };

      if (img.complete && img.naturalWidth > 0 && i === 1) {
        drawFrame(1);
      }

      images.push(img);
    }

    return () => {
      isCancelled = true;
    };
  }, [drawFrame, isLoaded]);

  // Handle Resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Scroll scrub handler with Lerp interpolation
  useEffect(() => {
    if (reducedMotion) return;

    let targetFrame = 1;
    let smoothedFrame = 1;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      setCurrentProgress(progress);

      targetFrame = Math.min(
        Math.max(Math.floor(progress * (TOTAL_FRAMES - 1)) + 1, 1),
        TOTAL_FRAMES
      );

      // Determine active milestone
      const index = MILESTONES.findIndex(
        (m) => targetFrame >= m.range[0] && targetFrame <= m.range[1]
      );
      if (index !== -1) {
        setActiveMilestoneIndex(index);
      }
    };

    const renderLoop = () => {
      // Lerp frame smoothing
      smoothedFrame += (targetFrame - smoothedFrame) * 0.18;
      const roundedFrame = Math.round(smoothedFrame);

      if (roundedFrame !== currentFrameRef.current) {
        currentFrameRef.current = roundedFrame;
        drawFrame(roundedFrame);
      }

      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [drawFrame, reducedMotion]);

  // Jump to specific milestone
  const jumpToMilestone = (index: number) => {
    if (!containerRef.current) return;
    const targetProgress = (MILESTONES[index].range[0] - 1) / (TOTAL_FRAMES - 1);
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const targetScrollY = window.scrollY + rect.top + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  const activeMilestone = MILESTONES[activeMilestoneIndex] || MILESTONES[0];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[250vh] bg-[#1a1a18]"
      id="art-of-comfort"
    >
      {/* Pinned 100vh Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        {/* Background Image & Canvas Layer */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#1a1a18]">
          <NextImage
            src="/sequences/sofa/frame_001.webp"
            alt="The Art of Comfort"
            fill
            priority
            sizes="100vw"
            className={cn(
              'object-cover transition-opacity duration-500',
              isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            )}
          />
          {!reducedMotion ? (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          ) : (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `url(${solaceProduct.heroImage})`,
              }}
            />
          )}
        </div>

        {/* Loading Indicator Pill during initial fetch */}
        {loadedCount < TOTAL_FRAMES && (
          <div className="absolute top-24 right-8 z-30 flex items-center gap-2 bg-white/90 text-[#1a1a1a] text-[11px] px-3.5 py-1.5 rounded-full backdrop-blur-md border border-black/5 shadow-sm animate-fade-in font-medium">
            <span className="w-2 h-2 rounded-full bg-[#e59124] animate-pulse" />
            <span>Preloading Showroom Frames {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%</span>
          </div>
        )}

        {/* Top Header Overlay Bar */}
        <div className="relative z-20 pt-28 px-6 md:px-12 max-w-7xl mx-auto w-full flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] md:text-xs tracking-luxury uppercase font-medium text-[#1a1a1a] bg-white/80 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-black/5 shadow-sm">
              Interactive 360° Presentation
            </span>
            <h2 className="text-xl md:text-2xl font-serif text-[#1a1a1a] tracking-wide font-medium">
              The Art of Comfort
            </h2>
          </div>

          {/* Reduced Motion & Chapter Jumpers */}
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-black/5 shadow-sm">
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className="text-[10px] uppercase tracking-wider text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-2.5 py-1 rounded-full transition-colors flex items-center gap-1.5 font-medium"
              title="Toggle reduced motion"
            >
              <RotateCw className="w-3 h-3" />
              <span>{reducedMotion ? 'Enable Canvas Scrub' : 'Reduced Motion'}</span>
            </button>
          </div>
        </div>

        {/* Synchronized Editorial Text Box (Floating HUD) */}
        <div className="relative z-20 px-6 md:px-12 max-w-7xl mx-auto w-full mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Story Card */}
            <div className="lg:col-span-6 xl:col-span-5 bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] text-belmo-charcoal transform transition-all duration-500 ease-out">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-[#e59124] uppercase font-semibold">
                  {activeMilestone.chapter}
                </span>
                <span className="text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-full bg-black/5 text-[#1a1a1a] font-mono">
                  Frame {currentFrameRef.current} / {TOTAL_FRAMES}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3 tracking-tight leading-tight">
                {activeMilestone.title}
              </h3>

              <p className="text-xs md:text-sm text-[#1a1a1a]/75 font-light leading-relaxed mb-6">
                {activeMilestone.body}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-black/5">
                <Link
                  href="/customize?product=belmo-solace-modular-sofa"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e59124] to-[#f4ab3a] text-[#1a130d] text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 shadow-[0_4px_16px_rgba(229,145,36,0.35)] hover:scale-105"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Customize The Solace</span>
                </Link>

                <button
                  onClick={() => addToCart(solaceProduct)}
                  className="px-5 py-2.5 rounded-full bg-black/5 hover:bg-black/10 text-[#1a1a1a] text-xs font-medium tracking-wide transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#e59124]" />
                  <span>Order Signature • {formatPrice(solaceProduct.price)}</span>
                </button>
              </div>
            </div>

            {/* Right Progress Dial & Chapter Tabs */}
            <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col items-end gap-4">
              <div className="flex gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-black/5 shadow-sm">
                {MILESTONES.map((m, idx) => (
                  <button
                    key={m.chapter}
                    onClick={() => jumpToMilestone(idx)}
                    className={`px-3.5 py-1.5 text-[11px] tracking-wider uppercase rounded-full transition-all duration-300 ${
                      activeMilestoneIndex === idx
                        ? 'bg-[#20201e] text-white font-medium shadow-md'
                        : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>

              {/* Minimal Scroll Scrub Indicator */}
              <div className="flex items-center gap-3 text-[#1a1a1a]/60 text-xs">
                <span className="text-[10px] tracking-widest uppercase text-[#1a1a1a]/70 font-medium">
                  Scroll To Scrub Camera
                </span>
                <div className="w-32 h-1.5 bg-black/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#e59124] transition-all duration-100 rounded-full"
                    style={{ width: `${currentProgress * 100}%` }}
                  />
                </div>
                <ChevronDown className="w-4 h-4 animate-bounce text-[#e59124]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
