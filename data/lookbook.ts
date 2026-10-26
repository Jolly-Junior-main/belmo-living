import { LookbookRoom } from '@/types';

export const LOOKBOOK_ROOMS: LookbookRoom[] = [
  {
    id: 'room-01',
    title: 'The Tribeca Architectural Loft',
    roomType: 'Open Living & Gallery Sanctuary',
    architecturalNote: 'High ceilings, raw lime-wash plaster walls, and natural southern exposure paired with low-slung bouclé seating and travertine balance.',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        productId: 'prod-01',
        productName: 'Belmo Solace Modular Sofa',
        productSlug: 'belmo-solace-modular-sofa',
        price: 4850,
        x: 48,
        y: 65,
      },
      {
        productId: 'prod-03',
        productName: 'Belmo Monolith Travertine Table',
        productSlug: 'belmo-monolith-travertine-coffee-table',
        price: 3200,
        x: 62,
        y: 75,
      },
      {
        productId: 'prod-08',
        productName: 'Belmo Brutalist Cast Bronze Lamp',
        productSlug: 'belmo-brutalist-bronze-vessel-lamp',
        price: 850,
        x: 24,
        y: 52,
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
