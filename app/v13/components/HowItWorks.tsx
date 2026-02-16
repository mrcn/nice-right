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
        el.querySelector('.v13-section-header'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      )

      gsap.fromTo(
        el.querySelectorAll('.v13-step-card'),
        { opacity: 0, y: 50, rotateX: 2 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: el.querySelector('.v13-steps-grid'), start: 'top 80%', once: true },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="v13-how">
      <div className="v13-container">
        <div className="v13-section-header">
          <p className="v13-section-label">How It Works</p>
          <h2>Simple process. Real results.</h2>
        </div>
        <div className="v13-steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="v13-step-card v13-glass-card">
              <div className="v13-step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
        <div className="v13-section-cta">
          <a href="#contact" className="v13-btn v13-btn-aurora">Book a Free Call</a>
        </div>
      </div>
    </section>
  )
}
