import type { Metadata } from 'next';
import '../../new-site/globals.css';

export const metadata: Metadata = {
  title: 'Exit-Ready Business Build | Add $250K-$1M to Your Sale Price',
  description:
    'Transform your business into an exit-ready asset. Add $250K-$1M to your sale price with our proven 5-pillar system. Only 2 clients per year. 15% valuation increase guaranteed.',
  openGraph: {
    title: 'Exit-Ready Business Build | Add $250K-$1M to Your Sale Price',
    description:
      'Transform your business into an exit-ready asset. Add $250K-$1M to your sale price with our proven 5-pillar system.',
    type: 'website',
  },
};

export default function ExitReadyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
