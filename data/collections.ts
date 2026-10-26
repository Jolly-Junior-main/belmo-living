import { CollectionInfo } from '@/types';

export const COLLECTIONS: CollectionInfo[] = [
  {
    id: 'col-01',
    slug: 'architectural-atelier',
    title: 'The Architectural Atelier',
    subtitle: 'Pure geometry, grounded proportions, and rich tactile warmth.',
    description: 'Designed as structural centerpieces for contemporary residences. Emphasizing low-slung horizontal silhouettes, honest solid American walnut frames, and hand-tailored Italian textiles.',
    philosophy: 'Furniture should quiet the room, not clamor for attention. By distilling silhouettes to their structural essence, each piece becomes an enduring spatial anchor.',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85',
    palette: ['#F6F3ED', '#79563C', '#20201E', '#A98D6C'],
    productIds: ['prod-01', 'prod-02', 'prod-05', 'prod-06']
  },
  {
    id: 'col-02',
    slug: 'kanso-minimalist-line',
    title: 'The Kanso Minimalist Line',
    subtitle: 'Inspired by Japanese ryokan serenity and Danish organic modernism.',
    description: 'Unadorned simplicity that elevates everyday domestic rituals. Characterized by floating platform cantilevers, concealed joinery, and warm neutral linen bolster cushions.',
    philosophy: 'Kanso (簡素) is the art of eliminating the non-essential to reveal profound stillness. Here, materials speak in unforced whispers.',
    heroImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=85',
    palette: ['#E8DED0', '#6F4E37', '#F6F3ED'],
    productIds: ['prod-04', 'prod-02']
  },
  {
    id: 'col-03',
    slug: 'monolithic-stone-series',
    title: 'Monolithic Stone Series',
    subtitle: 'Ancient geological quarries sculpted for contemporary interiors.',
    description: 'Raw Roman travertine, Calacatta Viola, and honed granite blocks carved with architectural reverence. Each table reflects millions of years of earth formation.',
    philosophy: 'There is an honesty in stone that cannot be replicated. Our quarry masters preserve natural cavities and veining while honing touchable silky surfaces.',
    heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
    palette: ['#E5D8C5', '#3A3A38', '#A98D6C'],
    productIds: ['prod-03']
  },
  {
    id: 'col-04',
    slug: 'solstice-outdoor-collection',
    title: 'Solstice Outdoor Collection',
    subtitle: 'Open-air architectural sanctuaries that endure the seasons.',
    description: 'Crafted from sustainable Grade-A plantation teak and Sunbrella marine-grade textiles. Engineered to age gracefully from golden honey to silver patina over decades.',
    philosophy: 'The boundary between interior sanctuary and nature should dissolve effortlessly.',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
    palette: ['#C59B63', '#E8DED0', '#20201E'],
    productIds: ['prod-07']
  }
];
