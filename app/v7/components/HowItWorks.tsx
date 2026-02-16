'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    number: '1',
    title: 'you share',
    body: 'Free 30-minute call. Tell me about your business and where you feel stuck. I\u2019ll give you an honest take \u2014 even if the answer is \u201cyou already have what you need.\u201d',
  },
  {
    number: '2',
    title: 'i build',
    body: 'Website, SEO, Google Business, landing pages \u2014 whatever moves the needle. Your feedback shapes every step. No surprises, no scope creep.',
  },
  {
    number: '3',
    title: 'you grow',
    body: 'Your phone rings more. Your calendar fills up. And I stick around to help you keep improving.',
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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

      // Cards staggered reveal
      const validCards = cardsRef.current.filter(Boolean)
      if (validCards.length) {
        gsap.from(validCards, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: validCards[0],
            start: 'top 85%',
            once: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="how-it-works" className="v7-how" ref={sectionRef}>
      <div className="v7-how-container">
        <div className="v7-how-header" ref={headerRef}>
          <span className="v7-label">how it works</span>
          <h2 className="v7-how-heading">simple process. real results.</h2>
        </div>

        <div className="v7-how-grid">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="v7-how-card"
              ref={(el) => { cardsRef.current[i] = el }}
            >
              <span className="v7-how-number">{step.number}</span>
              <h3 className="v7-how-title">{step.title}</h3>
              <p className="v7-how-body">{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .v7-how {
          padding: 140px 24px;
          background: #0A0A0A;
        }

        .v7-how-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .v7-how-header {
          margin-bottom: 72px;
        }

        .v7-label {
          display: block;
          font-family: var(--font-jetbrains-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #FF4D00;
          margin-bottom: 16px;
        }

        .v7-how-heading {
          font-family: var(--font-instrument-serif);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 400;
          color: #F5F5F0;
          text-transform: lowercase;
          line-height: 1.1;
          margin: 0;
        }

        .v7-how-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 768px) {
          .v7-how-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .v7-how {
            padding: 100px 20px;
          }
        }

        .v7-how-card {
          background: #161616;
          border: 1px solid rgba(245, 245, 240, 0.06);
          border-radius: 2px;
          padding: 40px 32px;
        }

        .v7-how-number {
          display: block;
          font-family: var(--font-instrument-serif);
          font-size: 3rem;
          color: #FF4D00;
          line-height: 1;
          margin-bottom: 20px;
        }

        .v7-how-title {
          font-family: var(--font-instrument-serif);
          font-style: italic;
          font-size: 1.5rem;
          font-weight: 400;
          color: #F5F5F0;
          text-transform: lowercase;
          margin: 0 0 16px 0;
        }

        .v7-how-body {
          font-family: var(--font-inter);
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(245, 245, 240, 0.6);
          margin: 0;
        }
      `}</style>
    </section>
  )
}
