import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { buildSeoMetadata } from '@/app/_shared/seo';

export const metadata: Metadata = buildSeoMetadata({
  title: 'Notes | Nice Right',
  description:
    'Legacy writing index alias for Nice Right practitioner notes on AI coding, testing, and strategy.',
  path: '/notes/',
  robots: { index: false, follow: false },
});

export default function WritingRedirect() {
  redirect('/notes');
}
