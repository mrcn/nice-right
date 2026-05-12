import type { Metadata, Viewport } from 'next';
import '../../new-site/globals.css';

export const metadata: Metadata = {
  title: 'Understand — Listen to anything. Even Hegel.',
  description:
    'A reader for dense texts. AI rewrites archaic prose, expands abbreviations, modernizes academic writing into something natural to hear on a walk. Fully on-device, by default. Currently in closed test on Android.',
  openGraph: {
    title: 'Understand — Listen to anything. Even Hegel.',
    description:
      'A reader for dense texts. AI rewrites the words. You pick the register. Listen on a walk.',
    type: 'website',
    url: 'https://niceright.co/labs/understand',
    images: [
      {
        url: 'https://niceright.co/og/labs-understand.png',
        width: 1200,
        height: 630,
        alt: 'Understand — Listen to anything. Even Hegel.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Understand',
    description: 'A reader for dense texts. Listen to anything. Even Hegel.',
    images: ['https://niceright.co/og/labs-understand.png'],
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07060A',
};

export default function UnderstandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
