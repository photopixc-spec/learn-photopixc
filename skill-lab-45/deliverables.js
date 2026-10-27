/**
 * PhotoPixc Skill Lab 45 — Professional Client Deliverables Generator
 * Generates 3 industry-standard portfolio-ready deliverables:
 * 1. GTM & GA4 Tracking Implementation Spec-Sheet
 * 2. Full-Funnel Paid Ads Campaign Strategy Blueprint
 * 3. Account Audit & 7-Day Action Plan
 * 
 * 100% Client-side, persistent in localStorage, printable to PDF.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'photopixc.skill-lab-45.deliverables.v1';

  var defaultData = {
    activeDoc: 'tracking', // 'tracking' | 'blueprint' | 'audit'
    tracking: {
      clientName: 'StyleZone BD (E-commerce)',
      websiteUrl: 'https://stylezonebd.example.com',
      platform: 'Shopify Plus',
      gtmId: 'GTM-SZ7941K',
      ga4Id: 'G-SZ889201',
      pixelId: '849204910294102',
      auditor: 'Md. Digital Marketer',
      date: new Date().toISOString().split('T')[0],
      events: [
        {
          event: 'view_item',
          trigger: 'dataLayer event (view_item)',
          params: 'currency, value, items (item_id, item_name, price, category)',
          capi: 'ViewContent (event_id: event_id, fbp, fbc)',
          status: 'Verified'
        },
        {
          event: 'add_to_cart',
          trigger: 'AJAX / dataLayer event (add_to_cart)',
          params: 'currency, value, items (item_id, item_name, quantity, price)',
          capi: 'AddToCart (event_id, user_data)',
          status: 'Verified'
        },
        {
          event: 'begin_checkout',
          trigger: 'Checkout initiation dataLayer event',
          params: 'currency, value, coupon, items count',
          capi: 'InitiateCheckout (event_id, email_hash)',
          status: 'Verified'
        },
        {
          event: 'purchase',
          trigger: 'Order Confirmation / Thank You Page dataLayer',
          params: 'transaction_id, value, tax, shipping, currency, items',
          capi: 'Purchase (event_id = transaction_id, user_data hash, em, ph)',
          status: 'Verified'
        },
        {
          event: 'lead_form_submit',
          trigger: 'Element Visibility / AJAX Form Submission',
          params: 'form_id, lead_type, page_location',
          capi: 'Lead (event_id, hashed_phone)',
          status: 'Testing'
        }
      ],
      checklist: [
        { item: 'Purchase Event Deduplication Verified via Event ID match (Browser + CAPI)', pass: true },
        { item: 'Consent Mode V2 (ad_storage, analytics_storage) correctly configured with default denied', pass: true },
        { item: 'DataLayer currency code formatted in ISO (BDT / USD) without symbol', pass: true },
        { item: 'Transaction ID uniqueness prevents re-triggering on page refresh', pass: true },
        { item: 'GA4 Enhanced Measurement search & outbound click tracking verified', pass: true }
      ],
      notes: 'সমস্ত ই-কমার্স ইভেন্টের সার্ভার-সাইড মেটা কনভার্সন এপিআই (CAPI) গেটওয়ে কনফিগার করা হয়েছে। ইভেন্ট ডিডুপ্লিকেশন সফলভাবে ১০০% ম্যাচ রেটে কাজ করছে।'
    },
    blueprint: {
      clientName: 'GlowAura Skincare BD',
      websiteUrl: 'https://glowaurabd.example.com',
      monthlyBudget: '৳১,৫০,০০০ / $1,250 USD',
      targetRoas: '৩.৮x Blended ROAS',
      targetCpa: '৳৩৫০ / $2.90 per Purchase',
      date: new Date().toISOString().split('T')[0],
      strategist: 'Senior Performance Marketer',
      budgetSplit: [
        { stage: 'TOFU (Top of Funnel - Cold)', share: '৫৫%', budget: '৳৮২,৫০০', objective: 'Sales / Broad + Lookalike 1-2%', creatives: 'Problem-solving Reels, UGC, Founder Story' },
        { stage: 'MOFU (Middle - Engaged)', share: '২৫%', budget: '৳৩৭,৫০০', objective: 'Engaged Shoppers & Video 50% viewers', creatives: 'Social Proof, Doctor Reviews, Before-After' },
        { stage: 'BOFU (Bottom - Hot Abandoners)', share: '১৫%', budget: '৳২২,৫০০', objective: 'View Content & 7-Day Cart Abandoners', creatives: 'Dynamic Catalog Ads + 10% Limited Coupon' },
        { stage: 'Retention / LTV', share: '৫%', budget: '৳৭,৫০০', objective: 'Past 90-Day Buyers Repeat Purchase', creatives: 'New Arrivals & VIP Skincare Routine Bundle' }
      ],
      copyMatrix: [
        {
          angle: 'Problem / Pain Solution',
          hook: 'প্রতিদিন রোদে ত্বক কালচে ও প্রাণহীন হয়ে যাচ্ছে?',
          body: 'কোরিয়ান নিয়াসিনামাইড ও আলফা আরবুটিনের পাওয়ারফুল কম্বিনেশন ত্বককে দিবে প্রাকৃতিক উজ্জ্বলতা মাত্র ১৪ দিনে। চর্মরোগ বিশেষজ্ঞ কর্তৃক পরীক্ষিত।',
          cta: 'আজই ৩০% ছাড়ে অর্ডার করুন'
        },
        {
          angle: 'Social Proof / Trust',
          hook: '১০,০০০+ আপুদের নির্ভরযোগ্য স্কিনকেয়ার সল্যুশন!',
          body: 'হাজারো ফেক প্রসাধনীর ভিড়ে ১০০% অথেনটিক কোরিয়ান ফর্মুলায় তৈরি। স্কিনের দাগ দূর করতে রিভিউগুলো নিজেই দেখুন।',
          cta: 'গ্রাহকদের রিভিউ পড়ুন ও অর্ডার করুন'
        }
      ],
      weeklyPlan: 'সপ্তাহ ১: ক্রিয়েটিভ টেস্টিং (৪টি ভ্যারিয়েশন) | সপ্তাহ ২: উইনার স্কেলিং ও বাজেট ২০% বৃদ্ধি | সপ্তাহ ৩: BOFU ফ্রিকোয়েন্সি মনিটরিং | সপ্তাহ ৪: রিটেনশন ফানেল ও ক্যাম্পেইন অডিট।'
    },
    audit: {
      clientName: 'UrbanKicks Bangladesh',
      websiteUrl: 'https://urbankicks.com.bd',
      auditDate: new Date().toISOString().split('T')[0],
      auditor: 'Growth Marketing Lead',
      healthScore: 62,
      summary: 'গত ৯০ দিনে মেটা ও গুগল বিজ্ঞাপনে মোট ৳৪,২০,০০০ খরচ হলেও ব্লেন্ডেড আরওএএস (ROAS) মাত্র ১.৭x এ নেমে এসেছে। প্রধান কারণ: ক্রিয়েটিভ ফেটিগ, দুর্বল কনভার্সন ট্র্যাকিং এবং ব্রড নেগেটিভ কিওয়ার্ড মিসিং থাকায় অপ্রাসঙ্গিক সার্চে বাজেট নষ্ট হচ্ছে।',
      findings: [
        {
          category: 'ট্র্যাকিং ও ডাটা লিক',
          severity: 'High',
          leakage: '৳৩৫,০০০/মাস অনুমানিক লস',
          issue: 'পারচেজ ইভেন্ট রিফ্রেশ করলে ডুপ্লিকেট কনভার্সন ফায়ার হচ্ছে। মেটা CAPI ম্যাচ স্কোর ৩.২/১০।',
          fix: 'GTM-এ Transaction ID চেক যোগ করে ১ বার ট্রিগার নিশ্চিত করা ও মেটা অ্যাডভান্সড ম্যাচিং ডেটা (Email/Phone Hash) পুশ করা।'
        },
        {
          category: 'বাজেট অপচয় (Ad Wastage)',
          severity: 'High',
          leakage: '৳১৮,০০০ অপচয়',
          issue: 'গুগল সার্চ অ্যাডসে "free", "repair", "wholesale" নেগেটিভ কিওয়ার্ড না থাকায় অপ্রাসঙ্গিক ক্লিকে বাজেট শেষ হচ্ছে।',
          fix: 'অ্যাকাউন্ট লেভেলে ৪২টি হাই-ইনটেন্ট নেগেটিভ কিওয়ার্ডের লিস্ট অবিলম্বে অ্যাড করা।'
        },
        {
          category: 'অডিয়েন্স ওভারল্যাপ',
          severity: 'Medium',
          leakage: 'বিডিং ইনফ্লেশন',
          issue: 'একই অ্যাড সেটে ইন্টারেস্ট ও রিটার্গেটিং অডিয়েন্স মিক্স করা, ফলে নিজের অ্যাড অন্য অ্যাডের সাথে প্রতিযোগিতা করছে।',
          fix: 'TOFU ক্যাম্পেইন থেকে বিগত ৩০ দিনের ওয়েবসাইট ভিজিটর ও ক্রেতাদের পুরোপুরি Exclude করা।'
        },
        {
          category: 'ল্যান্ডিং পেজ স্পিড (CRO)',
          severity: 'Medium',
          leakage: '১৫% ড্রপ-অফ',
          issue: 'মোবাইল সাইট স্পিড ৬.৮ সেকেন্ড। অপটিমাইজ না করা ভারী ছবি (3MB+) ব্যানার হিসেবে ব্যবহার করা হচ্ছে।',
          fix: 'WebP ফরম্যাটে সব ইমেজ কম্প্রেস করা ও ১-ক্লিক ফাস্ট ক্যাশ-অন-ডেলিভারি চেকআউট সক্রিয় করা।'
        }
      ],
      sevenDayPlan: [
        { day: 'দিন ১-২', task: 'ট্র্যাকিং ডুপ্লিকেশন ফিক্স ও নেগেটিভ কিওয়ার্ড লিস্ট অ্যাড (অবিলম্বে বাজেট লিক বন্ধ)' },
        { day: 'দিন ৩', task: 'অডিয়েন্স এক্সক্লুশন ঠিক করে ৩টি নতুন UGC ভিডিও টেস্ট অ্যাড লঞ্চ' },
        { day: 'দিন ৪-৫', task: 'মোবাইল ল্যান্ডিং পেজ স্পিড ৩ সেকেন্ডের নিচে আনা ও চেকআউট ফিল্ড কমানো' },
        { day: 'দিন ৬-৭', task: 'উইনার ক্রিয়েটিভ চিহ্নিত করে ডাইনামিক প্রোডাক্ট রিটার্গেটিং (DPA) ক্যাম্পেইন স্কেল করা' }
      ]
    }
  };

  var state = loadState();

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        return Object.assign({}, defaultData, parsed);
      }
    } catch (e) {
      console.warn('Error loading deliverables state:', e);
    }
    return JSON.parse(JSON.stringify(defaultData));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Error saving deliverables state:', e);
    }
  }

  function render(container) {
    if (!container) return;

    var html = '';
    html += '<div class="deliv-wrap">';
    
    // Header
    html += '<div class="deliv-header">';
    html += '<span class="status-pill status-ready" style="display:inline-flex;margin-bottom:8px;">💼 Portfolio Ready Deliverables</span>';
    html += '<h1>বাস্তব ক্লায়েন্ট প্রজেক্ট ডেলিভারেবল জেনারেটর</h1>';
    html += '<p style="color:var(--muted);font-size:14px;max-width:760px;margin:0 0 16px;">কোর্স শেষে যেকোনো ইন্টারন্যাশনাল বা লোকাল ক্লায়েন্টের জন্য প্রফেশনাল স্পেক-শীট, অ্যাড স্ট্র্যাটেজি ও অডিট পেপার তৈরি করুন। আপনার নিজের বা ক্লায়েন্টের তথ্য দিয়ে কাস্টমাইজ করুন এবং এক ক্লিকে প্রফেশনাল পিডিএফ / প্রিন্ট রেডি রিপোর্ট ডাউনলোড করুন।</p>';
    html += '</div>';

    // Tabs
    html += '<div class="deliv-tabs">';
    html += '<button type="button" class="deliv-tab-btn ' + (state.activeDoc === 'tracking' ? 'active' : '') + '" data-doc="tracking">📑 ১. GTM/GA4 ট্র্যাকিং স্পেক-শীট</button>';
    html += '<button type="button" class="deliv-tab-btn ' + (state.activeDoc === 'blueprint' ? 'active' : '') + '" data-doc="blueprint">🎯 ২. ক্যাম্পেইন স্ট্র্যাটেজি ব্লুপ্রিন্ট</button>';
    html += '<button type="button" class="deliv-tab-btn ' + (state.activeDoc === 'audit' ? 'active' : '') + '" data-doc="audit">🔍 ৩. অ্যাকাউন্ট অডিট ও গ্রোথ রিপোর্ট</button>';
    html += '</div>';

    // Document Card
    html += '<div class="deliv-card" id="delivPrintArea">';
    if (state.activeDoc === 'tracking') {
      html += renderTrackingDoc();
    } else if (state.activeDoc === 'blueprint') {
      html += renderBlueprintDoc();
    } else {
      html += renderAuditDoc();
    }
    html += '</div>';

    html += '</div>';

    container.innerHTML = html;
    bindEvents(container);
  }

  // --- 1. TRACKING DOC ---
  function renderTrackingDoc() {
    var d = state.tracking;
    var html = '';
    html += '<div class="deliv-topbar">';
    html += '<div>';
    html += '<h2>GTM & GA4 Tracking Implementation Spec-Sheet</h2>';
    html += '<small style="color:var(--muted);">Technical DataLayer & Server-Side Event Specifications</small>';
    html += '</div>';
    html += '<div class="deliv-actions-row">';
    html += '<button type="button" class="btn btn-secondary btn-sm" id="btnDelivReset">নমুনা ডেটা রিসেট</button>';
    html += '<button type="button" class="btn btn-primary btn-sm" id="btnDelivPrint">🖨️ পিডিএফ / প্রিন্ট করুন</button>';
    html += '</div>';
    html += '</div>';

    // Meta form fields
    html += '<div class="deliv-form-grid">';
    html += '<div class="deliv-field"><label>ক্লায়েন্ট / স্টোর নেম</label><input type="text" id="tr_clientName" value="' + escapeHtml(d.clientName) + '"></div>';
    html += '<div class="deliv-field"><label>ওয়েবসাইট URL</label><input type="text" id="tr_websiteUrl" value="' + escapeHtml(d.websiteUrl) + '"></div>';
    html += '<div class="deliv-field"><label>প্ল্যাটফর্ম (CMS)</label><input type="text" id="tr_platform" value="' + escapeHtml(d.platform) + '"></div>';
    html += '<div class="deliv-field"><label>GTM কন্টেইনার আইডি</label><input type="text" id="tr_gtmId" value="' + escapeHtml(d.gtmId) + '"></div>';
    html += '<div class="deliv-field"><label>GA4 Measurement ID</label><input type="text" id="tr_ga4Id" value="' + escapeHtml(d.ga4Id) + '"></div>';
    html += '<div class="deliv-field"><label>মেটা পিক্সেল আইডি</label><input type="text" id="tr_pixelId" value="' + escapeHtml(d.pixelId) + '"></div>';
    html += '<div class="deliv-field"><label>অডিটর / স্পেশালিস্ট</label><input type="text" id="tr_auditor" value="' + escapeHtml(d.auditor) + '"></div>';
    html += '<div class="deliv-field"><label>তারিখ</label><input type="date" id="tr_date" value="' + escapeHtml(d.date) + '"></div>';
    html += '</div>';

    // Event Schema Table
    html += '<div class="deliv-section-title">📊 ই-কমার্স স্ট্যান্ডার্ড ইভেন্ট স্কিমা (Event Schema)</div>';
    html += '<div class="deliv-tablewrap">';
    html += '<table class="deliv-table">';
    html += '<thead><tr><th>স্ট্যান্ডার্ড ইভেন্ট</th><th>ট্রিগার কন্ডিশন</th><th>প্রয়োজনীয় প্যারামিটার</th><th>Meta CAPI / ডিডুপ্লিকেশন</th><th>ভেরিফিকেশন স্ট্যাটাস</th></tr></thead>';
    html += '<tbody>';
    d.events.forEach(function (ev, idx) {
      html += '<tr>';
      html += '<td><strong><code>' + escapeHtml(ev.event) + '</code></strong></td>';
      html += '<td><input type="text" data-idx="' + idx + '" data-field="trigger" class="tr-ev-input" value="' + escapeHtml(ev.trigger) + '"></td>';
      html += '<td><input type="text" data-idx="' + idx + '" data-field="params" class="tr-ev-input" value="' + escapeHtml(ev.params) + '"></td>';
      html += '<td><input type="text" data-idx="' + idx + '" data-field="capi" class="tr-ev-input" value="' + escapeHtml(ev.capi) + '"></td>';
      html += '<td>';
      html += '<select class="tr-ev-select" data-idx="' + idx + '" data-field="status">';
      html += '<option value="Verified"' + (ev.status === 'Verified' ? ' selected' : '') + '>✅ Verified</option>';
      html += '<option value="Testing"' + (ev.status === 'Testing' ? ' selected' : '') + '>⏳ Testing</option>';
      html += '<option value="Pending"' + (ev.status === 'Pending' ? ' selected' : '') + '>⚠️ Pending</option>';
      html += '</select>';
      html += '</td>';
      html += '</tr>';
    });
    html += '</tbody></table></div>';

    // QA Checklist
    html += '<div class="deliv-section-title">✅ কোয়ালিটি অ্যাসিওরেন্স (QA) ও কমপ্লায়েন্স চেকলিস্ট</div>';
    html += '<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px;">';
    d.checklist.forEach(function (c, idx) {
      html += '<label style="display:flex;align-items:center;gap:10px;font-size:14px;background:var(--surface2);padding:10px 14px;border-radius:10px;cursor:pointer;">';
      html += '<input type="checkbox" class="tr-chk-input" data-idx="' + idx + '"' + (c.pass ? ' checked' : '') + ' style="width:18px;height:18px;cursor:pointer;">';
      html += '<span>' + escapeHtml(c.item) + '</span>';
      html += '</label>';
    });
    html += '</div>';

    // Executive Note
    html += '<div class="deliv-field"><label>অতিরিক্ত কনফিগারেশন নোট / ক্লায়েন্ট পরামর্শ</label><textarea id="tr_notes" rows="3">' + escapeHtml(d.notes) + '</textarea></div>';
    return html;
  }

  // --- 2. BLUEPRINT DOC ---
  function renderBlueprintDoc() {
    var d = state.blueprint;
    var html = '';
    html += '<div class="deliv-topbar">';
    html += '<div>';
    html += '<h2>Full-Funnel Paid Ads Campaign Strategy Blueprint</h2>';
    html += '<small style="color:var(--muted);">Budget Distribution, Funnel Architecture & Creative Copy Matrix</small>';
    html += '</div>';
    html += '<div class="deliv-actions-row">';
    html += '<button type="button" class="btn btn-secondary btn-sm" id="btnDelivReset">নমুনা ডেটা রিসেট</button>';
    html += '<button type="button" class="btn btn-primary btn-sm" id="btnDelivPrint">🖨️ পিডিএফ / প্রিন্ট করুন</button>';
    html += '</div>';
    html += '</div>';

    // Metadata
    html += '<div class="deliv-form-grid">';
    html += '<div class="deliv-field"><label>ক্লায়েন্ট / ব্র্যান্ডের নাম</label><input type="text" id="bp_clientName" value="' + escapeHtml(d.clientName) + '"></div>';
    html += '<div class="deliv-field"><label>ওয়েবসাইট / ল্যান্ডিং পেজ</label><input type="text" id="bp_websiteUrl" value="' + escapeHtml(d.websiteUrl) + '"></div>';
    html += '<div class="deliv-field"><label>মাসিক অ্যাড বাজেট</label><input type="text" id="bp_monthlyBudget" value="' + escapeHtml(d.monthlyBudget) + '"></div>';
    html += '<div class="deliv-field"><label>টার্গেট ব্লেন্ডেড ROAS</label><input type="text" id="bp_targetRoas" value="' + escapeHtml(d.targetRoas) + '"></div>';
    html += '<div class="deliv-field"><label>টার্গেট CPA / CPO</label><input type="text" id="bp_targetCpa" value="' + escapeHtml(d.targetCpa) + '"></div>';
    html += '<div class="deliv-field"><label>স্ট্র্যাটেজিস্টের নাম</label><input type="text" id="bp_strategist" value="' + escapeHtml(d.strategist) + '"></div>';
    html += '</div>';

    // Funnel Breakdown Table
    html += '<div class="deliv-section-title">🎯 ফানেল অনুযায়ী বাজেট ও অবজেক্টিভ স্প্লিট (Budget & Funnel Distribution)</div>';
    html += '<div class="deliv-tablewrap">';
    html += '<table class="deliv-table">';
    html += '<thead><tr><th>ফানেল স্টেজ</th><th>বাজেট শেয়ার (%)</th><th>বাজেট অ্যামাউন্ট</th><th>ক্যাম্পেইন অবজেক্টিভ ও অডিয়েন্স</th><th>রেকমেন্ডেড ক্রিয়েটিভ ফরম্যাট</th></tr></thead>';
    html += '<tbody>';
    d.budgetSplit.forEach(function (row, idx) {
      html += '<tr>';
      html += '<td><strong>' + escapeHtml(row.stage) + '</strong></td>';
      html += '<td><input type="text" data-idx="' + idx + '" data-field="share" class="bp-split-input" value="' + escapeHtml(row.share) + '"></td>';
      html += '<td><input type="text" data-idx="' + idx + '" data-field="budget" class="bp-split-input" value="' + escapeHtml(row.budget) + '"></td>';
      html += '<td><input type="text" data-idx="' + idx + '" data-field="objective" class="bp-split-input" value="' + escapeHtml(row.objective) + '"></td>';
      html += '<td><input type="text" data-idx="' + idx + '" data-field="creatives" class="bp-split-input" value="' + escapeHtml(row.creatives) + '"></td>';
      html += '</tr>';
    });
    html += '</tbody></table></div>';

    // Creative Angle & Copy Matrix
    html += '<div class="deliv-section-title">✍️ হাই-কনভার্টিং অ্যাড কপি ও ক্রিয়েটিভ অ্যাঙ্গেল ম্যাট্রিক্স</div>';
    d.copyMatrix.forEach(function (copy, idx) {
      html += '<div style="background:var(--surface2);border:1px solid var(--line);border-radius:12px;padding:16px;margin-bottom:14px;">';
      html += '<div style="font-weight:700;color:var(--accent);margin-bottom:8px;">অ্যাঙ্গেল #' + (idx + 1) + ': ' + escapeHtml(copy.angle) + '</div>';
      html += '<div style="display:grid;grid-template-columns:1fr;gap:10px;">';
      html += '<div class="deliv-field"><label>হুক (First 3-Sec Hook / Headline)</label><input type="text" data-idx="' + idx + '" data-field="hook" class="bp-copy-input" value="' + escapeHtml(copy.hook) + '"></div>';
      html += '<div class="deliv-field"><label>বডি কপি (Pain ➔ Benefit ➔ Offer)</label><textarea rows="2" data-idx="' + idx + '" data-field="body" class="bp-copy-input">' + escapeHtml(copy.body) + '</textarea></div>';
      html += '<div class="deliv-field"><label>কল টু অ্যাকশন (CTA)</label><input type="text" data-idx="' + idx + '" data-field="cta" class="bp-copy-input" value="' + escapeHtml(copy.cta) + '"></div>';
      html += '</div></div>';
    });

    // Roadmap note
    html += '<div class="deliv-field"><label>৪ সপ্তাহের স্কেলিং ও অপ্টিমাইজেশন রোডম্যাপ</label><textarea id="bp_weeklyPlan" rows="3">' + escapeHtml(d.weeklyPlan) + '</textarea></div>';
    return html;
  }

  // --- 3. AUDIT DOC ---
  function renderAuditDoc() {
    var d = state.audit;
    var html = '';
    html += '<div class="deliv-topbar">';
    html += '<div>';
    html += '<h2>Account Audit & 7-Day Performance Action Plan</h2>';
    html += '<small style="color:var(--muted);">Leakage Diagnostics, Severity Analysis & Immediate ROI Fixes</small>';
    html += '</div>';
    html += '<div class="deliv-actions-row">';
    html += '<button type="button" class="btn btn-secondary btn-sm" id="btnDelivReset">নমুনা ডেটা রিসেট</button>';
    html += '<button type="button" class="btn btn-primary btn-sm" id="btnDelivPrint">🖨️ পিডিএফ / প্রিন্ট করুন</button>';
    html += '</div>';
    html += '</div>';

    // Metadata
    html += '<div class="deliv-form-grid">';
    html += '<div class="deliv-field"><label>ক্লায়েন্ট / ব্র্যান্ড</label><input type="text" id="au_clientName" value="' + escapeHtml(d.clientName) + '"></div>';
    html += '<div class="deliv-field"><label>ওয়েবসাইট URL</label><input type="text" id="au_websiteUrl" value="' + escapeHtml(d.websiteUrl) + '"></div>';
    html += '<div class="deliv-field"><label>অডিটর নাম</label><input type="text" id="au_auditor" value="' + escapeHtml(d.auditor) + '"></div>';
    html += '<div class="deliv-field"><label>অ্যাকাউন্ট হেলথ স্কোর (১-১০০)</label><input type="number" id="au_healthScore" min="1" max="100" value="' + d.healthScore + '"></div>';
    html += '</div>';

    // Health Score Visual Card
    var scoreColor = d.healthScore >= 80 ? 'var(--good)' : (d.healthScore >= 60 ? 'var(--amber)' : 'var(--danger)');
    html += '<div style="display:flex;align-items:center;gap:18px;background:var(--surface2);border-radius:12px;padding:16px;margin-bottom:20px;">';
    html += '<div style="font-size:36px;font-weight:900;color:' + scoreColor + ';border:3px solid ' + scoreColor + ';border-radius:50%;width:70px;height:70px;display:flex;align-items:center;justify-content:center;">' + d.healthScore + '</div>';
    html += '<div>';
    html += '<div style="font-weight:700;font-size:16px;color:var(--ink);">সার্বিক অ্যাকাউন্ট স্থিতি: ' + (d.healthScore < 70 ? 'জরুরি অপ্টিমাইজেশন প্রয়োজন (High Risk of Leakage)' : 'স্থিতিশীল, স্কেলিং সম্ভব') + '</div>';
    html += '<div style="font-size:13px;color:var(--muted);margin-top:4px;">অ্যাকাউন্টে ট্র্যাকিং এরর ও বাজেট অপচয়ের কারণে বিজ্ঞাপন খরচ আশানুরূপ কনভার্সন দিচ্ছে না।</div>';
    html += '</div></div>';

    // Executive Summary
    html += '<div class="deliv-field" style="margin-bottom:20px;"><label>এক্সিকিউটিভ সামারি (সারসংক্ষেপ)</label><textarea id="au_summary" rows="3">' + escapeHtml(d.summary) + '</textarea></div>';

    // Findings Table
    html += '<div class="deliv-section-title">🚨 প্রধান সমস্যা ও বাজেট লিক চিহ্নিতকরণ (Audit Findings)</div>';
    html += '<div class="deliv-tablewrap">';
    html += '<table class="deliv-table">';
    html += '<thead><tr><th>ক্যাটাগরি</th><th>তীব্রতা (Severity)</th><th>সমস্যার বিবরণ</th><th>লিক / অপচয়</th><th>সংশোধন নির্দেশিকা (Recommended Fix)</th></tr></thead>';
    html += '<tbody>';
    d.findings.forEach(function (f, idx) {
      var badgeClass = f.severity === 'High' ? 'deliv-badge-high' : (f.severity === 'Medium' ? 'deliv-badge-med' : 'deliv-badge-good');
      html += '<tr>';
      html += '<td><strong>' + escapeHtml(f.category) + '</strong></td>';
      html += '<td><span class="' + badgeClass + '">' + escapeHtml(f.severity) + '</span></td>';
      html += '<td><input type="text" data-idx="' + idx + '" data-field="issue" class="au-find-input" value="' + escapeHtml(f.issue) + '"></td>';
      html += '<td><input type="text" data-idx="' + idx + '" data-field="leakage" class="au-find-input" value="' + escapeHtml(f.leakage) + '"></td>';
      html += '<td><input type="text" data-idx="' + idx + '" data-field="fix" class="au-find-input" value="' + escapeHtml(f.fix) + '"></td>';
      html += '</tr>';
    });
    html += '</tbody></table></div>';

    // 7-Day Plan
    html += '<div class="deliv-section-title">🗓️ ৭ দিনের অগ্রাধিকার অ্যাকশন প্ল্যান (7-Day Action Plan)</div>';
    html += '<div style="display:flex;flex-direction:column;gap:10px;">';
    d.sevenDayPlan.forEach(function (p, idx) {
      html += '<div style="display:flex;gap:12px;align-items:center;background:var(--surface2);padding:10px 14px;border-radius:10px;">';
      html += '<span style="font-weight:700;color:var(--accent);min-width:70px;">' + escapeHtml(p.day) + '</span>';
      html += '<input type="text" data-idx="' + idx + '" class="au-plan-input" style="flex:1;background:var(--surface);border:1px solid var(--line);padding:6px 10px;border-radius:8px;" value="' + escapeHtml(p.task) + '">';
      html += '</div>';
    });
    html += '</div>';

    return html;
  }

  // --- EVENTS BINDING ---
  function bindEvents(container) {
    // Tab switching
    var tabBtns = container.querySelectorAll('.deliv-tab-btn');
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var doc = btn.getAttribute('data-doc');
        state.activeDoc = doc;
        saveState();
        render(container);
      });
    });

    // Reset button
    var resetBtn = container.querySelector('#btnDelivReset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (confirm('আপনি কি এই ডকুমেন্টের ডেটা ডিফল্ট নমুনা ডেটায় রিসেট করতে চান?')) {
          var doc = state.activeDoc;
          state[doc] = JSON.parse(JSON.stringify(defaultData[doc]));
          saveState();
          render(container);
        }
      });
    }

    // Print button
    var printBtn = container.querySelector('#btnDelivPrint');
    if (printBtn) {
      printBtn.addEventListener('click', function () {
        window.print();
      });
    }

    // Form change bindings
    if (state.activeDoc === 'tracking') {
      ['clientName', 'websiteUrl', 'platform', 'gtmId', 'ga4Id', 'pixelId', 'auditor', 'date', 'notes'].forEach(function (k) {
        var el = container.querySelector('#tr_' + k);
        if (el) {
          el.addEventListener('input', function () {
            state.tracking[k] = el.value;
            saveState();
          });
        }
      });

      var evInputs = container.querySelectorAll('.tr-ev-input');
      evInputs.forEach(function (inp) {
        inp.addEventListener('input', function () {
          var idx = parseInt(inp.getAttribute('data-idx'), 10);
          var fld = inp.getAttribute('data-field');
          state.tracking.events[idx][fld] = inp.value;
          saveState();
        });
      });

      var evSelects = container.querySelectorAll('.tr-ev-select');
      evSelects.forEach(function (sel) {
        sel.addEventListener('change', function () {
          var idx = parseInt(sel.getAttribute('data-idx'), 10);
          state.tracking.events[idx].status = sel.value;
          saveState();
        });
      });

      var chkInputs = container.querySelectorAll('.tr-chk-input');
      chkInputs.forEach(function (chk) {
        chk.addEventListener('change', function () {
          var idx = parseInt(chk.getAttribute('data-idx'), 10);
          state.tracking.checklist[idx].pass = chk.checked;
          saveState();
        });
      });
    } else if (state.activeDoc === 'blueprint') {
      ['clientName', 'websiteUrl', 'monthlyBudget', 'targetRoas', 'targetCpa', 'strategist', 'weeklyPlan'].forEach(function (k) {
        var el = container.querySelector('#bp_' + k);
        if (el) {
          el.addEventListener('input', function () {
            state.blueprint[k] = el.value;
            saveState();
          });
        }
      });

      var splitInputs = container.querySelectorAll('.bp-split-input');
      splitInputs.forEach(function (inp) {
        inp.addEventListener('input', function () {
          var idx = parseInt(inp.getAttribute('data-idx'), 10);
          var fld = inp.getAttribute('data-field');
          state.blueprint.budgetSplit[idx][fld] = inp.value;
          saveState();
        });
      });

      var copyInputs = container.querySelectorAll('.bp-copy-input');
      copyInputs.forEach(function (inp) {
        inp.addEventListener('input', function () {
          var idx = parseInt(inp.getAttribute('data-idx'), 10);
          var fld = inp.getAttribute('data-field');
          state.blueprint.copyMatrix[idx][fld] = inp.value;
          saveState();
        });
      });
    } else if (state.activeDoc === 'audit') {
      ['clientName', 'websiteUrl', 'auditor', 'healthScore', 'summary'].forEach(function (k) {
        var el = container.querySelector('#au_' + k);
        if (el) {
          el.addEventListener('input', function () {
            state.audit[k] = k === 'healthScore' ? parseInt(el.value, 10) || 0 : el.value;
            saveState();
            if (k === 'healthScore') render(container);
          });
        }
      });

      var findInputs = container.querySelectorAll('.au-find-input');
      findInputs.forEach(function (inp) {
        inp.addEventListener('input', function () {
          var idx = parseInt(inp.getAttribute('data-idx'), 10);
          var fld = inp.getAttribute('data-field');
          state.audit.findings[idx][fld] = inp.value;
          saveState();
        });
      });

      var planInputs = container.querySelectorAll('.au-plan-input');
      planInputs.forEach(function (inp) {
        inp.addEventListener('input', function () {
          var idx = parseInt(inp.getAttribute('data-idx'), 10);
          state.audit.sevenDayPlan[idx].task = inp.value;
          saveState();
        });
      });
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function init() {
    var container = document.getElementById('deliverablesContainer');
    if (container) {
      render(container);
    }

    var openBtn = document.getElementById('openDeliverables');
    if (openBtn) {
      openBtn.addEventListener('click', function () {
        if (typeof window.showView === 'function') {
          window.showView('deliverables');
        }
      });
    }

    window.addEventListener('skill-lab:viewchange', function (e) {
      if (e.detail && e.detail.name === 'deliverables') {
        var c = document.getElementById('deliverablesContainer');
        if (c) render(c);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.PhotoPixcDeliverables = {
    init: init,
    render: render
  };
})();
