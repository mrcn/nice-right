'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
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
      // Everything starts hidden
      gsap.set('.v8-hidden', { opacity: 0 })

      // Hero elements: instant reveal on load
      gsap.set('.v8-hero-h1', { opacity: 1, delay: 0.01 })
      gsap.set('.v8-hero-sub', { opacity: 1, delay: 0.02 })
      gsap.set('.v8-hero-image', { opacity: 1, delay: 0.03 })

      // Trust line, CTA, micro: ScrollTrigger instant pop
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
        .v8-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: #F5F5F0;
          position: relative;
          overflow: visible;
          padding: 120px 0 80px;
        }

        .v8-hero-inner {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
        }

        .v8-hero-layout {
          display: flex;
          align-items: flex-start;
          gap: 0;
          position: relative;
        }

        .v8-hero-text {
          flex: 1;
          position: relative;
          z-index: 2;
        }

        .v8-hero-h1 {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(5rem, 14vw, 14rem);
          line-height: 0.85;
          color: #0A0A0A;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          margin: 0;
          margin-left: -2vw;
          margin-right: -2vw;
          overflow: visible;
        }

        .v8-hero-h1-line2 {
          display: block;
          color: #0A0A0A;
        }

        .v8-hero-h1-line2 .v8-blue {
          color: #0000FF;
        }

        .v8-hero-sub {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          line-height: 1.6;
          color: #0A0A0A;
          max-width: 560px;
          margin: 40px 0 0;
        }

        .v8-trust-line {
          display: flex;
          align-items: center;
          gap: 0;
          margin-top: 48px;
          flex-wrap: wrap;
        }

        .v8-trust-item {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #0A0A0A;
          white-space: nowrap;
        }

        .v8-trust-sep {
          width: 8px;
          height: 8px;
          background: #FF0000;
          display: inline-block;
          margin: 0 16px;
          border-radius: 0;
        }

        .v8-hero-cta-wrap {
          margin-top: 40px;
        }

        .v8-hero-cta {
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
          transition: none;
        }

        .v8-hero-cta:hover {
          background: #0A0A0A;
          color: #F5F5F0;
        }

        .v8-hero-micro {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #0A0A0A;
          opacity: 0.6;
          margin-top: 16px;
        }

        .v8-hero-image {
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%) rotate(3deg);
          width: clamp(200px, 22vw, 380px);
          z-index: 1;
        }

        .v8-hero-image img {
          display: block;
          width: 100%;
          height: auto;
          border: 3px solid #0A0A0A;
          border-radius: 0;
          filter: grayscale(30%) contrast(1.1);
        }

        .v8-hidden {
          opacity: 0;
        }

        @media (max-width: 900px) {
          .v8-hero {
            padding: 100px 0 60px;
          }

          .v8-hero-inner {
            padding: 0 20px;
          }

          .v8-hero-h1 {
            font-size: clamp(3.5rem, 12vw, 7rem);
            margin-left: -1vw;
            margin-right: -1vw;
          }

          .v8-hero-image {
            position: relative;
            right: auto;
            top: auto;
            transform: rotate(3deg);
            width: 60%;
            margin: 32px 0 0 auto;
          }

          .v8-hero-layout {
            flex-direction: column;
          }

          .v8-trust-line {
            margin-top: 32px;
          }
        }

        @media (max-width: 600px) {
          .v8-hero-h1 {
            font-size: clamp(2.8rem, 15vw, 5rem);
          }

          .v8-hero-image {
            width: 70%;
          }

          .v8-hero-cta {
            padding: 16px 32px;
            font-size: 0.9rem;
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <section ref={sectionRef} className="v8-hero">
        <div className="v8-hero-inner">
          <div className="v8-hero-layout">
            <div className="v8-hero-text">
              <h1 className="v8-hero-h1 v8-hidden">
                GROW YOUR BUSINESS.
                <span className="v8-hero-h1-line2">
                  I&apos;LL HANDLE <span className="v8-blue">THE TECH.</span>
                </span>
              </h1>

              <p className="v8-hero-sub v8-hidden">
                Your customers are looking for you right now. I help small
                businesses get found, win more customers, and keep them
                coming back.
              </p>

              <div className="v8-trust-line v8-hidden v8-pop">
                <span className="v8-trust-item">CHICAGO&apos;S NORTHWEST SIDE</span>
                <span className="v8-trust-sep" />
                <span className="v8-trust-item">100+ PROJECTS</span>
                <span className="v8-trust-sep" />
                <span className="v8-trust-item">13+ YEARS</span>
              </div>

              <div className="v8-hero-cta-wrap v8-hidden v8-pop">
                <a href="#contact" className="v8-hero-cta">
                  BOOK A FREE CALL
                </a>
              </div>

              <p className="v8-hero-micro v8-hidden v8-pop">
                30 minutes. An honest look at what&apos;s possible for your business.
              </p>
            </div>

            <div className="v8-hero-image v8-hidden">
              <img src="/images/hero-abstract.svg" alt="Nice Right" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
