'use client';

import { useEffect, useRef } from 'react';
import { initGSAP, gsap, ScrollTrigger } from '@/app/_shared/gsap-init';
import {
  trackCTAClick,
  trackElementHover,
  trackPricingView,
  trackSectionView,
} from '@/app/lib/analytics';

const auditDeliverables = [
  'Website and mobile inquiry-path review',
  'Google Business and local visibility check',
  'Comparison with three local competitors',
  'Prioritized Fix This Week / Month / Quarter plan',
  '30-minute walkthrough and next-step recommendation',
];

const auditSteps = [
  {
    number: '01',
    title: 'Talk through the business',
    body: 'We start with what you sell, who you want more of, and what currently feels stuck.',
  },
  {
    number: '02',
    title: 'See where prospects drop out',
    body: 'I review the path from local search to call, form, or booked conversation.',
  },
  {
    number: '03',
    title: 'Choose the next move',
    body: 'You leave with a ranked plan. If implementation makes sense, I can handle it.',
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackedViewRef = useRef(false);
  const ctaHoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    initGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const recordPricingView = () => {
      if (trackedViewRef.current) return;
      trackedViewRef.current = true;
      trackSectionView('pricing');
      trackPricingView('Digital Growth Audit');
    };

    const ctx = gsap.context(() => {
      const revealItems = section.querySelectorAll<HTMLElement>('[data-pricing-reveal]');
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        recordPricingView();
        gsap.set(revealItems, { clearProps: 'all' });
        return;
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top 82%',
        once: true,
        onEnter: recordPricingView,
      });

      gsap.fromTo(
        revealItems,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 82%', once: true },
          onComplete: () => {
            gsap.set(revealItems, { clearProps: 'opacity,transform' });
          },
        },
      );
    }, section);

    return () => {
      ctx.revert();
      if (ctaHoverTimer.current) clearTimeout(ctaHoverTimer.current);
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} id="pricing" className="v9-pricing v9-section-light">
        <div className="v9-pricing-container">
          <div className="v9-pricing-header" data-pricing-reveal>
            <span className="v9-pricing-label">How we start</span>
            <h2 className="v9-pricing-heading">Start with the diagnosis.</h2>
            <p className="v9-pricing-lede">
              You do not need to decide whether you need a new website. I look at
              the path from local search to phone call and show you where good
              prospects drop away.
            </p>
          </div>

          <article className="v9-pricing-audit" data-pricing-reveal aria-labelledby="audit-title">
            <div className="v9-pricing-audit-identity">
              <div className="v9-pricing-num">01</div>
              <h3 id="audit-title" className="v9-pricing-name">Digital Growth Audit</h3>
              <p className="v9-pricing-tagline">Find the leak. Know what to do next.</p>
              <p className="v9-pricing-timeline">Two weeks · $1,500</p>
            </div>

            <div className="v9-pricing-audit-body">
              <p className="v9-pricing-desc">
                A focused look at your website, Google presence, competitors, and
                inquiry path. You get a clear plan, not a list of ideas and not a
                pitch for work you do not need.
              </p>
              <div className="v9-pricing-sublabel">What you get</div>
              <ul className="v9-pricing-list">
                {auditDeliverables.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="v9-pricing-audit-investment">
              <span className="v9-pricing-investment-label">Investment</span>
              <strong>$1,500</strong>
              <p>Credited toward implementation if we continue together.</p>
            </div>
          </article>

          <div className="v9-pricing-process" data-pricing-reveal>
            {auditSteps.map((step) => (
              <div className="v9-pricing-process-step" key={step.number}>
                <span className="v9-pricing-process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>

          <div className="v9-pricing-bottom" data-pricing-reveal>
            <p className="v9-pricing-micro">The audit is the starting point, not a commitment to a rebuild.</p>
            <a
              href="#contact"
              className="v9-btn v9-btn-gradient"
              aria-label="Book a Digital Growth Audit call"
              onClick={() => trackCTAClick('pricing_bottom', 'pricing')}
              onMouseEnter={() => {
                ctaHoverTimer.current = setTimeout(() => trackElementHover('cta_pricing_bottom'), 500);
              }}
              onMouseLeave={() => {
                if (ctaHoverTimer.current) clearTimeout(ctaHoverTimer.current);
              }}
            >
              Book an audit call
            </a>
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
          padding: 0 48px;
        }

        .v9-pricing-header {
          max-width: 720px;
          margin-bottom: 56px;
        }

        .v9-pricing-label,
        .v9-pricing-investment-label {
          display: block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0B8A6E;
          margin-bottom: 16px;
        }

        .v9-pricing-heading {
          font-family: var(--v9-font-heading);
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 400;
          color: #0C1117;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin: 0 0 16px;
        }

        .v9-pricing-lede,
        .v9-pricing-desc,
        .v9-pricing-process-step p,
        .v9-pricing-audit-investment p {
          font-family: 'Inter', -apple-system, sans-serif;
          color: rgba(12, 17, 23, 0.64);
          line-height: 1.65;
        }

        .v9-pricing-lede {
          max-width: 620px;
          font-size: 1rem;
          margin: 0;
        }

        .v9-pricing-audit {
          display: grid;
          grid-template-columns: minmax(190px, 0.8fr) minmax(0, 1.5fr) minmax(180px, 0.65fr);
          border-top: 1px solid rgba(12, 17, 23, 0.12);
          border-bottom: 1px solid rgba(12, 17, 23, 0.12);
          background: #F8F7F4;
        }

        .v9-pricing-audit-identity,
        .v9-pricing-audit-body,
        .v9-pricing-audit-investment {
          padding: 44px 36px;
        }

        .v9-pricing-audit-identity,
        .v9-pricing-audit-body {
          border-right: 1px solid rgba(12, 17, 23, 0.08);
        }

        .v9-pricing-num,
        .v9-pricing-process-number {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #0B8A6E;
        }

        .v9-pricing-num { margin-bottom: 12px; }

        .v9-pricing-name {
          font-family: var(--v9-font-heading);
          font-size: clamp(1.5rem, 2.4vw, 2rem);
          font-weight: 400;
          line-height: 1.1;
          color: #0C1117;
          margin: 0 0 8px;
        }

        .v9-pricing-tagline {
          font-family: var(--v9-font-heading);
          font-style: italic;
          font-size: 1rem;
          color: #0B8A6E;
          line-height: 1.4;
          margin: 0 0 20px;
        }

        .v9-pricing-timeline {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(12, 17, 23, 0.58);
          margin: 0;
        }

        .v9-pricing-desc {
          font-size: 0.94rem;
          margin: 0 0 24px;
          max-width: 560px;
        }

        .v9-pricing-sublabel {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(12, 17, 23, 0.5);
          margin-bottom: 12px;
        }

        .v9-pricing-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 8px;
        }

        .v9-pricing-list li {
          position: relative;
          padding-left: 18px;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.86rem;
          line-height: 1.45;
          color: rgba(12, 17, 23, 0.72);
        }

        .v9-pricing-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #0B8A6E;
          font-weight: 600;
        }

        .v9-pricing-audit-investment {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .v9-pricing-audit-investment .v9-pricing-investment-label {
          margin-bottom: 8px;
        }

        .v9-pricing-audit-investment strong {
          font-family: var(--v9-font-heading);
          font-size: clamp(2.4rem, 4vw, 3.5rem);
          font-weight: 400;
          line-height: 1;
          color: #0C1117;
          letter-spacing: -0.03em;
        }

        .v9-pricing-audit-investment p {
          font-size: 0.8rem;
          margin: 12px 0 0;
        }

        .v9-pricing-process {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          margin: 64px 0 72px;
          border-bottom: 1px solid rgba(12, 17, 23, 0.1);
        }

        .v9-pricing-process-step {
          padding: 0 32px 32px;
          border-right: 1px solid rgba(12, 17, 23, 0.08);
        }

        .v9-pricing-process-step:first-child { padding-left: 0; }
        .v9-pricing-process-step:last-child { border-right: 0; padding-right: 0; }

        .v9-pricing-process-number { display: block; margin-bottom: 14px; }

        .v9-pricing-process-step h3 {
          font-family: var(--v9-font-heading);
          font-size: 1.35rem;
          font-weight: 400;
          color: #0C1117;
          line-height: 1.2;
          margin: 0 0 8px;
        }

        .v9-pricing-process-step p {
          font-size: 0.87rem;
          margin: 0;
          max-width: 280px;
        }

        .v9-pricing-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .v9-pricing-micro {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.78rem;
          color: rgba(12, 17, 23, 0.56);
          margin: 0 0 20px;
        }

        .v9-btn {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          text-align: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .v9-btn-gradient {
          padding: 15px 32px;
          border-radius: 12px;
          color: #ffffff;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          box-shadow: 0 4px 18px rgba(6, 214, 160, 0.28);
        }

        .v9-btn-gradient:hover,
        .v9-btn-gradient:focus-visible {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(6, 214, 160, 0.38);
        }

        .v9-btn-gradient:focus-visible {
          outline: 3px solid rgba(6, 214, 160, 0.45);
          outline-offset: 3px;
        }

        @media (max-width: 900px) {
          .v9-pricing-audit { grid-template-columns: 1fr 1.4fr; }
          .v9-pricing-audit-investment {
            grid-column: 1 / -1;
            padding-top: 0;
            border-top: 1px solid rgba(12, 17, 23, 0.08);
          }
          .v9-pricing-audit-identity { padding-right: 24px; }
          .v9-pricing-audit-body { border-right: 0; padding-left: 24px; }
          .v9-pricing-audit-investment { padding-left: 24px; padding-bottom: 36px; }
        }

        @media (max-width: 700px) {
          .v9-pricing { padding: 80px 0; }
          .v9-pricing-container { padding: 0 24px; }
          .v9-pricing-audit { display: block; }
          .v9-pricing-audit-identity,
          .v9-pricing-audit-body,
          .v9-pricing-audit-investment {
            border-right: 0;
            padding: 30px 20px;
          }
          .v9-pricing-audit-identity,
          .v9-pricing-audit-body { border-bottom: 1px solid rgba(12, 17, 23, 0.08); }
          .v9-pricing-audit-investment { padding-bottom: 32px; }
          .v9-pricing-process { grid-template-columns: 1fr; gap: 28px; margin: 48px 0 56px; }
          .v9-pricing-process-step,
          .v9-pricing-process-step:first-child,
          .v9-pricing-process-step:last-child {
            padding: 0 0 28px;
            border-right: 0;
            border-bottom: 1px solid rgba(12, 17, 23, 0.08);
          }
          .v9-pricing-process-step:last-child { border-bottom: 0; padding-bottom: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .v9-pricing-header,
          .v9-pricing-audit,
          .v9-pricing-process,
          .v9-pricing-bottom {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}
