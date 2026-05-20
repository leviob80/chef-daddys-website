import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: "Privacy Policy for Chef Daddy's Bar-B-Que & Soul Food website.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <section className="section-dark py-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-smoke/50 font-body text-sm mb-10">Last updated: 2025</p>

        <div className="prose prose-invert max-w-none space-y-8 font-body text-smoke/80 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Information We Collect</h2>
            <p>
              When you use our website, we may collect information you voluntarily provide through
              our contact, catering inquiry, or order forms — including your name, email address,
              phone number, and message content.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your inquiries and catering requests</li>
              <li>To process and confirm your orders</li>
              <li>To communicate about your order or event</li>
              <li>We do not sell, rent, or share your personal information with third parties for marketing</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Payment Information</h2>
            <p>
              We do not store any credit card or payment information on our servers.
              All payment processing is handled by PCI-compliant third-party processors (Stripe, Square, or PayPal).
              No payment card data touches our systems.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Cookies &amp; Analytics</h2>
            <p>
              Our website may use cookies and Google Analytics to understand how visitors use our site.
              This data is aggregated and anonymous. You can disable cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction.
              Our website uses HTTPS/SSL encryption.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us at{' '}
              <a href="mailto:Chefdaddy933@gmail.com" className="text-ember hover:text-flame transition-colors">
                Chefdaddy933@gmail.com
              </a>{' '}
              or call{' '}
              <a href="tel:+13142221488" className="text-ember hover:text-flame transition-colors">
                (314) 222-1488
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal-light">
          <Link href="/" className="text-ember hover:text-flame font-body font-semibold transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
