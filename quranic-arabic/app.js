'use strict';
(()=>{
 const INFO=window.QA_WORDS||{words:[],surahs:[]};
 const WORDS=INFO.words||[];
 const ALPHABET=window.QA_ALPHABET||[];
 const SALAH=window.QA_SALAH||{prayers:[],steps:[],surahs:[],duas:[],preconditions:[],verseMeanings:{}};
 let salahTab="rakats",salahPrayer="fajr",salahSurah=1,salahDua="takbir",salahHideBangla=false;
 const LAST_TEN=SALAH.surahs.filter(x=>x.id>=105&&x.id<=114).sort((a,b)=>a.id-b.id);
 let lastTenSelected=105;
 const lastTenKey='photopixc.quranic-arabic.last-ten.v1';
 let lastTenLearned=[];
 try {const saved=JSON.parse(localStorage.getItem(lastTenKey)||'[]');if(Array.isArray(saved))lastTenLearned=saved.filter(x=>Number.isInteger(x)&&x>=105&&x<=114)} catch {}
 const $=(id)=>document.getElementById(id);
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const bnNum=n=>String(n).replace(/[0-9]/g,d=>'০১২৩৪৫৬৭৮৯'[+d]);
 const STORAGE_KEY='photopixc.quranic-arabic.progress.v1';
 const permitted={learned:[],bookmarked:[],quizzes:0,bestScore:0};
 const read=()=>{try{const obj=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');return {...permitted,...obj,learned:Array.isArray(obj.learned)?obj.learned.filter(x=>typeof x==='string'):[],bookmarked:Array.isArray(obj.bookmarked)?obj.bookmarked.filter(x=>typeof x==='string'):[]}}catch{return {...permitted}}};
 let state=read(),search='',lengthFilter='all',bookFilter='all',sourceFilter='all',page=0,letterSelected='ب',quiz=null;
 const save=()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch{toast('এই Browser-এ সংরক্ষণ করা যায়নি। Private mode হলে সেটিং দেখুন।')}};
 const noMarks=str=>Array.from(String(str||'')).filter(c=>!(/\p{M}/u.test(c)) && c!=='ـ').join('');
 const normalizeSearch=str=>noMarks(str).replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').trim().toLocaleLowerCase();
 const starts=()=>[...WORDS].sort((a,b)=>a.length-b.length||a.search.localeCompare(b.search,'ar'));
 const tokenParts=ar=>{const out=[];for(const ch of Array.from(ar.normalize('NFC'))){if(/\p{M}/u.test(ch)){if(out.length)out[out.length-1].marks+=ch}else if(/\p{L}/u.test(ch)){out.push({base:ch,marks:''})}}return out};
 const canNext=b=>!['ا','أ','إ','آ','ٱ','د','ذ','ر','ز','و','ؤ','ى','ة','ء'].includes(b);
 const canPrev=b=>b!=='ء';
 const joiningForm=(pieces,i)=>{const t=pieces[i],before=pieces[i-1],after=pieces[i+1];const prev=!!(before&&canNext(before.base)&&canPrev(t.base)),next=!!(after&&canNext(t.base)&&canPrev(after.base));return (prev?'ـ':'')+t.base+t.marks+(next?'ـ':'')};
 const shapePositions=(ch)=>{let forms=[ch,canNext(ch)?ch+'ـ':'—',canNext(ch)?'ـ'+ch+'ـ':'—',canPrev(ch)?'ـ'+ch:'—'];return forms};
 const specialNames={'أ':'আলিফে হামজা (أ)','إ':'আলিফে হামজা (إ)','آ':'মাদযুক্ত আলিফ','ٱ':'ওয়াসলাযুক্ত আলিফ','ؤ':'ওয়াওয়ের ওপর হামজা','ئ':'ইয়ার আসনে হামজা','ء':'হামজা','ة':'তা মারবূতা','ى':'আলিফ মাকসুরা'};
 const getName=b=>ALPHABET.find(l=>l.ch===b)?.name||specialNames[b]||'বিশেষ আরবি অক্ষর';
 // Only written Arabic combining marks are listed. The original letter form remains visible in the adjacent column.
 // Never infer a short vowel from pronunciation when no sign is written in the source word.
 const HARAKAT={
   'َ':{name:'যবর (ফাতহা)',sound:'অ/আ'},
   'ِ':{name:'যের (কাসরা)',sound:'ই'},
   'ُ':{name:'পেশ (দাম্মা)',sound:'উ'},
   'ْ':{name:'জযম (সুকুন)',sound:'স্বরহীন'},
   'ّ':{name:'তাশদীদ',sound:'দ্বিত্ব'},
   'ً':{name:'দুই যবর (তানভীন)',sound:'আন'},
   'ٍ':{name:'দুই যের (তানভীন)',sound:'ইন'},
   'ٌ':{name:'দুই পেশ (তানভীন)',sound:'উন'},
   'ٰ':{name:'খাড়া যবর',sound:'দীর্ঘ আ'},
   'ٓ':{name:'মাদ্দ',sound:'দীর্ঘ উচ্চারণ'},
   'ٔ':{name:'হামজা (উপরে)',sound:'হামজা চিহ্ন'},
   'ٕ':{name:'হামজা (নিচে)',sound:'হামজা চিহ্ন'}
 };
 const markDetails=mark=>HARAKAT[mark]||{name:'অন্যান্য আরবি চিহ্ন',sound:'প্রসঙ্গ অনুযায়ী'};
 const harakatCells=(marks,base)=>{
   const items=Array.from(marks||'');
   if(!items.length)return '<span class="no-harakat">— <span>আলাদা হরকত নেই</span></span>';
   return `<div class="harakat-list">${items.map(m=>{const d=markDetails(m);return `<span class="harakat-entry"><span class="harakat-glyph arabic" lang="ar" dir="rtl" aria-hidden="true">${esc(base)}${esc(m)}</span><span class="harakat-label">${esc(d.name)}<small>${esc(d.sound)}</small></span></span>`}).join('')}</div>`;
 };
 const harakatGuide=()=>`<details class="harakat-guide"><summary>হরকত পরিচিতি — যবর, যের, পেশ এবং অন্য চিহ্ন</summary><div class="harakat-legend">${['َ','ِ','ُ','ْ','ّ','ً','ٍ','ٌ','ٰ'].map(m=>{const d=markDetails(m);return `<div class="guide-item"><span class="harakat-glyph arabic" lang="ar" dir="rtl" aria-hidden="true">ب${esc(m)}</span><span><strong>${esc(d.name)}</strong><small>${esc(d.sound)}</small></span></div>`}).join('')}</div><p class="tiny">হরকতের উদাহরণে বর্ণটির ওপর/নিচে চিহ্ন দেখানো হয়েছে। হরকত নিজে আলাদা অক্ষর নয়। একই অক্ষরে তাশদীদ ও যবর/যের/পেশ একসঙ্গে থাকলে দুটিই দেখা যাবে। হামজাযুক্ত আলিফ (أ/إ) অক্ষর হিসেবে দেখানো হয়।</p></details>`;

 const route=()=>{const hash=decodeURIComponent(location.hash||'#qa-home');const match=hash.match(/^#qa-([^?]+)/);return match?match[1]:'home'};
 const go=(dest)=>{const hash='#qa-'+dest;if(location.hash===hash)render();else location.hash=hash; window.scrollTo({top:0,behavior:'auto'})};
 const toast=msg=>{const t=$('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast._timer);toast._timer=setTimeout(()=>t.classList.remove('show'),3200)};
 const linkButton=(dest,text,primary=false)=>`<a class="button ${primary?'primary':''}" href="#qa-${esc(dest)}">${esc(text)}</a>`;
 const arabic=(text,cl='')=>`<span class="arabic ${cl}" dir="rtl" lang="ar">${esc(text)}</span>`;
 const summary=()=>{const got=state.learned.filter(id=>WORDS.some(w=>w.id===id)).length,percent=WORDS.length?Math.round(got/WORDS.length*100):0;$('side-completion').textContent=bnNum(percent)+'%';$('side-count').textContent=`${bnNum(got)} / ${bnNum(WORDS.length)}টি শব্দ`;$('side-bar').value=percent;};
 const V4=window.QA_V4?.create({WORDS,ALPHABET,get state(){return state},save,go,render,toast})||null;
 const cards=(items)=>items.map(w=>`<button class="word-mini" type="button" data-open="${esc(w.id)}" aria-label="${esc(w.bn)}, ${esc(w.meaning)}">
  ${arabic(w.ar,'mini-word-ar')}<span class="copy"><strong>${esc(w.bn)}</strong><small>${esc(w.meaning)}</small><small>${bnNum(w.length)} অক্ষর · সূরা ${esc(w.refs[0])}${w.batch==='v5'?' · V5 নতুন':''}</small></span><span class="tick" aria-hidden="true">${state.learned.includes(w.id)?'✓':state.bookmarked.includes(w.id)?'★':'→'}</span></button>`).join('');
 function home(){const got=state.learned.filter(id=>WORDS.some(w=>w.id===id)).length;const counts=Object.fromEntries([2,3,4,5,6,7,8].map(n=>[n,WORDS.filter(w=>w.length===n).length]));return `<section class="hero"><div><span class="eyebrow">LEARN · READ · RECOGNIZE</span><h1>অক্ষর থেকে শব্দ,<br>শব্দ থেকে কুরআনের ভাষা।</h1><p>বাংলা ভাষায় আরবি ২৮টি হরফ, শব্দের শুরু-মাঝ-শেষের যুক্তরূপ, বাংলা উচ্চারণ ও অর্থ একসঙ্গে শিখুন। ছোট ধাপে এগোন, নিজেকে যাচাই করুন।</p><div class="actions">${linkButton('alphabet','হরফ শেখা শুরু করুন',true)}${linkButton('words','শব্দ শিখুন')}</div></div><div class="hero-art"><div class="hero-ar arabic" lang="ar">بِسْمِ اللّٰهِ<small>বিসমিল্লাহি · আল্লাহর নামে</small></div></div></section>
 <section class="grid4" aria-label="পাঠশালার পরিসংখ্যান"><div class="card stat"><b>${bnNum(ALPHABET.length)}</b><small>মূল আরবি হরফ</small></div><div class="card stat"><b>${bnNum(WORDS.length)}</b><small>নির্বাচিত ইউনিক লিখিত শব্দ</small></div><div class="card stat"><b>${bnNum(got)}</b><small>তোমার শেখা শব্দ</small></div><div class="card stat"><b>${bnNum(state.bestScore)}</b><small>সেরা কুইজ স্কোর (১০-এর মধ্যে)</small></div></section>
 <div class="section-head"><h2>তোমার শেখার পথ</h2><span class="pill">V6 · শেষ ১০ সূরাসহ</span></div><section class="grid3"><article class="card module"><span class="label">STEP 01</span><h3>আরবি হরফ চেনা</h3><p>২৮টি অক্ষরের মূল রূপ, বাংলা নাম ও সংযোগের নিয়ম শিখুন।</p>${linkButton('alphabet','২৮ হরফ দেখুন')}</article><article class="card module"><span class="label">STEP 02</span><h3>শব্দ ও যুক্তরূপ</h3><p>একই শব্দে মূল অক্ষর → যুক্তরূপ → বাংলা নাম → হরকত → অবস্থান, তোমার চাওয়া ক্রমে।</p>${linkButton('words','শব্দতালিকা দেখুন')}</article><article class="card module" style="border-color:#b5cfb8;background:linear-gradient(110deg,#f3f8f1,#fffefa)"><span class="label">INTERACTIVE · NEW</span><h3>যাচাই করা (ফ্ল্যাশ-কার্ড)</h3><p>হরফ, যুক্তরূপ ও শব্দার্থ নিজে নিজে টেস্ট করুন। কার্ড ফ্লিপ করে উত্তর যাচাইয়ের ডুওলিঙ্গো স্টাইল প্র্যাকটিস।</p>${linkButton('flashcards','যাচাই শুরু করুন →',true)}</article><article class="card module"><span class="label">STEP 03</span><h3>কুইজ ও Revision</h3><p>আরবি শব্দ দেখে বাংলা অর্থ মিলাও। শেখার অগ্রগতি এই Browser-এ থাকবে।</p>${linkButton('quiz','কুইজ শুরু করুন')}</article><article class="card module prayer-module"><span class="label">STEP 04 · NEW</span><h3>পাঁচ ওয়াক্ত নামাজ শিক্ষা</h3><p>ফজর–এশার রাকাত, নামাজের ধাপ, সূরা ফাতিহা ও ছোট সূরা, আত্তাহিয়্যাত, দরুদ ও দোয়া—সব এক জায়গায়।</p>${linkButton("salah","নামাজ শিক্ষা শুরু করুন",true)}</article><article class="card module last10-module"><span class="label">STEP 05 · NEW</span><h3>কুরআনের শেষ ১০টি সূরা</h3><p>আল-ফীল থেকে আন-নাস: সব ৪৮টি আয়াত আরবি, বাংলা উচ্চারণ ও সংক্ষিপ্ত অর্থসহ। নিজের পড়া যাচাই ও মুখস্থের অগ্রগতি রাখুন।</p>${linkButton("last-ten","শেষ ১০ সূরা শিখুন",true)}</article></section>
 ${V4?.dashboard()||''}<section class="card v5-new-banner"><div><span class="eyebrow">VOCABULARY EXPANSION · V5</span><h2>আরও ${bnNum(WORDS.filter(w=>w.batch==='v5').length)}টি নতুন শব্দ</h2><p>সূরা আত-তীন, আল-কদর, আয-যিলযাল, আত-তাকাসুর, আল-হুমাযাহ, আল-ফীল, কুরাইশ ও আল-মাউন থেকে নির্বাচিত। শব্দের হরকত, যুক্তরূপ, বাংলা উচ্চারণ ও অর্থ দেখো।</p></div><button type="button" class="btn primary" data-v5-jump>শুধু নতুন শব্দ দেখুন →</button></section><div class="section-head"><h2>অক্ষরসংখ্যা ধরে শব্দ শিখুন</h2><span class="muted tiny">এই সংস্করণের নির্বাচিত শব্দ</span></div><div class="grid4">${[2,3,4,5,6,7,8].map(n=>`<button class="card btn" style="display:block;text-align:left;width:100%;padding:17px" data-length="${n}"><span class="pill gray">${bnNum(n)} অক্ষর</span><h3 style="margin-top:7px">${bnNum(counts[n])}টি শব্দ</h3><span class="tiny">তালিকা খুলুন →</span></button>`).join('')}</div>
 <div class="section-head"><h2>আজকের শেখা</h2></div><div class="grid2">${cards(WORDS.slice(0,2))}</div><p class="notice">এই সংস্করণে ১৬টি ছোট সূরা থেকে নির্বাচিত শব্দ আছে। এটি পুরো কুরআনের সমস্ত ইউনিক শব্দের তালিকা নয়; এখানে দেখানো অক্ষরসংখ্যা হরকত বাদ দিয়ে লেখা অক্ষরের সংখ্যা।</p>`}

 const prayerTabs=[['rakats','৫ ওয়াক্ত ও রাকাত'],['steps','নামাজের ধাপ'],['surahs','সূরা শেখা'],['duas','দোয়া ও তাসবিহ'],['preparation','প্রস্তুতি ও অজু']];
 const prayerSource=url=>url?`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="prayer-source">উৎসে পড়ুন / শুনুন ↗</a>`:'';
 const prayerText=(ar,bn,meaning)=>`<div class="prayer-text"><div class="prayer-ar arabic" dir="rtl" lang="ar">${esc(ar)}</div><div class="prayer-bn"><strong>বাংলা উচ্চারণ (সহায়ক)</strong><span>${esc(bn)}</span></div>${meaning?`<div class="prayer-meaning"><strong>বাংলা অর্থ</strong><span>${esc(meaning)}</span></div>`:''}</div>`;
 function prayerRakat(){const p=SALAH.prayers.find(p=>p.id===salahPrayer)||SALAH.prayers[0];return `<div class="prayer-picks">${SALAH.prayers.map(x=>`<button type="button" class="prayer-pick ${x.id===p.id?'active':''}" data-salah-prayer="${esc(x.id)}" aria-pressed="${x.id===p.id}"><span>${esc(x.name)}</span><b>${bnNum(x.fard)} ফরজ</b></button>`).join('')}</div><section class="card prayer-panel"><div class="prayer-panel-head"><div><span class="eyebrow">FIVE DAILY PRAYERS</span><h2>${esc(p.name)} নামাজ</h2><p class="muted">ওয়াক্ত: ${esc(p.time)} · স্থানীয় মসজিদের সময়সূচি অনুসরণ করুন</p></div><span class="prayer-count">${bnNum(p.fard)} <small>রাকাত ফরজ</small></span></div><div class="prayer-parts">${p.parts.map(([label,num],i)=>`<div class="prayer-part"><small>ক্রম ${bnNum(i+1)}</small><strong>${esc(label)}</strong><span>${bnNum(num)} রাকাত</span></div>`).join('')}</div><p class="notice">রাকাতের এই বিন্যাস বাংলাদেশে প্রচলিত হানাফি পদ্ধতির উদাহরণ। ফরজ রাকাত নির্দিষ্ট; সুন্নত, নফল এবং বিতরের কিছু বিধানে মাজহাবভেদে পার্থক্য আছে। নফল ঐচ্ছিক, ফরজের বিকল্প নয়।</p></section><div class="prayer-next"><button class="btn" data-salah-tab="steps">নামাজের ধাপ দেখুন →</button><button class="btn" data-salah-tab="surahs">প্রয়োজনীয় সূরা শিখুন →</button></div>`}
 function prayerSteps(){return `<div class="prayer-info-grid"><div class="card"><h3>দুই রাকাতের সহজ শেখার ধাপ</h3><p class="muted">ধাপের ক্রম বোঝার জন্য। জামাতে অংশগ্রহণ ও নারী-পুরুষের কিছু আমলে মাজহাবভেদে পার্থক্য রয়েছে।</p></div><div class="card"><h3>কিরাত সম্পর্কে</h3><p>সূরা ফাতিহা মূল কিরাতের অংশ। প্রযোজ্য রাকাতে ফাতিহার পরে অন্য সূরা/আয়াত পড়া হয়। প্রতিটি নামাজের জন্য নির্দিষ্ট আলাদা সূরা বাধ্যতামূলক নয়।</p></div></div><div class="prayer-timeline">${SALAH.steps.map((x,i)=>`<article class="card prayer-step"><div class="prayer-step-num">${bnNum(i+1)}</div><div><h3>${esc(x.name)}</h3><p>${esc(x.desc)}</p><button type="button" class="prayer-small-link" data-salah-jump="${esc(x.dua)}">সংশ্লিষ্ট দোয়া দেখুন ↗</button></div></article>`).join('')}</div>`}
 function prayerSurahs(){const s=SALAH.surahs.find(x=>x.id===salahSurah)||SALAH.surahs[0];const meanings=SALAH.verseMeanings[s.id]||[];return `<div class="prayer-surah-nav">${[...SALAH.surahs].sort((a,b)=>a.id-b.id).map(x=>`<button class="prayer-surah-button ${x.id===s.id?'active':''}" type="button" aria-pressed="${x.id===s.id}" data-salah-surah="${x.id}">${esc(x.title)}<small>${bnNum(x.verses.length)} আয়াত</small></button>`).join('')}</div><section class="card prayer-surah-panel ${salahHideBangla?'hide-translit':''}"><div class="row-space"><div><span class="eyebrow">SURAH ${bnNum(s.id)}</span><h2>${esc(s.title)}</h2></div><span class="pill">${esc(s.tag)}</span></div><p>${esc(s.meaning)}</p><div class="actions no-print"><button type="button" class="btn" data-prayer-bn-toggle aria-pressed="${salahHideBangla}">${salahHideBangla?'বাংলা উচ্চারণ দেখান':'মুখস্থ অনুশীলন: বাংলা উচ্চারণ লুকান'}</button></div><p class="tiny">সূরা ফাতিহা ব্যতীত নিচের সূরাগুলোর আয়াতের আগে সাধারণভাবে বিসমিল্লাহ পড়া হয় (সূরা আত-তাওবা ব্যতিক্রম)।</p>${s.id!==1?`<div class="prayer-bismillah">${prayerText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ','বিসমিল্লাহির রাহমানির রাহীম','পরম করুণাময়, অতি দয়ালু আল্লাহর নামে।')}</div>`:''}<div class="prayer-verses">${s.verses.map((v,i)=>`<div class="prayer-ayah"><span class="prayer-ayah-number">আয়াত ${bnNum(i+1)}</span>${prayerText(v[0],v[1],meanings[i]||'')}</div>`).join('')}</div><div class="prayer-next">${prayerSource('https://quran.com/'+s.id)}<button class="btn" type="button" data-print-prayer>প্রিন্ট করুন</button></div></section>`}

 function lastTenView(){
   const s=LAST_TEN.find(x=>x.id===lastTenSelected)||LAST_TEN[0];
   const ix=LAST_TEN.indexOf(s), meanings=SALAH.verseMeanings[s.id]||[];
   const learned=LAST_TEN.filter(x=>lastTenLearned.includes(x.id)).length;
   return `<section class="prayer-head last10-head"><span class="eyebrow">STEP 05 · QURANIC MEMORIZATION</span><h1>কুরআনের শেষ ১০টি সূরা</h1><p>সূরা ১০৫ (আল-ফীল) থেকে ১১৪ (আন-নাস) — মোট ৪৮টি আয়াত। সূরা বেছে প্রতিটি আয়াতের আরবি, বাংলা উচ্চারণ ও সংক্ষিপ্ত অর্থ পড়ুন।</p><div class="last10-progress"><strong>মুখস্থ সম্পন্ন: ${bnNum(learned)} / ১০ সূরা</strong><progress value="${learned}" max="10" aria-label="মুখস্থ করা সূরার সংখ্যা"></progress></div><p class="prayer-caution">বাংলা উচ্চারণ শুদ্ধ আরবি তিলাওয়াতের বিকল্প নয়। হরকত ও মাখরাজ যাচাই করতে ক্বারি বা আরবি শিক্ষকের সাহায্য নিন। আয়াতের শেষে থামলে উচ্চারণের নিয়ম বদলাতে পারে।</p></section>
   <nav class="last10-grid no-print" aria-label="কুরআনের শেষ দশ সূরা">${LAST_TEN.map(x=>`<button type="button" class="last10-pick ${x.id===s.id?'active':''}" data-last-surah="${x.id}" aria-pressed="${x.id===s.id}"><span class="last10-num">${bnNum(x.id)}</span><strong>${esc(x.title)}</strong><small>${bnNum(x.verses.length)} আয়াত ${lastTenLearned.includes(x.id)?'· ✓ মুখস্থ':''}</small></button>`).join('')}</nav>
   <section class="card prayer-surah-panel ${salahHideBangla?'hide-translit':''}" id="last-ten-lesson"><div class="row-space"><div><span class="eyebrow">SURAH ${bnNum(s.id)} · ${bnNum(ix+1)} / ১০</span><h2>${esc(s.title)}</h2></div><span class="pill">${bnNum(s.verses.length)} আয়াত</span></div><p>${esc(s.meaning)}</p>
   <div class="actions no-print"><button type="button" class="btn" data-prayer-bn-toggle aria-pressed="${salahHideBangla}">${salahHideBangla?'বাংলা উচ্চারণ দেখান':'বাংলা উচ্চারণ লুকিয়ে নিজে পড়ুন'}</button><button type="button" class="btn ${lastTenLearned.includes(s.id)?'':'primary'}" data-last-learned="${s.id}" aria-pressed="${lastTenLearned.includes(s.id)}">${lastTenLearned.includes(s.id)?'✓ মুখস্থ হয়েছে — পরিবর্তন করুন':'☆ মুখস্থ হয়েছে চিহ্নিত করুন'}</button></div>
   <div class="prayer-bismillah">${prayerText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ','বিসমিল্লাহির রাহমানির রাহীম','পরম করুণাময়, অতি দয়ালু আল্লাহর নামে।')}</div>
   <div class="prayer-verses">${s.verses.map((v,i)=>`<article class="prayer-ayah"><span class="prayer-ayah-number">আয়াত ${bnNum(i+1)} / ${bnNum(s.verses.length)}</span>${prayerText(v[0],v[1],meanings[i]||'')}</article>`).join('')}</div>
   <div class="prayer-next no-print"><button type="button" class="btn" data-last-shift="-1" ${ix===0?'disabled':''}>← আগের সূরা</button><button type="button" class="btn primary" data-last-shift="1" ${ix===9?'disabled':''}>পরের সূরা →</button><a href="https://quran.com/${s.id}" class="prayer-source" target="_blank" rel="noopener noreferrer">কুরআনের উৎসে পড়ুন ও ক্বারির অডিও শুনুন ↗</a><button type="button" class="btn" data-print-prayer>প্রিন্ট</button></div></section>
   <p class="notice">সূরাগুলোর আরবি, অর্থ ও বাংলা উচ্চারণ পাঠদানে সহায়ক উপকরণ। এটি তাজবিদ প্রশিক্ষণ নয়। শেখার অগ্রগতি এই Browser-এ সংরক্ষিত হয়; অন্য ডিভাইসে স্বয়ংক্রিয় Sync হয় না।</p>`;
 }
 function prayerDuas(){const d=SALAH.duas.find(x=>x.id===salahDua)||SALAH.duas[0];return `<div class="prayer-dua-nav">${SALAH.duas.map(x=>`<button type="button" class="prayer-dua-button ${x.id===d.id?'active':''}" data-salah-dua="${esc(x.id)}" aria-pressed="${x.id===d.id}">${esc(x.name)}</button>`).join('')}</div><section class="card prayer-surah-panel ${salahHideBangla?'hide-translit':''}"><span class="eyebrow">SALAH RECITATION</span><h2>${esc(d.name)}</h2><p class="muted">পড়ার স্থান: ${esc(d.place)}</p><div class="actions no-print"><button type="button" class="btn" data-prayer-bn-toggle aria-pressed="${salahHideBangla}">${salahHideBangla?'বাংলা উচ্চারণ দেখান':'মুখস্থ অনুশীলন: বাংলা উচ্চারণ লুকান'}</button></div>${prayerText(d.ar,d.bn,d.meaning)}<div class="prayer-next">${prayerSource(d.source)}<button type="button" class="btn" data-salah-tab="steps">নামাজের ধাপে ফিরুন</button></div></section><p class="notice">হানাফি বিতরের তৃতীয় রাকাতে দোয়া কুনুতের বিশেষ নিয়ম রয়েছে। সেটি ও অন্যান্য সূক্ষ্ম বিধান যোগ্য শিক্ষকের সঙ্গে শিখুন। তথ্যের জন্য স্থানীয় মসজিদের ইমামের পরামর্শ নিন।</p>`}
 function prayerPreparation(){const wudu=[['নিয়ত ও শুরু','বিসমিল্লাহ বলে শুরু করুন; নিয়ত অন্তরে থাকবে।'],['দুই হাত ধোয়া','কবজি পর্যন্ত দুই হাত ধুয়ে নিন।'],['কুলি ও নাক পরিষ্কার','মুখ কুলি এবং নাকে পানি দিয়ে পরিষ্কার করুন।'],['মুখ ও দুই হাত ধোয়া','সম্পূর্ণ মুখ ধুয়ে কনুইসহ দুই হাত ধুয়ে নিন।'],['মাথা মাসেহ','ভেজা হাত দিয়ে মাথা মাসেহ করুন; পরিমাণ বিষয়ে মাজহাবভেদে পার্থক্য আছে।'],['দুই পা ধোয়া','টাখনুসহ উভয় পা ভালোভাবে ধুয়ে নিন।']];return `<div class="prayer-info-grid">${SALAH.preconditions.map((x,i)=>`<article class="card"><span class="eyebrow">প্রস্তুতি ${bnNum(i+1)}</span><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></article>`).join('')}</div><h2 class="prayer-subtitle">অজু শেখার সহজ ধাপ</h2><div class="prayer-timeline">${wudu.map((x,i)=>`<article class="card prayer-step"><span class="prayer-step-num">${bnNum(i+1)}</span><div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div></article>`).join('')}</div><p class="notice">এটি অজুর একটি সাধারণ শেখার ক্রম, সব ফরজ-সুন্নত-মাকরুহের পূর্ণ তালিকা নয়। বিশেষ পরিস্থিতি, অসুস্থতা, পবিত্রতা, অজু ভঙ্গ ও মাসেহের বিধান জানতে আলেমের পরামর্শ নিন।</p>`}
 function prayerView(){return `<div class="prayer-head"><span class="eyebrow">STEP 04 · SALAH LEARNING</span><h1>পাঁচ ওয়াক্ত নামাজ শিক্ষা</h1><p>এক জায়গায় ফরজ রাকাত, নামাজের ধাপ, দরকারি সূরা, দোয়া ও অজুর প্রাথমিক নিয়ম—আরবি, বাংলা উচ্চারণ ও অর্থসহ।</p><p class="prayer-caution">বাংলা উচ্চারণ আরবি মাখরাজ ও তাজবীদের বিকল্প নয়। কুরআনের পাঠ শুদ্ধ করতে বিশ্বস্ত শিক্ষক বা ইমামের সাহায্য নিন।</p></div><nav class="prayer-tabs" aria-label="নামাজ শেখার বিষয়">${prayerTabs.map(([id,name])=>`<button type="button" class="prayer-tab ${id===salahTab?'active':''}" aria-pressed="${id===salahTab}" data-salah-tab="${esc(id)}">${esc(name)}</button>`).join('')}</nav><div id="prayer-tab-content">${salahTab==='rakats'?prayerRakat():salahTab==='steps'?prayerSteps():salahTab==='surahs'?prayerSurahs():salahTab==='duas'?prayerDuas():prayerPreparation()}</div><div class="prayer-citation"><strong>আরও পড়ুন:</strong> <a href="https://quran.com/bn/surahs" target="_blank" rel="noopener noreferrer">Quran.com-এ সূরা</a> · <a href="https://sunnah.com/bukhari:831" target="_blank" rel="noopener noreferrer">সহিহ বুখারি: তাশাহহুদ</a> · <a href="https://sunnah.com/ibnmajah:804" target="_blank" rel="noopener noreferrer">সানা</a><p>নামাজের বিধানে প্রচলিত হানাফি রীতি অনুসারে সাধারণ পরিচিতি দেওয়া হয়েছে। অন্য মাজহাবে কিছু পার্থক্য আছে। এখানে কোনো নির্দিষ্ট ওয়াক্তের স্থানীয় ঘড়ির সময় গণনা করা হয় না।</p></div>`}

 function alphabet(){const l=ALPHABET.find(x=>x.ch===letterSelected)||ALPHABET[1];return `<span class="eyebrow">MODULE 01 · ARABIC ALPHABET</span><h1>আরবি ২৮টি মূল হরফ</h1><p class="muted">অক্ষরে ক্লিক করলে নিচে তার একক, শুরু, মাঝ ও শেষের লিখনরূপ দেখা যাবে। বাংলা নাম হলো শিক্ষার্থীর সহায়ক পরিচিতি; এটি আরবি ধ্বনির পূর্ণ বিকল্প নয়।</p>
 <section class="letter-grid" aria-label="আরবি বর্ণমালা">${ALPHABET.map(x=>`<button type="button" class="letter-tile ${x.ch===l.ch?'active':''}" data-letter="${esc(x.ch)}" aria-pressed="${x.ch===l.ch}">${arabic(x.ch)}<small>${esc(x.name)}</small></button>`).join('')}</section>
 <section class="card letter-detail" id="letter-detail" tabindex="-1">${letterDetail(l.ch)}</section><p class="notice">আরবিতে ا، د، ذ، ر، ز، و – এই ৬টি অক্ষর পরের অক্ষরের সঙ্গে যুক্ত হয় না। তাই সব অক্ষরের চারটি আলাদা যুক্তরূপ নেই।</p>`}
 function letterDetail(ch){const name=getName(ch),forms=shapePositions(ch),labels=['একক রূপ','শুরুর রূপ','মাঝের রূপ','শেষের রূপ'];return `<div class="head"><div class="big arabic" lang="ar">${esc(ch)}</div><div><div class="eyebrow">LETTER DETAIL</div><h2>${esc(name)}</h2><p class="muted">অক্ষরের লিখনরূপ দেখে চিনুন</p></div></div><div class="shape-grid">${forms.map((s,i)=>`<div class="shape-cell"><small>${labels[i]}</small>${s==='—'?'<span class="arabic" aria-label="প্রযোজ্য নয়">—</span>':arabic(s)}</div>`).join('')}</div><p class="tiny">সংযোগ বোঝাতে ـ চিহ্ন ব্যবহার করা হয়েছে। মূল কুরআনের শব্দে ফন্ট অনুযায়ী কিছু যুক্তাক্ষরের আকৃতি ভিন্ন হতে পারে।</p>`}
 function filters(){return WORDS.filter(w=>(sourceFilter==='all'||(sourceFilter==='v5'?w.batch==='v5':w.refs.some(r=>r.startsWith(sourceFilter+':'))))&&(lengthFilter==='all'||w.length===Number(lengthFilter))&&(bookFilter==='all'||(bookFilter==='learned'?state.learned.includes(w.id):state.bookmarked.includes(w.id)))&&(!search||normalizeSearch(w.ar).includes(normalizeSearch(search))||normalizeSearch(w.bn).includes(normalizeSearch(search))||normalizeSearch(w.meaning).includes(normalizeSearch(search))||w.refs.some(r=>r.includes(search.trim())))).sort((a,b)=>a.length-b.length||a.search.localeCompare(b.search,'ar'))}
 function words(){const filtered=filters(),pageCount=Math.max(1,Math.ceil(filtered.length/12));page=Math.min(page,pageCount-1);let group=filtered.slice(page*12,(page+1)*12);return `<span class="eyebrow">MODULE 02 · WORD LEARNING</span><h1>কুরআনের শব্দ শেখা</h1><p class="muted">শব্দের দৈর্ঘ্য অনুযায়ী Filter করুন, বাংলা বা আরবি দিয়ে Search করুন, শব্দ খুলে প্রতিটি অক্ষরের যুক্তরূপ ও যবর-যের-পেশসহ হরকত দেখুন।</p>
 <div class="toolbar"><input id="word-search" type="search" value="${esc(search)}" placeholder="আরবি, বাংলা উচ্চারণ, অর্থ বা সূরা:আয়াত…" aria-label="শব্দ অনুসন্ধান"><select id="word-length" aria-label="অক্ষরসংখ্যা"><option value="all">সব দৈর্ঘ্য</option>${[2,3,4,5,6,7,8].map(n=>`<option value="${n}" ${lengthFilter===String(n)?'selected':''}>${bnNum(n)} অক্ষর</option>`).join('')}</select><select id="word-source" aria-label="সূরা বা নতুন শব্দ Filter"><option value="all">সব সূরা</option><option value="v5" ${sourceFilter==='v5'?'selected':''}>শুধু নতুন V5 শব্দ</option>${INFO.surahs.map(n=>`<option value="${n}" ${sourceFilter===String(n)?'selected':''}>সূরা ${bnNum(n)}</option>`).join('')}</select><select id="word-book" aria-label="শেখা ও বুকমার্ক Filter"><option value="all">সব শব্দ</option><option value="learned" ${bookFilter==='learned'?'selected':''}>শেখা শব্দ</option><option value="bookmarked" ${bookFilter==='bookmarked'?'selected':''}>বুকমার্ক করা</option></select></div>
 <div class="row-space"><span class="tiny">মোট ${bnNum(filtered.length)}টি ফলাফল · পৃষ্ঠা ${bnNum(page+1)} / ${bnNum(pageCount)}</span><span class="pill gray">শব্দের বানান অনুসারে পৃথক</span></div>
 <div id="filtered-words" class="word-list" style="margin-top:15px">${group.length?cards(group):'<div class="empty">এই Filter-এ কোনো শব্দ পাওয়া যায়নি।</div>'}</div><div class="pager no-print"><button class="btn" data-page="prev" ${page===0?'disabled':''}>← আগের পৃষ্ঠা</button><span class="tiny">পৃষ্ঠা ${bnNum(page+1)} / ${bnNum(pageCount)}</span><button class="btn" data-page="next" ${page>=pageCount-1?'disabled':''}>পরের পৃষ্ঠা →</button></div>
 <p class="notice">V5-এ ৮টি নতুন সূরা যোগ হয়েছে: ৯৫, ৯৭, ৯৯, ১০২, ১০৪–১০৭। একটি শব্দের হরকত/অর্থ আয়াত ভেদে বদলাতে পারে। সম্পূর্ণ কুরআনিক অভিধান এখনো যোগ করা হয়নি।</p>`}
 function word(id){const w=WORDS.find(x=>x.id===id);if(!w)return `<h1>শব্দ পাওয়া যায়নি</h1>${linkButton('words','শব্দতালিকায় ফিরে যান')}`;
 const parts=tokenParts(w.ar);let joined=parts.map((p,i)=>({base:p.base,linked:joiningForm(parts,i),marks:p.marks,label:i===0?'শুরু':i===parts.length-1?'শেষ':'মাঝে',n:i}));
 return `<div class="word-heading"><a class="backlink" href="#qa-words">← সব শব্দ</a><div class="word-markers"><span class="pill gray">${bnNum(w.length)}টি অক্ষর</span>${w.batch==='v5'?'<span class="pill">V5 নতুন শব্দ</span>':''}${state.learned.includes(w.id)?'<span class="pill">✓ শেখা হয়েছে</span>':''}</div></div>
 <div class="eyebrow">WORD STUDY CARD · ${esc(w.id.toUpperCase())}</div><h1>একটি শব্দ, প্রতিটি অক্ষর</h1>
 <div class="word-study-split">
  <section class="word-card-left">
   <div class="word-display-box">
    <div class="arabic word-ar-big" lang="ar" dir="rtl">${esc(w.ar)}</div>
    <h2 class="word-bn-title">${esc(w.bn)}</h2>
    <div class="word-bn-meaning">${esc(w.meaning)}</div>
    <div class="word-sample-ref">নমুনা রেফারেন্স: ${w.refs.map(r=>`<a href="https://corpus.quran.com/wordbyword.jsp?chapter=${r.split(':')[0]}&verse=${r.split(':')[1]}" target="_blank" rel="noopener noreferrer" title="Quranic Arabic Corpus-এ সূরা ${r} দেখুন">${esc(r)}</a>`).join(' · ')}</div>
   </div>
   <div class="actions word-card-actions no-print">
    <button type="button" class="btn primary" data-learn="${w.id}">${state.learned.includes(w.id)?'✓ শেখা হয়েছে — বাতিল করুন':'✓ এই শব্দটি শিখেছি'}</button>
    <button type="button" class="btn" data-bookmark="${w.id}">${state.bookmarked.includes(w.id)?'★ বুকমার্ক সরান':'☆ পরে শেখার জন্য রাখুন'}</button>
    <button type="button" class="btn" data-speak="${w.id}">♪ ধীরে শুনুন</button>
    <button type="button" class="btn" data-speak-normal="${w.id}">♪ স্বাভাবিক গতি</button>
   </div>
  </section>
  <section class="word-analysis-right card">
   <div class="analysis-title-group">
    <h2>অক্ষর বিশ্লেষণ</h2>
    <span class="pill gray">মূল → যুক্তরূপ → বাংলা → হরকত → অবস্থান</span>
   </div>
   <div class="letters-col-scroll">
    <div class="letters-col-grid" dir="rtl">
     ${joined.map(p=>`
      <div class="letter-col-item">
       <div class="col-cell cell-pos"><span class="pos-tag">${esc(p.label)}</span></div>
       <div class="col-cell cell-form">${arabic(p.linked,'form')}</div>
       <div class="col-cell cell-base">${arabic(p.base)}</div>
       <div class="col-cell cell-name"><button type="button" class="letter-click" data-show-letter="${esc(p.base)}" title="এই অক্ষরের বিস্তারিত দেখুন">${esc(getName(p.base))} ↗</button></div>
       <div class="col-cell cell-harakat">${harakatCells(p.marks,p.base)}</div>
      </div>
     `).join('')}
    </div>
   </div>
   <p class="tiny" style="margin-top:14px">আরবি ডান থেকে বামে পড়া হয়; তাই অক্ষরগুলোর সারির ক্রমও শব্দে ডান দিক থেকে বাঁ দিকে সাজানো।</p>
   ${harakatGuide()}
  </section>
 </div>
 <div id="letter-inline"></div><p class="notice">উচ্চারণ শোনার বোতামটি ডিভাইসের Arabic text-to-speech voice ব্যবহার করে। সব ব্রাউজারে ভয়েস নাও থাকতে পারে; এটিকে তাজবীদ-অনুযায়ী যাচাইকৃত তিলাওয়াত মনে করবেন না। বাংলা উচ্চারণও আনুমানিক সহায়তা।</p>`}
 let flashcardMode='letters',flashcardItem=null,flashcardFlipped=false;
 let flashcardStats={reviewed:0,mastered:0};
 function pickFlashcard(mode){
  if(mode) flashcardMode=mode;
  flashcardFlipped=false;
  if(flashcardMode==='letters'){
   const l=ALPHABET[Math.floor(Math.random()*ALPHABET.length)];
   const forms=shapePositions(l.ch);
   const labels=['একক রূপ','শুরুর রূপ','মাঝের রূপ','শেষের রূপ'];
   const valid=forms.map((s,i)=>({shape:s,label:labels[i]})).filter(x=>x.shape!=='—');
   const picked=valid[Math.floor(Math.random()*valid.length)];
   flashcardItem={kind:'letter',letter:l,shape:picked.shape,label:picked.label};
  } else {
   const w=WORDS[Math.floor(Math.random()*WORDS.length)];
   flashcardItem={kind:'word',word:w};
  }
 }
 function flashcardView(){
  if(!flashcardItem) pickFlashcard();
  return `<div class="flashcard-page-wrap">
   <span class="eyebrow">INTERACTIVE PRACTICE · SELF ASSESSMENT</span>
   <h1>যাচাই করা — ফ্ল্যাশ-কার্ড</h1>
   <p class="muted">নিজের শেখা হরফ, যুক্তরূপ ও শব্দার্থ নিজে নিজে টেস্ট করুন। কার্ডে স্পর্শ বা ক্লিক করলে কার্ড উল্টে যাবে এবং সঠিক উত্তর দেখা যাবে।</p>
   <div class="flashcard-mode-tabs">
    <button type="button" class="flash-mode-btn ${flashcardMode==='letters'?'active':''}" data-flash-mode="letters">🔤 হরফ ও যুক্তরূপ যাচাই</button>
    <button type="button" class="flash-mode-btn ${flashcardMode==='words'?'active':''}" data-flash-mode="words">📖 কুরআনিক শব্দ যাচাই</button>
   </div>
   <div class="row-space" style="max-width:560px;margin:16px auto 12px">
    <span class="pill gray">আজকের যাচাই: ${bnNum(flashcardStats.reviewed)}টি</span>
    <span class="pill" style="color:var(--green)">✓ আয়ত্ত হয়েছে: ${bnNum(flashcardStats.mastered)}টি</span>
   </div>
   <div class="flashcard-stage">
    <div class="flashcard-box ${flashcardFlipped?'is-flipped':''}" data-flash-card-flip role="button" tabindex="0" aria-label="ফ্ল্যাশ কার্ড ফ্লিপ করতে ক্লিক করুন">
     <div class="flashcard-face flashcard-front">
      <span class="card-side-pill">সামনের পিঠ · প্রশ্ন</span>
      <div class="flashcard-center">
       ${flashcardMode==='letters'?`
        <div class="arabic flash-big-glyph" dir="rtl" lang="ar">${esc(flashcardItem.shape)}</div>
        <div class="flash-question-text">এই হরফ বা রূপটি চিনতে পারছেন?</div>
       `:`
        <div class="arabic flash-big-glyph" dir="rtl" lang="ar">${esc(flashcardItem.word.ar)}</div>
        <div class="flash-question-text">${bnNum(flashcardItem.word.length)} অক্ষরের শব্দ · মনে মনে উচ্চারণ ও অর্থ ভাবুন</div>
        <button type="button" class="btn flash-sound-btn no-flip" data-speak="${flashcardItem.word.id}">♪ উচ্চারণ শুনুন</button>
       `}
      </div>
      <span class="flash-hint-bottom">কার্ডে ক্লিক বা স্পর্শ করে উত্তর দেখুন ↻</span>
     </div>
     <div class="flashcard-face flashcard-back">
      <span class="card-side-pill back-pill">✓ উল্টো পিঠ · সঠিক উত্তর</span>
      <div class="flashcard-center">
       ${flashcardMode==='letters'?`
        <div class="arabic flash-mid-glyph" dir="rtl" lang="ar">${esc(flashcardItem.shape)}</div>
        <h2 class="flash-title">${esc(flashcardItem.letter.name)} (${esc(flashcardItem.letter.ch)})</h2>
        <div class="flash-meta-badges">
         <span class="pill">${esc(flashcardItem.label)}</span>
         <span class="pill gray">উচ্চারণ: ${esc(flashcardItem.letter.roman)}</span>
        </div>
       `:`
        <div class="arabic flash-mid-glyph" dir="rtl" lang="ar">${esc(flashcardItem.word.ar)}</div>
        <h2 class="flash-title">${esc(flashcardItem.word.bn)}</h2>
        <div class="flash-meaning">${esc(flashcardItem.word.meaning)}</div>
        <div class="flash-meta-badges" style="margin-top:8px">
         <span class="pill gray">সূরা রেফারেন্স: ${esc(flashcardItem.word.refs[0])}</span>
         <span class="pill">${bnNum(flashcardItem.word.length)}টি অক্ষর</span>
        </div>
       `}
      </div>
      <span class="flash-hint-bottom">পুনরায় ফ্লিপ করতে ক্লিক করুন ↺</span>
     </div>
    </div>
   </div>
   <div class="flashcard-actions">
    <button type="button" class="btn btn-review-card" data-flash-action="review">🔄 আরেকবার দেখাও (মনে নেই)</button>
    <button type="button" class="btn primary btn-master-card" data-flash-action="mastered">👍 সহজ / পেরেছি!</button>
    <button type="button" class="btn btn-next-card" data-flash-action="next">পরের কার্ড →</button>
   </div>
   <p class="tiny" style="text-align:center;margin-top:22px;color:var(--muted)">টিপস: কিবোর্ডের Space চাপলে কার্ড ফ্লিপ হবে। প্রতিদিন ৫-১০টি কার্ড দেখে নিজেকে যাচাই করুন।</p>
  </div>`;
 }
 function quizStart(){const pick=WORDS.filter(w=>w.length>=2&&w.length<=7);const shuffled=pick.sort(()=>Math.random()-.5);quiz={questions:shuffled.slice(0,10).map(w=>({word:w,choices:[w.meaning,...WORDS.filter(x=>x.meaning!==w.meaning).sort(()=>Math.random()-.5).slice(0,3).map(x=>x.meaning)].sort(()=>Math.random()-.5)})),index:0,answer:null,correct:0,finished:false};go('quiz')}
 function quizView(){if(!quiz)return `<span class="eyebrow">MODULE 03 · PRACTICE</span><h1>শব্দার্থ মিলিয়ে দেখো</h1><p class="muted">১০টি প্রশ্ন। একটি আরবি শব্দ দেখে সঠিক বাংলা অর্থ নির্বাচন করো। শেষ হলে তোমার ফলাফল দেখাবে।</p><section class="card" style="max-width:700px"><div class="arabic arabic-large" style="text-align:center" lang="ar">قُلْ</div><h2 style="text-align:center">قُلْ শব্দটির অর্থ কী?</h2><p style="text-align:center">উত্তর দেওয়ার আগে অনুমান করো। ভুল হলেও শিখে নেবে।</p><div class="actions" style="justify-content:center"><button class="btn primary" data-start-quiz>১০ প্রশ্নের কুইজ শুরু করুন</button></div></section>`;
 if(quiz.finished)return `<span class="eyebrow">QUIZ COMPLETE</span><h1>তোমার কুইজের ফল</h1><div class="card" style="max-width:660px;text-align:center"><div style="font:700 64px/1.4 system-ui,sans-serif;color:var(--green)">${bnNum(quiz.correct)} / ${bnNum(quiz.questions.length)}</div><h2>${quiz.correct>=8?'দারুণ! অনুশীলন চালিয়ে যাও।':'আরেকবার পড়ে চেষ্টা করো।'}</h2><p class="muted">সেরা স্কোর: ${bnNum(state.bestScore)} / ১০। এই কুইজের ফল এই Browser-এ সংরক্ষিত।</p><div class="actions" style="justify-content:center"><button class="btn primary" data-start-quiz>আবার কুইজ দাও</button>${linkButton('words','শব্দগুলো পড়ো')}</div></div>`;
 const q=quiz.questions[quiz.index],a=quiz.answer,answered=a!==null;return `<span class="eyebrow">PRACTICE · QUESTION ${quiz.index+1} OF ${quiz.questions.length}</span><h1>সঠিক অর্থ নির্বাচন করো</h1><div class="row-space"><span class="pill gray">প্রশ্ন ${bnNum(quiz.index+1)} / ${bnNum(quiz.questions.length)}</span><span class="pill">সঠিক ${bnNum(quiz.correct)}টি</span></div><div class="series-bar" style="margin:15px 0 20px"><span style="width:${100*quiz.index/quiz.questions.length}%"></span></div><div class="quiz-prompt"><div class="arabic" lang="ar" dir="rtl">${esc(q.word.ar)}</div><span class="tiny">এই শব্দের অর্থ কোনটি?</span></div><div class="quiz-choices">${q.choices.map((ch,i)=>`<button class="choice ${answered&&ch===q.word.meaning?'right':''} ${answered&&a===i&&ch!==q.word.meaning?'wrong':''}" data-answer="${i}" ${answered?'disabled':''}>${esc(ch)}</button>`).join('')}</div>${answered?`<div class="feedback"><strong>${q.choices[a]===q.word.meaning?'✓ সঠিক উত্তর!':'শেখার সুযোগ: সঠিক উত্তর দেখো'}</strong><p>${arabic(q.word.ar)} — ${esc(q.word.bn)} — ${esc(q.word.meaning)}</p></div><button class="btn primary" data-next-quiz>${quiz.index+1===quiz.questions.length?'ফলাফল দেখুন →':'পরের প্রশ্ন →'}</button>`:''}`}
 function progress(){const byLen=[2,3,4,5,6,7,8].map(n=>({n,total:WORDS.filter(w=>w.length===n).length,done:WORDS.filter(w=>w.length===n&&state.learned.includes(w.id)).length}));return `<span class="eyebrow">YOUR LEARNING PROGRESS</span><h1>আমার অগ্রগতি</h1><p class="muted">নিজের শেখা শব্দ চিহ্নিত করলে এখানে হিসাব দেখা যাবে। সব তথ্য শুধু এই Browser-এ থাকে; অন্য ডিভাইসে স্বয়ংক্রিয় Sync হয় না।</p><div class="grid3"><div class="card stat"><b>${bnNum(state.learned.length)}</b><small>শেখা শব্দ</small></div><div class="card stat"><b>${bnNum(state.bookmarked.length)}</b><small>বুকমার্ক</small></div><div class="card stat"><b>${bnNum(state.quizzes)}</b><small>সম্পন্ন কুইজ</small></div></div><section class="card" style="margin-top:20px"><h2>অক্ষরসংখ্যা অনুযায়ী অগ্রগতি</h2><div class="level-lines">${byLen.map(x=>`<div><label>${bnNum(x.n)} অক্ষরের শব্দ <span>${bnNum(x.done)} / ${bnNum(x.total)}</span></label><div class="series-bar"><span style="width:${x.total?100*x.done/x.total:0}%"></span></div></div>`).join('')}</div></section><section class="card" style="margin-top:20px"><h2>Progress Backup</h2><p class="muted">নতুন Browser-এ শেখার হিসাব নেওয়ার জন্য Export করে ফাইলটি রাখুন। Import করলে বর্তমান Progress বদলে যাবে।</p><div class="actions"><button class="btn" id="export-progress">⇩ Progress Download</button><label class="button" for="import-progress">⇧ Progress Import</label><input type="file" id="import-progress" accept="application/json,.json" style="position:absolute;width:1px;height:1px;opacity:0" aria-label="Progress JSON ফাইল নির্বাচন"></div></section>`}
 function about(){return `<span class="eyebrow">TRANSPARENCY & RESOURCES</span><h1>পাঠশালার তথ্য ও সীমাবদ্ধতা</h1><div class="grid2"><section class="card"><h2>কী আছে</h2><ul class="simple-list"><li>${bnNum(ALPHABET.length)}টি মূল আরবি হরফ ও যুক্তরূপ</li><li>${bnNum(WORDS.length)}টি নির্বাচিত, পুনরাবৃত্তিহীন লিখিত শব্দরূপ</li><li>বাংলা উচ্চারণ, সংক্ষিপ্ত অর্থ ও সূরা-আয়াত রেফারেন্স</li><li>Search, অক্ষরসংখ্যা Filter, কুইজ ও Progress Backup</li><li>বিনামূল্যে Word Builder, Harakat Practice, Daily 5 Words, Kids Mode, Level Selection ও Smart Revision</li></ul></section><section class="card"><h2>কী এখনো নেই</h2><ul class="simple-list"><li>সমগ্র কুরআনের পূর্ণ শব্দতালিকা</li><li>যাচাইকৃত পেশাদার ক্বারীর শব্দভিত্তিক Audio (ডিভাইসের স্বয়ংক্রিয় আরবি Voice থাকলে শুধু সহায়ক Audio)</li><li>বিশদ তাফসীর, সরফ-নাহু ও তাজবীদ মূল্যায়ন</li><li>অ্যাকাউন্টভিত্তিক একাধিক ডিভাইসে Sync</li></ul></section></div><section class="card" style="margin-top:18px"><h2>শব্দ গণনার নিয়ম</h2><p>একটি লিখিত শব্দে যুক্ত সব অক্ষর একই শব্দের অংশ। যবর-যের-পেশ, তাশদীদ, সুকুন, মাদ্দের ছোট চিহ্ন ও অন্যান্য combining marks গণনা হয় না; হামজাযুক্ত আলিফ (أ/إ) আলাদা একটি লিখিত অক্ষর। হরকত ছাড়া অভিন্ন বানানের পুনরাবৃত্তি সাধারণত একবার ধরা হয়েছে; তবে ওয়ামিন (وَمِنْ) ও ওয়ামান (وَمَنْ)-এর মতো একই মূল বানানে ভিন্ন অর্থ ও হরকত থাকলে শিক্ষার স্বার্থে আলাদা রাখা হয়েছে। বানানে হামজার ভিন্ন অবস্থান আলাদা শব্দরূপ থাকতে পারে। এটি শিকড় (root) বা অভিধানগত lemma গণনা নয়।</p><p>এখানে আগের ৮টি সূরার পাশাপাশি সূরা ৯৫ (আত-তীন), ৯৭ (আল-কদর), ৯৯ (আয-যিলযাল), ১০২ (আত-তাকাসুর), ১০৪ (আল-হুমাযাহ), ১০৫ (আল-ফীল), ১০৬ (কুরাইশ) ও ১০৭ (আল-মাউন) থেকে শব্দ যোগ করা হয়েছে।</p><p><a href="https://quran.com/95" target="_blank" rel="noopener noreferrer">Quran.com: সূরা আত-তীন ↗</a> · <a href="https://corpus.quran.com/" target="_blank" rel="noopener noreferrer">Quranic Arabic Corpus ↗</a> · <a href="https://tanzil.net" target="_blank" rel="noopener noreferrer">Tanzil Quran Text ↗</a></p><p class="tiny">আরবি শিক্ষাক্রমের উদাহরণ হিসেবে শব্দের হরকতসহ বানান রাখা হয়েছে। এটি পূর্ণ কুরআন পাঠ পুনঃপ্রকাশ নয়। সূত্রে একই শব্দের ভিন্ন হরকত থাকলে এই তালিকায় একটি উদাহরণরূপ দেখানো হতে পারে। V5-এর বাংলা উচ্চারণ ও শব্দার্থ শিক্ষামূলক সহায়ক ব্যাখ্যা; প্রকাশের আগে বিশেষজ্ঞের চূড়ান্ত প্রুফরিড করা বাঞ্ছনীয়।</p></section><section class="notice"><strong>উচ্চারণ-সংক্রান্ত সতর্কতা:</strong> বাংলা লিপি দিয়ে ع، ح، خ، ص، ض، ط، ظ، ق-এর ধ্বনি নির্ভুলভাবে বোঝানো যায় না। বাংলা উচ্চারণ শেখার সহায়ক মাত্র। কুরআন তিলাওয়াতের জন্য মাখরাজ ও তাজবীদ শিক্ষকের কাছে যাচাই করুন।</section>`}
 function render(){const rt=route(),sect=rt.startsWith('word-')?'words':rt.startsWith('letter-')?'alphabet':rt;document.querySelectorAll('#side-links a').forEach(a=>a.classList.toggle('active',a.dataset.route===sect));let out;
 if(rt==='home')out=home();else if(rt==='alphabet')out=alphabet();else if(rt==='words')out=words();else if(rt.startsWith('word-'))out=word(rt.slice(5));else if(rt==='flashcards'){if(!flashcardItem)pickFlashcard();out=flashcardView();}else if(rt==='salah')out=prayerView();else if(rt==='last-ten')out=lastTenView();else if(rt==='quiz')out=quizView();else if(rt==='progress')out=progress();else if(rt==='about')out=about();else if(V4?.routes[rt])out=V4.renderRoute(rt);else if(rt.startsWith('letter-')){letterSelected=rt.slice(7);out=alphabet()}else out=home();$('view').innerHTML=out;summary();document.title=({home:'কুরআনিক আরবি পাঠশালা',alphabet:'আরবি ২৮ হরফ',words:'কুরআনিক শব্দতালিকা',flashcards:'যাচাই করা (ফ্ল্যাশ-কার্ড)',salah:'পাঁচ ওয়াক্ত নামাজ শিক্ষা','last-ten':'কুরআনের শেষ ১০ সূরা',quiz:'কুইজ ও অনুশীলন',progress:'আমার অগ্রগতি',about:'তথ্য ও উৎস'}[sect]||V4?.routes[sect]||'শব্দ শেখা')+' | PhotoPixc Learning';}
 const toggle=(key,id)=>{const set=new Set(state[key]);set.has(id)?set.delete(id):set.add(id);state[key]=[...set];save();render();toast(key==='learned'?'শেখার অগ্রগতি বদলানো হয়েছে':'বুকমার্ক আপডেট করা হয়েছে')};
 function speak(w,rate=.75){if(!window.speechSynthesis){toast('এই Browser-এ অডিও সুবিধা নেই।');return}try{const available=speechSynthesis.getVoices().filter(v=>v.lang&&v.lang.toLowerCase().startsWith('ar'));if(!available.length){toast('Arabic voice নেই। ডিভাইসে Arabic voice যোগ করতে হবে।');return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(w.ar);u.lang='ar-SA';u.voice=available.find(v=>v.lang==='ar-SA')||available[0];u.rate=rate;speechSynthesis.speak(u)}catch{toast('এই মুহূর্তে অডিও চালানো যায়নি।')}}
 $('view').addEventListener('click',e=>{
  const flipCard=e.target.closest('[data-flash-card-flip]');
  if(flipCard && !e.target.closest('button') && !e.target.closest('.no-flip')){
   flashcardFlipped=!flashcardFlipped;
   render();
   return;
  }
  const modeBtn=e.target.closest('[data-flash-mode]');
  if(modeBtn){
   pickFlashcard(modeBtn.dataset.flashMode);
   render();
   return;
  }
  const flashAct=e.target.closest('[data-flash-action]');
  if(flashAct){
   const act=flashAct.dataset.flashAction;
   flashcardStats.reviewed++;
   if(act==='mastered'){
    flashcardStats.mastered++;
    if(flashcardItem?.kind==='word' && !state.learned.includes(flashcardItem.word.id)){
     state.learned.push(flashcardItem.word.id);
     save();
    }
    toast('মাশাআল্লাহ! আয়ত্ত হয়েছে চিহ্নিত করা হলো');
   } else if(act==='review'){
    toast('পরের বার আবার দেখানো হবে');
   }
   pickFlashcard();
   render();
   return;
  }
  const hit=e.target.closest('button');if(!hit)return;
 if(V4?.handleClick(hit))return;
 if(hit.hasAttribute('data-v5-jump')){sourceFilter='v5';search='';lengthFilter='all';bookFilter='all';page=0;go('words');return}
 if(hit.dataset.lastSurah){lastTenSelected=Number(hit.dataset.lastSurah);render();return}
 if(hit.dataset.lastShift){const ix=LAST_TEN.findIndex(x=>x.id===lastTenSelected);lastTenSelected=LAST_TEN[Math.max(0,Math.min(9,ix+Number(hit.dataset.lastShift)))].id;render();return}
 if(hit.dataset.lastLearned){const id=Number(hit.dataset.lastLearned);lastTenLearned=lastTenLearned.includes(id)?lastTenLearned.filter(x=>x!==id):[...lastTenLearned,id];localStorage.setItem(lastTenKey,JSON.stringify(lastTenLearned));render();toast('সূরা মুখস্থের অগ্রগতি সংরক্ষিত হয়েছে');return}
 if(hit.hasAttribute("data-prayer-bn-toggle")){salahHideBangla=!salahHideBangla;render();return}
 if(hit.dataset.salahTab){salahTab=hit.dataset.salahTab;render();return}
 if(hit.dataset.salahPrayer){salahPrayer=hit.dataset.salahPrayer;render();return}
 if(hit.dataset.salahSurah){salahSurah=Number(hit.dataset.salahSurah);render();return}
 if(hit.dataset.salahDua){salahDua=hit.dataset.salahDua;render();return}
 if(hit.dataset.salahJump){salahDua=hit.dataset.salahJump;salahTab='duas';render();return}
 if(hit.hasAttribute('data-print-prayer')){window.print();return}
 if(hit.dataset.open){go('word-'+hit.dataset.open);return}if(hit.dataset.letter){letterSelected=hit.dataset.letter;render();$('letter-detail')?.scrollIntoView({block:'nearest'});return}
 if(hit.dataset.showLetter){const ch=hit.dataset.showLetter;const detail=$('letter-inline');if(detail){detail.innerHTML=`<section class="card letter-stage"><h2>${esc(getName(ch))} — চারটি লিখনরূপ</h2>${letterDetail(ch)}</section>`;detail.scrollIntoView({behavior:'smooth',block:'nearest'})}return}
 if(hit.dataset.length){lengthFilter=hit.dataset.length;bookFilter='all';page=0;go('words');return}
 if(hit.dataset.page){page=Math.max(0,Math.min(Math.ceil(filters().length/12)-1,page+(hit.dataset.page==='next'?1:-1)));render();return}
 if(hit.dataset.learn){toggle('learned',hit.dataset.learn);return}if(hit.dataset.bookmark){toggle('bookmarked',hit.dataset.bookmark);return}
 if(hit.dataset.speak){const w=WORDS.find(x=>x.id===hit.dataset.speak);if(w)speak(w,.68);return}
 if(hit.dataset.speakNormal){const w=WORDS.find(x=>x.id===hit.dataset.speakNormal);if(w)speak(w,.95);return}
 if(hit.hasAttribute('data-start-quiz')){quizStart();return}
 if(hit.dataset.answer!==undefined){if(!quiz||quiz.answer!==null)return;quiz.answer=+hit.dataset.answer;if(quiz.questions[quiz.index].choices[quiz.answer]===quiz.questions[quiz.index].word.meaning)quiz.correct++;render();return}
 if(hit.hasAttribute('data-next-quiz')){if(!quiz||quiz.answer===null)return;if(quiz.index>=quiz.questions.length-1){quiz.finished=true;state.quizzes++;state.bestScore=Math.max(state.bestScore,quiz.correct);save()}else{quiz.index++;quiz.answer=null}render();return}
 if(hit.id==='export-progress'){const backup={app:'photopixc.quranic-arabic',version:1,savedAt:new Date().toISOString(),progress:state,extensions:{v4:V4?.exportState(),lastTen:lastTenLearned}};const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='quranic-arabic-progress.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);return}
 });
 $('view').addEventListener('input',e=>{if(e.target.id==='word-search'){if(e.isComposing)return;const focusPos=e.target.selectionStart;search=e.target.value;page=0;render();const input=$('word-search');if(input){input.focus();input.setSelectionRange(focusPos,focusPos)}}});
 $('view').addEventListener('compositionend',e=>{if(e.target.id==='word-search'){search=e.target.value;page=0;render();$('word-search')?.focus()}});
 $('view').addEventListener('change',async e=>{if(e.target.id==='word-length'){lengthFilter=e.target.value;page=0;render()}if(e.target.id==='word-book'){bookFilter=e.target.value;page=0;render()}if(e.target.id==='word-source'){sourceFilter=e.target.value;page=0;render()}if(e.target.id==='import-progress'){
 const file=e.target.files?.[0];if(!file)return;try{if(file.size>250000)throw Error('ফাইলটি খুব বড়।');const d=JSON.parse(await file.text());if(d.app!=='photopixc.quranic-arabic'||d.version!==1||!d.progress||!Array.isArray(d.progress.learned)||!Array.isArray(d.progress.bookmarked))throw Error('এটি এই পাঠশালার Progress ফাইল নয়।');if(!confirm('Import করলে বর্তমান অগ্রগতি বদলে যাবে। চালিয়ে যাবেন?'))return;const valid=new Set(WORDS.map(w=>w.id));state={learned:[...new Set(d.progress.learned)].filter(id=>valid.has(id)),bookmarked:[...new Set(d.progress.bookmarked)].filter(id=>valid.has(id)),quizzes:Math.max(0,Math.floor(Number(d.progress.quizzes)||0)),bestScore:Math.max(0,Math.min(10,Math.floor(Number(d.progress.bestScore)||0)))};if(d.extensions?.v4&&V4)V4.importState(d.extensions.v4);if(Array.isArray(d.extensions?.lastTen)){lastTenLearned=[...new Set(d.extensions.lastTen)].filter(n=>Number.isInteger(n)&&n>=105&&n<=114);localStorage.setItem(lastTenKey,JSON.stringify(lastTenLearned))}save();render();toast('Progress Import হয়েছে।')}catch(err){toast(err.message||'ভুল Progress ফাইল।')}}});
 window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0,behavior:'instant'})});
 window.addEventListener('keydown',e=>{
  if(route()==='flashcards' && (e.code==='Space'||e.code==='Enter') && !e.target.closest('input,textarea,button')){
   e.preventDefault();
   flashcardFlipped=!flashcardFlipped;
   render();
  }
 });
 $('nav-toggle').addEventListener('click',()=>{const nav=$('top-nav');const expanded=nav.classList.toggle('open');$('nav-toggle').setAttribute('aria-expanded',String(expanded))});
 if(!location.hash)history.replaceState(null,'','#qa-home');render();
})();
