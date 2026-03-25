declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = 'G-ZX3QC73LKS';

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
