/**
 * Analytics event catalogue — all GA4 custom events sent by this app.
 *
 * | Event name        | Trigger location                                      |
 * |-------------------|-------------------------------------------------------|
 * | cta_click         | Any CTA button (Hero, Pricing, sections)              |
 * | scroll_depth      | 25/50/75/100% scroll milestones (root layout)         |
 * | section_view      | IntersectionObserver on each named section            |
 * | faq_open          | FAQ accordion item expand                             |
 * | pricing_view      | Pricing tier card enters viewport                     |
 * | booking_complete  | Cal.com postMessage 'bookingSuccessful' (CalEmbed)    |
 * | contact_click     | Email / LinkedIn links in footer / contact section    |
 * | nav_click         | Navigation link click                                 |
 * | element_hover     | Pricing tier / CTA hover (500ms debounce)             |
 * | tool_scan_submit  | /scan form submit (domain-only, no PII)               |
 * | tool_email_capture| /scan email gate success (no email in params)         |
 * | tool_report_cta_click | On-page report CTA → strategy call               |
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = 'G-ZX3QC73LKS';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
type UTMKey = (typeof UTM_KEYS)[number];

/**
 * Read UTM params from the current URL and persist them to sessionStorage
 * under `nr_utm_*` keys.  Safe to call multiple times — only writes when
 * a param is present in the URL.
 */
export function captureUTMs(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((key: UTMKey) => {
    const value = params.get(key);
    if (value) {
      sessionStorage.setItem(`nr_${key}`, value);
    }
  });
}

/**
 * Return all previously captured UTM values from sessionStorage.
 * Keys are plain UTM names (e.g. `utm_source`), not the `nr_` prefixed storage keys.
 */
export function getStoredUTMs(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const result: Record<string, string> = {};
  UTM_KEYS.forEach((key: UTMKey) => {
    const value = sessionStorage.getItem(`nr_${key}`);
    if (value) {
      result[key] = value;
    }
  });
  return result;
}

function track(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, { ...params, send_to: GA_ID });
}

export function trackCTAClick(location: string, section: string) {
  track('cta_click', {
    location,
    section,
    page: window.location.pathname,
  });
}

export function trackScrollDepth(depth: 25 | 50 | 75 | 100) {
  track('scroll_depth', {
    depth,
    page: window.location.pathname,
  });
}

export function trackSectionView(sectionName: string) {
  track('section_view', {
    section_name: sectionName,
    page: window.location.pathname,
  });
}

export function trackFAQOpen(question: string, index: number) {
  track('faq_open', {
    question,
    index,
    page: window.location.pathname,
  });
}

export function trackPricingView(tierName: string) {
  track('pricing_view', {
    tier_name: tierName,
    page: window.location.pathname,
  });
}

export function trackBookingComplete() {
  track('booking_complete', {
    page: window.location.pathname,
    referrer: document.referrer || 'direct',
  });
}

export function trackContactClick(method: 'email' | 'linkedin') {
  track('contact_click', {
    method,
    page: window.location.pathname,
  });
}

export function trackNavClick(label: string) {
  track('nav_click', { label, page: window.location.pathname });
}

export function trackElementHover(element: string, params?: Record<string, unknown>) {
  track('element_hover', { element, ...params, page: window.location.pathname });
}

export function trackUnderstandEvent(eventName: string, params?: Record<string, unknown>) {
  track(eventName, {
    product: 'understand',
    ...params,
    page: window.location.pathname,
  });
}

/** Hostname only — never pass raw URL, business name, or email. */
export function domainFromUrl(raw: string): string | undefined {
  try {
    const withScheme = /^https?:\/\//i.test(raw.trim())
      ? raw.trim()
      : `https://${raw.trim()}`;
    const host = new URL(withScheme).hostname.toLowerCase();
    return host || undefined;
  } catch {
    return undefined;
  }
}

export function trackToolScanSubmit(params?: {
  domain?: string;
  cached?: boolean;
  partial?: boolean;
}) {
  track('tool_scan_submit', {
    tool: 'digital_footprint_scanner',
    ...(params?.domain ? { domain: params.domain } : {}),
    ...(typeof params?.cached === 'boolean' ? { cached: params.cached } : {}),
    ...(typeof params?.partial === 'boolean' ? { partial: params.partial } : {}),
    page: window.location.pathname,
  });
}

export function trackToolEmailCapture(params?: {
  marketing_consent?: boolean;
  duplicate?: boolean;
}) {
  track('tool_email_capture', {
    tool: 'digital_footprint_scanner',
    ...(typeof params?.marketing_consent === 'boolean'
      ? { marketing_consent: params.marketing_consent }
      : {}),
    ...(typeof params?.duplicate === 'boolean' ? { duplicate: params.duplicate } : {}),
    page: window.location.pathname,
  });
}

export function trackToolReportCtaClick(location: string) {
  track('tool_report_cta_click', {
    tool: 'digital_footprint_scanner',
    location,
    page: window.location.pathname,
  });
}
