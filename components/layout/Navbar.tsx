'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our store', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-black/5 py-3.5 shadow-sm'
            : 'bg-white/70 md:bg-white/60 backdrop-blur-md border-b border-black/5 py-4 sm:py-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20 flex items-center justify-between">
          {/* 1. Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="md:hidden p-2 -ml-2 text-[#1a1a1a] hover:text-[#e59124] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* 2. Brand Logo & Wordmark (Left) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shadow-md ring-2 ring-[#e59124]/40 group-hover:ring-[#e59124] transition-all shrink-0">
              <Image
                src="/images/logo-circle.png"
                alt="Belmo Living Crest"
                fill
                sizes="36px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <span className="font-serif text-xl sm:text-2xl tracking-tight text-[#1a1a1a] font-semibold">
              Belmo Living
            </span>
          </Link>

          {/* 3. Center Minimal Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-medium tracking-wide">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'transition-colors py-1 relative',
                    active
                      ? 'text-[#1a1a1a] font-bold'
                      : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'
                  )}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#1a1a1a]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 4. Right Action Icons Trio */}
          <div className="flex items-center gap-2 sm:gap-3 text-[#1a1a1a]">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search furniture catalog"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* User Account Icon */}
            <Link
              href="/account"
              aria-label="User Account"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              <User className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </Link>

            {/* Shopping Bag Icon with Cart Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart Drawer"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:bg-black transition-colors shadow-sm ml-1"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-[#e59124] text-[9px] font-bold text-white flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Matching Clean Style) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col p-6 z-10">
            <div className="flex items-center justify-between pb-6 border-b border-black/5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-md ring-2 ring-[#e59124]/40">
                  <Image src="/images/logo-circle.png" alt="Belmo Living" fill sizes="32px" className="object-cover" />
                </div>
                <span className="font-serif text-lg tracking-tight font-semibold text-[#1a1a1a]">
                  Belmo Living
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#1a1a1a] hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="py-8 flex flex-col space-y-5 text-base font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'transition-colors py-1',
                    pathname === link.href
                      ? 'text-[#1a1a1a] font-bold'
                      : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-black/5 flex flex-col space-y-3">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full bg-gradient-to-r from-[#e59124] to-[#f4ab3a] text-[#1a130d] text-xs font-semibold tracking-wide shadow-sm"
              >
                Explore Collection
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full border border-black/10 text-xs font-medium text-[#1a1a1a]"
              >
                Customer Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
