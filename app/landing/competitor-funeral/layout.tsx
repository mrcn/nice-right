import type { Metadata } from 'next';
import '../../new-site/globals.css';

export const metadata: Metadata = {
  title: 'Competitor Funeral | Become #1 in Your Market in 90 Days',
  description:
    'The 90-Day Competitor Funeral: Category exclusivity system to dominate your local market. Only one client per category per metro area. Become the undisputed #1.',
  openGraph: {
    title: 'Competitor Funeral | Market Dominance in 90 Days',
    description:
      'Name your competitor. In 90 days, they will wish they never heard of you. Category exclusivity guaranteed.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function CompetitorFuneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className="antialiased"
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: '#0a0f0d',
        }}
      >
        {children}
      </body>
    </html>
  );
}
