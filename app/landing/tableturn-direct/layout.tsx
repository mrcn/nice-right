import type { Metadata } from 'next';
import '../../new-site/globals.css';

export const metadata: Metadata = {
  title: 'TableTurn Direct | Cut Delivery App Fees by 80%',
  description:
    'Restaurants: Stop losing 25% to DoorDash and UberEats. Our DineDirect Capture System generates $50K+/month in direct orders. $25K guarantee or we pay YOU $5K.',
  openGraph: {
    title: 'TableTurn Direct | Cut Delivery App Fees by 80%',
    description:
      'Restaurants: Stop losing 25% to DoorDash and UberEats. Our DineDirect Capture System generates $50K+/month in direct orders.',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function TableTurnDirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
