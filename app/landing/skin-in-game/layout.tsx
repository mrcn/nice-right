import type { Metadata } from 'next';
import '../../new-site/globals.css';




export const metadata: Metadata = {
  title: 'Skin In The Game Partnership | Pay Only After You Win',
  description:
    'Performance-based partnership for established businesses. $1,000 upfront. $9,000 only after you hit $50K in new revenue. Guaranteed $50K in 90 days or keep everything for $1K.',
  openGraph: {
    title: 'Skin In The Game Partnership | Pay From Profits, Not Pocket',
    description:
      'The only agency model where you pay AFTER results. $1K to start. $9K from profits. $50K guaranteed in 90 days. One client per quarter.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function SkinInGameLayout({
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
      <body className="antialiased" style={{ fontFamily: "system-ui, -apple-system, sans-serif", backgroundColor: '#0a0f0d' }}>
        {children}
      </body>
    </html>
  );
}
