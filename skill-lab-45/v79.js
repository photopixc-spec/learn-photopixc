/* PhotoPixc Skill Lab 45 · V7.9 navigation + beginner experience.
   Additive-only DOM enhancement. Never modifies course progress or browser storage. */
(function () {
  'use strict';
  var nav=document.querySelector('.tabbar-in');
  var home=document.querySelector('#view-home');
  if(!nav||!home||typeof window.showView!=='function')return;
  var tabs=Array.from(nav.querySelectorAll('button.tab[data-view]'));
  var mainViews=['home','days','guide','practice'];
  var toolGroups=[
    {name:'পড়াশোনার উপকরণ',items:['workbook','library','calc','check','quiz']},
    {name:'হাতে-কলমে কাজ',items:['debug','case-studies','simulator','optimization']},
    {name:'দক্ষতা ও পোর্টফোলিও',items:['skills','projects','portfolio','capstone']}
  ];
  var labels={home:'হোম',days:'৪৫ দিন',guide:'গাইড',practice:'প্র্যাকটিস',debug:'ডিবাগ ল্যাব',workbook:'ওয়ার্কবুক',library:'লাইব্রেরি',calc:'ক্যালকুলেটর',check:'চেকলিস্ট',quiz:'কুইজ','case-studies':'কেস স্টাডি',simulator:'বাজেট সিমুলেটর',optimization:'অপ্টিমাইজেশন ল্যাব',skills:'দক্ষতা পরীক্ষা',projects:'ক্লায়েন্ট ল্যাব',portfolio:'পোর্টফোলিও',capstone:'ফাইনাল প্রজেক্ট'};
  var btnByView={};tabs.forEach(function(t){btnByView[t.dataset.view]=t;});
  if(!mainViews.every(function(n){return !!btnByView[n];}))return;

  var menu=document.createElement('div');menu.className='v79-tools';menu.id='v79-tools';menu.hidden=true;
  menu.setAttribute('role','region');menu.setAttribute('aria-label','Skill Lab-এর সব টুল');
  var header=document.createElement('div');header.className='v79-tools-head';
  var heading=document.createElement('h2');heading.textContent='সব টুল ও বিভাগ';
  var close=document.createElement('button');close.type='button';close.className='v79-close';close.textContent='বন্ধ করুন ✕';
  header.append(heading,close);menu.appendChild(header);
  var search=document.createElement('input');search.type='search';search.className='v79-tools-search';search.placeholder='টুলের নাম খুঁজুন — যেমন Quiz, ROAS, Workbook';search.setAttribute('aria-label','টুল খুঁজুন');menu.appendChild(search);
  toolGroups.forEach(function(gr){
    var group=document.createElement('section');group.className='v79-tool-group';
    var title=document.createElement('h3');title.textContent=gr.name;group.appendChild(title);
    var grid=document.createElement('div');grid.className='v79-tool-grid';
    gr.items.forEach(function(name){var t=btnByView[name];if(!t)return;t.dataset.v79Label=labels[name]||name;grid.appendChild(t);});
    group.appendChild(grid);menu.appendChild(group);
  });
  // Moved nodes retain all previously registered click handlers and progress logic.
  document.body.appendChild(menu);
  var more=document.createElement('button');more.type='button';more.className='v79-more';
  more.setAttribute('aria-controls','v79-tools');more.setAttribute('aria-expanded','false');
  more.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg><span>সব টুল</span>';
  nav.appendChild(more);
  var empty=document.createElement('p');empty.className='v79-tools-empty';empty.hidden=true;empty.textContent='এই নামে কোনো টুল নেই। অন্য শব্দ লিখে দেখুন।';menu.appendChild(empty);
  function openMenu(){menu.hidden=false;more.setAttribute('aria-expanded','true');search.focus();}
  function closeMenu(restore){menu.hidden=true;more.setAttribute('aria-expanded','false');search.value='';filterMenu();if(restore)more.focus();}
  function filterMenu(){
    var q=search.value.trim().toLocaleLowerCase();var shown=0;
    menu.querySelectorAll('.v79-tool-group').forEach(function(gr){
      var hits=0;gr.querySelectorAll('button.tab').forEach(function(t){var name=(t.dataset.v79Label+' '+t.getAttribute('aria-label')+' '+t.dataset.view).toLocaleLowerCase();var yes=!q||name.includes(q);t.hidden=!yes;if(yes){shown++;hits++;}});
      gr.hidden=!hits;
    });empty.hidden=!!shown;
  }
  more.addEventListener('click',function(){if(menu.hidden)openMenu();else closeMenu(true);});
  close.addEventListener('click',function(){closeMenu(true);});
  search.addEventListener('input',filterMenu);
  menu.querySelectorAll('button.tab').forEach(function(t){t.addEventListener('click',function(){closeMenu(false);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden){closeMenu(true);}});
  document.addEventListener('pointerdown',function(e){if(!menu.hidden&&!menu.contains(e.target)&&!more.contains(e.target))closeMenu(false);});
  window.addEventListener('skill-lab:viewchange',function(e){
    var n=e.detail&&e.detail.name||'home';var isMore=mainViews.indexOf(n)<0;
    more.dataset.current=String(isMore);
    tabs.forEach(function(t){if(t.dataset.view===n)t.setAttribute('aria-current','page');else t.removeAttribute('aria-current');});
    if(!menu.hidden)closeMenu(false);
  });
  more.dataset.current='false';
  if(btnByView.home)btnByView.home.setAttribute('aria-current','page');

  // Place a short beginner path above the feature catalog without duplicating lessons.
  var start=document.createElement('section');start.className='v79-start';start.setAttribute('aria-label','শুরু করার সহজ পথ');
  start.innerHTML='<h2>🧭 নতুন হলে এখান থেকে শুরু করো</h2><p>প্রতিদিন একটি Lesson করাই যথেষ্ট। প্রথমে পড়ো, তারপর নিজের হাতে কাজ করো, শেষে উত্তর যাচাই করো।</p>'+
    '<div class="v79-start-grid">'+
    '<button class="v79-start-card" type="button" data-v79to="guide"><b>① আজকের পাঠ শিখি →</b><small>৪৫ দিনের গাইড, বিষয় ও উদাহরণ</small></button>'+
    '<button class="v79-start-card" type="button" data-v79to="practice"><b>② ছোট অনুশীলন করি →</b><small>১২টি প্রশ্নে নিজের বোঝা যাচাই</small></button>'+
    '<button class="v79-start-card" type="button" data-v79to="skills"><b>③ কী শিখেছি যাচাই করি →</b><small>ভুলগুলো নিয়ে আবার Revision</small></button>'+
    '</div>';
  var hero=home.querySelector('.hero-panel');if(hero)hero.insertAdjacentElement('afterend',start);else home.prepend(start);
  start.querySelectorAll('[data-v79to]').forEach(function(b){b.addEventListener('click',function(){window.showView(this.dataset.v79to);});});

  // Group existing advanced feature promo cards. Moving DOM keeps their event listeners intact.
  var promos=['.v73-home-grid','.v77-home','.v76-home','.v75-home-feature','.v74-home-feature','.v78-home'];
  var advanced=document.createElement('details');advanced.className='v79-advanced';
  var summary=document.createElement('summary');summary.textContent='⚙️ সব Advanced Learning Lab ও Project দেখুন';advanced.appendChild(summary);
  var intro=document.createElement('p');intro.textContent='যখন প্রস্তুত হবে, তখন এখান থেকে Simulator, Case Study, Report, Assessment ও Final Project খুলবে।';advanced.appendChild(intro);
  promos.forEach(function(selector){var element=home.querySelector(selector);if(element)advanced.appendChild(element);});
  var last=home.querySelector('.v72-feature-grid')||start;last.insertAdjacentElement('afterend',advanced);

  // The old home page also has external learning-school links; leave them in place.
  // Escape does not clear learner answers, and hiding the menu never changes progress.
})();
