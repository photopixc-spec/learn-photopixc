/* PhotoPixc Skill Lab V7.5, self-contained offline cases. All examples fictional. */
(function(){
'use strict';
var CASES=window.V75_CASES||[];
if(CASES.length!==6||typeof state==='undefined'||typeof save!=='function'||typeof showView!=='function')return;
var $=function(id){return document.getElementById(id)}, escape=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
var bangla=function(n){return String(n).replace(/[0-9]/g,function(d){return '০১২৩৪৫৬৭৮৯'[+d];});};
function bag(){if(!state.v75Cases||typeof state.v75Cases!=='object'||Array.isArray(state.v75Cases))state.v75Cases={};return state.v75Cases;}
function rec(id){var b=bag();if(!b[id]||typeof b[id]!=='object'||Array.isArray(b[id]))b[id]={metricInput:'',metricOk:false,choice:null,choiceOk:false,reflection:'',selfChecked:false,finished:false,tries:0};return b[id];}
function validNote(r){return String(r.reflection||'').trim().length>=60;}
function canComplete(r){return r.metricOk&&r.choiceOk&&validNote(r)&&r.selfChecked;}
var selected=CASES[0].id;
function current(){return CASES.find(function(c){return c.id===selected;})||CASES[0];}
function doneCount(){return CASES.filter(function(c){var r=rec(c.id);return r.finished&&canComplete(r);}).length;}
function updateProgress(){var n=doneCount();$('v75Progress').innerHTML='<div class="v75-stats"><strong>'+bangla(n)+' / '+bangla(CASES.length)+' কেস সম্পন্ন</strong><span class="v75-muted">সঠিক হিসাব + সিদ্ধান্ত + নিজের যুক্তি</span></div><div class="v75-progress" role="progressbar" aria-label="Case Study Progress" aria-valuemin="0" aria-valuemax="6" aria-valuenow="'+n+'"><span style="width:'+(n*100/6)+'%"></span></div>';}
function cards(){
 $('v75CaseList').innerHTML=CASES.map(function(c,i){var r=rec(c.id),part=[r.metricOk,r.choiceOk,validNote(r)].filter(Boolean).length;return '<button type="button" class="v75-card" data-v75id="'+escape(c.id)+'" aria-pressed="'+(selected===c.id)+'"><span class="v75-badge">CASE '+bangla(i+1)+' · '+escape(c.level)+'</span><b>'+escape(c.name)+'</b><small>'+escape(c.topic)+' · '+escape(c.time)+'</small><small>ধাপ '+bangla(part)+'/৩ '+(r.finished&&canComplete(r)?' · ✓ শেষ':' · প্র্যাকটিস চলছে')+'</small></button>';}).join('');
 $('v75CaseList').querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){selected=b.dataset.v75id;render();$('v75ActiveCase').scrollIntoView({block:'start',behavior:'smooth'});});});
}
function refreshFooter(c){var r=rec(c.id);$('v75DoneStatus').textContent=r.finished&&canComplete(r)?'✓ Self-reviewed Case Study সম্পন্ন':(canComplete(r)?'তিন ধাপ শেষ। এবার “কেস সম্পন্ন” চাপো।':'আরও অনুশীলন বাকি: সঠিক হিসাব, সিদ্ধান্ত, কমপক্ষে ৬০ অক্ষরের যুক্তি ও Self-check দরকার।');$('v75Finish').disabled=!canComplete(r)||r.finished;}
function render(){
 var c=current(),r=rec(c.id);
 updateProgress();cards();
 var fmt=escape(c.formula),sample=escape(c.sample);
 $('v75ActiveCase').innerHTML='<article class="v75-case"><div class="v75-eyebrow">INTERACTIVE CASE STUDY · SYNTHETIC DATA</div><h2>'+escape(c.name)+'</h2><p class="v75-muted">'+escape(c.company)+' · '+escape(c.topic)+' · '+escape(c.time)+'</p><p>'+escape(c.brief)+'</p><div class="v75-facts"><b>CSV Data:</b> '+bangla(c.rows)+'টি সারি<br><b>সারাংশ:</b> '+escape(c.summary)+'</div><a class="v75-link" href="'+escape(c.csv)+'" download>↓ নমুনা CSV ডাউনলোড</a><p class="v75-muted">এই সংখ্যাগুলো কাল্পনিক। প্রকৃত ক্লায়েন্ট বা Campaign Performance নয়।</p></article>'+
 '<div class="v75-steps"><span class="v75-step '+(r.metricOk?'done':'')+'">① হিসাব</span><span class="v75-step '+(r.choiceOk?'done':'')+'">② সিদ্ধান্ত</span><span class="v75-step '+(validNote(r)?'done':'')+'">③ যুক্তি লেখা</span></div>'+
 '<article class="v75-case"><div class="v75-eyebrow">STEP 01 · CALCULATE</div><h3>'+escape(c.question)+'</h3><p><b>Formula:</b> '+fmt+'</p><label for="v75Metric">নিজের উত্তর (English/বাংলা digit গ্রহণ করে)</label><div><input class="v75-answer" id="v75Metric" type="text" inputmode="decimal" autocomplete="off" placeholder="যেমন: 4.20" value="'+escape(r.metricInput||'')+'"><span class="v75-unit">'+escape(c.unit)+'</span></div><div class="v75-actions"><button class="btn primary" id="v75CheckMetric" type="button">হিসাব যাচাই</button><button class="btn" id="v75Hint" type="button">ইঙ্গিত দেখো</button></div><div class="v75-feedback" id="v75MetricFeedback" aria-live="polite">'+(r.metricOk?'✓ সঠিক হিসাব। ফল: '+escape(c.expected):'CSV দেখে হিসাব করো। সঠিক উত্তরের আগে ইঙ্গিত চাইতে পারবে।')+'</div><div id="v75HintText" class="v75-muted" hidden>'+escape(c.hint)+'</div></article>'+
 '<article class="v75-case"><div class="v75-eyebrow">STEP 02 · DECIDE</div><h3>এই পরিস্থিতিতে কোন সিদ্ধান্তটি সবচেয়ে যুক্তিযুক্ত?</h3><div class="v75-options">'+c.options.map(function(o,i){return '<button class="v75-option" data-v75choice="'+i+'" type="button" aria-pressed="'+(r.choice===i)+'">'+bangla(i+1)+'. '+escape(o)+'</button>';}).join('')+'</div><div class="v75-feedback" id="v75ChoiceFeedback" aria-live="polite">'+(r.choiceOk?'✓ সঠিক। '+escape(c.why):'একটি সিদ্ধান্ত নির্বাচন করো।')+'</div></article>'+
 '<article class="v75-case"><div class="v75-eyebrow">STEP 03 · EXPLAIN</div><h3>নিজের Client Recommendation লেখো</h3><p>'+escape(c.reflect)+'</p><label for="v75Reflection">তোমার নিজের ব্যাখ্যা (কমপক্ষে ৬০ অক্ষর)</label><textarea class="v75-evidence" id="v75Reflection" maxlength="5000" placeholder="কারণ, সম্ভাব্য পরবর্তী কাজ ও যাচাইয়ের পদ্ধতি লেখো">'+escape(r.reflection||'')+'</textarea><p class="v75-muted" id="v75Count"></p><details class="v75-revision"><summary>উদাহরণমূলক উত্তর দেখতে চাই</summary><p class="v75-sample">'+sample+'</p><p class="v75-muted">এই উত্তর দেখে নিজের ভাষায় ব্যাখ্যা করো। কপি করে লেখা পূর্ণ দক্ষতার প্রমাণ নয়।</p></details><label class="v75-checkbox"><input type="checkbox" id="v75SelfCheck" '+(r.selfChecked?'checked':'')+'> আমি CSV ও নিজের যুক্তি যাচাই করেছি</label><div class="v75-actions"><button class="btn primary" type="button" id="v75Finish">কেস সম্পন্ন করুন</button><button class="btn" type="button" id="v75Next">পরের কেস →</button><button class="btn" type="button" id="v75Workbook">ওয়ার্কবুকে ফিরুন</button></div><p id="v75DoneStatus" class="v75-grade" aria-live="polite"></p><p class="v75-muted">এটি Self-study Practice—সার্টিফিকেশন, বাস্তব ক্লায়েন্টের ফল বা স্বাধীন দক্ষতা যাচাই নয়। Progress বর্তমান Browser-এ সেভ থাকবে।</p></article>';
 $('v75Metric').addEventListener('input',function(){var rr=rec(c.id);if(rr.metricInput!==this.value){rr.metricInput=this.value;rr.metricOk=false;rr.finished=false;save();$('v75MetricFeedback').textContent='উত্তর পরিবর্তিত হয়েছে—আবার যাচাই করো।';refreshFooter(c);}});
 $('v75CheckMetric').addEventListener('click',function(){
  var rr=rec(c.id),str=$('v75Metric').value.trim().replace(/[০-৯]/g,function(d){return String('০১২৩৪৫৬৭৮৯'.indexOf(d));}).replace(/,/g,'').replace(/[−–]/g,'-');
  var v=Number(str), ok=str!==''&&Number.isFinite(v)&&v>=0&&Math.abs(v-c.answer)<=Math.max(0.015,Math.abs(c.answer)*0.0001);
  rr.metricInput=$('v75Metric').value;rr.tries=(rr.tries||0)+1;rr.metricOk=ok;rr.finished=false;save();
  var feedback=$('v75MetricFeedback');feedback.className='v75-feedback '+(ok?'ok':'bad');feedback.textContent=ok?'✓ সঠিক! '+c.formula+' = '+c.expected:'এখনো মেলেনি। '+(rr.tries>=2?c.hint:'ইঙ্গিত দেখে আবার চেষ্টা করো।');refreshFooter(c);updateProgress();cards();
 });
 $('v75Hint').addEventListener('click',function(){$('v75HintText').hidden=!$('v75HintText').hidden;});
 $('v75ActiveCase').querySelectorAll('[data-v75choice]').forEach(function(b){b.addEventListener('click',function(){var rr=rec(c.id),v=Number(this.dataset.v75choice);rr.choice=v;rr.choiceOk=(v===c.choice);rr.finished=false;save();$('v75ActiveCase').querySelectorAll('[data-v75choice]').forEach(function(x){x.setAttribute('aria-pressed',String(Number(x.dataset.v75choice)===v));});var f=$('v75ChoiceFeedback');f.className='v75-feedback '+(rr.choiceOk?'ok':'bad');f.textContent=(rr.choiceOk?'✓ সঠিক! ':'আরেকবার ভাবো। ')+c.why;refreshFooter(c);updateProgress();cards();});});
 $('v75Reflection').addEventListener('input',function(){var rr=rec(c.id);rr.reflection=this.value.slice(0,5000);rr.finished=false;save();$('v75Count').textContent='লেখা হয়েছে '+bangla(this.value.trim().length)+' / ৬০ অক্ষর (ন্যূনতম)';refreshFooter(c);updateProgress();cards();});
 $('v75Count').textContent='লেখা হয়েছে '+bangla(String(r.reflection||'').trim().length)+' / ৬০ অক্ষর (ন্যূনতম)';
 $('v75SelfCheck').addEventListener('change',function(){var rr=rec(c.id);rr.selfChecked=this.checked;rr.finished=false;save();refreshFooter(c);updateProgress();cards();});
 $('v75Finish').addEventListener('click',function(){var rr=rec(c.id);if(!canComplete(rr))return;rr.finished=true;rr.finishedAt=new Date().toISOString();save();render();$('v75ActiveCase').scrollIntoView({block:'start',behavior:'smooth'});});
 $('v75Next').addEventListener('click',function(){var index=CASES.findIndex(function(d){return d.id===selected;});selected=CASES[(index+1)%CASES.length].id;render();$('v75ActiveCase').scrollIntoView({block:'start',behavior:'smooth'});});
 $('v75Workbook').addEventListener('click',function(){showView('workbook');});
 refreshFooter(c);
}
$('v75AllFiles').innerHTML=CASES.map(function(c){return '<a class="v74-file" href="'+escape(c.csv)+'" download>'+escape(c.name)+'<small>'+escape(c.rows)+'টি নমুনা রেকর্ড · CSV</small></a>';}).join('');
$('v75StartHome').addEventListener('click',function(){showView('case-studies');render();});
document.querySelector('[data-view="case-studies"]').addEventListener('click',render);
render();
window.PhotoPixcSkillLabV75={version:'7.5',cases:CASES.length,correctAnswers:CASES.map(function(c){return c.answer;}),render:render};
})();
