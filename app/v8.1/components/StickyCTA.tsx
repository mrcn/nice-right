'use client';

import { useEffect, useState } from 'react';

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .v81-sticky-cta {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 100;
          background: #0000FF;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 16px 28px;
          border: 3px solid #0A0A0A;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 6px 6px 0px rgba(10, 10, 10, 0.2);
          opacity: 0;
          transform: translateY(100px);
          pointer-events: none;
        }

        .v81-sticky-cta.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .v81-sticky-cta:hover {
          background: #0A0A0A;
          transform: translateY(-2px);
          box-shadow: 8px 8px 0px rgba(10, 10, 10, 0.25);
        }

        @media (max-width: 900px) {
          .v81-sticky-cta {
            bottom: 16px;
            left: 16px;
            right: 16px;
            text-align: center;
            padding: 16px;
          }
        }
      `}</style>

      <a
        href="#contact"
        className={`v81-sticky-cta ${visible ? 'visible' : ''}`}
        aria-hidden={!visible}
      >
        Book Free Call
      </a>
    </>
  );
}
