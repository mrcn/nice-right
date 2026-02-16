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
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        el.querySelector('.v13-hero-heading'),
        { opacity: 0, y: 60, rotateX: 4 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1 }
      )
        .fromTo(
          el.querySelector('.v13-hero-sub'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          el.querySelectorAll('.v13-trust-item'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
          '-=0.4'
        )
        .fromTo(
          el.querySelector('.v13-hero-cta'),
          { opacity: 0, y: 20, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          '-=0.2'
        )
        .fromTo(
          el.querySelector('.v13-hero-micro'),
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.2'
        )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="v13-hero">
      <div className="v13-container">
        <div className="v13-hero-content">
          <h1 className="v13-hero-heading">
            Grow your business.
            <br />
            <span className="v13-gradient-text">I&apos;ll handle the tech.</span>
          </h1>
          <p className="v13-hero-sub">
            Your customers are looking for you right now. I help small
            businesses get found, win more customers, and keep them
            coming back.
          </p>
          <div className="v13-trust-line">
            <span className="v13-trust-item">Chicago&apos;s Northwest Side</span>
            <span className="v13-trust-separator" aria-hidden="true" />
            <span className="v13-trust-item">100+ projects</span>
            <span className="v13-trust-separator" aria-hidden="true" />
            <span className="v13-trust-item">13+ years</span>
          </div>
          <div className="v13-hero-cta">
            <a href="#contact" className="v13-btn v13-btn-aurora">
              Book a Free Call
            </a>
          </div>
          <p className="v13-hero-micro">
            30 minutes. An honest look at what&apos;s possible for your business.
          </p>
        </div>
      </div>
    </section>
  )
}
