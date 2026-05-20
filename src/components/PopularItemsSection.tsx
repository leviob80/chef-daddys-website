'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import SidesModal, { SelectedSide } from '@/components/SidesModal';
import { useCart } from '@/context/CartContext';
import { popularItems, menuSections, MenuItem } from '@/lib/menu-data';

export default function PopularItemsSection() {
  const { addItem } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  function handleAddClick(item: MenuItem) {
    const section = menuSections.find((s) => s.id === item.category);
    if (section?.hasSides) {
      setModalItem(item);
      setShowModal(true);
    } else {
      addItem({ id: item.id, name: item.name, priceCents: item.priceCents });
      setAddedId(item.id);
      setTimeout(() => setAddedId(null), 1500);
    }
  }

  function handleSidesConfirm(sides: SelectedSide[]) {
    if (!modalItem) return;
    addItem({
      id: `${modalItem.id}_${Date.now()}`,
      name: modalItem.name,
      priceCents: modalItem.priceCents,
      selectedSides: sides,
    });
    setAddedId(modalItem.id);
    setTimeout(() => setAddedId(null), 1500);
    setShowModal(false);
    setModalItem(null);
  }

  return (
    <section className="section-dark py-20 sm:py-24" aria-label="Popular menu items">
      {showModal && modalItem && (
        <SidesModal
          item={modalItem}
          onConfirm={handleSidesConfirm}
          onClose={() => { setShowModal(false); setModalItem(null); }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="section-heading text-white">
            The Crowd&apos;s{' '}
            <span className="text-ember">Go-To&apos;s</span>
          </h2>
          <p className="mt-4 text-smoke/70 font-body max-w-xl mx-auto">
            Can&apos;t decide? Start here. These are the dishes our customers come back for every week.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularItems.slice(0, 6).map((item, i) => (
            <AnimatedSection
              key={item.id}
              delay={i * 100}
              className="card-hover bg-charcoal rounded-xl overflow-hidden border border-charcoal-light flex flex-col"
            >
              <div className="img-placeholder h-48 w-full relative flex-shrink-0" role="img" aria-label={item.imageAlt}>
                <div className="absolute inset-0 flex items-center justify-center text-smoke/20 text-xs font-body text-center px-4">
                  Photo coming soon
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-white">{item.name}</h3>
                  <span className="text-ember font-body font-bold text-sm whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-smoke/60 text-xs font-body mt-1 line-clamp-2 flex-1">
                  {item.description}
                </p>
                <button
                  onClick={() => handleAddClick(item)}
                  className={`mt-4 w-full text-center text-sm font-body font-bold py-2.5 rounded transition-all duration-300 ${
                    addedId === item.id
                      ? 'bg-ember text-brand-black'
                      : 'bg-crimson hover:bg-crimson-dark text-white'
                  }`}
                  aria-label={`Add ${item.name} to order`}
                >
                  {addedId === item.id ? 'Added!' : 'Add to Order'}
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link href="/menu" className="btn-outline inline-block">
            View Full Menu →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
