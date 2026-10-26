export interface ProductVariant {
  id: string;
  name: string;
  material: string;
  woodFinish?: string;
  colorHex: string;
  priceDelta: number;
  image: string;
  inStock: boolean;
}

export interface ProductDimensions {
  width: string;
  depth: string;
  height: string;
  seatHeight?: string;
  weight: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categorySlug: string;
  collection: string;
  collectionSlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'Signature' | 'New' | 'Bespoke' | 'Limited Edition' | 'Architectural';
  description: string;
  story: string;
  craftDetails: string[];
  materials: string[];
  dimensions: ProductDimensions;
  leadTime: string;
  featured: boolean;
  heroImage: string;
  galleryImages: string[];
  variants: ProductVariant[];
  inStock: boolean;
  stockCount: number;
  customizable: boolean;
  specSheetUrl?: string;
}

export type ProductCategory =
  | 'Sofas & Sectionals'
  | 'Chairs & Loungers'
  | 'Living Room Furniture'
  | 'Bedroom Furniture'
  | 'Dining Room Furniture'
  | 'Office Furniture'
  | 'Outdoor Furniture'
  | 'Home Accessories';

export interface CategoryInfo {
  name: ProductCategory;
  slug: string;
  headline: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CollectionInfo {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  philosophy: string;
  heroImage: string;
  palette: string[];
  productIds: string[];
}

export interface LookbookRoom {
  id: string;
  title: string;
  roomType: string;
  architecturalNote: string;
  mainImage: string;
  hotspots: {
    productId: string;
    productName: string;
    productSlug: string;
    price: number;
    x: number; // percentage 0-100
    y: number; // percentage 0-100
  }[];
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  productName: string;
  productSlug: string;
  image: string;
  price: number;
  quantity: number;
  variantId?: string;
  variantName?: string;
  fabric?: string;
  woodFinish?: string;
  configuration?: string;
  isCustom?: boolean;
}

export interface CustomFurnitureSpec {
  baseProductId: string;
  baseProductName: string;
  configuration: '2-Seater' | '3-Seater Grande' | 'Corner L-Sectional' | 'Architectural Chaise';
  fabric: string;
  fabricName: string;
  woodFinish: string;
  woodFinishName: string;
  hardware: string;
  hardwareName: string;
  cushionFill: 'High-Resilience Cloud Foam' | 'Organic Wool & Goose Down' | 'Firm Ergonomic Core';
  customNotes?: string;
  estimatedPrice: number;
  leadTime: string;
}

export interface ShowroomAppointment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  partySize: number;
  projectScope: string;
  notes?: string;
  status: 'Confirmed' | 'Pending Review' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface CustomQuoteRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyOrDesigner?: string;
  spec: CustomFurnitureSpec;
  budgetRange: string;
  deliveryAddress: string;
  status: 'New' | 'In Discussion' | 'Quoted' | 'Approved';
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  fulfillmentType: 'White-Glove Delivery & Installation' | 'Showroom Private Pickup';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: 'Credit / Debit Card' | 'Wire Transfer' | 'Apple Pay' | 'Bespoke Invoice';
  paymentStatus: 'Paid' | 'Pending Verification' | 'Authorized';
  orderStatus: 'Processing' | 'In Production / Atelier' | 'White-Glove In Transit' | 'Delivered';
  trackingNumber?: string;
  notes?: string;
}
