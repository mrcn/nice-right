'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  end: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { end: 290, suffix: '%', label: 'Traffic Growth for a Home Service Company' },
  { end: 12, suffix: 'x', label: 'More Leads from the Same Site' },
  { end: 80, suffix: '%', label: 'Time Saved with Workflow Automation' },
];

const caseStudies = [
  {
    tag: 'Healthcare Platform',
    headline: 'Cut deal-closing time by 40%',
    description:
      'Built a custom CRM integration that automated document collection and follow-ups.',
    image: '/images/nursing-home-money.webp',
    alt: 'Healthcare investment platform',
    link: '/work/healthcare-platform',
  },
  {
    tag: 'Northern Trust',
    headline: 'Modernized a Fortune 500 web presence',
    description:
      'Led frontend architecture for a complete digital transformation.',
    image: '/images/bankk.webp',
    alt: 'Northern Trust project',
    link: '/work/northern-trust',
  },
  {
    tag: 'GreenPill Dev Guild',
    headline: 'Built a verified impact platform for conservation',
    description: 'Created a blockchain-verified biodiversity tracking system.',
    image: '/images/garden-money.webp',
    alt: 'GreenPill Dev Guild biodiversity platform',
    link: '/work/greenpill',
  },
];

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.querySelectorAll('.v81-reveal').forEach((node) => {
        (node as HTMLElement).style.opacity = '1';
        (node as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set('.v81-reveal', { opacity: 0, y: 40 });

      const reveals = el.querySelectorAll('.v81-reveal');
      reveals.forEach((node, i) => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(node, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.08,
              ease: 'power3.out',
            });
          },
        });
      });

      if (statsRef.current) {
        const valueEls =
          statsRef.current.querySelectorAll<HTMLElement>('[data-stat-value]');

        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            stats.forEach((stat, i) => {
              const node = valueEls[i];
              if (!node) return;
              const obj = { value: 0 };
              gsap.to(obj, {
                value: stat.end,
                duration: 1.8,
                ease: `steps(${Math.min(stat.end, 40)})`,
                delay: i * 0.2,
                onUpdate: () => {
                  node.textContent = `${Math.round(obj.value)}${stat.suffix}`;
                },
              });
            });
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .v81-proof {
          background: #F5F5F0;
          padding: 140px 0;
          border-top: 3px solid #0A0A0A;
        }

        .v81-proof-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .v81-proof-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #0000FF;
          margin: 0 0 16px;
        }

        .v81-proof-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 6vw, 5rem);
          text-transform: uppercase;
          color: #0A0A0A;
          letter-spacing: -0.02em;
          line-height: 0.9;
          margin: 0 0 80px;
        }

        /* --- Stats --- */
        .v81-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 3px solid #0A0A0A;
          margin-bottom: 80px;
        }

        .v81-stat-block {
          padding: 56px 40px;
          border-right: 3px solid #0A0A0A;
          text-align: center;
          transition: all 0.3s ease;
        }

        .v81-stat-block:last-child {
          border-right: none;
        }

        .v81-stat-block:hover {
          background: rgba(255, 0, 0, 0.03);
        }

        .v81-stat-block:hover .v81-stat-number {
          transform: scale(1.05);
        }

        .v81-stat-number {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(4rem, 8vw, 8rem);
          line-height: 1;
          color: #FF0000;
          letter-spacing: -0.03em;
          margin: 0;
          transition: transform 0.3s ease;
        }

        .v81-stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0A0A0A;
          margin-top: 16px;
          line-height: 1.5;
          opacity: 0.8;
        }

        /* --- Case Studies --- */
        .v81-cases {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 3px solid #0A0A0A;
          margin-bottom: 80px;
        }

        .v81-case-card {
          border-right: 3px solid #0A0A0A;
          overflow: hidden;
          text-decoration: none;
          color: #0A0A0A;
          display: block;
          transition: all 0.3s ease;
          position: relative;
        }

        .v81-case-card:last-child {
          border-right: none;
        }

        .v81-case-card:hover {
          background: rgba(0, 0, 255, 0.03);
        }

        .v81-case-image {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-bottom: 3px solid #0A0A0A;
          position: relative;
        }

        .v81-case-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(100%) contrast(1.1);
          transition: all 0.4s ease;
        }

        .v81-case-card:hover .v81-case-image img {
          filter: grayscale(0%) contrast(1.1);
          transform: scale(1.05);
        }

        .v81-case-image::after {
          content: 'View Project →';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: #0000FF;
          color: #fff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 12px;
          text-align: center;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .v81-case-card:hover .v81-case-image::after {
          transform: translateY(0);
        }

        .v81-case-body {
          padding: 32px;
        }

        .v81-case-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #0000FF;
          margin: 0 0 12px;
        }

        .v81-case-headline {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          text-transform: uppercase;
          color: #0A0A0A;
          margin: 0 0 12px;
          line-height: 1.3;
        }

        .v81-case-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          line-height: 1.6;
          color: #0A0A0A;
          opacity: 0.7;
          margin: 0;
        }

        /* --- About --- */
        .v81-about-block {
          display: flex;
          gap: 48px;
          align-items: center;
          border: 3px solid #0A0A0A;
          padding: 56px;
          margin-bottom: 64px;
          background: linear-gradient(135deg, #F5F5F0 0%, #EDEDEA 100%);
        }

        .v81-about-image {
          flex-shrink: 0;
          width: 200px;
          height: 200px;
          overflow: hidden;
          border: 3px solid #0A0A0A;
          position: relative;
        }

        .v81-about-image::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 3px solid #0000FF;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .v81-about-block:hover .v81-about-image::after {
          opacity: 1;
        }

        .v81-about-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(30%) contrast(1.1);
          transition: all 0.4s ease;
        }

        .v81-about-block:hover .v81-about-image img {
          filter: grayscale(0%) contrast(1.1);
        }

        .v81-about-text p {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 1.15rem;
          line-height: 1.7;
          color: #0A0A0A;
          margin: 0;
        }

        .v81-about-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0A0A0A;
          opacity: 0.6;
          margin-top: 20px !important;
        }

        /* --- CTA --- */
        .v81-proof-cta {
          text-align: center;
        }

        .v81-proof-cta a {
          display: inline-block;
          background: #0000FF;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 20px 48px;
          border: 3px solid #0A0A0A;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .v81-proof-cta a::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #0A0A0A;
          transition: left 0.3s ease;
          z-index: 0;
        }

        .v81-proof-cta a:hover {
          transform: translateY(-3px);
          box-shadow: 8px 8px 0px rgba(10, 10, 10, 0.15);
        }

        .v81-proof-cta a:hover::before {
          left: 0;
        }

        .v81-proof-cta a span {
          position: relative;
          z-index: 1;
        }

        .v81-reveal {
          opacity: 0;
        }

        /* --- Responsive --- */
        @media (max-width: 900px) {
          .v81-proof {
            padding: 100px 0;
          }

          .v81-proof-inner {
            padding: 0 20px;
          }

          .v81-stats-grid {
            grid-template-columns: 1fr;
          }

          .v81-stat-block {
            border-right: none;
            border-bottom: 3px solid #0A0A0A;
            padding: 40px 24px;
          }

          .v81-stat-block:last-child {
            border-bottom: none;
          }

          .v81-cases {
            grid-template-columns: 1fr;
          }

          .v81-case-card {
            border-right: none;
            border-bottom: 3px solid #0A0A0A;
          }

          .v81-case-card:last-child {
            border-bottom: none;
          }

          .v81-about-block {
            flex-direction: column;
            padding: 40px 24px;
            gap: 32px;
          }

          .v81-about-image {
            width: 160px;
            height: 160px;
          }
        }

        @media (max-width: 600px) {
          .v81-proof-heading {
            font-size: clamp(2rem, 10vw, 3rem);
            margin-bottom: 48px;
          }

          .v81-stat-number {
            font-size: clamp(3rem, 15vw, 5rem);
          }

          .v81-proof-cta a {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <section ref={sectionRef} id="results" className="v81-proof">
        <div className="v81-proof-inner">
          <p className="v81-proof-label v81-reveal">Results</p>
          <h2 className="v81-proof-heading v81-reveal">
            Numbers from Real Projects
          </h2>

          <div ref={statsRef} className="v81-stats-grid v81-reveal">
            {stats.map((stat) => (
              <div key={stat.label} className="v81-stat-block">
                <div className="v81-stat-number">
                  <span data-stat-value>0{stat.suffix}</span>
                </div>
                <div className="v81-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="v81-cases v81-reveal">
            {caseStudies.map((cs) => (
              <a key={cs.tag} href={cs.link} className="v81-case-card">
                <div className="v81-case-image">
                  <img src={cs.image} alt={cs.alt} />
                </div>
                <div className="v81-case-body">
                  <p className="v81-case-tag">{cs.tag}</p>
                  <h3 className="v81-case-headline">{cs.headline}</h3>
                  <p className="v81-case-desc">{cs.description}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="v81-about-block v81-reveal">
            <div className="v81-about-image">
              <img src="/images/hero-abstract.svg" alt="Marcin - Nice Right" />
            </div>
            <div className="v81-about-text">
              <p>
                I&apos;m Marcin. 13 years building websites, 6 at a digital
                agency, 100+ projects for small and mid-size businesses. When
                you work with Nice Right, you work directly with me — start to
                finish.
              </p>
              <p className="v81-about-sub">
                Currently working with clients in food service, healthcare,
                e-commerce, and local services.
              </p>
            </div>
          </div>

          <div className="v81-proof-cta v81-reveal">
            <a href="#contact">
              <span>See What&apos;s Possible for Your Business</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
