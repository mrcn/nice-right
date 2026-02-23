import type { Metadata } from 'next';
import '../../new-site/globals.css';



export const metadata: Metadata = {
  title: '$500K Contractor Growth System | Add $40K-$80K/Month in 90 Days',
  description:
    'Service contractors: Add $40K-$80K/month in predictable revenue in 90 days with the DOMINATE LOCAL System. $500K guarantee. Only 4 spots/month.',
  openGraph: {
    title: '$500K Contractor Growth System',
    description:
      'Add $40K-$80K/month in predictable revenue in 90 days. For HVAC, plumbing, and roofing contractors doing $300K-$1.5M.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function ContractorGrowthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      
      suppressHydrationWarning
    >
      <body className="antialiased" style={{ fontFamily: "system-ui, -apple-system, sans-serif", backgroundColor: '#0c1117' }}>
        {children}
      </body>
    </html>
  );
}
