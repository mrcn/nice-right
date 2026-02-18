'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What if I'm not sure what I need?",
    answer:
      "That's the most common starting point — and exactly what the free call is for. I'll look at where your business is today and tell you plainly what would move the needle. Sometimes it's a new site. Sometimes it's three changes to the one you have.",
  },
  {
    question: 'How long until I see results?',
    answer:
      'Most projects go live within 4–8 weeks. Quick wins like SEO fixes or conversion tweaks often show results within days. Bigger outcomes build over your first 2–3 months.',
  },
  {
    question: 'Do I own everything you build?',
    answer:
      'Yes. Your domain, your code, your content. Always. No retainers, no lock-in contracts. Payment plans available, designed around your cash flow.',
  },
  {
    question: 'What does it cost?',
    answer:
      "Most projects range from $3,000 to $15,000 depending on scope. I'll give you an exact quote on our call — no surprises. Payment plans available for every budget.",
  },
  {
    question: "What if I don't like the design?",
    answer:
      "We iterate together. You'll see progress early and often. No big reveals — continuous feedback means no surprises. Most clients love the first direction, but we'll refine until it's right.",
  },
  {
    question: 'Do you offer ongoing support?',
    answer:
      "Yes, but only when you need it. No monthly retainers. I'll train you or your team to manage the site, and I'm available for updates, improvements, or new features as your business grows.",
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <style>{`
        .v81-faq {
          background: #F5F5F0;
          padding: 140px 0;
          border-top: 3px solid #0A0A0A;
        }

        .v81-faq-inner {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .v81-faq-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #0000FF;
          margin: 0 0 16px;
        }

        .v81-faq-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 6vw, 5rem);
          text-transform: uppercase;
          color: #0A0A0A;
          letter-spacing: -0.02em;
          line-height: 0.9;
          margin: 0 0 64px;
        }

        .v81-faq-list {
          border: 3px solid #0A0A0A;
        }

        .v81-faq-item {
          border-bottom: 3px solid #0A0A0A;
          transition: background 0.2s ease;
        }

        .v81-faq-item:last-child {
          border-bottom: none;
        }

        .v81-faq-item:hover {
          background: rgba(0, 0, 255, 0.02);
        }

        .v81-faq-question {
          width: 100%;
          background: none;
          border: none;
          padding: 32px 40px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          text-transform: uppercase;
          line-height: 1.4;
          color: #0A0A0A;
          transition: all 0.2s ease;
        }

        .v81-faq-item.active .v81-faq-question {
          color: #0000FF;
        }

        .v81-faq-icon {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.5rem;
          font-weight: 400;
          color: #FF0000;
          margin-left: 16px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .v81-faq-item.active .v81-faq-icon {
          transform: rotate(45deg);
        }

        .v81-faq-answer {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .v81-faq-item.active .v81-faq-answer {
          grid-template-rows: 1fr;
        }

        .v81-faq-answer-inner {
          overflow: hidden;
          padding: 0 40px 0;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.3s ease, transform 0.3s ease, padding 0.4s ease;
        }

        .v81-faq-item.active .v81-faq-answer-inner {
          padding: 0 40px 32px;
          opacity: 1;
          transform: translateY(0);
        }

        .v81-faq-answer p {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #0A0A0A;
          margin: 0;
          opacity: 0.85;
        }

        .v81-faq-cta {
          margin-top: 64px;
          text-align: center;
        }

        .v81-faq-cta a {
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .v81-faq-cta a::before {
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

        .v81-faq-cta a:hover {
          transform: translateY(-3px);
          box-shadow: 8px 8px 0px rgba(10, 10, 10, 0.15);
        }

        .v81-faq-cta a:hover::before {
          left: 0;
        }

        .v81-faq-cta a span {
          position: relative;
          z-index: 1;
        }

        .v81-faq-cta-micro {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #0A0A0A;
          opacity: 0.6;
          margin-top: 16px;
        }

        .v81-reveal {
          opacity: 0;
        }

        @media (max-width: 900px) {
          .v81-faq {
            padding: 100px 0;
          }

          .v81-faq-inner {
            padding: 0 20px;
          }

          .v81-faq-question {
            padding: 24px;
            font-size: 1rem;
          }

          .v81-faq-answer-inner {
            padding: 0 24px 24px;
          }

          .v81-faq-cta a {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <section ref={sectionRef} id="faq" className="v81-faq">
        <div className="v81-faq-inner">
          <p className="v81-faq-label v81-reveal">FAQ</p>
          <h2 className="v81-faq-heading v81-reveal">Before You Book</h2>

          <div className="v81-faq-list v81-reveal">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className={`v81-faq-item ${openIndex === index ? 'active' : ''}`}
              >
                <button
                  className="v81-faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                >
                  {faq.question}
                  <span className="v81-faq-icon">+</span>
                </button>
                <div className="v81-faq-answer">
                  <div className="v81-faq-answer-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="v81-faq-cta v81-reveal">
            <a href="#contact">
              <span>Still Have Questions? Let&apos;s Talk</span>
            </a>
            <p className="v81-faq-cta-micro">30 minutes, no commitment</p>
          </div>
        </div>
      </section>
    </>
  );
}
