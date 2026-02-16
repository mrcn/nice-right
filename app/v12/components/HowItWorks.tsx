'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    number: '01',
    title: 'You Share',
    description:
      'Free 30-minute call. Tell me about your business and where you feel stuck. I\u2019ll give you an honest take \u2014 even if the answer is \u201cyou already have what you need.\u201d',
  },
  {
    number: '02',
    title: 'I Build',
    description:
      'Website, SEO, Google Business, landing pages \u2014 whatever moves the needle. Your feedback shapes every step. No surprises, no scope creep.',
  },
  {
    number: '03',
    title: 'You Grow',
    description:
      'Your phone rings more. Your calendar fills up. And I stick around to help you keep improving.',
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector('.v12-section-header'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      )

      gsap.fromTo(
        el.querySelectorAll('.v12-step'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 75%', once: true },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="v12-section v12-how">
      <div className="v12-container">
        <div className="v12-section-grid">
          <div className="v12-section-number" aria-hidden="true">01</div>
          <div className="v12-section-body">
            <div className="v12-section-header">
              <span className="v12-label">Process</span>
              <h2>Simple process. Real results.</h2>
            </div>
            <div className="v12-steps">
              {steps.map((step) => (
                <div key={step.number} className="v12-step">
                  <div className="v12-step-number">{step.number}</div>
                  <div className="v12-step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="v12-rule" aria-hidden="true" />
    </section>
  )
}
