'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = {
      h1: el.querySelector('h1'),
      sub: el.querySelector('.v2-hero-sub'),
      trust: el.querySelectorAll('.v2-trust-line span'),
      cta: el.querySelector('.v2-hero-cta'),
      micro: el.querySelector('.v2-hero-micro'),
      image: el.querySelector('.v2-hero-image'),
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        elements.h1,
        { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.9 }
      )
        .fromTo(
          elements.sub,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          elements.trust,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          '-=0.3'
        )
        .fromTo(
          elements.cta,
          { opacity: 0, y: 16, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          '-=0.15'
        )
        .fromTo(
          elements.micro,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          '-=0.2'
        )
        .fromTo(
          elements.image,
          { opacity: 0, x: 60, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
          0.3
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="v2-hero">
      <div className="v2-container">
        <div className="v2-hero-grid">
          <div className="v2-hero-text">
            <h1>
              Grow your business.
              <span className="v2-hero-accent">I&apos;ll handle the tech.</span>
            </h1>
            <p className="v2-hero-sub">
              Your customers are looking for you right now. I help small
              businesses get found, win customers, and keep them coming back.
            </p>
            <div className="v2-hero-cta">
              <a href="#contact" className="v2-btn">
                <span>Book a free call</span>
              </a>
              <a href="#services" className="v2-btn v2-btn-outline">
                <span>See services</span>
              </a>
            </div>
            <div className="v2-trust-line">
              <span>Chicago&apos;s Northwest Side</span>
              <span className="v2-trust-separator">•</span>
              <span>100+ projects delivered</span>
              <span className="v2-trust-separator">•</span>
              <span>13 years experience</span>
            </div>
          </div>
          <div className="v2-hero-image">
            <img src="/images/hero-abstract.svg" alt="" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
