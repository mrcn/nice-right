'use client';

import { useEffect, useRef, useState } from 'react';
import { initGSAP, gsap, ScrollTrigger } from '@/app/_shared/gsap-init';
import { trackCTAClick, trackNavClick } from '@/app/lib/analytics';

interface NavProps {
  defaultSolid?: boolean;
}

export function Nav({ defaultSolid }: NavProps = {}) {
  const navRef = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (defaultSolid) {
      setSolid(true);
      return;
    }

    initGSAP();
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'bottom top+=80',
        onEnter: () => setSolid(true),
        onLeaveBack: () => setSolid(false),
      });
    });

    return () => ctx.revert();
  }, [defaultSolid]);

  // Close mobile menu on anchor click
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`v9-nav ${solid ? 'v9-nav--solid' : ''}`}
        aria-label="Main navigation"
      >
        <div className="v9-nav-inner">
          <a href="/" className="v9-nav-logo">
            Nice Right
          </a>

          {/* Desktop links */}
          <div className="v9-nav-links">
            <a href="/#services" onClick={() => trackNavClick('services')}>Services</a>
            <a href="/#results" onClick={() => trackNavClick('results')}>Results</a>
            <a href="/notes" onClick={() => trackNavClick('notes')}>Notes</a>
            <a href="/#contact" className="v9-nav-cta" onClick={() => trackCTAClick('nav_desktop', 'nav')}>
              Book a Free Call
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`v9-nav-hamburger ${menuOpen ? 'v9-nav-hamburger--open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div className="v9-nav-mobile">
            <a href="/#services" onClick={() => { handleLinkClick(); trackNavClick('services'); }}>
              Services
            </a>
            <a href="/#results" onClick={() => { handleLinkClick(); trackNavClick('results'); }}>
              Results
            </a>
            <a href="/notes" onClick={() => { handleLinkClick(); trackNavClick('notes'); }}>
              Notes
            </a>
            <a href="/#contact" className="v9-nav-cta" onClick={() => { handleLinkClick(); trackCTAClick('nav_mobile', 'nav'); }}>
              Book a Free Call
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
