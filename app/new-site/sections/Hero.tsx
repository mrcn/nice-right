'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          trustRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5 },
          '-=0.2'
        )
        .fromTo(
          imageRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center pt-24 pb-16"
      style={{ backgroundColor: 'var(--nr-cream)' }}
    >
      <div className="nr-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h1
              ref={headlineRef}
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
              style={{ color: 'var(--nr-navy)' }}
            >
              Your customers are looking for you{' '}
              <span style={{ color: 'var(--nr-amber)' }}>right now</span>.
            </h1>

            <p
              ref={subRef}
              className="text-lg md:text-xl mb-8 max-w-xl"
              style={{ color: 'var(--nr-text-muted)' }}
            >
              I help small businesses get found online and turn their website
              into their best salesperson.
            </p>

            <div ref={trustRef} className="nr-trust-line mb-10">
              <span>100+ projects</span>
              <span>13 years experience</span>
              <span>Chicago&apos;s Northwest Side</span>
            </div>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <a href="#contact" className="nr-btn nr-btn-accent text-base">
                Book a Free Strategy Call
              </a>
              <a
                href="#how-it-works"
                className="nr-btn nr-btn-outline text-base"
              >
                See How It Works
              </a>
            </div>
          </div>

          <div
            ref={imageRef}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div
                className="aspect-square rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background:
                    'linear-gradient(135deg, var(--nr-navy-light) 0%, var(--nr-navy) 100%)',
                }}
              >
                <img
                  src="/images/me-low.jpg"
                  alt="Marcin Dabrowski"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: 'var(--nr-amber)' }}
                  >
                    100+
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: 'var(--nr-navy)' }}
                    >
                      Projects Delivered
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: 'var(--nr-text-dim)' }}
                    >
                      Across 13 years
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
