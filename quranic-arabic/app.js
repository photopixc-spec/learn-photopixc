/* ==========================================================================
   PhotoPixC Quranic Arabic Main Controller (`app.js` v2.2 Mobile Overhaul)
   Fixes:
   - Restores all Bengali & Arabic Unicode strings (Zero Tofu/Broken Commas/Hyphens)
   - Populates Kids Quiz 4 choice buttons, Last 10 Surahs names, & Word Filter dropdowns
   - Mobile Drawer + 5-Tab Bottom Bar synchronization
   - Integrates 5-Step Kids Flow, Tajweed Color-Coding, & Web Speech Mic Check
   ========================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'photopixc.quranic-arabic.progress.v2';
  var V4 = window.QA_V4 || {};
  var ALPHABET = V4.DEFAULT_ALPHABET || [];
  var HARAKAT = V4.HARAKAT_DATA || [];
  var PUZZLES = V4.BUILDER_PUZZLES || [];

  // Core High-Frequency Quranic Words (With Clean Bengali, Root, Category & Surah Ref)
  var DEFAULT_WORDS = [
    { id: 'w101', ar: 'اللَّهُ', bn: 'আল্লাহ (সৃষ্টিকর্তা)', pron: 'আল্লাহু', root: 'أ-ل-ه', cat: 'noun', surah: '১:১ (আল-ফাতিহা)', freq: '২৬৯৯ বার' },
    { id: 'w102', ar: 'رَبٌّ', bn: 'রব / পালনকর্তা', pron: 'রব্বুন', root: 'ر-ب-ب', cat: 'noun', surah: '১:২ (আল-ফাতিহা)', freq: '৯৭৫ বার' },
    { id: 'w103', ar: 'رَحْمَٰنُ', bn: 'পরম করুণাময়', pron: 'রহমানু', root: 'ر-ح-م', cat: 'attribute', surah: '১:৩ (আল-ফাতিহা)', freq: '৫৭ বার' },
    { id: 'w104', ar: 'رَحِيمٌ', bn: 'অসীম দয়ালু', pron: 'রহীমুন', root: 'ر-ح-م', cat: 'attribute', surah: '১:৩ (আল-ফাতিহা)', freq: '১১৪ বার' },
    { id: 'w105', ar: 'يَوْمِ', bn: 'দিন / দিবস', pron: 'ইয়াওমি', root: 'ي-و-م', cat: 'noun', surah: '১:৪ (আল-ফাতিহা)', freq: '৪০৫ বার' },
    { id: 'w106', ar: 'صِرَاطَ', bn: 'সরল পথ', pron: 'সিরাতা', root: 'ص-ر-ط', cat: 'noun', surah: '১:৬ (আল-ফাতিহা)', freq: '৪৫ বার' },
    { id: 'w107', ar: 'قُلْ', bn: 'বলুন (আদেশ)', pron: 'কুল', root: 'ق-و-ل', cat: 'verb', surah: '১১২:১ (আল-ইখলাস)', freq: '৩৩২ বার' },
    { id: 'w108', ar: 'أَحَدٌ', bn: 'এক ও অদ্বিতীয়', pron: 'আহাদুন', root: 'أ-ح-د', cat: 'attribute', surah: '১১২:১ (আল-ইখলাস)', freq: '৮৫ বার' },
    { id: 'w109', ar: 'صَمَدُ', bn: 'অমুখাপেক্ষী', pron: 'স্বামাদু', root: 'ص-م-د', cat: 'attribute', surah: '১১২:২ (আল-ইখলাস)', freq: '১ বার' },
    { id: 'w110', ar: 'فَلَقِ', bn: 'ভোরের আলো', pron: 'ফালাক্বি', root: 'ف-ل-ق', cat: 'noun', surah: '১১৩:১ (আল-ফালাক)', freq: '১ বার' },
    { id: 'w111', ar: 'نَّاسِ', bn: 'মানুষ / মানবজাতি', pron: 'ন্নাসি', root: 'ن-و-س', cat: 'noun', surah: '১১৪:১ (আন-নাস)', freq: '২৪১ বার' },
    { id: 'w112', ar: 'عَصْرِ', bn: 'সময় / অপরাহ্ণ', pron: 'আসরি', root: 'ع-ص-ر', cat: 'noun', surah: '১০৩:১ (আল-আসর)', freq: '১ বার' },
    { id: 'w113', ar: 'كَوْثَرَ', bn: 'হাউজে কাউসার / প্রভূত কল্যাণ', pron: 'কাউসারা', root: 'ك-ث-ر', cat: 'noun', surah: '১০৮:১ (আল-কাউসার)', freq: '১ বার' },
    { id: 'w114', ar: 'نَصْرُ', bn: 'সাহায্য / বিজয়', pron: 'নাসরু', root: 'ن-ص-ر', cat: 'noun', surah: '১১০:১ (আন-নাসর)', freq: '১০৭ বার' }
  ];

  // Last 10 Surahs of the Quran (Surah 105 Al-Fil to Surah 114 An-Nas — Never Hyphens!)
  var LAST_TEN_SURAHS = [
    { id: 105, nameBn: '১০৫. সূরা আল-ফীল', nameAr: 'سُورَةُ الْفِيلِ', meaningBn: 'হাতি', ayahs: 5, sampleAr: 'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ ۝ أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ', sampleBn: 'আপনি কি দেখেননি আপনার রব হাতিওয়ালাদের সাথে কী করেছিলেন? তিনি কি তাদের চক্রান্ত ব্যর্থ করে দেননি?' },
    { id: 106, nameBn: '১০৬. সূরা কুরাইশ', nameAr: 'سُورَةُ قُرَيْشٍ', meaningBn: 'কুরাইশ গোত্র', ayahs: 4, sampleAr: 'لِإِيلَافِ قُرَيْشٍ ۝ إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ ۝ فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ', sampleBn: 'কুরাইশদের আসক্তির কারণে—শীত ও গ্রীষ্মের সফরে তাদের আসক্তির কারণে, তারা যেন এই ঘরের (কাবার) রবের ইবাদত করে।' },
    { id: 107, nameBn: '১০৭. সূরা আল-মাউন', nameAr: 'سُورَةُ الْمَاعُونِ', meaningBn: 'নিত্যপ্রয়োজনীয় বস্তু', ayahs: 7, sampleAr: 'أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ ۝ فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ', sampleBn: 'আপনি কি তাকে দেখেছেন, যে বিচার দিবসকে অস্বীকার করে? সে তো ওই ব্যক্তি, যে এতিমকে রূঢ়ভাবে তাড়িয়ে দেয়।' },
    { id: 108, nameBn: '১০৮. সূরা আল-কাউসার', nameAr: 'سُورَةُ الْكَوْثَرِ', meaningBn: 'প্রভূত কল্যাণ / কাউসার', ayahs: 3, sampleAr: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۝ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۝ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', sampleBn: 'নিশ্চয়ই আমি আপনাকে কাউসার দান করেছি। অতএব আপনার রবের উদ্দেশ্যে নামাজ পড়ুন এবং কুরবানি করুন।' },
    { id: 109, nameBn: '১০৯. সূরা আল-কাফিরুন', nameAr: 'سُورَةُ الْكَافِرُونَ', meaningBn: 'অবিশ্বাসীগণ', ayahs: 6, sampleAr: 'قُلْ يَا أَيُّهَا الْكَافِرُونَ ۝ لَا أَعْبُدُ مَا تَعْبُدُونَ ۝ لَكُمْ دِينُكُمْ وَلِيَ دِينِ', sampleBn: 'বলুন, হে কাফিররা! তোমরা যার ইবাদত করো আমি তার ইবাদত করি না... তোমাদের জন্য তোমাদের দ্বীন এবং আমার জন্য আমার দ্বীন।' },
    { id: 110, nameBn: '১১০. সূরা আন-নাসর', nameAr: 'سُورَةُ النَّصْرِ', meaningBn: 'আল্লাহর সাহায্য', ayahs: 3, sampleAr: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ۝ فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۝ إِنَّهُ كَانَ تَوَّابًا', sampleBn: 'যখন আল্লাহর সাহায্য ও বিজয় আসবে, তখন আপনার রবের প্রশংসাসহ পবিত্রতা ঘোষণা করুন এবং তাঁর কাছে ক্ষমা চান।' },
    { id: 111, nameBn: '১১১. সূরা আল-লাহাব', nameAr: 'سُورَةُ الْمَسَدِ', meaningBn: 'খেজুরের পাকানো রশি', ayahs: 5, sampleAr: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ ۝ مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ', sampleBn: 'ধ্বংস হোক আবু লাহাবের দুই হাত এবং ধ্বংস হোক সে নিজেও! তার ধন-সম্পদ ও উপার্জন তার কোনো কাজে আসেনি।' },
    { id: 112, nameBn: '১১২. সূরা আল-ইখলাস', nameAr: 'سُورَةُ الْإِخْلَاصِ', meaningBn: 'একত্ববাদ / নিষ্ঠা', ayahs: 4, sampleAr: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ', sampleBn: 'বলুন, তিনি আল্লাহ, এক ও অদ্বিতীয়। আল্লাহ অমুখাপেক্ষী। তিনি কাউকে জন্ম দেননি এবং তাঁকেও জন্ম দেওয়া হয়নি।' },
    { id: 113, nameBn: '১১৩. সূরা আল-ফালাক', nameAr: 'سُورَةُ الْفَلَقِ', meaningBn: 'ভোরের আলো', ayahs: 5, sampleAr: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ', sampleBn: 'বলুন, আমি আশ্রয় গ্রহণ করছি ভোরের রবের কাছে—তিনি যা সৃষ্টি করেছেন তার অনিষ্ট থেকে।' },
    { id: 114, nameBn: '১১৪. সূরা আন-নাস', nameAr: 'سُورَةُ النَّاسِ', meaningBn: 'মানবজাতি', ayahs: 6, sampleAr: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', sampleBn: 'বলুন, আমি আশ্রয় প্রার্থনা করছি মানুষের রবের, মানুষের অধিপতির, মানুষের ইলাহের কাছে—কুমন্ত্রণাদাতার অনিষ্ট হতে।' }
  ];

  // Kids Quiz Questions (4 Guaranteed Non-Blank Options!)
  var KIDS_QUESTIONS = [
    { qBn: 'নৌকার নিচে ১টি বিন্দু থাকলে কোন হরফ হয়?', glyph: 'ب', correctIdx: 0, options: ['বা (ب)', 'তা (ت)', 'ছা (ث)', 'নূন (ن)'], tipBn: 'মনে রাখার ছন্দ: নৌকার নিচে ১টি বিন্দু মানে বা (ب)!' },
    { qBn: 'কুরআনের এই শব্দটির বাংলা অর্থ কী?', glyph: 'رَبٌّ', correctIdx: 1, options: ['দিন / দিবস', 'রব / পালনকর্তা', 'ভোরের আলো', 'রাত'], tipBn: 'রব্বুন (رَبٌّ) অর্থ আমাদের পালনকর্তা।' },
    { qBn: 'হরফের উপরে ছোট কোণাকৃতি চিহ্নকে (◌َ) কী বলে?', glyph: 'بَ', correctIdx: 0, options: ['জবর (আ-ধ্বনি)', 'জের (ই-ধ্বনি)', 'পেশ (উ-ধ্বনি)', 'সুকুন (থামা)'], tipBn: 'হরফের উপরে জবর থাকলে মুখ খুলে আ-কার দিয়ে পড়তে হয়।' },
    { qBn: 'পেটের ভেতরে ১টি বিন্দু থাকলে কোন হরফ হয়?', glyph: 'ج', correctIdx: 2, options: ['হা (ح)', 'খা (خ)', 'জীম (ج)', 'দাল (د)'], tipBn: 'জীম (ج)-এর পেটের ভেতর ১টি বিন্দু থাকে!' },
    { qBn: 'কুরআনের এই শব্দটির অর্থ কী?', glyph: 'قُلْ', correctIdx: 3, options: ['শুনুন', 'লিখুন', 'পড়ুন', 'বলুন (Say)'], tipBn: 'কুল (قُلْ) অর্থ বলুন—যেমন: কুল হুওয়াল্লাহু আহাদ।' },
    { qBn: 'সূরা আল-কাউসার কুরআনের কত নম্বর সূরা?', glyph: 'الْكَوْثَر', correctIdx: 1, options: ['১০৫ নম্বর', '১০৮ নম্বর (সবচেয়ে ছোট সূরা)', '১১২ নম্বর', '১১৪ নম্বর'], tipBn: 'সূরা আল-কাউসারে মাত্র ৩টি আয়াত রয়েছে।' }
  ];

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      ageMode: 'kids',
      tajweedOn: true,
      stars: 5,
      streak: 1,
      selectedLetterIdx: 1,
      selectedSurahId: 108,
      selectedHarakatIdx: 0,
      builderIdx: 0,
      builderPicked: [],
      kidsQIdx: 0,
      kidsAnswered: null,
      flashIdx: 0,
      flashFlipped: false,
      wordSearch: '',
      wordCat: 'all',
      learnedLetters: [1, 2],
      learnedSurahs: [108, 112]
    };
  }

  var state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
    updateBadges();
  }

  function bnNum(n) {
    var d = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(n).replace(/[0-9]/g, function (c) { return d[Number(c)]; });
  }

  function toast(msg) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(window.__qaToastTimer);
    window.__qaToastTimer = setTimeout(function () {
      el.classList.remove('show');
    }, 2400);
  }

  window.QA_Toast = toast;
  window.QA_AddStar = function (count) {
    state.stars = (state.stars || 0) + (count || 1);
    saveState();
    toast('🌟 মাশাআল্লাহ! +' + bnNum(count || 1) + ' স্টার যোগ হয়েছে!');
  };

  function updateBadges() {
    var sc = document.getElementById('streak-count');
    if (sc) sc.textContent = bnNum(state.stars || 0);
    var totalItems = ALPHABET.length + LAST_TEN_SURAHS.length;
    var doneItems = (state.learnedLetters ? state.learnedLetters.length : 0) + (state.learnedSurahs ? state.learnedSurahs.length : 0);
    var pct = Math.min(100, Math.round((doneItems / Math.max(1, totalItems)) * 100));
    var comp = document.getElementById('side-completion');
    if (comp) comp.textContent = bnNum(pct) + '%';
    var fill = document.getElementById('side-progress-fill');
    if (fill) fill.style.width = pct + '%';
  }

  function fmtAr(str) {
    return V4.highlightTajweed ? V4.highlightTajweed(str, state.tajweedOn) : str;
  }

  function renderTajweedLegend() {
    if (!state.tajweedOn) return '';
    return (
      '<div class="tajweed-legend">' +
        '<strong>🌈 ফ্রি তাজবীদ গাইড:</strong>' +
        '<span><i class="tj-dot" style="background:#16a34a;"></i><strong class="tj-ghunnah">সবুজ</strong> = গুন্নাহ (নাকের বাঁশিতে টান)</span>' +
        '<span><i class="tj-dot" style="background:#2563eb;"></i><strong class="tj-qalqalah">নীল</strong> = কলকলাহ (প্রতিধ্বনি)</span>' +
      '</div>'
    );
  }

  // 1. HOME VIEW (#qa-home)
  function renderHome() {
    var isKids = state.ageMode === 'kids';
    return (
      '<div class="hero-banner">' +
        '<span class="hero-kicker">' + (isKids ? '🎈 কিডস মোড (৫–৯ বছর) · ছবি, গল্প ও গেম' : '🎓 জুনিয়র স্কলার মোড (১০–১৫ বছর) · তাজবীদ, শব্দমূল ও সূরা') + '</span>' +
        '<h1>কুরআনিক আরবি শেখার সহজ ৫-ধাপের জার্নি</h1>' +
        '<p>হরফ চেনা, মাখরাজ দেখা, হরকত ট্রেন, লেগো শব্দ গঠন এবং ফ্রি মাইক উচ্চারণ চেকারের মাধ্যমে আনন্দের সাথে কুরআনের ভাষা শিখুন।</p>' +
        '<div class="hero-actions">' +
          '<a href="#qa-path" class="btn btn-light">🗺️ ৫-ধাপের গাইডেড পাথ</a>' +
          '<a href="#qa-alphabet" class="btn btn-accent">🔤 হরফ ও ট্রেসিং শুরু করুন</a>' +
          '<a href="#qa-kids" class="btn btn-outline" style="background:rgba(255,255,255,0.14);color:#fff;border-color:rgba(255,255,255,0.4);">🎮 কিডস কুইজ ও মাইক গেম</a>' +
        '</div>' +
      '</div>' +
      renderTajweedLegend() +
      '<div class="grid">' +
        '<div class="card">' +
          '<div class="v4-overline">ধাপ ১ · বয়স ৫–১০</div>' +
          '<h3>🔤 ২৮টি হরফ, গল্প ও মাখরাজ</h3>' +
          '<p>নৌকা ও বিন্দুর গল্প দিয়ে হরফ চিনুন, আঙুল দিয়ে ডট-টু-ডট হরফ লিখুন এবং মুখ-গলার মাখরাজ ডায়াগ্রাম দেখুন।</p>' +
          '<a href="#qa-alphabet" class="btn btn-primary" style="width:100%;">হরফ শিখুন →</a>' +
        '</div>' +
        '<div class="card">' +
          '<div class="v4-overline">ধাপ ২ · বয়স ৬–১১</div>' +
          '<h3>🚂 হরকত ও সাউন্ড ট্রেন</h3>' +
          '<p>জবর (আ), জের (ই), পেশ (উ), তানভীন ও তাশদীদের ধ্বনি শুনে ও মাইকে বলে অনুশীলন করুন।</p>' +
          '<a href="#qa-harakat" class="btn btn-primary" style="width:100%;">হরকত ট্রেন চালান →</a>' +
        '</div>' +
        '<div class="card">' +
          '<div class="v4-overline">ধাপ ৩ · বয়স ৮–১৩</div>' +
          '<h3>🧩 লেগো ব্লক শব্দ গঠন</h3>' +
          '<p>হরফের শুরুর রূপ, মাঝের রূপ ও শেষের রূপ পাশাপাশি বসিয়ে কুরআনের শব্দ তৈরি করুন।</p>' +
          '<a href="#qa-builder" class="btn btn-primary" style="width:100%;">শব্দ তৈরি করুন →</a>' +
        '</div>' +
        '<div class="card">' +
          '<div class="v4-overline">ধাপ ৪ ও ৫ · বয়স ৯–১৫</div>' +
          '<h3>🕌 কুরআনিক শব্দ ও শেষ ১০ সূরা</h3>' +
          '<p>কুরআনে সবচেয়ে বেশি ব্যবহৃত শব্দভাণ্ডার এবং সূরা ফীল থেকে সূরা নাস পর্যন্ত তাজবীদসহ শিখুন।</p>' +
          '<a href="#qa-last-ten" class="btn btn-primary" style="width:100%;">১০টি সূরা পড়ুন →</a>' +
        '</div>' +
      '</div>'
    );
  }

  // 2. GUIDED PATH VIEW (#qa-path)
  function renderPath() {
    var steps = [
      { num: '০১', title: 'হরফের আকৃতি ও গল্প (Shape Matching)', desc: 'বিন্দু ও আকৃতি দেখে বা-তা-ছা এবং জীম-হা-খা আলাদা করা।', route: '#qa-alphabet', badge: '⭐ ৩/৩' },
      { num: '০২', title: 'ডট-টু-ডট হরফ ট্রেসিং (Canvas Tracing)', desc: 'মোবাইল স্ক্রিনে আঙুল ঘুরিয়ে সঠিক নিয়মে আরবি হরফ লেখা।', route: '#qa-alphabet', badge: '✍️ ইন্টারেক্টিভ' },
      { num: '০৩', title: 'হরকত সাউন্ড ট্রেন (Fatha, Kasra, Damma)', desc: 'জবর, জের, পেশ ও তাশদীদের ধ্বনি শুনে উচ্চারণ করা।', route: '#qa-harakat', badge: '🚂 অডিও + মাইক' },
      { num: '০৪', title: '৩-রূপের লেগো শব্দ গঠন (Word Builder)', desc: 'শুরু, মাঝ ও শেষের হরফ জুড়ে পূর্ণাঙ্গ কুরআনিক শব্দ গঠন।', route: '#qa-builder', badge: '🧩 পাজল' },
      { num: '০৫', title: 'কুরআনিক শব্দ ও শেষ ১০ সূরা মিশন', desc: 'তাজবীদ কালার-কোডিংসহ সূরা ফীল থেকে সূরা নাস মুখস্থ ও অর্থ বোঝা।', route: '#qa-last-ten', badge: '🕌 চূড়ান্ত ধাপ' }
    ];
    var html = '<div class="card" style="margin-bottom:16px;">' +
      '<div class="v4-overline">DUOLINGO-STYLE 5-STEP KIDS FLOW</div>' +
      '<h2 style="margin:4px 0 8px 0;">🗺️ ৫ থেকে ১৫ বছর বয়সীদের ধাপে ধাপে আরবি শেখার রোডম্যাপ</h2>' +
      '<p style="margin:0;color:var(--muted);">যেকোনো ধাপে ট্যাপ করে সরাসরি অনুশীলন শুরু করুন।</p>' +
      '</div><div class="step-flow-list">';
    for (var i = 0; i < steps.length; i++) {
      var s = steps[i];
      html += '<div class="step-node-card unlocked">' +
        '<div style="display:flex;align-items:center;gap:14px;">' +
          '<div class="step-badge-num">' + s.num + '</div>' +
          '<div>' +
            '<strong style="font-size:1.05rem;">' + s.title + '</strong>' +
            '<p style="margin:4px 0 0 0;font-size:0.9rem;color:var(--muted);">' + s.desc + '</p>' +
          '</div>' +
        '</div>' +
        '<a href="' + s.route + '" class="btn btn-primary">' + s.badge + ' →</a>' +
      '</div>';
    }
    html += '</div>';
    return html;
  }

  // 3. ALPHABET, MAKHRAJ & TRACING VIEW (#qa-alphabet)
  function renderAlphabet() {
    var sel = ALPHABET[state.selectedLetterIdx] || ALPHABET[0];
    var cardsHtml = '';
    for (var i = 0; i < ALPHABET.length; i++) {
      var item = ALPHABET[i];
      var isSel = i === state.selectedLetterIdx;
      cardsHtml += '<button type="button" class="letter-card ' + (isSel ? 'selected' : '') + '" data-letter-idx="' + i + '">' +
        '<span class="letter-glyph" lang="ar" dir="rtl">' + item.glyph + '</span>' +
        '<span class="letter-name-bn">' + item.nameBn + '</span>' +
        '<span class="letter-sound-bn">' + item.soundBn + '</span>' +
      '</button>';
    }

    return (
      '<div class="card" style="margin-bottom:16px;">' +
        '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;">' +
          '<div>' +
            '<div class="v4-overline">ধাপ ১ · হরফ, ৪টি রূপ, মাখরাজ ও ট্রেসিং</div>' +
            '<h2 style="margin:0;">নির্বাচিত হরফ: ' + sel.nameBn + ' (<span class="ar" style="font-size:1.8rem;">' + sel.glyph + '</span>)</h2>' +
          '</div>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
            '<button type="button" class="btn btn-primary" id="btn-speak-letter">🔊 উচ্চারণ শুনুন</button>' +
            '<button type="button" class="btn btn-success" id="btn-mic-letter">🎙️ মাইকে বলুন</button>' +
          '</div>' +
        '</div>' +
        '<p id="letter-mic-status" style="margin:10px 0 0 0;font-weight:600;color:var(--primary);">💡 মনে রাখার কৌশল: ' + sel.storyBn + ' · মাখরাজ: ' + sel.makhrajBn + '</p>' +

        '<!-- 4 Contextual Forms in RTL Order -->' +
        '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px;direction:rtl;text-align:center;">' +
          '<div style="background:var(--surface-alt);padding:10px;border-radius:12px;"><div class="ar" style="font-size:2rem;color:var(--primary);">' + sel.forms.iso + '</div><small>একাকী (Isolated)</small></div>' +
          '<div style="background:var(--surface-alt);padding:10px;border-radius:12px;"><div class="ar" style="font-size:2rem;color:var(--primary);">' + sel.forms.ini + '</div><small>শুরুতে (Initial)</small></div>' +
          '<div style="background:var(--surface-alt);padding:10px;border-radius:12px;"><div class="ar" style="font-size:2rem;color:var(--primary);">' + sel.forms.med + '</div><small>মাঝে (Medial)</small></div>' +
          '<div style="background:var(--surface-alt);padding:10px;border-radius:12px;"><div class="ar" style="font-size:2rem;color:var(--primary);">' + sel.forms.fin + '</div><small>শেষে (Final)</small></div>' +
        '</div>' +

        (V4.getMakhrajSvg ? V4.getMakhrajSvg(sel.makhrajGroup) : '') +

        '<!-- Interactive Dot-to-Dot Tracing Canvas -->' +
        '<div class="tracing-box">' +
          '<strong>✍️ আঙুল বা মাউস ঘুরিয়ে হরফটি লিখুন (' + sel.nameBn + '):</strong>' +
          '<div class="tracing-canvas-wrap">' +
            '<div class="tracing-guide-glyph" lang="ar" dir="rtl">' + sel.glyph + '</div>' +
            '<canvas id="trace-canvas" width="260" height="260"></canvas>' +
          '</div>' +
          '<button type="button" id="btn-clear-trace" class="btn btn-outline">🔄 বোর্ড পরিষ্কার করুন</button>' +
        '</div>' +
      '</div>' +

      '<h3 style="margin:12px 0;">২৮টি আরবি হরফ (যেকোনো হরফে ট্যাপ করুন):</h3>' +
      '<div class="alphabet-grid">' + cardsHtml + '</div>'
    );
  }

  // 4. HARAKAT SOUND TRAIN (#qa-harakat)
  function renderHarakat() {
    var active = HARAKAT[state.selectedHarakatIdx] || HARAKAT[0];
    var cars = '';
    for (var i = 0; i < HARAKAT.length; i++) {
      var h = HARAKAT[i];
      cars += '<button type="button" class="train-car ' + (i === state.selectedHarakatIdx ? 'active' : '') + '" data-harakat-idx="' + i + '">' +
        '<div class="train-glyph" lang="ar" dir="rtl">' + fmtAr(h.glyph) + '</div>' +
        '<strong>' + h.nameBn + '</strong>' +
        '<div style="font-size:0.82rem;color:var(--muted);">' + h.soundBn + '</div>' +
      '</button>';
    }
    return (
      renderTajweedLegend() +
      '<div class="card" style="margin-bottom:16px;">' +
        '<div class="v4-overline">ধাপ ২ · হরকত ও সাউন্ড ট্রেন গেম</div>' +
        '<h2 style="margin:4px 0;">🚂 ' + active.nameBn + ' — ' + active.actionBn + '</h2>' +
        '<p style="margin:6px 0 12px 0;">কুরআনিক উদাহরণ: <strong class="ar" style="font-size:1.9rem;">' + fmtAr(active.exampleAr) + '</strong> (' + active.exampleBn + ')</p>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap;">' +
          '<button type="button" class="btn btn-primary" id="btn-speak-harakat">🔊 ধ্বনি শুনুন</button>' +
          '<button type="button" class="btn btn-success" id="btn-mic-harakat">🎙️ মাইকে উচ্চারণ চেক করুন</button>' +
        '</div>' +
        '<div id="harakat-mic-status" style="margin-top:10px;font-weight:600;color:var(--primary);"></div>' +
      '</div>' +
      '<div class="train-track">' + cars + '</div>'
    );
  }

  // 5. LEGO 3-FORM WORD BUILDER (#qa-builder)
  function renderBuilder() {
    var puz = PUZZLES[state.builderIdx % PUZZLES.length];
    var pickedHtml = '';
    for (var i = 0; i < state.builderPicked.length; i++) {
      var pIdx = state.builderPicked[i];
      var part = puz.parts[pIdx];
      if (part) {
        pickedHtml += '<button type="button" class="v4-placed" data-unpick="' + i + '">' +
          '<span lang="ar" dir="rtl">' + part.ar + '</span>' +
          '<small>' + part.label + '</small>' +
        '</button>';
      }
    }
    if (!pickedHtml) {
      pickedHtml = '<span style="color:var(--muted);font-weight:600;">নিচের হরফ ব্লকগুলোতে ডান থেকে বামে ট্যাপ করে শব্দটি সাজান</span>';
    }

    var tilesHtml = '';
    for (var j = 0; j < puz.parts.length; j++) {
      if (state.builderPicked.indexOf(j) === -1) {
        var pt = puz.parts[j];
        tilesHtml += '<button type="button" class="v4-tile" data-pick="' + j + '">' +
          '<span lang="ar" dir="rtl">' + pt.ar + '</span>' +
          '<small>' + pt.label + '</small>' +
        '</button>';
      }
    }

    var isComplete = state.builderPicked.length === puz.parts.length;
    var isCorrect = isComplete && state.builderPicked.every(function (v, idx) { return v === idx; });

    return (
      '<div class="card">' +
        '<div class="v4-overline">ধাপ ৩ · INTERACTIVE LEGO WORD BUILDER</div>' +
        '<h2 style="margin:4px 0;">🧩 শব্দটি তৈরি করুন: <span class="ar" style="font-size:2.2rem;color:var(--primary);">' + fmtAr(puz.wordAr) + '</span></h2>' +
        '<p style="margin:0 0 10px 0;">বাংলা অর্থ: <strong>' + puz.meaningBn + '</strong> · রেফারেন্স: ' + puz.ref + '</p>' +
        '<div class="v4-assembled" dir="rtl">' + pickedHtml + '</div>' +
        '<div class="v4-tiles">' + tilesHtml + '</div>' +
        (isComplete
          ? '<div class="callout" style="padding:12px;border-radius:12px;margin:12px 0;background:' + (isCorrect ? '#dcfce7' : '#fee2e2') + ';">' +
              '<strong>' + (isCorrect ? '🎉 মাশাআল্লাহ! হরফগুলো সঠিক ক্রমে জোড়া লেগেছে!' : '💡 ক্রমটি একটু উল্টো হয়েছে—প্রথমে শুরুর হরফ, এরপর মাঝের ও শেষের হরফে ট্যাপ করুন।') + '</strong>' +
            '</div>'
          : '') +
        '<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:12px;">' +
          '<button type="button" class="btn btn-primary" id="btn-speak-builder">🔊 শব্দটি শুনুন</button>' +
          '<button type="button" class="btn btn-outline" id="btn-reset-builder">🔄 রিসেট করুন</button>' +
          '<button type="button" class="btn btn-accent" id="btn-next-builder">পরবর্তী শব্দ →</button>' +
        '</div>' +
      '</div>'
    );
  }

  // 6. QURANIC WORDS VOCABULARY (#qa-words) — Populated Filters & Search!
  function renderWords() {
    var q = (state.wordSearch || '').trim().toLowerCase();
    var cat = state.wordCat || 'all';
    var filtered = DEFAULT_WORDS.filter(function (w) {
      var matchCat = cat === 'all' || w.cat === cat;
      var matchQ = !q || w.bn.toLowerCase().indexOf(q) !== -1 || w.pron.toLowerCase().indexOf(q) !== -1 || w.ar.indexOf(q) !== -1;
      return matchCat && matchQ;
    });

    var cards = '';
    for (var i = 0; i < filtered.length; i++) {
      var w = filtered[i];
      cards += '<div class="card">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;">' +
          '<span class="v4-overline">' + w.surah + ' · ' + w.freq + '</span>' +
          '<button type="button" class="btn btn-outline" style="min-height:38px;padding:4px 10px;" data-speak-ar="' + w.ar + '">🔊 শুনুন</button>' +
        '</div>' +
        '<div class="ar" style="font-size:2.4rem;color:var(--primary);margin:4px 0;">' + fmtAr(w.ar) + '</div>' +
        '<strong style="font-size:1.1rem;display:block;">' + w.bn + '</strong>' +
        '<div style="font-size:0.88rem;color:var(--muted);margin-top:4px;">উচ্চারণ: <strong>' + w.pron + '</strong> · শব্দমূল (Root): <span dir="rtl">' + w.root + '</span></div>' +
      '</div>';
    }

    return (
      renderTajweedLegend() +
      '<div class="card" style="margin-bottom:16px;">' +
        '<div class="v4-overline">ধাপ ৪ · কুরআনের সর্বাধিক ব্যবহৃত শব্দভাণ্ডার</div>' +
        '<h2 style="margin:4px 0 12px 0;">📖 কুরআনিক শব্দ ও মূল ধাতু (Root Words)</h2>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;">' +
          '<input type="search" id="word-search-input" value="' + (state.wordSearch || '') + '" placeholder="বাংলা অর্থ বা উচ্চারণ দিয়ে খুঁজুন..." style="min-height:46px;padding:10px 14px;border-radius:10px;border:1px solid var(--border);font-family:var(--font-bn);font-size:0.95rem;">' +
          '<select id="word-cat-select" style="min-height:46px;padding:10px 14px;border-radius:10px;border:1px solid var(--border);font-family:var(--font-bn);font-size:0.95rem;">' +
            '<option value="all" ' + (cat === 'all' ? 'selected' : '') + '>সব ধরনের শব্দ (All Categories)</option>' +
            '<option value="noun" ' + (cat === 'noun' ? 'selected' : '') + '>বিশেষ্য (Nouns - নামবাচক শব্দ)</option>' +
            '<option value="attribute" ' + (cat === 'attribute' ? 'selected' : '') + '>আল্লাহর গুণবাচক নাম (Attributes)</option>' +
            '<option value="verb" ' + (cat === 'verb' ? 'selected' : '') + '>ক্রিয়াপদ ও আদেশ (Verbs)</option>' +
          '</select>' +
        '</div>' +
      '</div>' +
      '<div class="grid">' + (cards || '<div class="card">কোনো শব্দ পাওয়া যায়নি।</div>') + '</div>'
    );
  }

  // 7. KIDS QUIZ & MIC GAME (#qa-kids) — 4 Guaranteed Populated Choice Buttons!
  function renderKids() {
    var qObj = KIDS_QUESTIONS[state.kidsQIdx % KIDS_QUESTIONS.length];
    var optsHtml = '';
    for (var i = 0; i < qObj.options.length; i++) {
      var cls = 'kids-opt-btn';
      if (state.kidsAnswered !== null) {
        if (i === qObj.correctIdx) cls += ' correct';
        else if (i === state.kidsAnswered) cls += ' wrong';
      }
      optsHtml += '<button type="button" class="' + cls + '" data-kids-opt="' + i + '">' +
        '<span>' + bnNum(i + 1) + '. ' + qObj.options[i] + '</span>' +
      '</button>';
    }

    return (
      '<div class="kids-quiz-card">' +
        '<div class="v4-overline">কিডস ইন্টারঅ্যাক্টিভ কুইজ ও ভয়েস চ্যালেঞ্জ (প্রশ্ন ' + bnNum((state.kidsQIdx % KIDS_QUESTIONS.length) + 1) + '/' + bnNum(KIDS_QUESTIONS.length) + ')</div>' +
        '<h2 style="margin:6px 0;">🎮 ' + qObj.qBn + '</h2>' +
        '<div class="kids-prompt-glyph" lang="ar" dir="rtl">' + fmtAr(qObj.glyph) + '</div>' +
        '<div><button type="button" class="btn btn-outline" id="btn-kids-listen">🔊 উচ্চারণ শুনুন</button></div>' +
        '<div class="kids-options-grid">' + optsHtml + '</div>' +
        (state.kidsAnswered !== null
          ? '<div style="padding:12px;border-radius:12px;background:#f0fdf4;border:1px solid #86efac;margin-bottom:12px;">' +
              '<strong>' + (state.kidsAnswered === qObj.correctIdx ? '🎉 মাশাআল্লাহ! সঠিক উত্তর!' : '💡 সঠিক উত্তর হলো: ' + qObj.options[qObj.correctIdx]) + '</strong>' +
              '<div style="font-size:0.9rem;color:var(--muted);margin-top:4px;">' + qObj.tipBn + '</div>' +
            '</div>'
          : '') +
        '<button type="button" class="btn btn-primary" id="btn-kids-next" style="width:100%;">পরবর্তী প্রশ্ন →</button>' +

        '<div class="mic-checker-box">' +
          '<strong>🎙️ ফ্রি ভয়েস চ্যালেঞ্জ (Web Speech API):</strong>' +
          '<p style="margin:4px 0 10px 0;font-size:0.9rem;">নিচের মাইক বাটনে চাপ দিয়ে উচ্চস্বরে <strong class="ar">' + qObj.glyph + '</strong> উচ্চারণ করুন!</p>' +
          '<button type="button" class="mic-btn" id="btn-kids-mic">🎙️ মাইকে উচ্চারণ পরীক্ষা করুন</button>' +
          '<div id="kids-mic-status" style="margin-top:8px;font-weight:600;color:var(--primary);"></div>' +
        '</div>' +
      '</div>'
    );
  }

  // 8. FLASHCARDS (#qa-flashcards)
  function renderFlashcards() {
    var w = DEFAULT_WORDS[state.flashIdx % DEFAULT_WORDS.length];
    return (
      '<div class="kids-quiz-card">' +
        '<div class="v4-overline">ফ্ল্যাশকার্ড মেমোরি রিভিশন (' + bnNum((state.flashIdx % DEFAULT_WORDS.length) + 1) + '/' + bnNum(DEFAULT_WORDS.length) + ')</div>' +
        '<div class="kids-prompt-glyph" lang="ar" dir="rtl">' + fmtAr(w.ar) + '</div>' +
        (state.flashFlipped
          ? '<div style="margin:14px 0;">' +
              '<h2 style="margin:0;color:var(--primary);">' + w.bn + '</h2>' +
              '<p style="margin:4px 0;color:var(--muted);">উচ্চারণ: <strong>' + w.pron + '</strong> · রেফারেন্স: ' + w.surah + '</p>' +
            '</div>'
          : '<p style="color:var(--muted);margin:14px 0;">অর্থ দেখতে নিচের <strong>কার্ড উল্টান</strong> বাটনে ট্যাপ করুন।</p>') +
        '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' +
          '<button type="button" class="btn btn-outline" id="btn-flash-flip">🔁 কার্ড উল্টান (Flip)</button>' +
          '<button type="button" class="btn btn-primary" data-speak-ar="' + w.ar + '">🔊 অডিও শুনুন</button>' +
          '<button type="button" class="btn btn-success" id="btn-flash-next">👍 মুখস্থ হয়েছে (পরবর্তী) →</button>' +
        '</div>' +
      '</div>'
    );
  }

  // 9. LAST 10 SURAHS (#qa-last-ten) — Complete Bangla & Arabic Surah Titles!
  function renderLastTen() {
    var sel = LAST_TEN_SURAHS.find(function (s) { return s.id === state.selectedSurahId; }) || LAST_TEN_SURAHS[3];
    var chips = '';
    for (var i = 0; i < LAST_TEN_SURAHS.length; i++) {
      var s = LAST_TEN_SURAHS[i];
      chips += '<button type="button" class="surah-chip ' + (s.id === sel.id ? 'active' : '') + '" data-surah-id="' + s.id + '">' +
        '<strong>' + s.nameBn + '</strong>' +
        '<span>' + s.meaningBn + ' · ' + bnNum(s.ayahs) + ' আয়াত</span>' +
      '</button>';
    }

    return (
      renderTajweedLegend() +
      '<div class="card" style="margin-bottom:16px;">' +
        '<div class="v4-overline">ধাপ ৫ · কুরআন হিফজ ও তাজবীদ রিডার</div>' +
        '<h2 style="margin:4px 0 12px 0;">🕌 কুরআনের শেষ ১০টি সূরা (সূরা ফীল থেকে সূরা নাস)</h2>' +
        '<div class="surah-chip-grid">' + chips + '</div>' +
        '<div class="card" style="background:var(--surface-alt);">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">' +
            '<div>' +
              '<h3 style="margin:0;">' + sel.nameBn + ' (' + sel.meaningBn + ')</h3>' +
              '<small style="color:var(--muted);">মোট আয়াত: ' + bnNum(sel.ayahs) + 'টি</small>' +
            '</div>' +
            '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
              '<button type="button" class="btn btn-primary" data-speak-ar="' + sel.sampleAr + '">▶ তিলাওয়াত শুনুন</button>' +
              '<button type="button" class="btn btn-success" id="btn-surah-learned">✅ সূরাটি পড়া সম্পন্ন</button>' +
            '</div>' +
          '</div>' +
          '<div class="ar" style="font-size:2rem;background:#ffffff;padding:16px;border-radius:14px;margin:14px 0;border:1px solid var(--border);">' +
            fmtAr(sel.sampleAr) +
          '</div>' +
          '<p style="margin:0;font-size:1rem;"><strong>বাংলা অনুবাদ:</strong> ' + sel.sampleBn + '</p>' +
        '</div>' +
      '</div>'
    );
  }

  // 10. SALAH, DAILY, PROGRESS & STICKER ALBUM VIEWS
  function renderProgress() {
    var badges = [
      { ico: '🌟', title: 'আলিফ-বা অভিযাত্রী', desc: 'প্রথম ৫টি আরবি হরফ ও মাখরাজ শেখা সম্পন্ন', earned: true },
      { ico: '🚂', title: 'হরকত হিরো', desc: 'জবর, জের, পেশ ও তানভীন সাউন্ড ট্রেন অনুশীলন', earned: true },
      { ico: '🧩', title: 'শব্দ কারিগর', desc: 'লেগো ওয়ার্ড বিল্ডারে কুরআনিক শব্দ গঠন', earned: state.stars >= 8 },
      { ico: '🎙️', title: 'কুরআনিক কণ্ঠ', desc: 'মাইক্রোফোনে আরবি উচ্চারণ যাচাই সম্পন্ন', earned: state.stars >= 10 },
      { ico: '🕌', title: 'জুয আম্মা স্টার', desc: 'শেষ ১০টি সূরা তাজবীদসহ পাঠ সম্পন্ন', earned: (state.learnedSurahs || []).length >= 5 }
    ];
    var bHtml = '';
    for (var i = 0; i < badges.length; i++) {
      var b = badges[i];
      bHtml += '<div class="sticker-card ' + (b.earned ? 'earned' : '') + '">' +
        '<span class="sticker-ico">' + b.ico + '</span>' +
        '<strong>' + b.title + '</strong>' +
        '<p style="font-size:0.82rem;color:var(--muted);margin:6px 0 0 0;">' + b.desc + '</p>' +
      '</div>';
    }
    return (
      '<div class="card">' +
        '<div class="v4-overline">অফলাইন স্টিকার অ্যালবাম ও প্রগতি</div>' +
        '<h2>🎖️ আপনার অর্জিত স্টার: ' + bnNum(state.stars || 0) + ' 🔥</h2>' +
        '<div class="sticker-grid">' + bHtml + '</div>' +
      '</div>'
    );
  }

  function renderSalah() {
    return (
      '<div class="card">' +
        '<div class="v4-overline">নামাজের কুরআনিক দোয়া ও তাসবীহ</div>' +
        '<h2>🤲 নামাজের গুরুত্বপূর্ণ আরবি পাঠ ও বাংলা অর্থ</h2>' +
        '<div class="grid">' +
          '<div class="card"><strong>তাকবীরে তাহরীমা</strong><div class="ar" style="font-size:2rem;color:var(--primary);">اللَّهُ أَكْبَرُ</div><p>অর্থ: আল্লাহ সর্বশ্রেষ্ঠ।</p></div>' +
          '<div class="card"><strong>রুকুর তাসবীহ</strong><div class="ar" style="font-size:2rem;color:var(--primary);">سُبْحَانَ رَبِّيَ الْعَظِيمِ</div><p>অর্থ: আমার মহান রবের পবিত্রতা ঘোষণা করছি।</p></div>' +
          '<div class="card"><strong>সিজদার তাসবীহ</strong><div class="ar" style="font-size:2rem;color:var(--primary);">سُبْحَانَ رَبِّيَ الْأَعْلَىٰ</div><p>অর্থ: আমার সুমহান রবের পবিত্রতা ঘোষণা করছি।</p></div>' +
        '</div>' +
      '</div>'
    );
  }

  function getRoute() {
    var h = (window.location.hash || '#qa-home').replace(/^#/, '');
    if (h.indexOf('qa-') === 0) h = h.slice(3);
    return h || 'home';
  }

  function render() {
    var route = getRoute();
    var view = document.getElementById('view');
    if (!view) return;

    document.documentElement.setAttribute('data-age-mode', state.ageMode || 'kids');

    // Sync active nav classes on both Sidebar and Mobile Bottom Nav
    var links = document.querySelectorAll('[data-route]');
    for (var i = 0; i < links.length; i++) {
      var r = links[i].getAttribute('data-route');
      links[i].classList.toggle('active', r === route);
    }

    if (route === 'path') view.innerHTML = renderPath();
    else if (route === 'alphabet') view.innerHTML = renderAlphabet();
    else if (route === 'harakat') view.innerHTML = renderHarakat();
    else if (route === 'builder') view.innerHTML = renderBuilder();
    else if (route === 'words') view.innerHTML = renderWords();
    else if (route === 'kids' || route === 'quiz' || route === 'daily') view.innerHTML = renderKids();
    else if (route === 'flashcards') view.innerHTML = renderFlashcards();
    else if (route === 'last-ten') view.innerHTML = renderLastTen();
    else if (route === 'salah') view.innerHTML = renderSalah();
    else if (route === 'progress' || route === 'about') view.innerHTML = renderProgress();
    else view.innerHTML = renderHome();

    if (route === 'alphabet' && V4.bindTracingCanvas) {
      V4.bindTracingCanvas();
    }
    bindViewEvents();
    updateBadges();
  }

  function bindViewEvents() {
    // Letter selection
    var lCards = document.querySelectorAll('[data-letter-idx]');
    for (var i = 0; i < lCards.length; i++) {
      lCards[i].addEventListener('click', function () {
        state.selectedLetterIdx = Number(this.getAttribute('data-letter-idx'));
        if (state.learnedLetters.indexOf(state.selectedLetterIdx + 1) === -1) {
          state.learnedLetters.push(state.selectedLetterIdx + 1);
        }
        saveState();
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    var speakLetterBtn = document.getElementById('btn-speak-letter');
    if (speakLetterBtn) {
      speakLetterBtn.addEventListener('click', function () {
        var sel = ALPHABET[state.selectedLetterIdx] || ALPHABET[0];
        if (V4.speakArabic) V4.speakArabic(sel.glyph + ' ، ' + sel.exampleAr);
      });
    }

    var micLetterBtn = document.getElementById('btn-mic-letter');
    if (micLetterBtn) {
      micLetterBtn.addEventListener('click', function () {
        var sel = ALPHABET[state.selectedLetterIdx] || ALPHABET[0];
        if (V4.startSpeechCheck) V4.startSpeechCheck(sel.glyph, sel.nameBn, 'letter-mic-status', 'btn-mic-letter');
      });
    }

    // Harakat selection
    var hCars = document.querySelectorAll('[data-harakat-idx]');
    for (var j = 0; j < hCars.length; j++) {
      hCars[j].addEventListener('click', function () {
        state.selectedHarakatIdx = Number(this.getAttribute('data-harakat-idx'));
        saveState();
        render();
      });
    }

    var speakHarakatBtn = document.getElementById('btn-speak-harakat');
    if (speakHarakatBtn) {
      speakHarakatBtn.addEventListener('click', function () {
        var h = HARAKAT[state.selectedHarakatIdx] || HARAKAT[0];
        if (V4.speakArabic) V4.speakArabic(h.exampleAr);
      });
    }

    var micHarakatBtn = document.getElementById('btn-mic-harakat');
    if (micHarakatBtn) {
      micHarakatBtn.addEventListener('click', function () {
        var h = HARAKAT[state.selectedHarakatIdx] || HARAKAT[0];
        if (V4.startSpeechCheck) V4.startSpeechCheck(h.exampleAr, h.nameBn, 'harakat-mic-status', 'btn-mic-harakat');
      });
    }

    // Builder events
    var pickBtns = document.querySelectorAll('[data-pick]');
    for (var k = 0; k < pickBtns.length; k++) {
      pickBtns[k].addEventListener('click', function () {
        state.builderPicked.push(Number(this.getAttribute('data-pick')));
        saveState();
        render();
      });
    }

    var unpickBtns = document.querySelectorAll('[data-unpick]');
    for (var m = 0; m < unpickBtns.length; m++) {
      unpickBtns[m].addEventListener('click', function () {
        state.builderPicked.splice(Number(this.getAttribute('data-unpick')), 1);
        saveState();
        render();
      });
    }

    var resetBuilder = document.getElementById('btn-reset-builder');
    if (resetBuilder) {
      resetBuilder.addEventListener('click', function () {
        state.builderPicked = [];
        render();
      });
    }

    var nextBuilder = document.getElementById('btn-next-builder');
    if (nextBuilder) {
      nextBuilder.addEventListener('click', function () {
        state.builderIdx = (state.builderIdx + 1) % PUZZLES.length;
        state.builderPicked = [];
        window.QA_AddStar(1);
        render();
      });
    }

    var speakBuilder = document.getElementById('btn-speak-builder');
    if (speakBuilder) {
      speakBuilder.addEventListener('click', function () {
        var puz = PUZZLES[state.builderIdx % PUZZLES.length];
        if (V4.speakArabic) V4.speakArabic(puz.wordAr);
      });
    }

    // Word filters
    var searchIn = document.getElementById('word-search-input');
    if (searchIn) {
      searchIn.addEventListener('input', function () {
        state.wordSearch = this.value;
        render();
      });
    }
    var catSel = document.getElementById('word-cat-select');
    if (catSel) {
      catSel.addEventListener('change', function () {
        state.wordCat = this.value;
        render();
      });
    }

    // Generic speak buttons
    var speakBtns = document.querySelectorAll('[data-speak-ar]');
    for (var n = 0; n < speakBtns.length; n++) {
      speakBtns[n].addEventListener('click', function () {
        if (V4.speakArabic) V4.speakArabic(this.getAttribute('data-speak-ar'));
      });
    }

    // Kids quiz options
    var kidsOpts = document.querySelectorAll('[data-kids-opt]');
    for (var p = 0; p < kidsOpts.length; p++) {
      kidsOpts[p].addEventListener('click', function () {
        var idx = Number(this.getAttribute('data-kids-opt'));
        var qObj = KIDS_QUESTIONS[state.kidsQIdx % KIDS_QUESTIONS.length];
        state.kidsAnswered = idx;
        if (idx === qObj.correctIdx) window.QA_AddStar(1);
        render();
      });
    }
    var kidsNext = document.getElementById('btn-kids-next');
    if (kidsNext) {
      kidsNext.addEventListener('click', function () {
        state.kidsQIdx = (state.kidsQIdx + 1) % KIDS_QUESTIONS.length;
        state.kidsAnswered = null;
        render();
      });
    }
    var kidsListen = document.getElementById('btn-kids-listen');
    if (kidsListen) {
      kidsListen.addEventListener('click', function () {
        var qObj = KIDS_QUESTIONS[state.kidsQIdx % KIDS_QUESTIONS.length];
        if (V4.speakArabic) V4.speakArabic(qObj.glyph);
      });
    }
    var kidsMic = document.getElementById('btn-kids-mic');
    if (kidsMic) {
      kidsMic.addEventListener('click', function () {
        var qObj = KIDS_QUESTIONS[state.kidsQIdx % KIDS_QUESTIONS.length];
        if (V4.startSpeechCheck) V4.startSpeechCheck(qObj.glyph, qObj.options[qObj.correctIdx], 'kids-mic-status', 'btn-kids-mic');
      });
    }

    // Flashcard events
    var flashFlip = document.getElementById('btn-flash-flip');
    if (flashFlip) {
      flashFlip.addEventListener('click', function () {
        state.flashFlipped = !state.flashFlipped;
        render();
      });
    }
    var flashNext = document.getElementById('btn-flash-next');
    if (flashNext) {
      flashNext.addEventListener('click', function () {
        state.flashIdx = (state.flashIdx + 1) % DEFAULT_WORDS.length;
        state.flashFlipped = false;
        window.QA_AddStar(1);
        render();
      });
    }

    // Last 10 Surahs
    var sChips = document.querySelectorAll('[data-surah-id]');
    for (var q = 0; q < sChips.length; q++) {
      sChips[q].addEventListener('click', function () {
        state.selectedSurahId = Number(this.getAttribute('data-surah-id'));
        saveState();
        render();
      });
    }
    var surahLearned = document.getElementById('btn-surah-learned');
    if (surahLearned) {
      surahLearned.addEventListener('click', function () {
        if (state.learnedSurahs.indexOf(state.selectedSurahId) === -1) {
          state.learnedSurahs.push(state.selectedSurahId);
        }
        window.QA_AddStar(2);
      });
    }
  }

  // Global Header & Drawer Bindings
  function initShellEvents() {
    var navToggle = document.getElementById('nav-toggle');
    var sidebar = document.getElementById('sidebar');
    var backdrop = document.getElementById('sidebar-backdrop');

    function closeDrawer() {
      if (sidebar) sidebar.classList.remove('open');
      if (backdrop) backdrop.hidden = true;
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    }

    if (navToggle && sidebar) {
      navToggle.addEventListener('click', function () {
        var isOpen = sidebar.classList.toggle('open');
        if (backdrop) backdrop.hidden = !isOpen;
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
    if (backdrop) {
      backdrop.addEventListener('click', closeDrawer);
    }

    window.addEventListener('hashchange', function () {
      closeDrawer();
      render();
    });

    // Age Mode Switcher (5-9 Kids vs 10-15 Scholar)
    var kidsBtn = document.getElementById('mode-kids-btn');
    var scholarBtn = document.getElementById('mode-scholar-btn');
    if (kidsBtn && scholarBtn) {
      kidsBtn.addEventListener('click', function () {
        state.ageMode = 'kids';
        kidsBtn.classList.add('active');
        scholarBtn.classList.remove('active');
        saveState();
        render();
        toast('🎈 ৫–৯ বছরের কিডস মোড চালু হয়েছে');
      });
      scholarBtn.addEventListener('click', function () {
        state.ageMode = 'scholar';
        scholarBtn.classList.add('active');
        kidsBtn.classList.remove('active');
        saveState();
        render();
        toast('🎓 ১০–১৫ বছরের জুনিয়র স্কলার মোড চালু হয়েছে');
      });
    }

    // Tajweed Color Toggle
    var tjBtn = document.getElementById('btn-tajweed-toggle');
    if (tjBtn) {
      tjBtn.addEventListener('click', function () {
        state.tajweedOn = !state.tajweedOn;
        tjBtn.classList.toggle('active', state.tajweedOn);
        tjBtn.setAttribute('aria-pressed', state.tajweedOn ? 'true' : 'false');
        saveState();
        render();
        toast(state.tajweedOn ? '🌈 তাজবীদ কালার-কোডিং চালু হয়েছে' : 'তাজবীদ কালার-কোডিং বন্ধ করা হয়েছে');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initShellEvents();
    render();
  });
})();
