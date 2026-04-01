'use client';

import { useEffect, useRef, useState } from 'react';

interface BookingProps {
  /** Unique per-page id — avoids DOM conflicts when navigating between pages */
  embedId: string;
}

export function BookingSection({ embedId }: BookingProps) {
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const initialized = useRef(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

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
      elementOrSelector: `#${embedId}`,
      calLink: 'niceright/30min',
      config: { layout: 'month_view', theme: 'dark' },
    });
    Cal('ui', {
      theme: 'dark',
      hideEventTypeDetails: true,
      layout: 'month_view',
      cssVarsPerTheme: {
        dark: {
          'cal-brand': '#0B8A6E',
          'cal-text': '#F5F5F5',
          'cal-text-emphasis': '#FFFFFF',
          'cal-border-emphasis': '#1F2937',
          'cal-bg': '#0C1117',
          'cal-bg-emphasis': '#1F2937',
        },
      },
    });

    const checkLoaded = setInterval(() => {
      const el = document.getElementById(embedId);
      if (el && el.querySelector('iframe')) {
        loadedRef.current = true;
        setLoaded(true);
        clearInterval(checkLoaded);
      }
    }, 500);

    const timeout = setTimeout(() => {
      if (!loadedRef.current) setTimedOut(true);
    }, 12000);

    return () => {
      clearInterval(checkLoaded);
      clearTimeout(timeout);
    };
  }, [embedId]);

  return (
    <>
      <section className="sys-booking" id="book">
        <div className="sys-booking-inner">
          <div className="sys-booking-header">
            <span className="sys-label">Book a Call</span>
            <h2 className="sys-booking-heading">
              30 minutes. No pitch. Real talk.
            </h2>
            <p className="sys-booking-sub">
              Tell me where you are. I&apos;ll give you a straight read on what&apos;s possible.
            </p>
          </div>

          <div className="sys-cal-wrap">
            {!loaded && !timedOut && (
              <div className="sys-cal-skeleton">
                <div className="sys-spinner" />
                <p>Loading calendar…</p>
              </div>
            )}
            {timedOut && !loaded && (
              <div className="sys-cal-skeleton">
                <p className="sys-cal-fallback">
                  Taking a while?{' '}
                  <a href="https://cal.com/niceright/30min" target="_blank" rel="noopener noreferrer">
                    Book on Cal.com
                  </a>{' '}
                  or <a href="mailto:Marcin@uxoxo.xyz">email me</a>.
                </p>
              </div>
            )}
            <div
              id={embedId}
              role="region"
              aria-label="Booking calendar"
              style={{
                width: '100%',
                minHeight: loaded ? 500 : 0,
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
            />
          </div>

          <div className="sys-booking-alt">
            <a href="mailto:Marcin@uxoxo.xyz" className="sys-booking-email">
              Or email: Marcin@uxoxo.xyz
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .sys-booking {
          background: #0C1117;
          padding: 120px 0 100px;
        }
        .sys-booking-inner {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .sys-booking-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .sys-label {
          display: block;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0B8A6E;
          margin-bottom: 14px;
        }
        .sys-booking-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 400;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 12px;
        }
        .sys-booking-sub {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.95rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
          margin: 0;
          max-width: 440px;
          margin-inline: auto;
        }
        .sys-cal-wrap {
          border: 1px solid rgba(6, 214, 160, 0.14);
          border-radius: 16px;
          overflow: hidden;
          background: #0C1117;
        }
        .sys-cal-skeleton {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 16px;
        }
        .sys-cal-skeleton p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.5);
          margin: 0;
        }
        .sys-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255,255,255,0.08);
          border-top-color: #0B8A6E;
          border-radius: 50%;
          animation: sysSpin 0.8s linear infinite;
        }
        @keyframes sysSpin { to { transform: rotate(360deg); } }
        .sys-cal-fallback {
          text-align: center;
          max-width: 320px;
          line-height: 1.6;
        }
        .sys-cal-fallback a {
          color: #06D6A0;
          font-weight: 600;
          text-decoration: none;
        }
        .sys-cal-fallback a:hover { text-decoration: underline; }
        .sys-booking-alt {
          text-align: center;
          margin-top: 24px;
        }
        .sys-booking-email {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .sys-booking-email:hover { color: #06D6A0; }
        @media (max-width: 640px) {
          .sys-booking { padding: 80px 0; }
          .sys-booking-inner { padding: 0 24px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sys-spinner { animation: none; }
        }
      `}</style>
    </>
  );
}
