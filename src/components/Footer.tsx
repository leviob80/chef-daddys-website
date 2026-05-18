import Image from 'next/image';
import Link from 'next/link';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/order', label: 'Order Online' },
  { href: '/catering', label: 'Catering' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-charcoal-light text-smoke" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Chef Daddy's Home" className="inline-block">
              <Image
                src="/images/chef-daddys-logo.jpg"
                alt="Chef Daddy's Bar-B-Que & Soul Food"
                width={150}
                height={150}
                className="h-[150px] w-[150px] object-contain"
              />
            </Link>
            <p className="mt-4 text-smoke/70 text-sm font-body leading-relaxed">
              Real BBQ. Real Soul. Real St. Louis.<br />
              Est. 2015 — St. Louis, Missouri.
            </p>
            <a
              href="https://www.facebook.com/share/1EFPW24awJ/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-smoke/70 hover:text-ember transition-colors"
              aria-label="Chef Daddy's Facebook page"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-body">Facebook</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-body font-bold text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-smoke/70 hover:text-ember text-sm font-body transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-body font-bold text-white text-sm uppercase tracking-wider mb-4">
              Hours of Operation
            </h3>
            <ul className="space-y-2 text-sm font-body text-smoke/70">
              <li className="flex justify-between gap-4">
                <span>Sunday – Thursday</span>
                <span className="text-smoke whitespace-nowrap">12 PM – 7 PM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Friday – Saturday</span>
                <span className="text-smoke whitespace-nowrap">12 PM – 10 PM</span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-smoke/50 font-body">
              Hours subject to change. Call ahead on holidays.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body font-bold text-white text-sm uppercase tracking-wider mb-4">
              Find Us
            </h3>
            <address className="not-italic space-y-3 text-sm font-body text-smoke/70">
              <p>
                <a
                  href="https://www.google.com/maps/search/9617+Saint+Charles+Rock+Road+St+Louis+MO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ember transition-colors"
                >
                  9617 Saint Charles Rock Road<br />
                  St. Louis, MO
                </a>
              </p>
              <p>
                <a href="tel:+13142221488" className="hover:text-ember transition-colors">
                  (314) 222-1488
                </a>
              </p>
              <p>
                <a href="mailto:Chefdaddy933@gmail.com" className="hover:text-ember transition-colors">
                  Chefdaddy933@gmail.com
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-smoke/50 font-body">
          <p>&copy; 2025 Chef Daddy&apos;s Bar-B-Que &amp; Soul Food. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-smoke transition-colors">
              Privacy Policy
            </Link>
            <span>Site designed for Chef Daddy&apos;s | St. Louis, MO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
