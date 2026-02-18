'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Get Found \u0026 Get Customers',
    quote: '"I need a website that actually brings in business."',
    features: [
      'Websites that turn visitors into paying customers',
      'SEO so the right people find you first',
      'Landing pages for campaigns \u0026 ads',
      'Google Business \u0026 local search setup',
    ],
    align: 'left' as const,
  },
  {
    title: 'Save Time \u0026 Cut Costs',
    quote: '"I spend too much time on things a computer should handle."',
    features: [
      'Custom apps \u0026 dashboards for your team',
      'Customer self-service portals',
      'Workflow automation that frees up your day',
      'Internal tools your team will actually use',
    ],
    align: 'right' as const,
  },
  {
    title: 'Keep Customers Coming Back',
    quote: '"I win customers but they don\'t stick around."',
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
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .v81-services {
          background: #F5F5F0;
          padding: 140px 0;
          border-top: 3px solid #0A0A0A;
        }

        .v81-svc-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .v81-svc-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #0000FF;
          margin: 0 0 16px;
        }

        .v81-svc-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 6vw, 5rem);
          line-height: 0.9;
          color: #0A0A0A;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          margin: 0 0 80px;
        }

        .v81-svc-list {
          display: flex;
          flex-direction: column;
          border: 3px solid #0A0A0A;
        }

        .v81-svc-card {
          border-bottom: 3px solid #0A0A0A;
          transition: all 0.3s ease;
        }

        .v81-svc-card:last-child {
          border-bottom: none;
        }

        .v81-svc-card:hover {
          background: rgba(0, 0, 255, 0.02);
        }

        .v81-svc-card-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 64px 48px;
          align-items: center;
        }

        .v81-svc-card--right .v81-svc-card-inner {
          direction: rtl;
        }

        .v81-svc-card--right .v81-svc-content {
          direction: ltr;
        }

        .v81-svc-card--right .v81-svc-visual {
          direction: ltr;
        }

        .v81-svc-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(1.25rem, 2.5vw, 2rem);
          line-height: 1.2;
          color: #0000FF;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          margin: 0 0 20px;
          transition: transform 0.3s ease;
        }

        .v81-svc-card:hover .v81-svc-title {
          transform: translateX(8px);
        }

        .v81-svc-card--right:hover .v81-svc-title {
          transform: translateX(-8px);
        }

        .v81-svc-quote {
          font-family: 'JetBrains Mono', monospace;
          font-style: italic;
          font-size: 1rem;
          line-height: 1.6;
          color: #0A0A0A;
          opacity: 0.7;
          margin: 0 0 32px;
          padding-left: 20px;
          border-left: 3px solid #FF0000;
        }

        .v81-svc-card--right .v81-svc-quote {
          padding-left: 0;
          padding-right: 20px;
          border-left: none;
          border-right: 3px solid #FF0000;
        }

        .v81-svc-features {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .v81-svc-features li {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          line-height: 1.8;
          color: #0A0A0A;
          padding: 8px 0;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .v81-svc-features li::before {
          content: '→';
          color: #FF0000;
          font-weight: 700;
          flex-shrink: 0;
        }

        .v81-svc-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 6rem;
          color: rgba(0, 0, 255, 0.1);
          font-weight: 800;
        }

        .v81-svc-bottom {
          margin-top: 64px;
          text-align: center;
        }

        .v81-svc-cta {
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
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .v81-svc-cta::before {
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

        .v81-svc-cta:hover {
          transform: translateY(-3px);
          box-shadow: 8px 8px 0px rgba(10, 10, 10, 0.15);
        }

        .v81-svc-cta:hover::before {
          left: 0;
        }

        .v81-svc-cta span {
          position: relative;
          z-index: 1;
        }

        .v81-reveal {
          opacity: 0;
        }

        @media (max-width: 900px) {
          .v81-services {
            padding: 100px 0;
          }

          .v81-svc-inner {
            padding: 0 20px;
          }

          .v81-svc-card-inner {
            grid-template-columns: 1fr;
            padding: 40px 24px;
          }

          .v81-svc-card--right .v81-svc-card-inner {
            direction: ltr;
          }

          .v81-svc-visual {
            display: none;
          }

          .v81-svc-card:hover .v81-svc-title {
            transform: none;
          }

          .v81-svc-quote {
            padding-left: 16px;
          }

          .v81-svc-card--right .v81-svc-quote {
            padding-right: 16px;
            padding-left: 16px;
            border-right: none;
            border-left: 3px solid #FF0000;
          }

          .v81-svc-cta {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <section ref={sectionRef} id="services" className="v81-services">
        <div className="v81-svc-inner">
          <p className="v81-svc-label v81-reveal">Services</p>
          <h2 className="v81-svc-heading v81-reveal">What You Get</h2>

          <div className="v81-svc-list">
            {services.map((svc, index) => (
              <div
                key={svc.title}
                className={`v81-svc-card v81-reveal ${svc.align === 'right' ? 'v81-svc-card--right' : ''}`}
              >
                <div className="v81-svc-card-inner">
                  <div className="v81-svc-content">
                    <h3 className="v81-svc-title">{svc.title}</h3>
                    <p className="v81-svc-quote">{svc.quote}</p>
                    <ul className="v81-svc-features">
                      {svc.features.map((feat) => (
                        <li key={feat}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="v81-svc-visual">0{index + 1}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="v81-svc-bottom v81-reveal">
            <a href="#contact" className="v81-svc-cta">
              <span>Let&apos;s Talk</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
