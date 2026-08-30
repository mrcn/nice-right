import { notFound } from 'next/navigation';
import { buildSeoMetadata } from '@/app/_shared/seo';

export const dynamic = 'force-dynamic';

export const metadata = buildSeoMetadata({
  title: 'Not found | Nice Right',
  description: 'This Nice Right tool is not currently available.',
  path: '/scan/',
  robots: { index: false, follow: false },
});

export default function ScanPage(): never {
  notFound();
}
