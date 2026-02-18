'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.querySelectorAll('.v81-reveal').forEach((node) => {
        (node as HTMLElement).style.opacity = '1';
        (node as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set('.v81-reveal', { opacity: 0, y: 30 });
      gsap.set('.v81-hero-h1', { opacity: 0, y: 50 });
      gsap.set('.v81-hero-image', { opacity: 0, scale: 0.9, rotation: 0 });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to('.v81-hero-h1', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.2)',
      })
        .to(
          '.v81-hero-sub',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          '.v81-hero-image',
          {
            opacity: 1,
            scale: 1,
            rotation: 3,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.4'
        )
        .to(
          '.v81-trust-line',
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          '.v81-hero-cta-wrap',
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          '.v81-hero-micro',
          {
            opacity: 0.6,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.3'
        );
    }, el);

    gsap.to('.v81-hero-image', {
      y: -80,
      rotation: -2,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .v81-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: #F5F5F0;
          position: relative;
          overflow: hidden;
          padding: 140px 0 100px;
        }

        .v81-hero-inner {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
        }

        .v81-hero-layout {
          display: flex;
          align-items: flex-start;
          gap: 0;
          position: relative;
        }

        .v81-hero-text {
          flex: 1;
          position: relative;
          z-index: 2;
        }

        .v81-hero-h1 {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(4rem, 12vw, 10rem);
          line-height: 0.85;
          color: #0A0A0A;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          margin: 0;
          margin-left: -0.5vw;
          overflow: visible;
        }

        .v81-hero-h1-line2 {
          display: block;
          color: #0A0A0A;
        }

        .v81-hero-h1-line2 .v81-blue {
          color: #0000FF;
          position: relative;
          display: inline-block;
        }

        .v81-hero-h1-line2 .v81-blue::after {
          content: '';
          position: absolute;
          bottom: 0.1em;
          left: 0;
          right: 0;
          height: 0.15em;
          background: #FF0000;
          z-index: -1;
          transform: scaleX(0);
          transform-origin: left;
          animation: underlineGrow 0.8s ease forwards 1.5s;
        }

        @keyframes underlineGrow {
          to { transform: scaleX(1); }
        }

        .v81-hero-sub {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(1.1rem, 2vw, 1.35rem);
          line-height: 1.6;
          color: #0A0A0A;
          max-width: 560px;
          margin: 48px 0 0;
          opacity: 0.9;
        }

        .v81-trust-line {
          display: flex;
          align-items: center;
          gap: 0;
          margin-top: 56px;
          flex-wrap: wrap;
        }

        .v81-trust-item {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #0A0A0A;
          white-space: nowrap;
        }

        .v81-trust-sep {
          width: 8px;
          height: 8px;
          background: #FF0000;
          display: inline-block;
          margin: 0 16px;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .v81-hero-cta-wrap {
          margin-top: 48px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }

        .v81-hero-cta {
          display: inline-block;
          background: #0000FF;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 24px 56px;
          border: 3px solid #0A0A0A;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .v81-hero-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #0A0A0A;
          transition: left 0.3s ease;
          z-index: 0;
        }

        .v81-hero-cta:hover {
          transform: translateY(-3px);
          box-shadow: 8px 8px 0px rgba(10, 10, 10, 0.15);
        }

        .v81-hero-cta:hover::before {
          left: 0;
        }

        .v81-hero-cta span {
          position: relative;
          z-index: 1;
        }

        .v81-hero-micro {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #0A0A0A;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .v81-hero-micro::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #00AA00;
          border-radius: 50%;
          animation: blink 2s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .v81-hero-image {
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%) rotate(3deg);
          width: clamp(220px, 24vw, 400px);
          z-index: 1;
        }

        .v81-hero-image img {
          display: block;
          width: 100%;
          height: auto;
          border: 3px solid #0A0A0A;
          filter: grayscale(20%) contrast(1.1);
          transition: all 0.4s ease;
        }

        .v81-hero-image:hover img {
          filter: grayscale(0%) contrast(1.1);
          transform: rotate(-2deg) scale(1.02);
        }

        .v81-reveal {
          opacity: 0;
        }

        @media (max-width: 900px) {
          .v81-hero {
            padding: 120px 0 80px;
          }

          .v81-hero-inner {
            padding: 0 20px;
          }

          .v81-hero-h1 {
            font-size: clamp(3rem, 11vw, 6rem);
          }

          .v81-hero-image {
            position: relative;
            right: auto;
            top: auto;
            transform: rotate(3deg);
            width: 70%;
            margin: 40px 0 0 auto;
          }

          .v81-hero-layout {
            flex-direction: column;
          }

          .v81-trust-line {
            margin-top: 32px;
          }

          .v81-hero-cta {
            width: 100%;
            text-align: center;
            padding: 20px 32px;
          }
        }

        @media (max-width: 600px) {
          .v81-hero-h1 {
            font-size: clamp(2.5rem, 13vw, 4rem);
          }

          .v81-hero-image {
            width: 80%;
          }
        }
      `}</style>

      <section ref={sectionRef} className="v81-hero">
        <div className="v81-hero-inner">
          <div className="v81-hero-layout">
            <div className="v81-hero-text">
              <h1 className="v81-hero-h1 v81-reveal">
                Grow Your Business.
                <span className="v81-hero-h1-line2">
                  I&apos;ll Handle <span className="v81-blue">The Tech.</span>
                </span>
              </h1>

              <p className="v81-hero-sub v81-reveal">
                Your customers are looking for you right now. I help small
                businesses get found, win more customers, and keep them coming
                back.
              </p>

              <div className="v81-trust-line v81-reveal">
                <span className="v81-trust-item">
                  Chicago&apos;s Northwest Side
                </span>
                <span className="v81-trust-sep" />
                <span className="v81-trust-item">100+ Projects</span>
                <span className="v81-trust-sep" />
                <span className="v81-trust-item">13+ Years</span>
              </div>

              <div className="v81-hero-cta-wrap v81-reveal">
                <a href="#contact" className="v81-hero-cta">
                  <span>Get Your Free Strategy Call</span>
                </a>
                <p className="v81-hero-micro">30 minutes, no commitment</p>
              </div>
            </div>

            <div className="v81-hero-image v81-reveal">
              <img
                src="/images/hero-abstract.svg"
                alt="Nice Right - Web Development Services"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
