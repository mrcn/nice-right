import { CascadeGrid } from './CascadeGrid'

export function FAQ() {
  return (
    <section id="faq" className="v2-faq">
      <div className="v2-container">
        <div className="v2-faq-header v2-reveal">
          <p className="v2-section-label">Questions</p>
          <h2>Before you book</h2>
        </div>
        <CascadeGrid className="v2-faq-grid v2-faq-flat">
          <div className="v2-faq-item">
            <p className="v2-faq-q">&ldquo;What if I&apos;m not sure what I need?&rdquo;</p>
            <p className="v2-faq-a">
              That&apos;s the most common starting point &mdash; and exactly
              what the free call is for. I&apos;ll look at where your business
              is today and tell you plainly what would move the needle.
              Sometimes it&apos;s a new site. Sometimes it&apos;s three
              changes to the one you have.
            </p>
          </div>
          <div className="v2-faq-item">
            <p className="v2-faq-q">&ldquo;How long until I see results?&rdquo;</p>
            <p className="v2-faq-a">
              Most projects go live within 4&ndash;8 weeks. Quick wins like
              SEO fixes or conversion tweaks often show results within days.
              Bigger outcomes build over your first 2&ndash;3 months.
            </p>
          </div>
          <div className="v2-faq-item">
            <p className="v2-faq-q">&ldquo;Do I own everything you build?&rdquo;</p>
            <p className="v2-faq-a">
              Yes. Your domain, your code, your content. Always. No retainers,
              no lock-in contracts. Payment plans available, designed around
              your cash flow.
            </p>
          </div>
          <div className="v2-faq-item">
            <p className="v2-faq-q">&ldquo;What does it cost?&rdquo;</p>
            <p className="v2-faq-a">
              Most projects range from $3,000 to $15,000 depending on scope.
              I&apos;ll give you an exact quote on our call &mdash; no surprises.
              Payment plans available for every budget.
            </p>
          </div>
        </CascadeGrid>
        <div className="v2-section-cta v2-reveal">
          <a href="#contact" className="v2-btn">Book a Free Call</a>
          <p className="v2-section-cta-micro">30 minutes, no commitment</p>
        </div>
      </div>
      <style>{`
        .v2-faq-flat .v2-faq-item {
          background: transparent;
          box-shadow: none;
          border-radius: 0;
          padding: 24px 0;
          border-bottom: 1px solid var(--v2-border);
        }
        .v2-faq-flat .v2-faq-item:last-child {
          border-bottom: none;
        }
      `}</style>
    </section>
  )
}
