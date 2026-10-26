import type { Metadata } from 'next';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import SearchModal from '@/components/layout/SearchModal';
import ToastContainer from '@/components/layout/ToastContainer';

export const metadata: Metadata = {
  title: 'Belmo Living | Designed for Living. Crafted for Life.',
  description: 'Belmo Living is a premium interactive furniture showroom and design atelier. Discover architectural seating, monolithic stone tables, solid American walnut joinery, and bespoke commissions.',
  keywords: ['Belmo Living', 'luxury furniture', 'architectural sofa', 'travertine coffee table', 'modern minimalist furniture', 'bespoke furniture customizer'],
  openGraph: {
    title: 'Belmo Living | Designed for Living. Crafted for Life.',
    description: 'Immersive furniture showroom inspired by architectural tranquility and enduring craftsmanship.',
    siteName: 'Belmo Living',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-belmo-ivory text-belmo-charcoal min-h-screen flex flex-col antialiased">
        <ShopProvider>
          <Navbar />
          <CartDrawer />
          <SearchModal />
          <ToastContainer />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}
