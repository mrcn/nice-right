import HomePageContent from './_home/page';
import { buildSeoMetadata } from '@/app/_shared/seo';

export const metadata = buildSeoMetadata({
  title: 'Nice Right | Digital Growth Partner for Small Businesses',
  description:
    "I help small businesses get found online and turn their website into their best salesperson. 100+ projects, 13 years experience, Chicago's Northwest Side.",
  path: '/',
});

export default function HomePage() {
  return <HomePageContent />;
}
