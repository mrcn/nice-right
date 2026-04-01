'use client';

import { useEffect, useRef } from 'react';
import { initGSAP, gsap, ScrollTrigger } from '@/app/_shared/gsap-init';
import { trackSectionView } from '@/app/lib/analytics';

const levers = [
  {
    num: '01',
    title: 'Get More Customers',
    quote: 'I feel invisible online. People who need exactly what I do can\'t find me.',
    bullets: [
      'SEO-optimized website',
      'Google Business + local listings',
      'Lead capture + email sequence',
      'Paid traffic-ready landing pages',
    ],
    tag: 'Acquisition',
    context: 'The fix isn\'t ads — it\'s infrastructure. We make you findable, credible, and worth contacting.',
  },
  {
    num: '02',
    title: 'Charge More',
    quote: 'I keep losing bids to cheaper competitors. I can\'t raise my rates.',
    bullets: [
      'Positioning and messaging overhaul',
      'Social proof systems',
      'Custom client-facing tools',
      'Outcome-based packaging',
    ],
    tag: 'Pricing Power',
    context: 'A 1% price increase = 8% operating profit improvement. Credibility is what lets you charge more.',
  },
  {
    num: '03',
    title: 'Keep Customers',
    quote: 'I spend all my time hunting new clients. My best ones disappear.',
    bullets: [
      'Post-purchase email sequences',
      'Automated rebooking flows',
      'Loyalty and referral systems',
      'CRM setup and automation',
    ],
    tag: 'Retention',
    context: 'Acquiring a customer costs 5–7× more than keeping one. Retention is the most underinvested lever.',
  },
  {
    num: '04',
    title: 'Cut the Waste',
    quote: 'I\'m doing $10/hour tasks when I should be doing $500/hour work.',
    bullets: [
      'Business process audit',
      'Scheduling + intake automation',
      'AI-assisted workflows',
      'Custom internal tools',
    ],
    tag: 'Operations',
    context: 'Every hour in admin is an hour not selling. We automate the repetitive parts — AI where it fits.',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    initGSAP();
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const header = section.querySelector('.v9-services-header');
      const cols = Array.from(section.querySelectorAll<HTMLElement>('.v9-lever-col'));

      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: header, start: 'top 85%', once: true, onEnter: () => trackSectionView('services') },
        }
      );

      gsap.fromTo(
        cols,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: cols[0], start: 'top 85%', once: true },
          onComplete: () => { gsap.set(cols, { clearProps: 'opacity,transform' }); },
        }
      );

      if (window.innerWidth <= 768) {
        // Mobile: cols are stacked — highlight each as it crosses center
        section.classList.add('v9-services--highlight');
        cols.forEach((col) => {
          ScrollTrigger.create({
            trigger: col,
            start: 'top 65%',
            end: 'bottom 35%',
            toggleClass: { targets: col, className: 'v9-lever-col--active' },
          });
        });
      } else {
        // Desktop: pin section and scrub through each col in sequence
        let prevActive = -1;

        const animateBullets = (col: HTMLElement) => {
          const bullets = col.querySelectorAll<HTMLElement>('.v9-lever-bullets li');
          gsap.killTweensOf(bullets);
          gsap.fromTo(bullets,
            { opacity: 0, x: -6 },
            { opacity: 1, x: 0, duration: 0.25, stagger: 0.04, ease: 'power2.out', overwrite: 'auto' }
          );
        };

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
          onEnter: () => {
            section.classList.add('v9-services--highlight');
            cols.forEach((col, i) => col.classList.toggle('v9-lever-col--active', i === 0));
            prevActive = 0;
            animateBullets(cols[0]);
          },
          onLeave: () => {
            section.classList.remove('v9-services--highlight');
            cols.forEach((col) => col.classList.remove('v9-lever-col--active'));
            prevActive = -1;
          },
          onEnterBack: () => {
            section.classList.add('v9-services--highlight');
            prevActive = -1;
          },
          onLeaveBack: () => {
            section.classList.remove('v9-services--highlight');
            cols.forEach((col) => col.classList.remove('v9-lever-col--active'));
            prevActive = -1;
          },
          onUpdate: (self) => {
            const active = Math.min(Math.floor(self.progress * cols.length), cols.length - 1);
            if (active !== prevActive) {
              cols.forEach((col, i) => col.classList.toggle('v9-lever-col--active', i === active));
              animateBullets(cols[active]);
              prevActive = active;
            }
          },
        });
      }
    }, section);

    return () => { ctx.revert(); section.classList.remove('v9-services--highlight'); };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="services"
        aria-label="Services — four ways to grow a business"
        className="v9-services v9-section-warm"
      >
        <div className="v9-services-container">
          <div className="v9-services-header">
            <span className="v9-section-label">How Businesses Grow</span>
            <h2 className="v9-services-heading">
              There are only four ways to grow a business.
            </h2>
            <p className="v9-services-sub">
              More customers. Bigger transactions. More repeat business. Less
              overhead. Every dollar of growth comes from one of these levers —
              and most businesses are stuck on one or two. Where are you stuck?
            </p>
          </div>

          <div className="v9-levers">
            {levers.map((lever) => (
              <div key={lever.num} className="v9-lever-col">
                <div className="v9-lever-num">{lever.num}</div>
                <h3 className="v9-lever-title">{lever.title}</h3>
                <p className="v9-lever-quote">&ldquo;{lever.quote}&rdquo;</p>
                <ul className="v9-lever-bullets">
                  {lever.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="v9-lever-info">
                  <span className="v9-lever-tag">{lever.tag}</span>
                  <p>{lever.context}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .v9-services {
          padding: 120px 0;
        }

        .v9-section-warm {
          background: #F8F7F4;
        }

        .v9-services-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .v9-services-header {
          margin-bottom: 72px;
          max-width: 640px;
        }

        .v9-section-label {
          display: block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0B8A6E;
          margin-bottom: 14px;
        }

        .v9-services-heading {
          font-family: var(--v9-font-heading);
          font-size: clamp(1.9rem, 3vw, 2.7rem);
          font-weight: 400;
          color: #0C1117;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 14px 0;
        }

        .v9-services-sub {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          color: rgba(12, 17, 23, 0.55);
          line-height: 1.65;
          margin: 0;
        }

        .v9-levers {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(12, 17, 23, 0.1);
        }

        .v9-lever-col {
          padding: 40px 28px 40px 28px;
          border-right: 1px solid rgba(12, 17, 23, 0.08);
          display: flex;
          flex-direction: column;
          will-change: opacity;
        }

        .v9-lever-col:last-child {
          border-right: none;
          padding-right: 0;
        }

        .v9-lever-num {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #0B8A6E;
          margin-bottom: 12px;
        }

        .v9-lever-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 400;
          color: #0C1117;
          line-height: 1.25;
          margin: 0 0 12px 0;
        }

        .v9-lever-quote {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: 0.85rem;
          color: rgba(12, 17, 23, 0.60);
          line-height: 1.6;
          margin: 0 0 22px 0;
          padding-bottom: 22px;
          border-bottom: 1px solid rgba(12, 17, 23, 0.07);
        }

        .v9-lever-bullets {
          list-style: none;
          padding: 0;
          margin: 0 0 28px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .v9-lever-bullets li {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.8rem;
          color: rgba(12, 17, 23, 0.75);
          padding-left: 16px;
          position: relative;
          line-height: 1.4;
        }

        .v9-lever-bullets li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #0B8A6E;
          font-weight: 600;
        }

        .v9-lever-info {
          margin-top: 24px;
          background: #ffffff;
          border-radius: 10px;
          padding: 14px 16px;
          border: 1px solid rgba(12, 17, 23, 0.07);
        }

        .v9-lever-tag {
          display: inline-block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0B8A6E;
          background: rgba(11, 138, 110, 0.07);
          border: 1px solid rgba(11, 138, 110, 0.15);
          border-radius: 20px;
          padding: 3px 10px;
          margin-bottom: 8px;
        }

        .v9-lever-info p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.76rem;
          color: rgba(12, 17, 23, 0.55);
          line-height: 1.65;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .v9-levers {
            grid-template-columns: 1fr 1fr;
          }

          .v9-lever-col:nth-child(2) {
            border-right: none;
            padding-right: 0;
          }

          .v9-lever-col:nth-child(3) {
            border-right: 1px solid rgba(12, 17, 23, 0.08);
            padding-left: 28px;
            padding-top: 40px;
            border-top: 1px solid rgba(12, 17, 23, 0.08);
          }

          .v9-lever-col:nth-child(4) {
            border-right: none;
            padding-right: 0;
            padding-top: 40px;
            border-top: 1px solid rgba(12, 17, 23, 0.08);
          }
        }

        @media (max-width: 640px) {
          .v9-services {
            padding: 80px 0;
          }

          .v9-services-container {
            padding: 0 24px;
          }

          .v9-levers {
            grid-template-columns: 1fr;
          }

          .v9-lever-col {
            padding: 32px 0 32px 16px !important;
            border-right: none !important;
            border-top: 1px solid rgba(12, 17, 23, 0.08);
          }

          .v9-lever-col:first-child {
            border-top: none;
            padding-top: 0 !important;
          }
        }

        /* Scroll highlight */
        .v9-services--highlight .v9-lever-col {
          opacity: 0.65;
          transition: opacity 0.35s linear, box-shadow 0.35s linear;
        }

        .v9-services--highlight .v9-lever-col .v9-lever-title {
          transition: color 0.35s linear;
        }

        .v9-services--highlight .v9-lever-col--active {
          opacity: 1;
          box-shadow: inset 3px 0 0 #0B8A6E;
        }

        .v9-services--highlight .v9-lever-col--active .v9-lever-title {
          color: #0B8A6E;
        }

        @media (prefers-reduced-motion: reduce) {
          .v9-services-header,
          .v9-lever-col,
          .v9-lever-col .v9-lever-title {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
