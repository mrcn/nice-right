import { buildSeoMetadata } from '@/app/_shared/seo';
import { ScanExperience } from './ScanExperience';
import './scan.css';

const page = {
  title: 'Digital Footprint Scanner | Nice Right',
  description:
    'Free digital footprint snapshot for local businesses — score, headline findings, and an optional emailed report. No email required to see your score.',
  path: '/scan/',
};

// Tool not ready for launch: keep off search indexes until re-linked (see llms.txt/sitemap excludes).
export const metadata = buildSeoMetadata({
  ...page,
  robots: { index: false, follow: false },
});

export default function ScanPage() {
  return <ScanExperience />;
}
