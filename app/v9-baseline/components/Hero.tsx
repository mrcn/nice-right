'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const h1 = section.querySelector('.v9-hero-h1');
      const sub = section.querySelector('.v9-hero-sub');
      const trust = section.querySelector('.v9-hero-trust');
      const ctaWrap = section.querySelector('.v9-hero-cta-wrap');
      const micro = section.querySelector('.v9-hero-micro');

      // 1. Initial reveal timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        h1,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1 }
      )
        .fromTo(
          sub,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(trust, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.3')
        .fromTo(
          ctaWrap,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        )
        .fromTo(micro, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.15');

      // 2. Pin + parallax fade-out on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(content, {
            opacity: 1 - p,
            scale: 1 - p * 0.05,
            y: p * -30,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="v9-hero v9-section-dark" id="hero">
        <div ref={contentRef} className="v9-hero-content">
          <h1 className="v9-hero-h1">
            <span className="v9-hero-line1">Grow your business.</span>
            <span className="v9-hero-line2">I&apos;ll handle the tech.</span>
          </h1>

          <p className="v9-hero-sub">
            Your customers are looking for you right now. I help small
            businesses get found, win more customers, and keep them coming back.
          </p>

          <div className="v9-hero-trust">
            <span>Chicago&apos;s Northwest Side</span>
            <span className="v9-hero-dot" aria-hidden="true">
              &middot;
            </span>
            <span>100+ projects</span>
            <span className="v9-hero-dot" aria-hidden="true">
              &middot;
            </span>
            <span>13+ years</span>
          </div>

          <div className="v9-hero-cta-wrap">
            <a href="#contact" className="v9-btn v9-btn-gradient">
              Book a Free Call
            </a>
          </div>

          <p className="v9-hero-micro">
            30 minutes. An honest look at what&apos;s possible for your
            business.
          </p>
        </div>
      </section>

      <style>{`
        .v9-hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0C1117;
          overflow: hidden;
          z-index: 2;
        }

        /* Subtle radial glow behind hero text */
        .v9-hero::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 800px;
          height: 800px;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            rgba(11, 138, 110, 0.08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .v9-hero-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 24px;
          max-width: 900px;
          will-change: transform, opacity;
        }

        .v9-hero-h1 {
          display: flex;
          flex-direction: column;
          gap: 0;
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(3.5rem, 8vw, 7rem);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0 0 28px 0;
        }

        .v9-hero-line1 {
          color: #ffffff;
        }

        .v9-hero-line2 {
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .v9-hero-sub {
          max-width: 600px;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 17px;
          font-weight: 400;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 28px 0;
        }

        .v9-hero-trust {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.65);
          letter-spacing: 0.02em;
          margin-bottom: 36px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .v9-hero-dot {
          color: rgba(255, 255, 255, 0.25);
          font-size: 1rem;
          line-height: 1;
        }

        .v9-hero-cta-wrap {
          margin-bottom: 20px;
        }

        .v9-btn {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.33, 1, 0.68, 1),
                      box-shadow 0.25s ease;
        }

        .v9-btn-gradient {
          padding: 16px 40px;
          border-radius: 12px;
          color: #ffffff;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          box-shadow: 0 4px 24px rgba(6, 214, 160, 0.2),
                      0 1px 3px rgba(0, 0, 0, 0.12);
        }

        .v9-btn-gradient:hover {
          transform: scale(1.02) translateY(-1px);
          box-shadow: 0 8px 32px rgba(6, 214, 160, 0.3),
                      0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .v9-btn-gradient:active {
          transform: scale(0.99);
        }

        .v9-hero-micro {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          line-height: 1.5;
        }

        /* ----- Responsive ----- */

        @media (max-width: 640px) {
          .v9-hero-h1 {
            font-size: clamp(2.6rem, 10vw, 3.8rem);
          }

          .v9-hero-sub {
            font-size: 16px;
          }

          .v9-btn-gradient {
            padding: 14px 32px;
            font-size: 0.95rem;
          }

          .v9-hero-trust {
            gap: 8px;
            font-size: 0.75rem;
          }
        }

        /* ----- Reduced motion ----- */

        @media (prefers-reduced-motion: reduce) {
          .v9-hero-content {
            opacity: 1 !important;
            transform: none !important;
          }

          .v9-hero-h1,
          .v9-hero-sub,
          .v9-hero-trust,
          .v9-hero-cta-wrap,
          .v9-hero-micro {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}
