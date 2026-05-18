'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/order', label: 'Order Online' },
  { href: '/catering', label: 'Catering' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-brand-black/98 backdrop-blur-sm shadow-lg py-2'
            : 'bg-brand-black/90 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" aria-label="Chef Daddy's Home" className="flex-shrink-0">
              <Image
                src="/images/chef-daddys-logo.jpg"
                alt="Chef Daddy's Bar-B-Que & Soul Food"
                width={140}
                height={140}
                className="h-[140px] w-[140px] object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[20px] font-body font-bold transition-colors duration-200 pb-0.5 group ${
                    pathname === link.href
                      ? 'text-ember'
                      : 'text-smoke hover:text-ember'
                  }`}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-ember transition-all duration-300 ${
                      pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA + Cart */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/order"
                className="relative bg-crimson hover:bg-crimson-dark text-white font-body font-bold text-sm px-5 py-2.5 rounded transition-all duration-200 hover:shadow-lg hover:shadow-crimson/30"
                aria-label={`Order Now${itemCount > 0 ? `, ${itemCount} items in cart` : ''}`}
              >
                Order Now
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-ember text-brand-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden text-smoke p-2 hover:text-ember transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">{menuOpen ? 'Close' : 'Open'} menu</span>
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        {/* Drawer */}
        <nav
          className={`absolute right-0 top-0 h-full w-80 max-w-full bg-charcoal shadow-2xl flex flex-col transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile navigation"
        >
          <div className="p-6 border-b border-charcoal-light flex items-center justify-between">
            <Image
              src="/images/chef-daddys-logo.jpg"
              alt="Chef Daddy's Bar-B-Que & Soul Food"
              width={100}
              height={50}
              className="h-10 w-auto object-contain"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-smoke hover:text-ember p-1"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-base font-body font-medium transition-colors ${
                      pathname === link.href
                        ? 'bg-crimson/20 text-ember'
                        : 'text-smoke hover:bg-charcoal-light hover:text-ember'
                    }`}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 border-t border-charcoal-light">
            <Link
              href="/order"
              className="block w-full bg-crimson hover:bg-crimson-dark text-white font-body font-bold text-center py-3 rounded-lg transition-colors"
            >
              Order Now {itemCount > 0 && `(${itemCount})`}
            </Link>
            <p className="text-smoke/60 text-xs text-center mt-4 font-body">
              (314) 222-1488 &nbsp;·&nbsp; Pickup Only
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
