'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'GET FOUND & GET CUSTOMERS',
    quote: '\u201cI need a website that actually brings in business.\u201d',
    features: [
      'Websites that turn visitors into paying customers',
      'SEO so the right people find you first',
      'Landing pages for campaigns & ads',
      'Google Business & local search setup',
    ],
    align: 'left' as const,
  },
  {
    title: 'SAVE TIME & CUT COSTS',
    quote:
      '\u201cI spend too much time on things a computer should handle.\u201d',
    features: [
      'Custom apps & dashboards for your team',
      'Customer self-service portals',
      'Workflow automation that frees up your day',
      'Internal tools your team will actually use',
    ],
    align: 'right' as const,
  },
  {
    title: 'KEEP CUSTOMERS COMING BACK',
    quote: '\u201cI win customers but they don\u2019t stick around.\u201d',
    features: [
      'Loyalty programs',
      'Email sequences that keep you top of mind',
      'Customer feedback systems',
      'Retention analytics',
    ],
    align: 'left' as const,
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.querySelectorAll('.v8-hidden').forEach((node) => {
        (node as HTMLElement).style.opacity = '1';
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set('.v8-hidden', { opacity: 0 });

      const revealEls = el.querySelectorAll('.v8-svc-reveal');
      revealEls.forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.set(node, { opacity: 1 });
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .v8-services {
          background: #F5F5F0;
          padding: 120px 0;
          border-top: 3px solid #0A0A0A;
        }

        .v8-svc-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .v8-svc-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #0A0A0A;
          margin: 0 0 16px;
        }

        .v8-svc-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 8vw, 7rem);
          line-height: 0.9;
          color: #0A0A0A;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          margin: 0 0 80px;
        }

        .v8-svc-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .v8-svc-card {
          padding: 32px;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          background: #FFFFFF;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: all 0.2s ease-out;
        }

        .v8-svc-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }

        .v8-svc-card-inner {
          display: flex;
          flex-direction: column;
        }

        .v8-svc-title {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: clamp(1.5rem, 3vw, 2rem);
          line-height: 1.2;
          color: #1E3A8A;
          text-transform: none;
          letter-spacing: -0.01em;
          margin: 0 0 16px;
        }

        .v8-svc-card--right .v8-svc-title {
          text-align: right;
        }

        .v8-svc-quote {
          font-family: 'JetBrains Mono', monospace;
          font-style: italic;
          font-size: 0.9rem;
          line-height: 1.6;
          color: #0A0A0A;
          opacity: 0.7;
          margin: 0 0 32px;
          max-width: 600px;
        }

        .v8-svc-card--right .v8-svc-quote {
          margin-left: auto;
          text-align: right;
        }

        .v8-svc-features {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .v8-svc-features li {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          line-height: 1.8;
          color: #0A0A0A;
          padding: 0;
        }

        .v8-svc-features li::before {
          content: '\u2014  ';
          color: #D4A574;
        }

        .v8-svc-card--right .v8-svc-features {
          text-align: right;
          margin-left: auto;
        }

        .v8-svc-card--right .v8-svc-features li::before {
          content: '';
        }

        .v8-svc-card--right .v8-svc-features li::after {
          content: '  \u2014';
          color: #D4A574;
        }

        .v8-svc-bottom {
          margin-top: 80px;
          text-align: center;
        }

        .v8-svc-cta {
          display: inline-block;
          background: #0000FF;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 20px 48px;
          border: 3px solid #0A0A0A;
          border-radius: 0;
          text-decoration: none;
          cursor: pointer;
        }

        .v8-svc-cta:hover {
          background: #0A0A0A;
          color: #F5F5F0;
        }

        @media (max-width: 900px) {
          .v8-services {
            padding: 80px 0;
          }

          .v8-svc-inner {
            padding: 0 20px;
          }

          .v8-svc-card {
            padding: 40px 0;
          }

          .v8-svc-heading {
            margin-bottom: 48px;
          }

          /* Override right-alignment on mobile for readability */
          .v8-svc-card--right .v8-svc-title,
          .v8-svc-card--right .v8-svc-quote,
          .v8-svc-card--right .v8-svc-features {
            text-align: left;
            margin-left: 0;
          }

          .v8-svc-card--right .v8-svc-features li::after {
            content: '';
          }

          .v8-svc-card--right .v8-svc-features li::before {
            content: '\u2014  ';
            color: #D4A574;
          }
        }

        @media (max-width: 600px) {
          .v8-svc-cta {
            width: 100%;
            text-align: center;
            padding: 16px 32px;
          }
        }
      `}</style>

      <section ref={sectionRef} id="services" className="v8-services">
        <div className="v8-svc-inner">
          <p className="v8-svc-label v8-hidden v8-svc-reveal">SERVICES</p>
          <h2 className="v8-svc-heading v8-hidden v8-svc-reveal">
            WHAT YOU GET
          </h2>

          <div className="v8-svc-list">
            {services.map((svc) => (
              <div
                key={svc.title}
                className={`v8-svc-card v8-hidden v8-svc-reveal ${
                  svc.align === 'right' ? 'v8-svc-card--right' : ''
                }`}
              >
                <div className="v8-svc-card-inner">
                  <h3 className="v8-svc-title">{svc.title}</h3>
                  <p className="v8-svc-quote">{svc.quote}</p>
                  <ul className="v8-svc-features">
                    {svc.features.map((feat) => (
                      <li key={feat}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="v8-svc-bottom v8-hidden v8-svc-reveal">
            <a href="#contact" className="v8-svc-cta">
              LET&apos;S TALK
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
