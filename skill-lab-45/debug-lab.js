/* PhotoPixc Skill Lab 45 — Real-World Troubleshooting & Debug Lab.
   Offline, free, interactive decision arena for critical marketing & tracking bugs. */
'use strict';
(function () {
  var CHALLENGES = [
    {
      id: "deb-01",
      tag: "GA4 E-COMMERCE",
      title: "ডুপ্লিকেট পারচেজ রহস্য — GA4-এ দ্বিগুণ সেল",
      complaint: "আমার Shopify স্টোরে আজ মোট ২০টি অর্ডার এসেছে, কিন্তু GA4 রিপোর্ট চেক করে দেখি ৩৪টি purchase কাউন্ট হয়েছে! এর ফলে অ্যাড একাউন্টে কাল্পনিক ROAS দেখাচ্ছে এবং ভুল সিদ্ধান্তের ঝুঁকি তৈরি হয়েছে।",
      consoleTitle: "GTM DEBUGGER & NETWORK INSPECTION",
      consoleBadge: "HIGH INFLATION RISK",
      consoleType: "error",
      consoleSnippet: 
`[GTM-PREVIEW] Event Fired: purchase
Page URL: mystore.com/checkouts/thank_you?order_id=ORD-9481
DataLayer: {
  event: "purchase",
  ecommerce: {
    transaction_id: "ORD-9481",
    value: 1250,
    currency: "BDT"
  }
}
[USER ACTION]: Customer reloads order status page 2 days later...
[GTM-PREVIEW] Event Fired: purchase (AGAIN!) ❌
DataLayer: { transaction_id: "ORD-9481" } ⚠️ Duplicate Recorded!`,
      question: "থ্যাঙ্ক-ইউ পেজ রিফ্রেশ বা রি-ভিজিটে ডুপ্লিকেট সেল বন্ধ করার সবচেয়ে প্রফেশনাল সমাধান কোনটি?",
      options: [
        "থ্যাঙ্ক ইউ পেজের Purchase ট্যাগ পুরোপুরি বন্ধ করে শুধু AddToCart ট্র্যাক করা।",
        "GTM-এ Custom JavaScript বা LocalStorage / 1st Party Cookie ব্যবহার করে একবার ফায়ার হওয়া transaction_id সংরক্ষণ করা এবং পরবর্তীতে একই আইডিতে ট্যাগ ফায়ার ব্লক করা।",
        "ফেসবুক বা গুগলের সাপোর্ট সেন্টারে ইমেইল পাঠিয়ে অপেক্ষা করা।"
      ],
      correct: 1,
      explanation: "Shopify বা যেকোনো কাস্টম ই-কমার্সে থ্যাঙ্ক ইউ পেজ রিফ্রেশ দিলে প্রতিবার ট্যাগ ফায়ার হয়। প্রফেশনাল মার্কেটাররা GTM-এ একটি কাস্টম কুকি বা লোকালস্টোরেজ দিয়ে চেক করেন—যদি `ORD-9481` আগেই একবার সেভ হয়ে থাকে, তবে ট্রিগার এক্সেপশনে ব্লক করা হয়। ফলে একজন ইউজার যতবারই পেজ রিফ্রেশ করুক, GA4-এ পারচেজ কেবল একবারই যাবে।",
      proTakeaway: "গোল্ডেন রুল: সবসময় Purchase ট্যাগের সাথে `transaction_id` ডি-ডুপ্লিকেশন চেক যুক্ত রাখুন। এটি ক্লায়েন্টের বিজ্ঞাপনের ডেটা নির্ভুল রাখার মৌলিক শর্ত।"
    },
    {
      id: "deb-02",
      tag: "META SERVER-SIDE CAPI",
      title: "Event Match Quality ৩.২/১০ — মেটা সার্ভার ট্র্যাকিং ড্রপ",
      complaint: "Meta Events Manager-এ লাল ওয়ার্নিং: 'Event Match Quality Low (3.2/10)'। বিজ্ঞাপনের Cost Per Purchase ৪০% বেড়ে গেছে এবং অ্যাড অপ্টিমাইজেশন ঠিকমতো কাজ করছে না।",
      consoleTitle: "META CAPI GRAPH API PAYLOAD INSPECTION",
      consoleBadge: "LOW MATCH QUALITY",
      consoleType: "error",
      consoleSnippet:
`POST https://graph.facebook.com/v19.0/123456789/events
Payload:
{
  "data": [{
    "event_name": "Purchase",
    "event_time": 1718901234,
    "user_data": {
      "client_ip_address": "103.205.71.12",
      "client_user_agent": "Mozilla/5.0 (iPhone...)"
      // ⚠️ Missing: em (email), ph (phone), fbp, fbc, external_id!
    }
  }]
}
Response: HTTP 200 OK (Event Received, but Match Quality Score: 3.2)`,
      question: "Meta CAPI-এর Event Match Quality ৮+ এ উন্নীত করতে পে-লোডে কোন পরিবর্তনটি আনা অপরিহার্য?",
      options: [
        "অ্যাডের দৈনিক বাজেট দ্বিগুণ করে দেওয়া যাতে বেশি ইভেন্ট যায়।",
        "চেকআউট ফর্ম বা DataLayer থেকে কাস্টমারের Email ও Phone নম্বর সংগ্রহ করে তা SHA-256 হ্যাশ (Hash) আকারে `em` এবং `ph` প্যারামিটারে পাঠানো।",
        "সার্ভার-সাইড ট্র্যাকিং সম্পূর্ণ মুছে দিয়ে শুধু ব্রাউজার পিক্সেলের ওপর নির্ভর করা।"
      ],
      correct: 1,
      explanation: "শুধু আইপি অ্যাড্রেস এবং ইউজার এজেন্টের ওপর নির্ভর করলে মেটা বেশিরভাগ ইউজারকে প্রোফাইলের সাথে মেলাতে পারে না। কাস্টমারের ইমেইল ও ফোন নম্বরকে নরম্যালাইজ করে (সব ছোট হাতের অক্ষর, কান্ট্রি কোড সহ) SHA-256 এনক্রিপ্ট করে মেটাতে পাঠালে ম্যাচ কোয়ালিটি নিমিষেই ৮.৫+ এ চলে যায় এবং অ্যাড পারফরম্যান্স দারুণ উন্নত হয়।",
      proTakeaway: "মেটা CAPI-এর প্রাণ হলো কাস্টমার প্যারামিটার (Email, Phone, FBP, FBC)। এগুলোর হ্যাশ ছাড়া CAPI কার্যকর ফল দিতে পারে না।"
    },
    {
      id: "deb-03",
      tag: "GOOGLE SEARCH ADS",
      title: "বাজেট শেষ, ৮০টি ক্লিক, কিন্তু কল বা সেল ০!",
      complaint: "আমি ঢাকার একজন এমার্জেন্সি প্লাম্বার। গুগল সার্চ অ্যাডে একদিনে ৫,০০০ টাকা খরচ হয়ে ৮০টি ক্লিক এসেছে, কিন্তু একজন গ্রাহকও কল দিল না! গুগলে টাকা জলে যাচ্ছে কেন?",
      consoleTitle: "SEARCH TERMS REPORT ANALYSIS",
      consoleBadge: "BUDGET WASTAGE DETECTED",
      consoleType: "error",
      consoleSnippet:
`Campaign: Plumber Service | Bidding: Maximize Clicks
Target Keyword: plumber (Broad Match)
-----------------------------------------------------------
Actual Search Query                | Clicks | Cost
-----------------------------------------------------------
"plumber kaj kivabe shikbo"        |   28   | ৳1,680  (শেখার কন্টেন্ট!)
"free plumbing tools list bd"      |   22   | ৳1,320  (ফ্রি যন্ত্রপাতি!)
"plumber job salary in dubai"      |   18   | ৳1,080  (চাকরির খোঁজ!)
"emergency plumber near me"        |    2   | ৳120    (আসল কাস্টমার!)
-----------------------------------------------------------
Total: ৳4,200 বাজেটের ৮৫% অপব্যয় হয়েছে অপ্রাসঙ্গিক কোয়েরিতে!`,
      question: "এই লোকাল বিজনেসটির বিজ্ঞাপন থেকে তৎক্ষণাৎ আসল গ্রাহকদের কল পাওয়ার জন্য সঠিক স্ট্র্যাটেজি কোনটি?",
      options: [
        "নেগেটিভ কী-ওয়ার্ড (`kaj`, `job`, `free`, `salary`, `shikbo`) যুক্ত করা এবং কী-ওয়ার্ডকে Broad Match থেকে বদলে Phrase Match (`\"emergency plumber\"`, `\"plumber service\"`) করা।",
        "বিজ্ঞাপনের বাজেট বাড়িয়ে দিনে ২০,০০০ টাকা করা যাতে আরও বেশি মানুষ দেখে।",
        "ওয়েবসাইটের সমস্ত টেক্সট ও ছবি নীল রঙের বদলে হলুদ রঙে পরিবর্তন করা।"
      ],
      correct: 0,
      explanation: "লোকাল সার্ভিসে অনিয়ন্ত্রিত Broad Match ব্যবহারের ফলে যারা কাজ শিখতে বা চাকরির তথ্য খুঁজতে এসেছে তারা ক্লিক করে ক্লায়েন্টের টাকা নষ্ট করে দিয়েছে। নেগেটিভ কী-ওয়ার্ড দিয়ে অপ্রাসঙ্গিক সার্চ বন্ধ করা এবং হাই-ইনটেন্ট Phrase Match ব্যবহার করলেই কেবল আসল জরুরি ক্রেতারা কল দেবে।",
      proTakeaway: "সার্চ ক্যাম্পেইন চালুর প্রথম দিনেই একটি শক্তিশালী Negative Keyword List তৈরি করা একজন দক্ষ মার্কেটারের প্রধান দায়িত্ব।"
    },
    {
      id: "deb-04",
      tag: "CONSENT MODE V2",
      title: "কুকি ব্যানার লাগানোর পর সেল ট্র্যাকিং উধাও",
      complaint: "ইউরোপীয় ভিজিটরদের জন্য সাইটে Cookiebot ব্যানার সক্রিয় করার পর থেকে গুগল কনভার্সন ট্র্যাকিংয়ে শূন্য কনভার্সন দেখাচ্ছে! অথচ আমাদের সেল আগের মতোই হচ্ছে। কী হলো?",
      consoleTitle: "GTM CONSENT TIMELINE DEBUGGER",
      consoleBadge: "TAG BLOCKAGE ISSUE",
      consoleType: "error",
      consoleSnippet:
`Time 0.8s: Consent Default State: ad_storage = "denied", ad_user_data = "denied"
Time 1.2s: [EVENT] Container Loaded -> Conversion Tag Attempted to Fire
Result: ❌ Tag Blocked by Consent Settings (User hasn't clicked Accept yet!)
Time 5.1s: User clicks "Accept All" -> Consent Updated: ad_storage = "granted"
Problem: Conversion Tag fired at 1.2s when denied, and NEVER fired again after consent granted!`,
      question: "কনসেন্ট ব্যানার থাকার পরও সঠিক ডেটা ট্র্যাকিং নিশ্চিত করার উপায় কী?",
      options: [
        "আইন ভঙ্গ করে ওয়েবসাইট থেকে সব ধরনের কুকি ব্যানার ডিলিট করে দেওয়া।",
        "Google Advanced Consent Mode কনফিগার করা যাতে কুকি ছাড়াও পিং (Cookieless Pings) পাঠায় এবং ট্যাগ ট্রিগারিং কনসেন্ট আপডেটের সাথে সমন্বয় করা।",
        "গুগল ট্যাগ বাদ দিয়ে শুধুমাত্র সোশ্যাল মিডিয়া ট্র্যাকিং চালানো।"
      ],
      correct: 1,
      explanation: "গুগল কনসেন্ট মোড ভি২-তে ইউজার সম্মতি না দিলেও গুগল অ্যানোনিমাস কুকিলেস পিং দিয়ে কনভার্সন মডেলিং করতে পারে। কিন্তু ট্যাগ যদি কনসেন্ট দেওয়ার আগের সময়ে একবারই ফায়ার হয়ে ব্লক হয়ে যায়, তবে কোনো ডেটা যায় না। Advanced Consent Mode এবং সঠিক ইভেন্ট সিকোয়েন্সিং নিশ্চিত করলেই ইউরোপের কঠোর গোপনীয়তা নীতি মেনেও পূর্ণ কনভার্সন ডেটা পাওয়া যায়।",
      proTakeaway: "Consent Mode V2 এখন গ্লোবাল স্ট্যান্ডার্ড। ট্যাগ ফায়ারিং আর কনসেন্ট আপডেটের টাইমিং ঠিক না থাকলে ক্যাম্পেইন ডেটা অন্ধ হয়ে যাবে।"
    },
    {
      id: "deb-05",
      tag: "CRO & FUNNEL OPTIMIZATION",
      title: "Add to Cart ৫০০টি, কিন্তু Checkout মাত্র ২টি!",
      complaint: "আমার অনলাইন ফ্যাশন স্টোরে গত সপ্তাহে ৫০০ জনেরও বেশি মানুষ পণ্য কার্টে যোগ করেছে (Add to Cart), কিন্তু কেনাকাটা সম্পন্ন করেছে মাত্র ২ জন! ফানেল কোথায় ভাঙল?",
      consoleTitle: "E-COMMERCE FUNNEL DROP-OFF AUDIT",
      consoleBadge: "HIGH FRICTION DETECTED",
      consoleType: "error",
      consoleSnippet:
`Funnel Analytics:
1. Product Page View: 5,200 visitors
2. Add to Cart: 520 (10.0% - Excellent Product Interest!)
3. Initiate Checkout: 14 (2.6% - 97% DROP-OFF AT CART!) 🚨
4. Purchase: 2
-----------------------------------------------------------
Audit Findings on Cart / Checkout Page:
- Cart Page hides delivery charge until user fills 4-page form.
- Mandatory Account Creation (No Guest Checkout option).
- Currency dropdown set to USD instead of BDT by mistake!`,
      question: "এই ফানেল ড্রপ-অফ তৎক্ষণাৎ দূর করে সেল বহুগুণ করার জন্য কোন ৩টি পরিবর্তন করা উচিত?",
      options: [
        "ফেসবুক ও ইনস্টাগ্রামে অ্যাড বাজেট আরও ৪ গুণ বাড়িয়ে দেওয়া।",
        "Guest Checkout চালু করা, কার্ট পেজেই ডেলিভারি চার্জ স্পষ্ট দেখানো, এবং ৩ পেজের ফর্মকে ১ পেজের সহজ চেকআউটে রূপান্তর করা।",
        "পণ্যের দাম বাড়িয়ে দেওয়া যাতে কম মানুষ কার্টে যোগ করে।"
      ],
      correct: 1,
      explanation: "৭৩% ক্রেতা অতিরিক্ত ফর্ম ফিল্ড এবং লুকানো শিপিং খরচের কারণে কার্ট পরিত্যাগ করে। যখন ক্রেতা দেখে যে কেনাকাটার জন্য আগে পাসওয়ার্ড দিয়ে অ্যাকাউন্ট খুলতে হবে, তখন সে ওয়েবসাইট ছেড়ে চলে যায়। Guest Checkout চালু করা এবং স্বচ্ছ ডেলিভারি চার্জ নিশ্চিত করলেই কনভার্সন রেট ৩ গুণ বেড়ে যায়।",
      proTakeaway: "বিজ্ঞাপনে বেশি খরচ করার আগে চেকআউট ফানেলের বাধাগুলো (Friction) দূর করা একজন বিশেষজ্ঞ অপ্টিমাইজারের প্রথম কাজ।"
    }
  ];

  var STORAGE_KEY = "photopixc.skill-lab-45.debug.v1";
  function loadState() {
    try {
      var d = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return { solved: Array.isArray(d.solved) ? d.solved : [] };
    } catch (e) {
      return { solved: [] };
    }
  }
  function saveState(s) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch (e) {}
  }

  var stateData = loadState();
  var activeIndex = 0;
  var userSelections = {}; // { challengeId: selectedIndex }

  function $(id) {
    return document.getElementById(id);
  }
  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function bn(n) {
    return String(n).replace(/[0-9]/g, function (d) {
      return "০১২৩৪৫৬৭৮৯"[+d];
    });
  }

  function render() {
    var mount = $("debugLabContainer");
    if (!mount) return;

    var cur = CHALLENGES[activeIndex];
    var solvedCount = stateData.solved.length;
    var progressPct = Math.round((solvedCount / CHALLENGES.length) * 100);
    var userPick = userSelections[cur.id];
    var isAnswered = typeof userPick === "number";
    var isCorrect = isAnswered && userPick === cur.correct;

    var html = `
      <div class="debug-wrap">
        <div class="debug-header">
          <span class="debug-eyebrow">PRACTICAL TROUBLESHOOTING ARENA · V8.2</span>
          <h1>🛠️ বাস্তব ট্রাবলশুটিং পাজল (Debug Challenges)</h1>
          <p class="v75-muted">বাস্তব ক্লায়েন্ট অ্যাকাউন্টের ৫টি ক্রিটিক্যাল সমস্যা—শনাক্ত করুন, কনসোল ও ডেটা বিশ্লেষণ করুন, এবং একজন প্রো মার্কেটারের মতো সঠিক সমাধান দিন।</p>
        </div>

        <div class="debug-progress-box">
          <div>
            <strong>অগ্রগতি: ${bn(solvedCount)} / ${bn(CHALLENGES.length)}টি চ্যালেঞ্জ সমাধান হয়েছে</strong>
            <small style="display:block;color:var(--muted)">সবগুলো সমাধান করলে 'Troubleshooting Specialist' ব্যাজ আনলক হবে</small>
          </div>
          <div class="debug-bar-wrap">
            <div class="debug-bar-fill" style="width:${progressPct}%"></div>
          </div>
        </div>

        <div class="debug-tab-list" role="tablist">
          ${CHALLENGES.map(function (c, i) {
            var isSolved = stateData.solved.indexOf(c.id) >= 0;
            var isActive = i === activeIndex;
            return `
              <button type="button" class="debug-tab-btn ${isActive ? "active" : ""} ${isSolved ? "done" : ""}" data-debug-tab="${i}" role="tab" aria-selected="${isActive}">
                ${c.tag.split(" ")[0]} #${bn(i + 1)}
              </button>
            `;
          }).join("")}
        </div>

        <div class="debug-card">
          <span class="debug-eyebrow">CHALLENGE #${bn(activeIndex + 1)} · ${esc(cur.tag)}</span>
          <h2 class="debug-title">${esc(cur.title)}</h2>

          <div class="client-complaint">
            <strong>⚠️ ক্লায়েন্টের অভিযোগ ও সমস্যা:</strong>
            "${esc(cur.complaint)}"
          </div>

          <div class="simulated-console">
            <div class="console-title">
              <span>🖥️ ${esc(cur.consoleTitle)}</span>
              <span class="console-badge-red">${esc(cur.consoleBadge)}</span>
            </div>
            <pre style="margin:0;font-family:inherit;font-size:inherit;white-space:pre-wrap;">${esc(cur.consoleSnippet)}</pre>
          </div>

          <h3 style="font-size:16px;margin:20px 0 10px;">🔍 ${esc(cur.question)}</h3>

          <div class="debug-options">
            ${cur.options.map(function (opt, idx) {
              var classes = ["debug-option-btn"];
              if (userPick === idx) {
                classes.push(idx === cur.correct ? "correct-picked" : "wrong-picked");
              } else if (isAnswered && idx === cur.correct) {
                classes.push("correct-picked");
              }
              return `
                <button type="button" class="${classes.join(" ")}" data-debug-opt="${idx}">
                  <span class="option-marker">${["A", "B", "C"][idx]}</span>
                  <span>${esc(opt)}</span>
                </button>
              `;
            }).join("")}
          </div>

          <div class="debug-feedback ${isAnswered ? "show" : ""} ${isCorrect ? "correct" : "wrong"}">
            <div class="feedback-headline">
              ${isCorrect ? "✓ সঠিক সমাধান! চমৎকার সিদ্ধান্ত।" : "✕ ভুল সিদ্ধান্ত। আবার চেষ্টা করুন!"}
            </div>
            <p style="margin:6px 0 10px;line-height:1.6;">${esc(cur.explanation)}</p>
            <div class="pro-takeaway">
              <strong>💡 প্রো মার্কেটার টেকঅ্যাওয়ে:</strong>
              ${esc(cur.proTakeaway)}
            </div>
          </div>

          <div class="debug-actions">
            ${activeIndex > 0 ? `<button type="button" class="btn" id="debugPrevBtn">← আগের চ্যালেঞ্জ</button>` : ""}
            ${
              activeIndex < CHALLENGES.length - 1
                ? `<button type="button" class="btn primary" id="debugNextBtn">পরের চ্যালেঞ্জ →</button>`
                : `<button type="button" class="btn primary" id="debugFinishBtn">🎉 সকল চ্যালেঞ্জ সম্পন্ন</button>`
            }
          </div>
        </div>
      </div>
    `;

    mount.innerHTML = html;
  }

  function setupListeners() {
    var mount = $("debugLabContainer");
    if (!mount) return;

    mount.addEventListener("click", function (e) {
      var tab = e.target.closest("[data-debug-tab]");
      if (tab) {
        activeIndex = Number(tab.dataset.debugTab);
        render();
        return;
      }

      var opt = e.target.closest("[data-debug-opt]");
      if (opt) {
        var cur = CHALLENGES[activeIndex];
        var pick = Number(opt.dataset.debugOpt);
        userSelections[cur.id] = pick;
        if (pick === cur.correct) {
          if (stateData.solved.indexOf(cur.id) < 0) {
            stateData.solved.push(cur.id);
            saveState(stateData);
          }
        }
        render();
        return;
      }

      if (e.target.id === "debugNextBtn") {
        if (activeIndex < CHALLENGES.length - 1) {
          activeIndex++;
          render();
        }
        return;
      }

      if (e.target.id === "debugPrevBtn") {
        if (activeIndex > 0) {
          activeIndex--;
          render();
        }
        return;
      }

      if (e.target.id === "debugFinishBtn") {
        alert("মাশাআল্লাহ! আপনি সবকটি বাস্তব ট্রাবলশুটিং পাজল সফলভাবে সমাধান করেছেন।");
        if (typeof window.showView === "function") {
          window.showView("home");
        }
      }
    });
  }

  // Hook into Skill Lab initial load
  function init() {
    setupListeners();
    render();

    var openBtn = $("openDebugLab");
    if (openBtn) {
      openBtn.addEventListener("click", function () {
        if (typeof window.showView === "function") {
          window.showView("debug");
        }
      });
    }

    window.addEventListener("skill-lab:viewchange", function (e) {
      if (e.detail && e.detail.name === "debug") {
        render();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
