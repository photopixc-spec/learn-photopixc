/* PhotoPixc Skill Lab 45 V7.4 — Resource-rich, offline companion. */
(function(){
  'use strict';
  var DATA=window.V74_LESSON_DATA||[];
  if(DATA.length!==45 || typeof state==='undefined')return;
  var $x=function(id){return document.getElementById(id);};
  var bn74=function(n){return String(n).replace(/[0-9]/g,function(d){return '০১২৩৪৫৬৭৮৯'[+d];});};
  var safe=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
  var allFiles=[
    {path:'samples/01-demo-unit-economics.csv',name:'Unit Economics',desc:'১২টি কল্পিত অর্ডার, ROAS ও contribution'},
    {path:'samples/02-demo-tracking-qa.csv',name:'GTM / GA4 Tracking QA',desc:'১০টি Event/Parameter Pass-Fail Test'},
    {path:'samples/03-demo-search-term-audit.csv',name:'Search Term Audit',desc:'২০টি Query ও কাল্পনিক Click/Cost Data'},
    {path:'samples/04-demo-cro-user-test.csv',name:'CRO User Testing',desc:'৫টি কাল্পনিক Mobile Usability Observation'},
    {path:'samples/05-demo-attribution-journey.csv',name:'Attribution Journey',desc:'৪টি Order ও Cross-channel Credit'},
  ];
  var cheatFiles=['01-profit-roas.txt','02-gtm-ga4-qa.txt','03-search-audit.txt','04-cro-mobile.txt','05-attribution-channels.txt','06-offer-portfolio.txt'];
  function recommended(day){
    if(day<=3 || day>=38) return [0];
    if(day<=14) return [1];
    if(day<=25) return day>=15?[2,1]:[1];
    if(day<=30)return [3];
    if(day<=37)return [4];
    return [0];
  }
  function record(day){
    if(!state.v74Workbook || typeof state.v74Workbook!=='object' || Array.isArray(state.v74Workbook))state.v74Workbook={};
    if(!state.v74Workbook[day] || typeof state.v74Workbook[day]!=='object')state.v74Workbook[day]={};
    return state.v74Workbook[day];
  }
  function countDone(){return DATA.filter(function(d){return !!record(d.day).done;}).length;}
  var selected=1;
  function fileHtml(f){return '<a class="v74-file" href="'+f.path+'" download><span>↓ '+safe(f.name)+'.csv</span><small>'+safe(f.desc)+'</small></a>';}
  function render(){
    selected=Math.max(1,Math.min(45,selected));
    var data=DATA[selected-1],d=DAYS[selected-1],chapter=ACADEMY_DATA[selected],r=record(selected),completed=countDone();
    $x('v74DayPick').value=String(selected);
    $x('v74PrevDay').disabled=selected===1;$x('v74NextDay').disabled=selected===45;
    $x('v74Stats').innerHTML='<strong>ওয়ার্কবুক প্র্যাকটিস: '+bn74(completed)+' / ৪৫ দিন</strong><div class="v74-meter" role="progressbar" aria-label="ওয়ার্কবুক অগ্রগতি" aria-valuemin="0" aria-valuemax="45" aria-valuenow="'+completed+'"><span style="width:'+(100*completed/45).toFixed(1)+'%"></span></div><span>দিন '+bn74(selected)+' · '+safe(phaseOf(selected).name)+'</span>';
    var chapters=chapter.F.map(function(p){return '<p>'+safe(p)+'</p>';}).join('');
    var tips=data.cheats.map(function(t){return '<li>'+safe(t)+'</li>';}).join('');
    var currentFiles=recommended(selected).map(function(i){return fileHtml(allFiles[i]);}).join('');
    var refLinks=(chapter.R||[]).map(function(key){var source=ACADEMY_RES[key];if(!source)return '';return '<a href="'+safe(source[2])+'" target="_blank" rel="noopener noreferrer">'+safe(source[0])+' ↗</a>';}).join('');
    $x('v74LessonContent').innerHTML=
      '<article class="v74-work-section"><div class="v74-eyebrow">WORKBOOK / DAY '+bn74(selected)+'</div><h2 class="v74-lesson-title">'+safe(d.t)+'</h2><p class="v74-note">আজকের লক্ষ্য: '+safe(chapter.O)+'</p></article>'+
      '<section class="v74-work-section"><h2>① বিষয়টি বুঝে নাও</h2>'+chapters+'<h3>আজকের Worked Example</h3><div class="v74-example">'+safe(data.worked)+'</div><p class="v74-note"><b>আগের Lesson-এ আরও উদাহরণ রয়েছে।</b> চাইলে নিচের বাটনে মূল গাইড খুলতে পারবে।</p></section>'+
      '<section class="v74-work-section"><h2>② নিজে করো — আজকের Hands-on Task</h2><div class="v74-exercise">'+safe(data.task)+'</div><h3>কী তৈরি করবে?</h3><p><strong>'+safe(data.deliver)+'</strong></p><div class="v74-warning"><b>সতর্কতা:</b> '+safe(data.warning)+'</div></section>'+
      '<section class="v74-work-section"><h2>③ দ্রুত মনে রাখার Cheatsheet</h2><ul class="v74-cheat">'+tips+'</ul><div class="v74-actions"><button class="btn" type="button" id="v74Print">এই পাঠ Print / Save as PDF</button><button class="btn" type="button" id="v74GoGuide">পুরো Guided Lesson খুলুন →</button></div></section>'+
      '<section class="v74-work-section"><h2>④ Practice-এর জন্য Sample CSV</h2><p class="v74-note">সম্পূর্ণ কাল্পনিক তথ্য। Excel বা Google Sheets-এ CSV Import করো, তারপর উপরের Task শেষ করো।</p><div class="v74-files">'+currentFiles+'</div>'+(refLinks?'<p class="v74-source"><b>আরও জানতে:</b> '+refLinks+'</p>':'')+'</section>'+
      '<section class="v74-work-section v74-form"><h2>⑤ নিজের কাজের প্রমাণ ও Revision Note</h2><label for="v74Evidence">কী হিসাব করলে, কী ফল পেলে, কোথায় ভুল হয়েছিল?</label><textarea id="v74Evidence" maxlength="6000" placeholder="যেমন: Demo CSV থেকে তিনটি অর্ডারের contribution হিসাব করেছি; দ্বিতীয় অর্ডারে রিটার্ন খরচ বাদ দিতে ভুলে গিয়েছিলাম।">'+safe(r.note||'')+'</textarea><p id="v74NoteStatus" class="v74-input-status" aria-live="polite">নোট Browser-এ স্বয়ংক্রিয়ভাবে Save হবে।</p><label class="v74-checkline"><input id="v74MarkDone" type="checkbox" '+(r.done?'checked':'')+'> আমি নিজে অনুশীলন করে ফল যাচাই করেছি</label><div class="v74-actions"><button type="button" class="btn primary" id="v74SaveNext">নোট Save করে পরের দিন →</button><button type="button" class="btn" id="v74PrintAll">বর্তমান পাঠ প্রিন্ট</button></div><p class="v74-note">এখানে টিক দেওয়া Self-reported। এটি মূল ৪৫ দিনের Tracker-এর Done Flag নিজে থেকে বদলায় না।</p></section>';
    $x('v74Evidence').addEventListener('input',function(){record(selected).note=this.value.slice(0,6000); save();$x('v74NoteStatus').textContent='✓ সেভ হয়েছে · '+bn74(this.value.length)+' অক্ষর';});
    $x('v74MarkDone').addEventListener('change',function(){var rec=record(selected);rec.done=this.checked;rec.completedAt=this.checked?new Date().toISOString():null;save();render();});
    $x('v74SaveNext').addEventListener('click',function(){record(selected).note=$x('v74Evidence').value.slice(0,6000);save();selected=Math.min(45,selected+1);render();$x('view-workbook').scrollIntoView({block:'start',behavior:'smooth'});});
    $x('v74Print').addEventListener('click',function(){window.print();});$x('v74PrintAll').addEventListener('click',function(){window.print();});
    $x('v74GoGuide').addEventListener('click',function(){v72GuideDay=selected;showView('guide');renderV72Guide();});
  }
  $x('v74DayPick').innerHTML=DAYS.map(function(d){return '<option value="'+d.d+'">দিন '+bn74(d.d)+' — '+safe(d.t)+'</option>';}).join('');
  $x('v74AllDownloads').className='v74-files';$x('v74AllDownloads').innerHTML=allFiles.map(fileHtml).join('');
  $x('v74DayPick').addEventListener('change',function(){selected=Number(this.value);render();});
  $x('v74PrevDay').addEventListener('click',function(){selected--;render();});
  $x('v74NextDay').addEventListener('click',function(){selected++;render();});
  $x('v74StartWorkbook').addEventListener('click',function(){showView('workbook');render();});
  document.querySelector('[data-view="workbook"]').addEventListener('click',render);
  $x('v74Search').addEventListener('input',function(){
    var q=this.value.trim().toLocaleLowerCase();if(!q){$x('v74SearchResults').innerHTML='';return;}
    var found=DATA.filter(function(d){return [DAYS[d.day-1].t,d.worked,d.task,d.deliver,phaseOf(d.day).name].join(' ').toLocaleLowerCase().includes(q);}).slice(0,12);
    $x('v74SearchResults').innerHTML=found.length?found.map(function(d){return '<button class="v74-mini-btn" type="button" data-v74-day="'+d.day+'">দিন '+bn74(d.day)+' · '+safe(DAYS[d.day-1].t)+'</button>';}).join(''):'এই শব্দে কোনো পাঠ পাওয়া যায়নি।';
    $x('v74SearchResults').querySelectorAll('[data-v74-day]').forEach(function(btn){btn.addEventListener('click',function(){selected=Number(this.dataset.v74Day);render();$x('view-workbook').scrollIntoView({behavior:'smooth'});});});
  });
  render();
  window.PhotoPixcSkillLabV74={version:'7.4',lessons:DATA.length,samples:allFiles.length,render:render};
})();
