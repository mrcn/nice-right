'use client';

import { trackCTAClick } from '@/app/lib/analytics';

export function CaseCTA() {
  return (
    <section className="v9-case-cta">
      <div className="v9-case-cta-inner">
        <p className="v9-case-cta-label">Ready to work together?</p>
        <h2 className="v9-case-cta-heading">Let&rsquo;s build something that works.</h2>
        <a
          href="/#contact"
          className="v9-case-cta-btn"
          onClick={() => trackCTAClick('case_study_footer', 'case_cta')}
        >
          Let&rsquo;s work together
        </a>
      </div>
    </section>
  );
}
