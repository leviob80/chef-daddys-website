import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import { popularItems } from '@/lib/menu-data';

export const metadata: Metadata = {
  title: "Chef Daddy's BBQ & Soul Food | St. Louis, MO | Online Ordering",
  description:
    "St. Louis' best BBQ and soul food since 2015. Slow-smoked ribs, brisket, fried chicken & more at 9617 Saint Charles Rock Road. Order online for pickup.",
  alternates: { canonical: 'https://www.chefdaddysbbq.com' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Where is Chef Daddy's located?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Chef Daddy's Bar-B-Que & Soul Food is located at 9617 Saint Charles Rock Road, St. Louis, MO.",
      },
    },
    {
      '@type': 'Question',
      name: "Does Chef Daddy's offer online ordering?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes! Chef Daddy's offers online ordering for pickup. Visit our Order Online page to place your order.",
      },
    },
    {
      '@type': 'Question',
      name: "What are Chef Daddy's hours?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Chef Daddy's is open Sunday through Thursday from 12:00 PM to 7:00 PM, and Friday through Saturday from 12:00 PM to 10:00 PM.",
      },
    },
    {
      '@type': 'Question',
      name: "Does Chef Daddy's do catering?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes! Chef Daddy's offers catering for events, corporate gatherings, family events, church events, and more. Visit our Catering page to submit an inquiry.",
      },
    },
    {
      '@type': 'Question',
      name: "What type of food does Chef Daddy's serve?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Chef Daddy's serves authentic St. Louis-style BBQ and soul food including slow-smoked ribs, pulled pork, beef brisket, fried chicken, catfish, mac & cheese, collard greens, and more.",
      },
    },
  ],
};

const features = [
  {
    title: 'Slow-Smoked BBQ',
    description:
      'Every rack of ribs and every brisket is smoked low and slow over hickory wood for hours. No shortcuts. No compromises.',
  },
  {
    title: 'Authentic Soul Food',
    description:
      "Fried chicken, mac & cheese, collard greens, candied yams — made from real recipes the way it was always intended. This is soul food with soul.",
  },
  {
    title: 'Order Online for Pickup',
    description:
      'Skip the line. Order ahead on our website and your food will be hot and ready when you arrive. Pickup only — because some things are worth the drive.',
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="hero-bg relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Flame gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at bottom center, rgba(232,101,26,0.12) 0%, transparent 70%)',
          }}
        />

        {/* PLACEHOLDER: Replace this div with a full-bleed background food image */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          aria-hidden="true"
          style={{
            background:
              'url("/images/hero-bg.jpg") center/cover no-repeat',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          {/* EST. badge */}
          <div className="animate-fade-in opacity-0 inline-flex items-center gap-2 bg-ember/10 border border-ember/30 text-ember text-xs font-body font-bold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
            Est. 2015 · St. Louis, Missouri
          </div>

          <h1 className="animate-fade-up opacity-0 font-display font-black text-white text-shadow-lg leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            Real BBQ.{' '}
            <span className="text-crimson">Real Soul.</span>{' '}
            <span className="text-ember">Real St. Louis.</span>
          </h1>

          <p className="animate-fade-up-delay-1 opacity-0 mt-6 text-smoke/80 font-body text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-shadow-sm">
            Slow-smoked BBQ and authentic soul food in St. Louis.
            The kind of food that makes you close your eyes with the first bite.
          </p>

          <div className="animate-fade-up-delay-2 opacity-0 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/order"
              className="btn-primary order-btn text-base px-8 py-4 inline-block"
            >
              Order Now — Pickup
            </Link>
            <Link
              href="/menu"
              className="btn-outline text-base px-8 py-4 inline-block"
            >
              View Full Menu
            </Link>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <svg className="w-6 h-6 text-ember/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────── */}
      <section className="section-charcoal py-20 sm:py-24" aria-label="Why Chef Daddy's">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <div className="flame-badge mb-4">
              <span>What Makes Us Different</span>
            </div>
            <h2 className="section-heading text-white">
              No Shortcuts. Just{' '}
              <span className="text-crimson">Smoke & Soul.</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 150} className="card-hover bg-brand-black rounded-xl p-8 border border-charcoal-light text-center">
                <h3 className="font-display text-2xl font-bold text-white mb-3">
                  {f.title}
                </h3>
                <p className="text-smoke/70 font-body leading-relaxed text-sm">
                  {f.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR ITEMS ─────────────────────────────────────── */}
      <section className="section-dark py-20 sm:py-24" aria-label="Popular menu items">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <div className="flame-badge mb-4">
              <span>Fan Favorites</span>
            </div>
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
                className="card-hover bg-charcoal rounded-xl overflow-hidden border border-charcoal-light"
              >
                {/* PLACEHOLDER: Replace with actual food photo */}
                <div className="img-placeholder h-48 w-full relative" role="img" aria-label={item.imageAlt}>
                  <div className="absolute inset-0 flex items-center justify-center text-smoke/20 text-xs font-body text-center px-4">
                    {/* PLACEHOLDER: Replace with real food photo */}
                    📸 Food photo coming soon
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-white">{item.name}</h3>
                    <span className="text-ember font-body font-bold text-sm whitespace-nowrap">{item.price}</span>
                  </div>
                  <p className="text-smoke/60 text-xs font-body mt-1 line-clamp-2">
                    {/* PLACEHOLDER: Insert actual item description */}
                    Slow-smoked to perfection with Chef Daddy&apos;s signature seasoning.
                  </p>
                  <Link
                    href="/order"
                    className="mt-4 block w-full text-center bg-crimson hover:bg-crimson-dark text-white text-sm font-body font-bold py-2.5 rounded transition-colors"
                  >
                    Add to Order
                  </Link>
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

      {/* ── ORDER CTA ─────────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #C0141C 0%, #9A0F16 50%, #6B0B10 100%)',
        }}
        aria-label="Order online call to action"
      >
        <div className="absolute inset-0 opacity-5" aria-hidden="true"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="section-heading text-white text-shadow">
              Ready to Order?
            </h2>
            <p className="mt-4 text-white/85 font-body text-lg max-w-xl mx-auto">
              Order online for pickup. Your food will be fresh and hot when you arrive.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/order"
                className="bg-white text-crimson hover:bg-smoke font-body font-black text-base px-10 py-4 rounded transition-all inline-block hover:shadow-xl"
              >
                Order Pickup Online
              </Link>
              <a
                href="tel:+13142221488"
                className="text-white/80 hover:text-white font-body font-bold text-base px-6 py-4 rounded border border-white/30 hover:border-white/60 transition-all inline-block"
              >
                Or Call: (314) 222-1488
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── REVIEWS TEASER ────────────────────────────────────── */}
      <section className="section-charcoal py-20 sm:py-24" aria-label="Customer reviews">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="stars text-3xl mb-3" aria-label="5 stars">★★★★★</div>
            <blockquote className="font-display text-2xl sm:text-3xl text-white italic">
              &ldquo;The best BBQ in all of St. Louis. Period.&rdquo;
            </blockquote>
            <p className="mt-4 text-smoke/60 font-body text-sm">— Happy Customer, Google Review</p>
            <Link href="/reviews" className="mt-8 inline-block text-ember hover:text-flame font-body font-bold underline underline-offset-4 transition-colors">
              Read All Reviews →
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="section-dark py-20 sm:py-24" aria-label="Frequently asked questions">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-heading text-white">
              Got <span className="text-ember">Questions?</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <details className="group bg-charcoal border border-charcoal-light rounded-xl overflow-hidden">
                  <summary className="cursor-pointer px-6 py-5 font-body font-semibold text-white flex items-center justify-between gap-4 list-none hover:text-ember transition-colors">
                    <span>{faq.name}</span>
                    <svg className="w-5 h-5 text-ember flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 text-smoke/70 font-body text-sm leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </div>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
