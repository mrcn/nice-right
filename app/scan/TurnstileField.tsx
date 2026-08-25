'use client';

import Script from 'next/script';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type TurnstileWidgetId = string;

type TurnstileRenderOptions = {
  sitekey: string;
  action?: string;
  theme?: 'light' | 'dark' | 'auto';
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
};

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: TurnstileRenderOptions,
  ) => TurnstileWidgetId;
  reset: (widgetId?: TurnstileWidgetId) => void;
  remove?: (widgetId: TurnstileWidgetId) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileFieldHandle = {
  /** Clear token and re-execute — required after every POST (single-use tokens). */
  reset: () => void;
  getToken: () => string;
};

type TurnstileFieldProps = {
  action: string;
  onTokenChange?: (token: string) => void;
  /** Optional override; defaults to NEXT_PUBLIC_TURNSTILE_SITE_KEY. */
  siteKey?: string;
};

/**
 * Explicit Turnstile widget. Tokens are single-use (~300s); callers must
 * `reset()` after every scan and email submit attempt.
 *
 * When no site key is configured (local/e2e), a mock widget issues tokens so
 * Playwright can exercise the flow without Cloudflare.
 */
export const TurnstileField = forwardRef<
  TurnstileFieldHandle,
  TurnstileFieldProps
>(function TurnstileField({ action, onTokenChange, siteKey }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<TurnstileWidgetId | null>(null);
  const tokenRef = useRef('');
  const mockCountRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState('');

  const resolvedKey =
    siteKey ||
    (typeof process !== 'undefined'
      ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
      : undefined) ||
    '';

  const useMock = !resolvedKey;

  const publishToken = useCallback(
    (next: string) => {
      tokenRef.current = next;
      setToken(next);
      onTokenChange?.(next);
    },
    [onTokenChange],
  );

  const issueMockToken = useCallback(() => {
    mockCountRef.current += 1;
    const next = `mock-turnstile-token-${mockCountRef.current}-${Date.now()}`;
    publishToken(next);
  }, [publishToken]);

  const renderWidget = useCallback(() => {
    if (useMock) return;
    if (!containerRef.current || !window.turnstile) return;
    if (widgetIdRef.current !== null) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: resolvedKey,
      action,
      theme: 'dark',
      callback: (t) => publishToken(t),
      'expired-callback': () => publishToken(''),
      'error-callback': () => publishToken(''),
    });
    setReady(true);
  }, [action, publishToken, resolvedKey, useMock]);

  useEffect(() => {
    if (useMock) {
      issueMockToken();
      setReady(true);
      return;
    }
    if (window.turnstile) {
      renderWidget();
    }
  }, [issueMockToken, renderWidget, useMock]);

  useImperativeHandle(
    ref,
    () => ({
      getToken: () => tokenRef.current,
      reset: () => {
        publishToken('');
        if (useMock) {
          issueMockToken();
          return;
        }
        if (widgetIdRef.current !== null && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }),
    [issueMockToken, publishToken, useMock],
  );

  return (
    <div className="scan-turnstile" data-testid="scan-turnstile">
      {useMock ? (
        <p className="scan-turnstile-mock" data-testid="scan-turnstile-mock">
          Bot check ready
          <span className="sr-only">
            {token ? ` token ${token}` : ' waiting for token'}
          </span>
        </p>
      ) : (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onReady={renderWidget}
          />
          <div ref={containerRef} />
          {!ready && (
            <p className="scan-turnstile-loading">Loading bot check…</p>
          )}
        </>
      )}
      <input
        type="hidden"
        name="turnstileToken"
        value={token}
        data-testid="scan-turnstile-token"
        readOnly
      />
    </div>
  );
});
