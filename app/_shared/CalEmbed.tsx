'use client';

import { useEffect, useRef, useState } from 'react';
import { trackBookingComplete, getStoredUTMs } from '@/app/lib/analytics';

interface CalEmbedProps {
  /** DOM id for the embed container — must be unique per page */
  embedId: string;
  calLink: string;
  config?: {
    layout?: string;
    theme?: string;
  };
  /** Skeleton / fallback copy, defaults suit the homepage contact section */
  loadingText?: string;
  fallbackText?: React.ReactNode;
  /** Extra inline styles on the embed container */
  containerStyle?: React.CSSProperties;
  /** Extra aria-label on the embed region */
  ariaLabel?: string;
  /** Explicit Cal.com prefill params; UTMs from sessionStorage are merged in automatically */
  prefillParams?: Record<string, string>;
}

export function CalEmbed({
  embedId,
  calLink,
  config = { layout: 'month_view', theme: 'dark' },
  loadingText = 'Loading availability...',
  fallbackText,
  containerStyle,
  ariaLabel = 'Book a call with Marcin',
  prefillParams,
}: CalEmbedProps) {
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

    const storedUTMs = getStoredUTMs();
    const mergedPrefill = { ...storedUTMs, ...prefillParams };

    Cal('init', { origin: 'https://cal.com' });
    Cal('inline', {
      elementOrSelector: `#${embedId}`,
      calLink,
      config: {
        ...config,
        ...(Object.keys(mergedPrefill).length > 0 ? { prefill: mergedPrefill } : {}),
      },
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

    // Track booking completions via postMessage
    function onMessage(e: MessageEvent) {
      if (!e.origin.includes('cal.com')) return;
      const type = e.data?.type ?? e.data?.data?.type;
      if (type === 'bookingSuccessful' || type === 'cal:bookingSuccessful') {
        trackBookingComplete();
      }
    }
    window.addEventListener('message', onMessage);

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
      window.removeEventListener('message', onMessage);
    };
  }, [embedId, calLink]);

  const defaultFallback = (
    <p className="cal-embed-fallback">
      Availability taking a while to load?{' '}
      <a
        href={`https://cal.com/${calLink}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Book directly on Cal.com
      </a>{' '}
      or <a href="mailto:Marcin@uxoxo.xyz">email me</a>.
    </p>
  );

  return (
    <>
      {!loaded && !timedOut && (
        <div className="cal-embed-skeleton">
          <div className="cal-embed-spinner" />
          <p>{loadingText}</p>
        </div>
      )}
      {timedOut && !loaded && (
        <div className="cal-embed-skeleton" style={{ minHeight: 200 }}>
          {fallbackText ?? defaultFallback}
        </div>
      )}
      <div
        id={embedId}
        role="region"
        aria-label={ariaLabel}
        style={{
          width: '100%',
          minHeight: loaded ? 500 : 0,
          overflow: 'auto',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
          ...containerStyle,
        }}
      />

      <style>{`
        .cal-embed-skeleton {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 16px;
        }
        .cal-embed-skeleton p {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
        }
        .cal-embed-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: #0B8A6E;
          border-radius: 50%;
          animation: calEmbedSpin 0.8s linear infinite;
        }
        @keyframes calEmbedSpin {
          to { transform: rotate(360deg); }
        }
        .cal-embed-fallback {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          max-width: 360px;
          line-height: 1.6;
          margin: 0;
        }
        .cal-embed-fallback a {
          color: #06D6A0;
          font-weight: 600;
          text-decoration: none;
        }
        .cal-embed-fallback a:hover {
          text-decoration: underline;
        }
        @media (prefers-reduced-motion: reduce) {
          .cal-embed-spinner { animation: none; }
        }
      `}</style>
    </>
  );
}
