import Link from 'next/link';

const decisions = [
  {status:'Likely adopt', item:'Persona / Retelling Style + Fidelity', reason:'This is the clearest model for separating medium from source-distance.'},
  {status:'Likely adopt', item:'Passage-first IA', reason:'Passage is the strongest root object for first open and active use.'},
  {status:'Needs review', item:'Compare / Trust level', reason:'We need to decide toggle-only, side-by-side, or contextual notes by text type.'},
  {status:'Likely adopt', item:'Sample-first aha', reason:'Proof passages teach the promise before paste/import friction.'},
  {status:'Needs review', item:'Premium as expressive performance', reason:'Strong business story, but copy must stay truthful about model capability.'},
  {status:'Defer depth', item:'Continue / Library', reason:'Useful for retention, but lower priority until the first-session loop is strong.'},
  {status:'Candidate only', item:'Coach / Narrator / Workflow-first', reason:'Potentially useful later, but each risks reframing the product away from the core promise.'},
];

export const metadata = { title: 'Understand Study Decision Log | Nice Right Labs', robots: { index: false, follow: false } };

export default function DecisionLog(){
  return <main className="us-page"><div className="us-shell"><Link className="us-back" href="/labs/understand/studies">← Studies index</Link><section className="us-hero"><p className="us-eyebrow">Review artifact</p><h1>Decision Log</h1><p className="us-lede">A lightweight record of what the studies currently suggest, what still needs review, and what should not be overbuilt yet.</p></section><section className="us-section"><h2>Current decisions to review</h2><div className="us-grid">{decisions.map(d=><article className="us-study-card" key={d.item}><span className="us-badge">{d.status}</span><h3>{d.item}</h3><p>{d.reason}</p></article>)}</div></section><section className="us-section us-card"><h2>Review protocol</h2><ol><li>Open the composed flow and decide if the full story holds together.</li><li>Open Retelling Style + Fidelity and Compare / Trust before judging the app IA.</li><li>Mark each model Adopt / Iterate / Combine / Reject.</li><li>Only after decisions, create Flutter implementation tasks.</li></ol></section></div></main>
}
