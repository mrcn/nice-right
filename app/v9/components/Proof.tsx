'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItem {
  end: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { end: 290, suffix: '%', label: 'traffic growth for a home service company' },
  { end: 12, suffix: 'x', label: 'more leads from the same site' },
  { end: 80, suffix: '%', label: 'time saved with workflow automation' },
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
    headline: 'Cut deal-closing time by 40%',
    description:
      'Custom portal connecting providers with property opportunities.',
  },
  {
    href: '/work/northern-trust',
    image: '/images/bankk.webp',
    alt: 'Northern Trust project',
    client: 'Northern Trust',
    headline: 'Modernized a Fortune 500 web presence',
    description: 'Micro-interactions and animation that boosted engagement.',
  },
  {
    href: '/work/green-goods',
    image: '/images/garden-money.webp',
    alt: 'Green Goods biodiversity platform',
    client: 'GreenPill Network',
    headline: 'Built a verified impact platform for conservation',
    description:
      'Blockchain PWA tracking biodiversity actions with on-chain attestations.',
  },
];

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

      // 4. About card: gentle fade-in
      const aboutCard = section.querySelector('.v9-about-card');
      if (aboutCard) {
        gsap.fromTo(
          aboutCard,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutCard,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 5. CTA fade-in
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
            <p className="v9-section-label">Results</p>
            <h2 className="v9-proof-heading">Numbers from real projects</h2>
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
              <a href={cs.href} key={cs.client} className="v9-case-card">
                <div className="v9-case-img">
                  <img src={cs.image} alt={cs.alt} loading="lazy" />
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

          {/* About */}
          <div className="v9-about-card">
            <img
              src="/images/marcin-lg.jpeg"
              alt="Marcin"
              className="v9-about-photo"
            />
            <div className="v9-about-text">
              <h3 className="v9-about-name">I&apos;m Marcin.</h3>
              <p className="v9-about-pull">
                &ldquo;Every project I take on,<br />
                <em>I answer for personally.</em>&rdquo;
              </p>
              <p className="v9-about-bio">
                Since 2013, 100+ projects for small and mid-size businesses.
                You work directly with me &mdash; not an account manager &mdash;
                backed by a network of professionals I&apos;ve worked alongside for years.
              </p>
              <div className="v9-about-stats">
                <div className="v9-about-stat">
                  <span className="v9-about-stat-num">2013</span>
                  <span className="v9-about-stat-label">Started</span>
                </div>
                <div className="v9-about-stat">
                  <span className="v9-about-stat-num">100+</span>
                  <span className="v9-about-stat-label">Projects</span>
                </div>
              </div>
            </div>
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
          font-size: 0.7rem;
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

        /* --- About card --- */

        .v9-about-card {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 56px;
          align-items: center;
          margin-bottom: 56px;
        }

        .v9-about-photo {
          width: 100%;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          object-position: center top;
          border-radius: 12px;
          filter: grayscale(15%);
        }

        .v9-about-text {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .v9-about-name {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(2rem, 3vw, 2.8rem);
          font-weight: 400;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
        }

        .v9-about-pull {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: clamp(1.3rem, 2vw, 1.7rem);
          color: rgba(255, 255, 255, 0.88);
          line-height: 1.35;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .v9-about-pull em {
          font-style: italic;
          color: #06D6A0;
        }

        .v9-about-bio {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.62);
          line-height: 1.75;
          margin: 0;
          max-width: 480px;
        }

        .v9-about-stats {
          display: flex;
          gap: 32px;
        }

        .v9-about-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .v9-about-stat-num {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 1.5rem;
          color: #06D6A0;
          letter-spacing: -0.02em;
        }

        .v9-about-stat-label {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.35);
          text-transform: uppercase;
          letter-spacing: 0.08em;
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

          .v9-about-card {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .v9-about-photo {
            aspect-ratio: 4 / 3;
            object-position: center 20%;
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
          .v9-about-card,
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
