'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * V7 "Noir Editorial" Hero
 *
 * Full-viewport hero with character-split GSAP cascade on the heading,
 * asymmetric 60/40 grid, parallax image, and sequential element reveals.
 * Text is rendered as plain strings to avoid hydration mismatch — chars
 * are split via DOM manipulation inside useEffect.
 */

function splitIntoCharSpans(el: HTMLElement) {
  const text = el.textContent || ''
  el.textContent = ''
  text.split('').forEach((char) => {
    const span = document.createElement('span')
    span.className = 'v7-char'
    span.style.display = 'inline-block'
    if (char === ' ') {
      span.style.whiteSpace = 'pre'
      span.textContent = '\u00A0'
    } else {
      span.textContent = char
    }
    el.appendChild(span)
  })
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const microRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    // Split text into char spans via DOM (avoids hydration mismatch)
    if (line1Ref.current) splitIntoCharSpans(line1Ref.current)
    if (line2Ref.current) splitIntoCharSpans(line2Ref.current)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.querySelectorAll('.v7-char, .v7-hero-sub, .v7-trust-line, .v7-hero-cta, .v7-hero-micro, .v7-hero-image, .v7-section-label').forEach((node) => {
        ;(node as HTMLElement).style.opacity = '1'
        ;(node as HTMLElement).style.transform = 'none'
      })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 0. Section label fade
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4 }
      )

      // 1. Character split cascade -- line 1
      const line1Spans = line1Ref.current?.querySelectorAll('.v7-char')
      if (line1Spans?.length) {
        tl.fromTo(
          line1Spans,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: { each: 0.03 },
          },
          '-=0.1'
        )
      }

      // 2. Character split cascade -- line 2 (accent line)
      const line2Spans = line2Ref.current?.querySelectorAll('.v7-char')
      if (line2Spans?.length) {
        tl.fromTo(
          line2Spans,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: { each: 0.03 },
          },
          '-=0.15'
        )
      }

      // 3. Subtitle fade
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
      )

      // 4. Trust badges
      const trustSpans = trustRef.current?.querySelectorAll('span')
      if (trustSpans?.length) {
        tl.fromTo(
          trustSpans,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          '-=0.3'
        )
      }

      // 5. CTA button
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 16, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        '-=0.15'
      )

      // 6. Micro text
      tl.fromTo(
        microRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.2'
      )

      // 7. Image slides in from right
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: 60, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
        0.3
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="v7-hero">
      <div className="v7-container">
        <div className="v7-hero-grid">
          <div className="v7-hero-text">
            <p ref={labelRef} className="v7-section-label">Nice Right</p>
            <h1 className="v7-hero-h1">
              <span ref={line1Ref} className="v7-hero-line v7-hero-line-1">
                grow your business.
              </span>
              <br />
              <span ref={line2Ref} className="v7-hero-line v7-hero-line-2">
                i&apos;ll handle the tech.
              </span>
            </h1>
            <p ref={subRef} className="v7-hero-sub">
              Your customers are looking for you right now. I help small
              businesses get found, win more customers, and keep them
              coming back.
            </p>
            <div ref={trustRef} className="v7-trust-line">
              <span>Chicago&apos;s Northwest Side</span>
              <span>100+ projects</span>
              <span>13+ years</span>
            </div>
            <div ref={ctaRef} className="v7-hero-cta">
              <a href="#contact" className="v7-btn">Book a Free Call</a>
            </div>
            <p ref={microRef} className="v7-hero-micro">
              30 minutes. An honest look at what&apos;s possible
              for your business.
            </p>
          </div>
          <div ref={imageRef} className="v7-hero-image">
            <img src="/images/hero-abstract.svg" alt="Nice Right" />
          </div>
        </div>
      </div>

      <style>{`
        .v7-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: #0A0A0A;
          color: #F5F5F0;
          padding: 120px 0 80px;
          overflow: hidden;
        }

        .v7-hero .v7-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
        }

        .v7-hero-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .v7-hero-text {
          position: relative;
          z-index: 2;
        }

        .v7-hero .v7-section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #FF4D00;
          margin: 0 0 24px;
          opacity: 0;
        }

        .v7-hero-h1 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(3.2rem, 7vw, 5.5rem);
          line-height: 1.05;
          margin: 0 0 24px;
          font-weight: 400;
          color: #F5F5F0;
        }

        .v7-hero-line {
          display: block;
        }

        .v7-hero-line-2 {
          color: #FFB800;
        }

        .v7-char {
          opacity: 0;
          will-change: transform, opacity;
        }

        .v7-hero-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          line-height: 1.7;
          color: rgba(245, 245, 240, 0.7);
          max-width: 520px;
          margin: 0 0 24px;
          opacity: 0;
        }

        .v7-trust-line {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
          margin-bottom: 32px;
        }

        .v7-trust-line span {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          color: rgba(245, 245, 240, 0.5);
          text-transform: uppercase;
          opacity: 0;
          position: relative;
          padding-left: 14px;
        }

        .v7-trust-line span::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FF4D00;
        }

        .v7-hero-cta {
          margin-bottom: 16px;
          opacity: 0;
        }

        .v7-hero .v7-btn {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #0A0A0A;
          background: #FF4D00;
          padding: 16px 36px;
          border: none;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: background 0.25s ease, transform 0.2s ease;
          cursor: pointer;
        }

        .v7-hero .v7-btn:hover {
          background: #FFB800;
          transform: translateY(-2px);
        }

        .v7-hero-micro {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          color: rgba(245, 245, 240, 0.4);
          margin: 0;
          opacity: 0;
        }

        .v7-hero-image {
          position: relative;
          opacity: 0;
        }

        .v7-hero-image img {
          width: 100%;
          height: auto;
          display: block;
          transform: rotate(-2deg);
          border: 1px solid #FF4D00;
          filter: grayscale(20%) contrast(1.05);
          transition: filter 0.4s ease;
        }

        .v7-hero-image img:hover {
          filter: grayscale(0%) contrast(1.1);
        }

        /* Mobile breakpoints */
        @media (max-width: 768px) {
          .v7-hero {
            padding: 100px 0 60px;
            min-height: auto;
          }

          .v7-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .v7-hero-image {
            order: -1;
            max-width: 280px;
            margin: 0 auto;
          }

          .v7-hero-h1 {
            font-size: clamp(2.4rem, 10vw, 3.6rem);
          }

          .v7-trust-line {
            gap: 6px 16px;
          }
        }

        @media (max-width: 480px) {
          .v7-hero-h1 {
            font-size: clamp(2rem, 9vw, 2.8rem);
          }

          .v7-hero .v7-btn {
            width: 100%;
            text-align: center;
            padding: 14px 24px;
          }
        }

        /* Reduced motion: show everything immediately */
        @media (prefers-reduced-motion: reduce) {
          .v7-char,
          .v7-hero-sub,
          .v7-trust-line span,
          .v7-hero-cta,
          .v7-hero-micro,
          .v7-hero-image,
          .v7-section-label {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
