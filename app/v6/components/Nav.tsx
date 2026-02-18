'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Logo } from './Logo';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Nav() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progressRef.current.style.display = 'none';
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav className="v2-nav" aria-label="Main navigation">
      <div className="v2-container">
        <div className="v2-nav-content">
          <a href="/" className="v2-logo-link" aria-label="Nice Right - Home">
            <Logo variant="full" className="v2-logo-svg" />
          </a>
          <div className="v2-nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#services">Services</a>
            <a href="#results">Results</a>
            <a href="#contact" className="v2-btn v2-btn-sm">
              Book a free call
            </a>
          </div>
        </div>
      </div>
      <div
        ref={progressRef}
        aria-hidden="true"
        className="v2-scroll-progress"
      />
    </nav>
  );
}
