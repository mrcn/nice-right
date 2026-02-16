'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  {
    initials: 'RP',
    name: 'Roman Panchyshyn',
    role: 'Sr. Manager UX, Northern Trust',
    quote:
      'He delivered not only what was asked for but also provided creative suggestions and improvements that added significant value to the project.',
  },
  {
    initials: 'JC',
    name: 'Jonathan Carstensen',
    role: 'PM, Comrade Web Agency',
    quote:
      'A great approach to breaking down industry terms and technical jargon into easy-to-understand language for clients and stakeholders.',
  },
  {
    initials: 'BS',
    name: 'Britt Skaathun',
    role: 'Asst Professor, UC San Diego',
    quote:
      'He was able to decipher what we wanted and translate that into a working product that exceeded our expectations.',
  },
  {
    initials: 'BJ',
    name: 'Brian Jemilo II',
    role: 'CTO, Shibiko AI',
    quote:
      "It's mind blowing how fast this guy can learn new technologies and apply them effectively to solve real problems.",
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector('.v12-section-header'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      )

      gsap.fromTo(
        el.querySelectorAll('.v12-testimonial'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 70%', once: true },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="v12-section v12-testimonials">
      <div className="v12-container">
        <div className="v12-section-grid">
          <div className="v12-section-number" aria-hidden="true">04</div>
          <div className="v12-section-body">
            <div className="v12-section-header">
              <span className="v12-label">Testimonials</span>
              <h2>What it&apos;s like working together</h2>
            </div>
            <div className="v12-testimonials-grid">
              {testimonials.map((t) => (
                <blockquote key={t.initials} className="v12-testimonial">
                  <p className="v12-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="v12-testimonial-footer">
                    <div className="v12-testimonial-avatar" aria-hidden="true">
                      {t.initials}
                    </div>
                    <div>
                      <cite className="v12-testimonial-name">{t.name}</cite>
                      <div className="v12-testimonial-role">{t.role}</div>
                      <a
                        href="https://www.linkedin.com/in/mklaudiusz/details/recommendations/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="v12-testimonial-verify"
                      >
                        Verify on LinkedIn &rarr;
                      </a>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="v12-rule" aria-hidden="true" />
    </section>
  )
}
