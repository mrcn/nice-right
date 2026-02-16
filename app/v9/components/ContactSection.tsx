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
      const cal = Cal as unknown as {
        loaded?: boolean
        ns: Record<string, unknown>
        q: unknown[][]
      }
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
          (api as unknown as { q: unknown[][] }).q =
            (api as unknown as { q: unknown[][] }).q || []
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
      elementOrSelector: '#cal-embed-v9',
      calLink: 'niceright/30min',
      layout: 'month_view',
    })
    Cal('ui', {
      hideEventTypeDetails: true,
      layout: 'month_view',
      cssVarsPerTheme: {
        light: {
          'cal-brand': '#0B8A6E',
          'cal-text': '#F5F5F5',
          'cal-text-emphasis': '#FFFFFF',
          'cal-border-emphasis': '#1F2937',
          'cal-bg': '#0C1117',
          'cal-bg-emphasis': '#1F2937',
        },
      },
    })

    const checkLoaded = setInterval(() => {
      const el = document.getElementById('cal-embed-v9')
      if (el && el.querySelector('iframe')) {
        setLoaded(true)
        clearInterval(checkLoaded)
      }
    }, 500)

    const timeout = setTimeout(() => {
      if (!loaded) setTimedOut(true)
    }, 12000)

    return () => {
      clearInterval(checkLoaded)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      {!loaded && !timedOut && (
        <div className="v9-cal-skeleton">
          <div className="v9-cal-spinner" />
          <p>Loading calendar...</p>
        </div>
      )}
      {timedOut && !loaded && (
        <div className="v9-cal-skeleton" style={{ minHeight: 200 }}>
          <p className="v9-cal-fallback">
            Calendar taking a while to load?{' '}
            <a
              href="https://cal.com/niceright/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book directly on Cal.com
            </a>{' '}
            or{' '}
            <a href="mailto:Marcin@uxoxo.xyz">email me</a>.
          </p>
        </div>
      )}
      <div
        id="cal-embed-v9"
        role="region"
        aria-label="Book a call with Marcin"
        style={{
          width: '100%',
          minHeight: loaded ? 500 : 0,
          overflow: 'auto',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </>
  )
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const header = section.querySelector('.v9-contact-header')
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top bottom-=80',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      const cards = section.querySelectorAll('.v9-contact-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=40',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section ref={sectionRef} id="contact" className="v9-contact v9-section-dark">
        <div className="v9-contact-container">
          <div className="v9-contact-header">
            <h2 className="v9-contact-heading">
              Let&apos;s figure out what would work for your business
            </h2>
            <p className="v9-contact-sub">
              30 minutes. Pick a time that works for you.
            </p>
          </div>

          <div className="v9-cal-container">
            <CalEmbed />
          </div>

          <p className="v9-contact-prefer">Prefer to reach out directly?</p>

          <div className="v9-contact-methods">
            <a href="mailto:Marcin@uxoxo.xyz" className="v9-contact-card">
              <div className="v9-contact-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="v9-contact-card-text">
                <strong>Email</strong>
                <span>Marcin@uxoxo.xyz</span>
              </div>
            </a>
            <a
              href="https://linkedin.com/in/mklaudiusz"
              target="_blank"
              rel="noopener noreferrer"
              className="v9-contact-card"
            >
              <div className="v9-contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </div>
              <div className="v9-contact-card-text">
                <strong>LinkedIn</strong>
                <span>Connect with me</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .v9-contact {
          padding: 120px 0;
        }

        .v9-section-dark {
          background: #0C1117;
        }

        .v9-contact-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .v9-contact-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .v9-contact-heading {
          font-family: 'Inter', -apple-system, sans-serif;
          font-weight: 700;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          color: #ffffff;
          margin: 0 0 16px 0;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .v9-contact-sub {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 17px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.55);
          margin: 0;
          line-height: 1.5;
        }

        .v9-cal-container {
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 48px;
        }

        .v9-cal-skeleton {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 16px;
        }

        .v9-cal-skeleton p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.4);
          margin: 0;
        }

        .v9-cal-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: #0B8A6E;
          border-radius: 50%;
          animation: v9Spin 0.8s linear infinite;
        }

        @keyframes v9Spin {
          to { transform: rotate(360deg); }
        }

        .v9-cal-fallback {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
          max-width: 360px;
          line-height: 1.6;
        }

        .v9-cal-fallback a {
          color: #06D6A0;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .v9-cal-fallback a:hover {
          opacity: 0.8;
        }

        .v9-contact-prefer {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.35);
          text-align: center;
          margin: 0 0 24px 0;
        }

        .v9-contact-methods {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .v9-contact-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #1F2937;
          border-radius: 12px;
          padding: 16px 24px;
          text-decoration: none;
          min-width: 220px;
          transition: transform 0.25s cubic-bezier(0.33, 1, 0.68, 1),
                      box-shadow 0.25s ease,
                      background 0.25s ease;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .v9-contact-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 24px rgba(6, 214, 160, 0.12);
          background: #263344;
        }

        .v9-contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(11, 138, 110, 0.15), rgba(6, 214, 160, 0.1));
          color: #06D6A0;
          flex-shrink: 0;
        }

        .v9-contact-card-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .v9-contact-card-text strong {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
        }

        .v9-contact-card-text span {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.45);
        }

        /* Responsive */
        @media (max-width: 640px) {
          .v9-contact {
            padding: 80px 0;
          }

          .v9-contact-methods {
            flex-direction: column;
            align-items: center;
          }

          .v9-contact-card {
            width: 100%;
            max-width: 320px;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .v9-contact-header,
          .v9-contact-card {
            opacity: 1 !important;
            transform: none !important;
          }

          .v9-cal-spinner {
            animation: none;
          }
        }
      `}</style>
    </>
  )
}
