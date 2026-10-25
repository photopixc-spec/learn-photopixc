'use strict';
// Practice schedules are local learning aids, not automated reminders.
let revisionRound=null;
const revisionDay=86400000;
function revisionItems(mode='due',now=Date.now()){
 const items=[];
 for(const l of lessons){if(mode==='saved'?!state.bookmarks[l.id]:mode!=='all'&&!state.read[l.id])continue;
 l.qs.forEach((q,qi)=>{const key=`${l.id}-${qi}`,r=state.revision[key];if(mode==='due'&&r&&r.due>now)return;items.push({id:l.id,qi,key,due:r?.due||0,weak:!!state.mistakes[key],seed:l.id+qi+(r?.attempts||0)});});}
 return items.sort((a,b)=>Number(b.weak)-Number(a.weak)||a.due-b.due||a.qi-b.qi||a.id-b.id);
}
function scheduleRevision(key,correct,now=Date.now()){
 const old=state.revision[key]||{streak:0,attempts:0};const streak=correct?Math.min(old.streak+1,5):0;
 const days=correct?[1,3,7,14,30][streak-1]:1;
 state.revision[key]={streak,attempts:old.attempts+1,due:now+days*revisionDay,last:now,correct};return days;
}
function startRevision(mode){const items=revisionItems(mode).slice(0,5);revisionRound=items.length?{items,index:0,results:[]}:null;renderRevision();}
function answerRevision(picked){const r=revisionRound;if(!r||r.results[r.index]||!Number.isInteger(picked)||picked<0||picked>2)return;
 const item=r.items[r.index],q=lessons[item.id-1].qs[item.qi],correct=picked===q.answer;
 const days=scheduleRevision(item.key,correct);r.results[r.index]={picked,correct,days};persist();renderRevision();
}
function renderRevision(){
 const due=revisionItems().length,saved=lessons.filter(l=>state.bookmarks[l.id]);
 $('#main').innerHTML=header('মনে রাখার Revision room','RECALL · EXPLAIN · REPEAT','প্রথমে নিজের ভাষায় মনে করুন, তারপর উত্তর দিন। এখানে মূল lesson quiz-এর প্রশ্ন পুনরায় practice হবে; mastery score বদলাবে না।')+`<div class="two-col"><section class="card"><h2>আজ আবার ভাবুন</h2><p>পড়া lessons থেকে ${bn(due)}টি প্রশ্ন review-এর জন্য প্রস্তুত। নতুন পড়া lesson-এর প্রশ্নও এতে আছে।</p><div class="flex"><button id="revision-due" class="primary" ${due?'':'disabled'}>৫টি due প্রশ্ন</button><button id="revision-all">সব topic থেকে practice</button></div><p class="small muted">সঠিক হলে পরের review ১ → ৩ → ৭ → ১৪ → ৩০ দিন পরে; ভুল হলে ১ দিন পরে। এটি সহজ practice schedule, নিশ্চয়তা বা notification নয়। প্রতিটি উত্তর save হয়; চলতি round page refresh করলে নতুন করে শুরু হবে।</p></section><section class="card"><h2>নিজের শেখা যাচাই</h2><ol><li>উত্তর দেখার আগে “কেন?” বলুন।</li><li>ভুল হলে explanation ও lesson পড়ুন।</li><li>একটি নতুন business example বানান।</li><li>Practice tab-এ evidence রাখুন।</li></ol><a href="#review">মূল quiz-এর ভুলগুলো দেখুন →</a></section></div><div id="revision-question" aria-live="polite"></div><section class="card"><h2>Saved lessons · ${bn(saved.length)}</h2><p class="small muted">Lesson-এর Save button দিয়ে কঠিন বা দরকারি topic এখানে রাখুন।</p>${saved.length?`<button id="revision-saved">Saved topics practice</button><ul>${saved.map(l=>`<li><a href="#g-lesson-${l.id}">${bn(l.id)}. ${esc(l.title)}</a></li>`).join('')}</ul>`:'<p>এখনও saved lesson নেই। <a href="#g-lesson-1">একটি lesson খুলুন →</a></p>'}</section>`;
 $('#revision-due').onclick=()=>startRevision('due');$('#revision-all').onclick=()=>startRevision('all');if(saved.length)$('#revision-saved').onclick=()=>startRevision('saved');
 const r=revisionRound;if(!r)return;
 if(r.index>=r.items.length){$('#revision-question').innerHTML=`<section class="worked"><h2>Round শেষ · ${bn(r.results.filter(v=>v.correct).length)}/${bn(r.items.length)} সঠিক</h2><p>ভুলের কারণ নিজের ভাষায় বলুন। আজই আবার practice করা যায়; পরের due review উত্তর অনুযায়ী রাখা হয়েছে।</p><button id="revision-close">Round বন্ধ করুন</button></section>`;$('#revision-close').onclick=()=>{revisionRound=null;renderRevision();};return;}
 const item=r.items[r.index],l=lessons[item.id-1],q=l.qs[item.qi],result=r.results[r.index];
 $('#revision-question').innerHTML=`<section class="card quiz-container"><span class="eyebrow">প্রশ্ন ${bn(r.index+1)} / ${bn(r.items.length)} · Lesson ${bn(l.id)}</span><h2>${esc(q.text)}</h2><p class="small muted">মনে মনে উত্তর ও কারণ বলুন, তারপর option বাছুন।</p><form id="revision-form"><fieldset><legend>একটি উত্তর বাছুন</legend><div class="choices">${optionOrder(item.seed).map(v=>`<label class="choice"><input type="radio" name="revision-answer" value="${v}" ${result?'disabled':''} ${result?.picked===v?'checked':''}><span>${esc(q.options[v])}</span></label>`).join('')}</div><button class="primary" ${result?'hidden':''}>উত্তর যাচাই</button><p id="revision-error" role="alert"></p></fieldset></form>${result?`<div class="feedback ${result.correct?'':'wrong'}"><h3>${result.correct?'✓ সঠিক':'আবার বুঝে নিই'}</h3><p><strong>সঠিক উত্তর:</strong> ${esc(q.options[q.answer])}</p><p>${esc(q.why)}</p>${result.correct?'':`<p>${esc(l.analogy)}</p>`}<p class="small">পরের review: ${bn(result.days)} দিন পরে।</p><a href="#g-lesson-${l.id}">সম্পূর্ণ lesson পড়ুন →</a></div><button id="revision-next">${r.index===r.items.length-1?'Round result':'পরের প্রশ্ন'} →</button>`:''}</section>`;
 $('#revision-form').onsubmit=e=>{e.preventDefault();const choice=$('input[name="revision-answer"]:checked');if(!choice){$('#revision-error').textContent='আগে একটি উত্তর বাছুন।';return;}answerRevision(Number(choice.value));};
 if(result)$('#revision-next').onclick=()=>{r.index++;renderRevision();};
}
