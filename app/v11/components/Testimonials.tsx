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
    pull: 'He delivered not only what was asked...',
    quote:
      'He delivered not only what was asked for but also provided creative suggestions and improvements that added significant value to the project.',
  },
  {
    initials: 'JC',
    name: 'Jonathan Carstensen',
    role: 'PM, Comrade Web Agency',
    pull: 'A great approach to breaking down industry terms...',
    quote:
      'A great approach to breaking down industry terms and technical jargon into easy-to-understand language for clients and stakeholders.',
  },
  {
    initials: 'BS',
    name: 'Britt Skaathun',
    role: 'Asst Professor, UC San Diego',
    pull: 'He was able to decipher what we wanted...',
    quote:
      'He was able to decipher what we wanted and translate that into a working product that exceeded our expectations.',
  },
  {
    initials: 'BJ',
    name: 'Brian Jemilo II',
    role: 'CTO, Shibiko AI',
    pull: "It's mind blowing how fast this guy can learn...",
    quote:
      "It's mind blowing how fast this guy can learn new technologies and apply them effectively to solve real problems.",
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.v11-section-header'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        }
      )

      const cards = section.querySelectorAll('.v11-testimonial-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7,
          ease: 'back.out(1.4)',
          stagger: 0.12,
          scrollTrigger: { trigger: cards[0], start: 'top 82%', once: true },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="v11-testimonials">
      <div className="v11-container">
        <div className="v11-section-header">
          <p className="v11-section-label">Testimonials</p>
          <h2>What it&apos;s like working together</h2>
        </div>

        <div className="v11-testimonials-grid">
          {testimonials.map((t) => (
            <blockquote key={t.initials} className="v11-testimonial-card">
              <div className="v11-testimonial-pull">
                &ldquo;{t.pull}&rdquo;
              </div>
              <p className="v11-testimonial-quote">{t.quote}</p>
              <footer className="v11-testimonial-footer">
                <div className="v11-testimonial-avatar" aria-hidden="true">
                  {t.initials}
                </div>
                <div>
                  <cite className="v11-testimonial-name">{t.name}</cite>
                  <div className="v11-testimonial-role">{t.role}</div>
                  <a
                    href="https://www.linkedin.com/in/mklaudiusz/details/recommendations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v11-testimonial-verify"
                  >
                    Verify on LinkedIn &rarr;
                  </a>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="v11-wave-divider v11-wave-divider--to-alt" aria-hidden="true" />
    </section>
  )
}
