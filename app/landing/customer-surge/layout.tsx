import type { Metadata } from 'next';
import '../../new-site/globals.css';

export const metadata: Metadata = {
  title: '100-Customer Surge System | Get 100 New Customers in 90 Days',
  description:
    'The CUSTOMER MAGNET Protocol: A proven system to generate 100 new paying customers for your local business in 90 days. Restaurants, clinics, salons — guaranteed results or full refund.',
  openGraph: {
    title: '100-Customer Surge System | Guaranteed Growth',
    description:
      'Get 100 new paying customers in 90 days or your money back. The CUSTOMER MAGNET Protocol for local businesses.',
    type: 'website',
  },
};

export default function CustomerSurgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
