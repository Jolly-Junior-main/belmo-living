import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    slug: 'belmo-solace-modular-sofa',
    name: 'Belmo Solace Modular Sofa',
    tagline: 'An architectural sanctuary of monolithic comfort and hand-tailored bouclé.',
    category: 'Sofas & Sectionals',
    categorySlug: 'sofas-sectionals',
    collection: 'The Architectural Atelier',
    collectionSlug: 'architectural-atelier',
    price: 4850,
    originalPrice: 5200,
    rating: 4.95,
    reviewCount: 48,
    badge: 'Signature',
    description: 'The Solace Modular Sofa represents the pinnacle of Belmo Living craft. Conceived as an architectural landscape rather than a conventional couch, its deep proportions, low center of gravity, and double-stitched Italian bouclé upholstery invite complete relaxation while maintaining structured elegance in open spaces.',
    story: 'Designed in our private studio, the Solace is anchored by kiln-dried FSC®-certified American walnut internal frames, joined with traditional mortise-and-tenon craftsmanship. Each cushion layer balances multi-density cold-cured foam with a hypoallergenic goose-down baffle topper, delivering instantaneous contouring with zero sagging over decades of use.',
    craftDetails: [
      'Master artisan blind-tufted seams and French piping along perimeter contours',
      'Solid kiln-dried American walnut sub-chassis with brushed bronze leg inserts',
      'Dual-density organic memory latex core wrapped in channel-quilted down',
      'Interlocking hidden German steel brackets allowing modular rearrangement',
      'Treated with non-toxic nano-shield for natural spill and stain resistance'
    ],
    materials: [
      'Italian Tactile Bouclé (480 g/m²)',
      'Solid American Walnut Chassis',
      'Hypoallergenic European Down Baffle Top',
      'Brushed Bronze Architectural Feet'
    ],
    dimensions: {
      width: '118" (300 cm)',
      depth: '42" (107 cm)',
      height: '29" (74 cm)',
      seatHeight: '16.5" (42 cm)',
      weight: '240 lbs (108 kg)'
    },
    leadTime: '3-4 Weeks Bespoke Assembly & White Glove Delivery',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85'
    ],
    variants: [
      {
        id: 'var-solace-ivory-boucle',
        name: 'Ivory Tactile Bouclé / American Walnut',
        material: 'Ivory Bouclé',
        woodFinish: 'American Walnut',
        colorHex: '#F6F3ED',
        priceDelta: 0,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85',
        inStock: true
      },
      {
        id: 'var-solace-cognac-leather',
        name: 'Vintage Cognac Full-Grain Leather / Smoked Oak',
        material: 'Cognac Full-Grain Leather',
        woodFinish: 'Smoked Oak',
        colorHex: '#8C5332',
        priceDelta: 750,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=85',
        inStock: true
      },
      {
        id: 'var-solace-charcoal-wool',
        name: 'Charcoal Highland Wool / Bleached Oak',
        material: 'Charcoal Wool',
        woodFinish: 'Bleached Oak',
        colorHex: '#282827',
        priceDelta: 300,
        image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=85',
        inStock: true
      }
    ],
    inStock: true,
    stockCount: 6,
    customizable: true
  },
  {
    id: 'prod-02',
    slug: 'belmo-elysian-lounge-chair',
    name: 'Belmo Elysian Lounge Chair & Ottoman',
    tagline: 'An ergonomic sculpture of fluid timber curves and tactile sanctuary.',
    category: 'Chairs & Loungers',
    categorySlug: 'chairs-loungers',
    collection: 'The Architectural Atelier',
    collectionSlug: 'architectural-atelier',
    price: 2450,
    rating: 4.98,
    reviewCount: 36,
    badge: 'Signature',
    description: 'The Elysian Lounge Chair pairs mid-century poise with modern architectural discipline. Seamlessly steam-bent American walnut arms cradle a cantilevered seat shell, balancing aesthetic lightness with deep therapeutic recline.',
    story: 'Every curve of the Elysian is sculpted by 5-axis CNC precision and hand-finished with three coats of natural organic oils, preserving the honest warmth of the raw grain.',
    craftDetails: [
      'Steam-bent 18-ply American walnut veneer shell with bookmatched grain',
      'Artisanal hand-buffed organic beeswax and linseed oil finish',
      'Concealed ball-bearing swivel mechanism with calibrated resistance',
      'Supple top-grain aniline leather or organic wool bouclé'
    ],
    materials: [
      'Curved American Walnut Shell',
      'Italian Aniline Leather',
      'Cast Bronze Swivel Base',
      'High-Density Latex Core'
    ],
    dimensions: {
      width: '34" (86 cm)',
      depth: '37" (94 cm)',
      height: '35" (89 cm)',
      seatHeight: '15.5" (39 cm)',
      weight: '68 lbs (31 kg)'
    },
    leadTime: 'In Stock — Ships in 48-72 Hours',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1600&q=85'
    ],
    variants: [
      {
        id: 'var-elysian-cognac',
        name: 'Cognac Tuscan Leather / Walnut',
        material: 'Tuscan Leather',
        woodFinish: 'Walnut',
        colorHex: '#9E5B32',
        priceDelta: 0,
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=85',
        inStock: true
      },
      {
        id: 'var-elysian-cream',
        name: 'Oatmeal Bouclé / Smoked Oak',
        material: 'Oatmeal Bouclé',
        woodFinish: 'Smoked Oak',
        colorHex: '#EAE5DC',
        priceDelta: -150,
        image: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=1600&q=85',
        inStock: true
      }
    ],
    inStock: true,
    stockCount: 12,
    customizable: true
  },
  {
    id: 'prod-03',
    slug: 'belmo-monolith-travertine-coffee-table',
    name: 'Belmo Monolith Travertine Table',
    tagline: 'Quarried Italian travertine carved into geological purity.',
    category: 'Living Room Furniture',
    categorySlug: 'living-room-furniture',
    collection: 'Monolithic Stone Series',
    collectionSlug: 'monolithic-stone-series',
    price: 3200,
    rating: 4.92,
    reviewCount: 22,
    badge: 'Limited Edition',
    description: 'Formed from solid slab Roman travertine, the Monolith Coffee Table celebrates natural geological fissures and porous earth textures. Its pillared geometry lends monumental stability while its honed matte seal ensures heirloom longevity.',
    story: 'Sourced directly from historic quarries in Tivoli, Italy, each table is cut from single blocks of stone. No two tables share identical veins, making every piece an unrepeatable earth portrait.',
    craftDetails: [
      'Solid vein-cut Italian Travertine with unfilled natural cavities on fluted sides',
      'Satin-honed top surface sealed with breathable invisible quartz coating',
      'Chamfered bevel perimeter edges polished entirely by hand',
      'Reinforced internal steel sub-structure for earthquake stability'
    ],
    materials: [
      'Roman Travertine Stone',
      'Solid Sub-Slab Core',
      'Protective Silicate Matte Seal'
    ],
    dimensions: {
      width: '54" (137 cm)',
      depth: '34" (86 cm)',
      height: '14" (36 cm)',
      weight: '210 lbs (95 kg)'
    },
    leadTime: '4-6 Weeks Custom Quarry Selection',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85'
    ],
    variants: [
      {
        id: 'var-monolith-travertine-beige',
        name: 'Honed Warm Ivory Travertine',
        material: 'Tivoli Travertine',
        colorHex: '#E5D8C5',
        priceDelta: 0,
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
        inStock: true
      },
      {
        id: 'var-monolith-calacatta-viola',
        name: 'Calacatta Viola Marble (Polished)',
        material: 'Calacatta Viola',
        colorHex: '#5C3843',
        priceDelta: 1200,
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
        inStock: false
      }
    ],
    inStock: true,
    stockCount: 4,
    customizable: true
  },
  {
    id: 'prod-04',
    slug: 'belmo-kanso-platform-bed',
    name: 'Belmo Kanso Low Platform Bed',
    tagline: 'Quiet Japanese-Scandinavian minimalism with floating nightstand ledges.',
    category: 'Bedroom Furniture',
    categorySlug: 'bedroom-furniture',
    collection: 'Kanso Minimalist Line',
    collectionSlug: 'kanso-minimalist-line',
    price: 3600,
    originalPrice: 3950,
    rating: 4.97,
    reviewCount: 31,
    badge: 'Signature',
    description: 'The Kanso Platform Bed evokes the serene calm of modern Kyoto ryokans. Built with wide solid walnut side ledges, integrated dimmable LED ambiance, and upholstered linen headboard bolster, it grounds the bedroom in unhurried tranquility.',
    story: 'Engineered with zero squeak tolerance using Japanese joinery techniques that require minimal fasteners. The platform slat system incorporates organic beech wood slats with independent flex tensioners.',
    craftDetails: [
      'Cantilevered floating base silhouette with recessed support pillars',
      'Integrated rear cord channel and touch-capacitive warm reading light channels',
      'Padded removable Belgian linen bolster cushions for reclined evening reading',
      'FSC® Certified Solid American Walnut with satin polyurethane lacquer'
    ],
    materials: [
      'Solid American Walnut',
      'Belgian Organic Flax Linen',
      'European Beech Ergonomic Slats',
      'Warm LED Integrated Channels (2700K)'
    ],
    dimensions: {
      width: '84" King (213 cm)',
      depth: '92" (234 cm)',
      height: '32" (81 cm)',
      weight: '260 lbs (118 kg)'
    },
    leadTime: '2-3 Weeks White Glove Delivery',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1600&q=85'
    ],
    variants: [
      {
        id: 'var-kanso-walnut-natural',
        name: 'Natural American Walnut / Sand Linen',
        material: 'Sand Linen',
        woodFinish: 'Natural Walnut',
        colorHex: '#6F4E37',
        priceDelta: 0,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85',
        inStock: true
      },
      {
        id: 'var-kanso-oak-bleached',
        name: 'Bleached White Oak / Chalk Linen',
        material: 'Chalk Linen',
        woodFinish: 'White Oak',
        colorHex: '#D8CEBE',
        priceDelta: 100,
        image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1600&q=85',
        inStock: true
      }
    ],
    inStock: true,
    stockCount: 8,
    customizable: true
  },
  {
    id: 'prod-05',
    slug: 'belmo-zenith-solid-walnut-dining-table',
    name: 'Belmo Zenith Solid Walnut Dining Table',
    tagline: 'Continuous grain monolithic timber centerpiece designed to host ten.',
    category: 'Dining Room Furniture',
    categorySlug: 'dining-room-furniture',
    collection: 'The Architectural Atelier',
    collectionSlug: 'architectural-atelier',
    price: 4200,
    rating: 4.96,
    reviewCount: 19,
    badge: 'Bespoke',
    description: 'The Zenith Dining Table celebrates the grandeur of communal feasting. Cut from matched solid slabs of Appalachian black walnut, its pillared cylindrical timber pedestals provide total legroom freedom along the perimeter.',
    story: 'Handcrafted across three weeks in our workshop. Each slab undergoes eight cycles of precision sanding followed by deep penetration with organic carnauba waxes, creating a tactile matte surface impervious to wine or warm porcelain.',
    craftDetails: [
      'Twin cylindrical fluted solid walnut pedestal columns',
      'Boat-curved subtle edge profile providing ergonomic wrist comfort',
      'Integrated concealed steel expansion bars ensuring absolute slab flatness',
      'Seated capacity for 8 to 10 guests without column interference'
    ],
    materials: [
      'Solid Appalachian Black Walnut (1.75" Slab)',
      'Natural Carnauba & Beeswax Seal',
      'Hidden Structural Carbon Steel Braces'
    ],
    dimensions: {
      width: '96" (244 cm)',
      depth: '42" (107 cm)',
      height: '30" (76 cm)',
      weight: '215 lbs (98 kg)'
    },
    leadTime: '3-4 Weeks Custom Artisan Build',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1600&q=85'
    ],
    variants: [
      {
        id: 'var-zenith-walnut-96',
        name: '96" Black Walnut (Seats 8-10)',
        material: 'Black Walnut',
        woodFinish: 'Natural Matte',
        colorHex: '#583D29',
        priceDelta: 0,
        image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
        inStock: true
      },
      {
        id: 'var-zenith-walnut-110',
        name: '110" Grand Estate Walnut (Seats 10-12)',
        material: 'Black Walnut',
        woodFinish: 'Natural Matte',
        colorHex: '#4E3625',
        priceDelta: 600,
        image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
        inStock: true
      }
    ],
    inStock: true,
    stockCount: 5,
    customizable: true
  },
  {
    id: 'prod-06',
    slug: 'belmo-palisade-executive-desk',
    name: 'Belmo Palisade Executive Desk',
    tagline: 'Quiet architectural authority with hidden wire architecture.',
    category: 'Office Furniture',
    categorySlug: 'office-furniture',
    collection: 'The Architectural Atelier',
    collectionSlug: 'architectural-atelier',
    price: 3450,
    rating: 4.93,
    reviewCount: 14,
    badge: 'New',
    description: 'The Palisade Executive Desk strips workspace clutter to its elemental essence. Featuring a floating cantilevered top with inlaid Italian saddle leather blotter, integrated magnetic cable spine, and soft-close solid wood drawers with velvet lining.',
    story: 'Constructed for leaders, thinkers, and architects who demand quiet mental clarity. The desk concealed electrical ducting accommodates dual monitors, laptop power, and USB-C docks without a single exposed cord.',
    craftDetails: [
      'Inlaid vegetable-tanned Italian saddle leather write-pad',
      'Concealed flip-up bronze utility port with dual high-speed USB-C & AC outlets',
      'Solid dovetail joinery in soft-close side drawers with walnut dividers',
      'Brushed bronze foot caps with micro-leveling precision feet'
    ],
    materials: [
      'Solid Smoked Oak & American Walnut',
      'Italian Saddle Leather Inset',
      'Brushed Champagne Bronze Accents'
    ],
    dimensions: {
      width: '72" (183 cm)',
      depth: '34" (86 cm)',
      height: '30" (76 cm)',
      weight: '165 lbs (75 kg)'
    },
    leadTime: 'In Stock — Ships in 3 Days',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85'
    ],
    variants: [
      {
        id: 'var-palisade-oak-cognac',
        name: 'Smoked Oak / Cognac Leather',
        material: 'Cognac Saddle Leather',
        woodFinish: 'Smoked Oak',
        colorHex: '#3D352E',
        priceDelta: 0,
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85',
        inStock: true
      }
    ],
    inStock: true,
    stockCount: 7,
    customizable: true
  },
  {
    id: 'prod-07',
    slug: 'belmo-sanctuary-teak-outdoor-lounge',
    name: 'Belmo Sanctuary Teak Outdoor Daybed',
    tagline: 'Resort-grade teak architecture built to weather gracefully under open skies.',
    category: 'Outdoor Furniture',
    categorySlug: 'outdoor-furniture',
    collection: 'Solstice Outdoor Collection',
    collectionSlug: 'solstice-outdoor-collection',
    price: 3890,
    rating: 4.91,
    reviewCount: 16,
    badge: 'Signature',
    description: 'Designed for coastal breezes and sun-drenched verandas, the Sanctuary Daybed marries sustainably harvested Grade-A teak slats with water-repellent Sunbrella marine fabrics and open-cell reticulated quick-dry foam.',
    story: 'Over seasons, the natural golden teak develops a distinguished silver-gray patina that only time and ocean air can impart.',
    craftDetails: [
      'Certified Grade-A plantation teak dense in natural oils and water resistance',
      'Marine-grade 316 stainless steel joinery with hidden mortise fasteners',
      'Quick-dry reticulated foam cushions that shed water instantly after summer rain',
      'Sunbrella® solution-dyed acrylic covers washable and UV-stabilized'
    ],
    materials: [
      'Grade-A Javanese Teak',
      'Sunbrella® Sand Marine Fabric',
      '316 Marine Stainless Steel'
    ],
    dimensions: {
      width: '82" (208 cm)',
      depth: '40" (102 cm)',
      height: '27" (69 cm)',
      weight: '145 lbs (66 kg)'
    },
    leadTime: 'Ships in 1-2 Weeks',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
    ],
    variants: [
      {
        id: 'var-sanctuary-natural-teak',
        name: 'Natural Teak / Limestone Cushion',
        material: 'Sunbrella Sand',
        woodFinish: 'Natural Teak',
        colorHex: '#C59B63',
        priceDelta: 0,
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
        inStock: true
      }
    ],
    inStock: true,
    stockCount: 9,
    customizable: true
  },
  {
    id: 'prod-08',
    slug: 'belmo-brutalist-bronze-vessel-lamp',
    name: 'Belmo Brutalist Cast Bronze Lamp',
    tagline: 'Lost-wax cast bronze casting warm alabaster luminescence.',
    category: 'Home Accessories',
    categorySlug: 'home-accessories',
    collection: 'Architectural Objects',
    collectionSlug: 'architectural-objects',
    price: 850,
    rating: 4.97,
    reviewCount: 52,
    badge: 'Limited Edition',
    description: 'Sculpted by hand using historic lost-wax bronze casting, each lamp exhibits raw textural pockmarks, subtle verdigris patinas, and a solid Spanish alabaster dome shade that casts a soothing golden aura.',
    story: 'No two lamps are identical; each cast is poured individually in small artisan batches in our partner foundry, cooled slowly, and waxed with microcrystalline preservation.',
    craftDetails: [
      'Lost-wax cast bronze base with substantial 18-pound ballast',
      'Solid hand-turned translucent Spanish alabaster dome',
      'Integrated rotary dimming knob with warm-dim 2200K-3000K LED',
      'Braided chocolate silk cord with solid brass weighted plug'
    ],
    materials: [
      'Cast Bronze with Natural Patina',
      'Spanish Alabaster Stone Shade',
      'Solid Brass Knurled Switch',
      'Braided Silk Cord'
    ],
    dimensions: {
      width: '14" (36 cm)',
      depth: '14" (36 cm)',
      height: '18" (46 cm)',
      weight: '21 lbs (9.5 kg)'
    },
    leadTime: 'In Stock — Ships Tomorrow',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=85'
    ],
    variants: [
      {
        id: 'var-bronze-lamp-classic',
        name: 'Antiqued Bronze / Alabaster',
        material: 'Cast Bronze & Alabaster',
        colorHex: '#524438',
        priceDelta: 0,
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=85',
        inStock: true
      }
    ],
    inStock: true,
    stockCount: 15,
    customizable: false
  }
];
