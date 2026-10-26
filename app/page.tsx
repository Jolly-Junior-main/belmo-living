import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ShowroomVideosSection from '@/components/home/ShowroomVideosSection';
import CollectionsSlider from '@/components/home/CollectionsSlider';
import SignaturePieces from '@/components/home/SignaturePieces';
import CraftsmanshipSection from '@/components/home/CraftsmanshipSection';
import CustomizerPreview from '@/components/home/CustomizerPreview';
import LookbookPreview from '@/components/home/LookbookPreview';
import BrandStorySection from '@/components/home/BrandStorySection';
import ShowroomInquirySection from '@/components/home/ShowroomInquirySection';

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      {/* Section 01: Hero (Belmo Living Motion Graphics Brand Cinema) */}
      <HeroSection />

      {/* Section 02: Live Showroom Suites (Showroom Videos 1 & 2: Walnut Haven & Bouclé Cloud) */}
      <ShowroomVideosSection />

      {/* Section 03: Explore Our Collections (Horizontal Drag Gallery) */}
      <CollectionsSlider />

      {/* Section 04: Belmo Living Signature Pieces */}
      <SignaturePieces />

      {/* Section 05: Crafted With Purpose (Macro Craftsmanship & Materials) */}
      <CraftsmanshipSection />

      {/* Section 06: Make It Yours (Interactive Customization) */}
      <CustomizerPreview />

      {/* Section 07: Belmo Living Lookbook (Shoppable Interior Hotspots) */}
      <LookbookPreview />

      {/* Section 08: The Belmo Living Story (Brand Philosophy & Materials) */}
      <BrandStorySection />

      {/* Section 09: Visit Belmo Living (Flagship Showroom, Appointment & WhatsApp) */}
      <ShowroomInquirySection />
    </div>
  );
}
