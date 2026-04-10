'use client';

import { useEffect, useRef, useState } from 'react';
import { initGSAP, gsap, ScrollTrigger } from '@/app/_shared/gsap-init';
import { trackCTAClick, trackNavClick } from '@/app/lib/analytics';

interface NavProps {
  defaultSolid?: boolean;
  variant?: 'dark' | 'light';
}

export function Nav({ defaultSolid, variant }: NavProps = {}) {
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
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

  // Focus trap for mobile menu
  useEffect(() => {
    if (!menuOpen) return;

    const menu = mobileMenuRef.current;
    if (!menu) return;

    const focusableSelector = 'a[href], button, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = Array.from(
        menu.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((el) => !el.hasAttribute('disabled'));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Move focus into menu on open
    const firstFocusable = menu.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // Close mobile menu on anchor click
  const handleLinkClick = () => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`v9-nav ${solid ? (variant === 'dark' ? 'v9-nav--solid-dark' : 'v9-nav--solid') : ''}`}
        aria-label="Main navigation"
      >
        <div className="v9-nav-inner">
          <a href="/" className="v9-nav-logo">
            Nice Right
          </a>

          {/* Desktop links */}
          <div className="v9-nav-links">
            <a href="/#services" onClick={() => trackNavClick('services')}>
              Services
            </a>
            <a href="/#results" onClick={() => trackNavClick('results')}>
              Results
            </a>
            <a href="/notes" onClick={() => trackNavClick('notes')}>
              Notes
            </a>
            <a
              href="/#contact"
              className="v9-nav-cta"
              onClick={() => trackCTAClick('nav_desktop', 'nav')}
            >
              Book a Free Call
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            className={`v9-nav-hamburger ${menuOpen ? 'v9-nav-hamburger--open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="v9-nav-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div
            ref={mobileMenuRef}
            id="v9-nav-mobile-menu"
            className="v9-nav-mobile"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <a
              href="/#services"
              onClick={() => {
                handleLinkClick();
                trackNavClick('services');
              }}
            >
              Services
            </a>
            <a
              href="/#results"
              onClick={() => {
                handleLinkClick();
                trackNavClick('results');
              }}
            >
              Results
            </a>
            <a
              href="/notes"
              onClick={() => {
                handleLinkClick();
                trackNavClick('notes');
              }}
            >
              Notes
            </a>
            <a
              href="/#contact"
              className="v9-nav-cta"
              onClick={() => {
                handleLinkClick();
                trackCTAClick('nav_mobile', 'nav');
              }}
            >
              Book a Free Call
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
