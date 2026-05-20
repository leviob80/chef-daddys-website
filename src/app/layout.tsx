import type { Metadata } from 'next';
import { Playfair_Display, Inter, Oswald } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
  weight: ['700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.chefdaddysbbq.com'),
  title: {
    default: "Chef Daddy's BBQ & Soul Food | St. Louis, MO | Online Ordering",
    template: "%s | Chef Daddy's BBQ & Soul Food | St. Louis, MO",
  },
  description:
    "Chef Daddy's Bar-B-Que & Soul Food — the best BBQ and soul food in St. Louis, MO since 2015. Slow-smoked ribs, brisket, pulled pork & authentic soul food. Order online for pickup at 9617 Saint Charles Rock Road.",
  keywords: [
    'BBQ St Louis',
    'Soul Food St Louis',
    'Best BBQ in St Louis',
    'Saint Charles Rock Road restaurant',
    'Chef Daddys BBQ',
    'BBQ pickup St Louis',
    'ribs St Louis',
    'soul food restaurant Missouri',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: "Chef Daddy's Bar-B-Que & Soul Food",
    title: "Chef Daddy's BBQ & Soul Food | St. Louis, MO",
    description:
      "Real BBQ. Real Soul. Real St. Louis. Slow-smoked BBQ and authentic soul food at 9617 Saint Charles Rock Road, St. Louis, MO. Order online for pickup.",
    images: [
      {
        // PLACEHOLDER: Replace with actual OG image
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Chef Daddy's Bar-B-Que & Soul Food — St. Louis, MO",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Chef Daddy's BBQ & Soul Food | St. Louis, MO",
    description: 'Real BBQ. Real Soul. Real St. Louis. Order online for pickup.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://www.chefdaddysbbq.com',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['Restaurant', 'FoodEstablishment', 'LocalBusiness'],
  '@id': 'https://www.chefdaddysbbq.com/#restaurant',
  name: "Chef Daddy's Bar-B-Que & Soul Food",
  description:
    "St. Louis' home of slow-smoked BBQ and authentic soul food. Established 2015, serving ribs, brisket, pulled pork, fried chicken, and more at 9617 Saint Charles Rock Road.",
  url: 'https://www.chefdaddysbbq.com',
  telephone: '+1-314-222-1488',
  email: 'Chefdaddy933@gmail.com',
  foundingDate: '2015',
  priceRange: '$$',
  servesCuisine: ['BBQ', 'Soul Food', 'American', 'Southern'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '9617 Saint Charles Rock Road',
    addressLocality: 'St. Louis',
    addressRegion: 'MO',
    postalCode: '63114',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    // PLACEHOLDER: Replace with exact coordinates
    latitude: 38.7,
    longitude: -90.3,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '12:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '12:00',
      closes: '22:00',
    },
  ],
  hasMenu: 'https://www.chefdaddysbbq.com/menu',
  sameAs: [
    'https://www.facebook.com/share/1EFPW24awJ/?mibextid=wwXIfr',
  ],
  acceptsReservations: false,
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${oswald.variable}`}>
      <head>
        <link rel="canonical" href="https://www.chefdaddysbbq.com" />
        {/* PLACEHOLDER: Replace GA_MEASUREMENT_ID with your Google Analytics 4 Measurement ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        ` }} /> */}

        {/* PLACEHOLDER: Replace GTM-XXXXXXX with your Google Tag Manager Container ID */}
        {/* <script dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');
        ` }} /> */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-black">
        {/* PLACEHOLDER: Uncomment GTM noscript after inserting your Container ID */}
        {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style={{display:'none',visibility:'hidden'}} /></noscript> */}
        <CartProvider>
          <Header />
          <main id="main-content" className="flex-1 pt-[172px]" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
