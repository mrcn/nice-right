'use client';

import { useEffect, useRef, useState } from 'react';
import { initGSAP, gsap, ScrollTrigger } from '@/app/_shared/gsap-init';
import { trackCTAClick, trackFAQOpen } from '@/app/lib/analytics';
import { buildFAQSchema } from '@/app/_shared/schema';

const faqs = [
  {
    q: 'What if I\u2019m not sure what I need?',
    a: 'That\u2019s the most common starting point, and exactly what the free call is for. I\u2019ll look at where your business is today and tell you plainly what would move the needle. Sometimes it\u2019s a new site. Sometimes it\u2019s three changes to the one you have.',
  },
  {
    q: 'My last website didn\u2019t get customers. Why would this be different?',
    a: 'Most websites fail because they\u2019re built to look good, not to convert. If your old site had no clear next step for visitors, no reason to trust you over a competitor, and no way to show up on Google, it was a brochure, not a sales tool. That\u2019s what I fix. If that\u2019s what happened before, I\u2019ll tell you exactly where it broke down and how we\u2019d do it differently.',
  },
  {
    q: 'How long until I see results?',
    a: 'Most projects go live within 4 to 8 weeks. Quick wins like SEO fixes or conversion tweaks often show results within days. Bigger outcomes, like consistent inquiries and better local search rankings, build over your first 2 to 3 months.',
  },
  {
    q: 'Do I own everything you build?',
    a: 'Yes. Your domain, your code, your content. Always. No retainers, no lock-in contracts. Payment plans available, designed around your cash flow.',
  },
  {
    q: 'Why does a website cost $2,000 somewhere and $15,000 somewhere else?',
    a: 'The $2k option is a template with your logo swapped in. It looks like a website but won\u2019t rank on Google or convert strangers into customers. My projects range from $3,000 to $15,000 depending on scope. The difference is strategy, custom build, and whether it\u2019s designed to actually grow your revenue. You\u2019ll get an exact quote on the call. No surprises.',
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const answer = answerRef.current;
    const inner = innerRef.current;
    if (!answer || !inner) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      answer.style.maxHeight = open ? `${inner.scrollHeight}px` : '0px';
      answer.style.opacity = open ? '1' : '0';
      return;
    }

    if (open) {
      gsap.to(answer, {
        maxHeight: inner.scrollHeight + 20,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      gsap.to(answer, {
        maxHeight: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }
  }, [open]);

  return (
    <div className={`v9-faq-item ${open ? 'v9-faq-item--open' : ''}`}>
      <button
        className="v9-faq-trigger"
        onClick={() => { if (!open) trackFAQOpen(q, index); setOpen(!open); }}
        aria-expanded={open}
        aria-controls={`v9-faq-answer-${index}`}
      >
        <span className="v9-faq-q">{q}</span>
        <svg
          className="v9-faq-chevron"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        id={`v9-faq-answer-${index}`}
        ref={answerRef}
        className="v9-faq-answer-wrap"
        role="region"
        style={{ maxHeight: 0, opacity: 0, overflow: 'hidden' }}
      >
        <div ref={innerRef} className="v9-faq-answer">
          {a}
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    initGSAP();
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const header = section.querySelector('.v9-faq-header');
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top bottom-=80',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const items = section.querySelectorAll('.v9-faq-item');
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=40',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      const cta = section.querySelector('.v9-faq-cta');
      if (cta) {
        gsap.fromTo(
          cta,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cta,
              start: 'top bottom-=40',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const faqSchema = buildFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section ref={sectionRef} id="faq" className="v9-faq v9-section-warm">
        <div className="v9-faq-container">
          <div className="v9-faq-header">
            <p className="v9-section-label">Questions</p>
            <h2 className="v9-faq-heading">Before you book</h2>
          </div>

          <div className="v9-faq-list">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>

          <div className="v9-faq-cta">
            <a href="#contact" className="v9-btn v9-btn-gradient" onClick={() => trackCTAClick('faq', 'faq')}>
              Book Your Strategy Call
            </a>
            <p className="v9-faq-cta-micro">30 minutes, no commitment</p>
          </div>
        </div>
      </section>

      <style>{`
        .v9-faq {
          padding: 120px 0;
        }

        .v9-faq-container {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .v9-section-label {
          display: block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0B8A6E;
          margin: 0 0 14px;
        }

        .v9-faq-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .v9-faq-heading {
          font-family: 'Inter', -apple-system, sans-serif;
          font-weight: 700;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: #0C1117;
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .v9-faq-list {
          display: flex;
          flex-direction: column;
        }

        .v9-faq-item {
          border-bottom: 1px solid rgba(12, 17, 23, 0.08);
        }

        .v9-faq-item:last-child {
          border-bottom: none;
        }

        .v9-faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 24px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          -webkit-tap-highlight-color: transparent;
        }

        .v9-faq-trigger:hover .v9-faq-q {
          color: #0B8A6E;
        }

        .v9-faq-q {
          font-family: 'Inter', -apple-system, sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          color: #0C1117;
          line-height: 1.4;
          transition: color 0.2s ease;
        }

        .v9-faq-chevron {
          flex-shrink: 0;
          color: rgba(12, 17, 23, 0.7);
          transition: transform 0.35s cubic-bezier(0.33, 1, 0.68, 1),
                      color 0.2s ease;
        }

        .v9-faq-item--open .v9-faq-chevron {
          transform: rotate(180deg);
          color: #0B8A6E;
        }

        .v9-faq-answer-wrap {
          will-change: max-height, opacity;
        }

        .v9-faq-answer {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 17px;
          font-weight: 400;
          line-height: 1.7;
          color: rgba(12, 17, 23, 0.6);
          padding-bottom: 24px;
        }

        .v9-faq-cta {
          text-align: center;
          margin-top: 56px;
        }

        .v9-faq-cta-micro {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: rgba(12, 17, 23, 0.7);
          margin: 14px 0 0 0;
        }

        .v9-faq-cta-urgency {
          margin-bottom: 16px;
        }

        .v9-urgency-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #0B8A6E;
          background: rgba(11, 138, 110, 0.1);
          padding: 6px 12px;
          border-radius: 20px;
        }

        .v9-urgency-badge::before {
          content: '';
          width: 8px;
          height: 8px;
          background: #0B8A6E;
          border-radius: 50%;
          animation: v9-pulse 2s ease-in-out infinite;
        }

        @keyframes v9-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .v9-faq {
            padding: 80px 0;
          }

          .v9-faq-header {
            margin-bottom: 36px;
          }

          .v9-faq-q {
            font-size: 1rem;
          }

          .v9-faq-answer {
            font-size: 16px;
          }

          .v9-faq-trigger {
            padding: 20px 0;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .v9-faq-item,
          .v9-faq-header,
          .v9-faq-cta {
            opacity: 1 !important;
            transform: none !important;
          }

          .v9-faq-chevron {
            transition: transform 0s;
          }
        }
      `}</style>
    </>
  );
}
