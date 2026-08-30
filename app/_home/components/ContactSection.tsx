'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/app/_shared/gsap-init';
import { trackContactClick } from '@/app/lib/analytics';
import { CalEmbed } from '@/app/_shared/CalEmbed';

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const header = section.querySelector('.v1-contact-header');
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
        );
      }

      const cards = section.querySelectorAll('.v1-contact-card');
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
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="contact"
        className="v1-contact v9-section-dark"
      >
        <div className="v1-wrap">
          {/* Above-grid header */}
          <div className="v1-contact-header">
            <p className="v1-eyebrow">Contact</p>
            <h2 className="v1-contact-heading">
              Let&apos;s find the leak.
            </h2>
            <p className="v1-contact-sub">
              Thirty-minute audit call. We&apos;ll talk through where good local
              prospects drop out and whether the Digital Growth Audit is the right
              next step.
            </p>
          </div>

          {/* Side-by-side grid */}
          <div className="v1-contact-grid">
            {/* Left: Cal embed */}
            <div className="v1-cal-col">
              <div className="v1-cal-label-row">
                <p>Book your audit call</p>
              </div>
              <CalEmbed
                embedId="cal-embed-v9"
                calLink="niceright/30min"
                loadingText="Loading availability..."
                ariaLabel="Book a call with Marcin"
                fallbackText={
                  <p className="cal-embed-fallback">
                    Availability taking a while to load?{' '}
                    <a
                      href="https://cal.com/niceright/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book directly on Cal.com
                    </a>{' '}
                    or <a href="mailto:Marcin@uxoxo.xyz">email me</a>.
                  </p>
                }
              />
            </div>

            {/* Right: Bio */}
            <div className="v1-bio-col">
              <img
                src="/images/marcin-lg.jpeg"
                alt="Marcin Klaudiusz — founder of Nice Right"
                className="v1-bio-photo"
                width={480}
                height={637}
              />

              <h3 className="v1-bio-name">I&apos;m Marcin.</h3>

              <p className="v1-bio-pull">
                &ldquo;Every project I take on,{' '}
                <em>I answer for personally.</em>&rdquo;
              </p>

              <p className="v1-bio-body">
                Since 2013, 100+ projects for small and mid-size businesses. You
                work directly with me.
              </p>

              <div className="v1-bio-stats">
                <div className="v1-bio-stat">
                  <span className="v1-bio-stat-num">2013</span>
                  <span className="v1-bio-stat-label">Started</span>
                </div>
                <div className="v1-bio-stat">
                  <span className="v1-bio-stat-num">100+</span>
                  <span className="v1-bio-stat-label">Projects</span>
                </div>
              </div>

              <hr className="v1-bio-divider" />

              <div className="v1-contact-cards">
                <a
                  href="mailto:Marcin@uxoxo.xyz"
                  className="v1-contact-card"
                  onClick={() => trackContactClick('email')}
                >
                  <div className="v1-contact-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div className="v1-contact-card-text">
                    <strong>Email</strong>
                    <span>Marcin@uxoxo.xyz</span>
                  </div>
                </a>
                <a
                  href="https://linkedin.com/in/mklaudiusz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v1-contact-card"
                  onClick={() => trackContactClick('linkedin')}
                >
                  <div className="v1-contact-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                    </svg>
                  </div>
                  <div className="v1-contact-card-text">
                    <strong>LinkedIn</strong>
                    <span>Connect with me</span>
                  </div>
                </a>
              </div>
            </div>
            {/* /bio-col */}
          </div>
          {/* /contact-grid */}
        </div>
      </section>

      <style>{`
        .v1-contact {
          padding: 120px 0;
        }

        .v9-section-dark {
          background: #0C1117;
        }

        .v1-wrap {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* -- Header -- */
        .v1-contact-header {
          margin-bottom: 56px;
        }

        .v1-eyebrow {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0B8A6E;
          margin: 0 0 12px 0;
        }

        .v1-contact-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 400;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 12px 0;
        }

        .v1-contact-sub {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 17px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.55);
          margin: 0;
        }

        /* -- Grid -- */
        .v1-contact-grid {
          display: grid;
          grid-template-columns: 5fr 4fr;
          gap: 64px;
          align-items: start;
        }

        /* -- Left: Cal -- */
        .v1-cal-col {
          border: 1px solid rgba(6, 214, 160, 0.14);
          border-radius: 16px;
          overflow: hidden;
        }

        .v1-cal-label-row {
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .v1-cal-label-row p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #06D6A0;
          margin: 0;
        }

        /* -- Right: Bio -- */
        .v1-bio-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
          align-items: flex-start;
        }

        .v1-bio-photo {
          width: 240px;
          height: 300px;
          object-fit: cover;
          object-position: center top;
          border-radius: 12px;
          display: block;
          max-width: 100%;
        }

        .v1-bio-name {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 2.4rem;
          font-weight: 400;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
        }

        .v1-bio-pull {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.4;
          margin: 0;
        }

        .v1-bio-pull em {
          color: #06D6A0;
          font-style: italic;
        }

        .v1-bio-body {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.52);
          line-height: 1.78;
          margin: 0;
        }

        .v1-bio-stats {
          display: flex;
          gap: 28px;
        }

        .v1-bio-stat {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .v1-bio-stat-num {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 1.35rem;
          color: #06D6A0;
          letter-spacing: -0.02em;
        }

        .v1-bio-stat-label {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.50);
        }

        .v1-bio-divider {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          margin: 0;
          width: 100%;
        }

        /* -- Contact cards -- */
        .v1-contact-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .v1-contact-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 16px 20px;
          text-decoration: none;
          min-height: 56px;
          transition: border-color 0.2s ease, transform 0.2s ease;
          color: #ffffff;
        }

        .v1-contact-card:hover {
          border-color: #06D6A0;
          transform: translateY(-2px);
        }

        .v1-contact-icon {
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

        .v1-contact-card-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .v1-contact-card-text strong {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
        }

        .v1-contact-card-text span {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.55);
        }

        /* -- Responsive -- */
        @media (max-width: 900px) {
          .v1-contact-grid {
            grid-template-columns: 1fr;
          }
          .v1-bio-col {
            order: -1;
          }
          .v1-cal-col {
            order: 1;
          }
          .v1-bio-photo {
            width: 100%;
            height: auto;
            max-height: 280px;
            aspect-ratio: 4 / 3;
          }
        }

        @media (max-width: 640px) {
          .v1-contact {
            padding: 80px 0;
          }
          .v1-contact-card {
            width: 100%;
          }
        }

        /* -- Reduced motion -- */
        @media (prefers-reduced-motion: reduce) {
          .v1-contact-header,
          .v1-contact-card {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}
