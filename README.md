# Chef Daddy's Bar-B-Que & Soul Food — Website

Production-ready Next.js website for Chef Daddy's Bar-B-Que & Soul Food, St. Louis, MO.

---

## Quick Start

```bash
cd chef-daddys
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: SEO, schema, fonts, GA4 placeholder
│   ├── page.tsx            # Home page
│   ├── menu/page.tsx       # Full menu with category tabs
│   ├── order/page.tsx      # Online ordering system (pickup)
│   ├── catering/page.tsx   # Catering inquiry page + form
│   ├── our-story/page.tsx  # Brand story page
│   ├── reviews/page.tsx    # Customer reviews
│   ├── contact/page.tsx    # Contact form + Google Maps
│   ├── privacy/page.tsx    # Privacy policy
│   └── api/
│       ├── contact/route.ts    # Contact form API
│       ├── catering/route.ts   # Catering inquiry API
│       └── order/route.ts      # Order processing API
├── components/
│   ├── Header.tsx          # Sticky nav + mobile drawer
│   ├── Footer.tsx          # Footer with links, hours, contact
│   └── AnimatedSection.tsx # Scroll-triggered fade-up animation
├── context/
│   └── CartContext.tsx     # Cart state (React Context + localStorage)
└── lib/
    ├── menu-data.ts        # All menu items and categories
    └── validation.ts       # Server-side form validation utilities
public/
├── robots.txt
└── sitemap.xml
```

---

## Setup Checklist

### 1. Domain & Hosting
- Deploy to Vercel: `vercel deploy` (recommended)
- Set your custom domain (e.g., chefdaddysbbq.com) in Vercel settings
- HTTPS is automatic on Vercel

### 2. Update the Domain
Search and replace `chefdaddysbbq.com` with your actual domain in:
- `src/app/layout.tsx` (metadataBase, canonical, schema URL)
- `public/sitemap.xml`
- `public/robots.txt`

### 3. Google Analytics 4
1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. In `src/app/layout.tsx`, find the GA4 placeholder comment and uncomment/fill in your ID

### 4. Google Tag Manager (Optional)
1. Create a GTM container at [tagmanager.google.com](https://tagmanager.google.com)
2. Get your Container ID (format: `GTM-XXXXXXX`)
3. In `src/app/layout.tsx`, uncomment both GTM script blocks and replace `GTM-XXXXXXX`

### 5. Email Notifications (Contact & Catering Forms)
1. `npm install nodemailer @types/nodemailer`
2. Create `.env.local` in project root:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```
   **Gmail App Password**: Google Account → Security → 2-Step Verification → App passwords
3. Uncomment the Nodemailer blocks in:
   - `src/app/api/contact/route.ts`
   - `src/app/api/catering/route.ts`

### 6. Online Payment (Order Page)

#### Option A — Stripe (Recommended)
1. Create account at [stripe.com](https://stripe.com)
2. `npm install @stripe/stripe-js @stripe/react-stripe-js stripe`
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   ```
4. Follow instructions in `src/app/order/page.tsx` (payment section comments)
5. Follow instructions in `src/app/api/order/route.ts`

#### Option B — Square
1. Create account at [squareup.com/developers](https://developer.squareup.com)
2. `npm install @square/web-sdk`
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SQUARE_APPLICATION_ID=...
   NEXT_PUBLIC_SQUARE_LOCATION_ID=...
   SQUARE_ACCESS_TOKEN=...
   ```

#### Option C — PayPal
1. Create app at [developer.paypal.com](https://developer.paypal.com)
2. `npm install @paypal/react-paypal-js`
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=...
   PAYPAL_CLIENT_SECRET=...
   ```

**Current behavior**: Orders are logged and confirmed without payment — appropriate for "pay at pickup" flow.

### 7. Google Maps
The map on the Contact page uses a free embed that doesn't require an API key.
If it stops working, get a Maps Embed API key at [console.cloud.google.com](https://console.cloud.google.com)
and update the iframe src in `src/app/contact/page.tsx`.

### 8. Google Business Profile & Reviews
1. Claim your profile at [business.google.com](https://business.google.com)
2. Get your Google Place ID from [maps.googleapis.com/maps/api/place/findplacefromtext](https://developers.google.com/maps/documentation/places/web-service/search-find-place)
3. Update the review links in `src/app/reviews/page.tsx`
4. Get your Google review link from the GBP dashboard → "Get more reviews"

---

## Updating Content

### Menu Items
Edit `src/lib/menu-data.ts`:
- Replace `PLACEHOLDER` names, descriptions, and prices
- Set `priceCents` to the actual price in cents (e.g., $12.99 = `1299`)
- The `price` string is display-only (e.g., `'$12.99'`)

### Photos
Replace all `img-placeholder` divs with Next.js `<Image>` components:
```tsx
import Image from 'next/image';
<Image src="/images/rib-tips.webp" alt="BBQ rib tips at Chef Daddy's" width={400} height={300} />
```
- Recommended format: WebP
- Store images in `/public/images/`
- Use descriptive, keyword-rich alt text (already provided in `menu-data.ts`)

### Our Story
Fill in all `[PLACEHOLDER]` sections in `src/app/our-story/page.tsx` with Chef Daddy's real story.

### Logo
To add the real logo image:
1. Save as `/public/logo.png` or `/public/logo.webp`
2. In `src/components/Header.tsx` and `Footer.tsx`, replace the text logo with:
   ```tsx
   import Image from 'next/image';
   <Image src="/logo.png" alt="Chef Daddy's Bar-B-Que & Soul Food" width={160} height={60} />
   ```

---

## SEO

### Schema Markup
LocalBusiness JSON-LD schema is in `src/app/layout.tsx`.
Update the `geo` coordinates with exact lat/lng for 9617 Saint Charles Rock Road.

### Sitemap
Update dates in `public/sitemap.xml` whenever you make major content changes.

### OG Image
Create a 1200×630px OG image and save as `/public/og-image.jpg`.

---

## Security Features Implemented
- Content Security Policy headers (next.config.ts)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- HSTS headers
- Honeypot fields on all forms (blocks most spam bots)
- Server-side input validation and sanitization on all API routes
- Rate limiting on all form endpoints (in-memory; use Redis in production for multi-instance)
- No payment card data stored server-side
- All form errors return generic messages (no server detail exposure)

### Production Rate Limiting
The in-memory rate limiter works for single-server deployments.
For multi-server/serverless (Vercel), use Redis:
1. `npm install @upstash/ratelimit @upstash/redis`
2. Create a free Redis database at [upstash.com](https://upstash.com)
3. Replace the rate limit logic in API routes

---

## Performance
- Google Fonts loaded via `next/font` (no render blocking)
- Images: lazy loading by default with Next.js `<Image>`
- All pages use static generation (SSG) where possible
- CSS custom properties for theme — one-file brand updates
- Minification and compression handled by Next.js build

---

## Deployment (Vercel — Recommended)

```bash
npm install -g vercel
vercel login
vercel
```

Set environment variables in Vercel dashboard → Settings → Environment Variables.
**Never commit `.env.local` to git.**

---

*Built for Chef Daddy's Bar-B-Que & Soul Food · Est. 2015 · St. Louis, MO*
