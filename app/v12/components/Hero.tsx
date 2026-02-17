'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.4 } })

      tl.fromTo(
        el.querySelector('.v12-hero-label'),
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0 }
      )
        .fromTo(
          el.querySelector('h1'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        )
        .fromTo(
          el.querySelector('.v12-hero-sub'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0 },
          '-=0.2'
        )
        .fromTo(
          el.querySelectorAll('.v12-hero-trust span'),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, stagger: 0.08 },
          '-=0.15'
        )
        .fromTo(
          el.querySelector('.v12-hero-cta'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0 },
          '-=0.1'
        )
        .fromTo(
          el.querySelector('.v12-hero-micro'),
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          '-=0.05'
        )
        .fromTo(
          el.querySelector('.v12-hero-portrait'),
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.5 },
          0.2
        )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="v12-hero">
      <div className="v12-container">
        <div className="v12-hero-grid">
          <div className="v12-hero-content">
            <span className="v12-hero-label">Nice Right</span>
            <h1>
              Grow your business.
              <br />
              I&apos;ll handle the tech.
            </h1>
            <p className="v12-hero-sub">
              Your customers are looking for you right now. I help small
              businesses get found, win more customers, and keep them
              coming back.
            </p>
            <div className="v12-hero-trust">
              <span>Chicago&apos;s Northwest Side</span>
              <span className="v12-hero-trust-sep" aria-hidden="true" />
              <span>100+ projects</span>
              <span className="v12-hero-trust-sep" aria-hidden="true" />
              <span>13+ years</span>
            </div>
            <div className="v12-hero-cta">
              <a href="#contact" className="v12-btn">Book a Free Call</a>
            </div>
            <p className="v12-hero-micro">
              30 minutes. An honest look at what&apos;s possible for your business.
            </p>
          </div>
          <div className="v12-hero-portrait">
            <img
              src="/images/hero-abstract.svg"
              alt="Nice Right"
              loading="eager"
            />
          </div>
        </div>
      </div>
      <div className="v12-hero-rule" aria-hidden="true" />
    </section>
  )
}
