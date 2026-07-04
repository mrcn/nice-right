import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import Script from 'next/script';
import './new-site/globals.css';
import { founderSchema, localBusinessSchema, webSiteSchema } from '@/app/_shared/schema';
import { UTMCapture } from '@/app/_shared/UTMCapture';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://niceright.co'),
  title: 'Nice Right | Digital Growth Partner for Small Businesses',
  description:
    "I help small businesses get found online and turn their website into their best salesperson. 100+ projects, 13 years experience, Chicago's Northwest Side.",
  verification: {
    google: 'CfE8x9Nuo2P24hcf7uBpetLTe0oIjLncdBzBA8JEA5g',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Nice Right | Digital Growth Partner for Small Businesses',
    description:
      "I help small businesses get found online and turn their website into their best salesperson. 100+ projects, 13 years experience, Chicago's Northwest Side.",
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body
        className="antialiased"
        style={{ backgroundColor: '#fafaf9', minHeight: '100vh' }}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZX3QC73LKS"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZX3QC73LKS');
        `}</Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
        />
        <UTMCapture />
        {children}
      </body>
    </html>
  );
}
