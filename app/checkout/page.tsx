'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { formatPrice } from '@/lib/utils';
import { Order } from '@/types';
import {
  ShieldCheck,
  Truck,
  Building2,
  CreditCard,
  Landmark,
  Check,
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartSubtotal, createOrder, clearCart } = useShop();

  const [fulfillmentType, setFulfillmentType] = useState<'White-Glove Delivery & Installation' | 'Showroom Private Pickup'>('White-Glove Delivery & Installation');
  const [paymentMethod, setPaymentMethod] = useState<'Credit / Debit Card' | 'Wire Transfer' | 'Apple Pay' | 'Bespoke Invoice'>('Credit / Debit Card');

  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'NY',
    postalCode: '',
    country: 'United States',
    notes: '',
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expDate: '',
    cvc: '',
    cardName: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const freeDeliveryThreshold = 3000;
  const deliveryCost = fulfillmentType === 'Showroom Private Pickup' || cartSubtotal >= freeDeliveryThreshold ? 0 : 350;
  const estimatedTax = Math.round(cartSubtotal * 0.08875);
  const grandTotal = cartSubtotal + deliveryCost + estimatedTax;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsSubmitting(true);

    try {
      const order = await createOrder({
        customer: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          address: customer.address || 'Showroom Pickup — 482 Broome St',
          city: customer.city || 'New York',
          state: customer.state || 'NY',
          postalCode: customer.postalCode || '10013',
          country: customer.country,
        },
        fulfillmentType,
        items: [...cart],
        subtotal: cartSubtotal,
        shipping: deliveryCost,
        tax: estimatedTax,
        total: grandTotal,
        paymentMethod,
        notes: customer.notes,
      });

      setConfirmedOrder(order);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If order was successfully confirmed
  if (confirmedOrder) {
    return (
      <div className="pt-32 pb-28 min-h-screen bg-belmo-ivory text-belmo-charcoal select-none">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-belmo-charcoal/10 shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-belmo-cream text-belmo-walnut mx-auto flex items-center justify-center border border-belmo-charcoal/10">
              <Check className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-luxury uppercase text-belmo-walnut font-semibold">
                Commission Confirmed
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-belmo-charcoal font-normal">
                Thank You, {confirmedOrder.customer.firstName}.
              </h1>
              <p className="text-xs sm:text-sm text-belmo-charcoal/70 max-w-md mx-auto leading-relaxed">
                Your commission has been entered into the Belmo Living atelier schedule under order identifier <span className="font-mono font-bold text-belmo-charcoal">{confirmedOrder.orderNumber}</span>.
              </p>
            </div>

            {/* Order Details Receipt Box */}
            <div className="text-left bg-belmo-ivory rounded-2xl p-6 border border-belmo-charcoal/10 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-belmo-charcoal/10 pb-3">
                <span className="text-belmo-charcoal/60">Fulfillment Method</span>
                <span className="font-semibold text-belmo-charcoal">{confirmedOrder.fulfillmentType}</span>
              </div>

              <div className="flex items-center justify-between border-b border-belmo-charcoal/10 pb-3">
                <span className="text-belmo-charcoal/60">Payment Protocol</span>
                <span className="font-semibold text-belmo-charcoal">{confirmedOrder.paymentMethod}</span>
              </div>

              <div className="flex items-center justify-between border-b border-belmo-charcoal/10 pb-3">
                <span className="text-belmo-charcoal/60">White-Glove Tracking ID</span>
                <span className="font-mono font-semibold text-belmo-walnut">{confirmedOrder.trackingNumber}</span>
              </div>

              {/* Items summary */}
              <div className="space-y-2 pt-1">
                <span className="font-semibold text-belmo-charcoal uppercase tracking-wider text-[10px]">
                  Ordered Pieces ({confirmedOrder.items.length})
                </span>
                {confirmedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <span className="truncate max-w-[70%]">
                      {item.quantity}x {item.productName}
                      {item.variantName ? ` (${item.variantName})` : ''}
                    </span>
                    <span className="font-medium text-belmo-charcoal">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-belmo-charcoal/10 pt-3 flex justify-between text-sm font-serif font-medium text-belmo-charcoal">
                <span>Total Commission Amount</span>
                <span>{formatPrice(confirmedOrder.total)}</span>
              </div>
            </div>

            <p className="text-xs text-belmo-charcoal/60 max-w-sm mx-auto">
              A master design concierge will reach out via email ({confirmedOrder.customer.email}) within 24 hours to coordinate fabrication milestones.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/account"
                className="w-full sm:w-auto px-8 py-3.5 bg-belmo-charcoal text-white text-xs tracking-editorial uppercase rounded-full hover:bg-belmo-walnut transition-colors font-semibold shadow-md"
              >
                View in Customer Account
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 border border-belmo-charcoal/20 text-belmo-charcoal text-xs tracking-editorial uppercase rounded-full hover:bg-belmo-cream transition-colors font-medium"
              >
                Return to Showroom
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center max-w-md mx-auto px-6">
        <h2 className="font-serif text-3xl text-belmo-charcoal mb-4">No Pieces in Cart</h2>
        <p className="text-xs text-belmo-charcoal/70 mb-6">Please select furniture pieces from the showroom before proceeding to checkout.</p>
        <Link href="/shop" className="px-6 py-3 bg-belmo-charcoal text-white text-xs tracking-editorial uppercase rounded-md">
          Explore Furniture Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="border-b border-belmo-charcoal/10 pb-8 mb-12 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-belmo-walnut">
            <Link href="/cart" className="hover:underline">Atelier Cart</Link>
            <span>/</span>
            <span>White-Glove Checkout</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-belmo-charcoal font-normal tracking-tight">
            Checkout & Commission
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Input Sections */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-8">
              {/* 1. Fulfillment Selection */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-belmo-charcoal/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl text-belmo-charcoal font-normal">
                    1. Fulfillment Method
                  </h2>
                  <span className="text-[10px] tracking-luxury uppercase text-belmo-walnut font-semibold">
                    Step 1 of 3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('White-Glove Delivery & Installation')}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      fulfillmentType === 'White-Glove Delivery & Installation'
                        ? 'border-belmo-walnut bg-belmo-cream ring-1 ring-belmo-walnut shadow-sm'
                        : 'border-belmo-charcoal/10 hover:border-belmo-charcoal/30 bg-white'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-belmo-walnut shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-belmo-charcoal">
                        White-Glove In-Home Installation
                      </h4>
                      <p className="text-[11px] text-belmo-charcoal/70 mt-1 leading-relaxed">
                        Two-person inside room placement, uncrating, full assembly, and packaging disposal.
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-semibold text-emerald-700 uppercase">
                        {cartSubtotal >= freeDeliveryThreshold ? 'Complimentary' : '$350 Flat White Glove'}
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFulfillmentType('Showroom Private Pickup')}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      fulfillmentType === 'Showroom Private Pickup'
                        ? 'border-belmo-walnut bg-belmo-cream ring-1 ring-belmo-walnut shadow-sm'
                        : 'border-belmo-charcoal/10 hover:border-belmo-charcoal/30 bg-white'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-belmo-walnut shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-belmo-charcoal">
                        Showroom Private Pickup
                      </h4>
                      <p className="text-[11px] text-belmo-charcoal/70 mt-1 leading-relaxed">
                        Pick up directly from the Belmo Soho Flagship Studio with our loading dock crew.
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-semibold text-emerald-700 uppercase">
                        Complimentary
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* 2. Contact & Delivery Address */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-belmo-charcoal/10 shadow-sm space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl text-belmo-charcoal font-normal">
                    2. Client & Delivery Details
                  </h2>
                  <span className="text-[10px] tracking-luxury uppercase text-belmo-walnut font-semibold">
                    Step 2 of 3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.firstName}
                      onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                      placeholder="Marcus"
                      className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.lastName}
                      onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                      placeholder="Sterling"
                      className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      placeholder="m.sterling@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                    />
                  </div>
                </div>

                {fulfillmentType === 'White-Glove Delivery & Installation' && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                        Street Address & Residence / Apt / Suite *
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.address}
                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                        placeholder="740 Park Avenue, Penthouse B"
                        className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={customer.city}
                          onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                          placeholder="New York"
                          className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={customer.state}
                          onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                          placeholder="NY"
                          className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={customer.postalCode}
                          onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                          placeholder="10021"
                          className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                    Special Delivery Notes / Building Freight Elevator Access
                  </label>
                  <textarea
                    rows={2}
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder="e.g. Service elevator booking required; delivery on Friday afternoon preferred."
                    className="w-full px-4 py-2 rounded-xl border border-belmo-charcoal/15 bg-belmo-cream/40 focus:outline-none focus:border-belmo-walnut"
                  />
                </div>
              </div>

              {/* 3. Configurable Payment Selection */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-belmo-charcoal/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl text-belmo-charcoal font-normal">
                    3. Payment Protocol
                  </h2>
                  <span className="text-[10px] tracking-luxury uppercase text-belmo-walnut font-semibold">
                    Step 3 of 3
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Credit / Debit Card')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'Credit / Debit Card'
                        ? 'border-belmo-walnut bg-belmo-cream font-medium ring-1 ring-belmo-walnut'
                        : 'border-belmo-charcoal/10 hover:border-belmo-charcoal/30 bg-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-belmo-walnut" />
                    <span className="text-[11px] block">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Wire Transfer')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'Wire Transfer'
                        ? 'border-belmo-walnut bg-belmo-cream font-medium ring-1 ring-belmo-walnut'
                        : 'border-belmo-charcoal/10 hover:border-belmo-charcoal/30 bg-white'
                    }`}
                  >
                    <Landmark className="w-5 h-5 mx-auto mb-1 text-belmo-walnut" />
                    <span className="text-[11px] block">Bank Wire</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Apple Pay')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'Apple Pay'
                        ? 'border-belmo-walnut bg-belmo-cream font-medium ring-1 ring-belmo-walnut'
                        : 'border-belmo-charcoal/10 hover:border-belmo-charcoal/30 bg-white'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 mx-auto mb-1 text-belmo-walnut" />
                    <span className="text-[11px] block">Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Bespoke Invoice')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'Bespoke Invoice'
                        ? 'border-belmo-walnut bg-belmo-cream font-medium ring-1 ring-belmo-walnut'
                        : 'border-belmo-charcoal/10 hover:border-belmo-charcoal/30 bg-white'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-1 text-belmo-walnut" />
                    <span className="text-[11px] block">Trade Net 30</span>
                  </button>
                </div>

                {/* Card input mockup */}
                {paymentMethod === 'Credit / Debit Card' && (
                  <div className="p-4 rounded-2xl bg-belmo-cream/50 border border-belmo-charcoal/10 space-y-3 pt-4 text-xs">
                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={cardDetails.expDate}
                          onChange={(e) => setCardDetails({ ...cardDetails, expDate: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-belmo-charcoal block mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          placeholder="•••"
                          value={cardDetails.cvc}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-belmo-charcoal/15 bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-belmo-charcoal/10 shadow-xl space-y-6">
              <h3 className="font-serif text-xl text-belmo-charcoal font-normal">
                Order Review
              </h3>

              {/* Items List */}
              <div className="divide-y divide-belmo-charcoal/10 max-h-72 overflow-y-auto no-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-belmo-beige/30 shrink-0">
                      <Image src={item.image} alt={item.productName} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <h4 className="font-serif font-medium text-belmo-charcoal truncate">
                        {item.productName}
                      </h4>
                      <p className="text-[11px] text-belmo-charcoal/60 truncate">
                        Qty: {item.quantity} {item.variantName ? `• ${item.variantName}` : ''}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-belmo-charcoal shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Line items */}
              <div className="space-y-2.5 text-xs border-t border-b border-belmo-charcoal/10 py-4">
                <div className="flex justify-between text-belmo-charcoal/70">
                  <span>Subtotal</span>
                  <span className="font-medium text-belmo-charcoal">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-belmo-charcoal/70">
                  <span>{fulfillmentType}</span>
                  <span>{deliveryCost === 0 ? <span className="text-emerald-700 font-medium">Complimentary</span> : formatPrice(deliveryCost)}</span>
                </div>
                <div className="flex justify-between text-belmo-charcoal/70">
                  <span>Estimated Tax</span>
                  <span>{formatPrice(estimatedTax)}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-medium text-belmo-charcoal pt-3 border-t border-belmo-charcoal/10">
                  <span>Total Amount</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-belmo-charcoal hover:bg-belmo-walnut text-white text-xs tracking-editorial uppercase font-semibold rounded-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-belmo-bronze-light" />
                  <span>{isSubmitting ? 'Processing Commission...' : `Confirm Commission • ${formatPrice(grandTotal)}`}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-belmo-charcoal/60 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-belmo-bronze" />
                  <span>Belmo Living Verified Security & 10-Year Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
