'use client';

import { useState, useRef } from 'react';
import AnimatedSection from '@/components/AnimatedSection';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  [key: string]: string;
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  honeypot: '',
};

const hours = [
  { days: 'Sunday – Thursday', hours: '12:00 PM – 7:00 PM' },
  { days: 'Friday – Saturday', hours: '12:00 PM – 10:00 PM' },
];

export default function ContactPage() {
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
    if (form.phone && !/^[\d\s\-().+]{7,20}$/.test(form.phone)) errs.phone = 'Please enter a valid phone number.';
    if (!form.subject.trim() || form.subject.trim().length < 2) errs.subject = 'Please enter a subject.';
    if (!form.message.trim() || form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.honeypot) return;
    if (!validate()) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
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
        className="py-20 text-center"
        style={{ background: 'linear-gradient(180deg, #1A1A1A 0%, #111111 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="section-heading text-white">
            Get in <span className="text-crimson">Touch</span>
          </h1>
          <p className="mt-4 text-smoke/70 font-body text-lg max-w-xl mx-auto">
            Questions, feedback, or just want to tell us how good the ribs were?
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-dark py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div>
              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-white mb-2">Send Us a Message</h2>
                <p className="text-smoke/60 font-body text-sm mb-8">
                  We typically respond within 24 hours. For urgent matters, please call us directly.
                </p>

                {status === 'success' ? (
                  <div className="bg-charcoal border border-ember/30 rounded-2xl p-10 text-center">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="font-display text-2xl text-white font-bold mb-2">Message Sent!</h3>
                    <p className="text-smoke/70 font-body text-sm">
                      We&apos;ll be in touch within 24 hours. Or call us at{' '}
                      <a href="tel:+13142221488" className="text-ember font-semibold">(314) 222-1488</a>.
                    </p>
                    <button onClick={() => setStatus('idle')} className="mt-6 btn-outline text-sm">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Contact form">
                    {/* Honeypot */}
                    <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
                      <input tabIndex={-1} type="text" name="website" value={form.honeypot}
                        onChange={(e) => update('honeypot', e.target.value)} autoComplete="off" />
                    </div>

                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="con-name" className="form-label">Name *</label>
                          <input id="con-name" type="text" className={`form-input ${errors.name ? 'error' : ''}`}
                            placeholder="Your full name" value={form.name} onChange={(e) => update('name', e.target.value)}
                            autoComplete="name" required maxLength={100} />
                          {errors.name && <p className="form-error">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="con-email" className="form-label">Email *</label>
                          <input id="con-email" type="email" className={`form-input ${errors.email ? 'error' : ''}`}
                            placeholder="you@example.com" value={form.email} onChange={(e) => update('email', e.target.value)}
                            autoComplete="email" required maxLength={254} />
                          {errors.email && <p className="form-error">{errors.email}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="con-phone" className="form-label">Phone (optional)</label>
                        <input id="con-phone" type="tel" className={`form-input ${errors.phone ? 'error' : ''}`}
                          placeholder="(314) 000-0000" value={form.phone} onChange={(e) => update('phone', e.target.value)}
                          autoComplete="tel" maxLength={20} />
                        {errors.phone && <p className="form-error">{errors.phone}</p>}
                      </div>

                      <div>
                        <label htmlFor="con-subject" className="form-label">Subject *</label>
                        <input id="con-subject" type="text" className={`form-input ${errors.subject ? 'error' : ''}`}
                          placeholder="What&apos;s this about?" value={form.subject} onChange={(e) => update('subject', e.target.value)}
                          required maxLength={200} />
                        {errors.subject && <p className="form-error">{errors.subject}</p>}
                      </div>

                      <div>
                        <label htmlFor="con-message" className="form-label">Message *</label>
                        <textarea id="con-message" className={`form-input resize-none ${errors.message ? 'error' : ''}`}
                          rows={5} placeholder="Your message..." value={form.message}
                          onChange={(e) => update('message', e.target.value)} required maxLength={3000} />
                        {errors.message && <p className="form-error">{errors.message}</p>}
                      </div>

                      {status === 'error' && (
                        <p className="text-crimson font-body text-sm bg-crimson/10 border border-crimson/30 rounded-lg px-4 py-3">
                          Something went wrong. Please try again or call (314) 222-1488.
                        </p>
                      )}

                      <button type="submit" disabled={status === 'submitting'}
                        className="w-full btn-primary text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                        {status === 'submitting' ? 'Sending...' : 'Send Message'}
                      </button>
                      <p className="text-smoke/40 text-xs font-body text-center">
                        Sent to Chefdaddy933@gmail.com
                      </p>
                    </div>
                  </form>
                )}
              </AnimatedSection>
            </div>

            {/* Contact Info + Map */}
            <div className="space-y-8">
              <AnimatedSection delay={100}>
                <h2 className="font-display text-3xl font-bold text-white mb-6">Find Us</h2>

                {/* Contact details */}
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="mt-0.5 flex-shrink-0" aria-hidden="true"></div>
                    <div>
                      <p className="text-white font-body font-semibold text-sm mb-0.5">Address</p>
                      <address className="not-italic text-smoke/70 font-body text-sm leading-relaxed">
                        9617 Saint Charles Rock Road<br />St. Louis, MO
                      </address>
                      <a
                        href="https://www.google.com/maps/search/9617+Saint+Charles+Rock+Road+St+Louis+MO"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ember text-xs font-body hover:text-flame transition-colors mt-1 inline-block"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-0.5 flex-shrink-0" aria-hidden="true"></div>
                    <div>
                      <p className="text-white font-body font-semibold text-sm mb-0.5">Phone</p>
                      <a href="tel:+13142221488" className="text-smoke/70 hover:text-ember font-body text-sm transition-colors">
                        (314) 222-1488
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-0.5 flex-shrink-0" aria-hidden="true"></div>
                    <div>
                      <p className="text-white font-body font-semibold text-sm mb-0.5">Email</p>
                      <a href="mailto:Chefdaddy933@gmail.com" className="text-smoke/70 hover:text-ember font-body text-sm transition-colors">
                        Chefdaddy933@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-0.5 flex-shrink-0" aria-hidden="true"></div>
                    <div>
                      <p className="text-white font-body font-semibold text-sm mb-2">Hours of Operation</p>
                      <ul className="space-y-1">
                        {hours.map((h) => (
                          <li key={h.days} className="text-smoke/70 font-body text-sm flex flex-col sm:flex-row sm:gap-3">
                            <span className="text-smoke/50 min-w-36">{h.days}</span>
                            <span className="text-smoke">{h.hours}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-0.5 flex-shrink-0" aria-hidden="true">
                      <svg className="w-5 h-5 fill-current text-[#1877F2]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-body font-semibold text-sm mb-0.5">Facebook</p>
                      <a
                        href="https://www.facebook.com/share/1EFPW24awJ/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-smoke/70 hover:text-ember font-body text-sm transition-colors"
                      >
                        Follow us on Facebook →
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Google Maps Embed */}
              <AnimatedSection delay={200}>
                <div className="rounded-xl overflow-hidden border border-charcoal-light" style={{ height: '320px' }}>
                  <iframe
                    title="Chef Daddy's Bar-B-Que location on Google Maps"
                    src="https://maps.google.com/maps?q=9617+Saint+Charles+Rock+Road+St+Louis+MO&output=embed&z=15"
                    width="100%"
                    height="320"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="text-smoke/40 text-xs font-body text-center mt-2">
                  9617 Saint Charles Rock Road, St. Louis, MO
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
