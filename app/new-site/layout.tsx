import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';

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
  variable: '--font-instrument',
});

export const metadata: Metadata = {
  title: 'Nice Right | Digital Growth Partner for Small Businesses',
  description:
    "I help small businesses get found online and turn their website into their best salesperson. 100+ projects, 13 years experience, Chicago's Northwest Side.",
  keywords: [
    'web design',
    'small business',
    'digital marketing',
    'SEO',
    'Chicago',
  ],
  authors: [{ name: 'Marcin' }],
  openGraph: {
    title: 'Nice Right | Websites That Bring in Business',
    description:
      'Your customers are looking for you right now. I help small businesses get found online.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
