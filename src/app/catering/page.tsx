'use client';

import { useState, useRef } from 'react';
import type { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';

// Note: metadata export works in Server Components only.
// For this page's SEO, add to the metadata in layout.tsx or convert to a server component wrapper.

const services = [
  {
    title: 'Private Events & Celebrations',
    description: 'Birthdays, anniversaries, graduation parties, family reunions — let Chef Daddy feed the people you love.',
    image: 'https://images.unsplash.com/photo-1573998835860-99848a59f67f?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Corporate Catering',
    description: 'Company lunches, team events, office parties. Impress your team with real BBQ and soul food.',
    image: 'https://images.unsplash.com/photo-1741896520047-4727543ec8ee?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Church Events',
    description: "Feeds the congregation right. Chef Daddy's has catered dozens of church events across St. Louis.",
    image: 'https://images.unsplash.com/photo-1732850714203-d40cd333968e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'School & Community Events',
    description: 'Graduation ceremonies, school fundraisers, block parties. Affordable, delicious, and crowd-friendly.',
    image: 'https://images.unsplash.com/photo-1768232124647-d09a93d5f521?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Weddings & Receptions',
    description: 'Make your special day unforgettable with a spread that has guests going back for seconds and thirds.',
    image: 'https://images.unsplash.com/photo-1745231991466-19d41014cc66?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Large-Scale Events',
    description: 'From block parties to large community gatherings, we bring the smoke and the soul to feed your crowd.',
    image: 'https://images.unsplash.com/photo-1761506389871-5f33c25d8057?auto=format&fit=crop&w=800&q=80',
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  guestCount: string;
  specialRequests: string;
  honeypot: string;
}

interface FormErrors {
  [key: string]: string;
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  eventType: '',
  guestCount: '',
  specialRequests: '',
  honeypot: '',
};

export default function CateringPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  }

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'Please enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email.';
    if (!form.phone.trim() || !/^[\d\s\-().+]{7,20}$/.test(form.phone)) errs.phone = 'Please enter a valid phone number.';
    if (!form.eventDate) errs.eventDate = 'Please select an event date.';
    if (!form.eventType.trim() || form.eventType.trim().length < 3) errs.eventType = 'Please describe the event type.';
    const guests = parseInt(form.guestCount, 10);
    if (isNaN(guests) || guests < 1) errs.guestCount = 'Please enter estimated guest count.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.honeypot) return; // Bot trap
    if (!validate()) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/catering', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm(initialForm);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      {/* Hero */}
      <section
        className="py-24 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #111111 0%, #1A1A1A 100%)' }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 100%, #E8651A 0%, transparent 60%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">

          <h1 className="section-heading text-white">
            Let Chef Daddy{' '}
            <span className="text-crimson">Feed Your Crowd</span>
          </h1>
          <p className="mt-6 text-smoke/80 font-body text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            From intimate family gatherings to corporate events —
            we bring the smoke, the soul, and the satisfaction. St. Louis catering done right.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#catering-form" className="btn-primary inline-block">
              Request a Catering Quote
            </a>
            <a href="tel:+13142221488" className="btn-outline inline-block">
              Call (314) 222-1488
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-charcoal py-20 sm:py-24" aria-label="Catering services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="section-heading text-white">
              What We <span className="text-ember">Cater</span>
            </h2>
            <p className="mt-3 text-smoke/60 font-body max-w-lg mx-auto">
              No event is too big or too small. If you need to feed people and feed them well, Chef Daddy&apos;s is ready.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimatedSection
                key={s.title}
                delay={i * 100}
                className="card-hover rounded-xl overflow-hidden border border-charcoal-light relative min-h-[220px] flex flex-col justify-end"
              >
                {/* Background photo */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${s.image}')` }}
                  role="img"
                  aria-label={s.title}
                />
                {/* Gradient overlay — darker at bottom for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
                {/* Content */}
                <div className="relative z-10 p-7">
                  <h3 className="font-display text-xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-smoke/80 font-body text-sm leading-relaxed">{s.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="section-dark py-14 border-y border-charcoal-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <AnimatedSection>
              {/* PLACEHOLDER: Replace TBD with your actual minimum order amount */}
              <p className="text-ember font-display text-3xl font-bold mb-1">TBD</p>
              <p className="text-smoke/60 font-body text-sm">Minimum Order<br /><span className="text-smoke/40 text-xs">(contact us for details)</span></p>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              {/* PLACEHOLDER: Replace with your actual service area / radius */}
              <p className="text-ember font-display text-3xl font-bold mb-1">STL</p>
              <p className="text-smoke/60 font-body text-sm">Service Area<br /><span className="text-smoke/40 text-xs">St. Louis Metro &amp; Surrounding</span></p>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <p className="text-ember font-display text-3xl font-bold mb-1">Est. 2015</p>
              <p className="text-smoke/60 font-body text-sm">Years Feeding<br />St. Louis</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Catering Form */}
      <section id="catering-form" className="section-charcoal py-20 sm:py-24" aria-label="Catering inquiry form">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-heading text-white">
              Request a <span className="text-crimson">Quote</span>
            </h2>
            <p className="mt-3 text-smoke/60 font-body">
              Fill out the form below and we&apos;ll get back to you within 24 hours to discuss your event.
            </p>
          </AnimatedSection>

          {status === 'success' ? (
            <AnimatedSection className="text-center bg-brand-black border border-ember/30 rounded-2xl p-12">
              <h3 className="font-display text-3xl text-white font-bold mb-3">Request Received!</h3>
              <p className="text-smoke/70 font-body">
                We&apos;ll reach out within 24 hours to discuss your event. Questions? Call us at{' '}
                <a href="tel:+13142221488" className="text-ember font-semibold">(314) 222-1488</a>.
              </p>
            </AnimatedSection>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Catering inquiry form">
              {/* Honeypot — hidden from real users */}
              <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
                <input
                  tabIndex={-1}
                  type="text"
                  name="website"
                  value={form.honeypot}
                  onChange={(e) => update('honeypot', e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="bg-brand-black border border-charcoal-light rounded-2xl p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="cat-name" className="form-label">Your Name *</label>
                    <input id="cat-name" type="text" className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Full name" value={form.name} onChange={(e) => update('name', e.target.value)}
                      autoComplete="name" required maxLength={100} />
                    {errors.name && <p className="form-error">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="cat-email" className="form-label">Email Address *</label>
                    <input id="cat-email" type="email" className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="you@example.com" value={form.email} onChange={(e) => update('email', e.target.value)}
                      autoComplete="email" required maxLength={254} />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="cat-phone" className="form-label">Phone Number *</label>
                    <input id="cat-phone" type="tel" className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="(314) 000-0000" value={form.phone} onChange={(e) => update('phone', e.target.value)}
                      autoComplete="tel" required maxLength={20} />
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
                  </div>

                  {/* Event Date */}
                  <div>
                    <label htmlFor="cat-date" className="form-label">Event Date *</label>
                    <input id="cat-date" type="date" className={`form-input ${errors.eventDate ? 'error' : ''}`}
                      value={form.eventDate} onChange={(e) => update('eventDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]} required />
                    {errors.eventDate && <p className="form-error">{errors.eventDate}</p>}
                  </div>

                  {/* Event Type */}
                  <div>
                    <label htmlFor="cat-type" className="form-label">Event Type *</label>
                    <select id="cat-type" className={`form-input ${errors.eventType ? 'error' : ''}`}
                      value={form.eventType} onChange={(e) => update('eventType', e.target.value)} required>
                      <option value="">Select event type...</option>
                      <option value="Birthday / Celebration">Birthday / Celebration</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Church Event">Church Event</option>
                      <option value="Wedding / Reception">Wedding / Reception</option>
                      <option value="School / Community Event">School / Community Event</option>
                      <option value="Family Reunion">Family Reunion</option>
                      <option value="Block Party">Block Party</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.eventType && <p className="form-error">{errors.eventType}</p>}
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label htmlFor="cat-guests" className="form-label">Estimated Guest Count *</label>
                    <input id="cat-guests" type="number" className={`form-input ${errors.guestCount ? 'error' : ''}`}
                      placeholder="e.g. 50" value={form.guestCount} onChange={(e) => update('guestCount', e.target.value)}
                      min="1" max="10000" required />
                    {errors.guestCount && <p className="form-error">{errors.guestCount}</p>}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="cat-requests" className="form-label">Special Requests or Notes</label>
                  <textarea id="cat-requests" className="form-input resize-none" rows={4}
                    placeholder="Tell us about your event, dietary needs, specific dishes you want, or any other details..."
                    value={form.specialRequests} onChange={(e) => update('specialRequests', e.target.value)}
                    maxLength={2000} />
                </div>

                {status === 'error' && (
                  <p className="text-crimson font-body text-sm bg-crimson/10 border border-crimson/30 rounded-lg px-4 py-3">
                    Something went wrong. Please try again or call us at (314) 222-1488.
                  </p>
                )}

                <button type="submit" disabled={status === 'submitting'}
                  className="w-full btn-primary text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                  {status === 'submitting' ? 'Sending Inquiry...' : 'Send Catering Inquiry'}
                </button>
                <p className="text-smoke/40 text-xs font-body text-center">
                  Your inquiry will be sent to Chefdaddy933@gmail.com
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
