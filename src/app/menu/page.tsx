'use client';

import { useState } from 'react';
import Link from 'next/link';
import { menuSections, MenuCategoryId, MenuItem } from '@/lib/menu-data';
import { useCart } from '@/context/CartContext';
import AnimatedSection from '@/components/AnimatedSection';
import SidesModal, { SelectedSide } from '@/components/SidesModal';

const DELIVERY_PLATFORMS = [
  { name: 'DoorDash',  logo: '/images/delivery/doordash.svg',  href: 'https://www.doordash.com' },
  { name: 'Grubhub',   logo: '/images/delivery/grubhub.svg',   href: 'https://www.grubhub.com' },
  { name: 'Uber Eats', logo: '/images/delivery/ubereats.svg',  href: 'https://www.ubereats.com' },
  { name: 'Seamless',  logo: '/images/delivery/seamless.svg',  href: 'https://www.seamless.com' },
  { name: 'Postmates', logo: '/images/delivery/postmates.svg', href: 'https://postmates.com' },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('barbeque');
  const { addItem, items } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [sideSize, setSideSize] = useState<Record<string, 'sm' | 'lg'>>({});

  const activeSection = menuSections.find((s) => s.id === activeCategory)!;

  function openSidesModal(item: MenuItem) {
    setModalItem(item);
    setShowModal(true);
  }

  function handleSidesConfirm(sides: SelectedSide[]) {
    if (!modalItem) return;
    const uniqueId = `${modalItem.id}_${Date.now()}`;
    addItem({ id: uniqueId, name: modalItem.name, priceCents: modalItem.priceCents, selectedSides: sides });
    setAddedId(modalItem.id);
    setTimeout(() => setAddedId(null), 1500);
    setShowModal(false);
    setModalItem(null);
  }

  function handleAddSide(item: MenuItem) {
    const size = sideSize[item.id] ?? 'sm';
    const priceCents = size === 'lg' ? 500 : 350;
    const name = `${item.name} (${size === 'lg' ? 'Large' : 'Small'})`;
    addItem({ id: `${item.id}_${size}`, name, priceCents });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  }

  function cartQty(id: string): number {
    return items.find((i) => i.id === id)?.quantity ?? 0;
  }

  function mealInCartCount(baseId: string): number {
    return items
      .filter((i) => i.id.startsWith(baseId + '_'))
      .reduce((sum, i) => sum + i.quantity, 0);
  }

  return (
    <>
      {/* Sides Modal */}
      {showModal && modalItem && (
        <SidesModal
          item={modalItem}
          onConfirm={handleSidesConfirm}
          onClose={() => { setShowModal(false); setModalItem(null); }}
        />
      )}

      {/* Hero Header */}
      <section
        className="py-20 text-center"
        style={{ background: 'linear-gradient(180deg, #1A1A1A 0%, #111111 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <h1 className="section-heading text-white">
            The <span className="text-crimson">Menu</span>
          </h1>
          <p className="mt-4 text-smoke/70 font-body text-lg max-w-xl mx-auto">
            Slow-smoked BBQ. Authentic soul food. Made fresh daily in St. Louis, MO.
          </p>
          <Link href="/order" className="btn-primary inline-block mt-8 order-btn">
            Order Online →
          </Link>
        </div>
      </section>

      {/* Delivery Banner */}
      <section className="bg-brand-black border-b border-charcoal-light py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
            <p className="text-smoke/60 font-body text-sm font-bold flex-shrink-0">
              Prefer delivery? Order through:
            </p>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              {DELIVERY_PLATFORMS.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl px-4 py-2.5 flex items-center justify-center transition-all hover:opacity-85 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5"
                  aria-label={`Order ${p.name} delivery`}
                >
                  <img src={p.logo} alt={p.name} className="h-8 w-auto object-contain" loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <nav
        className="sticky top-[172px] z-30 bg-charcoal border-b border-charcoal-light shadow-lg overflow-x-auto"
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
            {activeSection.items.map((item, i) => {
              const isSides = activeSection.id === 'sides';
              const hasSides = !!activeSection.hasSides;
              const selectedSize = sideSize[item.id] ?? 'sm';
              const displayPrice = isSides
                ? (selectedSize === 'lg' ? '$5.00' : '$3.50')
                : item.price;
              const inCartCount = hasSides
                ? mealInCartCount(item.id)
                : cartQty(isSides ? `${item.id}_${selectedSize}` : item.id);

              return (
                <AnimatedSection
                  key={item.id}
                  delay={i * 60}
                  className="card-hover bg-charcoal rounded-xl overflow-hidden border border-charcoal-light flex flex-col"
                >
                  {/* Photo placeholder */}
                  <div
                    className="img-placeholder h-44 w-full relative flex-shrink-0"
                    role="img"
                    aria-label={item.imageAlt}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-smoke/20 text-xs font-body text-center px-3 gap-1">
                      <span>📸</span>
                      <span>{item.imageAlt}</span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-display text-base font-bold text-white leading-snug">
                        {item.name}
                      </h3>
                      <span className="text-ember font-body font-bold text-sm whitespace-nowrap mt-0.5">
                        {displayPrice}
                      </span>
                    </div>

                    {item.note && (
                      <p className="text-ember text-[11px] font-body font-bold mb-1 uppercase tracking-wide">
                        {item.note}
                      </p>
                    )}

                    <p className="text-smoke/60 text-xs font-body leading-relaxed flex-1">
                      {item.description}
                    </p>

                    <div className="mt-4">
                      {isSides ? (
                        <>
                          {/* Sm / Lg size toggle */}
                          <div className="grid grid-cols-2 rounded-lg overflow-hidden border border-charcoal-light mb-2.5 text-xs font-body font-bold">
                            <button
                              onClick={() => setSideSize((prev) => ({ ...prev, [item.id]: 'sm' }))}
                              className={`py-2 transition-colors ${
                                selectedSize === 'sm'
                                  ? 'bg-crimson text-white'
                                  : 'text-smoke/60 hover:text-smoke'
                              }`}
                            >
                              Small · $3.50
                            </button>
                            <button
                              onClick={() => setSideSize((prev) => ({ ...prev, [item.id]: 'lg' }))}
                              className={`py-2 transition-colors border-l border-charcoal-light ${
                                selectedSize === 'lg'
                                  ? 'bg-crimson text-white'
                                  : 'text-smoke/60 hover:text-smoke'
                              }`}
                            >
                              Large · $5.00
                            </button>
                          </div>
                          {inCartCount > 0 && (
                            <p className="text-ember text-xs font-body font-bold mb-1.5">
                              {inCartCount} in cart
                            </p>
                          )}
                          <button
                            onClick={() => handleAddSide(item)}
                            className={`w-full text-sm font-body font-bold py-2.5 px-3 rounded transition-all duration-300 ${
                              addedId === item.id
                                ? 'bg-ember text-brand-black'
                                : 'bg-crimson hover:bg-crimson-dark text-white'
                            }`}
                            aria-label={`Add ${item.name} to order`}
                          >
                            {addedId === item.id ? '✓ Added!' : 'Add to Order'}
                          </button>
                        </>
                      ) : hasSides ? (
                        <>
                          {inCartCount > 0 && (
                            <p className="text-ember text-xs font-body font-bold mb-1.5">
                              {inCartCount} in cart
                            </p>
                          )}
                          <button
                            onClick={() => openSidesModal(item)}
                            className={`w-full text-sm font-body font-bold py-2.5 px-3 rounded transition-all duration-300 ${
                              addedId === item.id
                                ? 'bg-ember text-brand-black'
                                : 'bg-crimson hover:bg-crimson-dark text-white'
                            }`}
                            aria-label={`Add ${item.name} to order`}
                          >
                            {addedId === item.id ? '✓ Added!' : 'Add to Order'}
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          {inCartCount > 0 && (
                            <span className="text-ember text-xs font-body font-bold">
                              {inCartCount} in cart
                            </span>
                          )}
                          <button
                            onClick={() => {
                              addItem({ id: item.id, name: item.name, priceCents: item.priceCents });
                              setAddedId(item.id);
                              setTimeout(() => setAddedId(null), 1500);
                            }}
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
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
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
            Place your order online and skip the wait.
          </p>
          <Link href="/order" className="btn-primary inline-block mt-6">
            Go to Order Page →
          </Link>
        </div>
      </section>
    </>
  );
}
