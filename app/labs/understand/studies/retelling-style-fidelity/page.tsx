'use client';
import { useMemo, useState } from 'react';
import { builtStudies } from '../studyData';
import { PhoneFrame, StudyFrame } from '../_components/StudyFrame';

const study = builtStudies.find(s => s.slug === 'retelling-style-fidelity')!;
const source = 'In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep.';
const personas = ['Bedtime storyteller', 'TikTok influencer', 'NPR explainer', 'Lawyer'] as const;
const fidelities = ['Close', 'Clear', 'Retold', 'Freer'] as const;
const outputs: Record<string, Record<string, string>> = {
  'Bedtime storyteller': { Close: 'In the beginning, God created the heavens and the earth. The earth was still without shape and empty, and darkness rested over the deep.', Clear: 'At the start of everything, God made the sky and the earth. But the world was still empty, unformed, and covered in deep darkness.', Retold: 'Before there was land beneath anyone’s feet, before there was morning or sky, the world rested in a deep and quiet dark. Everything was waiting to be shaped.', Freer: 'Long before the first dawn, there was only a hush: no path, no shore, no names for anything yet. The world lay like a sleeping child, waiting for light to enter the room.' },
  'TikTok influencer': { Close: 'At the start, God creates the heavens and the earth. But the earth is still empty, shapeless, and completely dark over the deep.', Clear: 'So basically, God creates the sky and earth, but the world is not really a world yet. It is empty, unshaped, and dark everywhere.', Retold: 'Reality has just loaded in, but nothing is organized yet. No land, no light, no structure — just deep darkness and this raw world waiting to become something.', Freer: 'Imagine opening the universe and it is still on the blank loading screen. No map, no lighting, no textures — just darkness, depth, and the beginning of everything about to happen.' },
  'NPR explainer': { Close: 'The text opens with creation: God makes the heavens and the earth. The earth, however, remains formless, empty, and covered by darkness.', Clear: 'Genesis begins by describing creation before order. Heaven and earth exist, but the earth has not yet taken shape. Darkness still covers the deep.', Retold: 'The story begins not with a finished world, but with a world still in formation: earth present, but unshaped; darkness present, but not final.', Freer: 'This is creation at its earliest threshold — existence before structure, presence before clarity, a world waiting for order to arrive.' },
  Lawyer: { Close: 'The passage states that God created the heavens and the earth, and that the earth was formless, void, and under darkness over the deep.', Clear: 'The material facts are: creation begins; heaven and earth are created; the earth is not yet ordered; darkness remains over the deep.', Retold: 'The passage establishes an initial condition: creation has commenced, but the created world has not yet been organized into usable form.', Freer: 'In practical terms, the text describes a created but unfinished state — existence without structure, awaiting the next act of ordering authority.' },
};
const grid = [['Bedtime storyteller','Close'],['Bedtime storyteller','Freer'],['TikTok influencer','Close'],['TikTok influencer','Freer']] as const;

export default function Page() {
  const [persona, setPersona] = useState<(typeof personas)[number]>('Bedtime storyteller');
  const [fidelity, setFidelity] = useState(2);
  const fidelityName = fidelities[fidelity];
  const preview = useMemo(() => outputs[persona][fidelityName], [persona, fidelityName]);
  return <StudyFrame study={study}>
    <section className="us-demo">
      <PhoneFrame label="Interactive retelling model">
        <h3>How should this be retold?</h3>
        <p className="us-mini">Source text</p><div className="us-source-box">{source}</div>
        <p className="us-mini">Retelling Style: the medium / genre / communicative energy.</p>
        <div className="us-chip-row">{personas.map(p => <button key={p} onClick={() => setPersona(p)} className={p === persona ? 'active' : ''}>{p}</button>)}</div>
        <div className="us-row"><strong>Fidelity: how close should it stay?</strong><span>{fidelityName}</span></div>
        <input className="us-slider" type="range" min="0" max="3" value={fidelity} onChange={e => setFidelity(Number(e.target.value))} />
        <div className="us-row us-mini"><span>Close</span><span>Freer</span></div>
        <div className="us-preview">{preview}</div>
        <div className="us-notice">Changed: Style + Fidelity. Not changed: Voice.</div>
        <button className="us-primary">Apply retelling</button>
      </PhoneFrame>
      <aside className="us-side-panel"><div className="us-state-card"><h3>What this proves</h3><p>Retelling Style changes the medium. Fidelity changes only distance from source. The output teaches the taxonomy better than labels alone.</p></div><div className="us-state-card"><h3>Anti-pattern avoided</h3><p>No flat bucket containing TikTok, Bedtime, Like I’m 5, and 6th grade. Those are different axes.</p></div><div className="us-state-card"><h3>Review question</h3><p>Can you predict what happens when you move Fidelity without changing Retelling Style?</p></div></aside>
    </section>
    <section className="us-section"><h2>2×2 contrast grid</h2><p className="us-section-copy">The fastest way to test the model is to hold one axis steady while changing the other.</p><div className="us-grid">{grid.map(([p,f])=><article className="us-study-card" key={p+f}><span className="us-badge">{p} · {f}</span><p>{outputs[p][f]}</p></article>)}</div></section>
  </StudyFrame>;
}
