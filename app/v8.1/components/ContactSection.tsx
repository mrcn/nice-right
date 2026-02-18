'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function CalEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    const w = window as unknown as Record<string, unknown>;
    const Cal = function (...args: unknown[]) {
      const cal = Cal as unknown as {
        loaded?: boolean;
        ns: Record<string, unknown>;
        q: unknown[][];
      };
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        const script = document.createElement('script');
        script.src = 'https://app.cal.com/embed/embed.js';
        script.async = true;
        document.head.appendChild(script);
        cal.loaded = true;
      }
      if (args[0] === 'init') {
        const api = function (...a: unknown[]) {
          (api as unknown as { q: unknown[][] }).q =
            (api as unknown as { q: unknown[][] }).q || [];
          (api as unknown as { q: unknown[][] }).q.push(a);
        };
        const namespace = args[1];
        (api as unknown as { q: unknown[][] }).q = [];
        if (typeof namespace === 'string') {
          cal.ns[namespace] = cal.ns[namespace] || api;
          (cal.ns[namespace] as unknown as { q: unknown[][] }).q.push(args);
          cal.q.push(['initNamespace', namespace]);
        } else {
          cal.q.push(args);
        }
        return;
      }
      cal.q.push(args);
    };
    (Cal as unknown as { q: unknown[][]; ns: Record<string, unknown> }).q = [];
    (Cal as unknown as { ns: Record<string, unknown> }).ns = {};
    w.Cal = Cal;

    Cal('init', { origin: 'https://cal.com' });
    Cal('inline', {
      elementOrSelector: '#cal-embed-v81',
      calLink: 'niceright/30min',
      layout: 'month_view',
    });
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
          'cal-border': '#0A0A0A',
        },
      },
    });

    const checkLoaded = setInterval(() => {
      const el = document.getElementById('cal-embed-v81');
      if (el && el.querySelector('iframe')) {
        setLoaded(true);
        clearInterval(checkLoaded);
      }
    }, 500);
    const timeout = setTimeout(() => {
      if (!loaded) setTimedOut(true);
    }, 12000);
    return () => {
      clearInterval(checkLoaded);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {!loaded && !timedOut && (
        <div
          style={{
            padding: 48,
            textAlign: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            textTransform: 'uppercase' as const,
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            color: '#0A0A0A',
            background: '#EDEDEA',
            border: '3px dashed #0A0A0A',
          }}
        >
          <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>
            Loading Calendar...
          </span>
        </div>
      )}
      {timedOut && !loaded && (
        <div
          style={{
            padding: 48,
            textAlign: 'center',
            background: '#FFEEEE',
            border: '3px solid #FF0000',
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              textTransform: 'uppercase' as const,
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              color: '#0A0A0A',
              margin: 0,
            }}
          >
            Calendar taking a while?{' '}
            <a
              href="https://cal.com/niceright/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#0000FF',
                textDecoration: 'underline',
                textDecorationThickness: '2px',
                textUnderlineOffset: '4px',
                fontWeight: 700,
              }}
            >
              Book Directly
            </a>{' '}
            or{' '}
            <a
              href="mailto:Marcin@uxoxo.xyz"
              style={{
                color: '#0000FF',
                textDecoration: 'underline',
                textDecorationThickness: '2px',
                textUnderlineOffset: '4px',
                fontWeight: 700,
              }}
            >
              Email Me
            </a>
          </p>
        </div>
      )}
      {!shouldLoad && (
        <div
          ref={containerRef}
          style={{
            padding: 48,
            textAlign: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            color: '#0A0A0A',
            background: '#EDEDEA',
            border: '3px dashed #0A0A0A',
          }}
        >
          <span>Scroll to load calendar</span>
        </div>
      )}
      <div
        ref={shouldLoad ? containerRef : null}
        id="cal-embed-v81"
        role="region"
        aria-label="Book a call with Marcin"
        style={{
          width: '100%',
          minHeight: loaded ? 600 : 0,
          overflow: 'auto',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
          border: loaded ? '3px solid #0A0A0A' : 'none',
        }}
      />
    </>
  );
}

export function ContactSection() {
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
      gsap.set('.v81-reveal', { opacity: 0, y: 40 });

      const reveals = el.querySelectorAll('.v81-reveal');
      reveals.forEach((node, i) => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(node, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.1,
              ease: 'power3.out',
            });
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .v81-contact {
          background: #0A0A0A;
          padding: 140px 0;
          border-top: 3px solid #0A0A0A;
        }

        .v81-contact-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .v81-contact-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .v81-contact-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #0000FF;
          margin: 0 0 16px;
        }

        .v81-contact-heading {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 4rem);
          text-transform: uppercase;
          color: #F5F5F0;
          letter-spacing: -0.02em;
          line-height: 0.95;
          margin: 0 0 24px;
        }

        .v81-contact-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #F5F5F0;
          opacity: 0.7;
          margin: 0 0 24px;
        }

        .v81-contact-urgency {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #FF0000;
          margin-bottom: 12px;
        }

        .v81-urgency-dot {
          width: 8px;
          height: 8px;
          background: #FF0000;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        .v81-contact-guarantee {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #F5F5F0;
          opacity: 0.6;
          margin: 0;
        }

        .v81-contact-what-to-expect {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 3px solid #F5F5F0;
          margin-bottom: 64px;
        }

        .v81-expect-item {
          padding: 32px;
          border-right: 3px solid #F5F5F0;
          text-align: center;
        }

        .v81-expect-item:last-child {
          border-right: none;
        }

        .v81-expect-number {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          color: #FF0000;
          margin: 0 0 8px;
        }

        .v81-expect-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #F5F5F0;
          opacity: 0.8;
          margin: 0;
        }

        .v81-cal-container {
          background: #F5F5F0;
          border: 3px solid #F5F5F0;
          padding: 32px;
          margin-bottom: 64px;
        }

        .v81-contact-direct {
          text-align: center;
        }

        .v81-contact-direct-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #F5F5F0;
          opacity: 0.5;
          margin: 0 0 32px;
        }

        .v81-contact-methods {
          display: inline-flex;
          gap: 0;
          border: 3px solid #F5F5F0;
        }

        .v81-contact-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px 32px;
          background: transparent;
          text-decoration: none;
          color: #F5F5F0;
          border-right: 3px solid #F5F5F0;
          transition: all 0.3s ease;
        }

        .v81-contact-card:last-child {
          border-right: none;
        }

        .v81-contact-card:hover {
          background: #F5F5F0;
          color: #0A0A0A;
        }

        .v81-contact-card:hover svg {
          color: #0000FF;
        }

        .v81-contact-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .v81-contact-icon svg {
          color: #F5F5F0;
          transition: color 0.2s;
        }

        .v81-contact-card-label {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
        }

        .v81-contact-card-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.7;
          display: block;
          margin-top: 4px;
        }

        .v81-reveal {
          opacity: 0;
        }

        @media (max-width: 900px) {
          .v81-contact {
            padding: 100px 0;
          }

          .v81-contact-inner {
            padding: 0 20px;
          }

          .v81-contact-what-to-expect {
            grid-template-columns: 1fr;
          }

          .v81-expect-item {
            border-right: none;
            border-bottom: 3px solid #F5F5F0;
          }

          .v81-expect-item:last-child {
            border-bottom: none;
          }

          .v81-cal-container {
            padding: 16px;
          }

          .v81-contact-methods {
            flex-direction: column;
            width: 100%;
          }

          .v81-contact-card {
            border-right: none;
            border-bottom: 3px solid #F5F5F0;
            justify-content: center;
          }

          .v81-contact-card:last-child {
            border-bottom: none;
          }
        }
      `}</style>

      <section ref={sectionRef} id="contact" className="v81-contact">
        <div className="v81-contact-inner">
          <div className="v81-contact-header v81-reveal">
            <p className="v81-contact-label">Get Started</p>
            <h2 className="v81-contact-heading">
              Let's Figure Out What Would Work for Your Business
            </h2>
            <p className="v81-contact-sub">
              30 minutes. Pick a time that works for you.
            </p>
            <div className="v81-contact-urgency">
              <span className="v81-urgency-dot" />
              <span>Limited spots available this month</span>
            </div>
            <p className="v81-contact-guarantee">
              100% money-back guarantee if you're not satisfied
            </p>
          </div>

          <div className="v81-contact-what-to-expect v81-reveal">
            <div className="v81-expect-item">
              <div className="v81-expect-number">1</div>
              <p className="v81-expect-text">Tell me about your business</p>
            </div>
            <div className="v81-expect-item">
              <div className="v81-expect-number">2</div>
              <p className="v81-expect-text">Get honest recommendations</p>
            </div>
            <div className="v81-expect-item">
              <div className="v81-expect-number">3</div>
              <p className="v81-expect-text">Receive a clear next step</p>
            </div>
          </div>

          <div className="v81-cal-container v81-reveal">
            <CalEmbed />
          </div>

          <div className="v81-contact-direct v81-reveal">
            <p className="v81-contact-direct-label">
              Prefer to reach out directly?
            </p>

            <div className="v81-contact-methods">
              <a href="mailto:Marcin@uxoxo.xyz" className="v81-contact-card">
                <div className="v81-contact-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="0" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <span className="v81-contact-card-label">Email</span>
                  <span className="v81-contact-card-value">
                    Marcin@uxoxo.xyz
                  </span>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/mklaudiusz"
                target="_blank"
                rel="noopener noreferrer"
                className="v81-contact-card"
              >
                <div className="v81-contact-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                  </svg>
                </div>
                <div>
                  <span className="v81-contact-card-label">LinkedIn</span>
                  <span className="v81-contact-card-value">
                    Connect with me
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
