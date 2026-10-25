# PhotoPixc Learning Academy — V8.0 QA ও Release Report

**Release date:** ২০ অক্টোবর ২০২৬  
**Based on:** V7.9 Full Site  
**Scope:** Google Ads, Meta Ads, Quranic Arabic, Skill Lab 45 এবং Portal

## এই সংস্করণে বাস্তব সংশোধন

1. **Google Ads Offline Cache Fix:** `google-ads/lesson-language.js` precache-এ যোগ হয়েছে এবং Cache version নবায়ন করা হয়েছে। আগের Google Ads Offline Copy থাকলে নতুন সংস্করণ অনলাইনে একবার খোলা ও Offline Copy আবার Enable/Update করা দরকার হতে পারে।
2. **School Navigation:** Google Ads, Meta Ads ও Quranic Arabic মেনুতে Skill Lab 45-এর লিংক যুক্ত। আগে থেকেই থাকা স্কুলের URL ও Lesson Hash অপরিবর্তিত।
3. **Portal Accessibility:** Keyboard ব্যবহারকারীদের জন্য মূল Course Card তালিকায় যাওয়ার Skip Link ও reduced-motion styling যোগ।
4. **Version & Metadata:** Skill Lab Page Title, `VERSION.txt` এবং Sitemap-এর তারিখ সংশোধন।
5. **Data Preservation:** কোনো Progress Storage Key, Quiz Bank, Lesson Content, Arabic Verse, Word Meaning, বা Simulation Model পরিবর্তন করা হয়নি।

## স্বয়ংক্রিয় ও গঠনগত QA

- PASS: HTML local refs and duplicate ids
- PASS: CSS URLs resolve
- PASS: JS all parse
- PASS: Google offline HTML scripts cached
- PASS: Google and Meta quiz indices
- PASS: Arabic word IDs and mandatory fields
- PASS: Arabic alphabet has 28 primary letters
- PASS: Skill Lab day sequence
- PASS: Skill Lab storage key maintained
- PASS: School cross-links

### যাচাইকৃত তথ্য

- Google Ads Quiz: **2040** প্রশ্ন / 102 Lesson ID; উত্তর-সূচির গঠনগত ভুল 0।
- Meta Ads Quiz: **1920** প্রশ্ন / 96 Lesson ID; উত্তর-সূচির গঠনগত ভুল 0।
- Quranic Arabic: **28** অক্ষর, **268** Word Entry, **12** নামাজ বিভাগের সম্পূর্ণ সূরা (এর মধ্যে শেষ ১০টি সূরা অন্তর্ভুক্ত)।
- Skill Lab: **45** দিনের পাঠ, দিন নম্বর ধারাবাহিক: True।
- মোট JavaScript ফাইল: **35**।
- মোট HTML Page: **5**।

## যা এখনো প্রমাণিত নয় (অবশ্যই পড়ুন)

- **পূর্ণ Content Accuracy:** প্রত্যেকটি Quiz-এর সঠিক উত্তর, সব ৪৫ দিনের শিক্ষা-ব্যাখ্যা, Google/Meta-এর বর্তমান Platform UI ইত্যাদি বিশেষজ্ঞ দ্বারা পূর্ণাঙ্গভাবে যাচাই করা হয়নি। শুধু উত্তর-সূচি সঠিক সীমার মধ্যে আছে—এটি বিষয়গত নির্ভুলতা প্রমাণ করে না।
- **Arabic Religious Review:** প্রতিটি কুরআনিক আয়াতের শুদ্ধ তিলাওয়াত, হরকত, বাংলা উচ্চারণ, অর্থ ও নামাজ পদ্ধতি যোগ্য শিক্ষক/ক্বারির হাতে যাচাই করা দরকার। কোড পরীক্ষার ফল দিয়ে ধর্মীয় শুদ্ধতার নিশ্চয়তা দেওয়া যায় না।
- **Live Hosting:** `learn.photopixc.com`-এ এই ZIP আপলোড/সার্ভার-ক্যাশ/CDN/রিয়েল ডিভাইস পরীক্ষা করা হয়নি।
- **Progress:** LocalStorage একই আছে; তবু Browser Storage Clear, Private Browsing, Domain change বা ভুল Import করলে ব্যবহারকারীর ডেটা হারাতে পারে। আগে JSON Export/Backup দরকার।
- **Offline:** Google Ads-এর পুরোনো Offline Copy পুনঃইনস্টল করে Flight Mode-এ নিজে পরীক্ষা করতে হবে; চারটি স্কুল Offline কাজ করবে এমন দাবি করা হচ্ছে না।

## Publish Checklist

1. লাইভ সাইট ও বিদ্যমান Progress-এর Backup নিন।
2. **V7.9 সত্যিই Install করা থাকলে V8 Update Only ZIP**-টি `learn.photopixc.com`-এর Document Root-এ Extract করুন। অন্য Version বা সন্দেহ হলে পূর্ণ ZIP ব্যবহার করুন; আগে Backup।
3. ফোল্ডার Delete করবেন না; পরিবর্তিত ফাইলগুলো Overwrite করুন।
4. Browser-এ Hard Refresh (`Cmd+Shift+R`) করুন। Google Ads Offline Copy ব্যবহৃত হলে Reinstall/Update করে offline পরীক্ষা করুন।
5. Google → Skill Lab, Meta → Skill Lab, Quran → Skill Lab এবং Skill Lab → Portal লিংক পরীক্ষা করুন।
6. Quiz, Word Card, Budget Simulator, Capstone, Export/Import, মোবাইলের Navigation ও অডিও/আরবি ফন্ট বাস্তব ডিভাইসে পরীক্ষা করুন।
7. QA বা ধর্মীয় ভাষাগত Review অসম্পূর্ণ থাকা অবস্থায় '100% content verified' বলে ঘোষণা করবেন না।

**Release status:** *Technical Audit Candidate* — Live QA ও Subject-matter review-এর পর Stable হিসেবে ঘোষণা করা যাবে।

## In-memory Chromium Browser Smoke Test (২০ অক্টোবর ২০২৬)

- Portal, Google Ads, Meta Ads, Quranic Arabic এবং Skill Lab 45 — **৫টি পেজ × Desktop/Mobile = ১০টি rendering test**।
- সঠিক `defer` script execution order অনুকরণ করে পরীক্ষা: **১০/১০ page JS runtime error-free**।
- ৩৯০px Mobile width-এ **১০/১০ পেজে page-level horizontal overflow পাওয়া যায়নি**।
- Arabic Word Page route-এ শব্দ শেখার UI প্রদর্শিত; Skill Lab-এর পাঁচটি প্রধান মেনু অক্ষত।
- Google ও Meta দুই পাঠশালার Sidebar populated; তিনটি পাঠশালা থেকে Skill Lab লিংক উপস্থিত।
- **সীমা:** Browser test ইচ্ছাকৃতভাবে HTML/JavaScript/CSS in-memory load করেছে, সত্যিকারের HTTP/Hosting, Service Worker Cache, Network, Hardware Audio, Storage Permissions বা সংযোগের সব আচরণ যাচাই করেনি।
