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
  robots: { index: false, follow: false },
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
  return <>{children}</>;
}
