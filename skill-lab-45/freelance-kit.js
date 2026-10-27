/**
 * PhotoPixc Skill Lab 45 — Freelance SOPs & Client Communication Kit
 * International proposals, onboarding SOPs, access requests & project delivery kits.
 * 100% Client-side, interactive with dynamic placeholders and 1-click clipboard copy.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'photopixc.skill-lab-45.freelance.v1';

  var defaultState = {
    activeTab: 'messages', // 'messages' | 'onboarding' | 'handover'
    vars: {
      clientName: 'Alex',
      brandName: 'UrbanAura Fashion',
      yourName: 'Md. Digital Marketer',
      serviceName: 'GA4, GTM & Meta Conversion API (CAPI) Tracking',
      partnerId: '123456789012345',
      userEmail: 'freelancer@example.com',
      googleCid: '123-456-7890',
      retainerPrice: '$650/month'
    }
  };

  var state = loadState();

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        return Object.assign({}, defaultState, parsed, {
          vars: Object.assign({}, defaultState.vars, (parsed && parsed.vars) || {})
        });
      }
    } catch (e) {
      console.warn('Error loading freelance kit state:', e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Error saving freelance kit state:', e);
    }
  }

  function interpolate(str) {
    if (!str) return '';
    var v = state.vars;
    return str
      .replace(/\{clientName\}/g, v.clientName || '[Client Name]')
      .replace(/\{brandName\}/g, v.brandName || '[Brand/Store Name]')
      .replace(/\{yourName\}/g, v.yourName || '[Your Name]')
      .replace(/\{serviceName\}/g, v.serviceName || '[Service Name]')
      .replace(/\{partnerId\}/g, v.partnerId || '[Meta Business ID]')
      .replace(/\{userEmail\}/g, v.userEmail || '[Your Professional Email]')
      .replace(/\{googleCid\}/g, v.googleCid || '[Google Ads 10-Digit CID]')
      .replace(/\{retainerPrice\}/g, v.retainerPrice || '[Monthly Price]');
  }

  // --- TEMPLATES DATA ---
  var templates = {
    messages: [
      {
        id: 'msg_upwork',
        badge: 'Upwork / Fiverr Proposal',
        badgeClass: 'fl-badge-upwork',
        title: 'হাই-কনভার্টিং কভার লেটার ও প্রপোজাল (Winning Proposal)',
        desc: 'সাধারণ "Hi Sir, I am an expert" বাদ দিয়ে সরাসরি ক্লায়েন্টের নির্দিষ্ট সমস্যা, অডিট পর্যবেক্ষণ ও ৩ ধাপের সল্যুশন দিয়ে লেখা প্রমাণিত প্রপোজাল।',
        text: 
`Hi {clientName},

I noticed you are looking to fix {serviceName} for {brandName}.

Most store owners face this exact issue when their Meta Pixel or GA4 suffers from either duplicate purchases or low Event Match Quality (EMQ < 4/10) due to iOS 14.5+ privacy blockages.

Here is exactly how I will solve this for you in 3 clear steps:

1. DataLayer Audit: Inspect {brandName}'s checkout flow to ensure unique transaction_id, currency, and value parameters are firing cleanly.
2. Server-Side CAPI & GTM Setup: Configure Google Tag Manager with Stape/Cloud server container to send first-party server events alongside browser pixel with 100% deduplication.
3. Live Verification & QA Sheet: Run live sandbox test orders and deliver an Executive QA Spec-Sheet proving zero event drops.

I have set up verified tracking for 40+ e-commerce brands with 8.5+ Event Match Quality.

Are you available for a quick 5-minute chat today or should I record a 2-minute Loom breakdown of your site's current dataLayer?

Best regards,
{yourName}`
      },
      {
        id: 'msg_cold_pitch',
        badge: 'Cold Email / LinkedIn',
        badgeClass: 'fl-badge-email',
        title: 'ই-কমার্স ব্র্যান্ড ও সিইওদের জন্য কোল্ড আউটরিচ ড্রাফট',
        desc: 'কোনো অযাচিত সেলস পিচ নয়; ক্লায়েন্টের ওয়েবসাইটের ট্র্যাকিং লিক বা বিজ্ঞাপনের অপচয় চিহ্নিত করে ভ্যালু-ফার্স্ট অ্যাপ্রোচে লেখা ড্রাফট।',
        text:
`Subject: Quick question regarding {brandName}'s tracking data

Hi {clientName},

While browsing {brandName}'s online store, I noticed that your purchase events might be missing server-side deduplication parameters (causing GA4 to either double-count orders on page refresh or miss 15-20% of Safari/iOS conversions).

When your Meta Ad algorithms receive inaccurate conversion signals, your CPA naturally rises and ad spend gets wasted on already converted buyers.

I specialize in fixing high-stakes e-commerce tracking architectures (Shopify/WooCommerce + GTM + GA4 + Meta CAPI).

Would you be open to a free 3-minute video audit where I screen-record the exact dataLayer behavior on your checkout page? No pitch or sales pressure—just actionable diagnostic data you can use immediately.

Best regards,
{yourName}
Performance Tracking & Growth Specialist`
      },
      {
        id: 'msg_followup',
        badge: 'Follow-Up Sequence',
        badgeClass: 'fl-badge-email',
        title: 'ক্লায়েন্ট রিপ্লাই না দিলে ৩ ও ৭ দিনের ফলো-আপ ড্রাফট',
        desc: 'ক্লায়েন্ট ব্যস্ত থাকলে ভদ্রভাবে মনে করিয়ে দেওয়া এবং ফাইনাল ব্রেক-আপ ইমেইল (যার রিপ্লাই রেট ৭০% এর বেশি)।',
        text:
`--- ৩ দিন পর ফলো-আপ (Gentle Bump) ---
Hi {clientName},

Just following up on my previous note regarding {brandName}'s tracking setup. 

I know you are super busy scaling operations. Did you get a chance to review the audit points I shared? Happy to answer any technical questions whenever convenient for you.

--- ৭ দিন পর শেষ ফলো-আপ (The Break-up Email) ---
Hi {clientName},

I haven't heard back from you, so I assume fixing {serviceName} is not a priority for {brandName} right now. 

Totally understand! I will go ahead and close your audit file on my end so I don't clutter your inbox. If you ever need help scaling clean data in the future, my door is always open.

Wishing you and {brandName} massive growth!

Best,
{yourName}`
      },
      {
        id: 'msg_scope_creep',
        badge: 'Boundary & Upsell',
        badgeClass: 'fl-badge-sop',
        title: 'অতিরিক্ত ফ্রি কাজ (Scope Creep) সামলানোর পেশাদার ড্রাফট',
        desc: 'ক্লায়েন্ট যখন চুক্তির বাইরের অতিরিক্ত কাজ ফ্রি করে দেওয়ার অনুরোধ করে, তখন সম্পর্ক নষ্ট না করে অতিরিক্ত মাইলস্টোন/পেমেন্টে কনভার্ট করার উপায়।',
        text:
`Hi {clientName},

Thank you for reaching out! 

I completely understand why adding that extra setup would be valuable for {brandName}. However, as our current project scope was specifically focused on {serviceName}, this new requirement falls outside our initial milestone.

I would love to help you get this done properly! I can take care of this as an add-on milestone for just [e.g. $100], and have it fully configured and tested within 24 hours.

If you approve, I will send over a quick milestone request on the platform and begin immediately. Let me know what works best for you!

Best regards,
{yourName}`
      }
    ],

    onboarding: [
      {
        id: 'onb_meta',
        badge: 'Meta Business Suite SOP',
        badgeClass: 'fl-badge-sop',
        title: 'Meta Business Manager পার্টনার অ্যাক্সেস রিকোয়েস্ট SOP',
        desc: 'ক্লায়েন্ট যাতে ভুল করে তাদের ফেসবুক পাসওয়ার্ড না পাঠায়, বরং সুরক্ষিতভাবে Business Manager Partner হিসেবে অ্যাসেট শেয়ার করতে পারে।',
        steps: [
          { title: 'ক্লায়েন্টকে Business Settings-এ যেতে বলুন', text: 'business.facebook.com/settings এ লগইন করে বাম মেনু থেকে "Users" ➔ "Partners" সিলেক্ট করতে হবে।' },
          { title: 'Partner Add করুন', text: '"Add" বাটনে ক্লিক করে "Give a partner access to your assets" বেছে নিতে বলুন।' },
          { title: 'Partner Business ID বসান', text: 'আপনার Partner Business ID বসিয়ে নিচের ৪টি অ্যাসেট (Manage Full Control) সিলেক্ট করতে বলুন: 1. Facebook Page, 2. Ad Account, 3. Pixels/Datasets, 4. Catalogs।' }
        ],
        text:
`Hi {clientName},

To get started on your Meta Ads & CAPI tracking for {brandName}, I need Partner Access to your Meta Business Suite. Please NEVER send your personal Facebook passwords!

Here are the 3 simple steps (takes 60 seconds):

1. Go to your Business Settings: https://business.facebook.com/settings
2. Under "Users" on the left sidebar, click on "Partners".
3. Click the blue "Add" button ➔ choose "Give a partner access to your assets".
4. Enter my Partner Business ID: {partnerId}
5. Grant "Manage" (Admin/Full Control) access to these 4 assets:
   - Your Facebook Page
   - Your Ad Account
   - Your Pixel / Dataset
   - Your Product Catalog (if applicable)

Once done, please let me know and I will verify the connection immediately. Thank you!

Best,
{yourName}`
      },
      {
        id: 'onb_gtm_ga4',
        badge: 'GTM & GA4 Access SOP',
        badgeClass: 'fl-badge-sop',
        title: 'Google Tag Manager ও GA4 অ্যাকাউন্ট অ্যাক্সেস SOP',
        desc: 'GTM Container Publish করার অনুমতি এবং GA4 এডিটর/অ্যাডমিন পারমিশন নিরাপদে নেওয়ার ধাপ।',
        steps: [
          { title: 'Google Tag Manager', text: 'tagmanager.google.com ➔ Admin ➔ User Management ➔ Add User এ গিয়ে আপনার ইমেইল দিয়ে "Administrator" ও কন্টেইনারে "Publish" পারমিশন দিতে বলুন।' },
          { title: 'Google Analytics 4', text: 'analytics.google.com ➔ Admin (Gear icon) ➔ Property Access Management ➔ Add user দিয়ে "Administrator" বা "Editor" সিলেক্ট করতে বলুন।' }
        ],
        text:
`Hi {clientName},

To implement your tracking infrastructure for {brandName}, please invite my professional email address to your Google Tag Manager and GA4 accounts:

Email to invite: {userEmail}

--- For Google Tag Manager (GTM): ---
1. Visit: https://tagmanager.google.com
2. Click "Admin" (top tab) ➔ "User Management".
3. Click the blue "+" button (top right) ➔ "Add users".
4. Enter: {userEmail}
5. Under Container Permissions, check "Publish" and set Account Permission to "Administrator".

--- For Google Analytics 4 (GA4): ---
1. Visit: https://analytics.google.com
2. Click Admin (gear icon on bottom left) ➔ "Property Access Management".
3. Click the "+" button ➔ "Add users".
4. Enter: {userEmail} ➔ Select "Administrator" (or "Editor").

Please ping me once invited so I can accept and start the implementation right away!

Best,
{yourName}`
      },
      {
        id: 'onb_shopify',
        badge: 'Shopify Access SOP',
        badgeClass: 'fl-badge-sop',
        title: 'Shopify Collaborator Access রিকোয়েস্ট SOP',
        desc: 'স্টোরের পাসওয়ার্ড না চেয়ে অফিসিয়াল Shopify Collaborator Request পাঠিয়ে স্টোর অ্যাক্সেস নেওয়ার স্ট্যান্ডার্ড নিয়ম।',
        steps: [
          { title: 'Collaborator Code সংগ্রহ', text: 'ক্লায়েন্টকে সেটিংস ➔ Users and Permissions এ গিয়ে ৪ ডিজিটের Collaborator Code দেখতে বলুন (যদি অন করা থাকে)।' },
          { title: 'Shopify Partner ড্যাশবোর্ড থেকে রিকোয়েস্ট', text: 'আপনার Shopify Partner একাউন্ট থেকে ক্লায়েন্টের myshopify URL দিয়ে রিকোয়েস্ট পাঠান।' }
        ],
        text:
`Hi {clientName},

To integrate the dataLayer and tracking code on {brandName}'s Shopify store, I will send you an official Shopify Collaborator Access request from my Partner account.

Could you please share:
1. Your .myshopify.com store URL (e.g., brand-name.myshopify.com)
2. Your 4-digit Collaborator Request Code (found under: Shopify Admin ➔ Settings ➔ Users and permissions ➔ Collaborators).

This is Shopify's official and safest method—no passwords are exchanged and you maintain full ownership of your store at all times.

Looking forward to your details!

Best,
{yourName}`
      }
    ],

    handover: [
      {
        id: 'hnd_delivery',
        badge: 'Delivery Note & QA Proof',
        badgeClass: 'fl-badge-delivery',
        title: 'প্রজেক্ট ডেলিভারি নোট ও টেস্ট প্রুফ হ্যান্ডঅভার ড্রাফট',
        desc: 'কাজ শেষে কী কী সম্পন্ন হয়েছে, কীভাবে টেস্ট করা হয়েছে এবং আগামী ৭২ ঘণ্টা কী লক্ষ্য রাখতে হবে তা সাজিয়ে পেশাদার ডেলিভারি মেসেজ।',
        text:
`Hi {clientName},

I am delighted to inform you that the complete implementation of {serviceName} for {brandName} has been successfully completed and verified! 🎉

Here is a summary of what has been implemented:
1. DataLayer & Event Architecture: Correctly configured view_item, add_to_cart, begin_checkout, and purchase events with ISO currency, dynamic values, and unique transaction IDs.
2. Server-Side Conversion API: Configured with 100% event deduplication between browser pixel and server payload.
3. Quality Assurance: Live test purchase executed successfully. Meta Event Match Quality is primed for high ratings (8.5+/10).

I have also attached the formal Implementation Spec-Sheet & Audit Report for your records.

Recommended Next Steps:
- Please allow 48 to 72 hours for Meta and GA4 machine learning models to populate historical data.
- Do not modify checkout theme code or install conflicting third-party tracking apps without checking dataLayer listeners.

It has been an absolute pleasure working with you on this project!

Best regards,
{yourName}`
      },
      {
        id: 'hnd_review',
        badge: '5-Star Review Request',
        badgeClass: 'fl-badge-delivery',
        title: '৫-স্টার রিভিউ ও টেস্টিমোনিয়াল চাওয়ার মনস্তাত্ত্বিক ড্রাফট',
        desc: 'প্ল্যাটফর্মের নিয়ম মেনে (TOS compliant) সন্তুষ্ট ক্লায়েন্টের কাছ থেকে সুন্দর পজিটিভ ফিডব্যাক পাওয়ার পরীক্ষিত স্ক্রিপ্ট।',
        text:
`Hi {clientName},

Thank you so much for the wonderful collaboration on {brandName}'s project!

As an independent digital marketing specialist, feedback from great clients like you truly means the world to my business and helps other store owners find reliable help.

If you are happy with the quality, communication, and speed of my work, would you mind taking 30 seconds to leave an honest review on the platform?

Even a sentence or two about how we resolved your {serviceName} would be deeply appreciated!

Thank you once again, and I wish {brandName} continued exponential sales!

Warm regards,
{yourName}`
      },
      {
        id: 'hnd_retainer',
        badge: 'Monthly Retainer Upsell',
        badgeClass: 'fl-badge-email',
        title: 'ওয়ান-টাইম ক্লায়েন্টকে মাসিক রিটেইনারে ($500-$1500) রূপান্তর ড্রাফট',
        desc: 'এককালীন ট্র্যাকিং ফিক্স শেষ হওয়ার পর ক্লায়েন্টকে রেগুলার বিজ্ঞাপন ম্যানেজমেন্ট বা সাপ্তাহিক ডাটা মনিটরিং সার্ভিসে নিয়ে আসার পিচ।',
        text:
`Hi {clientName},

Now that {brandName}'s tracking foundation is 100% rock-solid, your advertising algorithms will receive accurate purchase signals to scale profitably.

However, as you increase ad spend, two common challenges typically arise:
1. Creative Fatigue: Ads that perform well today start burning out within 14-21 days, raising your CPA.
2. Tracking Discrepancies: Browser/platform updates occasionally break dataLayer pipelines without warning.

I offer a dedicated Monthly Growth & Optimization Retainer for {retainerPrice}, which includes:
- Weekly ROAS & CPA optimization across Meta & Google Ads
- Creative fatigue monitoring & weekly ad angle recommendations
- Ongoing CAPI server health monitoring & bug fixes
- Bi-weekly Executive Performance Report & strategy call

This ensures {brandName}'s ad spend is actively guarded and scaling every single week without you needing to worry about the technical details.

Would you like to hop on a quick call this Thursday to discuss how we can partner up for the upcoming month?

Best regards,
{yourName}`
      }
    ]
  };

  function render(container) {
    if (!container) return;

    var html = '';
    html += '<div class="fl-wrap">';

    // Header
    html += '<div class="fl-header">';
    html += '<span class="status-pill status-ready" style="display:inline-flex;margin-bottom:8px;">💼 Freelance Client Kit</span>';
    html += '<h1>ফ্রিল্যান্স SOPs ও ক্লায়েন্ট কমিউনিকেশন কিট</h1>';
    html += '<p style="color:var(--muted);font-size:14px;max-width:780px;margin:0 0 16px;">আন্তর্জাতিক মার্কেটপ্লেস (Upwork, Fiverr) ও সরাসরি কোল্ড আউটরিচের জন্য প্রমাণিত প্রপোজাল, ক্লায়েন্ট অনবোর্ডিং অ্যাক্সেস SOP এবং প্রজেক্ট ডেলিভারি কিট। নিচে আপনার বা ক্লায়েন্টের নাম লিখলে সব টেমপ্লেট সাথে সাথে ডাইনামিকালি তৈরি হয়ে যাবে!</p>';
    html += '</div>';

    // Customizer Box
    html += '<div class="fl-customizer">';
    html += '<div class="fl-customizer-title">⚡ লাইভ কাস্টমাইজার (এখানে তথ্য লিখলে সব মেসেজে স্বয়ংক্রিয়ভাবে বসে যাবে)</div>';
    html += '<div class="fl-customizer-grid">';
    html += '<div class="fl-customizer-field"><label>ক্লায়েন্টের নাম (Client Name)</label><input type="text" id="fl_clientName" value="' + escapeHtml(state.vars.clientName) + '" placeholder="e.g. Alex"></div>';
    html += '<div class="fl-customizer-field"><label>ব্র্যান্ড / স্টোর নেম (Store/Brand)</label><input type="text" id="fl_brandName" value="' + escapeHtml(state.vars.brandName) + '" placeholder="e.g. UrbanAura"></div>';
    html += '<div class="fl-customizer-field"><label>আপনার নাম (Your Name)</label><input type="text" id="fl_yourName" value="' + escapeHtml(state.vars.yourName) + '" placeholder="e.g. Md. Digital Marketer"></div>';
    html += '<div class="fl-customizer-field"><label>সার্ভিস / কাজ (Service Name)</label><input type="text" id="fl_serviceName" value="' + escapeHtml(state.vars.serviceName) + '" placeholder="e.g. GA4 & Meta CAPI Tracking"></div>';
    html += '<div class="fl-customizer-field"><label>আপনার প্রফেশনাল ইমেইল</label><input type="text" id="fl_userEmail" value="' + escapeHtml(state.vars.userEmail) + '" placeholder="e.g. pro@example.com"></div>';
    html += '<div class="fl-customizer-field"><label>Meta Business Partner ID</label><input type="text" id="fl_partnerId" value="' + escapeHtml(state.vars.partnerId) + '" placeholder="e.g. 123456789012345"></div>';
    html += '<div class="fl-customizer-field"><label>মাসিক রিটেইনার মূল্য (Retainer)</label><input type="text" id="fl_retainerPrice" value="' + escapeHtml(state.vars.retainerPrice) + '" placeholder="e.g. $650/month"></div>';
    html += '</div>';
    html += '</div>';

    // Tabs Navigation
    html += '<div class="fl-tabs">';
    html += '<button type="button" class="fl-tab-btn ' + (state.activeTab === 'messages' ? 'active' : '') + '" data-tab="messages">💬 ১. ক্লায়েন্ট মেসেজ ও প্রপোজাল</button>';
    html += '<button type="button" class="fl-tab-btn ' + (state.activeTab === 'onboarding' ? 'active' : '') + '" data-tab="onboarding">📋 ২. ক্লায়েন্ট অনবোর্ডিং ও অ্যাক্সেস SOP</button>';
    html += '<button type="button" class="fl-tab-btn ' + (state.activeTab === 'handover' ? 'active' : '') + '" data-tab="handover">📦 ৩. ডেলিভারি ও ৫-স্টার রিভিউ কিট</button>';
    html += '</div>';

    // Content Cards
    var list = templates[state.activeTab] || [];
    list.forEach(function (tmpl) {
      html += '<div class="fl-card">';
      html += '<div class="fl-card-head">';
      html += '<div>';
      html += '<span class="fl-badge ' + tmpl.badgeClass + '">' + tmpl.badge + '</span>';
      html += '<h2 class="fl-card-title" style="margin-top:6px;">' + escapeHtml(tmpl.title) + '</h2>';
      html += '</div>';
      html += '</div>';

      html += '<p class="fl-card-desc">' + escapeHtml(tmpl.desc) + '</p>';

      // If SOP steps exist
      if (tmpl.steps && tmpl.steps.length) {
        html += '<div style="margin-bottom:14px;">';
        tmpl.steps.forEach(function (st, sIdx) {
          html += '<div class="fl-sop-step">';
          html += '<div class="fl-sop-num">' + (sIdx + 1) + '</div>';
          html += '<div class="fl-sop-content">';
          html += '<div class="fl-sop-title">' + escapeHtml(st.title) + '</div>';
          html += '<div class="fl-sop-text">' + escapeHtml(st.text) + '</div>';
          html += '</div></div>';
        });
        html += '</div>';
      }

      // Script Code Box
      var renderedText = interpolate(tmpl.text);
      html += '<div class="fl-code-box" id="code_' + tmpl.id + '">' + escapeHtml(renderedText) + '</div>';

      // Actions Row
      html += '<div class="fl-actions">';
      html += '<button type="button" class="fl-btn-copy" data-target="code_' + tmpl.id + '">📋 মেসেজটি কপি করুন</button>';
      html += '</div>';

      html += '</div>';
    });

    html += '</div>';

    container.innerHTML = html;
    bindEvents(container);
  }

  function bindEvents(container) {
    // Tab switching
    var tabBtns = container.querySelectorAll('.fl-tab-btn');
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.activeTab = btn.getAttribute('data-tab');
        saveState();
        render(container);
      });
    });

    // Customizer input changes
    ['clientName', 'brandName', 'yourName', 'serviceName', 'userEmail', 'partnerId', 'retainerPrice'].forEach(function (k) {
      var el = container.querySelector('#fl_' + k);
      if (el) {
        el.addEventListener('input', function () {
          state.vars[k] = el.value;
          saveState();
          // Update live code boxes without full re-render
          var list = templates[state.activeTab] || [];
          list.forEach(function (tmpl) {
            var box = container.querySelector('#code_' + tmpl.id);
            if (box) {
              box.textContent = interpolate(tmpl.text);
            }
          });
        });
      }
    });

    // 1-Click Copy Buttons
    var copyBtns = container.querySelectorAll('.fl-btn-copy');
    copyBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-target');
        var box = container.querySelector('#' + targetId);
        if (box) {
          var text = box.textContent || box.innerText;
          navigator.clipboard.writeText(text).then(function () {
            var originalText = btn.innerHTML;
            btn.innerHTML = '✓ কপি সম্পন্ন হয়েছে!';
            btn.classList.add('copied');
            if (typeof window.showToast === 'function') {
              window.showToast('ক্লিপবোর্ডে কপি করা হয়েছে!');
            }
            setTimeout(function () {
              btn.innerHTML = originalText;
              btn.classList.remove('copied');
            }, 2500);
          }).catch(function (err) {
            console.error('Clipboard copy error:', err);
          });
        }
      });
    });
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
    var container = document.getElementById('freelanceContainer');
    if (container) {
      render(container);
    }

    var openBtn = document.getElementById('openFreelanceKit');
    if (openBtn) {
      openBtn.addEventListener('click', function () {
        if (typeof window.showView === 'function') {
          window.showView('freelance');
        }
      });
    }

    window.addEventListener('skill-lab:viewchange', function (e) {
      if (e.detail && e.detail.name === 'freelance') {
        var c = document.getElementById('freelanceContainer');
        if (c) render(c);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.PhotoPixcFreelance = {
    init: init,
    render: render
  };
})();
