import { LookbookRoom } from '@/types';

export const LOOKBOOK_ROOMS: LookbookRoom[] = [
  {
    id: 'room-01',
    title: 'The Tribeca Master Bed Sanctuary',
    roomType: 'Master Bedroom & Bed Sanctuary',
    architecturalNote: 'Low-profile solid American walnut platform bed draped in organic Italian linen, with tailored bouclé cushions and warm bedside ambient illumination.',
    mainImage: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        productId: 'prod-04',
        productName: 'Belmo Kanso Low Platform Bed',
        productSlug: 'belmo-kanso-platform-bed',
        price: 3600,
        x: 62,
        y: 66,
      },
      {
        productId: 'prod-02',
        productName: 'Belmo Elysian Lounge Chair',
        productSlug: 'belmo-elysian-lounge-chair',
        price: 2450,
        x: 13,
        y: 72,
      }
    ]
  },
  {
    id: 'room-02',
    title: 'The Kyoto Courtyard Residence',
    roomType: 'Minimalist Primary Suite',
    architecturalNote: 'Sliding shoji partitions, natural tatami margins, and floating walnut joinery designed to usher restful twilight sleep.',
    mainImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        productId: 'prod-04',
        productName: 'Belmo Kanso Low Platform Bed',
        productSlug: 'belmo-kanso-platform-bed',
        price: 3600,
        x: 52,
        y: 62,
      },
      {
        productId: 'prod-02',
        productName: 'Belmo Elysian Lounge Chair',
        productSlug: 'belmo-elysian-lounge-chair',
        price: 2450,
        x: 18,
        y: 68,
      }
    ]
  },
  {
    id: 'room-03',
    title: 'The Montecito Hillside Salon',
    roomType: 'Formal Dining & Library Pavilion',
    architecturalNote: 'Exposed rough-sawn cedar beams, floor-to-ceiling glass pivot doors, and a ten-foot Appalachian walnut banquet centerpiece.',
    mainImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        productId: 'prod-05',
        productName: 'Belmo Zenith Solid Walnut Dining Table',
        productSlug: 'belmo-zenith-solid-walnut-dining-table',
        price: 4200,
        x: 50,
        y: 60,
      }
    ]
  }
];
