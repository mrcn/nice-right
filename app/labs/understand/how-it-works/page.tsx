import { UnderstandAnalytics } from '../_components/UnderstandAnalytics';
const playTestingHref = 'https://play.google.com/apps/testing/xyz.uxoxo.understand';

export const metadata = {
  title: 'How Understand Works | An On-Ramp to Difficult Text',
  description: 'Understand turns hard text into listenable retellings: bring text, choose style and closeness, compare with the original, listen, and continue on your phone.',
};

const steps = [
  {
    title: 'Bring difficult text',
    copy: 'Paste old, dense, annoying, intimidating, or beautiful text that you would otherwise avoid or abandon.',
    object: 'Original',
  },
  {
    title: 'Choose how it should be retold',
    copy: 'Pick a retelling style such as plain explainer, bedtime storyteller, or another format that makes the text easier to hear.',
    object: 'Retelling style',
  },
  {
    title: 'Choose how close it should stay',
    copy: 'Closeness controls distance from the source. Close preserves more phrasing. Retold gives the app more room to smooth the text for listening.',
    object: 'Closeness',
  },
  {
    title: 'Check against the original',
    copy: 'For serious text, compare the Understand version with the original and see what changed or stayed close.',
    object: 'Trust check',
  },
  {
    title: 'Listen and continue',
    copy: 'Play the retelling on your phone, keep going, and return later without treating the app like a file manager.',
    object: 'Listening session',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'How Understand Works',
  description: 'Understand turns hard text into listenable retellings through original text, retelling style, closeness, comparison, and phone-native listening.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Understand', item: 'https://niceright.co/labs/understand/' },
      { '@type': 'ListItem', position: 2, name: 'How it works', item: 'https://niceright.co/labs/understand/how-it-works/' },
    ],
  },
};

const contrasts = [
  ['Ordinary TTS', 'Reads the original text aloud, even when the original was never written for the ear.'],
  ['Summarizers', 'Often compress the text so much that the experience no longer feels like reading or listening through the work.'],
  ['Understand', 'Retells the text for listening, while keeping the original nearby when trust matters.'],
];

export default function HowItWorksPage() {
  return (
    <>
      <UnderstandAnalytics />
      <main className="hiw-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hiw-hero">
        <p className="hiw-eyebrow">How it works</p>
        <h1>Difficult text becomes a listenable path.</h1>
        <p className="hiw-lede">
          Understand is not just a voice reading dense prose out loud. It creates an on-ramp: original text, retelling style, closeness, trust check, and phone-native listening.
        </p>
        <div className="hiw-actions">
          <a className="hiw-primary" href={playTestingHref} target="_blank" rel="noopener noreferrer" data-understand-event="understand_play_testing_cta_clicked" data-understand-label="play_testing">Try the Android test</a>
          <a className="hiw-secondary" href="/labs/understand/examples/" data-understand-event="understand_examples_clicked" data-understand-label="examples_index">See examples</a>
        </div>
      </section>

      <section className="hiw-steps">
        {steps.map((step, index) => (
          <article className="hiw-step" key={step.title}>
            <div className="hiw-step-number">{String(index + 1).padStart(2, '0')}</div>
            <div>
              <p className="hiw-object">{step.object}</p>
              <h2>{step.title}</h2>
              <p>{step.copy}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="hiw-card">
        <p className="hiw-eyebrow">Why this is different</p>
        <h2>Generic text-to-speech reads the hard part. Understand works on the hard part first.</h2>
        <div className="hiw-contrast">
          {contrasts.map(([label, copy]) => (
            <div key={label}>
              <strong>{label}</strong>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="hiw-card">
        <p className="hiw-eyebrow">Trust boundary</p>
        <h2>The Understand version does not replace the original.</h2>
        <p>
          The retelling is there to help comprehension and listening. For legal, medical, sacred, academic, or high-stakes text, compare with the original and treat the retelling as an aid, not an authority.
        </p>
      </section>

      <section className="hiw-card hiw-cta">
        <p className="hiw-eyebrow">Closed Android test</p>
        <h2>Try the loop on your own text.</h2>
        <p>The public examples show the model. The Android test is where you bring your own hard text.</p>
        <a className="hiw-primary" href={playTestingHref} target="_blank" rel="noopener noreferrer" data-understand-event="understand_play_testing_cta_clicked" data-understand-label="play_testing">Open the Play testing link</a>
      </section>

      <style>{`
        .hiw-page{background:#0d1117;color:#f7f0e7;min-height:100vh;padding:48px 20px;font-family:Inter,system-ui,sans-serif}.hiw-hero,.hiw-steps,.hiw-card{max-width:1120px;margin:0 auto}.hiw-hero{padding:68px 0}.hiw-eyebrow,.hiw-object{color:#06d6a0;text-transform:uppercase;letter-spacing:.14em;font-size:.75rem;font-weight:900}.hiw-hero h1{font-family:Georgia,serif;font-size:clamp(2.8rem,7vw,6.2rem);line-height:.94;margin:12px 0}.hiw-lede{font-size:1.25rem;line-height:1.65;color:rgba(247,240,231,.77);max-width:880px}.hiw-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.hiw-primary,.hiw-secondary{border-radius:999px;padding:14px 20px;font-weight:900;text-decoration:none}.hiw-primary{background:#06d6a0;color:#0d1117}.hiw-secondary{border:1px solid rgba(255,255,255,.18);color:#f7f0e7}.hiw-steps{display:grid;gap:16px;margin-bottom:28px}.hiw-step,.hiw-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:28px;padding:28px}.hiw-step{display:grid;grid-template-columns:90px 1fr;gap:18px}.hiw-step-number{font-family:Georgia,serif;font-size:2.8rem;color:rgba(247,240,231,.2)}.hiw-step h2,.hiw-card h2{font-family:Georgia,serif;font-size:2rem;line-height:1.05;margin:8px 0 12px}.hiw-step p,.hiw-card p{color:rgba(247,240,231,.76);line-height:1.65}.hiw-card{margin-bottom:24px}.hiw-contrast{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:20px}.hiw-contrast div{background:rgba(0,0,0,.22);border-radius:18px;padding:18px}.hiw-cta{text-align:center}.hiw-cta .hiw-primary{display:inline-block;margin-top:12px}@media(max-width:820px){.hiw-step,.hiw-contrast{grid-template-columns:1fr}.hiw-hero{padding-top:32px}}
      `}</style>
      </main>
    </>
  );
}
