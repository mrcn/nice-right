'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const faqs = [
  {
    question: 'What if I\'m not sure what I need?',
    answer:
      'That\'s the most common starting point \u2014 and exactly what the free call is for. I\'ll look at where your business is today and tell you plainly what would move the needle. Sometimes it\'s a new site. Sometimes it\'s three changes to the one you have.',
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
      'Most projects range from $3,000 to $15,000 depending on scope. I\'ll give you an exact quote on our call \u2014 no surprises. Payment plans available for every budget.',
  },
]

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        el.querySelector('.v10-faq-header'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.querySelector('.v10-faq-header'),
            start: 'top 85%',
            once: true,
          },
        }
      )

      // FAQ items stagger
      const items = el.querySelectorAll('.v10-faq-item')
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              once: true,
            },
            delay: i * 0.1,
          }
        )
      })

      // CTA button reveal
      gsap.fromTo(
        el.querySelector('.v10-faq-cta'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.querySelector('.v10-faq-cta'),
            start: 'top 90%',
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  // Animate answer open/close with GSAP
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    answerRefs.current.forEach((ref, i) => {
      if (!ref) return
      if (i === openIndex) {
        gsap.fromTo(
          ref,
          { maxHeight: 0, opacity: 0 },
          { maxHeight: 400, opacity: 1, duration: 0.5, ease: 'power3.out' }
        )
      } else {
        gsap.to(ref, { maxHeight: 0, opacity: 0, duration: 0.35, ease: 'power2.inOut' })
      }
    })
  }, [openIndex])

  return (
    <>
      <style>{`
        .v10-faq-section {
          background: #120820;
          padding: 140px 24px;
          position: relative;
          overflow: hidden;
        }

        .v10-faq-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(90%, 800px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #00FFFF4d 50%, transparent);
          box-shadow: 0 0 20px #00FFFF33;
        }

        /* Grid noise */
        .v10-faq-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(#BF00FF06 1px, transparent 1px),
            linear-gradient(90deg, #BF00FF06 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .v10-faq-inner {
          max-width: 720px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .v10-faq-header {
          margin-bottom: 64px;
          opacity: 0;
        }

        .v10-faq-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 500;
          color: #39FF14;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 16px;
          display: block;
          text-shadow: 0 0 10px #39FF1444;
        }

        .v10-faq-heading {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          color: #E0D0FF;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin: 0;
          text-shadow: 0 0 30px #FF00FF33;
        }

        .v10-faq-list {
          display: flex;
          flex-direction: column;
        }

        .v10-faq-item {
          border-bottom: 1px solid #2A1F3D;
          opacity: 0;
          position: relative;
          transition: border-color 0.3s ease;
        }

        .v10-faq-item:first-child {
          border-top: 1px solid #2A1F3D;
        }

        .v10-faq-item:hover {
          border-color: #00FFFF33;
        }

        /* Neon glow line on active */
        .v10-faq-item--active {
          border-color: #00FFFF44 !important;
        }

        .v10-faq-item--active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00FFFF66, transparent);
          box-shadow: 0 0 10px #00FFFF44;
        }

        .v10-faq-question {
          width: 100%;
          background: none;
          border: none;
          padding: 28px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          text-align: left;
          gap: 16px;
          transition: color 0.25s ease, text-shadow 0.25s ease;
        }

        .v10-faq-q-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.95rem;
          font-weight: 700;
          color: #E0D0FF;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          transition: color 0.25s ease, text-shadow 0.25s ease;
        }

        .v10-faq-q-prefix {
          color: #00FFFF;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          margin-right: 8px;
          text-shadow: 0 0 8px #00FFFF44;
          flex-shrink: 0;
        }

        .v10-faq-question:hover .v10-faq-q-text,
        .v10-faq-item--active .v10-faq-q-text {
          color: #00FFFF;
          text-shadow: 0 0 20px #00FFFF44, 0 0 40px #00FFFF22;
        }

        .v10-faq-chevron {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border: 1px solid #3D2E5A;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .v10-faq-chevron svg {
          width: 14px;
          height: 14px;
          stroke: #00FFFF;
          stroke-width: 2;
          fill: none;
          filter: drop-shadow(0 0 4px #00FFFF44);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .v10-faq-item--active .v10-faq-chevron {
          border-color: #00FFFF;
          box-shadow: 0 0 20px #00FFFF44, 0 0 40px #00FFFF22;
        }

        .v10-faq-item--active .v10-faq-chevron svg {
          transform: rotate(180deg);
        }

        .v10-faq-answer {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
        }

        .v10-faq-answer-content {
          padding: 0 0 28px 24px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #E0D0FFaa;
          border-left: 2px solid #2A1F3D;
          margin-left: 4px;
          padding-left: 20px;
        }

        /* Blinking cursor at end of answer */
        .v10-faq-answer-content::after {
          content: '_';
          font-family: 'JetBrains Mono', monospace;
          color: #39FF14;
          animation: v10-faq-blink 1s steps(1) infinite;
        }

        @keyframes v10-faq-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .v10-faq-cta {
          text-align: center;
          margin-top: 64px;
          opacity: 0;
        }

        .v10-faq-cta-btn {
          display: inline-block;
          padding: 16px 40px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #0A0010;
          background: #FF00FF;
          text-decoration: none;
          border: 2px solid #FF00FF;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px #FF00FF44, inset 0 0 20px #FF00FF22;
          position: relative;
          overflow: hidden;
        }

        .v10-faq-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: transparent;
          transition: background 0.3s ease;
          z-index: -1;
        }

        .v10-faq-cta-btn:hover {
          background: transparent;
          color: #FF00FF;
          box-shadow: 0 0 30px #FF00FF88, 0 0 60px #FF00FF44, inset 0 0 20px #FF00FF22;
        }

        @media (max-width: 1024px) {
          .v10-faq-section {
            padding: 100px 24px;
          }
        }

        @media (max-width: 768px) {
          .v10-faq-section {
            padding: 80px 20px;
          }

          .v10-faq-header {
            margin-bottom: 48px;
          }
        }

        @media (max-width: 480px) {
          .v10-faq-section {
            padding: 64px 16px;
          }

          .v10-faq-q-text {
            font-size: 0.85rem;
          }

          .v10-faq-answer-content {
            font-size: 0.9rem;
            padding-left: 16px;
          }

          .v10-faq-cta-btn {
            width: 100%;
            text-align: center;
            padding: 14px 28px;
            font-size: 0.8rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .v10-faq-item {
            opacity: 1 !important;
          }

          .v10-faq-header {
            opacity: 1 !important;
          }

          .v10-faq-cta {
            opacity: 1 !important;
          }

          .v10-faq-answer-content::after {
            animation: none;
            opacity: 1;
          }

          .v10-faq-chevron svg {
            transition: none;
          }
        }
      `}</style>

      <section ref={sectionRef} id="faq" className="v10-faq-section">
        <div className="v10-faq-inner">
          <div className="v10-faq-header">
            <span className="v10-faq-label">// FAQ</span>
            <h2 className="v10-faq-heading">BEFORE YOU BOOK</h2>
          </div>

          <div className="v10-faq-list" role="list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`v10-faq-item${openIndex === index ? ' v10-faq-item--active' : ''}`}
                role="listitem"
              >
                <button
                  className="v10-faq-question"
                  onClick={() => toggle(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`v10-faq-answer-${index}`}
                >
                  <span className="v10-faq-q-text">
                    <span className="v10-faq-q-prefix" aria-hidden="true">&gt; </span>
                    {faq.question}
                  </span>
                  <span className="v10-faq-chevron" aria-hidden="true">
                    <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="2,5 7,10 12,5" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`v10-faq-answer-${index}`}
                  className="v10-faq-answer"
                  ref={(el) => { answerRefs.current[index] = el }}
                  role="region"
                  aria-hidden={openIndex !== index}
                >
                  <div className="v10-faq-answer-content">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="v10-faq-cta">
            <a href="#contact" className="v10-faq-cta-btn">
              BOOK A FREE CALL
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
