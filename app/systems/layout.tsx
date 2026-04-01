import type { ReactNode } from 'react';
import { Footer } from '@/app/_home/components/Footer';

export default function SystemsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="sys-skip-link">Skip to content</a>
      <header className="sys-wordmark-bar">
        <a href="/" className="sys-wordmark" aria-label="Nice Right — home">
          Nice Right
        </a>
      </header>
      <main id="main">{children}</main>
      <Footer />
      <style>{`
        .sys-skip-link {
          position: absolute;
          left: -9999px;
          top: auto;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }
        .sys-skip-link:focus {
          position: fixed;
          top: 16px;
          left: 16px;
          width: auto;
          height: auto;
          padding: 8px 16px;
          background: #0B8A6E;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 6px;
          z-index: 9999;
          text-decoration: none;
        }
        .sys-wordmark-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 22px 40px;
          pointer-events: none;
        }
        .sys-wordmark {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 1.1rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          letter-spacing: -0.01em;
          pointer-events: all;
          transition: color 0.2s ease;
        }
        .sys-wordmark:hover {
          color: #06D6A0;
        }
        @media (max-width: 640px) {
          .sys-wordmark-bar {
            padding: 20px 24px;
          }
        }
      `}</style>
    </>
  );
}
