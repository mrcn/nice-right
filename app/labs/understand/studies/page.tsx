import Link from 'next/link';
import { builtStudies, candidateStudies } from './studyData';

export default function StudiesIndex() {
  return (
    <main className="us-page">
      <div className="us-shell">
        <section className="us-hero">
          <p className="us-eyebrow">Nice Right Labs · Understand</p>
          <h1>Interface Studies</h1>
          <p className="us-lede">Coded decision studies for the next Understand app: OOUX, ORCA, IA, IxD, YAGNI, trust, and product-led growth loops made tangible in working prototypes.</p>
          <div className="us-hero-links">
            <Link href="/labs/understand/studies/retelling-style-fidelity">Start with Style + Fidelity</Link>
            <Link href="/labs/understand/studies/compare-trust">Test Compare / Trust</Link>
            <Link href="/labs/understand/studies/composed-flow">Open composed user story</Link>
            <Link href="/labs/understand/studies/decision-log">Decision log</Link>
          </div>
        </section>

        <section className="us-section">
          <h2>Current object model</h2>
          <pre className="us-object-map">{`Passage\n├─ Original\n├─ Retelling\n│  ├─ Retelling Style / Persona\n│  ├─ Fidelity / Source Distance\n│  └─ Output Text\n├─ Performance\n│  ├─ Voice\n│  ├─ Voice Capability\n│  └─ Playback\n└─ Listening Session\n\nPLG Objects\n├─ Sample / Proof Passage\n├─ Shareable Retelling\n├─ Continue Moment\n├─ Upgrade Trigger\n└─ Invite / Feedback Request`}</pre>
        </section>

        <section className="us-section">
          <h2>Full coded studies</h2>
          <div className="us-grid">
            {builtStudies.map(study => (
              <article className="us-study-card" key={study.slug}>
                <span className="us-badge">built study</span>
                <h3>{study.title}</h3>
                <p><strong>Hypothesis:</strong> {study.hypothesis}</p>
                <p><strong>Decision:</strong> {study.decision}</p>
                <Link href={`/labs/understand/studies/${study.slug}`}>Open study →</Link>
              </article>
            ))}
            <article className="us-study-card">
              <span className="us-badge">composed</span>
              <h3>Composed User Story</h3>
              <p>The working candidate flow that combines Passage, Retelling Style, Fidelity, Performance Capability, Continue, and PLG artifacts.</p>
              <p><strong>Decision:</strong> Can these models work together as the app direction?</p>
              <Link href="/labs/understand/studies/composed-flow">Open prototype →</Link>
            </article>
          </div>
        </section>

        <section className="us-section">
          <h2>Candidate mental models not fully built yet</h2>
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
          <p>PLG is modeled as product objects, not marketing garnish. No growth ask appears before aha.</p>
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
