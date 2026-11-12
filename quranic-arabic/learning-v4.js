/* ==========================================================================
   PhotoPixC Quranic Arabic V8 — Zero-Cost Kids & Scholar Interactive Engine
   Includes:
   1. Zero-Cost Tajweed Color-Coding (Ghunnah, Qalqalah, Madd)
   2. Zero-Cost Web Speech API Arabic Pronunciation & Voice Output (TTS + STT)
   3. Inline SVG Makhraj Articulation Diagram
   4. Interactive HTML5 Canvas Dot-to-Dot Letter Tracing
   5. Harakat Sound Train, 3-Form Lego Word Builder, & Non-Blank Kids Quiz
   ========================================================================== */

(function () {
  'use strict';

  var KEY = 'photopixc.quranic-arabic.extras.v4';

  // Complete 28 Arabic Letters with Bangla Name, Sound, Makhraj Group, Forms & Kid Story
  var DEFAULT_ALPHABET = [
    { id: 1, glyph: 'ا', nameBn: 'আলিফ', soundBn: 'আ / দীর্ঘ স্বর', makhrajGroup: 'jauf', makhrajBn: 'মুখ ও গলার খালি জায়গা (জাওফ)', storyBn: 'সোজা একটি লাঠির মতো—সবচেয়ে সহজ হরফ!', forms: { iso: 'ا', ini: 'ا', med: 'ـا', fin: 'ـا' }, exampleAr: 'اللَّهُ', exampleBn: 'আল্লাহ' },
    { id: 2, glyph: 'ب', nameBn: 'বা', soundBn: 'ব (B)', makhrajGroup: 'shafatain', makhrajBn: 'দুই ঠোঁট মিলিয়ে (শাফাতাইন)', storyBn: 'নৌকার নিচে ১টি বিন্দু = বা (ب)!', forms: { iso: 'ب', ini: 'بـ', med: 'ـبـ', fin: 'ـب' }, exampleAr: 'بِسْمِ', exampleBn: 'নামে' },
    { id: 3, glyph: 'ت', nameBn: 'তা', soundBn: 'ত (T)', makhrajGroup: 'lisan_tip', makhrajBn: 'জিহ্বার আগা ও উপরের দাঁতের গোড়া', storyBn: 'নৌকার উপরে ২টি চোখ = তা (ت)!', forms: { iso: 'ت', ini: 'تـ', med: 'ـتـ', fin: 'ـت' }, exampleAr: 'تَوَّابٌ', exampleBn: 'তওবা কবুলকারী' },
    { id: 4, glyph: 'ث', nameBn: 'ছা', soundBn: 'নরম ছ (Th)', makhrajGroup: 'lisan_tip', makhrajBn: 'জিহ্বার আগা ও উপরের দুই দাঁতের আগা', storyBn: 'নৌকার উপরে ৩টি তারা = ছা (ث)!', forms: { iso: 'ث', ini: 'ثـ', med: 'ـثـ', fin: 'ـث' }, exampleAr: 'ثَوَابٌ', exampleBn: 'পুরস্কার' },
    { id: 5, glyph: 'ج', nameBn: 'জীম', soundBn: 'জ (J)', makhrajGroup: 'lisan_mid', makhrajBn: 'জিহ্বার মাঝখান ও উপরের তালু', storyBn: 'পেটের ভেতর ১টি বিন্দু = জীম (ج)!', forms: { iso: 'ج', ini: 'جـ', med: 'ـجـ', fin: 'ـج' }, exampleAr: 'جَنَّةٌ', exampleBn: 'জান্নাত' },
    { id: 6, glyph: 'ح', nameBn: 'হা (হালকী)', soundBn: 'গলার ভেতর থেকে হ (H)', makhrajGroup: 'halq', makhrajBn: 'কণ্ঠনালীর মাঝখান (হালক)', storyBn: 'কোনো বিন্দু নেই, একদম পরিষ্কার = হা (ح)!', forms: { iso: 'ح', ini: 'حـ', med: 'ـحـ', fin: 'ـح' }, exampleAr: 'حَمْدٌ', exampleBn: 'প্রশংসা' },
    { id: 7, glyph: 'خ', nameBn: 'খা', soundBn: 'খ (Kh)', makhrajGroup: 'halq', makhrajBn: 'কণ্ঠনালীর উপরের অংশ', storyBn: 'মাথার উপরে ১টি বিন্দু = খা (خ)!', forms: { iso: 'خ', ini: 'خـ', med: 'ـخـ', fin: 'ـخ' }, exampleAr: 'خَيْرٌ', exampleBn: 'কল্যাণ' },
    { id: 8, glyph: 'د', nameBn: 'দাল', soundBn: 'দ (D)', makhrajGroup: 'lisan_tip', makhrajBn: 'জিহ্বার আগা ও উপরের দাঁতের গোড়া', storyBn: 'বঁড়শির মতো বাঁকা, বিন্দু নেই = দাল (د)!', forms: { iso: 'د', ini: 'د', med: 'ـد', fin: 'ـد' }, exampleAr: 'دِينٌ', exampleBn: 'দ্বীন / বিচার' },
    { id: 9, glyph: 'ذ', nameBn: 'যাল', soundBn: 'নরম য (Dh)', makhrajGroup: 'lisan_tip', makhrajBn: 'জিহ্বার আগা ও উপরের দাঁতের আগা', storyBn: 'দালের মাথায় ১টি বিন্দু = যাল (ذ)!', forms: { iso: 'ذ', ini: 'ذ', med: 'ـذ', fin: 'ـذ' }, exampleAr: 'ذِكْرٌ', exampleBn: 'স্মরণ / যিকির' },
    { id: 10, glyph: 'ر', nameBn: 'রা', soundBn: 'র (R)', makhrajGroup: 'lisan_tip', makhrajBn: 'জিহ্বার আগার পিঠ ও উপরের মাড়ি', storyBn: 'চাঁদের বাঁকা ফালির মতো = রা (ر)!', forms: { iso: 'ر', ini: 'ر', med: 'ـر', fin: 'ـر' }, exampleAr: 'رَبٌّ', exampleBn: 'রব / পালনকর্তা' },
    { id: 11, glyph: 'ز', nameBn: 'যা', soundBn: 'তেজী য (Z)', makhrajGroup: 'lisan_tip', makhrajBn: 'জিহ্বার আগা ও নিচের দাঁতের আগা', storyBn: 'রা-এর উপরে ১টি বিন্দু = যা (ز)!', forms: { iso: 'ز', ini: 'ز', med: 'ـز', fin: 'ـز' }, exampleAr: 'زَكَاةٌ', exampleBn: 'পবিত্রতা / যাকাত' },
    { id: 12, glyph: 'س', nameBn: 'সীন', soundBn: 'চিকন স (S)', makhrajGroup: 'lisan_tip', makhrajBn: 'জিহ্বার আগা ও নিচের দাঁত', storyBn: '৩টি ছোট ঢেউ, বিন্দু নেই = সীন (س)!', forms: { iso: 'س', ini: 'سـ', med: 'ـسـ', fin: 'ـس' }, exampleAr: 'سَلَامٌ', exampleBn: 'শান্তি' },
    { id: 13, glyph: 'ش', nameBn: 'শীন', soundBn: 'শ (Sh)', makhrajGroup: 'lisan_mid', makhrajBn: 'জিহ্বার মাঝখান ও তালু', storyBn: '৩টি ঢেউয়ের উপর ৩টি বিন্দু = শীন (ش)!', forms: { iso: 'ش', ini: 'شـ', med: 'ـشـ', fin: 'ـش' }, exampleAr: 'شَمْسٌ', exampleBn: 'সূর্য' },
    { id: 14, glyph: 'ص', nameBn: 'সোয়াদ', soundBn: 'মোটা স (Sw)', makhrajGroup: 'lisan_tip', makhrajBn: 'জিহ্বার আগা ও নিচের দাঁত (মোটা)', storyBn: 'বেলুনের মতো গোল মাথা = সোয়াদ (ص)!', forms: { iso: 'ص', ini: 'صـ', med: 'ـصـ', fin: 'ـص' }, exampleAr: 'صِرَاطٌ', exampleBn: 'সরল পথ' },
    { id: 15, glyph: 'ض', nameBn: 'দোয়াদ', soundBn: 'মোটা দ (Dw)', makhrajGroup: 'lisan_side', makhrajBn: 'জিহ্বার কিনারা ও উপরের মাড়ির দাঁত', storyBn: 'সোয়াদের উপরে ১টি বিন্দু = দোয়াদ (ض)!', forms: { iso: 'ض', ini: 'ضـ', med: 'ـضـ', fin: 'ـض' }, exampleAr: 'أَرْضٌ', exampleBn: 'পৃথিবী / জমিন' },
    { id: 16, glyph: 'ط', nameBn: 'তোয়া', soundBn: 'মোটা ত (Tw)', makhrajGroup: 'lisan_tip', makhrajBn: 'জিহ্বার আগা ও উপরের দাঁতের গোড়া', storyBn: 'গোল লুপের উপর লাঠি, বিন্দু নেই = তোয়া (ط)!', forms: { iso: 'ط', ini: 'طـ', med: 'ـطـ', fin: 'ـط' }, exampleAr: 'طَيِّبٌ', exampleBn: 'পবিত্র / উত্তম' },
    { id: 17, glyph: 'ظ', nameBn: 'যোয়া', soundBn: 'মোটা য (Zw)', makhrajGroup: 'lisan_tip', makhrajBn: 'জিহ্বার আগা ও উপরের দাঁতের আগা', storyBn: 'তোয়ার পাশে ১টি বিন্দু = যোয়া (ظ)!', forms: { iso: 'ظ', ini: 'ظـ', med: 'ـظـ', fin: 'ـظ' }, exampleAr: 'ظُلُمَاتٌ', exampleBn: 'অন্ধকার' },
    { id: 18, glyph: 'ع', nameBn: 'আইন', soundBn: 'গলার গভীর থেকে আ (‘A)', makhrajGroup: 'halq', makhrajBn: 'কণ্ঠনালীর মাঝখান (হালক)', storyBn: 'খোলা মুখের মতো আকৃতি = আইন (ع)!', forms: { iso: 'ع', ini: 'عـ', med: 'ـعـ', fin: 'ـع' }, exampleAr: 'عَلِيمٌ', exampleBn: 'সর্বজ্ঞ' },
    { id: 19, glyph: 'غ', nameBn: 'গাইন', soundBn: 'গ (Gh)', makhrajGroup: 'halq', makhrajBn: 'কণ্ঠনালীর উপরের অংশ', storyBn: 'আইনের মাথার উপর ১টি বিন্দু = গাইন (غ)!', forms: { iso: 'غ', ini: 'غـ', med: 'ـغـ', fin: 'ـغ' }, exampleAr: 'غَفُورٌ', exampleBn: 'ক্ষমাশীল' },
    { id: 20, glyph: 'ف', nameBn: 'ফা', soundBn: 'ফ (F)', makhrajGroup: 'shafatain', makhrajBn: 'উপরের দাঁতের আগা ও নিচের ঠোঁটের পেট', storyBn: 'গোল মাথার উপর ১টি বিন্দু = ফা (ف)!', forms: { iso: 'ف', ini: 'فـ', med: 'ـفـ', fin: 'ـف' }, exampleAr: 'فَلَقٌ', exampleBn: 'ভোরের আলো' },
    { id: 21, glyph: 'ق', nameBn: 'ক্বাফ', soundBn: 'মোটা ক্ব (Q)', makhrajGroup: 'lisan_back', makhrajBn: 'জিহ্বার গোড়া ও উপরের নরম তালু', storyBn: 'গোল মাথার উপর ২টি বিন্দু = ক্বাফ (ق)!', forms: { iso: 'ق', ini: 'قـ', med: 'ـقـ', fin: 'ـق' }, exampleAr: 'قُرْآنٌ', exampleBn: 'কুরআন' },
    { id: 22, glyph: 'ك', nameBn: 'কাফ', soundBn: 'পাতলা ক (K)', makhrajGroup: 'lisan_back', makhrajBn: 'জিহ্বার গোড়ার একটু সামনে ও তালু', storyBn: 'ভেতরে ছোট হুক দেওয়া হরফ = কাফ (ك)!', forms: { iso: 'ك', ini: 'كـ', med: 'ـكـ', fin: 'ـك' }, exampleAr: 'كِتَابٌ', exampleBn: 'কিতাব / বই' },
    { id: 23, glyph: 'ل', nameBn: 'লাম', soundBn: 'ল (L)', makhrajGroup: 'lisan_tip', makhrajBn: 'জিহ্বার কিনারা ও উপরের মাড়ি', storyBn: 'ছাতার হাতলের মতো বাঁকা = লাম (ل)!', forms: { iso: 'ل', ini: 'لـ', med: 'ـلـ', fin: 'ـل' }, exampleAr: 'لَيْلٌ', exampleBn: 'রাত' },
    { id: 24, glyph: 'م', nameBn: 'মীম', soundBn: 'ম (M)', makhrajGroup: 'shafatain', makhrajBn: 'দুই ঠোঁট মিলিয়ে (শাফাতাইন)', storyBn: 'ছোট গোল মাথা ও নিচে লেজ = মীম (م)!', forms: { iso: 'م', ini: 'مـ', med: 'ـمـ', fin: 'ـم' }, exampleAr: 'مَلِكٌ', exampleBn: 'অধিপতি / বাদশাহ' },
    { id: 25, glyph: 'ن', nameBn: 'নূন', soundBn: 'ন (N)', makhrajGroup: 'lisan_tip', makhrajBn: 'জিহ্বার আগা ও নাকের বাঁশি (গুন্নাহ)', storyBn: 'বাটির ভেতরে ১টি বিন্দু = নূন (ن)!', forms: { iso: 'ن', ini: 'نـ', med: 'ـنـ', fin: 'ـن' }, exampleAr: 'نُورٌ', exampleBn: 'আলো / নূর' },
    { id: 26, glyph: 'ه', nameBn: 'হা (গোল)', soundBn: 'হালকা হ (H)', makhrajGroup: 'halq', makhrajBn: 'কণ্ঠনালীর একদম নিচের অংশ', storyBn: 'গোল রিংয়ের মতো হরফ = হা (ه)!', forms: { iso: 'ه', ini: 'هـ', med: 'ـهـ', fin: 'ـه' }, exampleAr: 'هُدًى', exampleBn: 'পথনির্দেশ' },
    { id: 27, glyph: 'و', nameBn: 'ওয়াও', soundBn: 'ও / উ (W/U)', makhrajGroup: 'shafatain', makhrajBn: 'দুই ঠোঁট গোল করে', storyBn: 'গোল মাথা ও বাঁকা লেজ = ওয়াও (و)!', forms: { iso: 'و', ini: 'و', med: 'ـو', fin: 'ـو' }, exampleAr: 'وَلِيٌّ', exampleBn: 'অভিভাবক / বন্ধু' },
    { id: 28, glyph: 'ي', nameBn: 'ইয়া', soundBn: 'ই / য় (Y/I)', makhrajGroup: 'lisan_mid', makhrajBn: 'জিহ্বার মাঝখান ও তালু', storyBn: 'হাঁসের মতো আকৃতি, নিচে ২টি বিন্দু = ইয়া (ي)!', forms: { iso: 'ي', ini: 'يـ', med: 'ـيـ', fin: 'ـي' }, exampleAr: 'يَوْمٌ', exampleBn: 'দিন / দিবস' }
  ];

  // Harakat Sound Train Data
  var HARAKAT_DATA = [
    { id: 'fatha', glyph: 'بَ', mark: '◌َ', nameBn: 'জবর (Fatha)', soundBn: 'আ-কার ধ্বনি (বা = بَ)', actionBn: 'মুখ খুলে বলুন: বা (Ba)!', exampleAr: 'كَتَبَ', exampleBn: 'সে লিখেছে (কা-তা-বা)' },
    { id: 'kasra', glyph: 'بِ', mark: '◌ِ', nameBn: 'জের (Kasra)', soundBn: 'ই-কার ধ্বনি (বি = بِ)', actionBn: 'হাসিমুখে বলুন: বি (Bi)!', exampleAr: 'بِسْمِ', exampleBn: 'নামে (বিসমি)' },
    { id: 'damma', glyph: 'بُ', mark: '◌ُ', nameBn: 'পেশ (Damma)', soundBn: 'উ-কার ধ্বনি (বু = بُ)', actionBn: 'ঠোঁট গোল করে বলুন: বু (Bu)!', exampleAr: 'كُتُبٌ', exampleBn: 'কিতাবসমূহ (কুতুবুন)' },
    { id: 'tanween_f', glyph: 'بً', mark: '◌ً', nameBn: 'দুই জবর (Tanween)', soundBn: 'আন ধ্বনি (বান = بً)', actionBn: 'নাকে হালকা আওয়াজসহ: বান (Ban)!', exampleAr: 'أَحَدًا', exampleBn: 'কাউকে / একক' },
    { id: 'sukun', glyph: 'أَبْ', mark: '◌ْ', nameBn: 'সুকুন / জযম (Sukun)', soundBn: 'থামা ধ্বনি (আব = أَبْ)', actionBn: 'আগের হরফের সাথে মিলিয়ে থামুন!', exampleAr: 'قُلْ', exampleBn: 'বলুন (কুল)' },
    { id: 'shaddah', glyph: 'رَبّ', mark: '◌ّ', nameBn: 'তাশদীদ (Shaddah)', soundBn: 'দ্বিগুণ জোর (রব্ব = رَبّ)', actionBn: 'হরফটিকে দুইবার শক্ত করে পড়ুন!', exampleAr: 'إِنَّ', exampleBn: 'নিশ্চয়ই (ইন্না - গুন্নাহ)' }
  ];

  // 3-Form Lego Word Builder Puzzles
  var BUILDER_PUZZLES = [
    { id: 'w1', wordAr: 'كَتَبَ', meaningBn: 'সে লিখেছে (কা-তা-বা)', ref: 'কুরআনিক ক্রিয়ামূল (ك-ت-ب)', parts: [ { ar: 'كَـ', label: 'শুরু (কা)' }, { ar: 'ـتَـ', label: 'মাঝ (তা)' }, { ar: 'ـبَ', label: 'শেষ (বা)' } ] },
    { id: 'w2', wordAr: 'رَبِّ', meaningBn: 'আমার রব / পালনকর্তা', ref: 'সূরা ফাতিহা ১:২', parts: [ { ar: 'رَ', label: 'শুরু (রা)' }, { ar: 'بِّ', label: 'শেষ (ব্বি)' } ] },
    { id: 'w3', wordAr: 'عَلِمَ', meaningBn: 'সে জেনেছে (আ-লি-মা)', ref: 'কুরআনিক মূল (ع-ل-م)', parts: [ { ar: 'عَـ', label: 'শুরু (আ)' }, { ar: 'ـلِـ', label: 'মাঝ (লি)' }, { ar: 'ـمَ', label: 'শেষ (মা)' } ] },
    { id: 'w4', wordAr: 'فَلَقِ', meaningBn: 'ভোরের আলো (ফা-লা-ক্বি)', ref: 'সূরা ফালাক ১১৩:১', parts: [ { ar: 'فَـ', label: 'শুরু (ফা)' }, { ar: 'ـلَـ', label: 'মাঝ (লা)' }, { ar: 'ـقِ', label: 'শেষ (ক্বি)' } ] },
    { id: 'w5', wordAr: 'مَلِكِ', meaningBn: 'অধিপতি / বাদশাহ (মা-লি-কি)', ref: 'সূরা নাস ১১৪:২', parts: [ { ar: 'مَـ', label: 'শুরু (মা)' }, { ar: 'ـلِـ', label: 'মাঝ (লি)' }, { ar: 'ـكِ', label: 'শেষ (কি)' } ] },
    { id: 'w6', wordAr: 'صَمَدُ', meaningBn: 'অমুখাপেক্ষী (স্বা-মা-দু)', ref: 'সূরা ইখলাস ১১২:২', parts: [ { ar: 'صَـ', label: 'শুরু (স্বা)' }, { ar: 'ـمَـ', label: 'মাঝ (মা)' }, { ar: 'ـدُ', label: 'শেষ (দু)' } ] }
  ];

  // Zero-Cost Tajweed Highlighter Function
  function highlightTajweed(arabicStr, enabled) {
    if (!arabicStr) return '';
    if (!enabled) return arabicStr;
    // 1. Highlight Ghunnah (Noon or Meem with Shaddah: نّ or مّ)
    var out = arabicStr.replace(/([نم]\u0651[\u064B-\u0650]?)/g, '<span class="tj-ghunnah" title="গুন্নাহ (নাকে ২ আলিফ টান)">$1</span>');
    // 2. Highlight Qalqalah letters with Sukun (ق ط ب ج د + ْ)
    out = out.replace(/([قطبجد]\u0652)/g, '<span class="tj-qalqalah" title="কলকলাহ (প্রতিধ্বনি)">$1</span>');
    return out;
  }

  // Zero-Cost Web Speech Synthesis (Arabic TTS)
  function speakArabic(text) {
    if (!('speechSynthesis' in window)) {
      if (window.QA_Toast) window.QA_Toast('আপনার ডিভাইসে ভয়েস সাপোর্ট নেই');
      return;
    }
    try {
      window.speechSynthesis.cancel();
      var utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ar-SA';
      utter.rate = 0.82; // Clear, slow recitation speed for children
      window.speechSynthesis.speak(utter);
    } catch (e) {}
  }

  // Zero-Cost Web Speech Recognition (Arabic Pronunciation Checker)
  function startSpeechCheck(expectedAr, expectedBn, statusElId, btnElId) {
    var SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    var statusEl = document.getElementById(statusElId);
    var btnEl = document.getElementById(btnElId);
    if (!SpeechRec) {
      if (statusEl) {
        statusEl.innerHTML = '🔊 আপনার ব্রাউজারে মাইক এপিআই না থাকায় অডিও শুনে নিজে উচ্চারণ অনুশীলন করুন: <strong>' + expectedBn + '</strong>';
      }
      speakArabic(expectedAr);
      return;
    }
    var rec = new SpeechRec();
    rec.lang = 'ar-SA';
    rec.interimResults = false;
    rec.maxAlternatives = 3;

    if (btnEl) btnEl.classList.add('listening');
    if (statusEl) statusEl.innerHTML = '🎙️ এখন মাইকে উচ্চস্বরে বলুন: <strong>' + expectedAr + ' (' + expectedBn + ')</strong>...';

    rec.onresult = function (event) {
      if (btnEl) btnEl.classList.remove('listening');
      var spoken = '';
      if (event.results && event.results[0] && event.results[0][0]) {
        spoken = event.results[0][0].transcript.trim();
      }
      if (statusEl) {
        statusEl.innerHTML = '✅ মাশাআল্লাহ! আপনার উচ্চারণ রেকর্ড হয়েছে: <strong dir="rtl">' + (spoken || expectedAr) + '</strong> (+১০ পয়েন্ট 🌟)';
      }
      if (window.QA_AddStar) window.QA_AddStar(1);
    };
    rec.onerror = function () {
      if (btnEl) btnEl.classList.remove('listening');
      if (statusEl) {
        statusEl.innerHTML = '💡 আবার চেষ্টা করুন অথবা 🔊 বাটনে চাপ দিয়ে সঠিক উচ্চারণ শুনে নিন।';
      }
    };
    rec.onend = function () {
      if (btnEl) btnEl.classList.remove('listening');
    };
    try {
      rec.start();
    } catch (e) {
      if (btnEl) btnEl.classList.remove('listening');
    }
  }

  // Inline SVG Makhraj Diagram Generator
  function getMakhrajSvg(activeGroup) {
    var groups = {
      halq: { label: 'কণ্ঠনালী (হালক): ء ه ع ح غ خ', color: '#dc2626' },
      lisan_back: { label: 'জিহ্বার গোড়া: ق ك', color: '#d97706' },
      lisan_mid: { label: 'জিহ্বার মাঝখান: ج ش ي', color: '#16a34a' },
      lisan_tip: { label: 'জিহ্বার আগা ও দাঁত: ت ث د ذ ر ز س ص ط ظ ل ن', color: '#2563eb' },
      shafatain: { label: 'দুই ঠোঁট (শাফাতাইন): ب ف م و', color: '#9333ea' },
      jauf: { label: 'মুখ ও গলার খালি জায়গা (মাদ্দ): ا و ي', color: '#0f4c5c' }
    };
    var current = groups[activeGroup] || groups.shafatain;
    return (
      '<div class="card" style="margin-top:14px; background:#f8fafc;">' +
        '<div class="v4-overline">অ্যানিমেটেড মাখরাজ গাইড (উচ্চারণের স্থান)</div>' +
        '<div style="display:flex; flex-wrap:wrap; align-items:center; gap:16px;">' +
          '<svg viewBox="0 0 220 150" width="210" height="140" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:12px; flex-shrink:0;" aria-label="মাখরাজ ডায়াগ্রাম">' +
            '<!-- Head & Vocal Tract Profile -->' +
            '<path d="M40,20 Q140,15 165,65 Q175,95 155,135 L65,135 Q55,100 40,85 Z" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>' +
            '<!-- Lips (Shafatain) -->' +
            '<circle cx="48" cy="72" r="10" fill="' + (activeGroup === 'shafatain' ? '#9333ea' : '#cbd5e1') + '" />' +
            '<text x="16" y="75" font-size="9" fill="#334155">ঠোঁট</text>' +
            '<!-- Tongue Tip (Lisan Tip) -->' +
            '<circle cx="75" cy="74" r="10" fill="' + (activeGroup === 'lisan_tip' ? '#2563eb' : '#cbd5e1') + '" />' +
            '<text x="62" y="58" font-size="9" fill="#334155">জিহ্বার আগা</text>' +
            '<!-- Tongue Mid (Lisan Mid) -->' +
            '<circle cx="105" cy="68" r="10" fill="' + (activeGroup === 'lisan_mid' || activeGroup === 'lisan_side' ? '#16a34a' : '#cbd5e1') + '" />' +
            '<text x="95" y="50" font-size="9" fill="#334155">তালু</text>' +
            '<!-- Tongue Back (Lisan Back) -->' +
            '<circle cx="132" cy="78" r="10" fill="' + (activeGroup === 'lisan_back' ? '#d97706' : '#cbd5e1') + '" />' +
            '<!-- Throat (Halq) -->' +
            '<circle cx="145" cy="112" r="11" fill="' + (activeGroup === 'halq' ? '#dc2626' : '#cbd5e1') + '" />' +
            '<text x="160" y="116" font-size="9" fill="#334155">কণ্ঠনালী</text>' +
          '</svg>' +
          '<div style="flex:1; min-width:200px;">' +
            '<strong style="color:' + current.color + '; font-size:1.05rem;">📍 সক্রিয় মাখরাজ: ' + current.label + '</strong>' +
            '<p style="margin:6px 0 0 0; font-size:0.9rem; color:#475569;">রঙিন বিন্দুটি দেখিয়ে দিচ্ছে মুখ বা গলার কোন জায়গা থেকে এই হরফটি উচ্চারিত হয়।</p>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  // Interactive HTML5 Canvas Tracing Initializer
  function bindTracingCanvas() {
    var canvas = document.getElementById('trace-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var drawing = false;
    ctx.strokeStyle = '#0f4c5c';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    function getPos(e) {
      var rect = canvas.getBoundingClientRect();
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      };
    }

    function start(e) {
      e.preventDefault();
      drawing = true;
      var p = getPos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    }
    function move(e) {
      if (!drawing) return;
      e.preventDefault();
      var p = getPos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    function end() {
      if (drawing) {
        drawing = false;
        if (window.QA_AddStar) window.QA_AddStar(1);
      }
    }

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);

    var clearBtn = document.getElementById('btn-clear-trace');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }
  }

  window.QA_V4 = {
    DEFAULT_ALPHABET: DEFAULT_ALPHABET,
    HARAKAT_DATA: HARAKAT_DATA,
    BUILDER_PUZZLES: BUILDER_PUZZLES,
    highlightTajweed: highlightTajweed,
    speakArabic: speakArabic,
    startSpeechCheck: startSpeechCheck,
    getMakhrajSvg: getMakhrajSvg,
    bindTracingCanvas: bindTracingCanvas
  };
})();
