'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'YOU SHARE',
    body: 'Free 30-minute call. Tell me about your business and where you feel stuck. I\u2019ll give you an honest take \u2014 even if the answer is \u201cyou already have what you need.\u201d',
  },
  {
    num: '02',
    title: 'I BUILD',
    body: 'Website, SEO, Google Business, landing pages \u2014 whatever moves the needle. Your feedback shapes every step. No surprises, no scope creep.',
  },
  {
    num: '03',
    title: 'YOU GROW',
    body: 'Your phone rings more. Your calendar fills up. And I stick around to help you keep improving.',
  },
]

export function HowItWorks() {
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

      const revealEls = el.querySelectorAll('.v8-how-reveal')
      revealEls.forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.set(node, { opacity: 1 })
          },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        .v8-how {
          background: #F5F5F0;
          padding: 120px 0;
          border-top: 3px solid #0A0A0A;
        }

        .v8-how-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .v8-how-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #0A0A0A;
          margin: 0 0 16px;
        }

        .v8-how-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 8vw, 7rem);
          line-height: 0.9;
          color: #0A0A0A;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          margin: 0 0 80px;
        }

        .v8-how-grid {
          display: grid;
          grid-template-columns: 40% 30% 30%;
          gap: 0;
        }

        .v8-step {
          border-left: 3px solid #0A0A0A;
          padding: 40px 32px;
        }

        .v8-step:first-child {
          border-left: none;
        }

        .v8-step-num {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(4rem, 6vw, 8rem);
          line-height: 1;
          color: #0000FF;
          margin: 0 0 24px;
        }

        .v8-step-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(1.2rem, 2vw, 1.8rem);
          text-transform: uppercase;
          color: #0A0A0A;
          letter-spacing: -0.01em;
          margin: 0 0 16px;
        }

        .v8-step-body {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.65;
          color: #0A0A0A;
          margin: 0;
        }

        .v8-how-cta-wrap {
          margin-top: 80px;
          border-top: 3px solid #0A0A0A;
          padding-top: 40px;
        }

        .v8-how-cta {
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
          cursor: pointer;
        }

        .v8-how-cta:hover {
          background: #0A0A0A;
          color: #F5F5F0;
        }

        @media (max-width: 900px) {
          .v8-how {
            padding: 80px 0;
          }

          .v8-how-inner {
            padding: 0 20px;
          }

          .v8-how-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .v8-step {
            border-left: none;
            border-top: 3px solid #0A0A0A;
            padding: 32px 0;
          }

          .v8-step:first-child {
            border-top: none;
          }

          .v8-how-heading {
            margin-bottom: 48px;
          }
        }

        @media (max-width: 600px) {
          .v8-how-cta {
            width: 100%;
            text-align: center;
            padding: 16px 32px;
          }
        }
      `}</style>

      <section ref={sectionRef} id="how-it-works" className="v8-how">
        <div className="v8-how-inner">
          <p className="v8-how-label v8-hidden v8-how-reveal">PROCESS</p>
          <h2 className="v8-how-heading v8-hidden v8-how-reveal">HOW IT WORKS</h2>

          <div className="v8-how-grid">
            {steps.map((step) => (
              <div key={step.num} className="v8-step v8-hidden v8-how-reveal">
                <div className="v8-step-num">{step.num}</div>
                <h3 className="v8-step-title">{step.title}</h3>
                <p className="v8-step-body">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="v8-how-cta-wrap v8-hidden v8-how-reveal">
            <a href="#contact" className="v8-how-cta">BOOK A FREE CALL</a>
          </div>
        </div>
      </section>
    </>
  )
}
