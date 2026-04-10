import './work.css';
import { Nav } from '@/app/_home/components/Nav';
import { Footer } from '@/app/_home/components/Footer';
import { Breadcrumb } from './_components/Breadcrumb';
import { CaseCTA } from './_components/CaseCTA';

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="v9-work">
      <Nav defaultSolid variant="dark" />
      <main id="main-content">
        <Breadcrumb />
        {children}
        <CaseCTA />
      </main>
      <Footer />
    </div>
  );
}
