'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { Product, Order } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  Shield,
  LayoutDashboard,
  Package,
  Calendar,
  Sliders,
  Users,
  Settings,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  Edit,
  Eye,
  AlertCircle,
  ExternalLink,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function AdminPage() {
  const { orders, appointments, quotes, updateOrderStatus, addToast } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'appointments' | 'quotes' | 'settings'>('overview');
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderFilter, setOrderFilter] = useState<'All' | Order['orderStatus']>('All');

  // Stats
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const pendingOrdersCount = orders.filter((o) => o.orderStatus !== 'Delivered').length;
  const pendingAppointmentsCount = appointments.filter((a) => a.status === 'Pending Review' || a.status === 'Confirmed').length;
  const openQuotesCount = quotes.filter((q) => q.status === 'New' || q.status === 'In Discussion').length;

  // Toggle inStock for a product
  const toggleProductStock = (productId: string) => {
    setProductsList((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStatus = !p.inStock;
          addToast('Inventory Updated', `${p.name} marked as ${newStatus ? 'In Stock' : 'Out of Stock'}.`);
          return { ...p, inStock: newStatus };
        }
        return p;
      })
    );
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter !== 'All' && o.orderStatus !== orderFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.firstName.toLowerCase().includes(q) ||
        o.customer.lastName.toLowerCase().includes(q) ||
        o.customer.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered products
  const filteredProducts = productsList.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="pt-24 pb-20 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Admin Header */}
        <div className="bg-belmo-charcoal text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
          <div className="flex items-center gap-5">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-belmo-gold/60 p-0.5 bg-belmo-charcoal shadow-lg">
              <Image
                src="/images/logo-circle.png"
                alt="Belmo Living Crest"
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-belmo-gold">
                  Belmo Living Studio OS v2.4 • Active
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                Executive Showroom Console
              </h1>
              <p className="text-xs text-belmo-beige/70 font-light">
                Real-time monitoring of customer commissions, bespoke 3D quotes, and flagship appointments.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs tracking-wider uppercase rounded-xl transition-colors flex items-center gap-2 font-medium"
            >
              <span>View Public Showroom</span>
              <ExternalLink className="w-3.5 h-3.5 text-belmo-bronze-light" />
            </Link>
          </div>
        </div>

        {/* Console Navigation Tabs */}
        <div className="flex gap-2 border-b border-belmo-charcoal/10 pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-full text-xs tracking-editorial uppercase transition-all shrink-0 font-medium flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-belmo-charcoal text-white shadow-md'
                : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview & KPIs</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-full text-xs tracking-editorial uppercase transition-all shrink-0 font-medium flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-belmo-charcoal text-white shadow-md'
                : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-full text-xs tracking-editorial uppercase transition-all shrink-0 font-medium flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-belmo-charcoal text-white shadow-md'
                : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Product Catalog & Stock ({productsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-5 py-2.5 rounded-full text-xs tracking-editorial uppercase transition-all shrink-0 font-medium flex items-center gap-2 ${
              activeTab === 'appointments'
                ? 'bg-belmo-charcoal text-white shadow-md'
                : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Showroom Salon Bookings ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-5 py-2.5 rounded-full text-xs tracking-editorial uppercase transition-all shrink-0 font-medium flex items-center gap-2 ${
              activeTab === 'quotes'
                ? 'bg-belmo-charcoal text-white shadow-md'
                : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Quotes ({quotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-full text-xs tracking-editorial uppercase transition-all shrink-0 font-medium flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-belmo-charcoal text-white shadow-md'
                : 'bg-white border border-belmo-charcoal/10 text-belmo-charcoal hover:bg-belmo-cream'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Gateways & WhatsApp</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-belmo-charcoal/10 shadow-sm space-y-2">
                <span className="text-[10px] font-mono tracking-luxury uppercase text-belmo-walnut block">
                  Gross Commission Revenue
                </span>
                <p className="font-serif text-3xl font-medium text-belmo-charcoal">
                  {formatPrice(totalRevenue)}
                </p>
                <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  +18.4% vs Last Cycle
                </span>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-belmo-charcoal/10 shadow-sm space-y-2">
                <span className="text-[10px] font-mono tracking-luxury uppercase text-belmo-walnut block">
                  Active Atelier Commissions
                </span>
                <p className="font-serif text-3xl font-medium text-belmo-charcoal">
                  {pendingOrdersCount} In Production
                </p>
                <span className="text-[11px] text-belmo-charcoal/60">
                  {orders.length} Cumulative Total
                </span>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-belmo-charcoal/10 shadow-sm space-y-2">
                <span className="text-[10px] font-mono tracking-luxury uppercase text-belmo-walnut block">
                  Flagship Salon Bookings
                </span>
                <p className="font-serif text-3xl font-medium text-belmo-charcoal">
                  {pendingAppointmentsCount} Scheduled
                </p>
                <span className="text-[11px] text-belmo-walnut font-medium">
                  Soho Flagship Gallery
                </span>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-belmo-charcoal/10 shadow-sm space-y-2">
                <span className="text-[10px] font-mono tracking-luxury uppercase text-belmo-walnut block">
                  Pending Custom Quotes
                </span>
                <p className="font-serif text-3xl font-medium text-belmo-charcoal">
                  {openQuotesCount} Open Inquiries
                </p>
                <span className="text-[11px] text-belmo-charcoal/60">
                  3D Customizer Leads
                </span>
              </div>
            </div>

            {/* Quick Action Tables in Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-belmo-charcoal/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-belmo-charcoal/10 pb-4">
                  <h3 className="font-serif text-xl text-belmo-charcoal font-normal">
                    Latest Commissions
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-belmo-walnut font-semibold hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="divide-y divide-belmo-charcoal/10">
                  {orders.slice(0, 3).map((ord) => (
                    <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-belmo-charcoal block">
                          {ord.orderNumber} • {ord.customer.firstName} {ord.customer.lastName}
                        </span>
                        <span className="text-[11px] text-belmo-charcoal/60">
                          {formatDate(ord.createdAt)} • {ord.fulfillmentType}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-belmo-charcoal block">
                          {formatPrice(ord.total)}
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-belmo-walnut">
                          {ord.orderStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Appointments Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-belmo-charcoal/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-belmo-charcoal/10 pb-4">
                  <h3 className="font-serif text-xl text-belmo-charcoal font-normal">
                    Upcoming Showroom Salons
                  </h3>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs text-belmo-walnut font-semibold hover:underline"
                  >
                    Manage Schedule →
                  </button>
                </div>

                <div className="divide-y divide-belmo-charcoal/10">
                  {appointments.slice(0, 3).map((apt) => (
                    <div key={apt.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-belmo-charcoal block">
                          {apt.fullName} ({apt.partySize} Guests)
                        </span>
                        <span className="text-[11px] text-belmo-charcoal/60">
                          {apt.preferredDate} at {apt.preferredTime}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-emerald-50 text-emerald-700">
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDER MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filter toolbar */}
            <div className="bg-white rounded-2xl p-4 border border-belmo-charcoal/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {(['All', 'Processing', 'In Production / Atelier', 'White-Glove In Transit', 'Delivered'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider text-[11px] transition-all shrink-0 ${
                      orderFilter === st
                        ? 'bg-belmo-charcoal text-white font-medium'
                        : 'bg-belmo-cream text-belmo-charcoal hover:bg-belmo-beige/40'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-belmo-charcoal/40" />
                <input
                  type="text"
                  placeholder="Filter order number, client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-4 py-1.5 rounded-lg border border-belmo-charcoal/15 text-xs bg-belmo-ivory focus:outline-none"
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-belmo-charcoal/10 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-belmo-cream/60 border-b border-belmo-charcoal/10 uppercase tracking-wider text-[10px] text-belmo-charcoal/70">
                    <tr>
                      <th className="py-4 px-6">Order ID</th>
                      <th className="py-4 px-6">Client</th>
                      <th className="py-4 px-6">Items & Spec</th>
                      <th className="py-4 px-6">Fulfillment</th>
                      <th className="py-4 px-6">Total</th>
                      <th className="py-4 px-6">Status Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-belmo-charcoal/10">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-belmo-cream/20 transition-colors">
                        <td className="py-4 px-6 font-mono font-semibold text-belmo-charcoal">
                          {ord.orderNumber}
                          <span className="block text-[10px] text-belmo-charcoal/40 font-sans">
                            {formatDate(ord.createdAt)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-belmo-charcoal block">
                            {ord.customer.firstName} {ord.customer.lastName}
                          </span>
                          <span className="text-[11px] text-belmo-charcoal/60 block">
                            {ord.customer.email}
                          </span>
                          <span className="text-[11px] text-belmo-charcoal/60 block">
                            {ord.customer.city}, {ord.customer.state}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-medium text-belmo-charcoal block">
                            {ord.items.length} Curated {ord.items.length === 1 ? 'Piece' : 'Pieces'}
                          </span>
                          <span className="text-[11px] text-belmo-charcoal/60 truncate block max-w-xs">
                            {ord.items.map((it) => it.productName).join(', ')}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-medium text-belmo-charcoal block">
                            {ord.fulfillmentType}
                          </span>
                          <span className="font-mono text-[10px] text-belmo-walnut">
                            {ord.trackingNumber}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-serif font-medium text-sm text-belmo-charcoal">
                          {formatPrice(ord.total)}
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                            className="px-2.5 py-1.5 rounded-lg border border-belmo-charcoal/15 text-xs bg-belmo-ivory focus:outline-none cursor-pointer"
                          >
                            <option value="Processing">Processing</option>
                            <option value="In Production / Atelier">In Production / Atelier</option>
                            <option value="White-Glove In Transit">White-Glove In Transit</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCT CATALOG & STOCK CONTROL */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-4 border border-belmo-charcoal/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="relative flex-1 max-w-md">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-belmo-charcoal/40" />
                <input
                  type="text"
                  placeholder="Filter by piece name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-belmo-charcoal/15 text-xs bg-belmo-ivory focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-belmo-charcoal/60">
                  {filteredProducts.length} Items Listed
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-belmo-charcoal/10 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-belmo-cream/60 border-b border-belmo-charcoal/10 uppercase tracking-wider text-[10px] text-belmo-charcoal/70">
                    <tr>
                      <th className="py-4 px-6">Piece</th>
                      <th className="py-4 px-6">Category & Collection</th>
                      <th className="py-4 px-6">Investment Price</th>
                      <th className="py-4 px-6">Stock Status</th>
                      <th className="py-4 px-6">Stock Inventory</th>
                      <th className="py-4 px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-belmo-charcoal/10">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-belmo-cream/20 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-belmo-beige/30 shrink-0">
                              <Image src={p.heroImage} alt={p.name} fill sizes="48px" className="object-cover" />
                            </div>
                            <div>
                              <span className="font-serif font-medium text-sm text-belmo-charcoal block">
                                {p.name}
                              </span>
                              <span className="text-[10px] text-belmo-charcoal/50">
                                {p.variants.length} Material Finishes
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-medium text-belmo-charcoal block">{p.category}</span>
                          <span className="text-[11px] text-belmo-walnut block">{p.collection}</span>
                        </td>
                        <td className="py-4 px-6 font-serif font-medium text-sm text-belmo-charcoal">
                          {formatPrice(p.price)}
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => toggleProductStock(p.id)}
                            className={`px-3 py-1 rounded-full text-[10px] uppercase font-semibold transition-colors ${
                              p.inStock
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                          >
                            {p.inStock ? 'In Stock' : 'Archived / Out'}
                          </button>
                        </td>
                        <td className="py-4 px-6 font-mono text-xs">
                          {p.stockCount} Units Atelier Ready
                        </td>
                        <td className="py-4 px-6">
                          <Link
                            href={`/product/${p.slug}`}
                            target="_blank"
                            className="text-xs text-belmo-walnut font-medium hover:underline inline-flex items-center gap-1"
                          >
                            <span>Live View</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-belmo-charcoal/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-belmo-charcoal/10 pb-4">
                <h3 className="font-serif text-xl text-belmo-charcoal font-normal">
                  Soho Flagship Scheduled Viewings
                </h3>
                <span className="text-xs text-belmo-charcoal/60">
                  {appointments.length} Total Registered
                </span>
              </div>

              <div className="divide-y divide-belmo-charcoal/10">
                {appointments.map((apt) => (
                  <div key={apt.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-base font-medium text-belmo-charcoal">
                          {apt.fullName}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-emerald-50 text-emerald-700">
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-belmo-charcoal/70">
                        {apt.email} • {apt.phone}
                      </p>
                      <p className="text-belmo-walnut font-medium">
                        {apt.preferredDate} at {apt.preferredTime} • {apt.partySize} Guest(s)
                      </p>
                      {apt.notes && (
                        <p className="italic text-belmo-charcoal/60 pt-0.5">
                          Notes: &ldquo;{apt.notes}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(apt.fullName)},%20this%20is%20the%20Belmo%20Living%20Soho%20Flagship%20confirming%20your%20appointment.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-belmo-charcoal/20 hover:bg-belmo-cream rounded-xl text-xs uppercase tracking-wider text-belmo-charcoal transition-colors flex items-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-belmo-walnut" />
                        <span>Contact Client</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BESPOKE QUOTES */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-belmo-charcoal/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-belmo-charcoal/10 pb-4">
                <h3 className="font-serif text-xl text-belmo-charcoal font-normal">
                  Incoming 3D Customizer Specifications
                </h3>
                <span className="text-xs text-belmo-charcoal/60">
                  {quotes.length} Bespoke Inquiries
                </span>
              </div>

              <div className="divide-y divide-belmo-charcoal/10">
                {quotes.map((q) => (
                  <div key={q.id} className="py-5 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-serif text-base font-medium text-belmo-charcoal">
                          {q.fullName}
                          {q.companyOrDesigner ? ` (${q.companyOrDesigner})` : ''}
                        </span>
                        <p className="text-belmo-charcoal/60">
                          {q.email} • {q.phone} • Destination: {q.deliveryAddress || 'Pending'}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-base font-medium text-belmo-charcoal block">
                          {formatPrice(q.spec.estimatedPrice)}
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-belmo-walnut">
                          {q.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-belmo-ivory grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <span className="text-[10px] uppercase text-belmo-walnut block">Piece & Scale</span>
                        <span className="font-medium text-belmo-charcoal">{q.spec.baseProductName} ({q.spec.configuration})</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-belmo-walnut block">Textile</span>
                        <span className="font-medium text-belmo-charcoal">{q.spec.fabricName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-belmo-walnut block">Hardwood</span>
                        <span className="font-medium text-belmo-charcoal">{q.spec.woodFinishName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-belmo-walnut block">Hardware</span>
                        <span className="font-medium text-belmo-charcoal">{q.spec.hardwareName}</span>
                      </div>
                    </div>

                    {q.spec.customNotes && (
                      <p className="text-xs text-belmo-charcoal/70 italic">
                        Bespoke Notes: &ldquo;{q.spec.customNotes}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS & GATEWAYS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-belmo-charcoal/10 shadow-sm max-w-3xl space-y-8 text-xs">
            <div className="border-b border-belmo-charcoal/10 pb-4">
              <h3 className="font-serif text-2xl text-belmo-charcoal font-normal">
                Payment Gateways & Concierge Infrastructure
              </h3>
              <p className="text-belmo-charcoal/60 mt-1">
                Configure provider environments for client transactions without placeholder confirmation mockups.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-belmo-cream/50 border border-belmo-charcoal/10 space-y-2">
                <span className="font-semibold text-belmo-charcoal uppercase tracking-wider text-[11px] block">
                  Credit Card Processing (Stripe / Adyen Luxury Merchant)
                </span>
                <p className="text-belmo-charcoal/70">
                  Status: Ready for Production Keys. Currently operating in Sandbox Atelier Mode.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-belmo-cream/50 border border-belmo-charcoal/10 space-y-2">
                <span className="font-semibold text-belmo-charcoal uppercase tracking-wider text-[11px] block">
                  Private Banking & Wire Transfer Protocol
                </span>
                <p className="text-belmo-charcoal/70">
                  Beneficiary: Belmo Living LLC (Chase Manhattan Private Client, New York, NY)
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-belmo-cream/50 border border-belmo-charcoal/10 space-y-2">
                <span className="font-semibold text-belmo-charcoal uppercase tracking-wider text-[11px] block">
                  Verified WhatsApp Concierge Hotline
                </span>
                <p className="text-belmo-charcoal/70">
                  Current Connected Line: +1 (800) 482-BELMO (+1 800-482-3566)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
