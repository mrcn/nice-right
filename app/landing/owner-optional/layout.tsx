import type { Metadata, Viewport } from 'next';
import '../../new-site/globals.css';




export const metadata: Metadata = {
  title: 'Owner-Optional Engine | Step Out Without Stepping Away',
  description:
    'Transform your business into an operationally-optional asset in 90 days. Work 20 hours/week or less while your business runs without you. $25,000 investment. Only 1 client per quarter.',
  openGraph: {
    title: 'Owner-Optional Engine | Freedom from the Owner-Operator Trap',
    description:
      'The Digital Operations Architecture that makes you operationally optional in 90 days. Owner-Optional or Free guarantee.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Owner-Optional Engine',
    description:
      'Step out without stepping away. Operationally optional in 90 days.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export default function OwnerOptionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className="antialiased"
        style={{ backgroundColor: '#0a0a0a', color: '#f5f5f4' }}
      >
        {children}
      </body>
    </html>
  );
}
