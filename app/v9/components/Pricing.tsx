'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const tiers = [
  {
    name: 'Essentials Partnership',
    setupPrice: '$8,000',
    monthlyPrice: '$2,000/mo',
    commitment: '6-month minimum',
    description:
      'Professional website + ongoing partnership for local businesses',
    setupFeatures: [
      'Website up to 8 pages',
      'Mobile-responsive design',
      'SEO foundation',
      'Contact forms & integrations',
    ],
    monthlyFeatures: [
      'Unlimited small updates',
      'Monthly performance report',
      '1-hour strategy call',
      'Basic SEO monitoring',
      'Security updates & backups',
      'Email support (24hr response)',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth Partnership',
    setupPrice: '$15,000',
    monthlyPrice: '$3,500/mo',
    commitment: '6-month minimum',
    description:
      'Full platform + continuous optimization for growing companies',
    setupFeatures: [
      'Website up to 15 pages + blog',
      'Custom dashboards',
      'Automation setup',
      'Advanced SEO & integrations',
    ],
    monthlyFeatures: [
      'Everything in Essentials, plus:',
      'Custom development (8 hrs/mo)',
      'Landing pages for campaigns',
      'A/B testing & optimization',
      'Google Business management',
      'Priority support (same-day)',
      'Quarterly business review',
    ],
    cta: 'Most Popular',
    popular: true,
  },
  {
    name: 'Transformation Partnership',
    setupPrice: '$25,000+',
    monthlyPrice: '$5,000-8,000/mo',
    commitment: '12-month minimum',
    description: 'Custom apps, AI & complex systems for ambitious businesses',
    setupFeatures: [
      'Custom app development',
      'AI/LLM integrations',
      'Complex automation',
      'Multi-system integrations',
    ],
    monthlyFeatures: [
      'Everything in Growth, plus:',
      'Custom dev (up to 20 hrs/mo)',
      'AI model fine-tuning',
      'Advanced analytics',
      'White-glove support (4hr)',
      'Monthly in-person strategy',
      'Dedicated Slack channel',
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
            <h2 className="v9-pricing-heading">
              Your Digital Partner, Month After Month
            </h2>
            <p className="v9-pricing-sub">
              Stop thinking of your website as a one-time project. Think of it
              as a growth engine that needs constant tuning. I build your
              foundation, then stick around to optimize, improve, and help you
              grow.
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

                <div className="v9-pricing-setup">
                  <span className="v9-pricing-label">Setup</span>
                  <span className="v9-pricing-amount">{tier.setupPrice}</span>
                </div>

                <div className="v9-pricing-monthly">
                  <span className="v9-pricing-label">Then</span>
                  <span className="v9-pricing-amount v9-pricing-amount--monthly">
                    {tier.monthlyPrice}
                  </span>
                </div>

                <p className="v9-pricing-commitment">{tier.commitment}</p>
                <p className="v9-pricing-desc">{tier.description}</p>

                <div className="v9-pricing-section">
                  <h4 className="v9-pricing-section-title">Initial Build</h4>
                  <ul className="v9-pricing-features">
                    {tier.setupFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="v9-pricing-section">
                  <h4 className="v9-pricing-section-title">Every Month</h4>
                  <ul className="v9-pricing-features">
                    {tier.monthlyFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

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
              <div className="v9-guarantee-icon">🤝</div>
              <div className="v9-guarantee-content">
                <h4>The Partnership Promise</h4>
                <p>
                  30-day satisfaction guarantee on setup. If you&apos;re not
                  excited about the direction, full refund—no questions. After
                  that, month-to-month with 30-day notice. I only want long-term
                  clients who love working together.
                </p>
              </div>
            </div>
          </div>

          <div className="v9-pricing-faq">
            <h4>Common Questions</h4>
            <div className="v9-pricing-faq-grid">
              <div className="v9-pricing-faq-item">
                <strong>What if I need to pause?</strong>
                <p>
                  After the minimum commitment, you can pause with 30 days
                  notice. Resume anytime.
                </p>
              </div>
              <div className="v9-pricing-faq-item">
                <strong>What&apos;s not included?</strong>
                <p>
                  Major new features beyond monthly hours are billed separately
                  at $150/hour.
                </p>
              </div>
              <div className="v9-pricing-faq-item">
                <strong>How do we start?</strong>
                <p>
                  Free 30-minute call to see if we&apos;re a fit. If yes, 50%
                  deposit to begin.
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
          margin-bottom: 4px;
          letter-spacing: -0.02em;
        }

        .v9-pricing-payment {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.85rem;
          color: rgba(12, 17, 23, 0.5);
          margin-bottom: 12px;
          font-style: italic;
        }

        .v9-pricing-setup,
        .v9-pricing-monthly {
          display: flex;
          flex-direction: column;
          margin-bottom: 4px;
        }

        .v9-pricing-label {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          color: rgba(12, 17, 23, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .v9-pricing-amount {
          font-family: var(--v9-font-heading);
          font-size: 2rem;
          font-weight: 500;
          color: #0C1117;
          letter-spacing: -0.02em;
        }

        .v9-pricing-amount--monthly {
          color: #0B8A6E;
          font-size: 1.6rem;
        }

        .v9-pricing-commitment {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.8rem;
          color: rgba(12, 17, 23, 0.5);
          font-style: italic;
          margin-bottom: 12px;
        }

        .v9-pricing-desc {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          color: rgba(12, 17, 23, 0.6);
          line-height: 1.5;
          margin-bottom: 20px;
          min-height: 42px;
        }

        .v9-pricing-section {
          margin-bottom: 16px;
        }

        .v9-pricing-section-title {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          color: rgba(12, 17, 23, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 8px 0;
          padding-bottom: 4px;
          border-bottom: 1px solid rgba(12, 17, 23, 0.1);
        }

        .v9-pricing-features {
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
        }

        .v9-pricing-features li {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.85rem;
          color: #0C1117;
          padding: 4px 0 4px 16px;
          position: relative;
        }

        .v9-pricing-features li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #0B8A6E;
          font-weight: 600;
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

        .v9-pricing-faq {
          max-width: 900px;
          margin: 48px auto 0;
          padding-top: 48px;
          border-top: 1px solid rgba(12, 17, 23, 0.1);
        }

        .v9-pricing-faq h4 {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #0C1117;
          text-align: center;
          margin-bottom: 32px;
        }

        .v9-pricing-faq-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .v9-pricing-faq-item {
          text-align: center;
        }

        .v9-pricing-faq-item strong {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #0C1117;
          display: block;
          margin-bottom: 8px;
        }

        .v9-pricing-faq-item p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.85rem;
          color: rgba(12, 17, 23, 0.6);
          line-height: 1.5;
          margin: 0;
        }

        @media (max-width: 900px) {
          .v9-pricing-faq-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
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
