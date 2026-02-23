'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
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
  }, []);

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
            <a href="#how-it-works">How It Works</a>
            <a href="#services">Services</a>
            <a href="#results">Results</a>
            <a href="#contact" className="v9-nav-cta">
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
            <a href="#how-it-works" onClick={handleLinkClick}>
              How It Works
            </a>
            <a href="#services" onClick={handleLinkClick}>
              Services
            </a>
            <a href="#results" onClick={handleLinkClick}>
              Results
            </a>
            <a href="#contact" className="v9-nav-cta" onClick={handleLinkClick}>
              Book a Free Call
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
