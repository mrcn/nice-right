'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
  initials: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    initials: 'RP',
    name: 'Roman Panchyshyn',
    role: 'Sr. Manager UX',
    company: 'Northern Trust',
    quote:
      'He delivered not only what was asked for but also provided creative suggestions and improvements that added significant value to the project.',
  },
  {
    initials: 'JC',
    name: 'Jonathan Carstensen',
    role: 'Project Manager',
    company: 'Comrade Web Agency',
    quote:
      'A great approach to breaking down industry terms and technical jargon into easy-to-understand language for clients and stakeholders.',
  },
  {
    initials: 'BS',
    name: 'Britt Skaathun',
    role: 'Assistant Professor',
    company: 'UC San Diego',
    quote:
      'He was able to decipher what we wanted and translate that into a working product that exceeded our expectations.',
  },
  {
    initials: 'BJ',
    name: 'Brian Jemilo II',
    role: 'CTO',
    company: 'Shibiko AI',
    quote:
      "It's mind blowing how fast this guy can learn new technologies and apply them effectively to solve real problems.",
  },
];

const N = testimonials.length;
// Triple the slides in DOM: [clone copy | real copy | clone copy]
// Starting at the real copy gives us one full set of slides to scroll
// in either direction before hitting a boundary, enabling seamless teleport.
const loopedSlides = [...testimonials, ...testimonials, ...testimonials];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<gsap.core.Tween | null>(null);
  // Tracks which DOM slide index is currently centered
  const domIndexRef = useRef(N);

  const updateDots = useCallback((realIndex: number) => {
    if (!dotsRef.current) return;
    const dots = dotsRef.current.querySelectorAll('.v9-testimonial-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('v9-testimonial-dot-active', i === realIndex);
    });
  }, []);

  // Returns the scrollLeft needed to center a given DOM slide index
  const getScrollLeftFor = useCallback((domIndex: number): number | null => {
    const track = trackRef.current;
    if (!track) return null;
    const slides = track.querySelectorAll('.v9-testimonial-slide');
    const slide = slides[domIndex] as HTMLElement | undefined;
    if (!slide) return null;
    const trackRect = track.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    return (
      track.scrollLeft +
      (slideRect.left - trackRect.left) -
      (trackRect.width - slideRect.width) / 2
    );
  }, []);

  // Instant (no animation) scroll to a DOM index — used for clone teleporting
  const teleportToSlide = useCallback(
    (domIndex: number) => {
      const track = trackRef.current;
      if (!track) return;
      const scrollLeft = getScrollLeftFor(domIndex);
      if (scrollLeft === null) return;
      // Override CSS scroll-behavior for instant jump
      track.style.scrollBehavior = 'auto';
      track.scrollLeft = scrollLeft;
      requestAnimationFrame(() => {
        track.style.scrollBehavior = '';
      });
      domIndexRef.current = domIndex;
    },
    [getScrollLeftFor]
  );

  // Smooth scroll to a DOM index — used for auto-advance and dot navigation
  const scrollToSlide = useCallback(
    (domIndex: number) => {
      const track = trackRef.current;
      if (!track) return;
      const scrollLeft = getScrollLeftFor(domIndex);
      if (scrollLeft === null) return;
      track.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      domIndexRef.current = domIndex;
      updateDots(domIndex % N);
    },
    [getScrollLeftFor, updateDots]
  );

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Start at middle copy's first slide (no animation)
    teleportToSlide(N);
    updateDots(0);

    const ctx = gsap.context(() => {
      const header = section.querySelector('.v9-testimonials-header');
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
        );
      }

      // Animate only the real slides (middle copy), not clones
      const realSlides = track.querySelectorAll(
        '.v9-testimonial-slide[data-real]'
      );
      if (realSlides.length && !prefersReduced) {
        gsap.fromTo(
          realSlides,
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
        );
      }
    }, section);

    let scrollSettleTimer: ReturnType<typeof setTimeout>;

    // After scroll settles: if we landed in a clone zone, silently jump
    // to the matching real slide in the middle copy.
    const checkAndTeleport = () => {
      clearTimeout(scrollSettleTimer);
      const idx = domIndexRef.current;
      if (idx < N) {
        teleportToSlide(idx + N);
      } else if (idx >= 2 * N) {
        teleportToSlide(idx - N);
      }
    };

    const handleScroll = () => {
      const slides = track.querySelectorAll('.v9-testimonial-slide');
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      let closestDomIndex = domIndexRef.current;
      let closestDist = Infinity;

      slides.forEach((slide, i) => {
        const rect = slide.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - trackCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestDomIndex = i;
        }
      });

      const prevRealIndex = domIndexRef.current % N;
      domIndexRef.current = closestDomIndex;
      const newRealIndex = closestDomIndex % N;
      if (newRealIndex !== prevRealIndex) {
        updateDots(newRealIndex);
      }

      // Fallback settle detection for browsers without scrollend
      clearTimeout(scrollSettleTimer);
      scrollSettleTimer = setTimeout(checkAndTeleport, 150);
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    // scrollend fires as soon as smooth scroll animation finishes
    track.addEventListener('scrollend' as string, checkAndTeleport);

    let userInteracted = false;
    const stopAutoplay = () => {
      userInteracted = true;
      autoplayRef.current?.kill();
      autoplayRef.current = null;
    };

    track.addEventListener('pointerdown', stopAutoplay, { once: true });
    track.addEventListener('wheel', stopAutoplay, { once: true, passive: true });

    if (!prefersReduced) {
      const autoAdvance = () => {
        if (userInteracted) return;
        const next = domIndexRef.current + 1;
        // Safety guard: should never hit this in normal use, but just in case
        if (next >= loopedSlides.length) {
          teleportToSlide(N);
          return;
        }
        scrollToSlide(next);
      };

      const autoTimer = gsap.delayedCall(4, () => {
        if (userInteracted) return;
        autoAdvance();
        autoplayRef.current = gsap.delayedCall(5, function repeat() {
          if (userInteracted) return;
          autoAdvance();
          autoplayRef.current = gsap.delayedCall(5, repeat);
        });
      });

      return () => {
        ctx.revert();
        track.removeEventListener('scroll', handleScroll);
        track.removeEventListener('scrollend' as string, checkAndTeleport);
        clearTimeout(scrollSettleTimer);
        autoTimer.kill();
        autoplayRef.current?.kill();
      };
    }

    return () => {
      ctx.revert();
      track.removeEventListener('scroll', handleScroll);
      track.removeEventListener('scrollend' as string, checkAndTeleport);
      clearTimeout(scrollSettleTimer);
    };
  }, [scrollToSlide, updateDots, teleportToSlide]);

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

        {/* Carousel — 3× slides: [clone | real | clone] */}
        <div ref={trackRef} className="v9-testimonials-track">
          {loopedSlides.map((t, i) => {
            const isReal = i >= N && i < 2 * N;
            return (
              <blockquote
                key={`${t.initials}-${i}`}
                className="v9-testimonial-slide"
                data-real={isReal ? '' : undefined}
                aria-hidden={!isReal || undefined}
              >
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
            );
          })}
        </div>

        {/* Dot indicators — always 4, track real index */}
        <div ref={dotsRef} className="v9-testimonials-dots">
          {testimonials.map((t, i) => (
            <button
              key={t.initials}
              className={`v9-testimonial-dot${
                i === 0 ? ' v9-testimonial-dot-active' : ''
              }`}
              onClick={() => scrollToSlide(N + i)}
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
          overflow-x: clip;
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
          padding: 24px calc((100vw - min(85vw, 600px)) / 2) 64px;
          margin-bottom: -40px;

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
          position: relative;
          overflow: hidden;
        }

        .v9-testimonial-slide::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0B8A6E 0%, #06D6A0 100%);
        }

        .v9-testimonial-slide:hover {
          box-shadow: 0 12px 48px rgba(11, 138, 110, 0.12),
                      0 4px 16px rgba(0, 0, 0, 0.06);
          transform: translateY(-4px);
        }

        /* --- Quote mark --- */

        .v9-quote-mark {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 5rem;
          line-height: 1;
          color: #0B8A6E;
          margin-bottom: 4px;
          user-select: none;
          opacity: 0.8;
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
          font-size: 0.8rem;
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
          font-size: 0.8rem;
          font-weight: 400;
          color: #6B7280;
          line-height: 1.3;
        }

        .v9-testimonial-project {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          color: #0B8A6E;
          background: rgba(11, 138, 110, 0.08);
          padding: 4px 10px;
          border-radius: 20px;
          line-height: 1.3;
          margin: 6px 0 4px 0;
          display: inline-block;
        }

        .v9-testimonial-verify {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
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
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          padding: 16px;
          background: #CBD5E1;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease, width 0.3s ease;
          background-clip: content-box;
        }

        .v9-testimonial-dot:hover {
          background: #94A3B8;
        }

        .v9-testimonial-dot-active {
          background: #0B8A6E;
          width: 28px;
          border-radius: 6px;
          background-clip: content-box;
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
  );
}
