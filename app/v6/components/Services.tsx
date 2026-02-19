'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: 'Get found and get customers',
    quote: 'I need a website that actually brings in business.',
    features: [
      'Websites designed to turn visitors into customers',
      'SEO that puts you in front of the right people',
      'Landing pages for campaigns and ads',
      'Google Business and local search optimization',
    ],
  },
  {
    title: 'Save time and cut costs',
    quote: 'I spend too much time on things a computer should handle.',
    features: [
      'Custom apps and dashboards built for your team',
      'Customer self-service portals',
      'Workflow automation that gives you hours back',
      'Internal tools your team will actually use',
    ],
  },
  {
    title: 'Keep customers coming back',
    quote: 'I win customers but they do not stick around.',
    features: [
      'Loyalty programs that drive repeat business',
      'Email sequences that keep you top of mind',
      'Customer feedback systems',
      'Retention analytics to understand what works',
    ],
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      }

      // Cards staggered reveal with accent bar animation
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length) {
        validCards.forEach((card, i) => {
          if (!card) return;

          gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          });

          // Accent bar grows in
          const bar = card.querySelector('.v6-service-accent-bar');
          if (bar) {
            gsap.from(bar, {
              scaleY: 0,
              transformOrigin: 'top',
              duration: 0.6,
              delay: i * 0.15 + 0.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                once: true,
              },
            });
          }
        });
      }

      // CTA reveal
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="v6-services" ref={sectionRef}>
      <div className="v6-services-container">
        <div className="v6-services-header" ref={headerRef}>
          <span className="v6-label">What you get</span>
          <h2 className="v6-services-heading">
            Three ways I help businesses grow
          </h2>
        </div>

        <div className="v6-services-grid">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="v6-service-card"
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
            >
              <div className="v6-service-accent-bar" />
              <div className="v6-service-card-body">
                <h3 className="v6-service-title">{service.title}</h3>
                <p className="v6-service-quote">
                  &ldquo;{service.quote}&rdquo;
                </p>
                <ul className="v6-service-features">
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="v6-services-cta" ref={ctaRef}>
          <a href="#contact" className="v6-btn">
            <span>Let&apos;s talk about your business</span>
          </a>
        </div>
      </div>

      <style>{`
        .v6-services {
          padding: 96px 24px;
          background: var(--v2-bg);
        }

        .v6-services-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .v6-services-header {
          margin-bottom: 72px;
        }

        .v6-services-heading {
          font-family: var(--font-instrument-serif);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 400;
          color: var(--v2-text);
          line-height: 1.1;
          margin: 0;
        }

        .v6-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 900px) {
          .v6-services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 600px) {
          .v6-services-grid {
            grid-template-columns: 1fr;
          }
          .v6-services {
            padding: 80px 20px;
          }
        }

        .v6-service-card {
          background: var(--v2-card-bg);
          border: 1px solid var(--v2-border);
          border-radius: 2px;
          display: flex;
          position: relative;
          overflow: hidden;
        }

        .v6-service-accent-bar {
          width: 3px;
          flex-shrink: 0;
          background: linear-gradient(180deg, var(--v2-accent) 0%, var(--v2-accent-dark) 100%);
        }

        .v6-service-card-body {
          padding: 36px 32px;
          flex: 1;
        }

        .v6-service-title {
          font-family: var(--font-instrument-serif);
          font-size: 1.35rem;
          font-weight: 400;
          color: var(--v2-text);
          margin: 0 0 16px 0;
          line-height: 1.3;
        }

        .v6-service-quote {
          font-family: var(--font-instrument-serif);
          font-style: italic;
          font-size: 0.95rem;
          color: var(--v2-text-dim);
          line-height: 1.6;
          margin: 0 0 24px 0;
        }

        .v6-service-features {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .v6-service-features li {
          font-family: var(--font-inter);
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--v2-text-muted);
          padding: 4px 0 4px 20px;
          position: relative;
        }

        .v6-service-features li::before {
          content: '\u2014';
          position: absolute;
          left: 0;
          color: var(--v2-accent);
          font-size: 0.85rem;
        }

        .v6-services-cta {
          margin-top: 64px;
          text-align: center;
        }

        .v6-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-inter);
          font-size: 0.9rem;
          font-weight: 500;
          color: #fff;
          background: var(--v2-navy);
          padding: 16px 40px;
          border-radius: 4px;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .v6-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--v2-accent) 0%, var(--v2-accent-dark) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .v6-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }

        .v6-btn:hover::before {
          opacity: 1;
        }

        .v6-btn span {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </section>
  );
}
