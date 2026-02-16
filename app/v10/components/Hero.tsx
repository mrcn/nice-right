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
      // Typewriter effect on h1 lines
      const typeTargets = el.querySelectorAll<HTMLElement>('[data-type]')
      typeTargets.forEach((target) => {
        const text = target.dataset.type || ''
        target.textContent = ''
        target.style.visibility = 'visible'

        const chars = text.split('')
        chars.forEach((char, i) => {
          const span = document.createElement('span')
          span.textContent = char
          span.style.opacity = '0'
          target.appendChild(span)

          gsap.to(span, {
            opacity: 1,
            duration: 0.03,
            delay: 0.6 + i * 0.045,
            ease: 'none',
          })
        })
      })

      // Cursor blink
      const cursor = el.querySelector('.v10-cursor')
      if (cursor) {
        gsap.to(cursor, {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 0.5,
          ease: 'steps(1)',
        })
      }

      // Fade in secondary elements
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 2.2 })

      tl.fromTo(
        el.querySelector('.v10-hero-sub'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          el.querySelectorAll('.v10-trust-item'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 },
          '-=0.3'
        )
        .fromTo(
          el.querySelector('.v10-hero-cta-btn'),
          { opacity: 0, y: 16, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          '-=0.15'
        )
        .fromTo(
          el.querySelector('.v10-hero-micro'),
          { opacity: 0 },
          { opacity: 0.6, duration: 0.4 },
          '-=0.2'
        )
        .fromTo(
          el.querySelector('.v10-hero-portrait'),
          { opacity: 0, x: 60, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
          1.0
        )

      // Glitch effect on h1 — repeats every 5 seconds
      const glitchTarget = el.querySelector('.v10-glitch-wrap')
      if (glitchTarget) {
        const runGlitch = () => {
          const glitchTl = gsap.timeline()
          glitchTl
            .to(glitchTarget, {
              skewX: 2,
              x: -3,
              duration: 0.05,
              ease: 'none',
            })
            .to(glitchTarget, {
              skewX: -1,
              x: 4,
              duration: 0.05,
              ease: 'none',
            })
            .to(glitchTarget, {
              skewX: 0.5,
              x: -2,
              duration: 0.04,
              ease: 'none',
            })
            .to(glitchTarget, {
              skewX: 0,
              x: 0,
              duration: 0.04,
              ease: 'none',
            })
        }

        // Run on hover
        const h1El = el.querySelector('h1')
        h1El?.addEventListener('mouseenter', runGlitch)

        // Run every 5s
        const interval = setInterval(runGlitch, 5000)
        return () => clearInterval(interval)
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        .v10-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: #0A0010;
          overflow: hidden;
        }

        .v10-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 50%, #0A0010 100%);
          pointer-events: none;
          z-index: 2;
        }

        /* CRT scanlines */
        .v10-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.15) 2px,
            rgba(0,0,0,0.15) 4px
          );
          pointer-events: none;
          z-index: 3;
        }

        .v10-hero-inner {
          position: relative;
          z-index: 4;
          max-width: 1200px;
          margin: 0 auto;
          padding: 120px 24px 80px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 48px;
          align-items: center;
        }

        .v10-hero-text {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .v10-hero h1 {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: clamp(2.4rem, 5.5vw, 4.2rem);
          line-height: 1.1;
          color: #E0D0FF;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .v10-glitch-wrap {
          display: inline-block;
          position: relative;
        }

        .v10-hero h1 [data-type] {
          visibility: hidden;
        }

        .v10-hero-line2 {
          background: linear-gradient(90deg, #FF00FF, #00FFFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
        }

        .v10-hero h1 .v10-hero-line2 span {
          background: linear-gradient(90deg, #FF00FF, #00FFFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Glitch text-shadow on parent for pseudo-channel effect */
        .v10-glitch-wrap::before,
        .v10-glitch-wrap::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: clamp(2.4rem, 5.5vw, 4.2rem);
          line-height: 1.1;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          pointer-events: none;
          opacity: 0;
        }

        .v10-glitch-wrap:hover::before {
          color: #FF00FF;
          opacity: 0.7;
          animation: v10-glitch-1 0.3s ease-out;
        }

        .v10-glitch-wrap:hover::after {
          color: #00FFFF;
          opacity: 0.7;
          animation: v10-glitch-2 0.3s ease-out;
        }

        @keyframes v10-glitch-1 {
          0% { clip-path: inset(40% 0 20% 0); transform: translate(-3px, 2px); opacity: 0.8; }
          20% { clip-path: inset(10% 0 60% 0); transform: translate(3px, -1px); }
          40% { clip-path: inset(60% 0 5% 0); transform: translate(-2px, 1px); }
          60% { clip-path: inset(20% 0 40% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(50% 0 10% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(0); transform: translate(0); opacity: 0; }
        }

        @keyframes v10-glitch-2 {
          0% { clip-path: inset(20% 0 40% 0); transform: translate(3px, -2px); opacity: 0.8; }
          20% { clip-path: inset(50% 0 10% 0); transform: translate(-3px, 1px); }
          40% { clip-path: inset(5% 0 60% 0); transform: translate(2px, -1px); }
          60% { clip-path: inset(40% 0 20% 0); transform: translate(-2px, 2px); }
          80% { clip-path: inset(10% 0 50% 0); transform: translate(1px, -1px); }
          100% { clip-path: inset(0); transform: translate(0); opacity: 0; }
        }

        .v10-cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background: #39FF14;
          margin-left: 4px;
          vertical-align: text-bottom;
          box-shadow: 0 0 8px #39FF14, 0 0 20px #39FF1466;
        }

        .v10-hero-sub {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          line-height: 1.7;
          color: #E0D0FFcc;
          max-width: 520px;
          margin: 0;
          opacity: 0;
        }

        .v10-trust-line {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 24px;
        }

        .v10-trust-item {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          color: #39FF14;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-shadow: 0 0 8px #39FF1444;
          opacity: 0;
        }

        .v10-trust-item:not(:last-child)::after {
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          background: #39FF14;
          margin-left: 24px;
          vertical-align: middle;
          box-shadow: 0 0 6px #39FF14;
        }

        .v10-hero-cta-btn {
          display: inline-block;
          padding: 16px 40px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #0A0010;
          background: #FF00FF;
          text-decoration: none;
          border: 2px solid #FF00FF;
          transition: all 0.2s ease;
          box-shadow: 0 0 20px #FF00FF44, inset 0 0 20px #FF00FF22;
          opacity: 0;
        }

        .v10-hero-cta-btn:hover {
          background: transparent;
          color: #FF00FF;
          box-shadow: 0 0 30px #FF00FF88, 0 0 60px #FF00FF44, inset 0 0 20px #FF00FF22;
        }

        .v10-hero-micro {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: #E0D0FF66;
          letter-spacing: 0.02em;
          margin: 0;
          opacity: 0;
        }

        .v10-hero-portrait {
          position: relative;
          opacity: 0;
        }

        .v10-hero-portrait img {
          width: 100%;
          display: block;
          filter: grayscale(100%) contrast(1.2);
          mix-blend-mode: luminosity;
        }

        .v10-hero-portrait::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #FF00FF33, #00FFFF33);
          mix-blend-mode: color;
          z-index: 1;
          pointer-events: none;
        }

        .v10-hero-portrait::after {
          content: '';
          position: absolute;
          inset: -2px;
          border: 2px solid #00FFFF;
          box-shadow: 0 0 20px #00FFFF44, inset 0 0 20px #00FFFF22;
          z-index: 2;
          pointer-events: none;
        }

        /* Grid noise overlay */
        .v10-grid-noise {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(#FF00FF08 1px, transparent 1px),
            linear-gradient(90deg, #FF00FF08 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: 1;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .v10-hero-inner {
            grid-template-columns: 1fr;
            padding: 100px 20px 60px;
            gap: 40px;
          }

          .v10-hero-portrait {
            max-width: 260px;
            order: -1;
            justify-self: center;
          }

          .v10-hero h1 {
            font-size: clamp(1.8rem, 8vw, 2.8rem);
          }
        }
      `}</style>

      <section ref={sectionRef} className="v10-hero">
        <div className="v10-grid-noise" />
        <div className="v10-hero-inner">
          <div className="v10-hero-text">
            <h1>
              <div
                className="v10-glitch-wrap"
                data-text="GROW YOUR BUSINESS."
              >
                <span data-type="GROW YOUR BUSINESS.">GROW YOUR BUSINESS.</span>
                <span className="v10-cursor" />
              </div>
              <br />
              <div className="v10-glitch-wrap" data-text="I'LL HANDLE THE TECH.">
                <span className="v10-hero-line2" data-type="I'LL HANDLE THE TECH.">
                  I&apos;LL HANDLE THE TECH.
                </span>
              </div>
            </h1>

            <p className="v10-hero-sub">
              Your customers are looking for you right now. I help small
              businesses get found, win more customers, and keep them
              coming back.
            </p>

            <div className="v10-trust-line">
              <span className="v10-trust-item">CHICAGO&apos;S NORTHWEST SIDE</span>
              <span className="v10-trust-item">100+ PROJECTS</span>
              <span className="v10-trust-item">13+ YEARS</span>
            </div>

            <div>
              <a href="#contact" className="v10-hero-cta-btn">
                BOOK A FREE CALL
              </a>
            </div>

            <p className="v10-hero-micro">
              30 minutes. An honest look at what&apos;s possible for your business.
            </p>
          </div>

          <div className="v10-hero-portrait">
            <img src="/images/me-low.jpg" alt="Marcin Dabrowski" />
          </div>
        </div>
      </section>
    </>
  )
}
