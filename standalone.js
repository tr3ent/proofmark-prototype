const criteria=[
 {code:'OS-01',title:'Personal protective equipment',result:'observed',confidence:96,time:'00:08–00:18',evidence:'Candidate is visibly wearing a welding helmet, leather gloves and protective overalls before starting the task.'},
 {code:'WP-02',title:'Workpiece preparation',result:'observed',confidence:91,time:'00:24–00:47',evidence:'The joint edges are cleaned and both plates are aligned and clamped before the arc is started.'},
 {code:'ES-03',title:'Equipment setup',result:'partial',confidence:74,time:'00:50–01:06',evidence:'Electrode selection is visible, but the amperage display is partially obscured. Additional close-up evidence is recommended.'},
 {code:'WT-04',title:'Welding technique',result:'observed',confidence:88,time:'01:12–02:04',evidence:'Travel speed and electrode angle remain consistent through most of the weld run.'},
 {code:'QI-05',title:'Finished-weld inspection',result:'insufficient',confidence:62,time:'02:11–02:25',evidence:'The final weld is shown, but the camera distance is too great to assess porosity, undercut or bead consistency reliably.'}
];
const labels={observed:'Observed',partial:'Partially observed',insufficient:'Insufficient evidence',not_observed:'Not observed'};
let stage=0;const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function setStage(n){stage=n;$$('.stage').forEach(x=>x.classList.toggle('active',+x.dataset.stage===n));renderSteps();window.scrollTo({top:0,behavior:'smooth'});}
function renderSteps(){const names=['Candidate','Evidence','AI analysis','Assessor review','Report'];$('#stepper').innerHTML=names.map((x,i)=>`<div class="step ${i<=stage?'active':''}"><span>${i<stage?'✓':i+1}</span><b>${x}</b></div>${i<4?`<div class="line ${i<stage?'active':''}"></div>`:''}`).join('');}
function status(v){return `<span class="status ${v}">${v==='observed'?'✓':v==='insufficient'?'⚠':'ⓘ'} ${labels[v]}</span>`}
function renderData(){
 $('#prompts').innerHTML=['Show the candidate and work area','Show protective equipment','Show material preparation and setup','Record the complete welding task','Show a close-up of the finished weld'].map((x,i)=>`<div class="prompt"><span>${i+1}</span><p>${x}</p><b>✓</b></div>`).join('');
 $('#analysisList').innerHTML=criteria.map(c=>`<div class="analysis-row"><div class="criterion-code">${c.code}</div><div class="criterion-main"><div><h3>${c.title}</h3>${status(c.result)}</div><p>${c.evidence}</p><span class="time">▶ ${c.time}</span></div><div class="confidence"><b>${c.confidence}%</b><span>confidence</span></div></div>`).join('');
 $('#reviewList').innerHTML=criteria.map((c,i)=>`<article class="review-card"><div class="review-head"><div><span>${c.code}</span><h3>${c.title}</h3></div>${status(c.result)}</div><p class="evidence">“${c.evidence}” <b>${c.time}</b></p><div class="review-controls"><label>Assessor decision<select class="decision" data-i="${i}"><option value="observed" ${c.result==='observed'?'selected':''}>Competent / observed</option><option value="partial" ${c.result==='partial'?'selected':''}>Partially observed</option><option value="insufficient" ${c.result==='insufficient'?'selected':''}>Request more evidence</option><option value="not_observed">Not competent</option></select></label><label>Assessor note<input class="comment" data-i="${i}" placeholder="Add an optional note…"></label></div></article>`).join('');
 $$('.decision').forEach(x=>x.addEventListener('change',updateRecommendation));
}
function updateRecommendation(){const observed=$$('.decision').filter(x=>x.value==='observed').length;$('#recommendation').textContent=observed===5?'All five criteria have been confirmed by the assessor.':'Additional evidence is required before a final competency decision.';}
function buildReport(){
 $('#reportName').textContent=$('#candidateName').value;$('#reportRef').textContent=$('#candidateRef').value;$('#reportLocation').textContent=$('#location').value;$('#reportTrade').textContent=$('#trade').value;
 const decisions=$$('.decision').map(x=>x.value),comments=$$('.comment').map(x=>x.value);const observed=decisions.filter(x=>x==='observed').length;
 $('#reportRows').innerHTML=criteria.map((c,i)=>`<tr><td><b>${c.code}</b><br>${c.title}</td><td>${labels[c.result]}<br><small>${c.confidence}% confidence</small></td><td><b>${labels[decisions[i]]}</b>${comments[i]?`<br><small>${comments[i]}</small>`:''}</td><td>${c.time}</td></tr>`).join('');
 $('#reportDecision').textContent=observed===5?'Evidence supports competence':'Additional evidence required';setStage(4);
}
$$('[data-next]').forEach(b=>b.onclick=()=>{const n=+b.dataset.next;if(n===3)$('#candidateChip').textContent=$('#candidateName').value;setStage(n)});
$$('[data-back]').forEach(b=>b.onclick=()=>setStage(+b.dataset.back));
$('#video').onchange=e=>{const f=e.target.files[0];if(f){$('#fileTitle').textContent=f.name;$('#fileInfo').textContent=`${(f.size/1e6).toFixed(1)} MB • Ready to analyse`;$('#analyse').disabled=false;$('#uploadBox').classList.add('has-file')}};
$('#sample').onclick=()=>{$('#fileTitle').textContent='demo-welding-assessment.mp4';$('#fileInfo').textContent='18.4 MB • Sample evidence ready';$('#analyse').disabled=false;$('#uploadBox').classList.add('has-file')};
$('#analyse').onclick=()=>{setStage(2);$('#analysing').hidden=false;$('#analysisResults').hidden=true;setTimeout(()=>{$('#analysing').hidden=true;$('#analysisResults').hidden=false},1700)};
$('#confirm').onchange=e=>$('#reportBtn').disabled=!e.target.checked;$('#reportBtn').onclick=buildReport;$('#reset').onclick=()=>location.reload();renderData();renderSteps();
$('#consent').onchange=e=>$('#candidateContinue').disabled=!e.target.checked;
