import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Study } from '../studyData';

export function StudyFrame({ study, children }: { study: Study; children: ReactNode }) {
  return (
    <main className="us-page">
      <div className="us-shell">
        <Link className="us-back" href="/labs/understand/studies">← Studies index</Link>
        <section className="us-study-hero">
          <p className="us-eyebrow">{study.eyebrow}</p>
          <h1>{study.title}</h1>
          <p className="us-hypothesis"><strong>Hypothesis:</strong> {study.hypothesis}</p>
          <div className="us-induction-grid">
            <article>
              <span>Problem this study exists to clarify</span>
              <p>{study.problem}</p>
            </article>
            <article>
              <span>Why it matters</span>
              <p>{study.whyItMatters}</p>
            </article>
          </div>
          <div className="us-meta-grid">
            <div><span>Strategic value</span><strong>{study.value}</strong></div>
            <div><span>Primary object</span><strong>{study.primaryObject}</strong></div>
            <div><span>Mental model</span><strong>{study.mentalModel}</strong></div>
            <div><span>IA implication</span><strong>{study.ia}</strong></div>
            <div><span>PLG lens</span><strong>{study.plg}</strong></div>
          </div>
        </section>

        <section className="us-study-grid">
          <article className="us-card">
            <h2>What to try</h2>
            <ol>{study.try.map(item => <li key={item}>{item}</li>)}</ol>
          </article>
          <article className="us-card">
            <h2>ORCA focus</h2>
            <ul>{study.orca.map(item => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="us-card">
            <h2>IxD states</h2>
            <ul>{study.ixd.map(item => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="us-card us-cut-card">
            <h2>YAGNI cuts</h2>
            <ul>{study.yagni.map(item => <li key={item}>{item}</li>)}</ul>
          </article>
        </section>

        {children}

        <section className="us-study-grid us-evaluation-grid">
          <article className="us-card us-success-card">
            <h2>Success looks like</h2>
            <ul>{study.success.map(item => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="us-card us-failure-card">
            <h2>Failure looks like</h2>
            <ul>{study.failure.map(item => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="us-card">
            <h2>Current recommendation</h2>
            <p>{study.recommendation}</p>
          </article>
        </section>

        <section className="us-decision">
          <p className="us-eyebrow">Decision prompt</p>
          <h2>{study.decision}</h2>
          <p>This is not a vote on whether the screen is pretty. It is a decision about whether this mental model should shape the real app.</p>
          <div className="us-score-grid">
            {['Adopt', 'Iterate labels', 'Combine', 'Reject'].map(label => <button key={label}>{label}</button>)}
          </div>
        </section>
      </div>
    </main>
  );
}

export function PhoneFrame({ children, label }: { children: ReactNode; label?: string }) {
  return <div className="us-phone-wrap"><div className="us-phone"><div className="us-phone-speaker" />{label && <p className="us-phone-label">{label}</p>}{children}</div></div>;
}
