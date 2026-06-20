'use client';
import { useState } from 'react';
import { builtStudies } from '../studyData';
import { PhoneFrame, StudyFrame } from '../_components/StudyFrame';
const study = builtStudies.find(s => s.slug === 'sample-aha')!;
const cards = [
 {name:'Genesis', proof:'Old text becomes story-like', recipe:'Biblical storyteller · Retold', before:'And darkness was upon the face of the deep.', after:'The world rested in deep darkness, waiting for light.'},
 {name:'Shakespeare', proof:'Classic drama becomes listenable', recipe:'NPR explainer · Clear', before:'To be, or not to be, that is the question.', after:'He is asking whether it is better to keep living through pain or end it.'},
 {name:'Legalese', proof:'Dense rules become plain stakes', recipe:'Lawyer · Close', before:'Licensed, not sold, under this agreement.', after:'You can use it, but you do not own it.'},
];
export default function Page(){const [active,setActive]=useState(cards[0]); return <StudyFrame study={study}><section className="us-demo"><PhoneFrame label="Sample aha"><h3>Hear the difference</h3><p className="us-mini">Samples are curated proof passages, not filler.</p><div className="us-chip-row">{cards.map(c=><button key={c.name} className={c.name===active.name?'active':''} onClick={()=>setActive(c)}>{c.name}</button>)}</div><div className="us-preview"><strong>{active.proof}</strong><p className="us-mini">{active.recipe}</p><div className="us-compare"><div><strong>Original</strong><br/>{active.before}</div><div><strong>Understand</strong><br/>{active.after}</div></div></div><button className="us-primary">Play sample</button><button className="us-secondary">Paste my own</button></PhoneFrame><aside className="us-side-panel"><div className="us-state-card"><h3>PLG loop</h3><p>Try sample → aha → paste own → share retelling. Growth starts from a useful artifact.</p></div><div className="us-state-card"><h3>YAGNI</h3><p>No account, no blank setup, no import ceremony before the user feels the value.</p></div></aside></section></StudyFrame>}
