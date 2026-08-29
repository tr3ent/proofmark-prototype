import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BadgeCheck, Camera, Check, ChevronRight, ClipboardCheck, Clock3,
  FileText, HardHat, Info, Play, RotateCcw, ShieldCheck, Sparkles,
  Upload, UserRound, Video, X, AlertTriangle, CheckCircle2
} from 'lucide-react';
import './styles.css';

const criteria = [
  { id: 1, code: 'OS-01', title: 'Personal protective equipment', detail: 'Correct helmet, gloves, protective clothing and safety footwear are used.', result: 'observed', confidence: 96, timestamp: '00:08–00:18', evidence: 'Candidate is visibly wearing a welding helmet, leather gloves and protective overalls before starting the task.' },
  { id: 2, code: 'WP-02', title: 'Workpiece preparation', detail: 'Surfaces are cleaned, aligned and secured before welding.', result: 'observed', confidence: 91, timestamp: '00:24–00:47', evidence: 'The joint edges are cleaned and both plates are aligned and clamped before the arc is started.' },
  { id: 3, code: 'ES-03', title: 'Equipment setup', detail: 'Machine settings and consumables suit the material and joint.', result: 'partial', confidence: 74, timestamp: '00:50–01:06', evidence: 'Electrode selection is visible, but the amperage display is partially obscured. Additional close-up evidence is recommended.' },
  { id: 4, code: 'WT-04', title: 'Welding technique', detail: 'Arc length, travel speed and electrode angle are controlled.', result: 'observed', confidence: 88, timestamp: '01:12–02:04', evidence: 'Travel speed and electrode angle remain consistent through most of the weld run.' },
  { id: 5, code: 'QI-05', title: 'Finished-weld inspection', detail: 'The weld is inspected for visible defects and meets the specified finish.', result: 'insufficient', confidence: 62, timestamp: '02:11–02:25', evidence: 'The final weld is shown, but the camera distance is too great to assess porosity, undercut or bead consistency reliably.' },
];

const labels = { observed: 'Observed', partial: 'Partially observed', insufficient: 'Insufficient evidence', not_observed: 'Not observed' };

function Logo(){ return <div className="brand"><div className="brandmark"><Check/></div><div><strong>Proofmark</strong><span>Skills made visible</span></div></div> }

function Stepper({step}){
  const steps = ['Candidate','Evidence','AI analysis','Assessor review','Report'];
  return <div className="stepper">{steps.map((s,i)=><React.Fragment key={s}><div className={`step ${i<=step?'active':''}`}><span>{i<step?<Check/>:i+1}</span><b>{s}</b></div>{i<steps.length-1&&<div className={`line ${i<step?'active':''}`}/>}</React.Fragment>)}</div>
}

function StatusPill({value}){ return <span className={`status ${value}`}>{value==='observed'?<CheckCircle2/>:value==='insufficient'?<AlertTriangle/>:<Info/>}{labels[value]}</span> }

function App(){
  const [step,setStep]=useState(0);
  const [candidate,setCandidate]=useState({name:'Chanda Mwansa',nrc:'Demo candidate',trade:'Arc Welding',centre:'Copperbelt assessment centre'});
  const [file,setFile]=useState(null);
  const [analysing,setAnalysing]=useState(false);
  const [review,setReview]=useState(criteria.map(c=>({...c,assessorResult:c.result,comment:''})));
  const [signed,setSigned]=useState(false);
  const score=useMemo(()=>review.filter(c=>c.assessorResult==='observed').length, [review]);

  const nextFromEvidence=()=>{ setStep(2); setAnalysing(true); setTimeout(()=>setAnalysing(false),2200); };
  const reset=()=>{setStep(0);setFile(null);setAnalysing(false);setSigned(false);setReview(criteria.map(c=>({...c,assessorResult:c.result,comment:''})));};
  const updateCriterion=(id,key,value)=>setReview(r=>r.map(c=>c.id===id?{...c,[key]:value}:c));

  return <div className="app">
    <header><Logo/><div className="demo-tag"><Sparkles/> Application prototype <span>Simulated AI</span></div></header>
    <main>
      <div className="intro">
        <div><p className="eyebrow">Recognition of Prior Learning</p><h1>Practical skills assessment</h1><p>Capture evidence of work, map it to a competency standard, and keep the qualified assessor in control.</p></div>
        <button className="ghost" onClick={reset}><RotateCcw/> Reset demo</button>
      </div>
      <div className="notice"><Info/><div><strong>This is an application-stage prototype.</strong> The assessment shown is simulated using fixed demonstration data. It illustrates the proposed Gemini workflow; it does not issue certificates or make real competency decisions.</div></div>
      <Stepper step={step}/>

      {step===0&&<section className="card stage">
        <div className="section-title"><div className="iconbox"><UserRound/></div><div><span>Step 1</span><h2>Candidate and assessment</h2><p>Identify the artisan and select the practical competency being assessed.</p></div></div>
        <div className="form-grid">
          <label>Candidate name<input value={candidate.name} onChange={e=>setCandidate({...candidate,name:e.target.value})}/></label>
          <label>Candidate reference<input value={candidate.nrc} onChange={e=>setCandidate({...candidate,nrc:e.target.value})}/></label>
          <label>Trade<select value={candidate.trade} onChange={e=>setCandidate({...candidate,trade:e.target.value})}><option>Arc Welding</option><option>Automotive Mechanics</option><option>Fashion and Textile Design</option></select></label>
          <label>Assessment location<input value={candidate.centre} onChange={e=>setCandidate({...candidate,centre:e.target.value})}/></label>
        </div>
        <div className="standard-box"><FileText/><div><b>Demonstration standard</b><span>Manual metal arc welding — practical task • 5 observable criteria</span></div><BadgeCheck/></div>
        <div className="actions"><span/><button onClick={()=>setStep(1)}>Continue to evidence <ChevronRight/></button></div>
      </section>}

      {step===1&&<section className="card stage">
        <div className="section-title"><div className="iconbox"><Camera/></div><div><span>Step 2</span><h2>Capture practical evidence</h2><p>The candidate follows short recording prompts. Capture can happen offline and upload later when connectivity is available.</p></div></div>
        <div className="capture-layout">
          <div className={`upload ${file?'has-file':''}`}>
            <input type="file" accept="video/*" id="video" onChange={e=>setFile(e.target.files?.[0]||null)}/>
            {!file?<><div className="upload-icon"><Upload/></div><h3>Upload a demonstration video</h3><p>MP4, MOV or WebM • For this prototype, any video can be used.</p><label htmlFor="video" className="secondary">Choose video</label><button className="sample" onClick={()=>setFile({name:'demo-welding-assessment.mp4',size:18400000})}><Play/> Use sample evidence</button></>:<><div className="video-preview"><Video/><Play/></div><h3>{file.name}</h3><p>{file.size?`${(file.size/1000000).toFixed(1)} MB`:'Video selected'} • Ready to analyse</p><label htmlFor="video" className="text-button">Replace video</label></>}
          </div>
          <div className="prompts"><h3>Recording checklist</h3>{['Show the candidate and work area','Show protective equipment','Show material preparation and setup','Record the complete welding task','Show a close-up of the finished weld'].map((x,i)=><div className="prompt" key={x}><span>{i+1}</span><p>{x}</p><Check/></div>)}<div className="offline"><Clock3/><p><b>Designed for intermittent connectivity</b><br/>Guidance and recording work offline. Cloud assessment starts after the evidence synchronises.</p></div></div>
        </div>
        <div className="actions"><button className="ghost" onClick={()=>setStep(0)}>Back</button><button disabled={!file} onClick={nextFromEvidence}>Analyse evidence <Sparkles/></button></div>
      </section>}

      {step===2&&<section className="card stage">
        {analysing?<div className="analysing"><div className="orbit"><Sparkles/></div><p className="eyebrow">Simulated Gemini analysis</p><h2>Mapping video evidence to the standard</h2><p>Locating observable actions, attaching timestamps and identifying where evidence is uncertain.</p><div className="progress"><span/></div><small>No real model call is being made in this demonstration.</small></div>:<>
          <div className="section-title split"><div><span>Step 3</span><h2>AI-prepared evidence</h2><p>Each finding is linked to the competency standard and a point in the recording.</p></div><div className="summary"><b>{score}/5</b><span>criteria observed</span></div></div>
          <div className="analysis-list">{criteria.map(c=><div className="analysis-row" key={c.id}><div className="criterion-code">{c.code}</div><div className="criterion-main"><div><h3>{c.title}</h3><StatusPill value={c.result}/></div><p>{c.evidence}</p><span className="time"><Play/> {c.timestamp}</span></div><div className="confidence"><b>{c.confidence}%</b><span>confidence</span></div></div>)}</div>
          <div className="human-note"><ShieldCheck/><p><b>AI prepares evidence; it does not certify the candidate.</b><br/>A qualified assessor must review every criterion and make the final recommendation.</p></div>
          <div className="actions"><button className="ghost" onClick={()=>setStep(1)}>Back</button><button onClick={()=>setStep(3)}>Open assessor review <ChevronRight/></button></div>
        </>}
      </section>}

      {step===3&&<section className="card stage">
        <div className="section-title split"><div><span>Step 4</span><h2>Assessor review</h2><p>Accept, change or request more evidence. Every human decision is recorded.</p></div><div className="candidate-chip"><HardHat/><div><b>{candidate.name}</b><span>{candidate.trade}</span></div></div></div>
        <div className="review-list">{review.map(c=><article className="review-card" key={c.id}><div className="review-head"><div><span>{c.code}</span><h3>{c.title}</h3></div><StatusPill value={c.result}/></div><p className="evidence">“{c.evidence}” <b>{c.timestamp}</b></p><div className="review-controls"><label>Assessor decision<select value={c.assessorResult} onChange={e=>updateCriterion(c.id,'assessorResult',e.target.value)}><option value="observed">Competent / observed</option><option value="partial">Partially observed</option><option value="insufficient">Request more evidence</option><option value="not_observed">Not competent</option></select></label><label>Assessor note<input placeholder="Add an optional note…" value={c.comment} onChange={e=>updateCriterion(c.id,'comment',e.target.value)}/></label></div></article>)}</div>
        <div className="decision-box"><div><ClipboardCheck/><p><b>Assessor recommendation</b><br/>{score===5?'All criteria have been confirmed.':'Additional evidence is required before a final competency decision.'}</p></div><label className="check"><input type="checkbox" checked={signed} onChange={e=>setSigned(e.target.checked)}/><span><Check/></span>I confirm that I reviewed the evidence and remain responsible for this recommendation.</label></div>
        <div className="actions"><button className="ghost" onClick={()=>setStep(2)}>Back</button><button disabled={!signed} onClick={()=>setStep(4)}>Generate evidence report <FileText/></button></div>
      </section>}

      {step===4&&<section className="report-wrap">
        <div className="report-actions"><div><CheckCircle2/><p><b>Evidence report prepared</b><br/>This is not an official certificate.</p></div><button onClick={()=>window.print()}><FileText/> Print / save PDF</button></div>
        <section className="report">
          <div className="report-header"><Logo/><div><span>ASSESSMENT EVIDENCE REPORT</span><b>PM-DEMO-2026-001</b></div></div>
          <div className="report-title"><p>Recognition of Prior Learning</p><h1>{candidate.trade}</h1><span>Application prototype • Demonstration only</span></div>
          <div className="report-grid"><div><span>Candidate</span><b>{candidate.name}</b></div><div><span>Reference</span><b>{candidate.nrc}</b></div><div><span>Location</span><b>{candidate.centre}</b></div><div><span>Evidence reviewed</span><b>Video submission</b></div></div>
          <h2>Criterion-level findings</h2>
          <table><thead><tr><th>Criterion</th><th>AI-prepared finding</th><th>Assessor decision</th><th>Evidence</th></tr></thead><tbody>{review.map(c=><tr key={c.id}><td><b>{c.code}</b><br/>{c.title}</td><td>{labels[c.result]}<br/><small>{c.confidence}% confidence</small></td><td><b>{labels[c.assessorResult]}</b>{c.comment&&<><br/><small>{c.comment}</small></>}</td><td>{c.timestamp}</td></tr>)}</tbody></table>
          <div className="report-result"><div><span>Assessor recommendation</span><h3>{score===5?'Evidence supports competence':'Additional evidence required'}</h3><p>{score} of 5 criteria confirmed as observed. The authorised assessment body retains the final certification decision.</p></div><ShieldCheck/></div>
          <div className="report-disclosure"><AlertTriangle/><p><b>Prototype disclosure:</b> AI findings in this report are fixed demonstration outputs and were not produced by a live assessment model. This report has no certification value.</p></div>
          <div className="signatures"><div><span>Qualified assessor</span><i>Signature and date</i></div><div><span>Authorised institution</span><i>Official verification</i></div></div>
        </section>
      </section>}
    </main>
    <footer><Logo/><p>Human-reviewed evidence for trusted skills recognition.</p><span>Prototype v0.1</span></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
