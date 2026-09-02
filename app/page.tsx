import HomePageContent from './_home/page';
import { buildSeoMetadata } from '@/app/_shared/seo';

export const metadata = buildSeoMetadata({
  title: 'Nice Right | Digital Growth Audit for Chicago Home-Service Businesses',
  description:
    'A focused $1,500 Digital Growth Audit for established Chicago home-service businesses. Find where qualified local prospects drop out and know what to fix next.',
  path: '/',
});

export default function HomePage() {
  return <HomePageContent />;
}
