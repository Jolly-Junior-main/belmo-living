'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { Sparkles, ArrowRight, Sliders, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const TOTAL_TRANSFORM_FRAMES = 50;

export default function TransformSpaceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);
  const [sliderProgress, setSliderProgress] = useState(0); // 0 to 1
  const [isManualDragging, setIsManualDragging] = useState(false);
  const [isFirstFrameDrawn, setIsFirstFrameDrawn] = useState(false);

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

    // Subtle dark gradient at top and bottom for text readability
    const grad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    grad.addColorStop(0, 'rgba(32, 32, 30, 0.45)');
    grad.addColorStop(0.3, 'rgba(32, 32, 30, 0.1)');
    grad.addColorStop(0.7, 'rgba(32, 32, 30, 0.2)');
    grad.addColorStop(1, 'rgba(32, 32, 30, 0.7)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.restore();
  }, []);

  // Preload transform frames
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    for (let i = 1; i <= TOTAL_TRANSFORM_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/sequences/transform/frame_${paddedIndex}.webp`;
      img.onload = () => {
        if (isCancelled) return;
        if (i === 1 || currentFrameRef.current === i) {
          drawFrame(i);
          setIsFirstFrameDrawn(true);
        }
      };
      if (img.complete && img.naturalWidth > 0 && i === 1) {
        drawFrame(1);
        setIsFirstFrameDrawn(true);
      }
      images.push(img);
    }

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // Handle Resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.parentElement?.clientWidth || window.innerWidth;
    const height = canvas.parentElement?.clientHeight || window.innerHeight;

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

  // Scroll scrub
  useEffect(() => {
    if (isManualDragging) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      setSliderProgress(progress);

      const targetFrame = Math.min(
        Math.max(Math.floor(progress * (TOTAL_TRANSFORM_FRAMES - 1)) + 1, 1),
        TOTAL_TRANSFORM_FRAMES
      );

      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame;
        drawFrame(targetFrame);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [drawFrame, isManualDragging]);

  const handleManualSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSliderProgress(val);
    setIsManualDragging(true);

    const targetFrame = Math.min(
      Math.max(Math.floor(val * (TOTAL_TRANSFORM_FRAMES - 1)) + 1, 1),
      TOTAL_TRANSFORM_FRAMES
    );
    currentFrameRef.current = targetFrame;
    drawFrame(targetFrame);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[175vh] bg-belmo-charcoal select-none"
      id="transform-your-space"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 md:p-12">
        {/* Background Image / Canvas Layer with instant fallback */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-belmo-charcoal">
          <NextImage
            src="/sequences/transform/frame_001.webp"
            alt="Spatial Transformation"
            fill
            priority
            sizes="100vw"
            className={cn(
              'object-cover transition-opacity duration-300',
              isFirstFrameDrawn ? 'opacity-0 pointer-events-none' : 'opacity-100'
            )}
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </div>

        {/* Top Header */}
        <div className="relative z-10 max-w-4xl mx-auto text-center pt-24 text-white space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-belmo-bronze-light" />
            <span className="text-[10px] tracking-luxury uppercase text-belmo-ivory">
              Section 07 • Spatial Transformation
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight drop-shadow-md">
            Your Space. <span className="font-serif italic font-light text-belmo-gold">Your Story.</span>
          </h2>
          <p className="text-xs sm:text-sm text-belmo-beige/90 max-w-xl mx-auto font-light leading-relaxed drop-shadow">
            From bare structural concrete to an enveloping sanctuary of tactile bouclé, fluted walnut, and honed travertine stone.
          </p>
        </div>

        {/* Bottom Interactive HUD & Scrubber */}
        <div className="relative z-10 max-w-2xl mx-auto w-full pb-8 text-white space-y-4">
          {/* Milestone Labels */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-belmo-beige/80 px-2">
            <span className={sliderProgress < 0.3 ? 'text-white font-bold' : ''}>
              Stage 01 • Raw Canvas
            </span>
            <span className={sliderProgress >= 0.3 && sliderProgress < 0.7 ? 'text-white font-bold' : ''}>
              Stage 02 • Hardwood & Light
            </span>
            <span className={sliderProgress >= 0.7 ? 'text-belmo-bronze-light font-bold' : ''}>
              Stage 03 • Furnished Sanctuary
            </span>
          </div>

          {/* Interactive Range Scrubber */}
          <div className="bg-white/90 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-black/10 shadow-2xl flex flex-col sm:flex-row items-center gap-4 text-[#1a1a1a]">
            <div className="flex-1 w-full flex items-center gap-3">
              <Sliders className="w-4 h-4 text-[#e59124] shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={sliderProgress}
                onChange={handleManualSlider}
                onMouseUp={() => setIsManualDragging(false)}
                onTouchEnd={() => setIsManualDragging(false)}
                className="w-full accent-[#e59124] cursor-pointer h-2 bg-black/10 rounded-full"
              />
            </div>

            <Link
              href="/showroom"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e59124] to-[#f4ab3a] text-[#1a130d] text-xs font-semibold tracking-wide transition-all shadow-[0_4px_16px_rgba(229,145,36,0.35)] hover:scale-105 whitespace-nowrap flex items-center gap-1.5 shrink-0"
            >
              <span>Design Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-center text-[10px] text-white/50 tracking-wider uppercase">
            Scroll or drag slider to reveal the interior evolution
          </p>
        </div>
      </div>
    </section>
  );
}
