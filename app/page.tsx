import HomePageContent from './_home/page';
import { buildSeoMetadata } from '@/app/_shared/seo';

export const metadata = buildSeoMetadata({
  title: 'Nice Right | Digital Growth for Chicago Home-Service Businesses',
  description:
    'I help established Chicago home-service businesses find and fix the digital leaks that keep qualified local prospects from calling.',
  path: '/',
});

export default function HomePage() {
  return <HomePageContent />;
}
