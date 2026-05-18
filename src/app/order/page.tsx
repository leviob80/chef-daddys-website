'use client';

import { useState } from 'react';
import { menuSections, MenuCategoryId } from '@/lib/menu-data';
import { useCart, CartItem } from '@/context/CartContext';
import AnimatedSection from '@/components/AnimatedSection';

type OrderStep = 'browse' | 'checkout' | 'confirmed';

interface CustomerInfo {
  name: string;
  phone: string;
  pickupTime: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  pickupTime?: string;
}

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

const TAX_RATE = 0.09237; // Missouri St. Louis tax rate (PLACEHOLDER: confirm actual rate)

// Close hour (24h) by day: 0=Sun … 6=Sat
const CLOSE_HOUR: Record<number, number> = {
  0: 19, 1: 19, 2: 19, 3: 19, 4: 19, // Sun–Thu  7 PM
  5: 22, 6: 22,                        // Fri–Sat 10 PM
};
const OPEN_HOUR = 12; // every day

interface CTInfo {
  day: number;   // 0=Sun … 6=Sat
  hour: number;
  minute: number;
  totalMinutes: number;
}

function getCTInfo(): CTInfo {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  const DAY: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  const hour = parseInt(get('hour'));
  const minute = parseInt(get('minute'));
  return {
    day: DAY[get('weekday')] ?? 0,
    hour,
    minute,
    totalMinutes: hour * 60 + minute,
  };
}

function isRestaurantOpen(): boolean {
  const { day, totalMinutes } = getCTInfo();
  return totalMinutes >= OPEN_HOUR * 60 && totalMinutes < CLOSE_HOUR[day] * 60;
}

function getNextOpenLabel(): string {
  const { day, totalMinutes } = getCTInfo();
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  if (totalMinutes < OPEN_HOUR * 60) {
    // Haven't opened yet today
    return 'today at 12:00 PM CT';
  }
  // Already past closing — find tomorrow
  const nextDay = (day + 1) % 7;
  const tomorrow = day === 6 ? 'Sunday' : DAYS[nextDay];
  const label = nextDay === (getCTInfo().day + 1) % 7 ? 'tomorrow' : tomorrow;
  return `${label} at 12:00 PM CT`;
}

function formatSlot(totalMins: number): string {
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${display}:${m.toString().padStart(2, '0')} ${period} CT`;
}

function generatePickupTimes(): string[] {
  const ct = getCTInfo();
  const open = isRestaurantOpen();
  const slots: string[] = [];

  let startMins: number;
  let closeHour: number;

  if (open) {
    // Round up to next 15-min mark, at least 30 min from now
    const raw = ct.totalMinutes + 30;
    startMins = Math.ceil(raw / 15) * 15;
    closeHour = CLOSE_HOUR[ct.day];
  } else {
    // Next opening is always at noon (next available day)
    startMins = OPEN_HOUR * 60;
    const nextDay = ct.totalMinutes >= CLOSE_HOUR[ct.day] * 60
      ? (ct.day + 1) % 7
      : ct.day; // before open today — still today
    closeHour = CLOSE_HOUR[nextDay];
  }

  const endMins = closeHour * 60;
  for (let m = startMins; m < endMins; m += 15) {
    slots.push(formatSlot(m));
  }
  return slots;
}

export default function OrderPage() {
  const { items, addItem, removeItem, updateQuantity, clearCart, totalCents, itemCount } = useCart();
  const [step, setStep] = useState<OrderStep>('browse');
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('bbq-specialties');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({ name: '', phone: '', pickupTime: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const open = isRestaurantOpen();
  const nextOpenLabel = open ? '' : getNextOpenLabel();

  const activeSection = menuSections.find((s) => s.id === activeCategory)!;
  const taxCents = Math.round(totalCents * TAX_RATE);
  const grandTotalCents = totalCents + taxCents;
  const pickupTimes = generatePickupTimes();

  function handleAdd(item: { id: string; name: string; priceCents: number }) {
    addItem(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1400);
  }

  function cartQty(id: string) {
    return items.find((i) => i.id === id)?.quantity ?? 0;
  }

  function validateCheckout(): boolean {
    const errs: FormErrors = {};
    if (!customerInfo.name.trim() || customerInfo.name.trim().length < 2) {
      errs.name = 'Please enter your name.';
    }
    if (!customerInfo.phone.trim() || !/^[\d\s\-().+]{7,20}$/.test(customerInfo.phone)) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (!customerInfo.pickupTime) {
      errs.pickupTime = 'Please select a pickup time.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handlePlaceOrder() {
    if (!validateCheckout()) return;
    if (itemCount === 0) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: customerInfo,
          items,
          totalCents: grandTotalCents,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOrderNumber(data.orderNumber ?? `CD-${Date.now().toString(36).toUpperCase()}`);
        clearCart();
        setStep('confirmed');
      } else {
        alert('There was an issue placing your order. Please call us at (314) 222-1488.');
      }
    } catch {
      alert('Network error. Please try again or call (314) 222-1488.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (step === 'confirmed') {
    return (
      <section className="min-h-screen section-dark flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-7xl mb-6">🎉</div>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Order Confirmed!</h1>
          <div className="bg-charcoal border border-ember/40 rounded-xl p-6 mb-6">
            <p className="text-smoke/70 font-body text-sm mb-2">Order Number</p>
            <p className="font-display text-3xl font-bold text-ember">{orderNumber}</p>
            <p className="text-smoke/70 font-body text-sm mt-4">
              Pickup Time: <span className="text-white font-semibold">{customerInfo.pickupTime}</span>
            </p>
            <p className="text-smoke/70 font-body text-sm mt-1">
              Total: <span className="text-white font-semibold">{formatCents(grandTotalCents)}</span>
            </p>
          </div>
          <p className="text-smoke/60 font-body text-sm mb-2">
            Your order is being prepared! Pick up at:
          </p>
          <p className="text-smoke font-body font-semibold mb-6">
            9617 Saint Charles Rock Road, St. Louis, MO
          </p>
          <a href="tel:+13142221488" className="text-ember hover:text-flame font-body font-bold underline">
            Questions? Call (314) 222-1488
          </a>
          <button
            onClick={() => { setStep('browse'); setCustomerInfo({ name: '', phone: '', pickupTime: '' }); }}
            className="mt-8 block w-full btn-outline"
          >
            Place Another Order
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen section-dark">
      {/* Page Header */}
      <div className="bg-charcoal border-b border-charcoal-light py-10 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">
          Order <span className="text-crimson">Pickup</span> Online
        </h1>
        <p className="text-smoke/70 font-body mt-2">
          9617 Saint Charles Rock Road · St. Louis, MO · (314) 222-1488
        </p>
        <p className="text-smoke/50 font-body text-xs mt-1">
          Pickup orders only. Payment collected at pickup.
        </p>
      </div>

      {/* Closed Banner */}
      {!open && (
        <div className="bg-brand-black border-b border-ember/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">🕐</span>
              <div>
                <p className="text-white font-body font-bold text-sm">
                  We&apos;re currently closed
                </p>
                <p className="text-smoke/60 font-body text-xs mt-0.5">
                  Sun–Thu: 12 PM – 7 PM &nbsp;·&nbsp; Fri–Sat: 12 PM – 10 PM (Central Time)
                </p>
              </div>
            </div>
            <div className="bg-ember/10 border border-ember/40 rounded-lg px-4 py-2.5 text-center flex-shrink-0">
              <p className="text-ember font-body font-bold text-sm">
                Next opening: {nextOpenLabel}
              </p>
              <p className="text-smoke/60 font-body text-xs mt-0.5">
                You can still build your order &amp; schedule a future pickup
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 relative">
          {/* Left: Browse + Checkout */}
          <div className="flex-1 min-w-0">
            {/* Step tabs */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setStep('browse')}
                className={`flex items-center gap-2 text-sm font-body font-semibold pb-2 border-b-2 transition-colors ${
                  step === 'browse' ? 'border-crimson text-white' : 'border-transparent text-smoke/50 hover:text-smoke/80'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-crimson text-white text-xs flex items-center justify-center">1</span>
                Browse &amp; Add Items
              </button>
              <button
                onClick={() => { if (itemCount > 0) setStep('checkout'); }}
                className={`flex items-center gap-2 text-sm font-body font-semibold pb-2 border-b-2 transition-colors ${
                  step === 'checkout' ? 'border-crimson text-white' : 'border-transparent text-smoke/50 hover:text-smoke/80'
                } ${itemCount === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                disabled={itemCount === 0}
              >
                <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${step === 'checkout' ? 'bg-crimson text-white' : 'bg-charcoal-light text-smoke/60'}`}>2</span>
                Your Info &amp; Payment
              </button>
            </div>

            {step === 'browse' && (
              <>
                {/* Category tabs */}
                <nav className="flex gap-2 overflow-x-auto pb-2 mb-6" aria-label="Menu categories">
                  {menuSections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveCategory(s.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-body font-semibold whitespace-nowrap transition-all ${
                        activeCategory === s.id
                          ? 'bg-crimson text-white'
                          : 'bg-charcoal text-smoke/70 hover:text-smoke border border-charcoal-light'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </nav>

                <h2 className="font-display text-2xl font-bold text-white mb-5">{activeSection.label}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeSection.items.map((item) => {
                    const qty = cartQty(item.id);
                    return (
                      <div
                        key={item.id}
                        className="bg-charcoal border border-charcoal-light rounded-xl p-4 flex gap-4 items-start"
                      >
                        {/* PLACEHOLDER: Replace with actual food thumbnail */}
                        <div className="img-placeholder w-20 h-20 rounded-lg flex-shrink-0" role="img" aria-label={item.imageAlt} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-body font-semibold text-white text-sm leading-snug">{item.name}</h3>
                            <span className="text-ember font-body font-bold text-sm whitespace-nowrap">{item.price}</span>
                          </div>
                          <p className="text-smoke/50 text-xs font-body mt-1 line-clamp-1">
                            {/* PLACEHOLDER: Insert actual description */}
                            Made fresh daily.
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            {qty > 0 ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.id, qty - 1)}
                                  className="w-7 h-7 rounded bg-charcoal-light text-smoke hover:bg-crimson hover:text-white transition-colors text-sm font-bold"
                                  aria-label={`Remove one ${item.name}`}
                                >−</button>
                                <span className="text-white font-body font-bold text-sm w-4 text-center">{qty}</span>
                                <button
                                  onClick={() => handleAdd(item)}
                                  className="w-7 h-7 rounded bg-charcoal-light text-smoke hover:bg-crimson hover:text-white transition-colors text-sm font-bold"
                                  aria-label={`Add another ${item.name}`}
                                >+</button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleAdd(item)}
                                className={`text-xs font-body font-bold py-1.5 px-4 rounded transition-all duration-300 ${
                                  addedId === item.id
                                    ? 'bg-ember text-brand-black'
                                    : 'bg-crimson hover:bg-crimson-dark text-white'
                                }`}
                                aria-label={`Add ${item.name} to order`}
                              >
                                {addedId === item.id ? '✓ Added' : '+ Add'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {step === 'checkout' && (
              <AnimatedSection>
                <h2 className="font-display text-2xl font-bold text-white mb-6">Your Information</h2>
                <div className="max-w-lg space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="order-name" className="form-label">Full Name *</label>
                    <input
                      id="order-name"
                      type="text"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Your full name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      autoComplete="name"
                      required
                      maxLength={100}
                    />
                    {errors.name && <p className="form-error">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="order-phone" className="form-label">Phone Number *</label>
                    <input
                      id="order-phone"
                      type="tel"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="(314) 000-0000"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      autoComplete="tel"
                      required
                      maxLength={20}
                    />
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
                  </div>

                  {/* Pickup Time */}
                  <div>
                    <label htmlFor="order-pickup" className="form-label">
                      {open ? 'Pickup Time *' : 'Schedule Pickup Time *'}
                    </label>
                    {!open && (
                      <p className="text-ember text-xs font-body mb-2">
                        Showing available times for {nextOpenLabel}
                      </p>
                    )}
                    <select
                      id="order-pickup"
                      className={`form-input ${errors.pickupTime ? 'error' : ''}`}
                      value={customerInfo.pickupTime}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, pickupTime: e.target.value })}
                      required
                    >
                      <option value="">
                      {open ? 'Select a pickup time...' : `Select a time for ${nextOpenLabel}...`}
                    </option>
                      {pickupTimes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.pickupTime && <p className="form-error">{errors.pickupTime}</p>}
                  </div>

                  {/* Order Summary */}
                  <div className="bg-charcoal border border-charcoal-light rounded-xl p-5">
                    <h3 className="font-body font-bold text-white mb-4">Order Summary</h3>
                    <div className="space-y-2 mb-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm font-body">
                          <span className="text-smoke/70">{item.name} × {item.quantity}</span>
                          <span className="text-smoke">{formatCents(item.priceCents * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-charcoal-light pt-3 space-y-1">
                      <div className="flex justify-between text-sm font-body text-smoke/70">
                        <span>Subtotal</span>
                        <span>{formatCents(totalCents)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-body text-smoke/70">
                        <span>Tax (est.)</span>
                        <span>{formatCents(taxCents)}</span>
                      </div>
                      <div className="flex justify-between font-body font-bold text-white text-base pt-1">
                        <span>Total</span>
                        <span className="text-ember">{formatCents(grandTotalCents)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Notice */}
                  <div className="bg-ember/10 border border-ember/30 rounded-xl p-5">
                    <h4 className="font-body font-bold text-ember text-sm mb-2">
                      💳 Payment at Pickup
                    </h4>
                    <p className="text-smoke/70 text-xs font-body leading-relaxed">
                      Payment is collected when you pick up your order. We accept cash, credit card, and debit card.
                    </p>
                    {/*
                      PLACEHOLDER: Online payment integration
                      To enable online payment, uncomment and configure one of the following:

                      STRIPE:
                        1. npm install @stripe/stripe-js @stripe/react-stripe-js
                        2. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local
                        3. Import and initialize: import { loadStripe } from '@stripe/stripe-js'
                        4. Wrap checkout in <Elements stripe={stripePromise}>
                        5. Add <PaymentElement /> and call stripe.confirmPayment()

                      SQUARE:
                        1. npm install @square/web-sdk
                        2. Set NEXT_PUBLIC_SQUARE_APPLICATION_ID and NEXT_PUBLIC_SQUARE_LOCATION_ID in .env.local
                        3. Initialize: const payments = Square.payments(appId, locationId)
                        4. Create card: const card = await payments.card(); await card.attach('#card-container')

                      PAYPAL:
                        1. npm install @paypal/react-paypal-js
                        2. Set NEXT_PUBLIC_PAYPAL_CLIENT_ID in .env.local
                        3. Wrap in <PayPalScriptProvider options={{ clientId }}>
                        4. Add <PayPalButtons createOrder={...} onApprove={...} />
                    */}
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="w-full bg-crimson hover:bg-crimson-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-black text-base py-4 rounded-lg transition-all"
                  >
                    {isSubmitting
                    ? (open ? 'Placing Order...' : 'Scheduling Order...')
                    : open
                      ? `Place Order · ${formatCents(grandTotalCents)}`
                      : `Schedule Order · ${formatCents(grandTotalCents)}`
                  }
                  </button>

                  <p className="text-smoke/40 text-xs font-body text-center">
                    By placing this order you agree to pick up at 9617 Saint Charles Rock Road, St. Louis, MO.
                  </p>
                </div>
              </AnimatedSection>
            )}
          </div>

          {/* Right: Cart Sidebar (desktop) */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-charcoal border border-charcoal-light rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-charcoal-light flex items-center justify-between">
                  <h2 className="font-body font-bold text-white text-sm">
                    Your Cart {itemCount > 0 && <span className="text-ember">({itemCount})</span>}
                  </h2>
                  {itemCount > 0 && (
                    <button onClick={clearCart} className="text-xs text-smoke/50 hover:text-crimson font-body transition-colors">
                      Clear
                    </button>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <p className="text-smoke/40 font-body text-sm">Your cart is empty.</p>
                    <p className="text-smoke/30 font-body text-xs mt-1">Add items from the menu.</p>
                  </div>
                ) : (
                  <>
                    <div className="max-h-80 overflow-y-auto">
                      {items.map((item: CartItem) => (
                        <div key={item.id} className="px-5 py-3 border-b border-charcoal-light flex gap-3 items-start">
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-body text-xs font-medium leading-snug truncate">{item.name}</p>
                            <p className="text-smoke/60 text-xs font-body">{formatCents(item.priceCents)} each</p>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded bg-charcoal-light text-smoke hover:bg-crimson hover:text-white text-xs font-bold transition-colors">−</button>
                            <span className="text-white text-xs font-body w-3 text-center">{item.quantity}</span>
                            <button onClick={() => addItem(item)} className="w-6 h-6 rounded bg-charcoal-light text-smoke hover:bg-crimson hover:text-white text-xs font-bold transition-colors">+</button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="px-5 py-4">
                      <div className="flex justify-between text-xs font-body text-smoke/60 mb-1">
                        <span>Subtotal</span>
                        <span>{formatCents(totalCents)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-body text-smoke/60 mb-3">
                        <span>Tax (est.)</span>
                        <span>{formatCents(taxCents)}</span>
                      </div>
                      <div className="flex justify-between font-body font-bold text-white mb-4">
                        <span>Total</span>
                        <span className="text-ember">{formatCents(grandTotalCents)}</span>
                      </div>
                      <button
                        onClick={() => setStep('checkout')}
                        className="w-full bg-crimson hover:bg-crimson-dark text-white font-body font-bold text-sm py-3 rounded-lg transition-colors"
                      >
                        Proceed to Checkout →
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Fab */}
      {itemCount > 0 && step === 'browse' && (
        <div className="lg:hidden fixed bottom-6 left-4 right-4 z-40">
          <button
            onClick={() => setStep('checkout')}
            className="w-full bg-crimson hover:bg-crimson-dark text-white font-body font-bold py-4 px-6 rounded-xl shadow-2xl flex items-center justify-between transition-colors"
          >
            <span>{itemCount} item{itemCount !== 1 ? 's' : ''} in cart</span>
            <span>{formatCents(grandTotalCents)} · {open ? 'Checkout' : 'Schedule'} →</span>
          </button>
        </div>
      )}
    </div>
  );
}
