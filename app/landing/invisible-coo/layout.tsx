import type { Metadata } from 'next';
import '../../new-site/globals.css';




export const metadata: Metadata = {
  title: 'Invisible COO Partnership | Your Digital Department, Outsourced',
  description:
    'Get a C-level digital executive for less than one employee. Full operations support, 20 hours/month, $30K/year. Only 4 partnerships available. First 30 days free if no results.',
  openGraph: {
    title: 'Invisible COO Partnership | Strategic Digital Operations',
    description:
      'Outsource your entire digital department. Quarterly intensives, unlimited execution requests, weekly dashboards. $30K/year vs $120K+ for in-house team. Anytime exit.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function InvisibleCOOLayout({
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
      <body className="antialiased" style={{ fontFamily: "system-ui, -apple-system, sans-serif", backgroundColor: '#08090c' }}>
        {children}
      </body>
    </html>
  );
}
