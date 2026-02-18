'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CascadeGrid } from './CascadeGrid';

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

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. GSAP-driven stat counter animation (replaces CountUp component)
      if (statsRef.current) {
        const valueEls =
          statsRef.current.querySelectorAll<HTMLElement>('[data-stat-value]');
        const statBlocks = statsRef.current.children;

        gsap.fromTo(
          statBlocks,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              once: true,
            },
            onStart: () => {
              stats.forEach((stat, i) => {
                const el = valueEls[i];
                if (!el) return;
                const obj = { value: 0 };
                gsap.to(obj, {
                  value: stat.end,
                  duration: 1.8,
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

      // 2. Case study image parallax
      const images = section.querySelectorAll('.v2-result-image img');
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.v2-result-card'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      });

      // 3. Case study card hover effects
      const cards = section.querySelectorAll('.v2-result-card');
      cards.forEach((card) => {
        const img = card.querySelector('.v2-result-image img');
        const link = card.querySelector('.v2-result-link');
        if (!img || !link) return;

        const hoverTl = gsap.timeline({ paused: true });
        hoverTl
          .to(img, { scale: 1.18, duration: 0.4, ease: 'power2.out' }, 0)
          .to(link, { x: 6, duration: 0.3, ease: 'power2.out' }, 0);

        card.addEventListener('mouseenter', () => hoverTl.play());
        card.addEventListener('mouseleave', () => hoverTl.reverse());
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="results" className="v2-results">
      <div className="v2-container">
        <div className="v2-results-header v2-reveal">
          <p className="v2-section-label">Results</p>
          <h2>Numbers from real projects</h2>
        </div>

        {/* Stats -- GSAP-driven, server-renders final values */}
        <div ref={statsRef} className="v2-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="v2-stat-number">
                <span data-stat-value>
                  {stat.end}
                  {stat.suffix}
                </span>
              </div>
              <div className="v2-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Case studies */}
        <CascadeGrid className="v2-casestudies-grid" staggerEach={0.15}>
          <a href="/work/healthcare-real-estate" className="v2-result-card">
            <div className="v2-result-image">
              <img
                src="/images/nursing-home-money.webp"
                alt="Healthcare investment platform"
              />
            </div>
            <div className="v2-result-body">
              <span className="v2-result-client">Healthcare Platform</span>
              <h3>Cut deal-closing time by 40%</h3>
              <p>
                Custom portal connecting providers with property opportunities.
              </p>
              <span className="v2-result-link">View case study &rarr;</span>
            </div>
          </a>
          <a href="/work/northern-trust" className="v2-result-card">
            <div className="v2-result-image">
              <img src="/images/bankk.webp" alt="Northern Trust project" />
            </div>
            <div className="v2-result-body">
              <span className="v2-result-client">Northern Trust</span>
              <h3>Modernized a Fortune 500 web presence</h3>
              <p>Micro-interactions and animation that boosted engagement.</p>
              <span className="v2-result-link">View case study &rarr;</span>
            </div>
          </a>
          <a href="/work/green-goods" className="v2-result-card">
            <div className="v2-result-image">
              <img
                src="/images/garden-money.webp"
                alt="Green Goods biodiversity platform"
              />
            </div>
            <div className="v2-result-body">
              <span className="v2-result-client">GreenPill Dev Guild</span>
              <h3>Built a verified impact platform for conservation</h3>
              <p>
                Blockchain PWA tracking biodiversity actions with on-chain
                attestations.
              </p>
              <span className="v2-result-link">View case study &rarr;</span>
            </div>
          </a>
        </CascadeGrid>

        <div className="v2-about-card v2-reveal v2-reveal-delay-4">
          <div className="v2-about-content">
            <p className="v2-about-lead">
              I&apos;m Marcin. 13 years building websites, 6 at a digital
              agency, 100+ projects for small and mid-size businesses. When you
              work with Nice Right, you work directly with me &mdash; start to
              finish.
            </p>
            <p className="v2-about-secondary">
              Currently working with clients in food service, healthcare,
              e-commerce, and local services.
            </p>
          </div>
        </div>

        <div className="v2-section-cta v2-reveal">
          <a href="#contact" className="v2-btn">
            See What&apos;s Possible for Your Business
          </a>
        </div>
      </div>
    </section>
  );
}
