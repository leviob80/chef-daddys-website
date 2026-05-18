'use client';

import { useState } from 'react';
import Link from 'next/link';
import { menuSections, MenuCategoryId } from '@/lib/menu-data';
import { useCart } from '@/context/CartContext';
import AnimatedSection from '@/components/AnimatedSection';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('bbq-specialties');
  const { addItem, items } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const activeSection = menuSections.find((s) => s.id === activeCategory)!;

  function handleAddToOrder(item: { id: string; name: string; priceCents: number }) {
    addItem({ id: item.id, name: item.name, priceCents: item.priceCents });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  }

  function cartQty(id: string) {
    return items.find((i) => i.id === id)?.quantity ?? 0;
  }

  return (
    <>
      {/* Header */}
      <section
        className="py-20 text-center"
        style={{ background: 'linear-gradient(180deg, #1A1A1A 0%, #111111 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flame-badge mb-4 inline-flex">
            <span>Full Menu</span>
          </div>
          <h1 className="section-heading text-white">
            The <span className="text-crimson">Menu</span>
          </h1>
          <p className="mt-4 text-smoke/70 font-body text-lg max-w-xl mx-auto">
            Slow-smoked BBQ. Authentic soul food. Made fresh daily in St. Louis, MO.
          </p>
          <Link
            href="/order"
            className="btn-primary inline-block mt-8 order-btn"
          >
            Order for Pickup →
          </Link>
        </div>
      </section>

      {/* Category Tabs */}
      <nav
        className="sticky top-[72px] z-30 bg-charcoal border-b border-charcoal-light shadow-lg overflow-x-auto"
        aria-label="Menu categories"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-3 min-w-max">
            {menuSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveCategory(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-body font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === section.id
                    ? 'bg-crimson text-white shadow-lg'
                    : 'text-smoke/70 hover:text-smoke hover:bg-charcoal-light'
                }`}
                aria-current={activeCategory === section.id ? 'true' : undefined}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Menu Items */}
      <section className="section-dark py-12 sm:py-16 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <h2 className="font-display text-3xl font-bold text-white">
              {activeSection.label}
            </h2>
            <p className="text-smoke/60 font-body text-sm mt-1">
              {activeSection.description}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {activeSection.items.map((item, i) => (
              <AnimatedSection
                key={item.id}
                delay={i * 60}
                className="card-hover bg-charcoal rounded-xl overflow-hidden border border-charcoal-light flex flex-col"
              >
                {/* PLACEHOLDER: Replace div with <Image> component and real food photo */}
                <div
                  className="img-placeholder h-44 w-full relative flex-shrink-0"
                  role="img"
                  aria-label={item.imageAlt}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-smoke/20 text-xs font-body text-center px-3 gap-1">
                    {/* PLACEHOLDER: Replace with real food photo — recommended: WebP, 400×300px */}
                    <span>📸</span>
                    <span>{item.imageAlt}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-base font-bold text-white leading-snug">
                      {item.name}
                    </h3>
                    <span className="text-ember font-body font-bold text-sm whitespace-nowrap mt-0.5">
                      {item.price}
                    </span>
                  </div>

                  <p className="text-smoke/60 text-xs font-body leading-relaxed flex-1">
                    {/* PLACEHOLDER: Replace with actual menu item description */}
                    Made fresh daily with Chef Daddy&apos;s signature seasoning and care.
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    {cartQty(item.id) > 0 && (
                      <span className="text-ember text-xs font-body font-bold">
                        {cartQty(item.id)} in cart
                      </span>
                    )}
                    <button
                      onClick={() => handleAddToOrder(item)}
                      className={`flex-1 text-sm font-body font-bold py-2.5 px-3 rounded transition-all duration-300 ${
                        addedId === item.id
                          ? 'bg-ember text-brand-black'
                          : 'bg-crimson hover:bg-crimson-dark text-white'
                      }`}
                      aria-label={`Add ${item.name} to order`}
                    >
                      {addedId === item.id ? '✓ Added!' : 'Add to Order'}
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-charcoal py-16 text-center border-t border-charcoal-light">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-white">
            Ready to Order?
          </h2>
          <p className="text-smoke/70 font-body mt-3">
            Place your pickup order online and skip the wait.
          </p>
          <Link href="/order" className="btn-primary inline-block mt-6">
            Go to Order Page →
          </Link>
        </div>
      </section>
    </>
  );
}
