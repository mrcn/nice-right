'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.v11-section-header'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        }
      )

      const cards = section.querySelectorAll('.v11-step-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6,
          ease: 'back.out(1.2)',
          stagger: 0.15,
          scrollTrigger: { trigger: cards[0], start: 'top 82%', once: true },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="v11-how">
      <div className="v11-container">
        <div className="v11-section-header">
          <p className="v11-section-label">How It Works</p>
          <h2>Simple process. Real results.</h2>
        </div>
        <div className="v11-steps-grid">
          <div className="v11-step-card">
            <div className="v11-step-number">1</div>
            <h3>You Share</h3>
            <p>
              Free 30-minute call. Tell me about your business and
              where you feel stuck. I&apos;ll give you an honest take
              &mdash; even if the answer is &ldquo;you already have
              what you need.&rdquo;
            </p>
          </div>
          <div className="v11-step-card">
            <div className="v11-step-number">2</div>
            <h3>I Build</h3>
            <p>
              Website, SEO, Google Business, landing pages &mdash;
              whatever moves the needle. Your feedback shapes every
              step. No surprises, no scope creep.
            </p>
          </div>
          <div className="v11-step-card">
            <div className="v11-step-number">3</div>
            <h3>You Grow</h3>
            <p>
              Your phone rings more. Your calendar fills up. And I
              stick around to help you keep improving.
            </p>
          </div>
        </div>
        <div className="v11-section-cta">
          <a href="#contact" className="v11-btn">Book a Free Call</a>
        </div>
      </div>

      {/* Wave divider */}
      <div className="v11-wave-divider v11-wave-divider--to-base" aria-hidden="true" />
    </section>
  )
}
