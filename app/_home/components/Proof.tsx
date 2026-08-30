'use client';

import { useEffect, useRef } from 'react';
import { initGSAP, gsap, ScrollTrigger } from '@/app/_shared/gsap-init';

interface StatItem {
  end: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { end: 100, suffix: '+', label: 'projects for small and mid-size businesses' },
  { end: 13, suffix: '+', label: 'years across strategy, design, and code' },
  { end: 1, suffix: '', label: 'senior person accountable from diagnosis to launch' },
];

interface CaseStudy {
  href: string;
  image: string;
  alt: string;
  client: string;
  headline: string;
  description: string;
}

const caseStudies: CaseStudy[] = [
  {
    href: '/work/healthcare-real-estate',
    image: '/images/nursing-home-money.webp',
    alt: 'Healthcare investment platform',
    client: 'Healthcare Platform',
    headline: 'A portal for complex property deals',
    description:
      'Connected providers and opportunities in one workflow.',
  },
  {
    href: '/work/northern-trust',
    image: '/images/bankk.webp',
    alt: 'Northern Trust project',
    client: 'Northern Trust',
    headline: 'Interaction systems for a Fortune 500 site',
    description: 'Designed motion and interface details for a public web experience.',
  },
  {
    href: '/work/green-goods',
    image: '/images/garden-money.webp',
    alt: 'Green Goods biodiversity platform',
    client: 'GreenPill Network',
    headline: 'A public record for conservation work',
    description:
      'A blockchain PWA for recording verified biodiversity actions.',
  },
];

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. Stats: counter animation + reveal
      if (statsRef.current) {
        const valueEls =
          statsRef.current.querySelectorAll<HTMLElement>('[data-stat-value]');
        const statBlocks = statsRef.current.querySelectorAll('.v9-stat-block');

        gsap.fromTo(
          statBlocks,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 82%',
              once: true,
            },
            onStart: () => {
              stats.forEach((stat, i) => {
                const el = valueEls[i];
                if (!el) return;
                const obj = { value: 0 };
                gsap.to(obj, {
                  value: stat.end,
                  duration: 2,
                  ease: 'power2.out',
                  snap: { value: 1 },
                  onUpdate: () => {
                    el.textContent = `${Math.round(obj.value)}${stat.suffix}`;
                  },
                });
              });
            },
          }
        );
      }

      // 2. Case study cards: staggered fade-in
      const cards = section.querySelectorAll('.v9-case-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 3. Case study image parallax
      cards.forEach((card) => {
        const img = card.querySelector('.v9-case-img img');
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -5, scale: 1.1 },
          {
            yPercent: 5,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      });

      // 4. CTA fade-in
      const cta = section.querySelector('.v9-proof-cta');
      if (cta) {
        gsap.fromTo(
          cta,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cta,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="results"
        className="v9-proof v9-section-dark"
      >
        <div className="v9-proof-container">
          {/* Header */}
          <div className="v9-proof-header">
            <p className="v9-section-label">Selected work</p>
            <h2 className="v9-proof-heading">Proof of how I work</h2>
            <p className="v9-proof-intro">
              These examples show the range of the work. The audit is where we decide
              what applies to your business.
            </p>
          </div>

          {/* Stats with glowing numbers */}
          <div ref={statsRef} className="v9-stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="v9-stat-block">
                <div className="v9-stat-number">
                  <span data-stat-value>
                    {stat.end}
                    {stat.suffix}
                  </span>
                </div>
                <div className="v9-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Case studies */}
          <div className="v9-cases-grid">
            {caseStudies.map((cs) => (
              <a href={cs.href} key={cs.client} className="v9-case-card" aria-label={`Case study: ${cs.client} — ${cs.headline}`}>
                <div className="v9-case-img">
                  <img src={cs.image} alt={cs.alt} loading="lazy" width={1024} height={1024} />
                  <div className="v9-case-img-overlay" />
                </div>
                <div className="v9-case-body">
                  <span className="v9-case-client">{cs.client}</span>
                  <h3 className="v9-case-headline">{cs.headline}</h3>
                  <p className="v9-case-desc">{cs.description}</p>
                  <span className="v9-case-link">View case study &rarr;</span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      <style>{`
        /* ================================================
           PROOF / RESULTS SECTION — DARK
           ================================================ */

        .v9-proof {
          position: relative;
          background: #0C1117;
          padding: clamp(80px, 10vw, 140px) 0;
          overflow: hidden;
        }

        /* Subtle ambient glow */
        .v9-proof::before {
          content: '';
          position: absolute;
          top: 15%;
          left: 50%;
          width: 900px;
          height: 600px;
          transform: translateX(-50%);
          background: radial-gradient(
            ellipse,
            rgba(11, 138, 110, 0.06) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .v9-proof-container {
          position: relative;
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* --- Header --- */

        .v9-proof-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .v9-section-label {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0B8A6E;
          margin-bottom: 14px;
        }

        .v9-proof-heading {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: clamp(2rem, 4.5vw, 3rem);
          font-weight: 700;
          line-height: 1.15;
          color: #ffffff;
          margin: 0;
        }

        .v9-proof-intro {
          max-width: 560px;
          margin: 16px auto 0;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.58);
        }

        /* --- Stats with glow --- */

        .v9-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-bottom: 80px;
          text-align: center;
        }

        .v9-stat-block {
          padding: 20px 8px;
        }

        .v9-stat-number {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
          margin-bottom: 12px;
          position: relative;
        }

        /* Glow behind the number */
        .v9-stat-number::after {
          content: attr(data-glow);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: inherit;
          font-weight: inherit;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: blur(20px);
          opacity: 0.4;
          pointer-events: none;
          z-index: -1;
        }

        .v9-stat-label {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.5;
          max-width: 220px;
          margin: 0 auto;
        }

        /* --- Case study cards --- */

        .v9-cases-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }

        .v9-case-card {
          display: block;
          text-decoration: none;
          background: #1F2937;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.33, 1, 0.68, 1),
                      box-shadow 0.4s ease;
        }

        .v9-case-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(11, 138, 110, 0.12),
                      0 4px 12px rgba(0, 0, 0, 0.25);
        }

        .v9-case-img {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }

        .v9-case-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: transform;
        }

        .v9-case-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(31, 41, 55, 0.85) 100%
          );
          pointer-events: none;
        }

        .v9-case-body {
          padding: 24px;
        }

        .v9-case-client {
          display: block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #06D6A0;
          margin-bottom: 8px;
        }

        .v9-case-headline {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.35;
          margin: 0 0 8px 0;
        }

        .v9-case-desc {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.6;
          margin: 0 0 16px 0;
        }

        .v9-case-link {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: #06D6A0;
          transition: transform 0.3s ease;
          display: inline-block;
        }

        .v9-case-card:hover .v9-case-link {
          transform: translateX(4px);
        }

        /* --- CTA --- */

        .v9-proof-cta {
          text-align: center;
        }

        /* --- Responsive --- */

        @media (max-width: 900px) {
          .v9-cases-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            max-width: 540px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 64px;
          }
        }

        @media (max-width: 700px) {
          .v9-stats-grid {
            grid-template-columns: 1fr;
            gap: 36px;
            margin-bottom: 64px;
          }

          .v9-stat-number {
            font-size: clamp(2.8rem, 12vw, 4rem);
          }

        }

        @media (max-width: 480px) {
          .v9-proof {
            padding: 64px 0;
          }

          .v9-proof-header {
            margin-bottom: 48px;
          }

          .v9-case-body {
            padding: 20px;
          }

          .v9-case-headline {
            font-size: 1.05rem;
          }
        }

        /* --- Reduced motion --- */

        @media (prefers-reduced-motion: reduce) {
          .v9-stat-block,
          .v9-case-card,
          .v9-proof-cta {
            opacity: 1 !important;
            transform: none !important;
          }

          .v9-case-img img {
            transform: none !important;
          }

          .v9-case-card:hover {
            transform: none;
          }

          .v9-case-card:hover .v9-case-link {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
