import { UnderstandAnalytics } from '../_components/UnderstandAnalytics';
const playTestingHref = 'https://play.google.com/apps/testing/xyz.uxoxo.understand';

export const metadata = {
  title: 'Test Understand on Android | Google Play Closed Test',
  description: 'Join the Understand Android closed test through Google Play and help test the on-ramp to difficult text.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Understand',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Android',
  description: 'Understand is an AI listening app for difficult text, currently available through Google Play closed testing.',
  offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
  url: 'https://niceright.co/labs/understand/testing/',
};

const steps = [
  'Open the official Google Play testing link.',
  'Opt in with the Google account you use on your Android phone.',
  'Install Understand from Play after opting in.',
  'Try one hard text: classic, article, legalese, academic, or your own dense passage.',
  'Keep the app installed during the closed-test period so the production gate can be cleared.',
];

export default function TestingPage() {
  return (
    <>
      <UnderstandAnalytics />
      <main className="test-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="test-hero">
        <p className="test-eyebrow">Android closed test</p>
        <h1>Help launch Understand.</h1>
        <p className="test-lede">
          Understand is currently in Google Play closed testing. The goal is simple: get real Android testers through the official opt-in flow so the app can move toward production.
        </p>
        <a className="test-primary" href={playTestingHref} target="_blank" rel="noopener noreferrer" data-understand-event="understand_play_testing_cta_clicked" data-understand-label="play_testing">Open the Play testing link</a>
      </section>

      <section className="test-card">
        <p className="test-eyebrow">What to do</p>
        <h2>Tester steps</h2>
        <ol>
          {steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      <section className="test-grid">
        <article className="test-card">
          <p className="test-eyebrow">What to test</p>
          <h2>Bring one difficult text.</h2>
          <p>Try something you would normally avoid or abandon: old literature, a dense article, terms of service, academic text, or a long passage that would be easier as audio.</p>
        </article>
        <article className="test-card">
          <p className="test-eyebrow">What matters</p>
          <h2>The first-session feeling.</h2>
          <p>The key question is whether Understand makes you think: “Oh, I could keep listening to this.” That matters more than testing every setting.</p>
        </article>
      </section>

      <section className="test-card">
        <p className="test-eyebrow">If the link does not work</p>
        <h2>Common closed-test friction</h2>
        <p>
          Google Play testing links can fail if you are signed into the wrong Google account, not on Android, or the tester list has not propagated yet. Try opening the link on your Android device with the account you use for Play Store.
        </p>
        <a className="test-secondary" href="/labs/understand/">Back to Understand</a>
      </section>

      <style>{`
        .test-page{background:#080b10;color:#f7efe4;min-height:100vh;padding:48px 20px;font-family:Inter,system-ui,sans-serif}.test-hero,.test-card,.test-grid{max-width:1040px;margin:0 auto}.test-hero{padding:72px 0;text-align:center}.test-eyebrow{color:#06d6a0;text-transform:uppercase;letter-spacing:.14em;font-size:.75rem;font-weight:900}.test-hero h1{font-family:Georgia,serif;font-size:clamp(3rem,8vw,6.8rem);line-height:.93;margin:12px 0}.test-lede{font-size:1.22rem;line-height:1.65;color:rgba(247,239,228,.76);max-width:760px;margin:0 auto 28px}.test-primary,.test-secondary{display:inline-block;border-radius:999px;padding:14px 20px;font-weight:900;text-decoration:none}.test-primary{background:#06d6a0;color:#080b10}.test-secondary{border:1px solid rgba(255,255,255,.2);color:#f7efe4}.test-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:28px;padding:28px;margin-bottom:22px}.test-card h2{font-family:Georgia,serif;font-size:2rem;margin:8px 0 12px}.test-card p,.test-card li{color:rgba(247,239,228,.76);line-height:1.65}.test-card li{margin:8px 0}.test-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}@media(max-width:820px){.test-grid{grid-template-columns:1fr}.test-hero{padding-top:34px}}
      `}</style>
      </main>
    </>
  );
}
