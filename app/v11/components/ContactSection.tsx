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
      elementOrSelector: '#cal-embed-v11',
      calLink: 'niceright/30min',
      layout: 'month_view',
    })
    Cal('ui', {
      hideEventTypeDetails: true,
      layout: 'month_view',
      cssVarsPerTheme: {
        light: {
          'cal-brand': '#FF6B35',
          'cal-text': '#3D2B1F',
          'cal-text-emphasis': '#3D2B1F',
          'cal-border-emphasis': '#E8D5C0',
          'cal-bg': '#FFF5E6',
          'cal-bg-emphasis': '#FFE8CC',
        },
      },
    })

    const checkLoaded = setInterval(() => {
      const el = document.getElementById('cal-embed-v11')
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
        <div className="v11-cal-skeleton">
          <div className="v11-cal-spinner" />
          <p>Loading calendar...</p>
        </div>
      )}
      {timedOut && !loaded && (
        <div className="v11-cal-skeleton" style={{ minHeight: 200 }}>
          <p className="v11-cal-fallback">
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
        id="cal-embed-v11"
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
      const header = section.querySelector('.v11-contact-header')
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top bottom-=80',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      const cards = section.querySelectorAll('.v11-contact-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.5,
            delay: i * 0.12,
            ease: 'back.out(1.2)',
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
    <section ref={sectionRef} id="contact" className="v11-contact">
      <div className="v11-container">
        <div className="v11-contact-inner">
          <div className="v11-contact-header">
            <h2>Let&apos;s figure out what would work for your business</h2>
            <p>30 minutes. Pick a time that works for you.</p>
          </div>

          <div className="v11-cal-container">
            <CalEmbed />
          </div>

          <p className="v11-contact-prefer">Prefer to reach out directly?</p>

          <div className="v11-contact-methods">
            <a href="mailto:Marcin@uxoxo.xyz" className="v11-contact-card">
              <div className="v11-contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="v11-contact-card-text">
                <strong>Email</strong>
                <span>Marcin@uxoxo.xyz</span>
              </div>
            </a>
            <a
              href="https://linkedin.com/in/mklaudiusz"
              target="_blank"
              rel="noopener noreferrer"
              className="v11-contact-card"
            >
              <div className="v11-contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </div>
              <div className="v11-contact-card-text">
                <strong>LinkedIn</strong>
                <span>Connect with me</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
