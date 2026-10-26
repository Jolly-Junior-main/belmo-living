'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ShowroomAppointment, CustomQuoteRequest, Order } from '@/types';
import { PRODUCTS } from '@/data/products';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}

interface ShopContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, options?: {
    variantId?: string;
    variantName?: string;
    fabric?: string;
    woodFinish?: string;
    configuration?: string;
    quantity?: number;
    price?: number;
    isCustom?: boolean;
  }) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;

  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  appointments: ShowroomAppointment[];
  bookAppointment: (data: Omit<ShowroomAppointment, 'id' | 'createdAt' | 'status'>) => Promise<ShowroomAppointment>;

  quotes: CustomQuoteRequest[];
  submitQuoteRequest: (data: Omit<CustomQuoteRequest, 'id' | 'createdAt' | 'status'>) => Promise<CustomQuoteRequest>;

  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'orderStatus' | 'paymentStatus'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const INITIAL_APPOINTMENTS: ShowroomAppointment[] = [
  {
    id: 'apt-101',
    fullName: 'Eleanor Vance',
    email: 'eleanor.vance@studioarch.com',
    phone: '+1 (555) 392-1084',
    preferredDate: '2026-10-24',
    preferredTime: '14:00',
    location: 'Belmo Flagship Studio — 482 Broome St, Soho, NY',
    partySize: 2,
    projectScope: 'Full Penthouse Living & Dining Curation',
    notes: 'Interested in bespoke upholstery swatches for the Solace sectional.',
    status: 'Confirmed',
    createdAt: '2026-10-18T10:30:00Z',
  },
  {
    id: 'apt-102',
    fullName: 'Julian Hayes',
    email: 'j.hayes@hayesdesign.co',
    phone: '+1 (555) 782-9901',
    preferredDate: '2026-10-28',
    preferredTime: '11:00',
    location: 'Belmo Flagship Studio — 482 Broome St, Soho, NY',
    partySize: 1,
    projectScope: 'Executive Office Desks & Lounge Seating',
    status: 'Pending Review',
    createdAt: '2026-10-19T09:15:00Z',
  }
];

const INITIAL_QUOTES: CustomQuoteRequest[] = [
  {
    id: 'quote-201',
    fullName: 'Sophia Laurent',
    email: 'sophia@laurentinteriors.com',
    phone: '+1 (555) 612-4482',
    companyOrDesigner: 'Laurent Interiors NY',
    budgetRange: '$15,000 - $30,000',
    deliveryAddress: 'Central Park West, New York, NY',
    status: 'In Discussion',
    createdAt: '2026-10-17T16:00:00Z',
    spec: {
      baseProductId: 'prod-01',
      baseProductName: 'Belmo Solace Modular Sofa',
      configuration: 'Corner L-Sectional',
      fabric: 'boucle-creme',
      fabricName: 'Italian Cashmere Bouclé (Chalk)',
      woodFinish: 'natural-walnut',
      woodFinishName: 'Solid American Walnut',
      hardware: 'brushed-bronze',
      hardwareName: 'Brushed Champagne Bronze',
      cushionFill: 'Organic Wool & Goose Down',
      estimatedPrice: 6850,
      leadTime: '4-5 Weeks',
      customNotes: 'Custom left-facing chaise with integrated marble end-table insert.'
    }
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-801',
    orderNumber: 'BL-98214',
    createdAt: '2026-10-15T14:20:00Z',
    customer: {
      firstName: 'Marcus',
      lastName: 'Sterling',
      email: 'm.sterling@luxuryresidences.com',
      phone: '+1 (555) 902-3112',
      address: '740 Park Avenue, Apt 11B',
      city: 'New York',
      state: 'NY',
      postalCode: '10021',
      country: 'United States'
    },
    fulfillmentType: 'White-Glove Delivery & Installation',
    items: [
      {
        id: 'item-1',
        productId: 'prod-01',
        productName: 'Belmo Solace Modular Sofa',
        productSlug: 'belmo-solace-modular-sofa',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85',
        price: 4850,
        quantity: 1,
        variantName: 'Ivory Tactile Bouclé / American Walnut',
      },
      {
        id: 'item-2',
        productId: 'prod-03',
        productName: 'Belmo Monolith Travertine Table',
        productSlug: 'belmo-monolith-travertine-coffee-table',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        price: 3200,
        quantity: 1,
      }
    ],
    subtotal: 8050,
    shipping: 0,
    tax: 714,
    total: 8764,
    paymentMethod: 'Credit / Debit Card',
    paymentStatus: 'Paid',
    orderStatus: 'In Production / Atelier',
    trackingNumber: 'BL-WG-9021-USA'
  }
];

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [appointments, setAppointments] = useState<ShowroomAppointment[]>(INITIAL_APPOINTMENTS);
  const [quotes, setQuotes] = useState<CustomQuoteRequest[]>(INITIAL_QUOTES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedCart = localStorage.getItem('belmo_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('belmo_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedAppointments = localStorage.getItem('belmo_appointments');
      if (savedAppointments) setAppointments(JSON.parse(savedAppointments));

      const savedQuotes = localStorage.getItem('belmo_quotes');
      if (savedQuotes) setQuotes(JSON.parse(savedQuotes));

      const savedOrders = localStorage.getItem('belmo_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (e) {
      console.error('Error loading Belmo Living client state:', e);
    }
  }, []);

  // Save changes
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('belmo_cart', JSON.stringify(cart));
    } catch {}
  }, [cart, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('belmo_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('belmo_appointments', JSON.stringify(appointments));
    } catch {}
  }, [appointments, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('belmo_quotes', JSON.stringify(quotes));
    } catch {}
  }, [quotes, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('belmo_orders', JSON.stringify(orders));
    } catch {}
  }, [orders, mounted]);

  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart: ShopContextType['addToCart'] = (product, options) => {
    const instanceId = `${product.id}-${options?.variantId || 'standard'}-${options?.fabric || ''}-${options?.woodFinish || ''}-${options?.configuration || ''}`;
    
    setCart((prev) => {
      const existing = prev.find((item) => item.id === instanceId);
      if (existing) {
        return prev.map((item) =>
          item.id === instanceId
            ? { ...item, quantity: item.quantity + (options?.quantity || 1) }
            : item
        );
      }
      const newItem: CartItem = {
        id: instanceId,
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        image: options?.variantId
          ? product.variants.find((v) => v.id === options.variantId)?.image || product.heroImage
          : product.heroImage,
        price: options?.price !== undefined ? options.price : product.price,
        quantity: options?.quantity || 1,
        variantId: options?.variantId,
        variantName: options?.variantName,
        fabric: options?.fabric,
        woodFinish: options?.woodFinish,
        configuration: options?.configuration,
        isCustom: options?.isCustom,
      };
      return [...prev, newItem];
    });

    addToast('Added to Atelier Cart', `${product.name} has been placed in your selection.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    addToast('Item Removed', 'The item was removed from your cart.', 'info');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast('Removed from Wishlist', 'Item removed from your curated wish list.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        const prod = PRODUCTS.find((p) => p.id === productId);
        addToast('Saved to Wishlist', `${prod?.name || 'Item'} saved to your private curation.`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const bookAppointment = async (data: Omit<ShowroomAppointment, 'id' | 'createdAt' | 'status'>) => {
    const newApt: ShowroomAppointment = {
      ...data,
      id: `apt-${Date.now().toString().slice(-4)}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newApt, ...prev]);
    addToast('Private Viewing Confirmed', `We look forward to welcoming you on ${data.preferredDate} at ${data.preferredTime}.`);
    return newApt;
  };

  const submitQuoteRequest = async (data: Omit<CustomQuoteRequest, 'id' | 'createdAt' | 'status'>) => {
    const newQuote: CustomQuoteRequest = {
      ...data,
      id: `quote-${Date.now().toString().slice(-4)}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    setQuotes((prev) => [newQuote, ...prev]);
    addToast('Bespoke Specification Received', 'Our master design atelier will contact you within 24 hours with material swatches and 3D technical drawings.');
    return newQuote;
  };

  const createOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'orderStatus' | 'paymentStatus'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `BL-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      orderStatus: 'Processing',
      paymentStatus: 'Paid',
      trackingNumber: `BL-WG-${Math.floor(1000 + Math.random() * 9000)}-USA`
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addToast('Belmo Living Order Placed', `Order ${newOrder.orderNumber} confirmed. White-glove concierge is preparing your commission.`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: status } : ord))
    );
    addToast('Order Status Updated', `Order marked as ${status}.`);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        toasts,
        addToast,
        removeToast,
        isSearchOpen,
        setIsSearchOpen,
        appointments,
        bookAppointment,
        quotes,
        submitQuoteRequest,
        orders,
        createOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
