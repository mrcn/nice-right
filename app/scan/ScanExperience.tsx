'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import type { ScanFinding, ScanPartialFlags } from '@/app/lib/scan-cache';
import { mapLeadError, mapScanError, type ApiErrorBody } from './error-map';
import {
  TurnstileField,
  type TurnstileFieldHandle,
} from './TurnstileField';

type ScanSuccess = {
  ok: true;
  scanId: string;
  score: number;
  findings: ScanFinding[];
  partial?: ScanPartialFlags;
  cached?: boolean;
  websiteUrl: string;
  businessName: string;
  city: string;
};

type Phase = 'idle' | 'scanning' | 'scanned' | 'emailing' | 'emailed';

/** Client abort slightly above route maxDuration (60s). */
const SCAN_CLIENT_TIMEOUT_MS = 65_000;

function isValidUrl(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;
  try {
    const withScheme = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    const u = new URL(withScheme);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function normalizeUrlInput(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function ScanExperience() {
  const turnstileRef = useRef<TurnstileFieldHandle>(null);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [scanError, setScanError] = useState('');
  const [leadError, setLeadError] = useState('');
  const [result, setResult] = useState<ScanSuccess | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const scanStartedAt = useRef<number | null>(null);

  const resetTurnstile = useCallback(() => {
    turnstileRef.current?.reset();
  }, []);

  useEffect(() => {
    if (phase !== 'scanning') {
      setElapsedSec(0);
      scanStartedAt.current = null;
      return;
    }
    scanStartedAt.current = Date.now();
    const id = window.setInterval(() => {
      if (scanStartedAt.current) {
        setElapsedSec(
          Math.floor((Date.now() - scanStartedAt.current) / 1000),
        );
      }
    }, 500);
    return () => window.clearInterval(id);
  }, [phase]);

  async function handleScan(e: FormEvent) {
    e.preventDefault();
    setFormError('');
    setScanError('');
    setLeadError('');

    const name = businessName.trim();
    const cityVal = city.trim();
    const url = normalizeUrlInput(websiteUrl);

    if (!isValidUrl(url)) {
      setFormError('Enter a valid website URL (https://…).');
      return;
    }
    if (name.length < 2 || name.length > 200) {
      setFormError('Business name must be 2–200 characters.');
      return;
    }
    if (cityVal.length < 2 || cityVal.length > 120) {
      setFormError('City must be 2–120 characters.');
      return;
    }

    const token = turnstileRef.current?.getToken() || turnstileToken;
    if (!token) {
      setFormError('Complete the bot check, then try again.');
      return;
    }

    setPhase('scanning');
    setStatusMessage(
      'Scanning your digital footprint — this often takes 10–60 seconds…',
    );
    setWebsiteUrl(url);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(
      () => controller.abort(),
      SCAN_CLIENT_TIMEOUT_MS,
    );

    try {
      const res = await fetch('/api/scan/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websiteUrl: url,
          businessName: name,
          city: cityVal,
          turnstileToken: token,
        }),
        signal: controller.signal,
      });

      let body: (ScanSuccess & ApiErrorBody) | null = null;
      try {
        body = (await res.json()) as ScanSuccess & ApiErrorBody;
      } catch {
        body = null;
      }

      if (!res.ok || !body?.ok) {
        setScanError(mapScanError(res.status, body));
        setStatusMessage('');
        setPhase(result ? 'scanned' : 'idle');
        return;
      }

      setResult(body);
      setStatusMessage('Scan complete. Score and findings below.');
      setPhase('scanned');
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setScanError(
          'The scan timed out on this connection. Please retry — long scans can take up to a minute.',
        );
      } else {
        setScanError('Network error. Check your connection and retry.');
      }
      setStatusMessage('');
      setPhase(result ? 'scanned' : 'idle');
    } finally {
      window.clearTimeout(timeoutId);
      // Tokens are single-use — always reset after scan attempt
      resetTurnstile();
    }
  }

  async function handleLead(e: FormEvent) {
    e.preventDefault();
    setLeadError('');

    if (!result?.scanId) {
      setLeadError('Run a scan first, then request the report.');
      return;
    }

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setLeadError('Enter a valid email address.');
      return;
    }

    const token = turnstileRef.current?.getToken() || turnstileToken;
    if (!token) {
      setLeadError('Complete the bot check, then try again.');
      return;
    }

    setPhase('emailing');
    setStatusMessage('Sending your full report…');

    try {
      const res = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          turnstileToken: token,
          scanId: result.scanId,
          marketingConsent: marketingConsent === true,
        }),
      });

      let body: (ApiErrorBody & { ok?: boolean; duplicate?: boolean }) | null =
        null;
      try {
        body = (await res.json()) as ApiErrorBody & {
          ok?: boolean;
          duplicate?: boolean;
        };
      } catch {
        body = null;
      }

      if (!res.ok || !body?.ok) {
        setLeadError(mapLeadError(res.status, body));
        setStatusMessage('');
        setPhase('scanned');
        return;
      }

      setStatusMessage(
        body.duplicate
          ? 'Report already sent for this email and scan. Check your inbox.'
          : 'Report sent. Check your inbox — and book a strategy call if you want help acting on it.',
      );
      setPhase('emailed');
    } catch {
      setLeadError('Network error. Check your connection and retry.');
      setStatusMessage('');
      setPhase('scanned');
    } finally {
      resetTurnstile();
    }
  }

  const scanning = phase === 'scanning';
  const emailing = phase === 'emailing';
  const showEmailGate = result !== null;

  return (
    <div className="scan-page">
      <section className="scan-hero" aria-labelledby="scan-heading">
        <p className="scan-eyebrow">Digital Footprint Scanner</p>
        <h1 id="scan-heading">See how your business shows up online</h1>
        <p className="scan-lede">
          Free snapshot score and headlines — no email required. Email the full
          report when you want the details.
        </p>
      </section>

      <div
        className="scan-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        data-testid="scan-status"
      >
        {scanning && (
          <p>
            {statusMessage}
            {elapsedSec > 0 ? ` (${elapsedSec}s)` : ''}
            {elapsedSec >= 20
              ? ' Still working — PageSpeed can take up to a minute.'
              : ''}
          </p>
        )}
        {!scanning && statusMessage && <p>{statusMessage}</p>}
      </div>

      <div
        className="scan-alerts"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-testid="scan-alerts"
      >
        {formError && <p className="scan-error">{formError}</p>}
        {scanError && <p className="scan-error">{scanError}</p>}
        {leadError && <p className="scan-error">{leadError}</p>}
      </div>

      <section className="scan-card" aria-label="Scan form">
        <form onSubmit={handleScan} noValidate data-testid="scan-form">
          <div className="scan-field">
            <label htmlFor="scan-url">Website URL</label>
            <input
              id="scan-url"
              name="websiteUrl"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://yourbusiness.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              disabled={scanning || emailing}
              required
              aria-required="true"
            />
          </div>
          <div className="scan-field">
            <label htmlFor="scan-name">Business name</label>
            <input
              id="scan-name"
              name="businessName"
              type="text"
              autoComplete="organization"
              placeholder="Acme Plumbing"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              disabled={scanning || emailing}
              required
              aria-required="true"
              minLength={2}
              maxLength={200}
            />
          </div>
          <div className="scan-field">
            <label htmlFor="scan-city">City</label>
            <input
              id="scan-city"
              name="city"
              type="text"
              autoComplete="address-level2"
              placeholder="Austin"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={scanning || emailing}
              required
              aria-required="true"
              minLength={2}
              maxLength={120}
            />
          </div>

          <TurnstileField
            ref={turnstileRef}
            action="scan"
            onTokenChange={setTurnstileToken}
          />

          <button
            type="submit"
            className="scan-btn"
            disabled={scanning || emailing || !turnstileToken}
            data-testid="scan-submit"
          >
            {scanning ? 'Scanning…' : 'Run free scan'}
          </button>
        </form>
      </section>

      {result && (
        <section
          className="scan-results"
          aria-labelledby="scan-results-heading"
          data-testid="scan-results"
        >
          <h2 id="scan-results-heading">Your free snapshot</h2>
          <div className="scan-score-block">
            <p className="scan-score-label">Footprint score</p>
            <p
              className="scan-score-value"
              data-testid="scan-score"
              aria-label={`Score ${result.score} out of 100`}
            >
              {result.score}
              <span className="scan-score-max">/100</span>
            </p>
            {result.partial && (
              <p className="scan-partial">
                Partial result — some providers did not respond; score uses the
                signals we got.
              </p>
            )}
            {result.cached && (
              <p className="scan-cached">Showing a recent cached scan.</p>
            )}
          </div>

          <h3 className="scan-findings-heading">Headline findings</h3>
          <ul className="scan-findings" data-testid="scan-findings">
            {result.findings.slice(0, 3).map((f) => (
              <li key={f.title}>
                <strong>{f.title}</strong>
                <p>{f.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {showEmailGate && (
        <section
          className="scan-card scan-email-gate"
          aria-labelledby="scan-email-heading"
          data-testid="scan-email-gate"
        >
          <h2 id="scan-email-heading">Email the full report</h2>
          <p className="scan-email-lede">
            Get the detailed breakdown plus next-step levers. Bot check runs on
            submit — the email field stays visible.
          </p>
          <form onSubmit={handleLead} noValidate data-testid="lead-form">
            <div className="scan-field">
              <label htmlFor="scan-email">Email</label>
              <input
                id="scan-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailing || phase === 'emailed'}
                required
                aria-required="true"
              />
            </div>
            <label className="scan-consent">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                disabled={emailing || phase === 'emailed'}
                data-testid="marketing-consent"
              />
              <span>
                Also add me to Nice Right updates (optional — unchecked by
                default)
              </span>
            </label>

            {/* Shared Turnstile lives above on the scan form; reset covers email
                POSTs too. Re-show a note so email submit is clearly protected. */}
            <p className="scan-turnstile-note">
              Uses the same bot check above — it resets after every submit.
            </p>

            <button
              type="submit"
              className="scan-btn scan-btn-secondary"
              disabled={
                emailing || phase === 'emailed' || !turnstileToken || !result
              }
              data-testid="lead-submit"
            >
              {emailing
                ? 'Sending…'
                : phase === 'emailed'
                  ? 'Report sent'
                  : 'Email my report'}
            </button>
          </form>

          {phase === 'emailed' && (
            <div className="scan-post-email" data-testid="scan-post-email">
              <a
                href="/#contact"
                className="scan-cta"
                data-analytics="tool_report_cta_click"
              >
                Book a free strategy call
              </a>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
