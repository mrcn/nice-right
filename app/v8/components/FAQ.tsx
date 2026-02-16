'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: 'WHAT IF I\'M NOT SURE WHAT I NEED?',
    answer:
      "That's the most common starting point \u2014 and exactly what the free call is for. I'll look at where your business is today and tell you plainly what would move the needle. Sometimes it's a new site. Sometimes it's three changes to the one you have.",
    color: '#0000FF',
  },
  {
    question: 'HOW LONG UNTIL I SEE RESULTS?',
    answer:
      'Most projects go live within 4\u20138 weeks. Quick wins like SEO fixes or conversion tweaks often show results within days. Bigger outcomes build over your first 2\u20133 months.',
    color: '#FF0000',
  },
  {
    question: 'DO I OWN EVERYTHING YOU BUILD?',
    answer:
      'Yes. Your domain, your code, your content. Always. No retainers, no lock-in contracts. Payment plans available, designed around your cash flow.',
    color: '#0000FF',
  },
  {
    question: 'WHAT DOES IT COST?',
    answer:
      "Most projects range from $3,000 to $15,000 depending on scope. I'll give you an exact quote on our call \u2014 no surprises. Payment plans available for every budget.",
    color: '#FF0000',
  },
]

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.querySelectorAll('.v8-hidden').forEach((node) => {
        ;(node as HTMLElement).style.opacity = '1'
      })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set('.v8-hidden', { opacity: 0 })

      const popEls = el.querySelectorAll('.v8-pop')
      popEls.forEach((node, i) => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.set(node, { opacity: 1, delay: 0.01 * i })
          },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        .v8-faq {
          background: #F5F5F0;
          padding: 120px 0;
          border-top: 3px solid #0A0A0A;
        }

        .v8-faq-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .v8-faq-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #0000FF;
          margin: 0 0 24px;
        }

        .v8-faq-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 6vw, 5rem);
          text-transform: uppercase;
          color: #0A0A0A;
          letter-spacing: -0.02em;
          line-height: 0.9;
          margin: 0 0 80px;
        }

        .v8-faq-list {
          max-width: 900px;
        }

        .v8-faq-item {
          padding: 40px 0;
          border-bottom: 3px solid #0A0A0A;
        }

        .v8-faq-item:first-child {
          border-top: 3px solid #0A0A0A;
        }

        .v8-faq-q {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(1rem, 2vw, 1.2rem);
          text-transform: uppercase;
          line-height: 1.3;
          margin: 0 0 16px;
        }

        .v8-faq-a {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.7;
          color: #0A0A0A;
          margin: 0;
        }

        .v8-faq-cta {
          margin-top: 64px;
        }

        .v8-faq-cta a {
          display: inline-block;
          background: #0000FF;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 20px 48px;
          border: 3px solid #0A0A0A;
          border-radius: 0;
          text-decoration: none;
        }

        .v8-faq-cta a:hover {
          background: #0A0A0A;
          color: #F5F5F0;
        }

        .v8-faq-cta-micro {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #0A0A0A;
          opacity: 0.6;
          margin-top: 16px;
        }

        @media (max-width: 900px) {
          .v8-faq {
            padding: 80px 0;
          }

          .v8-faq-inner {
            padding: 0 20px;
          }

          .v8-faq-item {
            padding: 32px 0;
          }
        }

        @media (max-width: 600px) {
          .v8-faq-heading {
            font-size: clamp(2rem, 10vw, 3rem);
            margin-bottom: 48px;
          }

          .v8-faq-cta a {
            width: 100%;
            text-align: center;
            padding: 16px 32px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <section ref={sectionRef} id="faq" className="v8-faq">
        <div className="v8-faq-inner">
          <p className="v8-faq-label v8-hidden v8-pop">FAQ</p>
          <h2 className="v8-faq-heading v8-hidden v8-pop">BEFORE YOU BOOK</h2>

          <div className="v8-faq-list">
            {faqs.map((faq) => (
              <div key={faq.question} className="v8-faq-item v8-hidden v8-pop">
                <p className="v8-faq-q" style={{ color: faq.color }}>{faq.question}</p>
                <p className="v8-faq-a">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="v8-faq-cta v8-hidden v8-pop">
            <a href="#contact">BOOK A FREE CALL</a>
            <p className="v8-faq-cta-micro">30 MINUTES, NO COMMITMENT</p>
          </div>
        </div>
      </section>
    </>
  )
}
