import '@/app/_shared/tokens.css';
import './work.css';
import { Nav } from '@/app/_home/components/Nav';
import { Footer } from '@/app/_home/components/Footer';

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="v9-work">
      <Nav defaultSolid />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
