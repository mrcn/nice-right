import Link from 'next/link';
import { builtStudies, candidateStudies, decisionFamilies } from './studyData';

export default function StudiesIndex() {
  return (
    <main className="us-page">
      <div className="us-shell">
        <section className="us-hero">
          <p className="us-eyebrow">UXOXO product · Understand studies</p>
          <h1>Understand Interface Studies</h1>
          <p className="us-lede">These are coded decision studies for the next Understand app. They are not a gallery of final screens. They are working arguments about how the product should think: what the user brings in, what the app transforms, how trust is earned, where audio performance belongs, and when growth asks should appear.</p>
          <div className="us-hero-links">
            <Link href="/labs/understand/studies/composed-flow">Open end-to-end first session</Link>
            <Link href="/labs/understand/studies/retelling-style-fidelity">Start with Retelling Style + Closeness</Link>
            <Link href="/labs/understand/studies/compare-trust">Test Original Check</Link>
            <Link href="/labs/understand/studies/decision-log">Decision log</Link>
          </div>
        </section>

        <section className="us-section us-card us-intro-card">
          <p className="us-eyebrow">Reader induction</p>
          <h2>What problem are these studies solving?</h2>
          <p>Understand could easily become “a TTS utility with AI settings.” That is not the ideal. The ideal is closer to: <strong>give the app old, dense, intimidating, annoying, or beautiful text and hear it become something you actually want to keep listening to.</strong></p>
          <p>To get there, we need to decide the product’s mental model before we harden the app UI. Should the app be organized around a Passage? A Retelling? A narrator? A library? A listening session? These studies give those possible models life so we can choose deliberately.</p>
          <div className="us-principle-grid">
            <div><strong>OOUX / ORCA</strong><br />Define the objects, relationships, calls to action, and attributes before screens.</div>
            <div><strong>IxD / IA</strong><br />Test how the user moves through decisions, not just what labels appear.</div>
            <div><strong>YAGNI</strong><br />Avoid promoting every possible object into persistent UI.</div>
            <div><strong>PLG</strong><br />Create value first, then ask for paste, share, upgrade, invite, or feedback.</div>
          </div>
        </section>

        <section className="us-section us-card">
          <p className="us-eyebrow">Review protocol</p>
          <h2>How to read these pages</h2>
          <ol>
            <li>Do not judge only the visual treatment. Judge the mental model.</li>
            <li>Ask what decision the study enables: adopt, iterate, combine, or reject.</li>
            <li>Look for the moment where the app earns trust and desire.</li>
            <li>Notice whether the growth moment follows value, or appears too early.</li>
            <li>Use the Decision Log only after reviewing the core studies.</li>
          </ol>
        </section>

        <section className="us-section">
          <h2>Current object model</h2>
          <p className="us-section-copy">This is the working product model being tested. The key move is that Retelling Style, Fidelity, Voice, and Voice Capability are separate things. Collapsing them into one “style picker” makes the product harder to trust and harder to explain.</p>
          <pre className="us-object-map">{`Passage\n├─ Original\n├─ Retelling\n│  ├─ Retelling Style / Persona\n│  ├─ Fidelity / Source Distance\n│  └─ Output Text\n├─ Performance\n│  ├─ Voice\n│  ├─ Voice Capability\n│  └─ Playback\n└─ Listening Session\n\nPLG Objects\n├─ Sample / Proof Passage\n├─ Shareable Retelling\n├─ Continue Moment\n├─ Upgrade Trigger\n└─ Invite / Feedback Request`}</pre>
        </section>

        <section className="us-section">
          <h2>Decision families</h2>
          <p className="us-section-copy">The studies are grouped by what they help decide. This prevents us from treating every idea as equally important.</p>
          <div className="us-grid">
            {decisionFamilies.map(([family, study, question]) => (
              <article className="us-study-card" key={family}>
                <span className="us-badge">{family}</span>
                <h3>{study}</h3>
                <p>{question}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="us-section">
          <h2>Full coded studies</h2>
          <p className="us-section-copy">These are the pages ready to review. Each page now includes why the study exists, what can go wrong, what success looks like, and what decision it should enable.</p>
          <div className="us-grid">
            {builtStudies.map(study => (
              <article className="us-study-card" key={study.slug}>
                <span className="us-badge">{study.value} value</span>
                <h3>{study.title}</h3>
                <p><strong>Why:</strong> {study.whyItMatters}</p>
                <p><strong>Decision:</strong> {study.decision}</p>
                <Link href={`/labs/understand/studies/${study.slug}`}>Open study →</Link>
              </article>
            ))}
            <article className="us-study-card">
              <span className="us-badge">composed</span>
              <h3>End-to-End First Session</h3>
              <p>The working candidate flow that combines Passage, Retelling Style, Fidelity, Can the Voice Perform the Retelling?, Continue, and PLG artifacts.</p>
              <p><strong>Decision:</strong> Can these models work together as the app direction?</p>
              <Link href="/labs/understand/studies/composed-flow">Open prototype →</Link>
            </article>
          </div>
        </section>

        <section className="us-section">
          <h2>Candidate mental models not fully built yet</h2>
          <p className="us-section-copy">These are real ideas, but they are intentionally not first-pass full studies. They stay as candidates until a core study proves we need them.</p>
          <div className="us-grid">
            {candidateStudies.map(([slug, title, question]) => (
              <article className="us-study-card us-candidate" key={slug}>
                <span className="us-badge">candidate</span>
                <h3>{title}</h3>
                <p>{question}</p>
                <p className="us-mini">Deferred unless the first studies show this model deserves a full route.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="us-section us-card">
          <h2>Product-led growth lens</h2>
          <p>PLG is modeled as product objects, not marketing garnish. The important rule is: <strong>create a useful artifact before asking for a growth action.</strong></p>
          <div className="us-plg-loop">
            <div><strong>Sample</strong><br />Try before paste.</div>
            <div><strong>Aha</strong><br />Hear the retelling work.</div>
            <div><strong>Share artifact</strong><br />Before/after retelling.</div>
            <div><strong>Continue</strong><br />Resume what mattered.</div>
            <div><strong>Upgrade</strong><br />Expressive performance boundary.</div>
          </div>
        </section>
      </div>
    </main>
  );
}
