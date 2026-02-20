'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const tiers = [
  {
    name: 'Launch',
    price: '$3,500',
    description:
      'Perfect for new businesses ready to establish their online presence',
    features: [
      'Professional website (up to 5 pages)',
      'Mobile-responsive design',
      'Google Business setup',
      'Basic SEO optimization',
      '2 rounds of revisions',
      '30-day support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$7,500',
    description:
      'For established businesses ready to scale their customer acquisition',
    features: [
      'Everything in Launch, plus:',
      'Up to 10 pages + blog',
      'Advanced SEO & keyword strategy',
      'Landing pages for campaigns',
      'Email capture & automation setup',
      'Performance analytics dashboard',
      '60-day support & optimization',
    ],
    cta: 'Most Popular',
    popular: true,
  },
  {
    name: 'Transformation',
    price: '$12,500',
    description: 'Complete digital transformation for market leaders',
    features: [
      'Everything in Growth, plus:',
      'Custom applications & portals',
      'Workflow automation',
      'CRM integration',
      'Advanced analytics & reporting',
      'Priority support (90 days)',
      'Quarterly strategy reviews',
    ],
    cta: "Let's Talk",
    popular: false,
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const header = section.querySelector('.v9-pricing-header');
      const cards = section.querySelectorAll('.v9-pricing-card');

      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="pricing"
        className="v9-pricing v9-section-light"
      >
        <div className="v9-pricing-container">
          <div className="v9-pricing-header">
            <span className="v9-section-label">Investment</span>
            <h2 className="v9-pricing-heading">Clear pricing. No surprises.</h2>
            <p className="v9-pricing-sub">
              Every project includes a free 30-minute strategy call. Payment
              plans available for every budget.
            </p>
          </div>

          <div className="v9-pricing-grid">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`v9-pricing-card ${tier.popular ? 'v9-pricing-card--popular' : ''}`}
              >
                {tier.popular && (
                  <span className="v9-pricing-badge">Most Popular</span>
                )}
                <h3 className="v9-pricing-name">{tier.name}</h3>
                <div className="v9-pricing-price">{tier.price}</div>
                <p className="v9-pricing-desc">{tier.description}</p>

                <ul className="v9-pricing-features">
                  {tier.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`v9-btn ${tier.popular ? 'v9-btn-gradient' : 'v9-btn-outline'}`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="v9-pricing-guarantee">
            <div className="v9-guarantee-box">
              <div className="v9-guarantee-icon">🛡️</div>
              <div className="v9-guarantee-content">
                <h4>The 90-Day Results Guarantee</h4>
                <p>
                  If your new site doesn&apos;t generate at least 50% more leads
                  within 90 days of launch, I&apos;ll keep working for free
                  until it does. No hourly charges. No change orders. Just
                  results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .v9-pricing {
          padding: 120px 0;
          background: #ffffff;
        }

        .v9-pricing-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .v9-pricing-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .v9-pricing-heading {
          font-family: var(--v9-font-heading);
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #0C1117;
          margin: 16px 0 16px 0;
        }

        .v9-pricing-sub {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1.05rem;
          color: rgba(12, 17, 23, 0.6);
          max-width: 540px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .v9-pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-bottom: 64px;
        }

        .v9-pricing-card {
          position: relative;
          background: #F8F7F4;
          border-radius: 20px;
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .v9-pricing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
        }

        .v9-pricing-card--popular {
          background: #ffffff;
          border: 2px solid #0B8A6E;
          box-shadow: 0 0 40px rgba(11, 138, 110, 0.1);
          transform: scale(1.02);
        }

        .v9-pricing-card--popular:hover {
          transform: scale(1.02) translateY(-4px);
          box-shadow: 0 16px 48px rgba(11, 138, 110, 0.15);
        }

        .v9-pricing-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          padding: 6px 16px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        .v9-pricing-name {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #0C1117;
          margin: 0 0 8px 0;
        }

        .v9-pricing-price {
          font-family: var(--v9-font-heading);
          font-size: 2.5rem;
          font-weight: 500;
          color: #0C1117;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .v9-pricing-desc {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          color: rgba(12, 17, 23, 0.6);
          line-height: 1.5;
          margin-bottom: 24px;
          min-height: 42px;
        }

        .v9-pricing-features {
          list-style: none;
          padding: 0;
          margin: 0 0 32px 0;
          flex-grow: 1;
        }

        .v9-pricing-features li {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          color: #0C1117;
          padding: 8px 0;
          border-bottom: 1px solid rgba(12, 17, 23, 0.06);
        }

        .v9-pricing-features li:last-child {
          border-bottom: none;
        }

        .v9-pricing-guarantee {
          max-width: 800px;
          margin: 0 auto;
        }

        .v9-guarantee-box {
          display: flex;
          gap: 24px;
          background: linear-gradient(135deg, #0C1117 0%, #1a2332 100%);
          border-radius: 16px;
          padding: 32px;
          color: #ffffff;
        }

        .v9-guarantee-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .v9-guarantee-content h4 {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1.15rem;
          font-weight: 600;
          margin: 0 0 8px 0;
          color: #06D6A0;
        }

        .v9-guarantee-content p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        @media (max-width: 900px) {
          .v9-pricing-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin-left: auto;
            margin-right: auto;
          }

          .v9-pricing-card--popular {
            transform: none;
            order: -1;
          }

          .v9-guarantee-box {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 640px) {
          .v9-pricing {
            padding: 80px 0;
          }

          .v9-pricing-header {
            margin-bottom: 48px;
          }

          .v9-pricing-card {
            padding: 32px 24px;
          }
        }
      `}</style>
    </>
  );
}
