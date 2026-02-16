'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const faqs = [
  {
    question: 'What if I\u2019m not sure what I need?',
    answer:
      'That\u2019s the most common starting point \u2014 and exactly what the free call is for. I\u2019ll look at where your business is today and tell you plainly what would move the needle. Sometimes it\u2019s a new site. Sometimes it\u2019s three changes to the one you have.',
  },
  {
    question: 'How long until I see results?',
    answer:
      'Most projects go live within 4\u20138 weeks. Quick wins like SEO fixes or conversion tweaks often show results within days. Bigger outcomes build over your first 2\u20133 months.',
  },
  {
    question: 'Do I own everything you build?',
    answer:
      'Yes. Your domain, your code, your content. Always. No retainers, no lock-in contracts. Payment plans available, designed around your cash flow.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Most projects range from $3,000 to $15,000 depending on scope. I\u2019ll give you an exact quote on our call \u2014 no surprises. Payment plans available for every budget.',
  },
]

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const answersRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = useCallback(
    (index: number) => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (openIndex === index) {
        // Close current
        const answerEl = answersRef.current[index]
        if (answerEl) {
          if (prefersReduced) {
            answerEl.style.maxHeight = '0px'
            answerEl.style.opacity = '0'
          } else {
            gsap.to(answerEl, {
              maxHeight: 0,
              opacity: 0,
              duration: 0.35,
              ease: 'power2.inOut',
            })
          }
        }
        setOpenIndex(null)
      } else {
        // Close previously open
        if (openIndex !== null) {
          const prevEl = answersRef.current[openIndex]
          if (prevEl) {
            if (prefersReduced) {
              prevEl.style.maxHeight = '0px'
              prevEl.style.opacity = '0'
            } else {
              gsap.to(prevEl, {
                maxHeight: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.inOut',
              })
            }
          }
        }

        // Open new
        const answerEl = answersRef.current[index]
        if (answerEl) {
          if (prefersReduced) {
            answerEl.style.maxHeight = '400px'
            answerEl.style.opacity = '1'
          } else {
            gsap.to(answerEl, {
              maxHeight: 400,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
            })
          }
        }
        setOpenIndex(index)
      }
    },
    [openIndex]
  )

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      }

      // FAQ items stagger
      const validItems = itemsRef.current.filter(Boolean)
      if (validItems.length) {
        gsap.from(validItems, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: validItems[0],
            start: 'top 85%',
            once: true,
          },
        })
      }

      // CTA reveal
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            once: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="faq" className="v7-faq" ref={sectionRef}>
      <div className="v7-faq-container">
        <div className="v7-faq-header" ref={headerRef}>
          <span className="v7-label">questions</span>
          <h2 className="v7-faq-heading">before you book</h2>
        </div>

        <div className="v7-faq-list">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className={`v7-faq-item ${openIndex === i ? 'v7-faq-item--open' : ''}`}
              ref={(el) => { itemsRef.current[i] = el }}
            >
              <button
                className="v7-faq-question"
                onClick={() => toggleItem(i)}
                aria-expanded={openIndex === i}
                aria-controls={`v7-faq-answer-${i}`}
              >
                <span className="v7-faq-question-text">{faq.question}</span>
                <span className="v7-faq-toggle" aria-hidden="true">
                  {openIndex === i ? '\u2212' : '+'}
                </span>
              </button>
              <div
                id={`v7-faq-answer-${i}`}
                className="v7-faq-answer"
                ref={(el) => { answersRef.current[i] = el }}
                role="region"
              >
                <p className="v7-faq-answer-text">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="v7-faq-cta" ref={ctaRef}>
          <a href="#contact" className="v7-btn">
            book a free call
          </a>
          <p className="v7-faq-cta-micro">30 minutes, no commitment</p>
        </div>
      </div>

      <style>{`
        .v7-faq {
          padding: 140px 24px;
          background: #0A0A0A;
        }

        .v7-faq-container {
          max-width: 960px;
          margin: 0 auto;
        }

        .v7-faq-header {
          margin-bottom: 72px;
        }

        .v7-faq-heading {
          font-family: var(--font-instrument-serif);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 400;
          color: #F5F5F0;
          text-transform: lowercase;
          line-height: 1.1;
          margin: 0;
        }

        .v7-faq-list {
          display: flex;
          flex-direction: column;
        }

        .v7-faq-item {
          border-bottom: 1px solid rgba(245, 245, 240, 0.08);
        }

        .v7-faq-item:first-child {
          border-top: 1px solid rgba(245, 245, 240, 0.08);
        }

        .v7-faq-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 28px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 24px;
        }

        .v7-faq-question-text {
          font-family: var(--font-inter);
          font-size: 1.1rem;
          font-weight: 600;
          color: #F5F5F0;
          line-height: 1.4;
          transition: color 0.2s ease;
        }

        .v7-faq-item--open .v7-faq-question-text,
        .v7-faq-question:hover .v7-faq-question-text {
          color: #FF4D00;
        }

        .v7-faq-toggle {
          font-family: var(--font-inter);
          font-size: 1.5rem;
          font-weight: 300;
          color: rgba(245, 245, 240, 0.4);
          flex-shrink: 0;
          width: 28px;
          text-align: center;
          transition: color 0.2s ease;
          line-height: 1;
        }

        .v7-faq-item--open .v7-faq-toggle {
          color: #FF4D00;
        }

        .v7-faq-answer {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
        }

        .v7-faq-answer-text {
          font-family: var(--font-inter);
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.7;
          color: rgba(245, 245, 240, 0.55);
          margin: 0;
          padding: 0 0 28px 0;
          max-width: 720px;
        }

        .v7-faq-cta {
          margin-top: 72px;
          text-align: center;
        }

        .v7-btn {
          display: inline-block;
          font-family: var(--font-inter);
          font-size: 0.95rem;
          font-weight: 500;
          color: #0A0A0A;
          background: #FF4D00;
          padding: 16px 40px;
          border-radius: 2px;
          text-decoration: none;
          text-transform: lowercase;
          letter-spacing: 0.02em;
          transition: background 0.25s ease, transform 0.2s ease;
        }

        .v7-btn:hover {
          background: #E64400;
          transform: translateY(-1px);
        }

        .v7-faq-cta-micro {
          font-family: var(--font-jetbrains-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(245, 245, 240, 0.35);
          margin: 16px 0 0 0;
        }

        @media (max-width: 768px) {
          .v7-faq {
            padding: 100px 20px;
          }
          .v7-faq-question {
            padding: 24px 0;
          }
        }
      `}</style>
    </section>
  )
}
