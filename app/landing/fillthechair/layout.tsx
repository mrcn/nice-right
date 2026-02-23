import type { Metadata } from 'next';
import '../../new-site/globals.css';




export const metadata: Metadata = {
  title:
    'FillTheChair | Eliminate No-Shows, Fill Your Schedule with Cash-Pay Patients',
  description:
    'Medical practices: Empty chairs cost you $150K+/year. The PatientLock System guarantees under 6% no-shows or full refund + $500. Only 8 practices per specialty per metro.',
  openGraph: {
    title: 'FillTheChair | The PatientLock System',
    description:
      'Eliminate no-shows. Fill your schedule with cash-pay patients. Guaranteed under 6% no-show rate or your money back plus $500.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function FillTheChairLayout({
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
