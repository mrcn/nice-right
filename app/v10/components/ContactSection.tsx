'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function CalEmbed() {
  const [loaded, setLoaded] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    const w = window as unknown as Record<string, unknown>
    const Cal = function (...args: unknown[]) {
      const cal = Cal as unknown as { loaded?: boolean; ns: Record<string, unknown>; q: unknown[][] }
      if (!cal.loaded) {
        cal.ns = {}
        cal.q = cal.q || []
        const script = document.createElement('script')
        script.src = 'https://app.cal.com/embed/embed.js'
        script.async = true
        document.head.appendChild(script)
        cal.loaded = true
      }
      if (args[0] === 'init') {
        const api = function (...a: unknown[]) {
          (api as unknown as { q: unknown[][] }).q = (api as unknown as { q: unknown[][] }).q || []
          ;(api as unknown as { q: unknown[][] }).q.push(a)
        }
        const namespace = args[1]
        ;(api as unknown as { q: unknown[][] }).q = []
        if (typeof namespace === 'string') {
          cal.ns[namespace] = cal.ns[namespace] || api
          ;(cal.ns[namespace] as unknown as { q: unknown[][] }).q.push(args)
          cal.q.push(['initNamespace', namespace])
        } else {
          cal.q.push(args)
        }
        return
      }
      cal.q.push(args)
    }
    ;(Cal as unknown as { q: unknown[][]; ns: Record<string, unknown> }).q = []
    ;(Cal as unknown as { ns: Record<string, unknown> }).ns = {}
    w.Cal = Cal
    Cal('init', { origin: 'https://cal.com' })
    Cal('inline', {
      elementOrSelector: '#cal-embed-v10',
      calLink: 'niceright/30min',
      layout: 'month_view',
    })
    Cal('ui', {
      hideEventTypeDetails: true,
      layout: 'month_view',
      cssVarsPerTheme: {
        light: {
          'cal-brand': '#FF00FF',
          'cal-text': '#E0D0FF',
          'cal-text-emphasis': '#E0D0FF',
          'cal-border-emphasis': '#2A1F3D',
          'cal-bg': '#0A0010',
          'cal-bg-emphasis': '#1A0F2E',
        },
      },
    })

    let currentLoaded = false
    const checkLoaded = setInterval(() => {
      const el = document.getElementById('cal-embed-v10')
      if (el && el.querySelector('iframe')) {
        currentLoaded = true
        setLoaded(true)
        clearInterval(checkLoaded)
      }
    }, 500)

    const timeout = setTimeout(() => {
      if (!currentLoaded) setTimedOut(true)
    }, 12000)

    return () => {
      clearInterval(checkLoaded)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="v10-cal-wrapper">
      {!loaded && (
        <div className="v10-cal-loading">
          <div className="v10-cal-spinner" aria-hidden="true" />
          <span className="v10-cal-loading-text">
            {timedOut ? 'CONNECTION_TIMEOUT' : 'LOADING CALENDAR...'}
          </span>
          {timedOut && (
            <a
              href="https://cal.com/niceright/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="v10-cal-fallback-link"
            >
              OPEN_SCHEDULER &rarr;
            </a>
          )}
        </div>
      )}
      <div
        id="cal-embed-v10"
        style={{
          width: '100%',
          minHeight: loaded ? 480 : 0,
          overflow: 'hidden',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  )
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        el.querySelector('.v10-contact-header'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.querySelector('.v10-contact-header'),
            start: 'top 85%',
            once: true,
          },
        }
      )

      // Cal container reveal
      gsap.fromTo(
        el.querySelector('.v10-cal-container'),
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.querySelector('.v10-cal-container'),
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Contact cards stagger
      const cards = el.querySelectorAll('.v10-contact-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el.querySelector('.v10-contact-methods'),
              start: 'top 88%',
              once: true,
            },
            delay: i * 0.15,
          }
        )
      })

      // Neon glow pulse on card hover
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            boxShadow: '0 0 30px #00FFFF44, 0 0 60px #00FFFF22, inset 0 0 20px #00FFFF11',
            duration: 0.3,
            ease: 'power2.out',
          })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            boxShadow: '0 0 0px transparent',
            duration: 0.4,
            ease: 'power2.out',
          })
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        .v10-contact-section {
          background: #0A0010;
          padding: 140px 24px;
          position: relative;
          overflow: hidden;
        }

        .v10-contact-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(90%, 800px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #FF00FF4d 30%, #00FFFF4d 70%, transparent);
          box-shadow: 0 0 20px #FF00FF33;
        }

        /* Radial glow behind section */
        .v10-contact-section::after {
          content: '';
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 600px;
          background: radial-gradient(
            ellipse,
            rgba(255, 0, 255, 0.04) 0%,
            rgba(191, 0, 255, 0.02) 40%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }

        .v10-contact-inner {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .v10-contact-header {
          margin-bottom: 56px;
          opacity: 0;
        }

        .v10-contact-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 500;
          color: #39FF14;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 16px;
          display: block;
          text-shadow: 0 0 10px #39FF1444;
        }

        .v10-contact-heading {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          color: #E0D0FF;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin: 0 0 12px;
          text-shadow: 0 0 40px #FF00FF44, 0 0 80px #FF00FF22;
          line-height: 1.2;
        }

        .v10-contact-sub {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #E0D0FFaa;
          margin: 0;
          line-height: 1.6;
        }

        .v10-cal-container {
          max-width: 700px;
          margin: 0 auto 56px;
          background: #1A0F2E;
          border: 1px solid #2A1F3D;
          padding: 24px;
          min-height: 520px;
          position: relative;
          opacity: 0;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .v10-cal-container:hover {
          border-color: #FF00FF44;
          box-shadow: 0 0 30px #FF00FF22, 0 0 60px #FF00FF11;
        }

        /* Neon top border accent */
        .v10-cal-container::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #FF00FF, #00FFFF, #FF00FF);
          box-shadow: 0 0 10px #FF00FF66, 0 0 20px #00FFFF33;
        }

        .v10-cal-wrapper {
          position: relative;
          min-height: 400px;
        }

        .v10-cal-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 16px;
        }

        .v10-cal-spinner {
          width: 36px;
          height: 36px;
          border: 2px solid #2A1F3D;
          border-top-color: #00FFFF;
          animation: v10-contact-spin 0.8s linear infinite;
          box-shadow: 0 0 10px #00FFFF33;
        }

        @keyframes v10-contact-spin {
          to { transform: rotate(360deg); }
        }

        .v10-cal-loading-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: #E0D0FF88;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-shadow: 0 0 8px #00FFFF33;
        }

        /* Blinking underscore after loading text */
        .v10-cal-loading-text::after {
          content: '_';
          color: #39FF14;
          animation: v10-contact-blink 1s steps(1) infinite;
        }

        @keyframes v10-contact-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .v10-cal-fallback-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 700;
          color: #FF00FF;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 12px 28px;
          border: 1px solid #FF00FF;
          margin-top: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px #FF00FF44;
        }

        .v10-cal-fallback-link:hover {
          background: #FF00FF;
          color: #0A0010;
          box-shadow: 0 0 30px #FF00FF88, 0 0 60px #FF00FF44;
        }

        .v10-contact-methods {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .v10-contact-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 28px;
          background: #1A0F2E;
          border: 1px solid #2A1F3D;
          text-decoration: none;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
        }

        .v10-contact-card:hover {
          border-color: #00FFFF;
          transform: translateY(-2px);
        }

        .v10-contact-icon {
          color: #00FFFF;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          filter: drop-shadow(0 0 6px #00FFFF66);
        }

        .v10-contact-icon svg {
          width: 20px;
          height: 20px;
        }

        .v10-contact-card-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .v10-contact-card-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          color: #E0D0FF88;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 2px;
        }

        .v10-contact-card-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 700;
          color: #E0D0FF;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 1024px) {
          .v10-contact-section {
            padding: 100px 24px;
          }
        }

        @media (max-width: 768px) {
          .v10-contact-section {
            padding: 80px 20px;
          }

          .v10-contact-header {
            margin-bottom: 40px;
          }

          .v10-contact-methods {
            flex-direction: column;
            align-items: center;
          }

          .v10-contact-card {
            width: 100%;
            max-width: 340px;
          }
        }

        @media (max-width: 480px) {
          .v10-contact-section {
            padding: 64px 16px;
          }

          .v10-cal-container {
            padding: 16px;
          }

          .v10-contact-card {
            padding: 14px 20px;
          }

          .v10-contact-heading {
            font-size: clamp(1.4rem, 6vw, 1.8rem);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .v10-contact-header {
            opacity: 1 !important;
          }

          .v10-cal-container {
            opacity: 1 !important;
          }

          .v10-contact-card {
            opacity: 1 !important;
          }

          .v10-cal-spinner {
            animation: none;
          }

          .v10-cal-loading-text::after {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>

      <section ref={sectionRef} id="contact" className="v10-contact-section">
        <div className="v10-contact-inner">
          <div className="v10-contact-header">
            <span className="v10-contact-label">// CONTACT</span>
            <h2 className="v10-contact-heading">
              LET&apos;S FIGURE OUT WHAT WOULD WORK FOR YOUR BUSINESS
            </h2>
            <p className="v10-contact-sub">
              30 minutes. Pick a time that works for you.
            </p>
          </div>

          <div className="v10-cal-container">
            <CalEmbed />
          </div>

          <div className="v10-contact-methods">
            <a
              href="mailto:Marcin@uxoxo.xyz"
              className="v10-contact-card"
            >
              <span className="v10-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="4" width="18" height="12" rx="0" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M1 4L10 11L19 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="v10-contact-card-text">
                <span className="v10-contact-card-label">$ email</span>
                <span className="v10-contact-card-value">Marcin@uxoxo.xyz</span>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/mklaudiusz"
              target="_blank"
              rel="noopener noreferrer"
              className="v10-contact-card"
            >
              <span className="v10-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="18" height="18" rx="0" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M5 5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M9 15V10.5C9 9.67 9.67 9 10.5 9C11.33 9 12 9.67 12 10.5V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 15V10.5C12 9.67 12.67 9 13.5 9C14.33 9 15 9.67 15 10.5V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="v10-contact-card-text">
                <span className="v10-contact-card-label">$ linkedin</span>
                <span className="v10-contact-card-value">mklaudiusz</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
