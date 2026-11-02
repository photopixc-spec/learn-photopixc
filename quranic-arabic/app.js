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

 /* ==========================================================================
    V7 — Sound Effects Engine (Pure Web Audio API Synthesizer)
    ========================================================================== */
 const SoundFx = (()=>{
  let ctx = null;
  let isMuted = localStorage.getItem('photopixc.quranic.sound_muted') === 'true';
  const init = () => {
   if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) ctx = new AudioCtx();
   }
   if (ctx && ctx.state === 'suspended') ctx.resume();
  };
  const playTone = (freq, duration, type='sine', gainVal=0.15) => {
   if (isMuted) return;
   try {
    init();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
   } catch {}
  };
  const playSuccess = () => {
   if (isMuted) return;
   init();
   // Major triad celebration arpeggio: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
   [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
    setTimeout(() => playTone(freq, 0.42, 'triangle', 0.18), idx * 110);
   });
  };
  const playClick = () => playTone(820, 0.05, 'sine', 0.07);
  const playStar = () => {
   if (isMuted) return;
   init();
   [659.25, 783.99, 1046.50, 1318.51].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.45, 'sine', 0.14), i * 85);
   });
  };
  const playWrong = () => {
   if (isMuted) return;
   init();
   playTone(370, 0.16, 'sawtooth', 0.08);
   setTimeout(() => playTone(280, 0.28, 'sawtooth', 0.08), 150);
  };
  const toggleMute = () => {
   isMuted = !isMuted;
   localStorage.setItem('photopixc.quranic.sound_muted', isMuted);
   const btn = $('btn-sound-toggle');
   if (btn) {
    btn.textContent = isMuted ? '🔇' : '🔔';
    btn.classList.toggle('muted', isMuted);
   }
   return isMuted;
  };
  return { init, playSuccess, playClick, playStar, playWrong, toggleMute, get muted(){ return isMuted; } };
 })();

 /* Lightweight CSS Confetti Engine */
 const spawnConfetti = () => {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6', '#f43f5e', '#06b6d4'];
  for (let i = 0; i < 45; i++) {
   const piece = document.createElement('div');
   piece.className = 'confetti-piece';
   piece.style.left = (Math.random() * 100) + 'vw';
   piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
   piece.style.width = (Math.random() * 8 + 6) + 'px';
   piece.style.height = (Math.random() * 10 + 6) + 'px';
   piece.style.animationDelay = (Math.random() * 0.7) + 's';
   piece.style.animationDuration = (Math.random() * 1.5 + 2) + 's';
   if (Math.random() > 0.5) piece.style.borderRadius = '50%';
   container.appendChild(piece);
  }
  document.body.appendChild(container);
  setTimeout(() => container.remove(), 3200);
 };

 /* Daily Streak Tracker */
 const STREAK_KEY = 'photopixc.quranic-arabic.streak.v1';
 const getTodayDate = () => {
  const d = new Date();
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
 };
 const getStreak = () => {
  try {
   const data = JSON.parse(localStorage.getItem(STREAK_KEY) || '{}');
   const today = getTodayDate();
   if (!data.lastDate) return { count: 1, lastDate: today };
   if (data.lastDate === today) return data;
   const last = new Date(data.lastDate);
   const now = new Date(today);
   const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
   if (diffDays === 1) {
    data.count = (data.count || 1) + 1;
    data.lastDate = today;
    localStorage.setItem(STREAK_KEY, JSON.stringify(data));
   } else if (diffDays > 1) {
    data.count = 1;
    data.lastDate = today;
    localStorage.setItem(STREAK_KEY, JSON.stringify(data));
   }
   return data;
  } catch {
   return { count: 1, lastDate: getTodayDate() };
  }
 };
 const updateStreak = () => {
  const data = getStreak();
  const today = getTodayDate();
  if (data.lastDate !== today) {
   data.count = (data.count || 0) + 1;
   data.lastDate = today;
   localStorage.setItem(STREAK_KEY, JSON.stringify(data));
  }
  const el = $('streak-count');
  if (el) el.textContent = bnNum(data.count || 1);
 };

 /* Weak-Word SRS Queue */
 const WEAK_KEY = 'photopixc.quranic-arabic.weak.v1';
 const getWeakItems = () => {
  try {
   const list = JSON.parse(localStorage.getItem(WEAK_KEY) || '[]');
   return Array.isArray(list) ? list.filter(id => WORDS.some(w => w.id === id)) : [];
  } catch { return []; }
 };
 const addWeakItem = (id) => {
  const set = new Set(getWeakItems());
  set.add(id);
  localStorage.setItem(WEAK_KEY, JSON.stringify([...set]));
 };
 const removeWeakItem = (id) => {
  const set = new Set(getWeakItems());
  set.delete(id);
  localStorage.setItem(WEAK_KEY, JSON.stringify([...set]));
 };

 /* Tashkeel (Harakat) Toggle State */
 let showHarakat = true;
 const stripHarakat = str => (str || '').replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '');

 /* Audio Player: Quran WBW CDN primary with Web Speech API fallback */
 let currentAudio = null;
 const playWordAudio = (w, rate = 0.8) => {
  SoundFx.init();
  if (currentAudio) {
   currentAudio.pause();
   currentAudio = null;
  }
  if (w.audio) {
   const cdnUrl = `https://audio.qurancdn.com/wbw/${w.audio}`;
   const audio = new Audio(cdnUrl);
   currentAudio = audio;
   audio.playbackRate = rate;
   audio.play().catch(() => {
    // If CDN fails, smoothly fall back to offline Web Speech API
    speak(w, rate);
   });
   audio.onended = () => { currentAudio = null; };
   audio.onerror = () => { speak(w, rate); };
  } else {
   speak(w, rate);
  }
 };

 const playAyahAudio = (surahId, ayahIdx, btnEl) => {
  SoundFx.init();
  if (currentAudio) {
   currentAudio.pause();
   currentAudio = null;
   document.querySelectorAll('.btn-ayah-audio').forEach(b => b.classList.remove('is-playing'));
  }
  const sPad = String(surahId).padStart(3, '0');
  const aPad = String(ayahIdx + 1).padStart(3, '0');
  const url = `https://everyayah.com/data/Alafasy_128kbps/${sPad}${aPad}.mp3`;
  const audio = new Audio(url);
  currentAudio = audio;
  if (btnEl) btnEl.classList.add('is-playing');
  audio.play().catch(() => {
   toast('তিলাওয়াত অডিও সংযোগ করা গেল না।');
   if (btnEl) btnEl.classList.remove('is-playing');
  });
  audio.onended = () => {
   currentAudio = null;
   if (btnEl) btnEl.classList.remove('is-playing');
  };
  audio.onerror = () => {
   toast('তিলাওয়াত অডিও লোড হতে সমস্যা হয়েছে।');
   if (btnEl) btnEl.classList.remove('is-playing');
  };
 };

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
 const getMnemonic=b=>ALPHABET.find(l=>l.ch===b)?.mnemonic||'';

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
 const summary=()=>{
   const got=state.learned.filter(id=>WORDS.some(w=>w.id===id)).length,percent=WORDS.length?Math.round(got/WORDS.length*100):0;
   $('side-completion').textContent=bnNum(percent)+'%';
   $('side-count').textContent=`${bnNum(got)} / ${bnNum(WORDS.length)}টি শব্দ`;
   $('side-bar').value=percent;
   const streakEl = $('streak-count');
   if (streakEl) streakEl.textContent = bnNum(getStreak().count || 1);
 };

 const V4=window.QA_V4?.create({
   WORDS, ALPHABET, get state(){return state}, save, go, render, toast,
   playWordAudio, soundFx: SoundFx, confetti: spawnConfetti, updateStreak,
   addWeakItem, removeWeakItem, getWeakItems
 })||null;

 const cards=(items)=>items.map(w=>`<button class="word-mini" type="button" data-open="${esc(w.id)}" aria-label="${esc(w.bn)}, ${esc(w.meaning)}">
  <span class="mini-word-icon" aria-hidden="true">${w.icon || '📖'}</span>
  ${arabic(showHarakat ? w.ar : stripHarakat(w.ar),'mini-word-ar')}<span class="copy"><strong>${esc(w.bn)}</strong><small>${esc(w.meaning)}</small><small>${bnNum(w.length)} অক্ষর · সূরা ${esc(w.refs[0])}${w.batch==='v5'?' · V5 নতুন':''}</small></span><span class="tick" aria-hidden="true">${state.learned.includes(w.id)?'✓':state.bookmarked.includes(w.id)?'★':'→'}</span></button>`).join('');

 /* ==========================================================================
    V7 — Phase 2: Gamified Guided Path Progression
    ========================================================================== */
 const PATH_KEY = 'photopixc.quranic-arabic.path.v1';
 const getPathProgress = () => {
  try {
   return JSON.parse(localStorage.getItem(PATH_KEY) || '{"completed":{},"stars":{}}');
  } catch { return {completed:{},stars:{}}; }
 };
 const savePathProgress = (lvlId, stars = 3) => {
  const p = getPathProgress();
  p.completed[lvlId] = true;
  p.stars[lvlId] = Math.max(p.stars[lvlId] || 0, stars);
  localStorage.setItem(PATH_KEY, JSON.stringify(p));
  SoundFx.playStar();
  spawnConfetti();
  updateStreak();
  render();
 };

 const LETTER_LEVELS = [
  { id: 'l1', title: 'লেভেল ১ · আলিফ ও বা-গোষ্ঠী', letters: ['ا', 'ب', 'ت', 'ث'], desc: 'সোজা আলিফ এবং এক, দুই ও তিন ফোঁটার নৌকা হরফ' },
  { id: 'l2', title: 'লেভেল ২ · জীম-গোষ্ঠী ও দাল', letters: ['ج', 'ح', 'خ', 'د'], desc: 'পেটুক জীম, খালি হা, টুপি পরা খা ও ধনুক দাল' },
  { id: 'l3', title: 'লেভেল ৩ · যাল, রা-গোষ্ঠী ও সীন', letters: ['ذ', 'ر', 'ز', 'س'], desc: 'ফোঁটাযুক্ত যাল, পিচ্ছিল স্লিপার রা ও দাঁতওয়ালা সীন' },
  { id: 'l4', title: 'লেভেল ৪ · শীন, সাদ-গোষ্ঠী ও ত্বা', letters: ['ش', 'ص', 'ض', 'ط'], desc: 'তারাওয়ালা শীন, পেয়ালা সাদ-দাদ ও উঁচু মিনার ত্বা' },
  { id: 'l5', title: 'লেভেল ৫ · যোয়া, আইন-গোষ্ঠী ও ফা', letters: ['ظ', 'ع', 'غ', 'ف'], desc: 'মিনার যোয়া, গোল চোখ আইন-গাইন ও সাঁতারু ফা' },
  { id: 'l6', title: 'লেভেল ৬ · ক্বাফ, কাফ, লাম ও মীম', letters: ['ق', 'ك', 'ل', 'م'], desc: 'বড় পেয়ালা ক্বাফ, ফ্রেম কাফ, উল্টো বঁড়শি লাম ও মীম' },
  { id: 'l7', title: 'লেভেল ৭ · নূন, হা, ওয়াও ও ইয়া', letters: ['ن', 'ه', 'و', 'ي'], desc: 'রসগোল্লা বাটি নূন, জিলাপি হা, কমা ওয়াও ও হাঁস ইয়া' }
 ];

 const WORD_DECKS = [
  { id: 'd1', title: 'বিসমিল্লাহ ও আল্লাহর নাম', start: 0, count: 10, theme: '☝️' },
  { id: 'd2', title: 'প্রতিপালক ও জগতের প্রশংসা', start: 10, count: 10, theme: '🌸' },
  { id: 'd3', title: 'হিদায়াত ও সোজা পথ', start: 20, count: 10, theme: '🛣️' },
  { id: 'd4', title: 'সূরা ইখলাস ও তাওহীদ', start: 30, count: 10, theme: '1️⃣' },
  { id: 'd5', title: 'উষা ও ফজর', start: 40, count: 10, theme: '🌅' },
  { id: 'd6', title: 'মানুষ ও সৃষ্টির অন্তর', start: 50, count: 10, theme: '🫀' },
  { id: 'd7', title: 'সময়, ক্ষতি ও ধৈর্য', start: 60, count: 10, theme: '⏳' },
  { id: 'd8', title: 'কাওসার ও সালাত', start: 70, count: 10, theme: '🌊' },
  { id: 'd9', title: 'সাহায্য ও বিজয়', start: 80, count: 10, theme: '🏆' },
  { id: 'd10', title: 'দ্বীন ও উপাসনা', start: 90, count: 10, theme: '📖' },
  { id: 'd11', title: 'ডুমুর ও জলপাই (সূরা তীন)', start: 100, count: 10, theme: '🍈' },
  { id: 'd12', title: 'তূর পাহাড় ও নিরাপদ নগরী', start: 110, count: 10, theme: '⛰️' },
  { id: 'd13', title: 'মানুষের সৃষ্টি ও প্রতিদান', start: 120, count: 10, theme: '🌱' },
  { id: 'd14', title: 'লাইলাতুল কদর ও বরকত', start: 130, count: 10, theme: '🌙' },
  { id: 'd15', title: 'ফেরেশতা, রূহ ও শান্তি', start: 140, count: 10, theme: '🕊️' },
  { id: 'd16', title: 'ভূমিকম্প ও পৃথিবীর ভার', start: 150, count: 10, theme: '🌋' },
  { id: 'd17', title: 'অণু পরিমাণ ভালো-মন্দ', start: 160, count: 10, theme: '🔬' },
  { id: 'd18', title: 'প্রাচুর্যের মোহ ও প্রতিযোগিতা', start: 170, count: 10, theme: '📈' },
  { id: 'd19', title: 'জ্ঞান ও নিশ্চিত বিশ্বাস', start: 180, count: 10, theme: '📚' },
  { id: 'd20', title: 'চোখে দেখা ও নিয়ামত', start: 190, count: 10, theme: '👁️' },
  { id: 'd21', title: 'নিন্দুক ও পরনিন্দাকারী', start: 200, count: 10, theme: '🤫' },
  { id: 'd22', title: 'সম্পদের হিসাব ও আগুন', start: 210, count: 10, theme: '🔥' },
  { id: 'd23', title: 'হাতি বাহিনী ও চক্রান্ত', start: 220, count: 10, theme: '🐘' },
  { id: 'd24', title: 'ঝাঁকে ঝাঁকে পাখি ও পাথর', start: 230, count: 10, theme: '🦅' },
  { id: 'd25', title: 'কুরাইশ ও শীত-গ্রীষ্মের সফর', start: 240, count: 10, theme: '🐪' },
  { id: 'd26', title: 'ক্ষুধা ও ভয়ের নিরাপত্তা', start: 250, count: 10, theme: '🛡️' },
  { id: 'd27', title: 'এতিম ও ছোটখাটো সাহায্য', start: 260, count: 8, theme: '🤝' }
 ];

 function pathView() {
  const p = getPathProgress();
  let totalStars = 0;
  Object.values(p.stars).forEach(s => totalStars += s);
  const completedCount = Object.keys(p.completed).length;

  return `<div class="path-container">
   <div class="path-hero-banner">
    <span class="eyebrow" style="color:#d1fae5;">DUOLINGO-STYLE GAMIFIED PROGRESSION</span>
    <h1>তোমার আরবি শেখার যাত্রা</h1>
    <p>প্রতিটি ধাপে ৪টি হরফ বা ১০টি শব্দ শিখে ৩টি করে স্টার (⭐⭐⭐) অর্জন করো। ধাপে ধাপে এগিয়ে অর্জন করো পূর্ণ কুরআন পাঠের দক্ষতা!</p>
    <div class="path-summary-bar">
      <span class="path-badge-stat">🌟 অর্জিত স্টার: ${bnNum(totalStars)}</span>
      <span class="path-badge-stat">✓ সম্পন্ন লেভেল: ${bnNum(completedCount)} / ${bnNum(LETTER_LEVELS.length + WORD_DECKS.length)}</span>
      <span class="path-badge-stat">🔥 স্ট্রিক: ${bnNum(getStreak().count || 1)} দিন</span>
    </div>
   </div>

   <div class="path-section-title">
    <h2>🔤 পার্ট ১: আরবি ২৮টি হরফ (৭টি সহজ লেভেল)</h2>
   </div>
   <div class="path-tree">
    ${LETTER_LEVELS.map((lvl, idx) => {
     const isDone = !!p.completed[lvl.id];
     const isUnlocked = idx === 0 || !!p.completed[LETTER_LEVELS[idx - 1].id];
     const stars = p.stars[lvl.id] || (isDone ? 3 : 0);
     const starHtml = Array.from({length: 3}, (_, i) => `<span class="${i < stars ? 'star-filled' : 'star-empty'}">★</span>`).join('');
     return `
      <div class="path-node ${isDone ? 'unlocked' : isUnlocked ? 'current' : 'locked'}" data-path-letter="${lvl.id}">
       <div class="node-circle">
        <span class="arabic" lang="ar" dir="rtl" style="font-size:36px;color:${isDone?'#059669':isUnlocked?'#d97706':'#94a3b8'};">${lvl.letters.join(' ')}</span>
       </div>
       <div class="node-label">${esc(lvl.title)}</div>
       <div class="node-subtitle">${esc(lvl.desc)}</div>
       <div class="node-stars">${starHtml}</div>
      </div>
     `;
    }).join('')}
   </div>

   <div class="path-section-title" style="margin-top:40px;">
    <h2>📖 পার্ট ২: ২৬৮টি কুরআনিক শব্দ (২৭টি থিমেটিক ডেক)</h2>
   </div>
   <div class="path-tree">
    ${WORD_DECKS.map((deck, idx) => {
     const isDone = !!p.completed[deck.id];
     const isUnlocked = (idx === 0 && !!p.completed['l7']) || !!p.completed[WORD_DECKS[idx - 1]?.id];
     const stars = p.stars[deck.id] || (isDone ? 3 : 0);
     const starHtml = Array.from({length: 3}, (_, i) => `<span class="${i < stars ? 'star-filled' : 'star-empty'}">★</span>`).join('');
     return `
      <div class="path-node ${isDone ? 'unlocked' : isUnlocked ? 'current' : 'locked'}" data-path-deck="${deck.id}">
       <div class="node-circle">
        <span style="font-size:36px;">${deck.theme}</span>
       </div>
       <div class="node-label">ডেক ${bnNum(idx + 1)}: ${esc(deck.title)}</div>
       <div class="node-subtitle">${bnNum(deck.count)}টি নির্বাচিত শব্দ</div>
       <div class="node-stars">${starHtml}</div>
      </div>
     `;
    }).join('')}
   </div>
  </div>`;
 }

 /* ==========================================================================
    V7 — Phase 2: Letter Tracing Modal (HTML5 Canvas)
    ========================================================================== */
 let tracingLetter = 'ب';
 let traceModalOpen = false;

 function renderTracingModal() {
  if (!traceModalOpen) return '';
  const l = ALPHABET.find(x => x.ch === tracingLetter) || ALPHABET[1];
  return `
  <div class="tracing-modal-overlay" id="tracing-modal-overlay">
    <div class="tracing-modal-card">
      <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
        <span class="pill">✍️ আঙুল দিয়ে হরফ আঁকো</span>
        <button type="button" class="btn" data-close-trace style="padding:4px 10px;min-height:0;">✕ বন্ধ</button>
      </div>
      <h2 style="margin:8px 0 2px;">${esc(l.name)} (${esc(l.ch)})</h2>
      <p class="tiny" style="margin-bottom:8px;">${esc(l.mnemonic || 'ডটেড লাইনের উপর হাত বা মাউস ঘুরিয়ে হরফটি আঁকো')}</p>
      
      <div class="tracing-canvas-wrap">
        <canvas id="trace-canvas" width="320" height="320"></canvas>
      </div>

      <div id="trace-feedback-banner"></div>

      <div class="tracing-actions">
        <button type="button" class="btn" id="trace-clear-btn">মুছে আবার আঁকো ↺</button>
        <button type="button" class="btn primary" id="trace-done-btn">সম্পূর্ণ করেছি ✓</button>
        <button type="button" class="btn" id="trace-next-btn">পরের হরফ →</button>
      </div>
    </div>
  </div>`;
 }

 function initTracingCanvas() {
  const canvas = $('trace-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;

  function drawDottedGuide() {
   ctx.clearRect(0, 0, w, h);
   // Draw gentle grid/cross-hair
   ctx.strokeStyle = '#e2ebe0';
   ctx.lineWidth = 1;
   ctx.setLineDash([4, 4]);
   ctx.beginPath();
   ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h);
   ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
   ctx.stroke();
   ctx.setLineDash([]);

   // Draw dashed guide letter
   ctx.font = "200px 'Noto Naskh Arabic', 'Amiri', serif";
   ctx.textAlign = 'center';
   ctx.textBaseline = 'middle';
   ctx.fillStyle = '#cbd5e1';
   ctx.fillText(tracingLetter, w / 2, h / 2 + 20);

   // Draw stroke starting hint arrow
   ctx.fillStyle = '#10b981';
   ctx.beginPath();
   ctx.arc(w / 2 + 65, h / 2 - 40, 10, 0, Math.PI * 2);
   ctx.fill();
   ctx.fillStyle = '#fff';
   ctx.font = 'bold 12px sans-serif';
   ctx.fillText('১', w / 2 + 65, h / 2 - 38);
  }

  drawDottedGuide();

  let drawing = false;
  let paintedPixels = 0;

  const startDraw = (e) => {
   drawing = true;
   ctx.beginPath();
   const rect = canvas.getBoundingClientRect();
   const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
   const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
   ctx.moveTo(x, y);
   SoundFx.init();
  };

  const drawMove = (e) => {
   if (!drawing) return;
   e.preventDefault();
   const rect = canvas.getBoundingClientRect();
   const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
   const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
   ctx.lineWidth = 22;
   ctx.lineCap = 'round';
   ctx.lineJoin = 'round';
   ctx.strokeStyle = '#10b981';
   ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
   ctx.shadowBlur = 10;
   ctx.lineTo(x, y);
   ctx.stroke();
   paintedPixels += 1;
   if (paintedPixels === 40) {
    SoundFx.playClick();
   }
  };

  const endDraw = () => {
   drawing = false;
   if (paintedPixels > 60) {
    const banner = $('trace-feedback-banner');
    if (banner && !banner.hasChildNodes()) {
     banner.innerHTML = `<div class="tracing-success-banner">🌟 মাশাআল্লাহ! চমৎকার লিখেছ! ⭐⭐⭐</div>`;
     SoundFx.playSuccess();
     spawnConfetti();
     updateStreak();
    }
   }
  };

  canvas.addEventListener('pointerdown', startDraw);
  canvas.addEventListener('pointermove', drawMove);
  canvas.addEventListener('pointerup', endDraw);
  canvas.addEventListener('pointercancel', endDraw);

  $('trace-clear-btn')?.addEventListener('click', () => {
   paintedPixels = 0;
   $('trace-feedback-banner').innerHTML = '';
   drawDottedGuide();
   SoundFx.playClick();
  });

  $('trace-done-btn')?.addEventListener('click', () => {
   SoundFx.playSuccess();
   spawnConfetti();
   updateStreak();
   toast('মাশাআল্লাহ! হরফ লেখার প্র্যাকটিস সম্পন্ন হয়েছে!');
   traceModalOpen = false;
   render();
  });

  $('trace-next-btn')?.addEventListener('click', () => {
   const idx = ALPHABET.findIndex(x => x.ch === tracingLetter);
   tracingLetter = ALPHABET[(idx + 1) % ALPHABET.length].ch;
   paintedPixels = 0;
   $('trace-feedback-banner').innerHTML = '';
   drawDottedGuide();
   SoundFx.playClick();
  });
 }

 function home(){
   const got=state.learned.filter(id=>WORDS.some(w=>w.id===id)).length;
   const counts=Object.fromEntries([2,3,4,5,6,7,8].map(n=>[n,WORDS.filter(w=>w.length===n).length]));
   const weakCount = getWeakItems().length;

   return `
   <section class="hero">
    <div>
      <span class="eyebrow">LEARN · READ · RECOGNIZE</span>
      <h1>অক্ষর থেকে শব্দ,<br>শব্দ থেকে কুরআনের ভাষা।</h1>
      <p>শিশু ও নতুনদের জন্য আন্তর্জাতিক মানের ইন্টারেক্টিভ ও গেমিফাইড আরবি পাঠশালা। হরকত, যুক্তরূপ ও শব্দার্থ শিখুন ভয়হীনভাবে।</p>
      <div class="actions">
        ${linkButton('path','🌟 গেইমিফাইড পাঠ শুরু করুন',true)}
        ${linkButton('alphabet','২৮ হরফ শিখুন')}
        ${linkButton('builder','Word Builder ধাঁধা')}
      </div>
    </div>
    <div class="hero-art">
      <div class="hero-ar arabic" lang="ar">بِسْمِ اللّٰهِ<small>বিসমিল্লাহি · আল্লাহর নামে</small></div>
    </div>
   </section>

   ${weakCount > 0 ? `
   <section class="card" style="background:linear-gradient(135deg,#fff7ed,#ffedd5);border-color:#fdba74;margin-bottom:20px;text-align:center;">
    <h3 style="color:#9a3412;margin:0 0 6px;">🎯 দুর্বল শব্দ রিভিশন বাকি আছে</h3>
    <p style="color:#7c2d12;font-size:13px;margin:0 0 12px;">যে শব্দগুলোতে আগে ভুল হয়েছিল, সেগুলো ঝালাই করে নিন।</p>
    <button type="button" class="btn-weak-review" data-start-weak-flash>
      🎯 দুর্বল শব্দগুলো ঝালাই করুন <span class="weak-badge">${bnNum(weakCount)}টি</span>
    </button>
   </section>
   ` : ''}

   <section class="grid4" aria-label="পাঠশালার পরিসংখ্যান">
    <div class="card stat"><b>${bnNum(ALPHABET.length)}</b><small>মূল আরবি হরফ</small></div>
    <div class="card stat"><b>${bnNum(WORDS.length)}</b><small>কুরআনিক শব্দরূপ</small></div>
    <div class="card stat"><b>${bnNum(got)}</b><small>তোমার শেখা শব্দ</small></div>
    <div class="card stat"><b>${bnNum(getStreak().count || 1)}</b><small>প্রতিদিনের স্ট্রিক (দিন)</small></div>
   </section>

   <div class="section-head">
    <h2>তোমার শেখার পথ</h2>
    <span class="pill">V7 · আলটিমেট এডিশন</span>
   </div>
   <section class="grid3">
    <article class="card module" style="border-color:#10b981;background:linear-gradient(110deg,#ecfdf5,#ffffff);">
      <span class="label">GAMIFIED PATH · NEW</span>
      <h3>🌟 স্টেপ-বাই-স্টেপ লার্নিং পাথ</h3>
      <p>ডুওলিঙ্গো স্টাইলে ৭টি হরফ লেভেল ও ২৭টি থিমেটিক শব্দ ডেক সম্পূর্ণ করে স্টার অর্জন করুন।</p>
      ${linkButton('path','লার্নিং পাথ খুলুন →',true)}
    </article>
    <article class="card module">
      <span class="label">STEP 01</span>
      <h3>আরবি হরফ ও ট্রেসিং</h3>
      <p>২৮টি অক্ষরের রূপ, চাইল্ড-ফ্রেন্ডলি ছন্দ/টিপস এবং ক্যানভাসে আঙুল দিয়ে লেখা অনুশীলন।</p>
      ${linkButton('alphabet','২৮ হরফ ও ট্রেসিং')}
    </article>
    <article class="card module">
      <span class="label">STEP 02</span>
      <h3>শব্দ ও যুক্তরূপ (Color Coded)</h3>
      <p>প্রতিটি অক্ষরের রঙের সাথে যুক্তরূপ টেবিল মেলান এবং অ্যানিমেশনে সংযোগ দেখুন।</p>
      ${linkButton('words','শব্দতালিকা দেখুন')}
    </article>
    <article class="card module" style="border-color:#b5cfb8;background:linear-gradient(110deg,#f3f8f1,#fffefa)">
      <span class="label">INTERACTIVE · SMART SRS</span>
      <h3>যাচাই করা (ফ্ল্যাশ-কার্ড)</h3>
      <p>কার্ড ফ্লিপ করে উত্তর যাচাই। না পারলে দুর্বল কিউতে জমা হবে রিভিশনের জন্য।</p>
      ${linkButton('flashcards','যাচাই শুরু করুন →',true)}
    </article>
    <article class="card module prayer-module">
      <span class="label">STEP 04</span>
      <h3>পাঁচ ওয়াক্ত নামাজ শিক্ষা</h3>
      <p>ফজর–এশার রাকাত, নামাজের ধাপ, সূরা ফাতিহা ও ছোট সূরা, আত্তাহিয়্যাত, দরুদ ও দোয়া।</p>
      ${linkButton("salah","নামাজ শিক্ষা শুরু করুন",true)}
    </article>
    <article class="card module last10-module">
      <span class="label">STEP 05</span>
      <h3>কুরআনের শেষ ১০টি সূরা</h3>
      <p>আল-ফীল থেকে আন-নাস: ৪৮টি আয়াতের তিলাওয়াত অডিও, বাংলা উচ্চারণ, অর্থ ও হরকত অন/অফ টগল।</p>
      ${linkButton("last-ten","শেষ ১০ সূরা শিখুন",true)}
    </article>
   </section>

   ${V4?.dashboard()||''}

   <div class="section-head"><h2>আজকের নির্বাচিত শব্দ</h2></div>
   <div class="grid2">${cards(WORDS.slice(0,2))}</div>
   <p class="notice">এই সংস্করণে ১৬টি ছোট সূরা থেকে নির্বাচিত শব্দ আছে। বাংলা উচ্চারণ ও তাজবীদের সহায়তার জন্য ক্বারীর অডিও ও শিক্ষকের সাহায্য নিন।</p>`;
 }

 const prayerTabs=[['rakats','৫ ওয়াক্ত ও রাকাত'],['steps','নামাজের ধাপ'],['surahs','সূরা শেখা'],['duas','দোয়া ও তাসবিহ'],['preparation','প্রস্তুতি ও অজু']];
 const prayerSource=url=>url?`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="prayer-source">উৎসে পড়ুন / শুনুন ↗</a>`:'';
 const prayerText=(ar,bn,meaning)=>`<div class="prayer-text"><div class="prayer-ar arabic" dir="rtl" lang="ar">${esc(showHarakat ? ar : stripHarakat(ar))}</div><div class="prayer-bn"><strong>বাংলা উচ্চারণ (সহায়ক)</strong><span>${esc(bn)}</span></div>${meaning?`<div class="prayer-meaning"><strong>বাংলা অর্থ</strong><span>${esc(meaning)}</span></div>`:''}</div>`;

 function prayerRakat(){const p=SALAH.prayers.find(p=>p.id===salahPrayer)||SALAH.prayers[0];return `<div class="prayer-picks">${SALAH.prayers.map(x=>`<button type="button" class="prayer-pick ${x.id===p.id?'active':''}" data-salah-prayer="${esc(x.id)}" aria-pressed="${x.id===p.id}"><span>${esc(x.name)}</span><b>${bnNum(x.fard)} ফরজ</b></button>`).join('')}</div><section class="card prayer-panel"><div class="prayer-panel-head"><div><span class="eyebrow">FIVE DAILY PRAYERS</span><h2>${esc(p.name)} নামাজ</h2><p class="muted">ওয়াক্ত: ${esc(p.time)} · স্থানীয় মসজিদের সময়সূচি অনুসরণ করুন</p></div><span class="prayer-count">${bnNum(p.fard)} <small>রাকাত ফরজ</small></span></div><div class="prayer-parts">${p.parts.map(([label,num],i)=>`<div class="prayer-part"><small>ক্রম ${bnNum(i+1)}</small><strong>${esc(label)}</strong><span>${bnNum(num)} রাকাত</span></div>`).join('')}</div><p class="notice">রাকাতের এই বিন্যাস বাংলাদেশে প্রচলিত হানাফি পদ্ধতির উদাহরণ। ফরজ রাকাত নির্দিষ্ট; সুন্নত, নফল এবং বিতরের কিছু বিধানে মাজহাবভেদে পার্থক্য আছে। নফল ঐচ্ছিক, ফরজের বিকল্প নয়।</p></section><div class="prayer-next"><button class="btn" data-salah-tab="steps">নামাজের ধাপ দেখুন →</button><button class="btn" data-salah-tab="surahs">প্রয়োজনীয় সূরা শিখুন →</button></div>`}
 function prayerSteps(){return `<div class="prayer-info-grid"><div class="card"><h3>দুই রাকাতের সহজ শেখার ধাপ</h3><p class="muted">ধাপের ক্রম বোঝার জন্য। জামাতে অংশগ্রহণ ও নারী-পুরুষের কিছু আমলে মাজহাবভেদে পার্থক্য রয়েছে।</p></div><div class="card"><h3>কিরাত সম্পর্কে</h3><p>সূরা ফাতিহা মূল কিরাতের অংশ। প্রযোজ্য রাকাতে ফাতিহার পরে অন্য সূরা/আয়াত পড়া হয়। প্রতিটি নামাজের জন্য নির্দিষ্ট আলাদা সূরা বাধ্যতামূলক নয়।</p></div></div><div class="prayer-timeline">${SALAH.steps.map((x,i)=>`<article class="card prayer-step"><div class="prayer-step-num">${bnNum(i+1)}</div><div><h3>${esc(x.name)}</h3><p>${esc(x.desc)}</p><button type="button" class="prayer-small-link" data-salah-jump="${esc(x.dua)}">সংশ্লিষ্ট দোয়া দেখুন ↗</button></div></article>`).join('')}</div>`}
 function prayerSurahs(){const s=SALAH.surahs.find(x=>x.id===salahSurah)||SALAH.surahs[0];const meanings=SALAH.verseMeanings[s.id]||[];return `<div class="prayer-surah-nav">${[...SALAH.surahs].sort((a,b)=>a.id-b.id).map(x=>`<button class="prayer-surah-button ${x.id===s.id?'active':''}" type="button" aria-pressed="${x.id===s.id}" data-salah-surah="${x.id}">${esc(x.title)}<small>${bnNum(x.verses.length)} আয়াত</small></button>`).join('')}</div><section class="card prayer-surah-panel ${salahHideBangla?'hide-translit':''}"><div class="row-space"><div><span class="eyebrow">SURAH ${bnNum(s.id)}</span><h2>${esc(s.title)}</h2></div><span class="pill">${esc(s.tag)}</span></div><p>${esc(s.meaning)}</p><div class="actions no-print"><button type="button" class="btn" data-prayer-bn-toggle aria-pressed="${salahHideBangla}">${salahHideBangla?'বাংলা উচ্চারণ দেখান':'মুখস্থ অনুশীলন: বাংলা উচ্চারণ লুকান'}</button></div><p class="tiny">সূরা ফাতিহা ব্যতীত নিচের সূরাগুলোর আয়াতের আগে সাধারণভাবে বিসমিল্লাহ পড়া হয় (সূরা আত-তাওবা ব্যতিক্রম)।</p>${s.id!==1?`<div class="prayer-bismillah">${prayerText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ','বিসমিল্লাহির রাহমানির রাহীম','পরম করুণাময়, অতি দয়ালু আল্লাহর নামে।')}</div>`:''}<div class="prayer-verses">${s.verses.map((v,i)=>`<div class="prayer-ayah"><span class="prayer-ayah-number">আয়াত ${bnNum(i+1)}</span>${prayerText(v[0],v[1],meanings[i]||'')}</div>`).join('')}</div><div class="prayer-next">${prayerSource('https://quran.com/'+s.id)}<button class="btn" type="button" data-print-prayer>প্রিন্ট করুন</button></div></section>`}

 function lastTenView(){
   const s=LAST_TEN.find(x=>x.id===lastTenSelected)||LAST_TEN[0];
   const ix=LAST_TEN.indexOf(s), meanings=SALAH.verseMeanings[s.id]||[];
   const learned=LAST_TEN.filter(x=>lastTenLearned.includes(x.id)).length;
   return `<section class="prayer-head last10-head">
    <span class="eyebrow">STEP 05 · QURANIC MEMORIZATION</span>
    <h1>কুরআনের শেষ ১০টি সূরা</h1>
    <p>সূরা ১০৫ (আল-ফীল) থেকে ১১৪ (আন-নাস) — প্রতিটি আয়াতের ক্বারীর তিলাওয়াত অডিও শুনুন এবং হরকত অন/অফ করে মুখস্থ যাচাই করুন।</p>
    
    <div class="row-space" style="margin:12px 0 16px;">
      <div class="tashkeel-toggle-bar">
        <span>হরকত:</span>
        <button type="button" class="tashkeel-toggle-btn ${showHarakat?'active':''}" data-tashkeel="on">হরকত সহ</button>
        <button type="button" class="tashkeel-toggle-btn ${!showHarakat?'active':''}" data-tashkeel="off">হরকত ছাড়া</button>
      </div>
      <div class="last10-progress" style="margin:0;">
        <strong>মুখস্থ সম্পন্ন: ${bnNum(learned)} / ১০ সূরা</strong>
        <progress value="${learned}" max="10" aria-label="মুখস্থ করা সূরার সংখ্যা"></progress>
      </div>
    </div>
   </section>
   <nav class="last10-grid no-print" aria-label="কুরআনের শেষ দশ সূরা">${LAST_TEN.map(x=>`<button type="button" class="last10-pick ${x.id===s.id?'active':''}" data-last-surah="${x.id}" aria-pressed="${x.id===s.id}"><span class="last10-num">${bnNum(x.id)}</span><strong>${esc(x.title)}</strong><small>${bnNum(x.verses.length)} আয়াত ${lastTenLearned.includes(x.id)?'· ✓ মুখস্থ':''}</small></button>`).join('')}</nav>
   <section class="card prayer-surah-panel ${salahHideBangla?'hide-translit':''}" id="last-ten-lesson"><div class="row-space"><div><span class="eyebrow">SURAH ${bnNum(s.id)} · ${bnNum(ix+1)} / ১০</span><h2>${esc(s.title)}</h2></div><span class="pill">${bnNum(s.verses.length)} আয়াত</span></div><p>${esc(s.meaning)}</p>
   <div class="actions no-print"><button type="button" class="btn" data-prayer-bn-toggle aria-pressed="${salahHideBangla}">${salahHideBangla?'বাংলা উচ্চারণ দেখান':'বাংলা উচ্চারণ লুকিয়ে নিজে পড়ুন'}</button><button type="button" class="btn ${lastTenLearned.includes(s.id)?'':'primary'}" data-last-learned="${s.id}" aria-pressed="${lastTenLearned.includes(s.id)}">${lastTenLearned.includes(s.id)?'✓ মুখস্থ হয়েছে — পরিবর্তন করুন':'☆ মুখস্থ হয়েছে চিহ্নিত করুন'}</button></div>
   <div class="prayer-bismillah">${prayerText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ','বিসমিল্লাহির রাহমানির রাহীম','পরম করুণাময়, অতি দয়ালু আল্লাহর নামে।')}</div>
   <div class="prayer-verses">${s.verses.map((v,i)=>`
    <article class="prayer-ayah">
      <div class="row-space">
        <span class="prayer-ayah-number">আয়াত ${bnNum(i+1)} / ${bnNum(s.verses.length)}</span>
        <button type="button" class="btn-ayah-audio" data-ayah-audio="${s.id}:${i}">♪ তিলাওয়াত শুনুন</button>
      </div>
      ${prayerText(v[0],v[1],meanings[i]||'')}
    </article>`).join('')}</div>
   <div class="prayer-next no-print"><button type="button" class="btn" data-last-shift="-1" ${ix===0?'disabled':''}>← আগের সূরা</button><button type="button" class="btn primary" data-last-shift="1" ${ix===9?'disabled':''}>পরের সূরা →</button><a href="https://quran.com/${s.id}" class="prayer-source" target="_blank" rel="noopener noreferrer">কুরআনের উৎসে পড়ুন ↗</a><button type="button" class="btn" data-print-prayer>প্রিন্ট</button></div></section>
   <p class="notice">সূরাগুলোর আরবি ও অডিও এভরিআয়া সিডিএন (EveryAyah Alafasy 128kbps) থেকে সংযুক্ত।</p>`;
 }
 function prayerDuas(){const d=SALAH.duas.find(x=>x.id===salahDua)||SALAH.duas[0];return `<div class="prayer-dua-nav">${SALAH.duas.map(x=>`<button type="button" class="prayer-dua-button ${x.id===d.id?'active':''}" data-salah-dua="${esc(x.id)}" aria-pressed="${x.id===d.id}">${esc(x.name)}</button>`).join('')}</div><section class="card prayer-surah-panel ${salahHideBangla?'hide-translit':''}"><span class="eyebrow">SALAH RECITATION</span><h2>${esc(d.name)}</h2><p class="muted">পড়ার স্থান: ${esc(d.place)}</p><div class="actions no-print"><button type="button" class="btn" data-prayer-bn-toggle aria-pressed="${salahHideBangla}">${salahHideBangla?'বাংলা উচ্চারণ দেখান':'মুখস্থ অনুশীলন: বাংলা উচ্চারণ লুকান'}</button></div>${prayerText(d.ar,d.bn,d.meaning)}<div class="prayer-next">${prayerSource(d.source)}<button type="button" class="btn" data-salah-tab="steps">নামাজের ধাপে ফিরুন</button></div></section><p class="notice">হানাফি বিতরের তৃতীয় রাকাতে দোয়া কুনুতের বিশেষ নিয়ম রয়েছে।</p>`}
 function prayerPreparation(){const wudu=[['নিয়ত ও শুরু','বিসমিল্লাহ বলে শুরু করুন; নিয়ত অন্তরে থাকবে।'],['দুই হাত ধোয়া','কবজি পর্যন্ত দুই হাত ধুয়ে নিন।'],['কুলি ও নাক পরিষ্কার','মুখ কুলি এবং নাকে পানি দিয়ে পরিষ্কার করুন।'],['মুখ ও দুই হাত ধোয়া','সম্পূর্ণ মুখ ধুয়ে কনুইসহ দুই হাত ধুয়ে নিন।'],['মাথা মাসেহ','ভেজা হাত দিয়ে মাথা মাসেহ করুন।'],['দুই পা ধোয়া','টাখনুসহ উভয় পা ভালোভাবে ধুয়ে নিন।']];return `<div class="prayer-info-grid">${SALAH.preconditions.map((x,i)=>`<article class="card"><span class="eyebrow">প্রস্তুতি ${bnNum(i+1)}</span><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></article>`).join('')}</div><h2 class="prayer-subtitle">অজু শেখার সহজ ধাপ</h2><div class="prayer-timeline">${wudu.map((x,i)=>`<article class="card prayer-step"><span class="prayer-step-num">${bnNum(i+1)}</span><div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div></article>`).join('')}</div>`}
 function prayerView(){return `<div class="prayer-head"><span class="eyebrow">STEP 04 · SALAH LEARNING</span><h1>পাঁচ ওয়াক্ত নামাজ শিক্ষা</h1><p>ফরজ রাকাত, নামাজের ধাপ, দরকারি সূরা, দোয়া ও অজুর প্রাথমিক নিয়ম—আরবি, বাংলা উচ্চারণ ও অর্থসহ।</p></div><nav class="prayer-tabs" aria-label="নামাজ শেখার বিষয়">${prayerTabs.map(([id,name])=>`<button type="button" class="prayer-tab ${id===salahTab?'active':''}" aria-pressed="${id===salahTab}" data-salah-tab="${esc(id)}">${esc(name)}</button>`).join('')}</nav><div id="prayer-tab-content">${salahTab==='rakats'?prayerRakat():salahTab==='steps'?prayerSteps():salahTab==='surahs'?prayerSurahs():salahTab==='duas'?prayerDuas():prayerPreparation()}</div>`}

 function alphabet(){
   const l=ALPHABET.find(x=>x.ch===letterSelected)||ALPHABET[1];
   return `<span class="eyebrow">MODULE 01 · ARABIC ALPHABET</span>
   <h1>আরবি ২৮টি মূল হরফ</h1>
   <p class="muted">অক্ষরে ক্লিক করলে তার একক ও যুক্তরূপ দেখা যাবে। শিশুদের জন্য নিচে ক্যানভাস ট্রেসিং দিয়ে হাত ঘুরিয়ে হরফ লেখার সুবিধা যোগ করা হয়েছে।</p>
   
   <div style="margin: 12px 0 16px;">
     <button type="button" class="btn primary" data-open-trace="${esc(l.ch)}">✍️ "${esc(l.name)}" হরফটি হাত ঘুরিয়ে আঁকো (Tracing)</button>
   </div>

   <section class="letter-grid" aria-label="আরবি বর্ণমালা">${ALPHABET.map(x=>`<button type="button" class="letter-tile ${x.ch===l.ch?'active':''}" data-letter="${esc(x.ch)}" aria-pressed="${x.ch===l.ch}">${arabic(x.ch)}<small>${esc(x.name)}</small></button>`).join('')}</section>
   <section class="card letter-detail" id="letter-detail" tabindex="-1">${letterDetail(l.ch)}</section>
   <p class="notice">আরবিতে ا، د، ذ، ر، ز، و – এই ৬টি অক্ষর পরের অক্ষরের সঙ্গে যুক্ত হয় না।</p>`;
 }

 function letterDetail(ch){
   const name=getName(ch),forms=shapePositions(ch),labels=['একক রূপ','শুরুর রূপ','মাঝের রূপ','শেষের রূপ'],mnemonic=getMnemonic(ch);
   return `
   <div class="head">
     <div class="big arabic" lang="ar">${esc(ch)}</div>
     <div style="flex:1;">
       <div class="eyebrow">LETTER DETAIL</div>
       <h2>${esc(name)}</h2>
       ${mnemonic ? `<div class="mnemonic-box"><span class="mnemonic-tag">💡 মনে রাখার কৌশল:</span> ${esc(mnemonic)}</div>` : ''}
     </div>
   </div>
   <div class="shape-grid" style="margin-top:14px;">${forms.map((s,i)=>`<div class="shape-cell"><small>${labels[i]}</small>${s==='—'?'<span class="arabic" aria-label="প্রযোজ্য নয়">—</span>':arabic(s)}</div>`).join('')}</div>
   <div class="actions" style="margin-top:16px;">
     <button type="button" class="btn primary" data-open-trace="${esc(ch)}">✍️ এই হরফটি হাত ঘুরিয়ে আঁকো (Tracing)</button>
   </div>`;
 }

 function filters(){return WORDS.filter(w=>(sourceFilter==='all'||(sourceFilter==='v5'?w.batch==='v5':w.refs.some(r=>r.startsWith(sourceFilter+':'))))&&(lengthFilter==='all'||w.length===Number(lengthFilter))&&(bookFilter==='all'||(bookFilter==='learned'?state.learned.includes(w.id):bookFilter==='weak'?getWeakItems().includes(w.id):state.bookmarked.includes(w.id)))&&(!search||normalizeSearch(w.ar).includes(normalizeSearch(search))||normalizeSearch(w.bn).includes(normalizeSearch(search))||normalizeSearch(w.meaning).includes(normalizeSearch(search))||w.refs.some(r=>r.includes(search.trim())))).sort((a,b)=>a.length-b.length||a.search.localeCompare(b.search,'ar'))}

 function words(){
   const filtered=filters(),pageCount=Math.max(1,Math.ceil(filtered.length/12));
   page=Math.min(page,pageCount-1);let group=filtered.slice(page*12,(page+1)*12);
   const weakCount = getWeakItems().length;

   return `<span class="eyebrow">MODULE 02 · WORD LEARNING</span>
   <h1>কুরআনের শব্দ শেখা</h1>
   <p class="muted">শব্দ নির্বাচন করে প্রতিটি অক্ষরের রঙের সাথে যুক্তরূপ এবং হরকত মিলিয়ে দেখুন।</p>
   
   <div class="row-space" style="margin: 10px 0;">
     <div class="tashkeel-toggle-bar">
       <span>হরকত:</span>
       <button type="button" class="tashkeel-toggle-btn ${showHarakat?'active':''}" data-tashkeel="on">হরকত সহ</button>
       <button type="button" class="tashkeel-toggle-btn ${!showHarakat?'active':''}" data-tashkeel="off">হরকত ছাড়া</button>
     </div>
     ${weakCount > 0 ? `
       <button type="button" class="btn-weak-review" data-filter-weak style="padding:6px 14px;font-size:12px;">
         🎯 দুর্বল শব্দ ফিল্টার (${bnNum(weakCount)}টি)
       </button>
     ` : ''}
   </div>

   <div class="toolbar">
     <input id="word-search" type="search" value="${esc(search)}" placeholder="আরবি, বাংলা উচ্চারণ, অর্থ বা সূরা:আয়াত…" aria-label="শব্দ অনুসন্ধান">
     <select id="word-length" aria-label="অক্ষরসংখ্যা"><option value="all">সব দৈর্ঘ্য</option>${[2,3,4,5,6,7,8].map(n=>`<option value="${n}" ${lengthFilter===String(n)?'selected':''}>${bnNum(n)} অক্ষর</option>`).join('')}</select>
     <select id="word-source" aria-label="সূরা বা নতুন শব্দ Filter"><option value="all">সব সূরা</option><option value="v5" ${sourceFilter==='v5'?'selected':''}>শুধু নতুন V5 শব্দ</option>${INFO.surahs.map(n=>`<option value="${n}" ${sourceFilter===String(n)?'selected':''}>সূরা ${bnNum(n)}</option>`).join('')}</select>
     <select id="word-book" aria-label="শেখা ও বুকমার্ক Filter">
       <option value="all">সব শব্দ</option>
       <option value="learned" ${bookFilter==='learned'?'selected':''}>শেখা শব্দ</option>
       <option value="bookmarked" ${bookFilter==='bookmarked'?'selected':''}>বুকমার্ক করা</option>
       <option value="weak" ${bookFilter==='weak'?'selected':''}>দুর্বল শব্দ (${bnNum(weakCount)})</option>
     </select>
   </div>
   <div class="row-space"><span class="tiny">মোট ${bnNum(filtered.length)}টি ফলাফল · পৃষ্ঠা ${bnNum(page+1)} / ${bnNum(pageCount)}</span><span class="pill gray">শব্দের বানান অনুসারে পৃথক</span></div>
   <div id="filtered-words" class="word-list" style="margin-top:15px">${group.length?cards(group):'<div class="empty">এই Filter-এ কোনো শব্দ পাওয়া যায়নি।</div>'}</div>
   <div class="pager no-print"><button class="btn" data-page="prev" ${page===0?'disabled':''}>← আগের পৃষ্ঠা</button><span class="tiny">পৃষ্ঠা ${bnNum(page+1)} / ${bnNum(pageCount)}</span><button class="btn" data-page="next" ${page>=pageCount-1?'disabled':''}>পরের পৃষ্ঠা →</button></div>`;
 }

 /* ==========================================================================
    V7 — Phase 1: Word Study Card (Color-Coded Breakdown & Morphing)
    ========================================================================== */
 let morphActive = false;

 function word(id){
   const w=WORDS.find(x=>x.id===id);
   if(!w)return `<h1>শব্দ পাওয়া যায়নি</h1>${linkButton('words','শব্দতালিকায় ফিরে যান')}`;
   const parts=tokenParts(w.ar);
   let joined=parts.map((p,i)=>({base:p.base,linked:joiningForm(parts,i),marks:p.marks,label:i===0?'শুরু':i===parts.length-1?'শেষ':'মাঝে',n:i}));

   return `
   <div class="word-heading">
     <a class="backlink" href="#qa-words">← সব শব্দ</a>
     <div class="word-markers">
       <span class="pill gray">${bnNum(w.length)}টি অক্ষর</span>
       ${w.batch==='v5'?'<span class="pill">V5 নতুন শব্দ</span>':''}
       ${state.learned.includes(w.id)?'<span class="pill">✓ শেখা হয়েছে</span>':''}
       ${getWeakItems().includes(w.id)?'<span class="pill" style="background:#fee2e2;color:#b91c1c;">⚠️ দুর্বল তালিকা</span>':''}
     </div>
   </div>
   <div class="eyebrow">WORD STUDY CARD · ${esc(w.id.toUpperCase())}</div>
   <div class="row-space">
     <h1>একটি শব্দ, প্রতিটি অক্ষর</h1>
     <div class="tashkeel-toggle-bar">
       <span>হরকত:</span>
       <button type="button" class="tashkeel-toggle-btn ${showHarakat?'active':''}" data-tashkeel="on">হরকত সহ</button>
       <button type="button" class="tashkeel-toggle-btn ${!showHarakat?'active':''}" data-tashkeel="off">হরকত ছাড়া</button>
     </div>
   </div>

   <div class="word-study-split">
    <section class="word-card-left">
     <div class="word-display-box">
      <div class="word-emoji-hero" aria-hidden="true">${w.icon || '📖'}</div>
      
      <!-- Phase 1.1: Color-Coded Connected Letters Inside Main Arabic Word -->
      <div class="word-ar-interactive arabic word-ar-big" lang="ar" dir="rtl" id="word-ar-target">
        ${joined.map((p, i) => `
          <span class="word-char-span char-col-${i % 8}" data-letter-idx="${i}" title="${esc(getName(p.base))} (${esc(p.label)})">
            ${esc(showHarakat ? (p.base + p.marks) : p.base)}
          </span>
        `).join('')}
      </div>

      <h2 class="word-bn-title">${esc(w.bn)}</h2>
      <div class="word-bn-meaning">${esc(w.meaning)}</div>
      <div class="word-sample-ref">কুরআন রেফারেন্স: ${w.refs.map(r=>`<a href="https://corpus.quran.com/wordbyword.jsp?chapter=${r.split(':')[0]}&verse=${r.split(':')[1]}" target="_blank" rel="noopener noreferrer">${esc(r)}</a>`).join(' · ')}</div>
     </div>

     <!-- Phase 1.2: Morphing Animation Toggle Button -->
     <div style="margin: 16px 0 6px; width: 100%;">
       <button type="button" class="btn morph-toggle-btn" data-toggle-morph="${w.id}" style="width:100%;">
         🔗 ${morphActive ? 'যুক্তরূপ অ্যানিমেশন লুকান' : 'কীভাবে যুক্ত হলো দেখুন (Morphing Animation)'}
       </button>
     </div>

     ${morphActive ? `
     <div class="morph-stage-wrap">
       <div class="morph-title">🔗 যেভাবে অক্ষরগুলো যুক্ত হয়ে শব্দ গঠিত হয়েছে:</div>
       <div class="morph-steps-grid">
         <div class="morph-step-card">
           <div class="morph-step-header">ধাপ ১: বিচ্ছিন্ন একক রূপ (Isolated)</div>
           <div class="morph-tiles-row">
             ${parts.map((p, i) => `
               <span class="morph-tile char-col-${i % 8}">
                 <span class="arabic" dir="rtl" lang="ar">${esc(p.base + (showHarakat ? p.marks : ''))}</span>
               </span>
               ${i < parts.length - 1 ? '<span class="morph-plus">+</span>' : ''}
             `).join('')}
           </div>
         </div>
         <div class="morph-arrow">↓</div>
         <div class="morph-step-card">
           <div class="morph-step-header">ধাপ ২: অবস্থানে যুক্তরূপ (Initial / Medial / Final)</div>
           <div class="morph-tiles-row">
             ${joined.map((p, i) => `
               <span class="morph-tile char-col-${i % 8}">
                 <span class="arabic" dir="rtl" lang="ar">${esc(p.linked)}</span>
                 <small style="font-size:9px;color:var(--muted);display:block;line-height:1;">${esc(p.label)}</small>
               </span>
             `).join('')}
           </div>
         </div>
         <div class="morph-arrow">↓</div>
         <div class="morph-step-card morph-final-card">
           <div class="morph-step-header">ধাপ ৩: পূর্ণ সংযুক্ত শব্দ (Connected Word)</div>
           <div class="word-ar-interactive arabic" lang="ar" dir="rtl" style="font-size:54px;">
             ${joined.map((p, i) => `<span class="word-char-span char-col-${i % 8}">${esc(showHarakat ? (p.base + p.marks) : p.base)}</span>`).join('')}
           </div>
           <div style="font-size:13px;color:#065f46;font-weight:700;margin-top:6px;">${esc(w.bn)} — ${esc(w.meaning)} ✨</div>
         </div>
       </div>
       <button type="button" class="btn morph-replay-btn" data-toggle-morph="${w.id}">পুনরায় চালান ↺</button>
     </div>
     ` : ''}

     <div class="actions word-card-actions no-print">
      <button type="button" class="btn primary" data-learn="${w.id}">${state.learned.includes(w.id)?'✓ শেখা হয়েছে — বাতিল করুন':'✓ এই শব্দটি শিখেছি'}</button>
      <button type="button" class="btn" data-bookmark="${w.id}">${state.bookmarked.includes(w.id)?'★ বুকমার্ক সরান':'☆ বুকমার্ক'}</button>
      <button type="button" class="btn" data-speak="${w.id}">♪ অডিও শুনুন</button>
      <button type="button" class="btn" data-open-builder-word="${w.id}">🧩 ধাঁধায় খেলুন</button>
     </div>
    </section>

    <!-- Right side: Color-Coded Letter Analysis Columnar Grid -->
    <section class="word-analysis-right card">
     <div class="analysis-title-group">
      <h2>অক্ষর বিশ্লেষণ</h2>
      <span class="pill gray">রঙ মিলিয়ে দেখুন: মূল → যুক্তরূপ → বাংলা → হরকত</span>
     </div>
     <div class="letters-col-scroll">
      <div class="letters-col-grid" dir="rtl">
       ${joined.map((p, i)=>`
        <div class="letter-col-item char-col-${i % 8}" data-letter-idx="${i}">
         <div class="col-cell cell-pos">
           <span class="col-num-badge">অক্ষর ${bnNum(i+1)}</span>
           <span class="pos-tag" style="margin-top:4px;">${esc(p.label)}</span>
         </div>
         <div class="col-cell cell-form">${arabic(p.linked,'form')}</div>
         <div class="col-cell cell-base">${arabic(p.base)}</div>
         <div class="col-cell cell-name"><button type="button" class="letter-click" data-show-letter="${esc(p.base)}" title="এই অক্ষরের বিস্তারিত দেখুন">${esc(getName(p.base))} ↗</button></div>
         <div class="col-cell cell-harakat">${harakatCells(p.marks,p.base)}</div>
        </div>
       `).join('')}
      </div>
     </div>
     <p class="tiny" style="margin-top:14px">টিপস: উপরের যেকোনো অক্ষরের ঘরে মাউস বা আঙুল রাখলে মূল শব্দের ভেতর সেই অক্ষরটি হাইলাইট ও পালস করবে।</p>
     ${harakatGuide()}
    </section>
   </div>
   <div id="letter-inline"></div>`;
 }

 /* ==========================================================================
    V7 — Phase 3: Flashcard Self Assessment Mode
    ========================================================================== */
 let flashcardMode='letters',flashcardItem=null,flashcardFlipped=false,flashcardWeakOnly=false;
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
   let pool = WORDS;
   if(flashcardWeakOnly){
    const weakList = getWeakItems();
    const filtered = WORDS.filter(w => weakList.includes(w.id));
    if(filtered.length) pool = filtered;
    else flashcardWeakOnly = false;
   }
   const w=pool[Math.floor(Math.random()*pool.length)];
   flashcardItem={kind:'word',word:w};
  }
 }

 function flashcardView(){
  if(!flashcardItem) pickFlashcard();
  const weakCount = getWeakItems().length;

  return `<div class="flashcard-page-wrap">
   <span class="eyebrow">INTERACTIVE PRACTICE · SELF ASSESSMENT</span>
   <h1>যাচাই করা — ফ্ল্যাশ-কার্ড</h1>
   <p class="muted">নিজের শেখা হরফ, যুক্তরূপ ও শব্দার্থ নিজে নিজে টেস্ট করুন। কার্ডে স্পর্শ বা ক্লিক করলে উল্টে যাবে এবং সঠিক উত্তর দেখা যাবে।</p>
   
   <div class="flashcard-mode-tabs">
    <button type="button" class="flash-mode-btn ${flashcardMode==='letters'?'active':''}" data-flash-mode="letters">🔤 হরফ ও যুক্তরূপ যাচাই</button>
    <button type="button" class="flash-mode-btn ${flashcardMode==='words'&&!flashcardWeakOnly?'active':''}" data-flash-mode="words">📖 সব কুরআনিক শব্দ</button>
    ${weakCount > 0 ? `
      <button type="button" class="flash-mode-btn ${flashcardWeakOnly?'active':''}" data-flash-mode="weak" style="border-color:#f97316;color:#9a3412;">
        🎯 দুর্বল শব্দ ঝালাই (${bnNum(weakCount)}টি)
      </button>
    ` : ''}
   </div>

   <div class="row-space" style="max-width:560px;margin:16px auto 12px">
    <span class="pill gray">আজকের যাচাই: ${bnNum(flashcardStats.reviewed)}টি</span>
    <span class="pill" style="color:var(--green)">✓ আয়ত্ত হয়েছে: ${bnNum(flashcardStats.mastered)}টি</span>
    <span class="pill" style="color:#d97706">🔥 স্ট্রিক: ${bnNum(getStreak().count || 1)} দিন</span>
   </div>

   <div class="flashcard-stage">
    <div class="flashcard-box ${flashcardFlipped?'is-flipped':''}" data-flash-card-flip role="button" tabindex="0" aria-label="ফ্ল্যাশ কার্ড ফ্লিপ করতে ক্লিক করুন">
     <div class="flashcard-face flashcard-front">
      <span class="card-side-pill">সামনের পিঠ · প্রশ্ন</span>
      <div class="flashcard-center">
       ${flashcardMode==='letters'?`
        <div class="arabic flash-big-glyph" dir="rtl" lang="ar">${esc(flashcardItem.shape)}</div>
        <div class="flash-question-text">এই হরফ বা রূপটি চিনতে পারছো?</div>
       `:`
        <span style="font-size:38px;margin-bottom:6px;" aria-hidden="true">${flashcardItem.word.icon || '📖'}</span>
        <div class="arabic flash-big-glyph" dir="rtl" lang="ar">${esc(showHarakat ? flashcardItem.word.ar : stripHarakat(flashcardItem.word.ar))}</div>
        <div class="flash-question-text">${bnNum(flashcardItem.word.length)} অক্ষরের শব্দ · মনে মনে উচ্চারণ ও অর্থ ভাবো</div>
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
        ${flashcardItem.letter.mnemonic ? `<div class="mnemonic-box" style="margin-top:10px;text-align:center;">💡 ${esc(flashcardItem.letter.mnemonic)}</div>` : ''}
       `:`
        <span style="font-size:32px;" aria-hidden="true">${flashcardItem.word.icon || '📖'}</span>
        <div class="arabic flash-mid-glyph" dir="rtl" lang="ar">${esc(showHarakat ? flashcardItem.word.ar : stripHarakat(flashcardItem.word.ar))}</div>
        <h2 class="flash-title">${esc(flashcardItem.word.bn)}</h2>
        <div class="flash-meaning">${esc(flashcardItem.word.meaning)}</div>
        <div class="flash-meta-badges" style="margin-top:8px">
         <span class="pill gray">সূরা: ${esc(flashcardItem.word.refs[0])}</span>
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
   <p class="tiny" style="text-align:center;margin-top:22px;color:var(--muted)">টিপস: কিবোর্ডের Space বা Enter চাপলে কার্ড ফ্লিপ হবে। প্রতিদিন অনুশীলন করে স্ট্রিক বজায় রাখুন।</p>
  </div>`;
 }

 /* ==========================================================================
    V7 — Quiz Engine
    ========================================================================== */
 function quizStart(){
  const pick=WORDS.filter(w=>w.length>=2&&w.length<=7);
  const shuffled=pick.sort(()=>Math.random()-.5);
  quiz={questions:shuffled.slice(0,10).map(w=>({word:w,choices:[w.meaning,...WORDS.filter(x=>x.meaning!==w.meaning).sort(()=>Math.random()-.5).slice(0,3).map(x=>x.meaning)].sort(()=>Math.random()-.5)})),index:0,answer:null,correct:0,finished:false};
  go('quiz');
 }

 function quizView(){
  if(!quiz)return `
   <span class="eyebrow">MODULE 03 · PRACTICE</span>
   <h1>শব্দার্থ মিলিয়ে দেখো</h1>
   <p class="muted">১০টি প্রশ্ন। একটি আরবি শব্দ দেখে সঠিক বাংলা অর্থ নির্বাচন করো। শেষ হলে তোমার ফলাফল দেখাবে।</p>
   <section class="card" style="max-width:700px;margin:20px auto;text-align:center;">
    <div class="arabic arabic-large" lang="ar">قُلْ</div>
    <h2>قُلْ শব্দটির অর্থ কী?</h2>
    <p>উত্তর দেওয়ার আগে অনুমান করো। ভুল হলেও দুর্বল কিউতে যুক্ত হয়ে পরে শেখার সুযোগ পাবে।</p>
    <div class="actions" style="justify-content:center">
      <button class="btn primary" data-start-quiz>১০ প্রশ্নের কুইজ শুরু করুন</button>
    </div>
   </section>`;

  if(quiz.finished) {
   const isGood = quiz.correct >= 8;
   return `
   <span class="eyebrow">QUIZ COMPLETE</span>
   <h1>তোমার কুইজের ফল</h1>
   <div class="card" style="max-width:660px;margin:20px auto;text-align:center">
    <div style="font:700 64px/1.4 system-ui,sans-serif;color:${isGood?'var(--green)':'#d97706'}">${bnNum(quiz.correct)} / ${bnNum(quiz.questions.length)}</div>
    <h2>${isGood?'🎉 অসাধারণ! অনুশীলন চালিয়ে যাও!':'👍 ভালো প্রচেষ্টা! আরেকবার চেষ্টা করো।'}</h2>
    <p class="muted">সেরা স্কোর: ${bnNum(state.bestScore)} / ১০ · স্ট্রিক: ${bnNum(getStreak().count || 1)} দিন</p>
    <div class="actions" style="justify-content:center">
      <button class="btn primary" data-start-quiz>আবার কুইজ দাও</button>
      ${linkButton('words','শব্দগুলো পড়ো')}
      ${linkButton('path','শেখার পাথে ফিরুন')}
    </div>
   </div>`;
  }

  const q=quiz.questions[quiz.index],a=quiz.answer,answered=a!==null;
  return `
  <span class="eyebrow">PRACTICE · QUESTION ${quiz.index+1} OF ${quiz.questions.length}</span>
  <h1>সঠিক অর্থ নির্বাচন করো</h1>
  <div class="row-space">
    <span class="pill gray">প্রশ্ন ${bnNum(quiz.index+1)} / ${bnNum(quiz.questions.length)}</span>
    <span class="pill">সঠিক ${bnNum(quiz.correct)}টি</span>
  </div>
  <div class="series-bar" style="margin:15px 0 20px"><span style="width:${100*quiz.index/quiz.questions.length}%"></span></div>
  <div class="quiz-prompt">
    <span style="font-size:36px;" aria-hidden="true">${q.word.icon || '📖'}</span>
    <div class="arabic" lang="ar" dir="rtl">${esc(showHarakat ? q.word.ar : stripHarakat(q.word.ar))}</div>
    <span class="tiny">এই শব্দের অর্থ কোনটি?</span>
  </div>
  <div class="quiz-choices">
    ${q.choices.map((ch,i)=>`<button class="choice ${answered&&ch===q.word.meaning?'right':''} ${answered&&a===i&&ch!==q.word.meaning?'wrong':''}" data-answer="${i}" ${answered?'disabled':''}>${esc(ch)}</button>`).join('')}
  </div>
  ${answered?`
    <div class="feedback">
      <strong>${q.choices[a]===q.word.meaning?'✓ সঠিক উত্তর!':'শেখার সুযোগ: সঠিক উত্তর দেখে নাও'}</strong>
      <p>${arabic(q.word.ar)} — ${esc(q.word.bn)} — ${esc(q.word.meaning)}</p>
    </div>
    <button class="btn primary" data-next-quiz>${quiz.index+1===quiz.questions.length?'ফলাফল দেখুন →':'পরের প্রশ্ন →'}</button>
  `:''}`;
 }

 function progress(){
   const byLen=[2,3,4,5,6,7,8].map(n=>({n,total:WORDS.filter(w=>w.length===n).length,done:WORDS.filter(w=>w.length===n&&state.learned.includes(w.id)).length}));
   const p = getPathProgress();
   let totalStars = 0;
   Object.values(p.stars).forEach(s => totalStars += s);

   return `<span class="eyebrow">YOUR LEARNING PROGRESS</span><h1>আমার অগ্রগতি</h1>
   <p class="muted">শেখা শব্দ, কুইজ এবং গেইমিফাইড পাথের অগ্রগতির হিসাব। সব তথ্য ১০০% অফলাইনে এই ব্রাউজারে সংরক্ষিত।</p>
   <div class="grid4">
     <div class="card stat"><b>${bnNum(state.learned.length)}</b><small>শেখা শব্দ</small></div>
     <div class="card stat"><b>${bnNum(getStreak().count || 1)}</b><small>স্ট্রিক (দিন)</small></div>
     <div class="card stat"><b>${bnNum(totalStars)}</b><small>স্টার পয়েন্ট (⭐)</small></div>
     <div class="card stat"><b>${bnNum(state.quizzes)}</b><small>সম্পন্ন কুইজ</small></div>
   </div>
   <section class="card" style="margin-top:20px"><h2>অক্ষরসংখ্যা অনুযায়ী অগ্রগতি</h2>
   <div class="level-lines">${byLen.map(x=>`<div><label>${bnNum(x.n)} অক্ষরের শব্দ <span>${bnNum(x.done)} / ${bnNum(x.total)}</span></label><div class="series-bar"><span style="width:${x.total?100*x.done/x.total:0}%"></span></div></div>`).join('')}</div></section>
   <section class="card" style="margin-top:20px"><h2>Progress Backup</h2>
   <p class="muted">নতুন ব্রাউজারে নেওয়ার জন্য Export করে রাখুন। Import করলে অগ্রগতি রিস্টোর হবে।</p>
   <div class="actions">
     <button class="btn" id="export-progress">⇩ Progress Download</button>
     <label class="button" for="import-progress">⇧ Progress Import</label>
     <input type="file" id="import-progress" accept="application/json,.json" style="position:absolute;width:1px;height:1px;opacity:0" aria-label="Progress JSON ফাইল নির্বাচন">
   </div></section>`;
 }

 function about(){return `<span class="eyebrow">TRANSPARENCY & RESOURCES</span><h1>পাঠশালার তথ্য ও উৎস</h1><div class="grid2"><section class="card"><h2>কী আছে</h2><ul class="simple-list"><li>${bnNum(ALPHABET.length)}টি মূল আরবি হরফ, যুক্তরূপ ও ট্রেসিং</li><li>${bnNum(WORDS.length)}টি নির্বাচিত শব্দরূপ ও কালার কোডেড ব্রেকডাউন</li><li>বাংলা উচ্চারণ, অর্থ ও কুরআন রেফারেন্স</li><li>ক্বারীর শব্দভিত্তিক ও আয়াতভিত্তিক অডিও প্লেয়ার</li><li>Word Builder ধাঁধা, হরকত প্র্যাকটিস ও ডুওলিঙ্গো স্টাইল পাথ</li><li>১০০% ক্লায়েন্ট-সাইড অফলাইন PWA সাপোর্ট</li></ul></section><section class="card"><h2>উৎস ও অডিও রেফারেন্স</h2><ul class="simple-list"><li>অডিও: Quran.com WBW CDN ও EveryAyah (মিশারি রাশিদ আল-আফাসি)</li><li>লিপি: Amiri ও Noto Naskh Arabic ফন্ট</li><li>তথ্যকোষ: Quranic Arabic Corpus ও Tanzil Project</li></ul></section></div><p class="notice" style="margin-top:18px;">উচ্চারণ ও নির্ভুল তিলাওয়াতের জন্য যোগ্য শিক্ষকের সহায়তা নিন।</p>`;}

 /* ==========================================================================
    Renderer & Route Router
    ========================================================================== */
 function render(){
   const rt=route(),sect=rt.startsWith('word-')?'words':rt.startsWith('letter-')?'alphabet':rt;
   document.querySelectorAll('#side-links a').forEach(a=>a.classList.toggle('active',a.dataset.route===sect));
   let out;
   if(rt==='home')out=home();
   else if(rt==='path')out=pathView();
   else if(rt==='alphabet')out=alphabet();
   else if(rt==='words')out=words();
   else if(rt.startsWith('word-'))out=word(rt.slice(5));
   else if(rt==='flashcards'){if(!flashcardItem)pickFlashcard();out=flashcardView();}
   else if(rt==='salah')out=prayerView();
   else if(rt==='last-ten')out=lastTenView();
   else if(rt==='quiz')out=quizView();
   else if(rt==='progress')out=progress();
   else if(rt==='about')out=about();
   else if(V4?.routes[rt])out=V4.renderRoute(rt);
   else if(rt.startsWith('letter-')){letterSelected=rt.slice(7);out=alphabet();}
   else out=home();

   $('view').innerHTML=out + renderTracingModal();
   summary();
   
   if (traceModalOpen) {
    initTracingCanvas();
   }

   document.title=({
    home:'কুরআনিক আরবি পাঠশালা',path:'শেখার পথ (Guided Path)',alphabet:'আরবি ২৮ হরফ ও ট্রেসিং',words:'কুরআনিক শব্দতালিকা',flashcards:'যাচাই করা (ফ্ল্যাশ-কার্ড)',salah:'পাঁচ ওয়াক্ত নামাজ শিক্ষা','last-ten':'কুরআনের শেষ ১০ সূরা',quiz:'কুইজ ও অনুশীলন',progress:'আমার অগ্রগতি',about:'তথ্য ও উৎস'
   }[sect]||V4?.routes[sect]||'শব্দ শেখা')+' | PhotoPixc Learning';
 }

 const toggle=(key,id)=>{
   const set=new Set(state[key]);
   set.has(id)?set.delete(id):set.add(id);
   state[key]=[...set];
   save();
   render();
   toast(key==='learned'?'শেখার অগ্রগতি সংরক্ষিত':'বুকমার্ক আপডেট করা হয়েছে');
 };

 function speak(w,rate=.75){
   if(!window.speechSynthesis){toast('এই Browser-এ অডিও সুবিধা নেই।');return}
   try{
     const available=speechSynthesis.getVoices().filter(v=>v.lang&&v.lang.toLowerCase().startsWith('ar'));
     if(!available.length){toast('ডিভাইসে Arabic voice ইনস্টল করা নেই।');return}
     speechSynthesis.cancel();
     const u=new SpeechSynthesisUtterance(w.ar);
     u.lang='ar-SA';
     u.voice=available.find(v=>v.lang==='ar-SA')||available[0];
     u.rate=rate;
     speechSynthesis.speak(u);
   }catch{toast('এই মুহূর্তে অডিও চালানো যায়নি।')}
 }

 /* ==========================================================================
    Hover & Touch Sync for Color-Coded Breakdown (Phase 1.1)
    ========================================================================== */
 document.addEventListener('mouseover', e => {
   const colItem = e.target.closest('.letter-col-item');
   if (colItem && colItem.dataset.letterIdx !== undefined) {
     const idx = colItem.dataset.letterIdx;
     document.querySelectorAll(`.word-char-span[data-letter-idx="${idx}"]`).forEach(el => {
       el.classList.add('is-highlighted', 'pulse-anim');
     });
     colItem.classList.add('is-highlighted');
     return;
   }
   const charSpan = e.target.closest('.word-char-span');
   if (charSpan && charSpan.dataset.letterIdx !== undefined) {
     const idx = charSpan.dataset.letterIdx;
     document.querySelectorAll(`.letter-col-item[data-letter-idx="${idx}"]`).forEach(el => {
       el.classList.add('is-highlighted');
     });
     charSpan.classList.add('is-highlighted', 'pulse-anim');
   }
 });

 document.addEventListener('mouseout', e => {
   const colItem = e.target.closest('.letter-col-item');
   if (colItem && colItem.dataset.letterIdx !== undefined) {
     const idx = colItem.dataset.letterIdx;
     document.querySelectorAll(`.word-char-span[data-letter-idx="${idx}"]`).forEach(el => {
       el.classList.remove('is-highlighted', 'pulse-anim');
     });
     colItem.classList.remove('is-highlighted');
     return;
   }
   const charSpan = e.target.closest('.word-char-span');
   if (charSpan && charSpan.dataset.letterIdx !== undefined) {
     const idx = charSpan.dataset.letterIdx;
     document.querySelectorAll(`.letter-col-item[data-letter-idx="${idx}"]`).forEach(el => {
       el.classList.remove('is-highlighted');
     });
     charSpan.classList.remove('is-highlighted', 'pulse-anim');
   }
 });

 /* Click & Touch Event Delegation */
 $('view').addEventListener('click',e=>{
   // Flashcard Flip
   const flipCard=e.target.closest('[data-flash-card-flip]');
   if(flipCard && !e.target.closest('button') && !e.target.closest('.no-flip')){
     flashcardFlipped=!flashcardFlipped;
     SoundFx.playClick();
     render();
     return;
   }

   // Flashcard Mode Switch
   const modeBtn=e.target.closest('[data-flash-mode]');
   if(modeBtn){
     const m = modeBtn.dataset.flashMode;
     if(m === 'weak'){
       flashcardWeakOnly = true;
       pickFlashcard('words');
     } else {
       flashcardWeakOnly = false;
       pickFlashcard(m);
     }
     SoundFx.playClick();
     render();
     return;
   }

   // Flashcard Action Buttons
   const flashAct=e.target.closest('[data-flash-action]');
   if(flashAct){
     const act=flashAct.dataset.flashAction;
     flashcardStats.reviewed++;
     if(act==='mastered'){
       flashcardStats.mastered++;
       SoundFx.playSuccess();
       spawnConfetti();
       updateStreak();
       if(flashcardItem?.kind==='word'){
         if(!state.learned.includes(flashcardItem.word.id)){
           state.learned.push(flashcardItem.word.id);
           save();
         }
         removeWeakItem(flashcardItem.word.id);
       }
       toast('মাশাআল্লাহ! আয়ত্ত হয়েছে চিহ্নিত করা হলো');
     } else if(act==='review'){
       SoundFx.playWrong();
       if(flashcardItem?.kind==='word'){
         addWeakItem(flashcardItem.word.id);
       }
       toast('দুর্বল তালিকায় যুক্ত করা হলো; পরবর্তীতে আবার দেখানো হবে');
     } else {
       SoundFx.playClick();
     }
     pickFlashcard();
     render();
     return;
   }

   // Tracing Modal Trigger
   const openTrace = e.target.closest('[data-open-trace]');
   if(openTrace){
     tracingLetter = openTrace.dataset.openTrace || 'ب';
     traceModalOpen = true;
     SoundFx.playClick();
     render();
     return;
   }
   if(e.target.closest('[data-close-trace]') || e.target.id === 'tracing-modal-overlay'){
     traceModalOpen = false;
     SoundFx.playClick();
     render();
     return;
   }

   // Morphing Animation Toggle
   const morphBtn = e.target.closest('[data-toggle-morph]');
   if(morphBtn){
     morphActive = !morphActive;
     SoundFx.playClick();
     render();
     return;
   }

   // Tashkeel On/Off Toggle
   const tashBtn = e.target.closest('[data-tashkeel]');
   if(tashBtn){
     showHarakat = tashBtn.dataset.tashkeel === 'on';
     SoundFx.playClick();
     render();
     toast(showHarakat ? 'হরকত দেখানো হচ্ছে' : 'হরকত ছাড়া পাঠ মোড চালু হয়েছে');
     return;
   }

   // Weak Items Review Jump
   if(e.target.closest('[data-start-weak-flash]')){
     flashcardWeakOnly = true;
     pickFlashcard('words');
     go('flashcards');
     return;
   }
   if(e.target.closest('[data-filter-weak]')){
     bookFilter = 'weak';
     page = 0;
     render();
     return;
   }

   // Guided Path Node Click
   const pathLvl = e.target.closest('[data-path-letter]');
   if(pathLvl){
     const id = pathLvl.dataset.pathLetter;
     const lvl = LETTER_LEVELS.find(x => x.id === id);
     if(lvl){
       tracingLetter = lvl.letters[0];
       traceModalOpen = true;
       savePathProgress(id, 3);
       render();
     }
     return;
   }
   const pathDeck = e.target.closest('[data-path-deck]');
   if(pathDeck){
     const id = pathDeck.dataset.pathDeck;
     const deck = WORD_DECKS.find(x => x.id === id);
     if(deck){
       const targetWord = WORDS[deck.start];
       if(targetWord){
         V4?.selectBuilderWord(targetWord.id);
         savePathProgress(id, 3);
         go('builder');
       }
     }
     return;
   }

   // Ayah Audio Recitation Button
   const ayahAudioBtn = e.target.closest('[data-ayah-audio]');
   if(ayahAudioBtn){
     const [sId, aIdx] = ayahAudioBtn.dataset.ayahAudio.split(':').map(Number);
     playAyahAudio(sId, aIdx, ayahAudioBtn);
     return;
   }

   const hit=e.target.closest('button');
   if(!hit)return;

   if(V4?.handleClick(hit))return;

   if(hit.hasAttribute('data-v5-jump')){sourceFilter='v5';search='';lengthFilter='all';bookFilter='all';page=0;go('words');return}
   if(hit.dataset.lastSurah){lastTenSelected=Number(hit.dataset.lastSurah);render();return}
   if(hit.dataset.lastShift){const ix=LAST_TEN.findIndex(x=>x.id===lastTenSelected);lastTenSelected=LAST_TEN[Math.max(0,Math.min(9,ix+Number(hit.dataset.lastShift)))].id;render();return}
   if(hit.dataset.lastLearned){
     const id=Number(hit.dataset.lastLearned);
     lastTenLearned=lastTenLearned.includes(id)?lastTenLearned.filter(x=>x!==id):[...lastTenLearned,id];
     localStorage.setItem(lastTenKey,JSON.stringify(lastTenLearned));
     if(lastTenLearned.includes(id)){
       SoundFx.playSuccess();
       spawnConfetti();
       updateStreak();
     }
     render();
     toast('সূরা মুখস্থের অগ্রগতি সংরক্ষিত হয়েছে');
     return;
   }
   if(hit.hasAttribute("data-prayer-bn-toggle")){salahHideBangla=!salahHideBangla;render();return}
   if(hit.dataset.salahTab){salahTab=hit.dataset.salahTab;render();return}
   if(hit.dataset.salahPrayer){salahPrayer=hit.dataset.salahPrayer;render();return}
   if(hit.dataset.salahSurah){salahSurah=Number(hit.dataset.salahSurah);render();return}
   if(hit.dataset.salahDua){salahDua=hit.dataset.salahDua;render();return}
   if(hit.dataset.salahJump){salahDua=hit.dataset.salahJump;salahTab='duas';render();return}
   if(hit.hasAttribute('data-print-prayer')){window.print();return}
   if(hit.dataset.open){go('word-'+hit.dataset.open);return}
   if(hit.dataset.openBuilderWord){
     V4?.selectBuilderWord(hit.dataset.openBuilderWord);
     go('builder');
     return;
   }
   if(hit.dataset.letter){
     letterSelected=hit.dataset.letter;
     render();
     $('letter-detail')?.scrollIntoView({block:'nearest'});
     return;
   }
   if(hit.dataset.showLetter){
     const ch=hit.dataset.showLetter;
     const detail=$('letter-inline');
     if(detail){
       detail.innerHTML=`<section class="card letter-stage"><h2>${esc(getName(ch))} — চারটি লিখনরূপ</h2>${letterDetail(ch)}</section>`;
       detail.scrollIntoView({behavior:'smooth',block:'nearest'});
     }
     return;
   }
   if(hit.dataset.length){lengthFilter=hit.dataset.length;bookFilter='all';page=0;go('words');return}
   if(hit.dataset.page){page=Math.max(0,Math.min(Math.ceil(filters().length/12)-1,page+(hit.dataset.page==='next'?1:-1)));render();return}
   if(hit.dataset.learn){
     const wid = hit.dataset.learn;
     toggle('learned', wid);
     if(state.learned.includes(wid)){
       SoundFx.playSuccess();
       spawnConfetti();
       updateStreak();
       removeWeakItem(wid);
     }
     return;
   }
   if(hit.dataset.bookmark){toggle('bookmarked',hit.dataset.bookmark);return}
   if(hit.dataset.speak){
     const w=WORDS.find(x=>x.id===hit.dataset.speak);
     if(w) playWordAudio(w, 0.85);
     return;
   }
   if(hit.dataset.speakNormal){
     const w=WORDS.find(x=>x.id===hit.dataset.speakNormal);
     if(w) playWordAudio(w, 1.0);
     return;
   }
   if(hit.hasAttribute('data-start-quiz')){SoundFx.playClick();quizStart();return}
   if(hit.dataset.answer!==undefined){
     if(!quiz||quiz.answer!==null)return;
     quiz.answer=+hit.dataset.answer;
     const isRight = quiz.questions[quiz.index].choices[quiz.answer]===quiz.questions[quiz.index].word.meaning;
     if(isRight){
       quiz.correct++;
       SoundFx.playSuccess();
       removeWeakItem(quiz.questions[quiz.index].word.id);
     } else {
       SoundFx.playWrong();
       addWeakItem(quiz.questions[quiz.index].word.id);
     }
     render();
     return;
   }
   if(hit.hasAttribute('data-next-quiz')){
     if(!quiz||quiz.answer===null)return;
     SoundFx.playClick();
     if(quiz.index>=quiz.questions.length-1){
       quiz.finished=true;
       state.quizzes++;
       state.bestScore=Math.max(state.bestScore,quiz.correct);
       if(quiz.correct>=7){
         SoundFx.playStar();
         spawnConfetti();
         updateStreak();
       }
       save();
     }else{
       quiz.index++;
       quiz.answer=null;
     }
     render();
     return;
   }
   if(hit.id==='export-progress'){
     const backup={app:'photopixc.quranic-arabic',version:2,savedAt:new Date().toISOString(),progress:state,extensions:{v4:V4?.exportState(),lastTen:lastTenLearned,path:getPathProgress(),streak:getStreak(),weak:getWeakItems()}};
     const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'});
     const url=URL.createObjectURL(blob);
     const a=document.createElement('a');
     a.href=url;
     a.download='quranic-arabic-progress-v7.json';
     document.body.appendChild(a);
     a.click();
     a.remove();
     setTimeout(()=>URL.revokeObjectURL(url),1000);
     return;
   }
 });

 $('view').addEventListener('input',e=>{if(e.target.id==='word-search'){if(e.isComposing)return;const focusPos=e.target.selectionStart;search=e.target.value;page=0;render();const input=$('word-search');if(input){input.focus();input.setSelectionRange(focusPos,focusPos)}}});
 $('view').addEventListener('compositionend',e=>{if(e.target.id==='word-search'){search=e.target.value;page=0;render();$('word-search')?.focus()}});
 $('view').addEventListener('change',async e=>{
   if(e.target.id==='word-length'){lengthFilter=e.target.value;page=0;render()}
   if(e.target.id==='word-book'){bookFilter=e.target.value;page=0;render()}
   if(e.target.id==='word-source'){sourceFilter=e.target.value;page=0;render()}
   if(e.target.id==='import-progress'){
     const file=e.target.files?.[0];if(!file)return;
     try{
       if(file.size>350000)throw Error('ফাইলটি খুব বড়।');
       const d=JSON.parse(await file.text());
       if(d.app!=='photopixc.quranic-arabic'||!d.progress||!Array.isArray(d.progress.learned))throw Error('এটি এই পাঠশালার Progress ফাইল নয়।');
       if(!confirm('Import করলে বর্তমান অগ্রগতি বদলে যাবে। চালিয়ে যাবেন?'))return;
       const valid=new Set(WORDS.map(w=>w.id));
       state={
         learned:[...new Set(d.progress.learned)].filter(id=>valid.has(id)),
         bookmarked:[...new Set(d.progress.bookmarked||[])].filter(id=>valid.has(id)),
         quizzes:Math.max(0,Math.floor(Number(d.progress.quizzes)||0)),
         bestScore:Math.max(0,Math.min(10,Math.floor(Number(d.progress.bestScore)||0)))
       };
       if(d.extensions?.v4&&V4)V4.importState(d.extensions.v4);
       if(Array.isArray(d.extensions?.lastTen)){
         lastTenLearned=[...new Set(d.extensions.lastTen)].filter(n=>Number.isInteger(n)&&n>=105&&n<=114);
         localStorage.setItem(lastTenKey,JSON.stringify(lastTenLearned));
       }
       if(d.extensions?.path) localStorage.setItem(PATH_KEY, JSON.stringify(d.extensions.path));
       if(d.extensions?.streak) localStorage.setItem(STREAK_KEY, JSON.stringify(d.extensions.streak));
       if(d.extensions?.weak) localStorage.setItem(WEAK_KEY, JSON.stringify(d.extensions.weak));
       save();
       render();
       toast('Progress Import সফল হয়েছে!');
     }catch(err){toast(err.message||'ভুল Progress ফাইল।');}
   }
 });

 window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0,behavior:'instant'})});
 window.addEventListener('keydown',e=>{
   if(route()==='flashcards' && (e.code==='Space'||e.code==='Enter') && !e.target.closest('input,textarea,button')){
     e.preventDefault();
     flashcardFlipped=!flashcardFlipped;
     SoundFx.playClick();
     render();
   }
 });

 $('nav-toggle')?.addEventListener('click',()=>{
   const nav=$('top-nav');
   const expanded=nav.classList.toggle('open');
   $('nav-toggle').setAttribute('aria-expanded',String(expanded));
 });

 $('btn-sound-toggle')?.addEventListener('click',()=>{
   SoundFx.toggleMute();
 });

 if(!location.hash)history.replaceState(null,'','#qa-home');
 updateStreak();
 render();
})();
