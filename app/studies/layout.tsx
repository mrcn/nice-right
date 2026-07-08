import '@/app/_shared/nav.css';
import { Nav } from '@/app/_home/components/Nav';
import { Footer } from '@/app/_home/components/Footer';
import './styles.css';

export default function StudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="v9-work v9-studies-shell">
      <Nav defaultSolid variant="dark" />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
