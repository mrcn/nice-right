'use client';
import { useState } from 'react';
import { builtStudies } from '../studyData';
import { PhoneFrame, StudyFrame } from '../_components/StudyFrame';
const study = builtStudies.find(s => s.slug === 'continue-loop')!;
const sessions = [
 {title:'Genesis 1', progress:68, detail:'Bedtime storyteller · Retold · 1:12 left'},
 {title:'Terms of Service', progress:34, detail:'Lawyer · Close · 4:30 left'},
 {title:'Oncology abstract', progress:81, detail:'NPR explainer · Clear · 0:48 left'},
];
export default function Page(){const [active,setActive]=useState(sessions[0]); return <StudyFrame study={study}><section className="us-demo"><PhoneFrame label="Continue loop"><h3>Continue understanding</h3><p className="us-mini">Not history. A resume surface.</p><div className="us-preview"><strong>{active.title}</strong><p>{active.detail}</p><div className="us-progress"><span style={{width:`${active.progress}%`}} /></div><p className="us-mini">{active.progress}% complete</p><button className="us-primary">Resume</button></div><p className="us-mini">Library</p>{sessions.map(s=><button key={s.title} className="us-secondary" onClick={()=>setActive(s)} style={{margin:'4px'}}>{s.title}</button>)}</PhoneFrame><aside className="us-side-panel"><div className="us-state-card"><h3>IA claim</h3><p>Continue is surfaced because it is an action. Library exists, but as secondary retrieval.</p></div><div className="us-state-card"><h3>PLG</h3><p>Retention precedes referral: continued sessions produce completed retellings worth sharing later.</p></div></aside></section></StudyFrame>}
