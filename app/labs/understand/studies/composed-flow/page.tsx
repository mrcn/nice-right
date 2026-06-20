'use client';
import { useMemo, useState } from 'react';
import { PhoneFrame, StudyFrame } from '../_components/StudyFrame';
import type { Study } from '../studyData';

const study: Study = {
  slug: 'composed-flow',
  title: 'Composed User Story Prototype',
  eyebrow: 'Candidate app direction · OOUX + IxD + IA + PLG',
  status: 'composed',
  hypothesis: 'The strongest models can work together as one smooth user story: sample aha, Passage stage, Retelling Style + Fidelity, Performance capability, Continue, and shareable artifact.',
  primaryObject: 'Passage → Retelling → Performance → Listening Session',
  mentalModel: 'Bring text, retell it with a chosen medium and source distance, hear it, continue it, then share the useful artifact.',
  orca: ['Passage owns Original and Retelling', 'Retelling owns Style and Fidelity', 'Performance owns Voice Capability', 'Listening Session owns Continue', 'Shareable Retelling is the PLG artifact'],
  ixd: ['Choose proof sample', 'Generate retelling', 'Adjust style/distance', 'Play local', 'Preview expressive', 'Save/continue', 'Share after aha'],
  ia: 'The app is passage-first; retelling controls are contextual; performance is contextual; growth asks follow value.',
  yagni: ['No account wall', 'No bottom nav', 'No persistent voice bar', 'No advanced settings before aha'],
  plg: 'Aha creates a shareable before/after retelling and a tester/invite ask only after the user experiences value.',
  try: ['Step through the story', 'Change retelling controls', 'Preview local vs expressive performance', 'Notice when share/invite appears'],
  decision: 'Is this composed flow strong enough to become the candidate direction for the real app?',
};

const samples = {
  Genesis: 'In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep.',
  Legalese: 'You agree that the licensed application is licensed, not sold, under the terms of this agreement.',
  Shakespeare: 'To be, or not to be, that is the question: whether tis nobler in the mind to suffer.'
} as const;
const styles = ['Bedtime storyteller','TikTok influencer','NPR explainer','Lawyer'] as const;
const fidelity = ['Close','Clear','Retold','Freer'] as const;

function makeRetelling(sample: keyof typeof samples, style: string, distance: string){
  if(style==='Lawyer') return distance==='Close' ? 'The passage states the core condition plainly and preserves the original claim with minimal interpretation.' : 'In practical terms, the text is establishing stakes, obligations, and consequences in a more usable form.';
  if(style==='TikTok influencer') return distance==='Freer' ? 'Imagine the whole situation as a blank loading screen: no map, no lighting, no structure — and then everything is about to happen.' : 'So basically, the original is saying the situation exists, but it is still unformed, unclear, and waiting to become something.';
  if(style==='NPR explainer') return 'The passage is less about a finished scene than a threshold: something exists, but meaning and order have not fully arrived yet.';
  return distance==='Close' ? 'The world was still without shape and empty, and darkness rested over the deep.' : 'Before there was land beneath anyone’s feet, the world rested in a deep and quiet dark, waiting for light.';
}

export default function Page(){
  const [step,setStep]=useState(0); const [sample,setSample]=useState<keyof typeof samples>('Genesis'); const [style,setStyle]=useState<(typeof styles)[number]>('Bedtime storyteller'); const [dist,setDist]=useState(2); const [voice,setVoice]=useState<'local'|'expressive'>('local');
  const retelling = useMemo(()=>makeRetelling(sample,style,fidelity[dist]),[sample,style,dist]);
  const steps=['Proof sample','Passage stage','Retell controls','Play performance','Continue + share'];
  return <StudyFrame study={study}><section className="us-demo"><PhoneFrame label="Working user story"><div className="us-row"><strong>{steps[step]}</strong><span>{step+1}/5</span></div><div className="us-progress"><span style={{width:`${(step+1)*20}%`}} /></div>
    {step===0 && <><h3>Pick a proof passage</h3><p className="us-mini">PLG starts with value: try before paste.</p><div className="us-chip-row">{Object.keys(samples).map(s=><button key={s} className={sample===s?'active':''} onClick={()=>setSample(s as keyof typeof samples)}>{s}</button>)}</div><div className="us-preview">{samples[sample]}</div></>}
    {step===1 && <><h3>{sample}</h3><div className="us-tabs"><button className="active">Original</button><button>Understand</button></div><div className="us-preview">{samples[sample]}</div><p className="us-mini">Object: Passage. Children: Original, Retelling, Performance, Session.</p></>}
    {step===2 && <><h3>Retell as</h3><div className="us-chip-row">{styles.map(s=><button key={s} className={style===s?'active':''} onClick={()=>setStyle(s)}>{s}</button>)}</div><div className="us-row"><strong>Fidelity</strong><span>{fidelity[dist]}</span></div><input className="us-slider" type="range" min="0" max="3" value={dist} onChange={e=>setDist(Number(e.target.value))}/><div className="us-preview">{retelling}</div></>}
    {step===3 && <><h3>Hear it</h3><div className="us-chip-row"><button className={voice==='local'?'active':''} onClick={()=>setVoice('local')}>Local clear</button><button className={voice==='expressive'?'active':''} onClick={()=>setVoice('expressive')}>Expressive premium</button></div><div className="us-preview"><strong>{voice==='local'?'Clear neutral read':'Style-following performance'}</strong><p>{retelling}</p></div><div className="us-notice">{voice==='local'?'Free voice reads clearly. Expressive preview available after aha.':'Certain premium voices can perform pacing, energy, and selected style.'}</div></>}
    {step===4 && <><h3>Keep going</h3><div className="us-preview"><strong>Saved to Continue</strong><p>{sample} · {style} · {fidelity[dist]} · 68% complete</p></div><div className="us-compare"><div><strong>Original</strong><br/>{samples[sample].slice(0,82)}...</div><div><strong>Understand</strong><br/>{retelling}</div></div><button className="us-primary">Share before/after</button><button className="us-secondary">Become a tester</button></>}
    <div className="us-row" style={{marginTop:18}}><button onClick={()=>setStep(Math.max(0,step-1))}>Back</button><button className="us-primary" onClick={()=>setStep(Math.min(4,step+1))}>{step===4?'Review again':'Next'}</button></div>
  </PhoneFrame><aside className="us-side-panel"><div className="us-state-card"><h3>Contained product model</h3><ul><li>Passage is root object.</li><li>Retelling Style is distinct from Fidelity.</li><li>Voice Capability is separate from Voice.</li><li>Continue is the retention object.</li><li>Shareable Retelling is the PLG artifact.</li></ul></div><div className="us-state-card"><h3>User story</h3><p>Maya arrives from the promise, tries a proof passage, hears the transformation, previews expressive performance, saves progress, then receives a share/tester ask after value.</p></div><div className="us-state-card"><h3>Decision</h3><p>If this feels coherent, the next move is to port the model into Flutter IA and replace old Reader/History/Voice assumptions.</p></div></aside></section></StudyFrame>
}
