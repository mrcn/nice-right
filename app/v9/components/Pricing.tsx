'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trackCTAClick, trackPricingView } from '@/app/lib/analytics';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const tiers = [
  {
    name: 'The Digital Foundation',
    valuePrompt: 'Your business, findable and credible.',
    timeline: 'Typically ready in 4–8 weeks, depending on where you\'re starting',
    description:
      "Right now you're invisible online — or you have no web presence, or one that doesn't do you justice. We fix that. Website, email capture, local listings, a lead magnet that collects leads before you ever spend on ads. Everything a real business needs to be found, trusted, and remembered.",
    idealFor: [
      'Solopreneurs and service businesses starting out',
      'Anyone with no web presence — or one that doesn\'t do them justice',
      'Businesses who\'ve been saying "I need to fix this" for too long',
    ],
    deliverables: [
      '5-page website, mobile-optimized and SEO-ready',
      'Email list setup + lead magnet + welcome sequence',
      'Google Business Profile claimed and optimized',
      'Local directory listings — Yelp, Facebook + industry-specific',
      '30-day check-in to make sure it\'s working',
    ],
    cta: 'Book a Free Call',
  },
  {
    name: 'The Revenue Experiment',
    valuePrompt: 'A revenue stream, built and launched.',
    timeline: 'Most clients see their first paying customer within 30 days',
    description:
      "You have a revenue idea. We build it, launch it, and get you your first paying customers. If it works, you have a new income stream. If it doesn't, you learned fast and cheap. Either way, you don't stay stuck.",
    idealFor: [
      'Service businesses testing a new offer',
      'Founders validating a product idea',
      'Companies exploring new revenue',
    ],
    deliverables: [
      'Working MVP that generates revenue',
      'Landing page + payment processing',
      'Automation that runs without you',
      'Launch strategy + early customers',
      'Real data to decide what\'s next',
    ],
    cta: 'Book a Free Call',
  },
  {
    name: 'The Growth Partnership',
    valuePrompt: 'Your business, understood and grown.',
    timeline: 'Ongoing, embedded partnership',
    description:
      "This is a thinking partnership as much as a building one. We dig into your economics, your market, your competitors, and the opportunities you haven't had time to explore. We brainstorm, we prioritize, we build — and keep building as the business evolves. You run your business. We grow it together.",
    idealFor: [
      'Businesses with a proven offer ready to scale',
      'Leaders who want a strategic partner, not just a vendor',
      'Companies that have outgrown doing it alone',
    ],
    deliverables: [
      'Deep-dive into your business economics and market',
      'Ongoing strategy, brainstorming, and prioritization',
      'Systems and platforms built for your model',
      'Automation that saves meaningful time every week',
      'Direct access — I answer in hours, not days',
    ],
    cta: 'Book a Free Call',
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
            onEnter: () => {
              tiers.forEach((t) => trackPricingView(t.name));
            },
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
            <h2 className="v9-pricing-heading">Three Ways to Work Together</h2>
            <p className="v9-pricing-sub">
              Every business is at a different stage. Pick what fits where you are.
            </p>
          </div>

          <div className="v9-pricing-grid">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="v9-pricing-card"
              >
                <h3 className="v9-pricing-name">{tier.name}</h3>

                <div className="v9-pricing-value-prompt">{tier.valuePrompt}</div>
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

                <a
                  href="#contact"
                  className="v9-btn v9-btn-gradient"
                  onClick={() => trackCTAClick(tier.name, 'pricing')}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="v9-pricing-bottom">
            <div className="v9-pricing-compare">
              <h4>Here&apos;s how the call works.</h4>
              <p>
                Walk me through your business. Where you are, where you want to
                go, what&apos;s blocking it. I&apos;ll give you an honest read —
                what&apos;s possible, what&apos;s not, and what it would actually
                take.
              </p>
              <div className="v9-pricing-budget-highlight">
                Then we talk budget. Just name your number. Whatever you&apos;ve
                got — I&apos;ll tell you what I can do with it. My job is to get
                you moving, not to figure out how much I can charge you. If I can
                get you on your feet, I will.
              </div>
              <p className="v9-pricing-micro">30 minutes. No pitch. Real talk.</p>
              <a href="#contact" className="v9-btn v9-btn-gradient" onClick={() => trackCTAClick('pricing_bottom', 'pricing')}>
                Book Your Free Strategy Call
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
          max-width: 1200px;
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

        .v9-pricing-header .v9-pricing-sub {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1.05rem;
          color: rgba(12, 17, 23, 0.6);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          text-align: center;
          display: block;
        }

        .v9-pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 64px;
        }

        .v9-pricing-card {
          position: relative;
          background: #F8F7F4;
          border-radius: 20px;
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .v9-pricing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
        }

        .v9-pricing-name {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #0C1117;
          margin: 0 0 8px 0;
        }

        .v9-pricing-value-prompt {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: 1.05rem;
          font-weight: 400;
          color: #0B8A6E;
          margin-bottom: 4px;
          line-height: 1.4;
        }

        .v9-pricing-timeline {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.82rem;
          color: rgba(12, 17, 23, 0.5);
          font-weight: 500;
          margin-bottom: 16px;
          line-height: 1.4;
        }

        .v9-pricing-desc {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
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
          font-size: 0.65rem;
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
          font-size: 0.85rem;
          color: #0C1117;
          padding: 5px 0 5px 20px;
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

        .v9-pricing-budget-highlight {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1rem;
          color: #0C1117;
          line-height: 1.65;
          margin: 0 0 20px 0;
          padding: 20px 24px;
          background: rgba(11, 138, 110, 0.06);
          border-left: 3px solid #0B8A6E;
          border-radius: 0 12px 12px 0;
          text-align: left;
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
          max-width: 560px;
          margin: 0 auto;
          padding-top: 48px;
          border-top: 1px solid rgba(12, 17, 23, 0.1);
        }

        .v9-pricing-compare h4 {
          font-family: var(--v9-font-heading);
          font-size: clamp(1.4rem, 2.5vw, 1.9rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #0C1117;
          margin: 0 0 20px 0;
        }

        .v9-pricing-compare p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          color: rgba(12, 17, 23, 0.65);
          line-height: 1.65;
          margin: 0 0 14px 0;
        }

        .v9-pricing-micro {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.8rem !important;
          font-weight: 600;
          color: rgba(12, 17, 23, 0.4) !important;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin: 0 0 24px 0 !important;
        }

        @media (max-width: 1024px) {
          .v9-pricing-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin-left: auto;
            margin-right: auto;
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
            padding: 28px 20px;
          }
        }
      `}</style>
    </>
  );
}
