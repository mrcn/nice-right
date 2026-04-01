import type { Metadata } from 'next';
import '../../new-site/globals.css';

export const metadata: Metadata = {
  title: 'The 15-Hour Workweek System | Reclaim Your Life in 90 Days',
  description:
    'For owner-operators working 50-70 hours/week. Reclaim 15+ hours every week through the Owner Liberation Architecture. $4,500 investment. 15+ hours back or 100% refund + $2,500 cash.',
  openGraph: {
    title: 'The 15-Hour Workweek System',
    description:
      'Reclaim 15+ hours every week. For overwhelmed owner-operators ready to get their life back.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function WorkweekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
