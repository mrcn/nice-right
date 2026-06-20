'use client';
import { useState } from 'react';
import { builtStudies } from '../studyData';
import { PhoneFrame, StudyFrame } from '../_components/StudyFrame';
const study = builtStudies.find(s => s.slug === 'passage-stage')!;
const samples = {
  Genesis: { time: '2 min', original: 'In the beginning God created the heaven and the earth. And the earth was without form, and void.', understand: 'Before there was land or morning, the world was still raw and dark, waiting to be shaped.' },
  Aesop: { time: '1 min', original: 'A crow, half-dead with thirst, came upon a pitcher which had once been full of water.', understand: 'A thirsty crow finds a pitcher with water too low to reach, then has to get clever.' },
  Legal: { time: '3 min', original: 'You agree that the licensed application is licensed, not sold, under the terms of this agreement.', understand: 'You do not own the app. You have permission to use it as long as you follow the rules.' },
};
export default function Page(){
 const [key,setKey]=useState<keyof typeof samples|null>(null); const [mode,setMode]=useState<'Original'|'Understand'>('Original'); const [ready,setReady]=useState(false); const [playing,setPlaying]=useState(false); const p=key?samples[key]:null;
 return <StudyFrame study={study}><section className="us-demo"><PhoneFrame label="Passage stage">
   {!p ? <><h3>What do you want to understand?</h3><p className="us-mini">Try a proof passage or paste your own.</p><div className="us-chip-row">{Object.keys(samples).map(s=><button key={s} onClick={()=>{setKey(s as keyof typeof samples);setMode('Original');setReady(false)}}>{s}</button>)}</div><button className="us-secondary">Paste text</button></> : <><div className="us-row"><div><h3>{key}</h3><p className="us-mini">{p.time} listen · Passage</p></div><button onClick={()=>setKey(null)}>Change</button></div><div className="us-tabs"><button className={mode==='Original'?'active':''} onClick={()=>setMode('Original')}>Original</button><button className={mode==='Understand'?'active':''} onClick={()=>setMode('Understand')}>Understand</button></div><div className="us-preview">{mode==='Original'?p.original:(ready?p.understand:'No Understand version yet. Generate one from the original.')}</div><p className="us-mini">Retell as: Bedtime storyteller · Retold</p>{!ready?<button className="us-primary" onClick={()=>{setReady(true);setMode('Understand')}}>Understand</button>:<button className="us-primary" onClick={()=>setPlaying(!playing)}>{playing?'Pause':'Play'}</button>}</>}
  </PhoneFrame><aside className="us-side-panel"><div className="us-state-card"><h3>IA claim</h3><p>The screen is a Passage stage. Original, Retelling, Performance, and Playback orbit the Passage.</p></div><div className="us-state-card"><h3>YAGNI</h3><p>No bottom Reader/History nav. No permanent voice bar. Continuation is a later object.</p></div></aside></section></StudyFrame>
}
