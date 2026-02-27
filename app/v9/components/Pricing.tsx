'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const tiers = [
  {
    name: 'The Revenue Experiment',
    price: '$8,000',
    timeline: '30 days to first customer',
    description:
      "You have a revenue idea. We build it and launch it in 30 days. If it works, you have a new income stream. If it doesn't, you learned fast and cheap.",
    idealFor: [
      'Service businesses testing a new offer',
      'Founders validating a product idea',
      'Companies exploring automation revenue',
    ],
    deliverables: [
      'Working MVP that generates revenue',
      'Landing page + payment processing',
      'Automation that runs without you',
      'Launch strategy + first 10 customers',
      'Go/no-go data in 30 days',
    ],
    guarantee: "Launch in 30 days or you don't pay",
    cta: 'Start Your Experiment',
    popular: false,
  },
  {
    name: 'Technical Partner',
    price: '$15,000 + $3,500/mo',
    timeline: 'Ongoing growth partnership',
    description:
      "You get a technical co-founder without giving up equity. I embed in your business, build systems that scale, and help you find revenue opportunities you're missing.",
    idealFor: [
      'Businesses ready to scale',
      'Companies with proven offers',
      'Leaders who want competitive advantage',
    ],
    deliverables: [
      'Custom platform built for your business',
      'Revenue experiments every quarter',
      'Automation that saves 10+ hours/week',
      'AI & systems that compound over time',
      'Direct access — I answer in hours, not days',
    ],
    guarantee: 'Month-to-month after 90 days. Cancel anytime.',
    cta: 'Get a Technical Co-Founder',
    popular: true,
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
            <h2 className="v9-pricing-heading">Two Ways to Work Together</h2>
            <p className="v9-pricing-sub">
              Both options get you to revenue faster. One is a sprint to
              validate. The other is a partnership to scale. You choose based on
              where you are.
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
                <div className="v9-pricing-timeline">{tier.timeline}</div>

                <p className="v9-pricing-desc">{tier.description}</p>

                <div className="v9-pricing-section">
                  <h4 className="v9-pricing-section-title">Perfect For</h4>
                  <ul className="v9-pricing-features">
                    {tier.idealFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="v9-pricing-section">
                  <h4 className="v9-pricing-section-title">What You Get</h4>
                  <ul className="v9-pricing-features">
                    {tier.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="v9-pricing-guarantee-box">
                  <strong>{tier.guarantee}</strong>
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

          <div className="v9-pricing-bottom">
            <div className="v9-pricing-compare">
              <h4>Not sure which?</h4>
              <p>
                Book a free 20-minute call. I\'ll tell you honestly which option
                fits your situation—or if neither does. No pitch. Just clarity.
              </p>
              <a href="#contact" className="v9-btn v9-btn-text">
                Book Your Free Strategy Call →
              </a>
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
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .v9-pricing-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .v9-section-label {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #0B8A6E;
          margin-bottom: 16px;
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
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .v9-pricing-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
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
          font-size: 1.35rem;
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

        .v9-pricing-timeline {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          color: #0B8A6E;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .v9-pricing-desc {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          color: rgba(12, 17, 23, 0.7);
          line-height: 1.6;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(12, 17, 23, 0.1);
        }

        .v9-pricing-section {
          margin-bottom: 20px;
        }

        .v9-pricing-section-title {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          color: rgba(12, 17, 23, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0 0 12px 0;
        }

        .v9-pricing-features {
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
        }

        .v9-pricing-features li {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          color: #0C1117;
          padding: 6px 0 6px 20px;
          position: relative;
          line-height: 1.4;
        }

        .v9-pricing-features li:before {
          content: '→';
          position: absolute;
          left: 0;
          color: #0B8A6E;
          font-weight: 600;
        }

        .v9-pricing-guarantee-box {
          background: linear-gradient(135deg, #0C1117 0%, #1a2332 100%);
          border-radius: 12px;
          padding: 16px 20px;
          margin: 8px 0 24px 0;
        }

        .v9-pricing-guarantee-box strong {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #06D6A0;
          display: block;
          text-align: center;
        }

        .v9-btn {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          text-align: center;
          margin-top: auto;
        }

        .v9-btn-gradient {
          padding: 14px 28px;
          border-radius: 12px;
          color: #ffffff;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          box-shadow: 0 4px 16px rgba(6, 214, 160, 0.3);
        }

        .v9-btn-gradient:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 24px rgba(6, 214, 160, 0.4);
        }

        .v9-btn-outline {
          padding: 14px 28px;
          border-radius: 12px;
          color: #0C1117;
          background: transparent;
          border: 2px solid #0C1117;
        }

        .v9-btn-outline:hover {
          background: #0C1117;
          color: #ffffff;
        }

        .v9-btn-text {
          padding: 0;
          color: #0B8A6E;
          background: transparent;
          font-weight: 600;
        }

        .v9-btn-text:hover {
          color: #06D6A0;
        }

        .v9-pricing-bottom {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          padding-top: 32px;
          border-top: 1px solid rgba(12, 17, 23, 0.1);
        }

        .v9-pricing-compare h4 {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #0C1117;
          margin: 0 0 8px 0;
        }

        .v9-pricing-compare p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          color: rgba(12, 17, 23, 0.6);
          line-height: 1.5;
          margin: 0 0 16px 0;
        }

        @media (max-width: 900px) {
          .v9-pricing-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin-left: auto;
            margin-right: auto;
          }

          .v9-pricing-card--popular {
            order: -1;
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
