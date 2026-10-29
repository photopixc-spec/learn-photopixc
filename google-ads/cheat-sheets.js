'use strict';
// Summaries supplement lessons; they never mutate the curriculum or progress.
const cheatSheets=[
{points:[
'আগে business outcome ঠিক করুন: purchase, booking বা qualified enquiry। Click একা ব্যবসার সাফল্য নয়।',
'Search intent অনুমান করুন; পরে actual query ও customer outcome দিয়ে তা যাচাই করুন।',
'Search → Ad → Landing page → Enquiry → Sale: প্রতিটি ধাপ আলাদাভাবে মাপুন।',
'Ad Rank একাধিক auction factor-এর ফল। Quality Score diagnostic, profit guarantee নয়।',
'Search-এ budget/goal অনুযায়ী campaign এবং সম্পর্কিত intent অনুযায়ী ad group সাজান।',
'Billing ছাড়াই mock brief, keyword map ও audit বানানো যায়; synthetic data স্পষ্টভাবে চিহ্নিত করুন।'],
definitions:['Lead = সম্ভাব্য customer-এর enquiry; Customer = বাস্তবে কেনা ব্যক্তি।','সরল click-based lead rate = Leads ÷ Clicks × ১০০।','Primary conversion = নির্বাচিত goal অনুযায়ী bidding-এ ব্যবহৃত action।'],
mistakes:['Call click-কে completed call বা sale বলা।','Quality Score × bid-কে exact Ad Rank formula ধরা।','Demo result-কে বাস্তব অর্জন বা course score-কে Google certification বলা।'],remember:'প্রথম প্রশ্ন: ব্যবসার কোন বাস্তব উপকারটি মাপছি?'},
{points:[
'Service থেকে seed keyword; location ও intent modifier যোগ করে source-সহ তালিকা তৈরি করুন।',
'Broad সম্পর্কিত query, Phrase meaning-সহ query এবং Exact একই meaning/intent পর্যন্ত যেতে পারে।',
'Negative match-এর নিয়ম positive match থেকে আলাদা; useful query যেন ভুল করে বাদ না যায়।',
'Service area, location options, language ও follow-up ব্যবস্থা দেখে schedule ঠিক করুন।',
'RSA-তে আলাদাভাবেও অর্থপূর্ণ headline, truthful benefit এবং relevant assets দিন।',
'Ad-এর promise landing page-এ রাখুন; mobile form, validation ও success state পরীক্ষা করুন।'],
definitions:['RSA: সর্বোচ্চ ১৫ headline ও ৪ description; সাধারণ field limit ৩০ ও ৯০ character।','Negative broad: সব terms, যেকোনো order; phrase: একই order; exact: extra word ছাড়া।','Message match = Ad-এর প্রতিশ্রুতি ও landing page-এর সামঞ্জস্য।'],
mistakes:['Exact মানে কেবল হুবহু বানান ধরে নেওয়া।','একটি relevant query-তে অল্প clicks দেখে তৎক্ষণাৎ negative দেওয়া।','শুধু CTA click-কে সফল form submission গোনা।'],remember:'Keyword → Ad → Page → সফল action: চারটি একই প্রয়োজন মেটাবে।'},
{points:[
'প্রতিটি outcome-এর event, trigger, parameters, value ও verification plan লিখুন।',
'GA4-এ event ও key event আলাদা করুন; Ads bidding goal-ও আলাদা করে যাচাই করুন।',
'GTM-এ Variable তথ্য ধরে, Trigger শর্ত দেখে এবং Tag কাজ করে।',
'Conversion action-এর count, value, window ও campaign goal review করুন।',
'Tag Assistant, DebugView ও test order দিয়ে success, error ও duplicate scenario পরীক্ষা করুন।',
'Enhanced/Offline conversions-এর জন্য বৈধ first-party data, consent ও CRM quality প্রয়োজন।'],
definitions:['Deduplication = একই outcome বারবার গোনা ঠেকানো।','UTM = manual campaign labels; auto-tagging = Ads click identifier যোগ করা।','Hashing = একমুখী রূপান্তর; data ব্যবহারের অনুমতির বিকল্প নয়।'],
mistakes:['একই purchase দুই source দিয়ে Primary হিসেবে গোনা।','Tag fire দেখেই business success নিশ্চিত ধরা।','Hash করলে consent বা privacy requirement শেষ মনে করা।'],remember:'Expected → Observed → Evidence: তিনটি না মিললে tracking “verified” নয়।'},
{points:[
'Metric তুলনায় একই date range, conversion definition ও denominator ব্যবহার করুন।',
'Revenue-এর সঙ্গে margin ও lead quality দেখুন; সস্তা lead মানেই ভালো lead নয়।',
'Budget একটি সীমাবদ্ধ পরিকল্পনা; forecast assumptions অনুযায়ী বদলায়।',
'Bidding strategy বাছুন click, conversion count অথবা value goal অনুযায়ী।',
'Audit-এ symptom, evidence, hypothesis ও priority আলাদা লিখুন।',
'Experiment-এ একটিমাত্র স্পষ্ট প্রশ্ন, baseline, guardrail ও যথেষ্ট সময় রাখুন।'],
definitions:['CTR = Clicks ÷ Impressions × ১০০; CPC = Cost ÷ Clicks।','CPA = Cost ÷ Conversions; ROAS = Conversion value ÷ Cost।','সরল CVR = Conversions ÷ Clicks × ১০০; denominator শূন্য হলে rate অনির্ণেয়।'],
mistakes:['ROAS-কে profit বলা।','Target CPA/ROAS-কে guaranteed ফল ধরা।','Conversion delay না দেখে দৈনিক ওঠানামায় সিদ্ধান্ত নেওয়া।'],remember:'সঠিক হিসাবের আগে সঠিক measurement ও business context চাই।'},
{points:[
'Channel বাছুন goal, audience, creative, measurement ও eligibility দেখে।',
'Display-তে placements ও audience relevance review করুন।',
'Video-তে শুরুতেই প্রয়োজন ধরুন, সুবিধা দেখান এবং পরিষ্কার CTA দিন।',
'Demand Gen-এ creative angle ও audience hypothesis পরীক্ষা করুন।',
'Shopping feed-এ price, stock, ID ও destination মিলিয়ে diagnostics দেখুন।',
'PMax signal কঠোর targeting নয়; App campaign-এ install-এর পরে engagement ও retention দেখুন।'],
definitions:['Feed = structured product data; Item ID = স্থিতিশীল product identity।','View-এর সংজ্ঞা format অনুযায়ী বদলায়; সব view তুলনাযোগ্য নয়।','Retention = প্রথম ব্যবহার শেষে পরেও ব্যবহার চালিয়ে যাওয়া।'],
mistakes:['সব channel-এ একই success metric বসানো।','না-জানা GTIN নিজের মতো বানানো।','Install বা view-কে নিশ্চিত sale মনে করা।'],remember:'সব channel ব্যবহার করা লক্ষ্য নয়; সঠিক channel-এর যুক্তি দিতে পারাই দক্ষতা।'},
{points:[
'Report-এ observation, interpretation এবং next action আলাদা রাখুন।',
'Editor, rules বা Scripts-এর আগে preview, change log ও rollback plan রাখুন।',
'Scale করার আগে conversion quality, capacity ও marginal return review করুন।',
'Local lead project-এ service area, intent, qualification ও tracking plan দেখান।',
'Ecommerce project-এ feed, purchase value, margin ও duplicate control দেখান।',
'Portfolio-তে কী designed, simulated বা verified তা লিখুন; expertise-এর সীমা পরিষ্কার রাখুন।'],
definitions:['Marginal CPA = অতিরিক্ত Cost ÷ অতিরিক্ত Conversions।','AOV = Revenue ÷ Orders; order count শূন্য হলে অনির্ণেয়।','Case study = সমস্যা + কাজ + evidence + reasoning + সীমা।'],
mistakes:['Preview ছাড়া bulk change publish করা।','Average CPA দিয়েই বাড়তি budget-এর ফল নিশ্চিত বলা।','Mock campaign-কে real client success দাবি করা।'],remember:'সৎ evidence-সহ ছোট কাজ, প্রমাণহীন বড় দাবির চেয়ে মূল্যবান।'},
{points:[
'Objective বলে কী ফল চাই; campaign type বলে কোন advertising পদ্ধতি ব্যবহার করব।',
'Sales-এ successful purchase, reliable value ও margin একসঙ্গে দেখুন।',
'Leads-এ raw enquiry থেকে qualified lead ও won sale আলাদা করুন।',
'Website traffic goal-এ visit quality দেখুন; visit-কে purchase বলবেন না।',
'App-এ install, engagement ও pre-registration ভিন্ন outcome।',
'Store goals-এর আগে Business Profile, location ও measurement eligibility যাচাই করুন।'],
definitions:['Objective → Campaign type → Conversion goal: তিনটি আলাদা সিদ্ধান্ত।','CPL = Cost ÷ Leads; CPQL = Cost ÷ Qualified leads।','Without guidance = recommendation ছাড়া setup; বিনা খরচের Ads নয়।'],
mistakes:['সব business-এর goal একই ধরে নেওয়া।','Store address থাকলেই Store visits measurement পাওয়া যায় ভাবা।','সব lead-কে সমান business value দেওয়া।'],remember:'Goal বদলালে success-এর সংজ্ঞা ও measurement-ও বদলাতে পারে।'},
{points:[
'Setup-এর আগে outcome, eligibility, assets, destination ও tracking readiness লিখুন।',
'Search-এ intent-ভিত্তিক keyword, ad group ও relevant destination তৈরি করুন।',
'Display ও YouTube-তে format, audience, creative এবং brand suitability review করুন।',
'Demand Gen-এর channel ও available controls current interface-এ মিলিয়ে নিন।',
'Standard Shopping-এ approved feed ও product grouping যাচাই করুন।',
'PMax-এ goal, asset group, signals এবং URL/product controls আলাদা পরীক্ষা করুন।'],
definitions:['Launch gate = চালুর আগে বাধ্যতামূলক readiness check।','Asset group = একই theme-এর creative সংগ্রহ।','Rehearsal = settings plan ও test case; live launch নয়।'],
mistakes:['পুরোনো tutorial-এর menu-কে সব account-এর নিয়ম ধরা।','Creative প্রস্তুত হলেই measurement বাদ দিয়ে launch করা।','Objective বাছলেই সব feature পাওয়া নিশ্চিত মনে করা।'],remember:'Campaign plan তখনই সম্পূর্ণ, যখন launch-এর আগে কী পরীক্ষা করবেন তা লেখা আছে।'},
{points:[
'Bidding objective ও campaign compatibility মিলিয়ে strategy নির্বাচন করুন।',
'Targeting ও Observation-এর প্রভাব আলাদা করে বুঝুন।',
'Remarketing ও Customer Match-এ data permission এবং eligibility যাচাই করুন।',
'DSA/AI Max automation, assets ও URL expansion কী করছে তা review করুন।',
'Merchant Center diagnostics-এ data error এবং policy issue আলাদা করে ঠিক করুন।',
'Hotel, Travel ও local inventory-এর specialised setup সাধারণ retail-এর মতো ধরে নেবেন না।'],
definitions:['Observation = supported setup-এ audience performance দেখা; নিজে audience reach সীমিত করে না।','Targeting = নির্বাচিত criteria অনুযায়ী eligibility সীমিত করা, setup অনুযায়ী।','Signal = শেখার input; সব campaign-এ targeting constraint নয়।'],
mistakes:['PMax signal-কে strict audience boundary বলা।','Customer list কিনে permission ছাড়া ব্যবহার করা।','সব automation default না দেখে মেনে নেওয়া।'],remember:'Automation যত বেশি, input ও control বোঝার প্রয়োজন তত বেশি।'},
{points:[
'GA4 account, property ও data stream-এর উদ্দেশ্য আলাদা করুন।',
'Google tag direct অথবা GTM দিয়ে বসান; অনিচ্ছাকৃত double installation এড়ান।',
'Enhanced measurement চালু থাকলেও event-এর বাস্তব trigger যাচাই করুন।',
'Custom event-এ স্থির নাম, প্রয়োজনীয় parameters ও data dictionary রাখুন।',
'Custom dimension/metric-এর scope প্রশ্নের সঙ্গে মিলিয়ে register করুন।',
'Business-important event-কে key event করুন; counting ও Ads goal mapping আলাদা review করুন।'],
definitions:['Property = measurement/reporting-এর পরিবেশ; Stream = web/app data source।','Event = interaction record; Parameter = তার অতিরিক্ত detail।','Scope = field কোন স্তরের তথ্য বোঝায়, যেমন user বা event।'],
mistakes:['একই page-এ দুইবার tag চালানো।','Event name বদলে পুরোনো ও নতুন data গুলিয়ে ফেলা।','GA4 key event হলেই সব Ads campaign optimize করবে ধরে নেওয়া।'],remember:'Event design আগে; tag implementation ও reporting তার পরে।'},
{points:[
'GA4–Ads link, permissions ও auto-tagging বাস্তবে পরীক্ষা করুন।',
'User acquisition ও Traffic acquisition একই প্রশ্নের উত্তর দেয় না।',
'Landing page report-এ entry page, engagement ও key events পাশাপাশি দেখুন।',
'Ecommerce-এ view, cart, checkout, purchase ও refund ধারাবাহিকভাবে map করুন।',
'Revenue-এর সঙ্গে retention ও cohort দেখে দীর্ঘমেয়াদি ব্যবহার বুঝুন।',
'Audience definition, membership সময় এবং Ads export eligibility যাচাই করুন।'],
definitions:['User acquisition = প্রথম acquisition-এর scope; Traffic acquisition = session acquisition-এর scope।','Cohort = একটি shared বৈশিষ্ট্য/সময় দিয়ে গড়া user group।','Transaction ID = order identity; value/currency-এর সঙ্গে মিলিয়ে যাচাই করুন।'],
mistakes:['User ও session source-কে একই metric ভাবা।','Refund বাদ দিয়ে revenue interpretation করা।','Audience বানালেই সঙ্গে সঙ্গে সব ব্যবহার সম্ভব ধরে নেওয়া।'],remember:'Report-এর নাম নয়, dimension-এর scope দেখে প্রশ্নের উত্তর দিন।'},
{points:[
'Exploration শুরু করুন একটি নির্দিষ্ট business question দিয়ে।',
'Free-form-এ dimension, metric, segment ও date range যুক্তিসহ বাছুন।',
'Funnel-এ step order, open/closed entry ও elapsed time-এর অর্থ বুঝুন।',
'Path journey দেখায়; যে পথ বেশি দেখা যায় সেটিই সাফল্যের কারণ নয়।',
'Ads ও GA4 মেলাতে attribution, dates, windows ও counting দেখুন।',
'Internal filter আগে test করুন; cross-domain journey-তে linker ও redirect যাচাই করুন।'],
definitions:['Drop-off rate = (আগের ধাপ − পরের ধাপ) ÷ আগের ধাপ × ১০০; comparable cohort চাই।','Open funnel = পরের ধাপ থেকেও entry; Closed funnel = প্রথম ধাপ দিয়ে entry।','Cross-domain linker = এক journey-র তথ্য domain-এর মধ্যে বহন করার ব্যবস্থা।'],
mistakes:['Drop-off দেখেই কারণ নিশ্চিত বলা।','Active filter বসানোর আগে test না করা।','ভিন্ন attribution context-এর totals জোর করে সমান করা।'],remember:'Observation থেকে hypothesis বানান; hypothesis-কে প্রমাণ বলবেন না।'},
{points:[
'GTM-এ dataLayer → Variable → Trigger → Tag-এর flow লিখে Preview-তে পরীক্ষা করুন।',
'Form error, valid success, repeated submit ও phone-click scenario আলাদা রাখুন।',
'Consent default ও user choice-এর পরে update ঠিক সময়ে হচ্ছে কি না দেখুন।',
'Enhanced conversions-এ consent, first-party data ও diagnostics পরীক্ষা করুন।',
'CRM import-এ qualified outcome, timestamp, deduplication ও adjustment plan রাখুন।',
'Looker Studio report-এ source definition দিন; BigQuery ব্যবহারে limits ও query cost বুঝুন।'],
definitions:['Restatement = conversion value সংশোধন; Retraction = conversion প্রত্যাহার।','Consent Mode = user choice অনুযায়ী tag behaviour; consent সংগ্রহের UI নয়।','Preview = draft test; Publish = version live করা।'],
mistakes:['tel: click-কে connected call বলা।','Invalid form submit-এ lead tag চালানো।','Consent update বা imported outcome duplicate হওয়া উপেক্ষা করা।'],remember:'সঠিক trigger ছাড়া সুন্দর dashboard-ও ভুল গল্প বলবে।'},
{points:[
'Account ownership, user access ও payments responsibilities লিখে নিন।',
'Default, campaign-specific ও custom goal-এর ব্যবহৃত actions যাচাই করুন।',
'Awareness campaign-এ reach, frequency, CPM ও CPV-র সংজ্ঞা মিলিয়ে দেখুন।',
'Search terms, impression share ও Auction Insights ভিন্ন প্রশ্নের report।',
'Impressions না এলে status, policy, budget, dates ও eligibility ধাপে ধাপে দেখুন।',
'Clicks আছে, conversions নেই—tracking, destination, lag ও CRM record মিলিয়ে দেখুন।'],
definitions:['CPM = Cost ÷ Impressions × ১,০০০; CPV = Cost ÷ Qualifying views।','Frequency ≈ Impressions ÷ Reach, একই scope-এ।','Impression share = Received impressions ÷ Estimated eligible impressions।'],
mistakes:['Eligible status-কে guaranteed delivery বলা।','Top impression rate-কে Impression share ধরে নেওয়া।','Custom goal-এ কোন action bidding-এ যাচ্ছে না দেখে সিদ্ধান্ত নেওয়া।'],remember:'সমস্যা ধরুন স্তরে স্তরে: access → eligibility → delivery → measurement → outcome।'},
{points:[
'CPA/ROAS বদলালে CPC, CVR, value ও segment mix আলাদা করে দেখুন।',
'Budget pacing-এ elapsed time, spend, seasonality ও business ceiling মিলিয়ে নিন।',
'Experiment-এ sample, bias, guardrail ও decision rule আগে লিখুন।',
'Ads, GA4 ও CRM তুলনায় source, dates, attribution এবং outcome definition রাখুন।',
'Copy-তে intent, claim evidence ও asset variety দেখুন; শুধু score নয়।',
'CRO-তে mobile usability, form quality ও qualified outcome যাচাই করুন।'],
definitions:['সরল CPA = CPC ÷ CVR (decimal); একই compatible scope চাই।','সরল ROAS = CVR × Average conversion value ÷ CPC।','Mix shift = বিভিন্ন segment-এর অনুপাত বদল।'],
mistakes:['৫% CVR-কে formula-তে ৫ লেখা; decimal হবে ০.০৫।','একসঙ্গে অনেক change দিয়ে একটির causal effect দাবি করা।','Raw leads বাড়লেই CRO সফল বলা।'],remember:'একটি evidence → একটি hypothesis → মাপার উপযোগী change।'},
{points:[
'Bulk change-এর আগে diff, approval, preview ও rollback plan রাখুন।',
'Audit findings-এ severity, evidence, confidence, owner ও next action লিখুন।',
'Onboarding-এ scope, access, policy readiness ও handover responsibility ঠিক করুন।',
'Campaign capstone-এ goal, channel, assets, budget ও measurement chain সম্পূর্ণ করুন।',
'Analytics capstone-এ expected/observed test matrix ও data lineage দেখান।',
'Knowledge, practical evidence ও supervised live competence আলাদা মূল্যায়ন করুন।'],
definitions:['Diff = আগে ও পরের পরিবর্তনের তুলনা।','Readiness gate = কাজ শুরু/launch করার আগে পূরণীয় শর্ত।','Least privilege = কাজের জন্য যতটুকু access দরকার ততটুকুই।'],
mistakes:['Approval ছাড়াই production change করা।','Audit-এ evidence ছাড়া severity বাড়িয়ে বলা।','Course completion-কে official certification বা নিশ্চিত expertise বলা।'],remember:'পেশাগত কাজের মান বোঝা যায় evidence, দায়িত্ব ও সীমা পরিষ্কার রাখায়।'},
{points:[
'PMax-এ measurable outcome, reliable tracking, assets ও business readiness আগে যাচাই করুন।',
'Asset group-এর text, image, video ও destination একই theme-এ রাখুন; Brand guidelines review করুন।',
'Audience signal suggestion; এটি কঠোর targeting boundary নয়।',
'tCPA/tROAS target guarantee নয়; learning ও conversion delay বুঝে পরিবর্তন করুন।',
'Brand query, URL ও feed product control আলাদা; listing groups ও exclusions review করুন।',
'Asset group result ও search terms দেখে hypothesis তৈরি করুন; search themes exact keyword নয়।'],
definitions:['CPA = Cost ÷ Conversions; ROAS% = Conversion value ÷ Cost × ১০০।','Search theme = advertiser suggestion; Search term = reported actual query।','Final URL expansion off হলেও eligible feed-product URL ব্যবহৃত হতে পারে।'],
mistakes:['Signal দিয়ে শুধু remarketing audience-তে ad আটকে থাকবে ভাবা।','Ad Strength-কে profit বা incremental sales-এর প্রমাণ বলা।','Learning-এর অজুহাতে broken checkout বা duplicate tracking রেখে দেওয়া।'],remember:'AI-কে goal দিন, control বুঝুন, business evidence দিয়ে ফল বিচার করুন।'}
];

function cheatSheetMarkup(index){
 const s=cheatSheets[index],m=modules[index],ls=lessons.filter(l=>l.module===index);
 return `<article class="cheat-sheet" aria-label="${esc(m.name)} Cheat Sheet">
 <div class="cheat-kicker">Google Ads পাঠশালা · মডিউল ${bn(index+1)} · Lesson ${bn(ls[0].id)}–${bn(ls[ls.length-1].id)}</div>
 <h2>${esc(m.name)}</h2><p class="cheat-subtitle">এক পাতায় মূল ধারণা · বিস্তারিত জানতে মূল lesson পড়ুন</p>
 <section><h3>মূল কথা</h3><ol class="cheat-points">${s.points.map(t=>`<li>${esc(t)}</li>`).join('')}</ol></section>
 <section class="cheat-definitions"><h3>সূত্র ও সংজ্ঞা</h3>${s.definitions.map(t=>`<p>${esc(t)}</p>`).join('')}</section>
 <section><h3>যে তিনটি ভুল এড়াবেন</h3><ul class="cheat-mistakes">${s.mistakes.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></section>
 <aside class="cheat-remember"><strong>মনে রাখুন</strong><p>${esc(s.remember)}</p></aside>
 <div class="cheat-footer">স্বতন্ত্র শিক্ষাসহায়ক summary · Official source: সংশ্লিষ্ট lesson-এর নিচের links · পর্যালোচনা: ১০ অক্টোবর ২০২৬</div>
 </article>`;
}
function renderCheatSheets(index=null){
 if(index==='ai'||location.hash==='#ai-cheats'){
  document.body.classList.add('cheat-mode');
  const content=typeof renderAICheatSheetContent==='function'?renderAICheatSheetContent():'<p>AI Cheat Sheet loading...</p>';
  $('#main').innerHTML=`<div class="tabs" style="margin-bottom:20px;"><a class="button" href="#cheats">← Google Ads চিট শিট (১৭টি)</a><a class="button primary" href="#ai-cheats">AI & Creative চিট শিট ✦</a></div>${content}`;
  return;
 }
 const single=Number.isInteger(index)&&index>=0&&index<modules.length;
 document.body.classList.add('cheat-mode');
 if(!single){
  $('#main').innerHTML='<div class="cheat-intro">'+header('এক পাতায় মডিউল রিভিশন','CHEAT SHEET','১৭টি module-এর মূল কথা, সূত্র, সাধারণ ভুল ও মনে রাখার সংক্ষিপ্ত নিয়ম।')+'</div>'+`<div class="tabs" style="margin-bottom:20px;"><a class="button primary" href="#cheats">Google Ads চিট শিট (১৭টি)</a><a class="button" href="#ai-cheats">AI & Creative চিট শিট (নতুন) ✦</a></div><div class="cheat-toolbar"><button id="print-all-cheats" class="primary">সব ১৭টি sheet Print / PDF</button><p class="small muted">A4 · Portrait · Scale 100% · Headers and footers বন্ধ রাখুন। প্রতিটি module আলাদা পাতা।</p></div><div class="three-col cheat-index">${modules.map((m,i)=>`<article class="card"><span class="eyebrow">মডিউল ${bn(i+1)}</span><h2>${esc(m.name)}</h2><a class="button" href="#cheat-${i+1}">Cheat Sheet খুলুন →</a><a class="button text" href="#g-lesson-${lessons.find(l=>l.module===i).id}">মূল lesson →</a></article>`).join('')}</div><div class="cheat-print-all">${modules.map((_,i)=>cheatSheetMarkup(i)).join('')}</div>`;
  $('#print-all-cheats').onclick=()=>window.print();
 }else{
  $('#main').innerHTML=`<div class="cheat-toolbar"><a class="button" href="#cheats">← সব Cheat Sheet</a><button id="print-cheat" class="primary">এই sheet Print / PDF</button><a class="button" href="#g-lesson-${lessons.find(l=>l.module===index).id}">মূল lesson পড়ুন →</a><p class="small muted">A4 · Portrait · Scale 100% · Headers and footers বন্ধ রাখুন।</p></div>${cheatSheetMarkup(index)}<nav class="cheat-toolbar" aria-label="Cheat Sheet navigation">${index>0?`<a class="button" href="#cheat-${index}">← আগের module</a>`:''}${index<modules.length-1?`<a class="button" href="#cheat-${index+2}">পরের module →</a>`:''}</nav>`;
  $('#print-cheat').onclick=()=>window.print();
 }
}
if(typeof module!=='undefined'&&module.exports)module.exports={cheatSheets};
