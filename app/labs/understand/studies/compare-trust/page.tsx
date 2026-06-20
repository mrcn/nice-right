'use client';
import { useState } from 'react';
import { builtStudies } from '../studyData';
import { PhoneFrame, StudyFrame } from '../_components/StudyFrame';

const study = builtStudies.find(s => s.slug === 'compare-trust')!;
const original = 'In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep.';
const understand = 'Before there was land beneath anyone’s feet, before there was morning or sky, the world rested in a deep and quiet dark. Everything was waiting to be shaped.';
const notes = [
  ['without form, and void', 'Rendered as “unshaped / waiting to be shaped” to preserve meaning while making it listenable.'],
  ['face of the deep', 'Rendered as “deep and quiet dark” because the study is testing oral comprehension, not literal replacement.'],
  ['In the beginning', 'Kept as a creation-opening frame; changed rhythm, not core claim.'],
];

export default function Page(){
  const [view,setView]=useState<'toggle'|'side'|'notes'>('toggle');
  const [mode,setMode]=useState<'Original'|'Understand'>('Understand');
  return <StudyFrame study={study}><section className="us-demo"><PhoneFrame label="Trust comparison">
    <h3>Can I trust this?</h3>
    <p className="us-mini">Passage: Genesis-style creation text · Bedtime storyteller · Retold</p>
    <div className="us-chip-row"><button className={view==='toggle'?'active':''} onClick={()=>setView('toggle')}>Toggle</button><button className={view==='side'?'active':''} onClick={()=>setView('side')}>Side-by-side</button><button className={view==='notes'?'active':''} onClick={()=>setView('notes')}>Change notes</button></div>
    {view==='toggle' && <><div className="us-tabs"><button className={mode==='Original'?'active':''} onClick={()=>setMode('Original')}>Original</button><button className={mode==='Understand'?'active':''} onClick={()=>setMode('Understand')}>Understand</button></div><div className="us-preview">{mode==='Original'?original:understand}</div></>}
    {view==='side' && <div className="us-compare"><div><strong>Original</strong><br/>{original}</div><div><strong>Understand</strong><br/>{understand}</div></div>}
    {view==='notes' && <div className="us-preview">{notes.map(([a,b])=><p key={a}><strong>{a}</strong><br/><span className="us-mini">{b}</span></p>)}</div>}
    <button className="us-primary">Play trusted retelling</button>
  </PhoneFrame><aside className="us-side-panel"><div className="us-state-card"><h3>What moves the needle</h3><p>If users trust the retelling faster with a lightweight comparison, Original / Understand should stay central. If side-by-side feels heavy, keep it contextual.</p></div><div className="us-state-card"><h3>Failure mode</h3><p>If notes make the app feel academic or defensive, use toggle by default and reserve annotations for high-trust passages.</p></div><div className="us-state-card"><h3>PLG artifact</h3><p>The trusted before/after pair can be shared after aha because it shows both source and transformation.</p></div></aside></section></StudyFrame>
}
