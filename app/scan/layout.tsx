import type { ReactNode } from 'react';
import { Footer } from '@/app/_home/components/Footer';

export default function ScanLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="scan-skip-link">
        Skip to content
      </a>
      <header className="scan-wordmark-bar">
        <a href="/" className="scan-wordmark" aria-label="Nice Right — home">
          Nice Right
        </a>
      </header>
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
