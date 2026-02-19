'use client';

import { useEffect, useState } from 'react';

export default function Contact() {
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
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
      elementOrSelector: '#cal-embed-new',
      calLink: 'niceright/30min',
      layout: 'month_view',
    });
    Cal('ui', {
      hideEventTypeDetails: true,
      layout: 'month_view',
      cssVarsPerTheme: {
        light: {
          'cal-brand': '#d4a574',
          'cal-text': '#1A1A1A',
          'cal-text-emphasis': '#1A1A1A',
          'cal-border-emphasis': '#E5E3DE',
          'cal-bg': '#FAFAF8',
          'cal-bg-emphasis': '#F3F1ED',
        },
      },
    });

    const checkLoaded = setInterval(() => {
      const el = document.getElementById('cal-embed-new');
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
  }, [loaded]);

  return (
    <section id="contact" className="nr-section nr-section-alt">
      <div className="nr-container">
        <div className="text-center mb-12">
          <h2 className="mb-4">
            Let's figure out what would work for your business
          </h2>
          <p className="text-lg" style={{ color: 'var(--nr-text-muted)' }}>
            30 minutes. Pick a time that works for you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="nr-card">
            <div
              id="cal-embed-new"
              className="min-h-[600px] flex items-center justify-center"
            >
              {!loaded && !timedOut && (
                <div className="text-center">
                  <div
                    className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                    style={{
                      borderColor: 'var(--nr-border)',
                      borderTopColor: 'var(--nr-amber)',
                    }}
                  />
                  <p style={{ color: 'var(--nr-text-dim)' }}>
                    Loading calendar...
                  </p>
                </div>
              )}
              {timedOut && !loaded && (
                <div className="text-center py-12">
                  <p style={{ color: 'var(--nr-text-muted)' }}>
                    Taking longer than expected.
                  </p>
                  <a
                    href="https://cal.com/niceright/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nr-btn nr-btn-accent mt-4"
                  >
                    Book Directly on Cal.com
                  </a>
                </div>
              )}
            </div>

            <div
              className="mt-8 pt-8 border-t"
              style={{ borderColor: 'var(--nr-border)' }}
            >
              <p
                className="text-center mb-4"
                style={{ color: 'var(--nr-text-muted)' }}
              >
                Prefer to reach out directly?
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="mailto:Marcin@uxoxo.xyz"
                  className="flex items-center gap-2"
                  style={{ color: 'var(--nr-amber)' }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Marcin@uxoxo.xyz
                </a>
                <a
                  href="https://linkedin.com/in/mklaudiusz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  style={{ color: 'var(--nr-amber)' }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
