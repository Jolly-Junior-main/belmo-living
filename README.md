# BELMO LIVING
### Premium Furniture Showroom & Cinematic E-Commerce Experience
**"Designed for Living. Crafted for Life."**

Inspired by the immersive digital storytelling of Seasats and Apple's architectural product presentations, **Belmo Living** is a high-end interactive luxury furniture showroom and e-commerce experience.

---

## 🌟 Key Highlights & Architectural Features

### 1. Continuous Scroll Experience (Highest-Priority Feature)
- **140-Frame High-Definition WebP Sequence** (`/sequences/sofa/frame_001.webp` through `frame_140.webp`).
- **HTML5 Canvas 2D Scrubbing** with sub-pixel interpolation, device pixel ratio scaling, and letterbox-free `cover` aspect ratio rendering.
- **Cinematic Choreography**:
  1. *Chapter 01 (Frames 1–28)*: Luxurious furnished living room bathed in morning dawn light.
  2. *Chapter 02 (Frames 29–62)*: Camera glides toward the Belmo Solace Modular Sofa.
  3. *Chapter 03 (Frames 63–94)*: Background dissolves into studio purity; sofa rotates 360° to reveal its kiln-dried Appalachian walnut sub-chassis.
  4. *Chapter 04 (Frames 95–122)*: Macro focus on hand-stitched 480 g/m² Italian bouclé, double French piping, and down duvet baffles.
  5. *Chapter 05 (Frames 123–140)*: Grand pullback revealing the complete monolithic piece with direct actions to customize or order.
- **Synchronized Typography HUD**: Dynamic story card overlays and chapter tabs that scrub in real-time.
- **Accessibility & Performance**: Progressive frame preloader, fallback states, and an explicit **Reduced Motion** toggle.

### 2. Spatial Transformation ("Your Space. Your Story.")
- **50-Frame Sequential Room Metamorphosis** (`/sequences/transform/frame_001.webp` through `frame_050.webp`).
- Empty architectural concrete loft evolves into a complete, furnished Belmo Living sanctuary.
- Includes an interactive dual-axis scrub handle for manual before/after control.

### 3. Interactive 3D Furniture Customizer ("Make It Yours")
- Dedicated workbench (`/customize`) with dynamic 3D-inspired preview canvas.
- Configurable parameters:
  - **Scale & Silhouette**: 2-Seater Studio, 3-Seater Grand, Corner L-Sectional, Architectural Chaise.
  - **Textiles & Upholstery**: Italian Tactile Bouclé, Tuscan Full-Grain Cognac Leather, Highland Charcoal Wool, Belgian Flax Linen, Forest Brushed Velvet.
  - **Hardwood Chassis**: Solid American Walnut, Smoked Crown Oak, Bleached White Oak, Espresso Black Ash.
  - **Hardware Accents**: Brushed Champagne Bronze, Matte Blackened Steel, Satin Brass.
  - **Cushion Ergonomics**: Cloud Foam, Goose Down Duvet, Firm Latex.
  - **Studio Lighting Switcher**: Dawn, Gallery, Dusk, Atelier Dark Studio.
- Real-time dynamic pricing, dimension HUD, and **Bespoke Specification PDF Export**.

### 4. Shoppable Editorial Lookbook
- Interactive rooms (`/lookbook`) with pulsing hotspot pins.
- Clicking any pin displays product specifications, pricing, and allows instant addition to the Atelier Cart.

### 5. Complete Suite of 17 Required Pages
1. **Home** (`/`) — Full 10-section cinematic luxury experience.
2. **Shop All Furniture** (`/shop`) — Category filters, material search, in-stock filter, grid/list view.
3. **Furniture Categories** (`/categories`) — 8 architectural disciplines.
4. **Category Detail** (`/category/[slug]`) — Dedicated category collections.
5. **Individual Product Details** (`/product/[slug]`) — Multi-angle gallery, finish swatches, dimension guide, materials breakdown, White-Glove delivery calculator, reviews.
6. **Curated Collections** (`/collections`) — 4 architectural series.
7. **Collection Detail** (`/collection/[slug]`) — In-depth series narratives.
8. **Furniture Customization** (`/customize`) — Full customizer studio.
9. **Lookbook / Inspiration** (`/lookbook`) — Editorial shoppable residences.
10. **About Belmo Living** (`/about`) — Authentic brand manifesto, FSC® forest stewardship.
11. **Our Showroom** (`/showroom`) — Soho Flagship details, virtual gallery, VIP appointment booking.
12. **Contact & Concierge** (`/contact`) — Direct atelier communication & WhatsApp link.
13. **Atelier Cart** (`/cart`) — Dedicated cart with free White-Glove progress meter ($3,000 threshold) and VIP promo codes.
14. **White-Glove Checkout** (`/checkout`) — Delivery vs Showroom Pickup, configurable payment selection (Cards, Bank Wire, Apple Pay, Trade Net 30), verified order creation.
15. **Customer Account** (`/account`) — Order tracking, scheduled showroom viewings, bespoke quotes.
16. **Curated Wishlist** (`/wishlist`) — Saved items with one-click cart transfer.
17. **FAQ** (`/faq`) — Accordion guides on custom orders, leather care, and 10-year warranty.
18. **Shipping & Returns** (`/shipping-returns`) — White-Glove inside placement, building COI, 30-day trial.
19. **Privacy Policy & Terms** (`/privacy-terms`) — Strict client confidentiality standards.

### 6. Executive Showroom Admin Console (`/admin`)
- **Real-Time KPIs**: Gross revenue, active commissions in production, booked showroom viewings, custom quotes.
- **Order Management**: Update status from *Processing* → *In Production / Atelier* → *White-Glove In Transit* → *Delivered*.
- **Inventory & Stock Control**: Toggle stock availability, monitor units on hand, view finish counts.
- **Showroom Salon Bookings**: View guest details, preferred dates, party sizes, project scope.
- **Bespoke Quote Management**: Review custom specifications from the 3D customizer.
- **Gateway & WhatsApp Settings**: Configurable payment endpoints and verified concierge hotline.

---

## 🎨 Brand Design System

| Color Token | Hex Code | Visual Application |
|---|---|---|
| **Warm Ivory** | `#F6F3ED` | Canvas body, editorial cards, clean backgrounds |
| **Natural Beige** | `#E8DED0` | Sub-surfaces, border dividers, neutral swatches |
| **Walnut Brown** | `#79563C` | Hardwood elements, primary accent tags, links |
| **Charcoal** | `#20201E` | Typography, dark studio sections, primary buttons |
| **Bronze** | `#A98D6C` | Metal insets, HUD highlights, luxury badges |
| **Pure White** | `#FFFFFF` | Editorial product cards, clean contrast modules |

---

## 🛠️ Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: GSAP, Canvas 2D frame interpolation, CSS Keyframes
- **Icons**: Lucide React
- **Data & State**: React Context (`ShopContext`) with browser `localStorage` persistence
- **Media**: Optimized WebP sequences generated via custom Python/Pillow pipeline

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the showroom.

### Production Build
```bash
npm run build
npm run start
```

---

## 🏢 Verified Flagship Studio Details
- **Address**: 482 Broome Street, Soho, New York, NY 10013
- **Hours**: Tuesday – Sunday: 10:00 AM – 7:00 PM EST
- **Concierge Line**: +1 (800) 482-BELMO (+1 800-482-3566)
- **WhatsApp Concierge**: `https://wa.me/18004823566`

© 2026 Belmo Living. Designed for Living. Crafted for Life.
