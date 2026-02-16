'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
      elementOrSelector: '#cal-embed-v8',
      calLink: 'niceright/30min',
      layout: 'month_view',
    })
    Cal('ui', {
      hideEventTypeDetails: true,
      layout: 'month_view',
      cssVarsPerTheme: {
        light: {
          'cal-brand': '#0000FF',
          'cal-text': '#0A0A0A',
          'cal-text-emphasis': '#0A0A0A',
          'cal-border-emphasis': '#0A0A0A',
          'cal-bg': '#F5F5F0',
          'cal-bg-emphasis': '#EDEDEA',
        },
      },
    })

    const checkLoaded = setInterval(() => {
      const el = document.getElementById('cal-embed-v8')
      if (el && el.querySelector('iframe')) {
        setLoaded(true)
        clearInterval(checkLoaded)
      }
    }, 500)
    const timeout = setTimeout(() => { if (!loaded) setTimedOut(true) }, 12000)
    return () => { clearInterval(checkLoaded); clearTimeout(timeout) }
  }, [])

  return (
    <>
      {!loaded && !timedOut && (
        <div style={{ padding: 48, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase' as const, fontSize: '0.8rem', letterSpacing: '0.2em', color: '#0A0A0A' }}>
          LOADING CALENDAR...
        </div>
      )}
      {timedOut && !loaded && (
        <div style={{ padding: 48, textAlign: 'center' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase' as const, fontSize: '0.8rem', letterSpacing: '0.1em', color: '#0A0A0A' }}>
            CALENDAR TAKING A WHILE?{' '}
            <a href="https://cal.com/niceright/30min" target="_blank" rel="noopener noreferrer" style={{ color: '#0000FF', textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '4px' }}>
              BOOK DIRECTLY
            </a>{' '}
            OR{' '}
            <a href="mailto:Marcin@uxoxo.xyz" style={{ color: '#0000FF', textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '4px' }}>
              EMAIL ME
            </a>
          </p>
        </div>
      )}
      <div
        id="cal-embed-v8"
        role="region"
        aria-label="Book a call with Marcin"
        style={{
          width: '100%',
          minHeight: loaded ? 500 : 0,
          overflow: 'auto',
          opacity: loaded ? 1 : 0,
        }}
      />
    </>
  )
}

export function ContactSection() {
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
      gsap.set('.v8-hidden', { opacity: 0 })

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
        .v8-contact {
          background: #0A0A0A;
          padding: 120px 0;
          border-top: 3px solid #0A0A0A;
        }

        .v8-contact-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .v8-contact-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 4rem);
          text-transform: uppercase;
          color: #F5F5F0;
          letter-spacing: -0.02em;
          line-height: 0.95;
          margin: 0 0 24px;
          max-width: 900px;
        }

        .v8-contact-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #F5F5F0;
          opacity: 0.6;
          margin: 0 0 64px;
        }

        .v8-cal-container {
          background: #F5F5F0;
          border: 3px solid #F5F5F0;
          padding: 24px;
          margin-bottom: 64px;
        }

        .v8-contact-direct-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #F5F5F0;
          opacity: 0.5;
          margin: 0 0 24px;
        }

        .v8-contact-methods {
          display: flex;
          gap: 0;
        }

        .v8-contact-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px 32px;
          border: 3px solid #F5F5F0;
          text-decoration: none;
          color: #F5F5F0;
          border-radius: 0;
        }

        .v8-contact-card + .v8-contact-card {
          border-left: none;
        }

        .v8-contact-card:hover {
          background: #F5F5F0;
          color: #0A0A0A;
        }

        .v8-contact-card:hover .v8-contact-icon svg {
          color: #0A0A0A;
        }

        .v8-contact-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .v8-contact-icon svg {
          color: #F5F5F0;
        }

        .v8-contact-card-label {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: block;
        }

        .v8-contact-card-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.7;
          display: block;
          margin-top: 4px;
        }

        @media (max-width: 900px) {
          .v8-contact {
            padding: 80px 0;
          }

          .v8-contact-inner {
            padding: 0 20px;
          }

          .v8-contact-methods {
            flex-direction: column;
          }

          .v8-contact-card + .v8-contact-card {
            border-left: 3px solid #F5F5F0;
            border-top: none;
          }

          .v8-cal-container {
            padding: 16px;
          }
        }

        @media (max-width: 600px) {
          .v8-contact-heading {
            font-size: clamp(1.8rem, 8vw, 2.5rem);
          }

          .v8-contact-card {
            padding: 20px 24px;
          }
        }
      `}</style>

      <section ref={sectionRef} id="contact" className="v8-contact">
        <div className="v8-contact-inner">
          <h2 className="v8-contact-heading v8-hidden v8-pop">
            LET&apos;S FIGURE OUT WHAT WOULD WORK FOR YOUR BUSINESS
          </h2>
          <p className="v8-contact-sub v8-hidden v8-pop">
            30 MINUTES. PICK A TIME THAT WORKS FOR YOU.
          </p>

          <div className="v8-cal-container v8-hidden v8-pop">
            <CalEmbed />
          </div>

          <p className="v8-contact-direct-label v8-hidden v8-pop">PREFER TO REACH OUT DIRECTLY?</p>

          <div className="v8-contact-methods v8-hidden v8-pop">
            <a href="mailto:Marcin@uxoxo.xyz" className="v8-contact-card">
              <div className="v8-contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="0" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <span className="v8-contact-card-label">EMAIL</span>
                <span className="v8-contact-card-value">Marcin@uxoxo.xyz</span>
              </div>
            </a>
            <a
              href="https://linkedin.com/in/mklaudiusz"
              target="_blank"
              rel="noopener noreferrer"
              className="v8-contact-card"
            >
              <div className="v8-contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </div>
              <div>
                <span className="v8-contact-card-label">LINKEDIN</span>
                <span className="v8-contact-card-value">CONNECT WITH ME</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
