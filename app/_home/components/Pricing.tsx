'use client';

import { useEffect, useRef } from 'react';
import { initGSAP, gsap, ScrollTrigger } from '@/app/_shared/gsap-init';
import { trackCTAClick, trackPricingView, trackSectionView, trackElementHover } from '@/app/lib/analytics';

const tiers = [
  {
    num: '01',
    name: 'The Digital Foundation',
    tagline: 'Your business, findable and credible.',
    timeline: 'Typically 4–8 weeks',
    description:
      "You've been meaning to fix the website for years. People are Googling you and finding nothing — or something that doesn't do you justice. We fix that. Website, local listings, email capture, a lead magnet that works before you spend a dollar on ads.",
    deliverables: [
      '5-page website, mobile-optimized and SEO-ready',
      'Email list + lead magnet + welcome sequence',
      'Google Business Profile claimed and optimized',
      'Local directory listings — Yelp, Facebook + industry-specific',
      '30-day check-in to make sure it\'s working',
    ],
    pullQuote: 'I feel invisible online. People who need exactly what I do can\u2019t find me.',
  },
  {
    num: '02',
    name: 'The Growth Experiment',
    tagline: 'One lever, tested and proven.',
    timeline: 'First results in 30–45 days',
    description:
      "More customers. Higher prices. Better retention. Less waste. You know which one is holding you back. We pick that lever, build something to test it, and get you real results — not a deck, not a plan. If it works, you\u2019ve got a new edge. If it doesn\u2019t, you learned fast.",
    deliverables: [
      'Working solution targeting your chosen growth lever',
      'Whatever it takes: landing page, tool, automation, system',
      'Launch strategy + early results',
      'Real data to decide what comes next',
    ],
    pullQuote: 'I know what\u2019s holding me back. I just haven\u2019t had time to deal with it.',
  },
  {
    num: '03',
    name: 'The Growth Partnership',
    tagline: 'Your business, grown together.',
    timeline: 'Ongoing \u2014 as long as it makes sense',
    description:
      "It\u2019s working. You just need it to work faster \u2014 and you need someone in your corner to keep pushing. Strategy, building, everything in between. Scope and price: we figure that out together.",
    deliverables: [
      'Deep-dive into your business, market, and opportunities',
      'Ongoing strategy, brainstorming, prioritization',
      'Whatever we build \u2014 systems, automation, tools, campaigns',
      'Direct access \u2014 I answer in hours, not days',
      'Scope and price defined together',
    ],
    pullQuote: 'It\u2019s working. I just need it to work faster \u2014 and I can\u2019t keep doing this alone.',
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const tierHoverTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const ctaHoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    initGSAP();
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const header = section.querySelector('.v9-pricing-header');
      const interstitial = section.querySelector('.v9-pricing-interstitial');
      const rows = section.querySelectorAll('.v9-pricing-tier');

      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: header, start: 'top 85%', once: true },
        }
      );

      gsap.fromTo(
        interstitial,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: interstitial, start: 'top 85%', once: true },
        }
      );

      const rowsArr = Array.from(rows) as HTMLElement[];

      gsap.fromTo(
        rows,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rows[0],
            start: 'top 85%',
            once: true,
          },
          onComplete: () => { gsap.set(rows, { clearProps: 'opacity,transform' }); },
        }
      );

      // Highlight each tier as it crosses the center of the viewport
      ScrollTrigger.create({
        trigger: rows[0],
        start: 'top 80%',
        once: true,
        onEnter: () => {
          section.classList.add('v9-pricing--highlight');
          trackSectionView('pricing');
        },
      });

      rowsArr.forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            rowsArr.forEach((r) => r.classList.remove('v9-pricing-tier--active'));
            row.classList.add('v9-pricing-tier--active');
            trackPricingView(tiers[i].name);
          },
          onEnterBack: () => {
            rowsArr.forEach((r) => r.classList.remove('v9-pricing-tier--active'));
            row.classList.add('v9-pricing-tier--active');
          },
          onLeaveBack: i === 0 ? () => {
            rowsArr.forEach((r) => r.classList.remove('v9-pricing-tier--active'));
          } : undefined,
          onLeave: () => { row.classList.remove('v9-pricing-tier--active'); },
        });
      });
    }, section);

    return () => { ctx.revert(); section.classList.remove('v9-pricing--highlight'); };
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
            <span className="v9-pricing-label">Investment</span>
            <h2 className="v9-pricing-heading">Three ways to work together.</h2>
          </div>

          <div className="v9-pricing-interstitial">
            <div className="v9-pricing-interstitial-statement">
              Share what&apos;s not working.<br />
              We&apos;ll figure out what fits.<br />
              <em>Name your price.</em><br />
              Let&apos;s get to work.<br />
              Nice, right?
            </div>
            <p className="v9-pricing-interstitial-sub">
              Every business is at a different stage — and every budget is different too.
              Tell me where you are and what you&apos;ve got to work with.
              I&apos;ll give you a straight read on what&apos;s possible.
            </p>
          </div>

          <div className="v9-pricing-tiers">
            {tiers.map((tier) => (
              <div
                key={tier.num}
                className="v9-pricing-tier"
                onMouseEnter={() => {
                  tierHoverTimers.current[tier.num] = setTimeout(() => {
                    trackElementHover('pricing_tier', { tier_name: tier.name, tier_num: tier.num });
                  }, 500);
                }}
                onMouseLeave={() => clearTimeout(tierHoverTimers.current[tier.num])}
              >
                <div className="v9-pricing-identity">
                  <div className="v9-pricing-num">{tier.num}</div>
                  <h3 className="v9-pricing-name">{tier.name}</h3>
                  <p className="v9-pricing-tagline">{tier.tagline}</p>
                  <span className="v9-pricing-timeline">{tier.timeline}</span>
                </div>

                <div className="v9-pricing-body">
                  <p className="v9-pricing-desc">{tier.description}</p>
                  <div className="v9-pricing-sublabel">What you get</div>
                  <ul className="v9-pricing-list">
                    {tier.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="v9-pricing-action">
                  <p className="v9-pricing-quote">&ldquo;{tier.pullQuote}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>

          <div className="v9-pricing-bottom">
            <p className="v9-pricing-micro">30 minutes. No pitch. Real talk.</p>
            <a
              href="#contact"
              className="v9-btn v9-btn-gradient"
              onClick={() => trackCTAClick('pricing_bottom', 'pricing')}
              onMouseEnter={() => { ctaHoverTimer.current = setTimeout(() => trackElementHover('cta_pricing_bottom'), 500); }}
              onMouseLeave={() => clearTimeout(ctaHoverTimer.current!)}
            >
              Book Your Free Strategy Call
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

        /* Header */
        .v9-pricing-header {
          margin-bottom: 72px;
        }

        .v9-pricing-label {
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
          margin: 0;
        }

        /* Interstitial */
        .v9-pricing-interstitial {
          padding: 20px 0 36px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          margin-bottom: 0;
        }

        .v9-pricing-interstitial-statement {
          font-family: var(--v9-font-heading);
          font-size: clamp(1.6rem, 2.8vw, 2.2rem);
          font-weight: 400;
          color: #0C1117;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .v9-pricing-interstitial-statement em {
          font-style: italic;
          color: #0B8A6E;
        }

        .v9-pricing-interstitial-sub {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          color: rgba(12, 17, 23, 0.55);
          line-height: 1.7;
          max-width: 380px;
          margin: 0;
        }

        /* Tiers */
        .v9-pricing-tiers {
          border-top: 1px solid rgba(12, 17, 23, 0.1);
          margin-bottom: 80px;
        }

        .v9-pricing-tier {
          display: grid;
          grid-template-columns: minmax(min(200px, 100%), 240px) 1fr minmax(min(200px, 100%), 260px);
          border-bottom: 1px solid rgba(12, 17, 23, 0.07);
          will-change: opacity;
        }

        /* Left: identity */
        .v9-pricing-identity {
          padding: 48px 40px 48px 40px;
          border-right: 1px solid rgba(12, 17, 23, 0.06);
        }

        .v9-pricing-num {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0B8A6E;
          margin-bottom: 12px;
        }

        .v9-pricing-name {
          font-family: var(--v9-font-heading);
          font-size: 1.35rem;
          font-weight: 400;
          color: #0C1117;
          line-height: 1.2;
          margin: 0 0 6px 0;
        }

        .v9-pricing-tagline {
          font-family: var(--v9-font-heading);
          font-style: italic;
          font-size: 0.88rem;
          color: #0B8A6E;
          line-height: 1.4;
          margin: 0 0 16px 0;
        }

        .v9-pricing-timeline {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          color: rgba(12, 17, 23, 0.55);
          font-weight: 500;
          line-height: 1.5;
        }

        /* Mid: body */
        .v9-pricing-body {
          padding: 48px 40px;
          border-right: 1px solid rgba(12, 17, 23, 0.06);
        }

        .v9-pricing-desc {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.88rem;
          color: rgba(12, 17, 23, 0.68);
          line-height: 1.75;
          margin: 0 0 24px 0;
        }

        .v9-pricing-sublabel {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(12, 17, 23, 0.55);
          margin-bottom: 12px;
        }

        .v9-pricing-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .v9-pricing-list li {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.8rem;
          color: rgba(12, 17, 23, 0.7);
          padding-left: 16px;
          position: relative;
          line-height: 1.45;
        }

        .v9-pricing-list li::before {
          content: '\u2192';
          position: absolute;
          left: 0;
          color: #0B8A6E;
          font-weight: 600;
        }

        /* Right: pull quote */
        .v9-pricing-action {
          padding: 48px 40px 48px 40px;
          display: flex;
          align-items: center;
        }

        .v9-pricing-quote {
          font-family: var(--v9-font-heading);
          font-style: italic;
          font-size: clamp(1.1rem, 1.6vw, 1.4rem);
          color: rgba(12, 17, 23, 0.62);
          line-height: 1.5;
          letter-spacing: -0.01em;
          margin: 0;
        }

        /* Bottom CTA */
        .v9-pricing-bottom {
          text-align: center;
          padding-top: 40px;
        }

        .v9-pricing-micro {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(12, 17, 23, 0.55);
          margin: 0 0 20px 0;
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
        }

        .v9-btn-gradient {
          padding: 15px 32px;
          border-radius: 12px;
          color: #ffffff;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          box-shadow: 0 4px 18px rgba(6, 214, 160, 0.28);
        }

        .v9-btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(6, 214, 160, 0.38);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .v9-pricing-tier {
            grid-template-columns: 200px 1fr;
          }

          .v9-pricing-action {
            grid-column: 1 / -1;
            padding: 0 0 40px 0;
            border-right: none;
          }

          .v9-pricing-identity {
            border-right: 1px solid rgba(12, 17, 23, 0.06);
          }

          .v9-pricing-body {
            border-right: none;
          }
        }

        @media (max-width: 768px) {
          .v9-pricing-container {
            padding: 0 24px;
          }

          .v9-pricing-interstitial {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .v9-pricing-tier {
            grid-template-columns: 1fr;
          }

          .v9-pricing-identity {
            padding: 40px 0 24px 16px;
            border-right: none;
            border-bottom: 1px solid rgba(12, 17, 23, 0.06);
          }

          .v9-pricing-body {
            padding: 24px 0 24px 16px;
            border-right: none;
          }

          .v9-pricing-action {
            padding: 0 0 40px 16px;
          }
        }

        @media (max-width: 640px) {
          .v9-pricing {
            padding: 80px 0;
          }
        }

        /* Scroll highlight */
        .v9-pricing--highlight .v9-pricing-tier {
          opacity: 0.65;
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .v9-pricing--highlight .v9-pricing-tier .v9-pricing-name {
          transition: color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .v9-pricing--highlight .v9-pricing-tier--active {
          opacity: 1;
          box-shadow: inset 4px 0 0 #0B8A6E;
          background: rgba(11, 138, 110, 0.03);
        }

        .v9-pricing--highlight .v9-pricing-tier--active .v9-pricing-name {
          color: #0B8A6E;
        }

        @media (prefers-reduced-motion: reduce) {
          .v9-pricing-header,
          .v9-pricing-interstitial,
          .v9-pricing-tier {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .v9-pricing--highlight .v9-pricing-tier .v9-pricing-name {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
