import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata: Metadata = {
  title: 'Customer Reviews',
  description:
    "Read what customers say about Chef Daddy's Bar-B-Que & Soul Food in St. Louis, MO. Five-star BBQ and soul food reviews from Google and Facebook.",
  alternates: { canonical: 'https://www.chefdaddysbbq.com/reviews' },
};

const placeholderReviews = [
  {
    name: 'Marcus T.',
    rating: 5,
    date: 'March 2025',
    source: 'Google',
    text: 'The best BBQ in all of St. Louis. I drive past three other BBQ spots just to get here. The rib tips are out of this world and the mac & cheese is better than my mom\'s (don\'t tell her).',
    avatar: 'M',
  },
  {
    name: 'Denise W.',
    rating: 5,
    date: 'February 2025',
    source: 'Google',
    text: "Ordered for a family event and everyone was asking where the food came from. Chef Daddy's catered our reunion last year and we're already booked for this summer. The brisket is unreal.",
    avatar: 'D',
  },
  {
    name: 'James & Sharon K.',
    rating: 5,
    date: 'January 2025',
    source: 'Facebook',
    text: "We've been coming here since 2016 and it never disappoints. The sweet potato pie alone is worth the trip. Portions are generous and the prices are fair. Chef Daddy keeps it real.",
    avatar: 'J',
  },
  {
    name: 'Pastor Raymond L.',
    rating: 5,
    date: 'December 2024',
    source: 'Google',
    text: 'Chef Daddy fed our entire congregation at our Christmas dinner — over 200 people. Everything was hot, fresh, and absolutely delicious. Our congregation is still talking about it. We will absolutely use them again.',
    avatar: 'R',
  },
  {
    name: 'Tamika S.',
    rating: 5,
    date: 'November 2024',
    source: 'Google',
    text: 'The pulled pork sandwich changed my life. I had no idea BBQ could be this good in St. Louis. The smoke ring on the brisket is picture-perfect and the collard greens taste just like home.',
    avatar: 'T',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <span className="stars text-xl" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  );
}

export default function ReviewsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-24 text-center"
        style={{ background: 'linear-gradient(180deg, #1A1A1A 0%, #111111 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="stars text-4xl mb-4" aria-hidden="true">★★★★★</div>
          <h1 className="section-heading text-white">
            What People Are{' '}
            <span className="text-crimson">Saying</span>
          </h1>
          <p className="mt-4 text-smoke/70 font-body text-lg max-w-xl mx-auto">
            Don&apos;t take our word for it. Here&apos;s what St. Louis has to say about Chef Daddy&apos;s Bar-B-Que &amp; Soul Food.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section-charcoal border-b border-charcoal-light py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-display text-4xl font-black text-ember">5.0</p>
              <div className="stars text-lg mt-1" aria-label="5 stars">★★★★★</div>
              <p className="text-smoke/60 font-body text-xs mt-1">Average Rating</p>
            </div>
            <div>
              <p className="font-display text-4xl font-black text-ember">
                {/* PLACEHOLDER: Replace with actual review count from Google Business Profile */}
                100+
              </p>
              <p className="text-smoke/60 font-body text-xs mt-2">Google Reviews</p>
            </div>
            <div>
              <p className="font-display text-4xl font-black text-ember">Est.</p>
              <p className="font-display text-4xl font-black text-ember -mt-2">2015</p>
              <p className="text-smoke/60 font-body text-xs mt-1">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Widget */}
      <section className="section-dark py-16 border-b border-charcoal-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="bg-charcoal border border-charcoal-light rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4" aria-hidden="true">🗺️</div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Google Reviews</h2>
            <p className="text-smoke/60 font-body text-sm mb-6 max-w-md mx-auto">
              {/*
                PLACEHOLDER: Embed Google Reviews widget here.
                Steps:
                1. Claim your Google Business Profile at business.google.com
                2. Search "Google Reviews Widget" or use a service like Elfsight, ReviewsWidget, or Google's own embed
                3. Replace this box with the embed code

                Free option: Use Elfsight Google Reviews widget (elfsight.com)
                Or link directly to your Google Business profile reviews page.
              */}
              Connect your Google Business Profile to display live reviews here.
              Once connected, customers can see your latest reviews in real-time.
            </p>
            <a
              href={`https://search.google.com/local/reviews?placeid=PLACEHOLDER_PLACE_ID`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-block text-sm"
            >
              {/* PLACEHOLDER: Replace PLACEHOLDER_PLACE_ID with your Google Place ID */}
              View on Google →
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Review Cards */}
      <section className="section-charcoal py-20 sm:py-24" aria-label="Customer testimonials">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-heading text-white">
              Customer <span className="text-ember">Testimonials</span>
            </h2>
            <p className="text-smoke/50 font-body text-xs mt-2">
              {/* PLACEHOLDER: Replace these placeholder reviews with real customer reviews */}
              Placeholder reviews — replace with actual customer testimonials
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderReviews.map((review, i) => (
              <AnimatedSection
                key={review.name}
                delay={i * 100}
                className="card-hover bg-brand-black border border-charcoal-light rounded-xl p-6 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full bg-crimson flex items-center justify-center text-white font-display font-bold text-base flex-shrink-0"
                    aria-hidden="true"
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-white font-body font-semibold text-sm">{review.name}</p>
                    <p className="text-smoke/50 text-xs font-body">{review.date} · {review.source}</p>
                  </div>
                </div>

                <StarRating count={review.rating} />

                <blockquote className="mt-3 text-smoke/70 font-body text-sm leading-relaxed flex-1">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Leave a Review */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #111111 100%)' }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-bold text-white">
              Had a Great Experience?
            </h2>
            <p className="mt-4 text-smoke/70 font-body">
              Let the world know! Your review helps other St. Louis BBQ lovers find us.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://g.page/r/PLACEHOLDER_GOOGLE_REVIEW_LINK/review"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                {/* PLACEHOLDER: Replace with your actual Google review link */}
                Leave a Google Review ★
              </a>
              <a
                href="https://www.facebook.com/share/1EFPW24awJ/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-block"
              >
                Review on Facebook
              </a>
            </div>
            <p className="mt-6 text-smoke/40 font-body text-xs">
              {/* PLACEHOLDER: Get your Google review link from Google Business Profile dashboard */}
              Getting your Google review link: Google Business Profile → Get more reviews → Share review form
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
