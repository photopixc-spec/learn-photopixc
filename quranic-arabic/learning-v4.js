/* PhotoPixc Quranic Arabic — Free interactive learning modules, V4 & V7 Upgrades.
   No network requests, paid API, trackers, or external JS dependencies. */
'use strict';
window.QA_V4 = (() => {
  const KEY = 'photopixc.quranic-arabic.extras.v4';
  const MARKS = {
    'َ': 'যবর (ফাতহা)', 'ِ': 'যের (কাসরা)', 'ُ': 'পেশ (দাম্মা)',
    'ْ': 'সুকুন / জযম', 'ّ': 'তাশদীদ', 'ً': 'দুই যবর',
    'ٍ': 'দুই যের', 'ٌ': 'দুই পেশ', 'ٰ': 'খাড়া যবর'
  };
  const LEVELS = [
    {id:'starter',name:'একেবারে নতুন',text:'আরবি হরফ ও হরকত চিনে শুরু করব।',to:'alphabet'},
    {id:'reader',name:'হরফ চিনি, শব্দ পড়তে শিখব',text:'যুক্তরূপ, হরকত ও শব্দ গড়ার অনুশীলন করব।',to:'builder'},
    {id:'meaning',name:'পড়তে পারি, অর্থ শিখব',text:'প্রতিদিন পাঁচটি শব্দ ও নিয়মিত Revision করব।',to:'daily'}
  ];
  const initial = () => ({level:'',review:{},doneDates:{},stats:{builder:0,harakat:0,kids:0}});
  function load() {
    try {
      const v = JSON.parse(localStorage.getItem(KEY)||'{}');
      if (!v || typeof v!=='object' || Array.isArray(v)) return initial();
      return {
        level: LEVELS.some(x=>x.id===v.level)?v.level:'',
        review:v.review && typeof v.review==='object'&&!Array.isArray(v.review)?v.review:{},
        doneDates:v.doneDates && typeof v.doneDates==='object'&&!Array.isArray(v.doneDates)?v.doneDates:{},
        stats:{...initial().stats,...(v.stats&&typeof v.stats==='object'?v.stats:{})}
      };
    } catch {return initial()}
  }
  let progress=load();
  let api;
  let builder={word:null,tiles:[],picked:[],checked:false,weakOnly:false};
  let markExercise={entry:null,options:[],answered:null};
  let kidsExercise={entry:null,options:[],answered:null,round:1,correct:0};
  let reviewReveal=false, reviewCursor=0;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const bn=n=>String(n).replace(/[0-9]/g,d=>'০১২৩৪৫৬৭৮৯'[+d]);
  const ar=s=>`<span class="arabic" lang="ar" dir="rtl">${esc(s)}</span>`;
  const getDate=(offset=0)=>{
    const n=new Date();
    const date=new Date(n.getFullYear(),n.getMonth(),n.getDate()+offset);
    return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
  };
  const seededShuffle=(a)=>{
    const out=[...a];
    for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[j],out[i]]=[out[i],out[j]];}
    return out;
  };
  const words=()=>api.WORDS;
  const glyphPieces=s=>{const parts=[];for(const c of Array.from(s.normalize('NFC'))){if(/\p{M}/u.test(c)){if(parts.length)parts[parts.length-1].marks+=c;}else if(/\p{L}/u.test(c)){parts.push({base:c,marks:''});}}return parts;};
  const pieceGlyph=p=>p.base+p.marks;
  const notify=s=>api.toast(s);
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(progress));}catch{notify('এই ব্রাউজারে Progress সংরক্ষণ করা গেল না।')}};
  const go=r=>api.go(r);
  const draw=()=>api.render();
  const wordById=id=>words().find(w=>w.id===id);
  const eligibleWords=()=>words().filter(w=>glyphPieces(w.ar).length>=2&&glyphPieces(w.ar).length<=7);
  function todaysFive(){
    const date=getDate();const n=Date.UTC(+date.slice(0,4),+date.slice(5,7)-1,+date.slice(8,10))/86400000;
    const a=eligibleWords();if(!a.length)return [];
    const offset=((n*5)%a.length+a.length)%a.length;
    return Array.from({length:Math.min(5,a.length)},(_,i)=>a[(offset+i)%a.length]);
  }
  const validDate=v=>typeof v==='string'&&/^\d{4}-\d\d-\d\d$/.test(v);
  function dueWords(){return Object.entries(progress.review).filter(([id,r])=>wordById(id)&&r&&validDate(r.next)&&r.next<=getDate()).map(([id])=>wordById(id));}
  function reviewCount(){return dueWords().length;}
  const statsHtml=()=>`<div class="v4-stats"><span><b>${bn(progress.stats.builder||0)}</b> শব্দ সাজানো</span><span><b>${bn(progress.stats.harakat||0)}</b> হরকত চেনা</span><span><b>${bn(progress.stats.kids||0)}</b> Kids Practice</span><span><b>${bn(reviewCount())}</b> Revision বাকি</span></div>`;
  function levelCard(){
    return `<section class="card v4-level-card"><span class="eyebrow">নিজের মতো করে শিখুন</span><h2>তুমি আরবি কতটুকু জানো?</h2><p class="muted">একটি স্তর বেছে নাও। পরে যেকোনো সময় বদলাতে পারবে।</p><div class="v4-level-grid">${LEVELS.map(l=>`<button type="button" data-v4-level="${l.id}" class="v4-level-option ${progress.level===l.id?'selected':''}" aria-pressed="${progress.level===l.id}"><strong>${esc(l.name)}</strong><small>${esc(l.text)}</small></button>`).join('')}</div>${progress.level?`<p class="v4-ok">✓ পছন্দ সংরক্ষিত। <a href="#qa-${LEVELS.find(x=>x.id===progress.level).to}">প্রস্তাবিত পাঠ শুরু করুন →</a></p>`:''}</section>`;
  }
  function dashboard(){
    const weakCount = api?.getWeakItems ? api.getWeakItems().length : 0;
    return `<section class="v4-home-additions"><div class="section-head"><h2>প্রতিদিনের অনুশীলন · একদম ফ্রি</h2><span class="pill">V7 গেমিফাইড</span></div>${levelCard()}
    <div class="v4-feature-grid">
      <article class="card v4-feature"><span class="v4-feature-icon">🧩</span><h3>Word Builder Puzzle</h3><p>শব্দার্থ ও অডিও শুনে এলোমেলো অক্ষর জোড়া লাগিয়ে শব্দ বানাও।</p><a class="button primary" href="#qa-builder">Word Builder ধাঁধা খেলুন →</a></article>
      <article class="card v4-feature"><span class="v4-feature-icon">بِ</span><h3>হরকত অনুশীলন</h3><p>যবর, যের, পেশ, সুকুন, তাশদীদ—চিহ্ন দেখেই চিনো।</p><a class="button" href="#qa-harakat">হরকত চিনুন</a></article>
      <article class="card v4-feature"><span class="v4-feature-icon">৫</span><h3>আজকের ৫টি শব্দ</h3><p>প্রতিদিন পাঁচটি শব্দ এবং নির্দিষ্ট বিরতিতে Revision।</p><a class="button" href="#qa-daily">Daily 5 Words</a></article>
      <article class="card v4-feature"><span class="v4-feature-icon">★</span><h3>Kids Learning Mode</h3><p>বড় অক্ষর ও মজার প্রশ্নে অক্ষরের নাম শেখো।</p><a class="button" href="#qa-kids">Kids Mode শুরু</a></article>
    </div>
    ${weakCount > 0 ? `
    <div style="margin: 14px 0 20px; text-align: center;">
      <button type="button" class="btn-weak-review" data-start-weak-flash>
        🎯 দুর্বল শব্দগুলো ঝালাই করুন (Review Weak Items) <span class="weak-badge">${bn(weakCount)}</span>
      </button>
    </div>
    ` : ''}
    ${statsHtml()}</section>`;
  }
  function selectBuilderWord(id, weakOnly=false){
    let pool = eligibleWords();
    if(weakOnly && api?.getWeakItems){
      const weakIds = api.getWeakItems();
      const weakPool = pool.filter(w => weakIds.includes(w.id));
      if(weakPool.length) pool = weakPool;
    }
    const chosen = id ? wordById(id) : pool[Math.floor(Math.random()*pool.length)];
    if(!chosen){builder={word:null,tiles:[],picked:[],checked:false,weakOnly};return;}
    const pieces=glyphPieces(chosen.ar),tiles=seededShuffle(pieces.map((part,i)=>({part,index:i})));
    if(pieces.length>1&&tiles.every((p,i)=>p.index===i))tiles.push(tiles.shift());
    builder={word:chosen,tiles,picked:[],checked:false,weakOnly};
  }
  function builderView(){
    if(!builder.word)selectBuilderWord('w001');
    const w=builder.word;if(!w)return '<p>শব্দ পাওয়া যায়নি।</p>';
    const pieces=glyphPieces(w.ar),done=builder.picked.length===builder.tiles.length;
    const assembled=builder.picked.map(i=>pieceGlyph(builder.tiles[i].part)).join('');
    const success=builder.checked&&builder.picked.every((tileIndex,originalIndex)=>pieceGlyph(builder.tiles[tileIndex].part)===pieceGlyph(glyphPieces(w.ar)[originalIndex]));
    const labels=builder.picked.map((i,k)=>`<button type="button" class="v4-placed arabic" data-v4-remove="${k}" ${builder.checked?'disabled':''} title="এই অক্ষরটি সরান">${esc(pieceGlyph(builder.tiles[i].part))}</button>`).join('');
    const weakList = api?.getWeakItems ? api.getWeakItems() : [];

    return `<span class="eyebrow">INTERACTIVE PUZZLE · DUOLINGO-STYLE WORD BUILDER</span>
    <h1>অক্ষর জুড়ে শব্দ বানাও (Word Builder Puzzle)</h1>
    <p class="muted">অর্থ ও অডিও শুনে এলোমেলো অক্ষরগুলো সঠিক ডান-থেকে-বাম (RTL) ক্রমে ট্যাপ করে শব্দ তৈরি করো।</p>
    
    <section class="card v4-practice ${builder.checked && !success ? 'puzzle-shake' : ''}">
      <div class="v4-puzzle-header">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:36px;" aria-hidden="true">${w.icon || '📖'}</span>
          <div>
            <div style="font-size:12px;color:var(--muted);font-weight:700;">শব্দটির অর্থ</div>
            <strong style="font-size:20px;color:var(--deep);">${esc(w.meaning)}</strong>
            <small style="display:block;color:#557262;">উচ্চারণ: ${esc(w.bn)}</small>
          </div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <button type="button" class="v4-puzzle-audio-btn" data-speak="${esc(w.id)}">
            ♪ উচ্চারণ শুনুন
          </button>
          <a class="button" href="#qa-word-${esc(w.id)}" style="font-size:12px;">অক্ষর বিশ্লেষণ ↗</a>
        </div>
      </div>

      <div class="v4-assembled" dir="rtl" lang="ar" aria-label="তোমার সাজানো অক্ষর">
        ${labels||'<span class="v4-placeholder">নিচের অক্ষরের টাইলগুলোতে চাপ দিলে এখানে ক্রমানুসারে বসবে</span>'}
      </div>
      
      <p class="v4-overline">নিচের টাইলগুলোতে চাপ দিয়ে সঠিক ক্রমে বসাও (ডান থেকে বামে)</p>
      <div class="v4-tiles" dir="rtl">
        ${builder.tiles.map((p,i)=>`<button type="button" class="v4-tile arabic" data-v4-tile="${i}" ${builder.picked.includes(i)||builder.checked?'disabled':''}>${esc(pieceGlyph(p.part))}</button>`).join('')}
      </div>

      ${builder.checked?`
        <div class="v4-feedback ${success?'yes':'no'}">
          <strong>${success?'🎉 মাশাআল্লাহ! চমৎকারভাবে শব্দটি সাজিয়েছ!':'শেখার সুযোগ: সঠিক বানান মিলিয়ে দেখো'}</strong>
          <div class="v4-answer arabic" dir="rtl" lang="ar">${esc(w.ar)}</div>
          <span>সঠিক শব্দ: <strong>${esc(w.bn)}</strong> — ${esc(w.meaning)}</span>
          ${success?'<p>তোমার শেখা অগ্রগতিত শব্দ যুক্ত হয়েছে এবং স্ট্রিক বৃদ্ধি পেয়েছে! ⭐⭐⭐</p>':'<p>শব্দটি দুর্বল তালিকায় রাখা হলো যাতে পরে ঝালাই করতে পারো।</p>'}
        </div>
      `:''}

      <div class="actions" style="margin-top:20px;">
        <button type="button" class="btn primary" data-v4-check-builder ${!done||builder.checked?'disabled':''}>উত্তর যাচাই করুন ✓</button>
        <button type="button" class="btn" data-v4-reset-builder>আবার সাজাও ↺</button>
        <button type="button" class="btn" data-v4-next-builder>পরের ধাঁধা →</button>
        ${weakList.length > 0 ? `
          <button type="button" class="btn ${builder.weakOnly ? 'primary' : ''}" data-v4-toggle-weak-builder>
            🎯 ${builder.weakOnly ? 'সব শব্দে ফিরুন' : `শুধু দুর্বল শব্দ (${bn(weakList.length)}টি)`}
          </button>
        ` : ''}
      </div>
    </section>
    <p class="notice">এই ধাঁধায় ছোট সূরাগুলোর শব্দ থেকে অক্ষর সাজানো শেখানো হয়। শিশুর নির্ভুল পাঠে হরকতযুক্ত টাইলগুলো স্পর্শভিত্তিক খেলায় সাহায্য করে।</p>`;
  }
  function markSamples(){const samples=[];for(const w of words())for(const p of glyphPieces(w.ar))for(const mark of Array.from(p.marks))if(MARKS[mark])samples.push({letter:p.base,mark,word:w});return samples;}
  const ALLMARKS=Object.keys(MARKS);
  function nextHarakat(){
    const samples=markSamples();let e=samples[Math.floor(Math.random()*samples.length)];
    if(!e)e={letter:'ب',mark:'ِ',word:null};
    const distractors=seededShuffle(ALLMARKS.filter(x=>x!==e.mark)).slice(0,3);
    markExercise={entry:e,options:seededShuffle([e.mark,...distractors]),answered:null};
  }
  function harakatView(){if(!markExercise.entry)nextHarakat();const x=markExercise;const solved=x.answered!==null;return `<span class="eyebrow">V4 · HARAKAT PRACTICE</span><h1>হরকত দেখে নাম বলো</h1><p class="muted">অক্ষরের ওপর বা নিচের চিহ্নটি দেখে নাম নির্বাচন করো। যবর, যের, পেশ, সুকুন, তাশদীদ ও তানভীন চিনতে শেখো।</p><section class="card v4-practice"><div class="v4-harakat-hero arabic" lang="ar" dir="rtl">${esc(x.entry.letter+x.entry.mark)}</div><h2 class="v4-centered">এই চিহ্নটির নাম কী?</h2><div class="v4-answers">${x.options.map((m,i)=>`<button type="button" class="v4-answer-choice ${solved&&m===x.entry.mark?'right':''} ${solved&&x.answered===i&&m!==x.entry.mark?'wrong':''}" data-v4-haraka-answer="${i}" ${solved?'disabled':''}>${esc(MARKS[m])}</button>`).join('')}</div>${solved?`<div class="v4-feedback ${x.options[x.answered]===x.entry.mark?'yes':'no'}">${x.options[x.answered]===x.entry.mark?'✓ ঠিক ধরেছ!':'সঠিক উত্তর:'} <b>${esc(MARKS[x.entry.mark])}</b></div><div class="actions"><button class="btn primary" data-v4-next-haraka>পরের হরকত →</button></div>`:''}</section><p class="notice">দেখানো চিহ্নটি যে আরবি শব্দ থেকে নেওয়া হয়েছে, সেখানে একাধিক হরকতও থাকতে পারে। উচ্চারণ ও তাজবীদ শেখার জন্য শিক্ষক দরকার।</p>`;}
  function nextKids(reset=false){
    const letters=api.ALPHABET;
    if(reset){kidsExercise.round=1;kidsExercise.correct=0;}
    let e=letters[Math.floor(Math.random()*letters.length)];
    if(!e)e={ch:'ب',name:'বা'};
    const names=seededShuffle(letters.filter(x=>x.ch!==e.ch&&x.name!==e.name)).slice(0,3).map(x=>x.name);
    kidsExercise={...kidsExercise,entry:e,options:seededShuffle([e.name,...names]),answered:null};
  }
  function kidsView(){if(!kidsExercise.entry)nextKids(true);const x=kidsExercise,solved=x.answered!==null;return `<span class="eyebrow">V4 · KIDS & BEGINNERS</span><h1>বড় হরফ দেখে চিনে নাও</h1><p class="muted">শিশু ও নতুন শিক্ষার্থীদের জন্য সহজ অক্ষর চেনার অনুশীলন। নিজের গতিতে খেলতে খেলতে শেখা যায়।</p><section class="card v4-practice v4-kids"><div class="row-space"><span class="pill">প্রশ্ন ${bn(x.round)} / ১০</span><span class="pill gray">সঠিক ${bn(x.correct)}টি</span></div><div class="v4-kids-glyph arabic" dir="rtl" lang="ar">${esc(x.entry.ch)}</div><h2 class="v4-centered">এই আরবি হরফটির বাংলা নাম কী?</h2><div class="v4-answers">${x.options.map((t,i)=>`<button class="v4-answer-choice ${solved&&t===x.entry.name?'right':''} ${solved&&x.answered===i&&t!==x.entry.name?'wrong':''}" data-v4-kids-answer="${i}" ${solved?'disabled':''}>${esc(t)}</button>`).join('')}</div>${solved?`<div class="v4-feedback ${x.options[x.answered]===x.entry.name?'yes':'no'}">${x.options[x.answered]===x.entry.name?'✓ খুব ভালো!':'আবার মনে রাখো:'} <b>${esc(x.entry.name)}</b></div><div class="actions"><button class="btn primary" data-v4-next-kids>${x.round===10?'আবার ১০টি প্রশ্ন':'পরের অক্ষর →'}</button></div>`:''}</section><p class="notice">এখানে বর্ণের নাম শেখানো হয়, মাখরাজ যাচাই করা হয় না। শিশুরা যেন শুদ্ধ উচ্চারণ শিখতে পারে, সেজন্য শিক্ষক বা অভিভাবকের সহায়তা নিন।</p>`;}
  function markToday(w){
    const date=getDate();const existing=new Set(Array.isArray(progress.doneDates[date])?progress.doneDates[date]:[]);
    if(existing.has(w.id)){notify('আজকের তালিকায় শব্দটি আগেই শেখা হয়েছে।');return;}
    existing.add(w.id);progress.doneDates[date]=[...existing];
    progress.review[w.id]={next:getDate(1),interval:1,streak:0};
    if(!api.state.learned.includes(w.id)){api.state.learned.push(w.id);api.save();}
    save();draw();notify('চমৎকার! আগামীকাল থেকে Revision-এ আসবে।');
  }
  function reviewAnswer(remembered){
    const list=dueWords();if(!list.length)return;
    const w=list[Math.min(reviewCursor,list.length-1)];
    const before=progress.review[w.id]||{interval:1,streak:0};
    const streak=remembered?Math.max(0,Number(before.streak)||0)+1:0;
    const interval=remembered?[3,7,14,30,60][Math.min(streak-1,4)]:1;
    progress.review[w.id]={next:getDate(interval),interval,streak};reviewReveal=false;reviewCursor=0;save();draw();notify(remembered?`ভালো! ${bn(interval)} দিন পরে Revision আসবে।`:'শব্দটি আগামীকাল আবার অনুশীলন করবে।');
  }
  function dailyView(){const chosen=todaysFive(),date=getDate(),todayDone=new Set(progress.doneDates[date]||[]),due=dueWords(),current=due[Math.min(reviewCursor,due.length-1)];return `<span class="eyebrow">V4 · DAILY 5 + SMART REVISION</span><h1>আজকের ৫টি কুরআনিক শব্দ</h1><p class="muted">প্রতিদিন নতুন পাঁচটি শব্দ। একটি শব্দ “শিখেছি” করলে পরের দিন থেকে ধাপে ধাপে পুনরাবৃত্তি করানো হবে। Login বা Paid Service লাগবে না।</p>
    <div class="grid3"><div class="card stat"><b>${bn(chosen.length)}</b><small>আজকের শব্দ</small></div><div class="card stat"><b>${bn(chosen.filter(w=>todayDone.has(w.id)).length)}</b><small>আজ শেখা হয়েছে</small></div><div class="card stat"><b>${bn(due.length)}</b><small>Revision বাকি</small></div></div>
    <div class="section-head"><h2>আজকের শব্দতালিকা</h2><span class="pill gray">${esc(date)}</span></div><div class="v4-daily-grid">${chosen.map(w=>`<article class="card v4-daily-word"><div class="v4-daily-ar arabic" dir="rtl" lang="ar">${esc(w.ar)}</div><strong>${esc(w.bn)}</strong><span>${esc(w.meaning)}</span><small>${bn(w.length)} অক্ষর</small><div class="actions"><a href="#qa-word-${esc(w.id)}" class="button">হরকত ও যুক্তরূপ</a><button class="btn ${todayDone.has(w.id)?'v4-done':''}" ${todayDone.has(w.id)?'disabled':''} data-v4-daily="${esc(w.id)}">${todayDone.has(w.id)?'✓ শিখেছি':'✓ আজ শিখেছি'}</button></div></article>`).join('')}</div>
    <div class="section-head"><h2>Smart Revision</h2><span class="pill">বাকি ${bn(due.length)}টি</span></div>
    ${!current?'<section class="card v4-review-empty"><h3>আজ আর কোনো Revision বাকি নেই।</h3><p>আগামীকাল ফিরে এলে শেখা শব্দ আবার মনে করার সুযোগ পাবে।</p></section>':`<section class="card v4-review"><small>প্রথমে নিজে মনে করার চেষ্টা করো</small><div class="v4-review-word arabic" dir="rtl" lang="ar">${esc(current.ar)}</div>${reviewReveal?`<div class="v4-reveal"><strong>${esc(current.bn)}</strong><p>${esc(current.meaning)}</p></div><div class="actions"><button class="btn primary" data-v4-remember="yes">মনে আছে ✓</button><button class="btn" data-v4-remember="no">আবার শিখব ↺</button><a class="button" href="#qa-word-${esc(current.id)}">শব্দের বিশ্লেষণ</a></div>`:'<div class="actions"><button class="btn primary" data-v4-reveal>উচ্চারণ ও অর্থ দেখুন</button></div>'}</section>`}
    <p class="notice">শেখার সূচি এই ব্রাউজারে সংরক্ষিত থাকে। এক ডিভাইস থেকে অন্য ডিভাইসে স্বয়ংক্রিয় Sync হয় না। এটি সহজ বিরতিভিত্তিক অনুশীলন, ব্যক্তিগত দক্ষতা যাচাইয়ের পূর্ণ ব্যবস্থা নয়।</p>`;
  }
  function handleClick(hit){
    if(hit.dataset.v4Level){progress.level=hit.dataset.v4Level;save();draw();notify('তোমার শেখার স্তর সংরক্ষিত হয়েছে।');return true;}
    if(hit.dataset.v4Tile!==undefined){
      const n=+hit.dataset.v4Tile;
      if(!builder.checked&&!builder.picked.includes(n)&&builder.tiles[n]){
        builder.picked.push(n);
        api?.soundFx?.playClick();
        draw();
      }
      return true;
    }
    if(hit.dataset.v4Remove!==undefined){
      if(!builder.checked){
        builder.picked.splice(+hit.dataset.v4Remove,1);
        api?.soundFx?.playClick();
        draw();
      }
      return true;
    }
    if(hit.hasAttribute('data-v4-check-builder')){
      if(builder.picked.length===builder.tiles.length&&!builder.checked){
        builder.checked=true;
        const right=builder.picked.every((i,k)=>pieceGlyph(builder.tiles[i].part)===pieceGlyph(glyphPieces(builder.word.ar)[k]));
        if(right){
          progress.stats.builder++;
          save();
          api?.soundFx?.playSuccess();
          api?.confetti?.();
          api?.updateStreak?.();
          if(!api.state.learned.includes(builder.word.id)){
            api.state.learned.push(builder.word.id);
            api.save();
          }
          if(api?.removeWeakItem) api.removeWeakItem(builder.word.id);
          notify('মাশাআল্লাহ! সঠিকভাবে শব্দ সাজিয়েছ!');
        } else {
          api?.soundFx?.playWrong();
          if(api?.addWeakItem) api.addWeakItem(builder.word.id);
          notify('ভুল হয়েছে। সঠিক রূপটি দেখে আবার চেষ্টা করো।');
        }
        draw();
      }
      return true;
    }
    if(hit.hasAttribute('data-v4-reset-builder')){
      api?.soundFx?.playClick();
      selectBuilderWord(builder.word?.id, builder.weakOnly);
      draw();
      return true;
    }
    if(hit.hasAttribute('data-v4-next-builder')){
      api?.soundFx?.playClick();
      const other=eligibleWords().filter(w=>w.id!==builder.word?.id&&w.length<=6);
      selectBuilderWord(other[Math.floor(Math.random()*other.length)]?.id, builder.weakOnly);
      draw();
      return true;
    }
    if(hit.hasAttribute('data-v4-toggle-weak-builder')){
      api?.soundFx?.playClick();
      builder.weakOnly = !builder.weakOnly;
      selectBuilderWord(null, builder.weakOnly);
      draw();
      return true;
    }
    if(hit.dataset.v4HarakaAnswer!==undefined){
      if(markExercise.answered===null){
        markExercise.answered=+hit.dataset.v4HarakaAnswer;
        if(markExercise.options[markExercise.answered]===markExercise.entry.mark){
          progress.stats.harakat++;
          save();
          api?.soundFx?.playSuccess();
          api?.confetti?.();
        } else {
          api?.soundFx?.playWrong();
        }
        draw();
      }
      return true;
    }
    if(hit.hasAttribute('data-v4-next-haraka')){api?.soundFx?.playClick();nextHarakat();draw();return true;}
    if(hit.dataset.v4KidsAnswer!==undefined){
      if(kidsExercise.answered===null){
        kidsExercise.answered=+hit.dataset.v4KidsAnswer;
        if(kidsExercise.options[kidsExercise.answered]===kidsExercise.entry.name){
          kidsExercise.correct++;
          progress.stats.kids++;
          save();
          api?.soundFx?.playSuccess();
          api?.confetti?.();
        } else {
          api?.soundFx?.playWrong();
        }
        draw();
      }
      return true;
    }
    if(hit.hasAttribute('data-v4-next-kids')){api?.soundFx?.playClick();if(kidsExercise.round>=10)nextKids(true);else{kidsExercise.round++;nextKids();}draw();return true;}
    if(hit.dataset.v4Daily){const w=wordById(hit.dataset.v4Daily);if(w&&todaysFive().some(a=>a.id===w.id))markToday(w);return true;}
    if(hit.hasAttribute('data-v4-reveal')){reviewReveal=true;draw();return true;}
    if(hit.dataset.v4Remember){reviewAnswer(hit.dataset.v4Remember==='yes');return true;}
    return false;
  }
  const routes={builder:'অক্ষর দিয়ে শব্দ গড়া',harakat:'হরকত অনুশীলন',daily:'Daily 5 Words',kids:'Kids Learning'};
  function renderRoute(r){switch(r){case 'builder':return builderView();case 'harakat':return harakatView();case 'daily':return dailyView();case 'kids':return kidsView();default:return null;}}
  function exportState(){return JSON.parse(JSON.stringify(progress));}
  function importState(v){
    if(!v||typeof v!=='object'||Array.isArray(v))throw Error('V4 Progress ডেটা সঠিক নয়');
    const valid=new Set(words().map(w=>w.id));
    const review={};for(const [id,item] of Object.entries(v.review||{}))if(valid.has(id)&&item&&validDate(item.next))review[id]={next:item.next,interval:Math.max(1,Math.min(60,Number(item.interval)||1)),streak:Math.max(0,Math.min(99,Number(item.streak)||0))};
    const doneDates={};for(const [date,ids] of Object.entries(v.doneDates||{}))if(validDate(date)&&Array.isArray(ids))doneDates[date]=ids.filter(id=>valid.has(id));
    progress={level:LEVELS.some(l=>l.id===v.level)?v.level:'',review,doneDates,stats:{builder:Math.max(0,Number(v.stats?.builder)||0),harakat:Math.max(0,Number(v.stats?.harakat)||0),kids:Math.max(0,Number(v.stats?.kids)||0)}};
    save();
  }
  function create(parentApi){
    api=parentApi;
    let changed=false;
    for(const id of api.state.learned){
      if(wordById(id) && !progress.review[id]) {progress.review[id]={next:getDate(),interval:1,streak:0};changed=true;}
    }
    if(changed)save();
    return {routes,dashboard,renderRoute,handleClick,statsHtml,reviewCount,exportState,importState,selectBuilderWord};
  }
  return {create};
})();
