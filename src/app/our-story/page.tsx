import type { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    "Learn the story behind Chef Daddy's Bar-B-Que & Soul Food — established in 2015 in St. Louis, MO. A passion for authentic BBQ and soul food that has fed the community for over a decade.",
  alternates: { canonical: 'https://www.chefdaddysbbq.com/our-story' },
};

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-24 text-center relative"
        style={{ background: 'linear-gradient(180deg, #1A1A1A 0%, #111111 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <h1 className="section-heading text-white">
            The Story Behind{' '}
            <span className="text-crimson">Chef Daddy&apos;s</span>
          </h1>
          <p className="mt-5 text-smoke/70 font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Real food has a story. Ours starts right here in St. Louis.
          </p>
        </div>
      </section>

      {/* EST. 2015 Badge Section */}
      <section className="section-charcoal py-16 border-b border-charcoal-light">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <AnimatedSection>
            <div className="inline-flex flex-col items-center border-4 border-ember/40 rounded-2xl px-12 py-8 relative">
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-16 h-1 bg-ember rounded-full" />
              <p className="text-ember font-body text-xs tracking-[0.4em] uppercase mb-2">Established</p>
              <p className="font-display text-7xl font-black text-white leading-none">2015</p>
              <p className="text-smoke/60 font-body text-sm tracking-widest uppercase mt-2">St. Louis, Missouri</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Sections */}
      <section className="section-dark py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Who Is Chef Daddy? */}
          <AnimatedSection className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-display text-4xl font-bold text-white mb-5">
                  Who Is <span className="text-ember">Chef Daddy?</span>
                </h2>
                {/*
                  PLACEHOLDER: Add Chef Daddy's personal story here.
                  Suggested content:
                  - His real name and background
                  - Where he grew up and learned to cook
                  - His connection to BBQ and soul food culture
                  - What "Chef Daddy" means to him and his family
                */}
                <div className="space-y-4 text-smoke/70 font-body leading-relaxed">
                  <p>
                    <span className="text-smoke/30 text-sm italic">
                      [PLACEHOLDER — Replace this section with Chef Daddy&apos;s personal story.]
                    </span>
                  </p>
                  <p>
                    Every pit master has an origin story.
                  </p>
                </div>
              </div>

              {/* PLACEHOLDER: Chef photo */}
              <div className="order-first lg:order-last">
                <div className="img-placeholder rounded-2xl overflow-hidden aspect-[4/3] relative" role="img"
                  aria-label="Chef Daddy - Owner of Chef Daddy's Bar-B-Que & Soul Food">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-smoke/20 text-sm font-body text-center px-8 gap-2">
                    {/* PLACEHOLDER: Replace with professional photo of Chef Daddy */}
                    <span className="text-4xl">👨‍🍳</span>
                    <span>Chef Daddy — Owner &amp; Pit Master</span>
                    <span className="text-xs">Replace with actual photo</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* How Did It Start? */}
          <AnimatedSection className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* PLACEHOLDER: Restaurant photo */}
              <div>
                <div className="img-placeholder rounded-2xl overflow-hidden aspect-[4/3] relative" role="img"
                  aria-label="Interior or exterior of Chef Daddy's Bar-B-Que St. Louis">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-smoke/20 text-sm font-body text-center px-8 gap-2">
                    {/* PLACEHOLDER: Replace with restaurant photo (interior or exterior) */}
                    <span className="text-4xl">🏠</span>
                    <span>Restaurant photo</span>
                    <span className="text-xs">9617 Saint Charles Rock Road</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-4xl font-bold text-white mb-5">
                  How Did It <span className="text-crimson">Start?</span>
                </h2>
                {/*
                  PLACEHOLDER: Add the restaurant's founding story.
                  Suggested content:
                  - Year founded (2015) and what prompted the decision
                  - Where it began (pop-up? backyard? small operation?)
                  - Early struggles and breakthroughs
                  - How the name "Chef Daddy's" came about
                  - The moment they knew this was something real
                */}
                <div className="space-y-4 text-smoke/70 font-body leading-relaxed">
                  <p>
                    <span className="text-smoke/30 text-sm italic">
                      [PLACEHOLDER — Add the founding story of Chef Daddy&apos;s here.]
                    </span>
                  </p>
                  <p>
                    Chef Daddy&apos;s opened its doors in 2015 at 9617 Saint Charles Rock Road in St. Louis, Missouri,
                    and has been feeding the community with slow-smoked BBQ and authentic soul food ever since.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* What Makes the Food Special? */}
          <AnimatedSection className="mb-20">
            <div className="bg-charcoal border border-charcoal-light rounded-2xl p-8 sm:p-12">
              <h2 className="font-display text-4xl font-bold text-white mb-6 text-center">
                What Makes the Food <span className="text-ember">Special?</span>
              </h2>
              {/*
                PLACEHOLDER: Add description of what makes Chef Daddy's BBQ & soul food unique.
                Suggested content:
                - The wood used for smoking (hickory? oak? combination?)
                - Dry rub and sauce recipes (house secrets are fine to mention without revealing)
                - Cooking times and methods
                - Where ingredients are sourced
                - Any family recipes passed down through generations
              */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { icon: '🪵', label: 'The Wood', text: '<!-- PLACEHOLDER: Type of wood used for smoking -->' },
                  { icon: '🧂', label: 'The Rub', text: '<!-- PLACEHOLDER: Description of signature dry rub -->' },
                  { icon: '⏱️', label: 'The Time', text: '<!-- PLACEHOLDER: Smoking duration and low-and-slow process -->' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-5xl mb-3" aria-hidden="true">{item.icon}</div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">{item.label}</h3>
                    <p className="text-smoke/60 font-body text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Community Connection */}
          <AnimatedSection className="mb-20">
            <h2 className="font-display text-4xl font-bold text-white mb-5">
              More Than a Restaurant —{' '}
              <span className="text-crimson">A Community</span>
            </h2>
            {/*
              PLACEHOLDER: Add the community connection story.
              Suggested content:
              - Neighborhoods served and community involvement
              - Sponsorships, donations, or events supported
              - Regular customers and community relationships
              - What St. Louis means to Chef Daddy personally
            */}
            <div className="text-smoke/70 font-body leading-relaxed space-y-4">
              <p>
                <span className="text-smoke/30 text-sm italic">
                  [PLACEHOLDER — Add Chef Daddy&apos;s community connection and involvement here.]
                </span>
              </p>
              <p>
                Chef Daddy&apos;s isn&apos;t just a restaurant — it&apos;s a St. Louis institution.
                We&apos;ve fed families at church events, block parties, graduations, and reunions.
                We&apos;ve been there for the big moments and the everyday ones.
                St. Louis is in our roots, and it shows in every plate we serve.
              </p>
            </div>
          </AnimatedSection>

          {/* Photo Gallery Placeholder */}
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-white mb-6">
              Life at Chef Daddy&apos;s
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'The pit in action',
                'Fresh-pulled pork',
                'The team',
                'Ribs on the smoker',
                'Soul food spread',
                'Our customers',
              ].map((caption, i) => (
                <div key={i} className="img-placeholder rounded-xl overflow-hidden aspect-square relative" role="img" aria-label={caption}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-smoke/20 text-xs font-body text-center px-2 gap-1">
                    {/* PLACEHOLDER: Replace with actual photo — recommended WebP format */}
                    <span>📸</span>
                    <span>{caption}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-smoke/30 text-xs font-body text-center mt-4">
              {/* PLACEHOLDER: Replace placeholder grid with real photos using Next.js Image component */}
              Photo gallery — replace with real images
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-charcoal py-16 text-center border-t border-charcoal-light">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-white">
            Come Taste the Story
          </h2>
          <p className="text-smoke/60 font-body mt-3">
            9617 Saint Charles Rock Road · St. Louis, MO · (314) 222-1488
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/order" className="btn-primary inline-block">Order Online</a>
            <a href="/contact" className="btn-outline inline-block">Get Directions</a>
          </div>
        </div>
      </section>
    </>
  );
}
