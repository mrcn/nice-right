'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Testimonial {
  initials: string
  name: string
  role: string
  quote: string
}

const testimonials: Testimonial[] = [
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
  const trackRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<gsap.core.Tween | null>(null)
  const activeIndexRef = useRef(0)

  const updateDots = useCallback((index: number) => {
    if (!dotsRef.current) return
    const dots = dotsRef.current.querySelectorAll('.v9-testimonial-dot')
    dots.forEach((dot, i) => {
      dot.classList.toggle('v9-testimonial-dot-active', i === index)
    })
    activeIndexRef.current = index
  }, [])

  const scrollToSlide = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const slides = track.querySelectorAll('.v9-testimonial-slide')
      if (!slides[index]) return
      const slide = slides[index] as HTMLElement
      const trackRect = track.getBoundingClientRect()
      const slideRect = slide.getBoundingClientRect()
      const scrollLeft =
        track.scrollLeft +
        (slideRect.left - trackRect.left) -
        (trackRect.width - slideRect.width) / 2
      track.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      updateDots(index)
    },
    [updateDots]
  )

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const ctx = gsap.context(() => {
      // 1. Header reveal
      const header = section.querySelector('.v9-testimonials-header')
      if (header && !prefersReduced) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      // 2. Slide cards reveal
      const slides = track.querySelectorAll('.v9-testimonial-slide')
      if (slides.length && !prefersReduced) {
        gsap.fromTo(
          slides,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: track,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }
    }, section)

    // 3. Scroll detection for dot indicators
    const handleScroll = () => {
      const slides = track.querySelectorAll('.v9-testimonial-slide')
      const trackRect = track.getBoundingClientRect()
      const trackCenter = trackRect.left + trackRect.width / 2
      let closestIndex = 0
      let closestDist = Infinity

      slides.forEach((slide, i) => {
        const rect = slide.getBoundingClientRect()
        const slideCenter = rect.left + rect.width / 2
        const dist = Math.abs(slideCenter - trackCenter)
        if (dist < closestDist) {
          closestDist = dist
          closestIndex = i
        }
      })

      if (closestIndex !== activeIndexRef.current) {
        updateDots(closestIndex)
      }
    }

    track.addEventListener('scroll', handleScroll, { passive: true })

    // 4. Auto-advance (subtle, stops on user interaction)
    let userInteracted = false

    const stopAutoplay = () => {
      userInteracted = true
      if (autoplayRef.current) {
        autoplayRef.current.kill()
        autoplayRef.current = null
      }
    }

    track.addEventListener('pointerdown', stopAutoplay, { once: true })
    track.addEventListener('wheel', stopAutoplay, {
      once: true,
      passive: true,
    })

    if (!prefersReduced) {
      const autoAdvance = () => {
        if (userInteracted) return
        const nextIndex =
          (activeIndexRef.current + 1) % testimonials.length
        scrollToSlide(nextIndex)
      }

      // Start auto-advance after a delay
      const autoTimer = gsap.delayedCall(5, () => {
        if (userInteracted) return
        autoAdvance()
        autoplayRef.current = gsap.delayedCall(5, function repeat() {
          if (userInteracted) return
          autoAdvance()
          autoplayRef.current = gsap.delayedCall(5, repeat)
        })
      })

      return () => {
        ctx.revert()
        track.removeEventListener('scroll', handleScroll)
        autoTimer.kill()
        if (autoplayRef.current) autoplayRef.current.kill()
      }
    }

    return () => {
      ctx.revert()
      track.removeEventListener('scroll', handleScroll)
    }
  }, [scrollToSlide, updateDots])

  return (
    <>
      <section ref={sectionRef} className="v9-testimonials v9-section-light">
        <div className="v9-testimonials-container">
          {/* Header */}
          <div className="v9-testimonials-header">
            <p className="v9-section-label v9-section-label-dark">
              Testimonials
            </p>
            <h2 className="v9-testimonials-heading">
              What it&apos;s like working together
            </h2>
          </div>
        </div>

        {/* Carousel */}
        <div ref={trackRef} className="v9-testimonials-track">
          {testimonials.map((t) => (
            <blockquote className="v9-testimonial-slide" key={t.initials}>
              <div className="v9-quote-mark" aria-hidden="true">
                &ldquo;
              </div>
              <p className="v9-quote-text">{t.quote}</p>
              <footer className="v9-testimonial-footer">
                <div className="v9-testimonial-avatar" aria-hidden="true">
                  {t.initials}
                </div>
                <div className="v9-testimonial-meta">
                  <cite className="v9-testimonial-name">{t.name}</cite>
                  <div className="v9-testimonial-role">{t.role}</div>
                  <a
                    href="https://www.linkedin.com/in/mklaudiusz/details/recommendations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v9-testimonial-verify"
                  >
                    Verify on LinkedIn &rarr;
                  </a>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Dot indicators */}
        <div ref={dotsRef} className="v9-testimonials-dots">
          {testimonials.map((t, i) => (
            <button
              key={t.initials}
              className={`v9-testimonial-dot${
                i === 0 ? ' v9-testimonial-dot-active' : ''
              }`}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to testimonial from ${t.name}`}
            />
          ))}
        </div>
      </section>

      <style>{`
        /* ================================================
           TESTIMONIALS SECTION — LIGHT, HORIZONTAL CAROUSEL
           ================================================ */

        .v9-testimonials {
          position: relative;
          background: #FFFFFF;
          padding: clamp(80px, 10vw, 140px) 0 clamp(60px, 8vw, 100px) 0;
          overflow: hidden;
        }

        .v9-testimonials-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* --- Header --- */

        .v9-testimonials-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .v9-section-label-dark {
          color: #0B8A6E;
        }

        .v9-testimonials-heading {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: clamp(2rem, 4.5vw, 3rem);
          font-weight: 700;
          line-height: 1.15;
          color: #0F172A;
          margin: 0;
        }

        /* --- Carousel track --- */

        .v9-testimonials-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;

          /* Padding for peek effect: left/right peek cards show partially */
          padding: 8px calc((100vw - min(85vw, 600px)) / 2) 24px;

          /* Hide scrollbar */
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .v9-testimonials-track::-webkit-scrollbar {
          display: none;
        }

        /* --- Slide card --- */

        .v9-testimonial-slide {
          flex: 0 0 min(85vw, 600px);
          width: min(85vw, 600px);
          scroll-snap-align: center;
          background: #FFFFFF;
          border: 1px solid rgba(15, 23, 42, 0.06);
          border-radius: 20px;
          padding: 48px;
          margin: 0;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04),
                      0 1px 4px rgba(0, 0, 0, 0.03);
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }

        .v9-testimonial-slide:hover {
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.07),
                      0 2px 8px rgba(0, 0, 0, 0.04);
        }

        /* --- Quote mark --- */

        .v9-quote-mark {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 4rem;
          line-height: 1;
          color: #0B8A6E;
          margin-bottom: 8px;
          user-select: none;
        }

        /* --- Quote text --- */

        .v9-quote-text {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1.1rem;
          font-weight: 400;
          line-height: 1.8;
          color: #334155;
          margin: 0 0 32px 0;
        }

        /* --- Footer / attribution --- */

        .v9-testimonial-footer {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .v9-testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0B8A6E 0%, #06D6A0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: 0.02em;
          flex-shrink: 0;
        }

        .v9-testimonial-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .v9-testimonial-name {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          font-style: normal;
          color: #0F172A;
          line-height: 1.3;
        }

        .v9-testimonial-role {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          color: #94A3B8;
          line-height: 1.3;
        }

        .v9-testimonial-verify {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          color: #0B8A6E;
          text-decoration: none;
          transition: color 0.2s ease;
          line-height: 1.3;
          margin-top: 2px;
        }

        .v9-testimonial-verify:hover {
          color: #06D6A0;
        }

        /* --- Dot indicators --- */

        .v9-testimonials-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 32px;
        }

        .v9-testimonial-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          padding: 0;
          background: #CBD5E1;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease, width 0.3s ease;
        }

        .v9-testimonial-dot:hover {
          background: #94A3B8;
        }

        .v9-testimonial-dot-active {
          background: #0B8A6E;
          width: 24px;
          border-radius: 4px;
        }

        /* --- Responsive --- */

        @media (max-width: 640px) {
          .v9-testimonial-slide {
            padding: 32px 24px;
            flex: 0 0 min(88vw, 400px);
            width: min(88vw, 400px);
          }

          .v9-testimonials-track {
            padding-left: calc((100vw - min(88vw, 400px)) / 2);
            padding-right: calc((100vw - min(88vw, 400px)) / 2);
          }

          .v9-quote-mark {
            font-size: 3rem;
          }

          .v9-quote-text {
            font-size: 1rem;
            line-height: 1.7;
          }

          .v9-testimonials-heading {
            font-size: clamp(1.7rem, 6vw, 2.2rem);
          }
        }

        @media (max-width: 480px) {
          .v9-testimonials {
            padding: 64px 0 48px 0;
          }

          .v9-testimonials-header {
            margin-bottom: 40px;
          }

          .v9-testimonial-slide {
            padding: 28px 20px;
          }
        }

        /* --- Reduced motion --- */

        @media (prefers-reduced-motion: reduce) {
          .v9-testimonials-header,
          .v9-testimonial-slide {
            opacity: 1 !important;
            transform: none !important;
          }

          .v9-testimonials-track {
            scroll-behavior: auto;
          }

          .v9-testimonial-dot,
          .v9-testimonial-dot-active {
            transition: none;
          }
        }
      `}</style>
    </>
  )
}
