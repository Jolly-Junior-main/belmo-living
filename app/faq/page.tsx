'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageSquare, Phone, Mail } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const FAQS: FAQCategory[] = [
  {
    title: 'Bespoke Commissions & Customizer',
    items: [
      {
        q: 'How does the Belmo Living bespoke customization process work?',
        a: 'Every custom piece begins in our digital atelier customizer or through our Soho studio. Once you select your configuration, textile, and hardwood finish, our technical drafting team produces 3D CAD drawings for your approval before hand-cutting begins in our workshops.'
      },
      {
        q: 'Can I request physical fabric swatches and timber samples prior to ordering?',
        a: 'Yes. We provide complimentary Swatch Sample Kits containing our 480 g/m² Italian bouclé, full-grain aniline leathers, and hand-buffed Appalachian walnut blocks. You can request a sample kit on any product page or via our WhatsApp Concierge.'
      },
      {
        q: 'What is the standard production lead time for customized pieces?',
        a: 'Standard in-stock configurations ship within 48 to 72 hours. Custom upholstery and bespoke architectural dimensional commissions require 3 to 5 weeks from technical drawing approval.'
      }
    ]
  },
  {
    title: 'White-Glove Delivery & Installation',
    items: [
      {
        q: 'What is included in Belmo Living White-Glove Delivery?',
        a: 'Our white-glove service includes calibrated appointment scheduling, two-person inside placement into your chosen room, complete component assembly, leveling, and removal of all protective packing materials. We also arrange building COI (Certificate of Insurance) verification for luxury residential buildings.'
      },
      {
        q: 'How do I qualify for complimentary white-glove delivery?',
        a: 'All orders containing $3,000 or more automatically receive complimentary premier white-glove in-home installation anywhere in the continental United States.'
      },
      {
        q: 'Can I choose to pick up my furniture directly from the Soho Showroom?',
        a: 'Yes. You can select "Showroom Private Pickup" during checkout. Our dock logistics crew will coordinate with your private art handler or vehicle for seamless loading at our 482 Broome Street dock.'
      }
    ]
  },
  {
    title: 'Materials, Timber & Care',
    items: [
      {
        q: 'How should I maintain the solid Appalachian walnut surfaces?',
        a: 'We finish our timber surfaces with breathable cold-pressed organic linseed oils and carnauba waxes. For daily maintenance, simply wipe with a soft, slightly damp cotton cloth along the grain. Avoid silicone sprays or harsh chemical detergents.'
      },
      {
        q: 'Are Belmo Living bouclé fabrics treated for stain resistance?',
        a: 'Yes. Our Italian bouclé textiles undergo a non-fluorochemical nano-shield bath during finishing. Liquids bead on the surface for immediate blotting with a dry linen cloth without penetrating the wool core.'
      },
      {
        q: 'How do I care for natural Roman travertine stone tables?',
        a: 'Our travertine is sealed with a satin matte silicate barrier that allows the mineral cavities to breathe while protecting against liquid ingress. We recommend wiping spills promptly and using coasters under acidic fluids like red wine or citrus.'
      }
    ]
  },
  {
    title: 'Guarantee & Warranty',
    items: [
      {
        q: 'What does the 10-Year Master Frame Guarantee cover?',
        a: 'Our warranty covers structural integrity: kiln-dried solid hardwood joinery, mortise-and-tenon welds, steel suspension brackets, and internal corner blocks against structural failure under normal residential usage for ten full years.'
      },
      {
        q: 'What is your in-home return policy?',
        a: 'We offer a 30-day in-home trial on catalog pieces. If a piece does not harmonize with your residence, our white-glove team will retrieve it in original condition for a refund less standard return transit costs.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '0-0': true,
    '1-0': true,
  });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="pt-28 pb-24 bg-belmo-ivory min-h-screen text-belmo-charcoal select-none">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="border-b border-belmo-charcoal/10 pb-8 mb-12 space-y-2 text-center">
          <span className="text-[10px] font-mono tracking-widest uppercase text-belmo-walnut">
            Client Knowledge Base
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-belmo-charcoal font-normal tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-belmo-charcoal/70 font-light max-w-lg mx-auto">
            Guidance regarding bespoke architectural commissions, material provenance, white-glove logistics, and care rituals.
          </p>
        </div>

        {/* Categories Stack */}
        <div className="space-y-10">
          {FAQS.map((category, catIdx) => (
            <div key={category.title} className="bg-white rounded-3xl p-6 sm:p-10 border border-belmo-charcoal/10 shadow-sm space-y-4">
              <h2 className="font-serif text-2xl text-belmo-charcoal font-normal border-b border-belmo-charcoal/10 pb-4">
                {category.title}
              </h2>

              <div className="divide-y divide-belmo-charcoal/10">
                {category.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = !!openItems[key];

                  return (
                    <div key={item.q} className="py-4">
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between text-left gap-4 font-serif text-base font-medium text-belmo-charcoal hover:text-belmo-walnut transition-colors"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-belmo-walnut shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="pt-3 pr-6 text-xs text-belmo-charcoal/75 leading-relaxed font-light animate-in fade-in duration-200">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-16 p-8 rounded-3xl bg-belmo-cream border border-belmo-charcoal/10 text-center space-y-4">
          <h3 className="font-serif text-2xl text-belmo-charcoal">
            Require Additional Architectural Guidance?
          </h3>
          <p className="text-xs text-belmo-charcoal/70 max-w-md mx-auto">
            Our Soho flagship design concierge is available directly for bespoke dimension calculations and building logistical inquiries.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs">
            <a
              href="https://wa.me/18004823566?text=Hello%20Belmo%20Living,%20I%20have%20a%20question%20regarding%20your%20furniture."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-belmo-charcoal hover:bg-belmo-walnut text-white tracking-editorial uppercase rounded-full transition-colors font-medium flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-belmo-bronze-light" />
              <span>WhatsApp Concierge</span>
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white border border-belmo-charcoal/20 text-belmo-charcoal tracking-editorial uppercase rounded-full hover:bg-belmo-ivory transition-colors font-medium"
            >
              Contact Atelier
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
