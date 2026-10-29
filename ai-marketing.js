'use strict';
/**
 * PhotoPixc AI Marketing Track:
 * "AI with Marketing, Creative Strategy & Automation Path"
 * Complete client-side vanilla JS module. Zero build step. LocalStorage persistence.
 */

const AI_STORAGE = 'photopixc_ai_marketing_v1';

function getAIMarketingState() {
  try {
    const raw = localStorage.getItem(AI_STORAGE);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    modulesCompleted: {},
    notes: {},
    quizScores: {},
    adTester: { headline: '৭ দিনে পান উজ্জ্বল সতেজ ত্বক', sub: '১০,০০০+ গ্রাহকের বিশ্বস্ত সমাধান', cta: 'অর্ডার করুন', theme: 'green' },
    loomAudit: { brand: 'PureGlow Skincare', platform: 'Meta Ad Creative', leaks: [0, 1] },
    clarityMode: 'simple' // 'simple' (Class 5 standard) or 'detailed'
  };
}

function saveAIMarketingState(data) {
  try {
    localStorage.setItem(AI_STORAGE, JSON.stringify(data));
  } catch (e) {}
}

const aiMarketingModules = [
  {
    id: 1,
    titleEn: 'Visual Psychology & Conversion Design (CRO)',
    titleBn: 'ভিজ্যুয়াল সাইকোলজি ও কনভার্সন ডিজাইন (CRO)',
    badge: 'মডিউল ০১',
    time: '২০ মিনিট পাঠ',
    story: {
      title: '৬০ সেকেন্ডের সহজ গল্প: শরবতের দোকানের সাইনবোর্ড',
      text: 'কল্পনা করুন প্রচণ্ড রোদে আপনি ক্লান্ত হয়ে হেঁটে যাচ্ছেন। রাস্তার একপাশে দুটি শরবতের দোকান। প্রথম দোকানে ছোট হরফে লেখা: "এখানে উৎকৃষ্ট মানের লেবুজাত স্বাস্থ্যসম্মত পানীয় সরবরাহ করা হয়।" অন্য দোকানে বরফকুচি ও ঠান্ডা পানির ফোঁটা জড়ানো বিশাল এক গ্লাসের ছবি, উপরে বড় হরফে লেখা: "তৃষ্ণা মেটান মাত্র ২ মিনিটে—বরফ ঠান্ডা ফ্রেশ লেমোনেড!" আপনি কোন দোকানে যাবেন? দ্বিতীয় দোকানে! মানুষ তথ্য পড়ে কেনে না, মানুষ নিজের তৃষ্ণা ও অনুভূতির সমাধান দেখে আকর্ষিত হয়। এটাই হলো ভিজ্যুয়াল সাইকোলজি এবং Conversion Rate Optimization (CRO)।'
    },
    lessons: [
      {
        title: '১. রঙের মনস্তত্ত্ব (Color Psychology)',
        points: [
          'Trust Blue (নীল): বিশ্বাস, নিরাপত্তা ও ব্যাংকিং/টেক প্রডাক্ট (যেমন: Facebook, PayPal, Samsung)।',
          'Urgency Red/Orange (লাল/কমলা): দ্রুত সিদ্ধান্ত, ক্ষুধা ও লিমিটেড টাইম ডিসকাউন্ট (যেমন: Foodpanda, দারাজ সেল)।',
          'Health Green (সবুজ): প্রাকৃতিক, অর্গানিক ও সুস্থতা (যেমন: স্কিনকেয়ার, ভেষজ উপাদান)।',
          'Luxury Black/Gold (কালো/সোনালি): প্রিমিয়াম ও আভিজাত্য (যেমন: পারফিউম, দামি ঘড়ি)।'
        ]
      },
      {
        title: '২. ভিজ্যুয়াল হায়ারার্কি (Visual Hierarchy)',
        points: [
          'ধাপ ১ (Benefit): সবচেয়ে বড় হরফে ক্রেতার সবচেয়ে বড় লাভ বা সমাধান লিখুন।',
          'ধাপ ২ (Hero Product): আসল প্রডাক্টের ক্রিস্প, ক্লিন ছবি মাঝখানে রাখুন।',
          'ধাপ ৩ (Call-to-Action): পরিষ্কার ও স্পষ্ট বাটন ("অর্ডার করুন", "অফার নিন")।'
        ]
      },
      {
        title: '৩. ৩-সেকেন্ডের মোবাইল স্ক্রিন টেস্ট (The 3-Second Test)',
        points: [
          '৮৫% মানুষ সোশ্যাল মিডিয়া মোবাইলে বুড়ো আঙুল দিয়ে দ্রুত স্ক্রোল করে।',
          '৩ সেকেন্ডের মধ্যে বিজ্ঞাপন যদি উত্তর না দেয়: "এটা আমার কী উপকারে আসবে?"—তাহলে কাস্টমার হারিয়ে গেল!',
          'রুল: মোবাইল স্ক্রিন ৫ হাত দূরে রেখে যদি হেডলাইন পড়া না যায়, তবে ফন্ট সাইজ বড় করতে হবে।'
        ]
      },
      {
        title: '৪. আমাজন ও শপিফাই ৭-ইমেজ ফর্মুলা (7-Image Blueprint)',
        points: [
          'Image 1: Pure White Hero Shot (সাদা ব্যাকগ্রাউন্ডে পরিষ্কার প্রডাক্ট ছবি)।',
          'Image 2: Key Benefit Infographic (কেন কিনবেন? সেরা ৩টি সুবিধা)।',
          'Image 3: Dimension & What’s In The Box (সাইজ, ওজন ও উপাদানের স্পষ্ট মাপ)।',
          'Image 4: Lifestyle in Action (বাস্তবে একজন মানুষ প্রডাক্টটি ব্যবহার করছে)।',
          'Image 5: Comparison Chart (সাধারণ কমদামি প্রডাক্ট বনাম আমাদের সমাধান)।',
          'Image 6: Social Proof & Reviews (বাস্তব কাস্টমারের ৫-স্টার রিভিউ ও প্রশংসাপত্র)।',
          'Image 7: Guarantee & How-to-Use (মানিব্যাক গ্যারান্টি ব্যাজ ও ব্যবহারের সহজ নিয়ম)।'
        ]
      }
    ],
    comparison: {
      weakTitle: '❌ Weak Example (সাধারণ দুর্বল ডিজাইন)',
      weakPoints: [
        'প্রডাক্টের এলোমেলো ও ঘোলা ছবি।',
        'ছোট ফন্টে কোম্পানির স্তুতিগান লেখা: "আমরাই শ্রেষ্ঠ ব্র্যান্ড।"',
        'কোনো পরিষ্কার বেনিফিট বা অফার নেই; রঙ অতিরিক্ত চড়া কিন্তু কনট্রাস্ট নেই।',
        'মোবাইলে ছোট পর্দায় লেখাই পড়া যায় না।'
      ],
      winTitle: '✅ PhotoPixc Winning Standard (উইনিং কনভার্সন মেথড)',
      winPoints: [
        'বোল্ড ৬-শব্দের পেইনপয়েন্ট হুক: "গরমে ঘাম ও দুর্গন্ধ দূর করুন ৭ দিনে!"',
        'হাই-কনট্রাস্ট লাইটিংয়ে প্রডাক্টের ক্রিস্প শট।',
        '৭-ইমেজ ফর্মুলার স্পষ্ট কম্প্যারিজন চার্ট ও মানিব্যাক ট্রাস্ট ব্যাজ।',
        'মোবাইলের থাম্ব-জোনে হাইলাইট করা স্পট-অন কল-টু-অ্যাকশন।'
      ]
    },
    practiceTask: 'একটি কাল্পনিক স্কিনকেয়ার সিরামের (PureGlow) জন্য ৭-ইমেজ ফর্মুলার ধাপ ২ (ইনফোগ্রাফিক) এবং ধাপ ৫ (কম্প্যারিজন চার্ট)-এ আপনি কী কী তথ্য ও টেক্সট রাখবেন, সংক্ষেপে নিচে লিখুন:',
    quiz: [
      {
        q: 'মোবাইলের বিজ্ঞাপনে ভিজ্যুয়াল হায়ারার্কির প্রথম অগ্রাধিকার কোনটি হওয়া উচিত?',
        options: ['কোম্পানির প্রতিষ্ঠার সাল ও ইতিহাস', 'ক্রেতার প্রধান বেনিফিট বা সমস্যার সমাধান', 'ডিজাইন এজেন্সির লোগো'],
        ans: 1,
        why: 'সঠিক! ক্রেতা প্রথমে নিজের লাভ (Benefit) খোঁজে। ৩ সেকেন্ডে সমাধান দেখতে পেলেই কেবল সে পরবর্তী ধাপে যায়।'
      },
      {
        q: 'আমাজন/ই-কমার্স লিস্টিংয়ের ৭-ইমেজ ফর্মুলায় Image 5-এর মূল কাজ কী?',
        options: ['সাধারণ পণ্যের সাথে তুলনা করে নিজের শ্রেষ্ঠত্ব দেখানো (Comparison)', 'শিপিং পলিসির লম্বা শর্তাবলি লেখা', 'কালো ব্যাকগ্রাউন্ডে ছবি দেওয়া'],
        ans: 0,
        why: 'চমৎকার! কম্প্যারিজন চার্ট ক্রেতার মনের দ্বিধা দূর করে প্রমাণ করে কেন এই পণ্যটি অন্যদের চেয়ে সেরা।'
      },
      {
        q: '৩-সেকেন্ডের মোবাইল স্ক্রিন টেস্টে ফেল করার সবচেয়ে বড় লক্ষণ কোনটি?',
        options: ['হেডলাইন বড় অক্ষরে থাকা', 'মোবাইল স্ক্রিনে ৫ হাত দূর থেকে লেখা পড়তে না পারা', 'ছবিতে প্রডাক্ট স্পষ্ট থাকা'],
        ans: 1,
        why: 'একদম ঠিক! ছোট ফন্ট ও অতিরিক্ত ঘিঞ্জি টেক্সট মোবাইলের দ্রুত স্ক্রোলে কেউ পড়তে পারে না।'
      }
    ]
  },
  {
    id: 2,
    titleEn: 'Copywriting & Thumb-Stopping Hooks (HSO Formula)',
    titleBn: 'কপিরাইটিং ও থাম্ব-স্টপিং হুক্স (HSO ফর্মুলা)',
    badge: 'মডিউল ০২',
    time: '২৫ মিনিট পাঠ',
    story: {
      title: '৬০ সেকেন্ডের সহজ গল্প: পাড়ার ফেরিওয়ালার হাঁকডাক',
      text: 'দুপুরে পাড়ার গলিতে একজন ফেরিওয়ালা যদি বলে "বাসন নিন, হাঁড়ি নিন"—কেউ জানলা দিয়েও তাকায় না। কিন্তু অন্যজন এসে চিৎকার করে বলে: "পুরনো ভাঙা লোহা বা বাতিল কাগজ দিন, চকচকে নন-স্টিক ফ্রাইপ্যান নিয়ে যান!" সাথে সাথে বারান্দা থেকে মানুষ উঁকি দেয়। কেন? প্রথমজন প্রডাক্ট বিক্রি করছিল, দ্বিতীয়জন একটি চমকপ্রদ অফার ও পরিবর্তনের সুযোগ তৈরি করেছে! বিজ্ঞাপনেও প্রথম এক সেকেন্ডের এই হাঁকডাকই হলো "Hook", মাঝের সমস্যা-সমাধান "Story", আর শেষ অংশটি হলো "Offer" (HSO Formula)।'
    },
    lessons: [
      {
        title: '১. হুক-স্টোরি-অফার (HSO) ফ্রেমওয়ার্ক',
        points: [
          'Hook (১ম ১-২ সেকেন্ড): স্ক্রোল থামিয়ে দেওয়া চমক, অদ্ভুত তথ্য বা সাধারণ বিশ্বাসের বিপরীত প্রশ্ন (Pattern Interrupt)।',
          'Story (পরবর্তী ৩-৫ সেকেন্ড): ক্রেতার দৈনন্দিন কষ্ট বা আকাঙ্ক্ষার সাথে আবেগী সংযোগ স্থাপন।',
          'Offer (শেষ অংশ): এমন এক সমাধান বা বান্ডেল ডিল যা ক্রেতা ফেরাতে পারবে না।'
        ]
      },
      {
        title: '২. ৬ শব্দের নিচে হেডলাইন লেখার জাদু',
        points: [
          'মোবাইলে দীর্ঘ বাক্য কেউ পড়ে না। চোখ কেবল ৩ থেকে ৫টি শব্দ স্ক্যান করে।',
          'খারাপ হেডলাইন (১০ শব্দ): "আমাদের প্রাকৃতিক উপাদান দিয়ে তৈরি হারবাল শ্যাম্পু চুল পড়া রোধ করবে।"',
          'উইনিং হেডলাইন (৫ শব্দ): "৭ দিনে চুল পড়া বন্ধ!"',
          'ফর্মুলা: [কাঙ্ক্ষিত ফলাফল] + [নির্দিষ্ট সময়] অথবা [কষ্ট দূর করার প্রতিশ্রুতি]।'
        ]
      },
      {
        title: '৩. ডিজাইনের ভেতর ক্রেতার আপত্তি (Objections) ভাঙা',
        points: [
          'আপত্তি ১: "কাজ না করলে টাকা জলে যাবে?" → ছবির কোণায় রাখুন: "৩০ দিনের মানিব্যাক গ্যারান্টি"।',
          'আপত্তি ২: "ব্যবহার করা কি খুব কঠিন?" → ছবির ভেতর ছোট ৩-ধাপের ভেক্টর আইকন: "১. লাগান ২. ম্যাসাজ করুন ৩. উজ্জ্বল ত্বক পান"।',
          'আপত্তি ৩: "দাম বেশি মনে হচ্ছে?" → মূল্যের পাশে লিখুন: "প্রতিদিন খরচ মাত্র ১০ টাকা!"'
        ]
      }
    ],
    comparison: {
      weakTitle: '❌ Weak Example (দুর্বল কপি)',
      weakPoints: [
        '"আমরা দেশের সেরা অর্গানিক ফুড কোম্পানি। গুণগত মান আমাদের অহংকার।"',
        'লম্বা প্যারাগ্রাফ, সেলফিশ টোন (শুধু নিজের গুণগান)।',
        'ক্রেতার কোনো সুনির্দিষ্ট সমস্যা সমাধানের কথা বলা নেই।'
      ],
      winTitle: '✅ PhotoPixc Winning Standard (উইনিং HSO কপি)',
      winPoints: [
        'Hook: "চিনি ছাড়া সকালের চা কি অসম্ভব?"',
        'Story: "ডায়াবেটিস বা ওজন বাড়ার ভয়ে পছন্দের মিষ্টি চা ছেড়ে দিয়েছেন?"',
        'Offer: "১০০% প্রাকৃতিক স্টিভিয়া ড্রপস—জিরো ক্যালোরি, শতভাগ মিষ্টি স্বাদ। আজই ২৫% ছাড়ে ট্রাই করুন!"'
      ]
    },
    practiceTask: 'একটি ব্লুটুথ হেডফোনের জন্য ৬ শব্দের ভেতরে একটি উইনিং হেডলাইন এবং একটি শীর্ষ আপত্তি (যেমন: ব্যাটারি দ্রুত শেষ হওয়া) সমাধানের ছোট কপি লিখুন:',
    quiz: [
      {
        q: 'বিজ্ঞাপনের HSO ফ্রেমওয়ার্কে "Hook"-এর মূল দায়িত্ব কী?',
        options: ['কোম্পানির ইনভয়েস ডাউনলোড করানো', 'মোবাইলের দ্রুত স্ক্রোলিং থামিয়ে ক্রেতার মনোযোগ আটকানো', 'কাস্টমার কেয়ারের নম্বর ডায়াল করানো'],
        ans: 1,
        why: 'সঠিক! হুকের কাজই হলো এক নিমেষে স্ক্রোল থামিয়ে কাস্টমারকে বাকি বার্তা পড়ার জন্য আটকে ফেলা।'
      },
      {
        q: 'মোবাইল অ্যাড ক্রিয়েটিভের জন্য হেডলাইনের আদর্শ দৈর্ঘ্য কত রাখা বুদ্ধিমানের কাজ?',
        options: ['১৫ থেকে ২০ শব্দ', '৬ বা তার চেয়ে কম শব্দে সরাসরি বেনিফিট', 'কমপক্ষে ৩ প্যারাগ্রাফ'],
        ans: 1,
        why: 'একদম ঠিক! ছোট, তীক্ষ্ণ ও হাই-ইমপ্যাক্ট হেডলাইন মানুষের মস্তিষ্কে সবচেয়ে দ্রুত প্রসেস হয়।'
      },
      {
        q: 'ক্রেতার "পণ্যটি ব্যবহারের নিয়ম কঠিন হতে পারে"—এই আপত্তি কীভাবে ক্রিয়েটিভে দূর করা যায়?',
        options: ['১০০ পৃষ্ঠার ম্যানুয়াল অ্যাটাচ করে', 'ছবিতে ৩টি সহজ ধাপের (Step 1-2-3) ভিজ্যুয়াল আইকন দিয়ে', 'কোনো কথা না বলে এড়িয়ে গিয়ে'],
        ans: 1,
        why: 'চমৎকার! সহজ ভিজ্যুয়াল স্টেপ দেখলেই ক্রেতার মন আশ্বস্ত হয় যে এটি ব্যবহার করা খুবই সহজ।'
      }
    ]
  },
  {
    id: 3,
    titleEn: 'AI Superpower for Designers & Marketers',
    titleBn: 'ডিজাইনার ও মার্কেটারদের এআই সুপারপাওয়ার',
    badge: 'মডিউল ০৩',
    time: '২৫ মিনিট পাঠ',
    story: {
      title: '৬০ সেকেন্ডের সহজ গল্প: ফটো স্টুডিওর লাখ টাকার সেট',
      text: 'আগে একটি নতুন ওয়াটার বোতল বা পারফিউমের বিজ্ঞাপন শুট করতে চাইলে স্টুডিও ভাড়া, স্পট লাইট, ক্যামেরাম্যান, বরফ বা ফুলের সেট সাজাতে ২০,০০০ থেকে ৫০,০০০ টাকা এবং ৩ দিন সময় লাগত। আজ একজন স্মার্ট মার্কেটার তার স্মার্টফোনে সাধারণ টেবিলে বোতলটির একটা ছবি তুলে Background Remove করে, তারপর Photoshop Generative Fill বা Midjourney দিয়ে পেছনে সানলিট মার্বেল স্ল্যাব ও ফ্রেশ স্প্ল্যাশ বানিয়ে দেয় মাত্র ২ মিনিটে! এআই কোনো রিপ্লেসমেন্ট নয়, এআই হলো মার্কেটারের ১০ গুণ দ্রুতগতির সহকারী।'
    },
    lessons: [
      {
        title: '১. ২ মিনিটে কাস্টমার পেইন-পয়েন্ট রিসার্চ (ChatGPT/Claude)',
        points: [
          'আমাজন বা দারাজের সমগোত্রীয় পণ্যের ১০০টি ১-স্টার ও ২-স্টার রিভিউ কপি করে এআই-কে প্রম্পট দিন।',
          'প্রম্পট: "Analyze these negative reviews. Extract top 3 customer complaints and write 5 ad angles directly solving those complaints."',
          'ফলাফল: ক্রেতাদের আসল কষ্টের ভাষা ও না-বলা কথা বের হয়ে আসে, যা দিয়ে নিখুঁত বিজ্ঞাপন বানানো যায়।'
        ]
      },
      {
        title: '২. স্টুডিও-গ্রেড প্রোডাক্ট ব্যাকড্রপ (Generative Fill / Midjourney)',
        points: [
          'মূল প্রডাক্টের আকৃতি ও লোগো সবসময় খাঁটি (Original) রাখতে হবে।',
          'প্রডাক্টের পেছনে আলো-ছায়ার ভারসাম্য ঠিক রেখে প্রম্পট করুন: "A luxury perfume bottle on a white polished marble table, soft morning sunlight through linen curtains, realistic contact shadow, 8k product photography".',
          'বাস্তব কন্ট্যাক্ট শ্যাডো (Shadow) যুক্ত করলেই ছবি সম্পূর্ণ ন্যাচারাল মনে হয়।'
        ]
      },
      {
        title: '৩. স্ট্যাটিক পোস্টার থেকে ১০ সেকেন্ডের রিলস ভিডিও (CapCut AI / ElevenLabs)',
        points: [
          'একটি স্থির ছবি দিয়ে এখন আর সব অডিয়েন্স ধরা যায় না।',
          'ক্যাপকাট এআই বা রানওয়ে দিয়ে স্থির পোস্টারের ব্যাকগ্রাউন্ডে সূক্ষ্ম মোশন বা জুম এফেক্ট দিন।',
          'ElevenLabs দিয়ে ন্যাচারাল ও কনফিডেন্ট ভয়েসওভার এবং এআই অটো-ক্যাপশন যুক্ত করে তৈরি করুন হাইপার-এনগেজিং ইনস্টাগ্রাম রিলস/ইউটিউব শর্টস।'
        ]
      }
    ],
    comparison: {
      weakTitle: '❌ Weak Example (এআই-এর ভুল ব্যবহার)',
      weakPoints: [
        'অবাস্তব ও কার্টুনিশ ছবি বানানো যা দেখে ক্রেতা ফেক বা ভুয়া মনে করে।',
        'এআই দিয়ে বড় বড় ইংরেজি জটিল শব্দ দিয়ে ভরা রোবোটিক ক্যাপশন লেখা।',
        'প্রডাক্টের আসল সাইজ বা ব্র্যান্ড লোগো বিকৃত করে ফেলা।'
      ],
      winTitle: '✅ PhotoPixc Winning Standard (এআই-এর প্রফেশনাল ব্যবহার)',
      winPoints: [
        'আসল প্রডাক্টের শতভাগ অরিজিনাল ছবি অক্ষত রেখে কেবল আন্তর্জাতিক মানের লাইটিং ও ব্যাকগ্রাউন্ড জেনারেট করা।',
        'কাস্টমার রিভিউ থেকে এআই দিয়ে সংগৃহীত আসল সমস্যার ভাষায় সহজ বাংলা কপি লেখা।',
        '১০ সেকেন্ডের শর্ট-ফর্ম ভিডিও ও অটো-ক্যাপশন দিয়ে হাই সিলেক্টিভ এনগেজমেন্ট তৈরি করা।'
      ]
    },
    practiceTask: 'একটি অর্গানিক মধু ব্র্যান্ডের জন্য Midjourney বা Generative Fill-এ কী প্রম্পট লিখবেন যাতে প্রডাক্টটি গ্রামীণ ও প্রাকৃতিক আবহে জীবন্ত মনে হয়? একটি প্রম্পট ড্রাফট করুন:',
    quiz: [
      {
        q: 'প্রতিযোগীদের নেগেটিভ রিভিউ বিশ্লেষণ করে এআই দিয়ে বিজ্ঞাপন তৈরির সবচেয়ে বড় সুবিধা কী?',
        options: ['প্রতিযোগীদের একাউন্ট ব্যান করানো', 'ক্রেতাদের আসল বিরক্তি ও না-বলা কষ্টের ভাষায় নিখুঁত হুক তৈরি করা', 'অটোমেটিক্যালি প্রোডাক্টের দাম বাড়িয়ে দেওয়া'],
        ans: 1,
        why: 'সঠিক! মানুষ যেসব কারণে পুরোনো পণ্য নিয়ে অসন্তুষ্ট, আপনার বিজ্ঞাপনে সেই সমাধানের কথা বললে তারা দ্রুত আকৃষ্ট হয়।'
      },
      {
        q: 'প্রডাক্ট ব্যাকগ্রাউন্ড জেনারেশনের সময় কোন বিষয়টি অক্ষত রাখা অত্যন্ত জরুরি?',
        options: ['আসল প্রডাক্টের চেহারা, লোগো ও অনুপাত (Authenticity)', 'পুরনো ঝাপসা ব্যাকগ্রাউন্ড', 'কালো ফ্রেম'],
        ans: 0,
        why: 'একদম ঠিক! প্রডাক্ট দেখতে অবাস্তব বা ফেক লাগলে ক্রেতার আস্থা নষ্ট হয়ে যায়।'
      },
      {
        q: 'সোশ্যাল মিডিয়া বিজ্ঞাপনে স্ট্যাটিক পোস্টারকে ১০ সেকেন্ডের মোশন ভিডিওতে রূপান্তর করলে কোন মেট্রিকটি বৃদ্ধি পায়?',
        options: ['ব্যান্ডউইডথ খরচ', 'থাম্ব-স্টপ ও ভিডিও এনগেজমেন্ট রেট (CTR)', 'সার্ভার ডাউন টাইম'],
        ans: 1,
        why: 'চমৎকার! সোশ্যাল মিডিয়া অ্যালগরিদম ভিডিও কন্টেন্টকে বেশি রিচ দেয় এবং স্ক্রোলে মানুষের চোখ গতিশীল চিত্রে আটকে যায়।'
      }
    ]
  },
  {
    id: 4,
    titleEn: 'Marketing Automation Workflows (No-Code)',
    titleBn: 'মার্কেটিং অটোমেশন ওয়ার্কফ্লো (নো-কোড)',
    badge: 'মডিউল ০৪',
    time: '৩০ মিনিট পাঠ',
    story: {
      title: '৬০ সেকেন্ডের সহজ গল্প: ব্যস্ত মিষ্টির দোকানদার',
      text: 'একটি জনপ্রিয় মিষ্টির দোকানে প্রতিদিন ৫০০ জন মানুষ এসে জিজ্ঞেস করে: "ভাই, রসগোল্লার কেজি কত? কালোজাম ফ্রেশ আছে তো?" দোকানদার যদি একা একা প্রতিটি মানুষকে উত্তর দিতে থাকে, তবে সে মিষ্টি বানানোর সময় পাবে না এবং ঘণ্টার পর ঘণ্টা লাইন লেগে কাস্টমার চলে যাবে। কিন্তু যদি কাউন্টারে অটোমেটিক ডিজিটাল ডিসপ্লে ও ইনস্ট্যান্ট প্যাকেট রেডি থাকে, তবে বিক্রি ৫ গুণ বেড়ে যায়! মার্কেটিং অটোমেশন হলো আপনার ব্যবসার সেই ডিজিটাল সহকারী, যা ঘুমিয়ে থাকা অবস্থাতেও প্রতিটি ক্রেতাকে ৩ সেকেন্ডে উত্তর দেয়।'
    },
    lessons: [
      {
        title: '১. ক্যানভা বাল্ক ক্রিয়েট + গুগল শিটস (Canva Bulk Create)',
        points: [
          '৩০টি ফেসবুক পোস্টার বানাতে ম্যানুয়ালি পুরো দিন নষ্ট করার দিন শেষ।',
          'গুগল শিটসে ৩০ দিনের ৩০টি টিপস বা প্রোডাক্টের নাম ও দাম সাজিয়ে নিন (CSV)।',
          'Canva Pro-এর "Bulk Create" টুলে গিয়ে শিটের ডাটা কানেক্ট করে এক ক্লিকে ৩০টি ইউনিক ব্র্যান্ডেড পোস্টার তৈরি করুন।'
        ]
      },
      {
        title: '২. ম্যানিচ্যাট অটো-কমেন্ট ও ডিএম ফানেল (ManyChat Workflow)',
        points: [
          'পোস্টের কমেন্টে কেউ যখন "Price" বা "দাম কত" লিখে, সাথে সাথে ম্যানিচ্যাট ৩ সেকেন্ডে তার কমেন্টে রিপ্লাই দেয়: "ইনবক্সে চেক করুন!"',
          'একই মুহূর্তে কাস্টমারের মেসেঞ্জারে বা ইনস্টাগ্রাম ডিএমে ছবির সাথে প্রোডাক্ট লিংক ও স্পেশাল কুপন চলে যায়।',
          'এতে ফেসবুক পোস্টের এনগেজমেন্ট বাড়ে এবং কাস্টমার হট-স্টেটে থাকতেই কেনাকাটা সম্পন্ন করে।'
        ]
      },
      {
        title: '৩. জ্যাপিয়ার/মেক দিয়ে তাৎক্ষণিক লিড ক্যাপচার (Zapier / Make.com)',
        points: [
          'ফেসবুক বা গুগল অ্যাডসের লিড ফর্মে কেউ নাম-নম্বর সাবমিট করলে জ্যাপিয়ার তাৎক্ষণিকভাবে তা গুগল শিটে সেভ করে।',
          'একই সাথে সেলস টিমের হোয়াটসঅ্যাপ গ্রুপে নোটিফিকেশন পাঠায়: "নতুন লিড: সাকিব, ০১৭XXXXXXXX, ৫ মিনিটের মধ্যে কল দিন!"',
          'লিড রেসপন্স টাইম ৫ মিনিটের নিচে নামালে সেলস ক্লোজিং রেট ৩৯১% বৃদ্ধি পায়!'
        ]
      },
      {
        title: '৪. ক্লায়েন্ট রিপোর্টিং অটোমেশন (Looker Studio)',
        points: [
          'মাস শেষে ম্যানুয়ালি এক্সেল শিট ও স্ক্রিনশট বানিয়ে ক্লায়েন্টকে পাঠানোর ক্লান্তি নেই।',
          'Google Looker Studio দিয়ে একবার ক্লায়েন্টের Meta/Google Ads ডাটা কানেক্ট করে একটি লাইভ ড্যাশবোর্ড লিঙ্ক ক্লায়েন্টকে শেয়ার করুন।'
        ]
      }
    ],
    comparison: {
      weakTitle: '❌ Weak Example (ম্যানুয়াল স্লো প্রসেস)',
      weakPoints: [
        'রাতে কমেন্ট আসা লিডকে সকালে ১২ ঘণ্টা পর ম্যানুয়ালি মেসেজ দেওয়া (ততক্ষণে ক্রেতা অন্য দোকান থেকে কিনে নিয়েছে)।',
        'একটা একটা করে ৩০টি পোস্টার কপি-পেস্ট করে সারারাত জেগে তৈরি করা।',
        'ক্লায়েন্টকে ভাঙাচোরা অগোছালো হোয়াটসঅ্যাপ স্ক্রিনশট পাঠানো।'
      ],
      winTitle: '✅ PhotoPixc Winning Standard (হাই-স্পিড নো-কোড অটোমেশন)',
      winPoints: [
        'কমেন্ট করার ৩ সেকেন্ডে অটো-ডিএম ডেলিভারি।',
        'লিড আসার ৩০ সেকেন্ডের মধ্যে সেলস টিমের হোয়াটসঅ্যাপে অ্যালার্ট।',
        'লুকার স্টুডিওর লাইভ অটো-আপডেটেড ড্যাশবোর্ডে ক্লায়েন্টের স্বচ্ছ বিশ্বাস অর্জন।'
      ]
    },
    practiceTask: 'আপনার বিজনেসে ManyChat সেটআপ করার জন্য কাস্টমার কমেন্টে "Price" লিখলে মেসেঞ্জারে স্বয়ংক্রিয়ভাবে পাঠানো ১ম মেসেজের একটি আন্তরিক ও আকর্ষণীয় বাংলা টেক্সট ড্রাফট করুন:',
    quiz: [
      {
        q: 'ফেসবুক বিজ্ঞাপনে আসা লিডকে ৫ মিনিটের মধ্যে ফোন বা মেসেজ দিলে কনভার্সনের কী প্রভাব পড়ে?',
        options: ['কনভার্সন রেট নাটকীয়ভাবে বৃদ্ধি পায় (প্রায় ৪০০% পর্যন্ত)', 'কাস্টমার বিরক্ত হয়ে ব্লক করে', 'অটোমেটিক্যালি অ্যাড খরচ বেড়ে যায়'],
        ans: 0,
        why: 'সঠিক! কাস্টমার যখন ফর্ম পূরণ করে তখন সে সবচেয়ে বেশি আগ্রহী থাকে। দ্রুত সাড়া পেলেই কনভার্সন নিশ্চিত হয়।'
      },
      {
        q: 'Canva Bulk Create ফিচারের সবচেয়ে বড় সুবিধা কোনটি?',
        options: ['সরাসরি ভিডিও এডিটিং করা', 'গুগল শিট থেকে এক ক্লিকে ডজন ডজন সোশ্যাল পোস্টার ও কোট কার্ড স্বয়ংক্রিয়ভাবে তৈরি করা', 'ওয়েবসাইটের হোস্টিং স্পিড বাড়ানো'],
        ans: 1,
        why: 'চমৎকার! ডাটা কানেক্ট করে এক ক্লিকে ৩০টি ইউনিক ডিজাইন তৈরি করা যায়, যা ঘণ্টার পর ঘণ্টা সময় বাঁচায়।'
      },
      {
        q: 'ক্লায়েন্টের জন্য Looker Studio ড্যাশবোর্ড ব্যবহারের প্রধান লাভ কী?',
        options: ['ফেসবুক পেইজ দ্রুত ভেরিফাই হওয়া', 'লাইভ অটো-আপডেটেড স্বচ্ছ রিপোর্টিং, যা ম্যানুয়াল এক্সেল শিটের ঝামেলা দূর করে', 'ফ্রি বুস্টিং ডলার পাওয়া'],
        ans: 1,
        why: 'একদম ঠিক! ক্লায়েন্ট যেকোনো সময় লিঙ্কে ক্লিক করে রিয়েল-টাইম পারফরম্যান্স দেখতে পায় এবং আপনার পেশাদারিত্বে মুগ্ধ হয়।'
      }
    ]
  },
  {
    id: 5,
    titleEn: 'Full-Funnel Ad Strategy & Creative Testing',
    titleBn: 'ফুল-ফানেল অ্যাড স্ট্র্যাটেজি ও ক্রিয়েটিভ টেস্টিং',
    badge: 'মডিউল ০৫',
    time: '২৫ মিনিট পাঠ',
    story: {
      title: '৬০ সেকেন্ডের সহজ গল্প: নদীর মোহনায় মাছ ধরা',
      text: 'নদীতে মাছ ধরতে গেলে কি কেবল তীরে দাঁড়িয়ে বড় জাল ফেললে সব মাছ মেলে? না। নদীর গভীর মোহনায় যেখানে মাছ নতুন আসে, সেখানে বড় ফাঁদ পাতা হয় (Cold Audience)। যেখানে মাছ কিছুটা শান্ত হয়ে ঘুরে বেড়ায়, সেখানে চার দেওয়া হয় (Warm Audience)। আর যেখানে মাছ খাবার খেতে জড়ো হয়েছে, সেখানে নিখুঁত টোপ দেওয়া হয় (Hot Audience)। বিজ্ঞাপনেও যারা আপনাকে চেনে না, যারা কিছুটা আগ্রহী, আর যারা কিনতে প্রস্তুত—সবাইকে একই ক্রিয়েটিভ দিলে টাকা জলে যাবে। ফানেল মানে সঠিক মানুষকে সঠিক ক্রিয়েটিভ দেখানো।'
    },
    lessons: [
      {
        title: '১. ডিজাইন ও বিজ্ঞাপনের যুগলবন্দি (Design + Ads Symbiosis)',
        points: [
          'একজন গ্রাফিক ডিজাইনার যখন শুধু কালার বোঝে, সে معمولی ডিজাইনার। কিন্তু যখন সে CTR ও ROAS বোঝে, সে দামি ক্রিয়েটিভ স্ট্র্যাটেজিস্ট!',
          'বিজ্ঞাপনের সফলতা কোনো আর্ট গ্যালারির প্রদর্শনী নয়; এর বিচার হয় রিয়েল ডেটা ও বিক্রির ফলাফলে।'
        ]
      },
      {
        title: '২. কোল্ড → ওয়ার্ম → হট ক্রিয়েটিভ ম্যাপিং (Funnel Mapping)',
        points: [
          'Cold (TOFU - Top of Funnel): যারা সমস্যা সম্পর্কে সচেতন কিন্তু সমাধান জানে না। এদের জন্য প্রবলেম-অ্যাওয়ার হুক, শিক্ষামূলক রিলস বা চমকপ্রদ আনবক্সিং।',
          'Warm (MOFU - Middle of Funnel): যারা বিকল্প ভাবছে। এদের জন্য সুবিধা বনাম অসুবিধা তুলনা চার্ট (Comparison), ডেমো ভিডিও ও ট্রাস্ট ব্যাজ।',
          'Hot (BOFU - Bottom of Funnel): যারা কার্ডে অ্যাড করেছে কিন্তু কেনেনি। এদের জন্য কাস্টমার ভিডিও রিভিউ, ফ্রি ডেলিভারি অফার ও শেষ সুযোগের তাগিদ।'
        ]
      },
      {
        title: '৩. রিয়েল মেট্রিক দিয়ে ক্রিয়েটিভ ডায়াগনোসিস (Creative Troubleshooting)',
        points: [
          'Low CTR (< ১%) = সমস্যা আপনার ভিজ্যুয়াল ও হুকে! হেডলাইন বড়, ছবি বোরিং বা কনট্রাস্ট কম। সমাধান: নতুন ৩টি বৈচিত্র্যময় হুক টেস্ট করুন।',
          'High CTR (> ২.৫%) কিন্তু Low CVR (< ১%) = ক্রিয়েটিভ মানুষ পছন্দ করেছে, কিন্তু ল্যান্ডিং পেজে এসে হতাশ হয়েছে! সমাধান: ল্যান্ডিং পেজের ৭-ইমেজ ফ্লো ঠিক করুন, লোডিং স্পিড বাড়ান বা অফার স্পষ্ট করুন।',
          'High CPA (Cost Per Acquisition) = একই বিজ্ঞাপন অনেক দিন চলার কারণে ক্রিয়েটিভ ফ্যাটিগ (Creative Fatigue) হয়েছে। সমাধান: নতুন লাইফস্টাইল অ্যাঙ্গেল চালু করুন।'
        ]
      }
    ],
    comparison: {
      weakTitle: '❌ Weak Example (অন্ধ বিজ্ঞাপন)',
      weakPoints: [
        'সবাইকে একই সেলস ব্যানার দিয়ে কোল্ড অডিয়েন্সে বুস্ট করে বসে থাকা।',
        'বিজ্ঞাপনে সেলস না আসলে "ফেসবুক অ্যাড বেকার" বলে প্ল্যাটফর্মকে দোষারোপ করা।',
        'CTR নাকি CVR কোনটিতে সমস্যা তা বিশ্লেষণ না করা।'
      ],
      winTitle: '✅ PhotoPixc Winning Standard (মেট্রিক-চালিত স্ট্র্যাটেজি)',
      winPoints: [
        'Cold-এ প্রবলেম সলভিং হুক এবং Hot-এ রিভিউ ও মানিব্যাক অফারের আলাদা ক্রিয়েটিভ।',
        'CTR কম হলে ছবি ও হেডলাইন বদলানো, CVR কম হলে ল্যান্ডিং পেজ ও অফার অপ্টিমাইজ করা।',
        'ক্রিয়েটিভের ডাইনামিক এবি টেস্টিং দিয়ে বিজয়ী বিজ্ঞাপন স্কেল করা।'
      ]
    },
    practiceTask: 'একটি ই-কমার্স ব্র্যান্ডের ফেসবুক অ্যাডে CTR ৩.৫% (অনেক ভালো), কিন্তু ওয়েবসাইটে বিক্রির হার (CVR) মাত্র ০.৪% (খুব কম)। আপনি ডিজাইনার/মার্কেটার হিসেবে ল্যান্ডিং পেজে কী কী ৩টি পরিবর্তন আনবেন?',
    quiz: [
      {
        q: 'একটি বিজ্ঞাপনে ক্লিকের হার (CTR) খুব কম (যেমন ০.৫%) হওয়ার মূল কারণ কী হতে পারে?',
        options: ['ওয়েবসাইটের সার্ভার স্লো থাকা', 'বিজ্ঞাপনের প্রথম ৩ সেকেন্ডের হুক, হেডলাইন বা ছবির কনট্রাস্ট দুর্বল হওয়া', 'ক্লায়েন্টের পেমেন্ট মেথড নষ্ট হওয়া'],
        ans: 1,
        why: 'সঠিক! CTR কম মানে মানুষ বিজ্ঞাপনে চোখই আটকাচ্ছে না বা ক্লিক করতে আগ্রহ পাচ্ছে না। হুক বদলাতে হবে।'
      },
      {
        q: 'High CTR কিন্তু Low CVR-এর ক্ষেত্রে একজন দক্ষ স্ট্র্যাটেজিস্টের প্রথম পদক্ষেপ কী হওয়া উচিত?',
        options: ['বিজ্ঞাপন বন্ধ করে দেওয়া', 'বিজ্ঞাপনের প্রতিশ্রুতির সাথে ল্যান্ডিং পেজের মেসেজ, পণ্যের ছবির কোয়ালিটি ও চেকআউট সহজ করা', 'ফেসবুককে জরিমানা করা'],
        ans: 1,
        why: 'একদম ঠিক! বিজ্ঞাপনে ক্লিক পড়ছে কিন্তু কিনছে না—তার মানে ট্রাফিক ঠিক আছে, সমস্যা রয়েছে প্রোডাক্ট পেজে বা চেকআউট জটিলতায়।'
      },
      {
        q: 'ফানেলের Bottom of Funnel (Hot Audience)-এর জন্য কোন ধরনের ক্রিয়েটিভ সবচেয়ে বেশি কার্যকরী?',
        options: ['কোম্পানির ইতিহাস নিয়ে ১ ঘণ্টার তথ্যচিত্র', 'বাস্তব কাস্টমার রিভিউ, সোশ্যাল প্রুফ ও লিমিটেড টাইম ফ্রি ডেলিভারি অফার', 'এলোমেলো জোকস'],
        ans: 1,
        why: 'চমৎকার! হট অডিয়েন্স কেনাকাটার একদম কাছে দাঁড়িয়ে আছে; একটু সোশ্যাল প্রুফ ও অফার পেলেই তারা অর্ডার করে ফেলে।'
      }
    ]
  },
  {
    id: 6,
    titleEn: 'The PhotoPixc Client Acquisition System',
    titleBn: 'ফটোফিক্স ক্লায়েন্ট অ্যাকুইজিশন সিস্টেম',
    badge: 'মডিউল ০৬',
    time: '৩০ মিনিট পাঠ',
    story: {
      title: '৬০ সেকেন্ডের সহজ গল্প: নতুন রাঁধুনির ফ্রেশ বিরিয়ানি',
      text: 'পাড়ার এক নতুন বাবুর্চি যদি প্রতিটি বাড়ির দরজায় গিয়ে বলে: "আমি খুব অভিজ্ঞ বাবুর্চি, আমাকে আপনাদের বিয়েবাড়ির রান্নার অর্ডার দিন"—কেউ কি ৫০,০০০ টাকার দায়িত্ব তাকে দেবে? কক্ষনো না! কিন্তু যদি সে একটি সুন্দর বাটিতে ধোঁয়া ওঠা এক চামচ সুস্বাদু বিরিয়ানি দিয়ে হাসিমুখে বলে: "চাচা, আমি পাশের গলিতে নতুন রান্না শুরু করেছি। জাস্ট খেয়ে দেখুন কেমন হয়েছে, কোনো টাকা দেওয়া লাগবে না।" মুখে দেওয়ার পর স্বাদ ভালো লাগলে সবাই তার ভক্ত হয়ে যাবে! ক্লায়েন্ট পাওয়ার সেরা উপায় হলো আগে ফ্রিতে তাদের একটি স্পেসিফিক সমস্যার বাস্তব প্রমাণ (Sample Value) উপহার দেওয়া।'
    },
    lessons: [
      {
        title: '১. জিরো ক্লায়েন্টে কনসেপ্ট প্রজেক্ট (Concept Projects)',
        points: [
          '"কোনো ক্লায়েন্ট নেই, তাই পোর্টফোলিও নেই"—এই ভুল অজুহাত ছুড়ে ফেলুন।',
          'নিজেই ৩টি হাইপোথেটিক্যাল ড্রিম ব্র্যান্ড বেছে নিন (যেমন: Wildroot Organic চা, PureHome ওয়াটার ফিল্টার, Lumina স্মার্ট ল্যাম্প)।',
          'পুরো ব্র্যান্ডের জন্য ফুল-ফানেল অ্যাড সেট, আমাজন ৭-ইমেজ লিস্টিং ও ৩টি শর্ট ভিডিও ক্রিয়েটিভ দিয়ে সমৃদ্ধ কেস স্টাডি পোর্টফোলিও সাজিয়ে ফেলুন।'
        ]
      },
      {
        title: '২. ৫ মিনিটের ফ্রি লুম ভিডিও অডিট (5-Minute Free Loom Audit)',
        points: [
          'কখনোই কাউকে কপি-পেস্ট করা স্প্যাম ইমেইল পাঠাবেন না ("I am professional designer, give me work")।',
          'টার্গেট ক্লায়েন্টের ফেসবুক অ্যাড লাইব্রেরি বা আমাজন লিস্টিং ওপেন করে স্ক্রিন রেকর্ড (Loom) চালু করুন।',
          'খুব বিনয়ের সাথে ৩টি বাস্তব কনভার্সন লিক দেখিয়ে দিন: (১) মোবাইলে টেক্সট পড়া যাচ্ছে না, (২) ছবিতে কোনো বেনিফিট হাইলাইট নেই, (৩) কাস্টমার রিভিউ মিসিং।',
          'এরপর আপনার তৈরি করা ১টি রিডিজাইন করা স্যাম্পল স্ক্রিনে দেখিয়ে বলুন: "এই স্যাম্পলটি আপনার জন্য একদম ফ্রি, ভালো লাগলে ব্যবহার করতে পারেন!"'
        ]
      },
      {
        title: '৩. ৪০% অফ পাইলট কেস স্টাডি অফার (Pilot Case Study Offer)',
        points: [
          'ক্লায়েন্টকে শুরুতে বড় প্রজেক্টে চাপাচাপি করবেন না।',
          'অফার করুন: "আমি আপনার পরবর্তী ক্যাম্পেইনের জন্য ৩টি ভ্যারিয়েশনের ক্রিয়েটিভ প্যাক বানিয়ে দেব। যদি আমাদের ডিজাইনে CTR বৃদ্ধি না পায়, তবে ১ পয়সাও দেওয়া লাগবে না। বিনিময়ে শুধু একটি ছোট রিভিউ দেবেন।"',
          'ঝুঁকি শূন্য থাকলে ৯০% ক্লায়েন্ট প্রথম কাজেই "হ্যাঁ" বলে দেয়!'
        ]
      }
    ],
    comparison: {
      weakTitle: '❌ Weak Example (সাধারণ স্প্যাম আউটরিচ)',
      weakPoints: [
        '"Dear Sir/Madam, I am an expert graphic designer with 5 years experience. Please visit my Behance profile and hire me."',
        'কোনো পার্সোনালাইজেশন নেই, ক্লায়েন্টের সমস্যা নিয়ে কোনো গবেষণা নেই।',
        '১০০টা পাঠালে ৯৯ জনই ডিলিট বা স্প্যাম মার্ক করে।'
      ],
      winTitle: '✅ PhotoPixc Winning Standard (ভ্যালু-ফার্স্ট অডিট আউটরিচ)',
      winPoints: [
        '"হাই [ক্লায়েন্টের নাম], আপনার সাম্প্রতিক ফেসবুক অ্যাডের ইমেজ ২-এ চমৎকার প্রডাক্ট কিন্তু টেক্সট অতিরিক্ত ছোট হওয়ায় মোবাইলে পড়তে কষ্ট হচ্ছে। আমি একটি ৫ মিনিটের ভিডিওতে ৩টি সমাধান এবং ১টি ফ্রি অপ্টিমাইজড স্যাম্পল বানিয়ে রেখেছি। লিংকটি কি দেখতে চান?"',
        'আগে ভ্যালু দেওয়া, পরে সম্পর্ক তৈরি ও পার্টনারশিপ গড়া।'
      ]
    },
    practiceTask: 'একটি দেশীয় ব্যাগ প্রস্তুতকারক ব্র্যান্ডের ফেসবুক অ্যাড দেখে তাদের একটি ৫ মিনিটের লুম অডিট অফার করার জন্য সংক্ষিপ্ত ৩ লাইনের একটি উইনিং মেসেজ ড্রাফট করুন:',
    quiz: [
      {
        q: 'নতুন ফ্রিল্যান্সার বা ডিজাইনারের কোনো রিয়েল ক্লায়েন্ট না থাকলে পোর্টফোলিও তৈরির সেরা সমাধান কোনটি?',
        options: ['অন্যের কাজ নিজের বলে চালানো', 'বাস্তবসম্মত কনসেপ্ট প্রজেক্ট (Concept Projects) তৈরি করে ফুল-ফানেল কেস স্টাডি প্রদর্শন করা', 'হাল ছেড়ে দেওয়া'],
        ans: 1,
        why: 'সঠিক! আন্তর্জাতিক টপ ডিজাইনাররা কনসেপ্ট প্রজেক্ট দিয়েই তাদের দক্ষতা ও প্রবলেম সলভিং সক্ষমতা প্রমাণ করে।'
      },
      {
        q: '৫-মিনিটের লুম অডিটে ক্লায়েন্টকে সবচেয়ে বেশি আকৃষ্ট করার মূল রহস্য কী?',
        options: ['লম্বা লেকচার দেওয়া', 'তাদের স্পেসিফিক বিজ্ঞাপনের ৩টি কনভার্সন লিক ধরিয়ে দিয়ে ১টি নিখুঁত ফ্রি স্যাম্পল রিডিজাইন উপহার দেওয়া', 'দামাদামি করা'],
        ans: 1,
        why: 'চমৎকার! মুখের কথার চেয়ে স্ক্রিনে তৈরি স্যাম্পল ও বাস্তব সমাধান ক্লায়েন্টকে মুগ্ধ করে।'
      },
      {
        q: 'পাইলট অফারে (Pilot Offer) কেন ক্লায়েন্টের সম্মতি পাওয়া সহজ হয়?',
        options: ['ক্লায়েন্টের আর্থিক ঝুঁকি প্রায় শূন্য থাকে এবং ফলাফলের ওপর নির্ভরতা বাড়ে', 'ক্লায়েন্ট জোরপূর্বক রাজি হয়', 'অটোমেটিক্যালি অ্যাড লাইভ হয়'],
        ans: 0,
        why: 'একদম ঠিক! কম রিস্কে যখন একজন ক্লায়েন্ট বাড়তি ভ্যালু দেখতে পায়, তখন সে কাজ শুরু করতে দ্বিধাবোধ করে না।'
      }
    ]
  }
];

/* Helper to render badges */
function renderAIBadges() {
  return `
    <div class="ai-badges-row">
      <span class="ai-badge free">FREE</span>
      <span class="ai-badge creative">AI + CREATIVE</span>
      <span class="ai-badge friendly">BEGINNER FRIENDLY</span>
      <span class="ai-badge portfolio">PORTFOLIO READY</span>
    </div>
  `;
}

/* -------------------------------------------------------------
   PHASE 2: Interactive Sandbox Mini-Tools
------------------------------------------------------------- */

/* Tool 1: AI Prompt & Hook Generator */
function renderPromptHookGenerator() {
  return `
    <div class="ai-tool-shell" id="tool-prompt-hook">
      <div class="ai-compare-head" style="color:var(--ai-purple);font-size:18px;">
        <span>🪄 টুল ০১: Interactive AI Prompt & Hook Generator</span>
      </div>
      <p class="small muted">আপনার নিশ ও লক্ষ্য নির্বাচন করুন। এআই আপনাকে সাথে সাথে কপি-রেডি মাস্টার প্রম্পট এবং ৩টি উইনিং বাংলা ও ইংরেজি হুক জেনারেট করে দেবে।</p>
      
      <div class="ai-tool-grid" style="margin-top:16px;">
        <div>
          <label class="field">
            <span>১. নিশ নির্বাচন করুন (Niche):</span>
            <select id="gen-niche" class="search-input" style="padding:10px;">
              <option value="skincare">🌿 Skincare & Organic Beauty (ত্বকের যত্ন)</option>
              <option value="gadget">⚡ E-commerce Gadgets & Tech (ইলেকট্রনিক্স)</option>
              <option value="food">🥗 Organic Food & Supplements (খাদ্য ও পুষ্টি)</option>
              <option value="fashion">👗 Fashion & Apparel (পোশাক ও লাইফস্টাইল)</option>
              <option value="service">🛠️ Local Service (হোম সার্ভিস / এসি রিপেয়ার)</option>
            </select>
          </label>

          <label class="field" style="margin-top:12px;">
            <span>২. বিজ্ঞাপনের লক্ষ্য (Goal):</span>
            <select id="gen-goal" class="search-input" style="padding:10px;">
              <option value="cold-hook">🎣 Cold Ad Hook (স্ক্রোল থামানোর হুক)</option>
              <option value="7-image">🖼️ 7-Image Listing Plan (৭-ইমেজ ব্লুপ্রিন্ট)</option>
              <option value="competitor-audit">🔍 Competitor Audit (প্রতিযোগীর দুর্বলতা বিশ্লেষণ)</option>
            </select>
          </label>

          <button id="gen-prompt-btn" class="button primary" style="width:100%;margin-top:16px;">
            ✨ মাস্টার প্রম্পট ও হুক তৈরি করুন
          </button>
        </div>

        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <strong style="font-size:13px;">জেনারেটেড মাস্টার প্রম্পট:</strong>
            <button id="copy-master-prompt" class="button" style="padding:6px 12px;font-size:11px;">📋 প্রম্পট কপি করুন</button>
          </div>
          <pre id="gen-prompt-output" class="log" style="height:140px;overflow:auto;margin:0;"></pre>
        </div>
      </div>

      <div style="margin-top:20px;border-top:1px dashed var(--line);padding-top:16px;">
        <strong style="font-size:14px;color:var(--ink);">🎯 ৩টি স্যাম্পল উইনিং হুক (বাংলা ও ইংরেজি):</strong>
        <div id="gen-hooks-output" class="stack" style="margin-top:10px;"></div>
      </div>
    </div>
  `;
}

function updatePromptGeneratorLogic() {
  const niche = document.getElementById('gen-niche')?.value || 'skincare';
  const goal = document.getElementById('gen-goal')?.value || 'cold-hook';

  const presets = {
    'skincare': {
      'cold-hook': {
        prompt: `Act as a senior conversion copywriter for an organic skincare brand. Generate 5 thumb-stopping hooks under 6 words addressing dull/dry skin in summer. Focus on fast tangible results without chemicals. Format each hook with: Hook, Target Emotion, and 1 Visual Design idea for Meta Ads.`,
        hooks: [
          { en: 'Wake Up With Glowing Skin!', bn: 'ঘুম থেকে উঠেই পান উজ্জ্বল ত্বক!', note: 'Benefit-First Hook' },
          { en: 'Stop Hiding Under Heavy Makeup.', bn: 'ভারী মেকআপের পেছনে আর লুকাবেন না।', note: 'Pain Point Agitation' },
          { en: '7 Days. Zero Chemical Glow.', bn: '৭ দিনে কেমিক্যালমুক্ত প্রাকৃতিক গ্লো!', note: 'Specific Timeframe + Offer' }
        ]
      },
      '7-image': {
        prompt: `Create a 7-image conversion blueprint for a vitamin C face serum on Shopify. Detail exact visual layout, text overlay under 5 words, and psychological trigger for each image: 1. White Hero, 2. Benefit Infographic, 3. Ingredients/Size, 4. Lifestyle Action, 5. Comparison Chart, 6. 5-Star Social Proof, 7. Money-Back Guarantee.`,
        hooks: [
          { en: 'Pure Cold-Pressed Vitamin C', bn: '১০০% কোল্ড-প্রেসড ভিটামিন সি', note: 'Image 2 Infographic' },
          { en: 'Regular Serum vs PureGlow', bn: 'সাধারণ সিরাম বনাম পিওর-গ্লো', note: 'Image 5 Comparison' },
          { en: '30-Day Money Back Promise', bn: '৩০ দিনের মানিব্যাক গ্যারান্টি', note: 'Image 7 Risk-Reversal' }
        ]
      },
      'competitor-audit': {
        prompt: `Review these typical 1-star customer complaints for commercial face serums: 'sticky residue, artificial fragrance, broke out after 3 days'. Write 3 high-contrast ad headlines directly disproving these flaws for our hypoallergenic clean formula.`,
        hooks: [
          { en: 'Zero Stickiness. 100% Absorption.', bn: 'কোনো আঠালো ভাব নেই, শতভাগ শোষণ!', note: 'Solves Stickiness Objection' },
          { en: 'No Artificial Perfume, Ever.', bn: 'কোনো কৃত্রিম সুগন্ধি নেই—শতভাগ নিরাপদ।', note: 'Solves Allergy Fear' },
          { en: 'Dermatologist Tested For Sensitive Skin.', bn: 'সংবেদনশীল ত্বকের জন্য ডাক্তার পরীক্ষিত।', note: 'Builds Medical Authority' }
        ]
      }
    },
    'gadget': {
      'cold-hook': {
        prompt: `Act as a direct-response creative strategist for a compact wireless power bank. Write 5 high-converting ad hooks targeting busy professionals whose phone dies by 3 PM. Keep headlines under 6 words with visual cues.`,
        hooks: [
          { en: 'Never Fear 1% Battery Again.', bn: '১% ব্যাটারির ভয় আর কখনোই নয়!', note: 'Relatable Anxiety Hook' },
          { en: 'Charges 50% In 20 Minutes.', bn: '২০ মিনিটে ৫০% চার্জ সম্পন্ন!', note: 'Speed Promise' },
          { en: 'Fits In Your Coin Pocket.', bn: 'পকেটের কোণায় এঁটে যাবে অনায়াসে!', note: 'Compact Lifestyle Angle' }
        ]
      },
      '7-image': {
        prompt: `Design a 7-image Amazon product gallery for an ultra-fast MagSafe powerbank. Outline: Hero angle, Speed comparison vs standard chargers, Safety chip breakdown, Travel lifestyle, Pocket dimension, Real customer reviews, 1-year replacement warranty.`,
        hooks: [
          { en: 'Ultra-Slim Aviation Grade Alloy', bn: 'পাতলা কিন্তু অত্যন্ত টেকসই মেটাল বডি', note: 'Image 2 Tech Spec' },
          { en: 'Old Brick vs Smart Slim', bn: 'ভারী পুরনো চার্জার বনাম পকেট পাওয়ার', note: 'Image 5 Comparison' },
          { en: '1-Year Hassle Free Replacement', bn: '১ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি', note: 'Image 7 Guarantee' }
        ]
      },
      'competitor-audit': {
        prompt: `Analyze competitor gadget complaints: 'overheats phone, heavy weight, magnet falls off'. Draft 3 ad creatives positioning our product with built-in thermal cooling and N52 neodymium magnets.`,
        hooks: [
          { en: 'Ice-Cool Charging. Zero Overheating.', bn: 'ফোন গরম হওয়ার ঝামেলা চিরতরে শেষ!', note: 'Thermal Solved' },
          { en: 'Lock-Tight Magnetic Grip.', bn: 'ঝাঁকুনিতেও খসে পড়বে না কখনোই।', note: 'Magnetism Solved' },
          { en: 'Featherweight 135 Grams.', bn: 'ওজন মাত্র ১৩৫ গ্রাম—হাতে বুঝাই যাবে না।', note: 'Weight Solved' }
        ]
      }
    },
    'food': {
      'cold-hook': {
        prompt: `Act as a copywriter for raw organic wildflower honey. Create 5 organic food ad hooks under 6 words challenging adulterated sugar syrup in commercial honey.`,
        hooks: [
          { en: 'Real Honey Crystallizes Naturally.', bn: 'আসল মধু জমে—চিনির সিরাপ নয়!', note: 'Education Pattern Interrupt' },
          { en: 'Direct From Sundarbans Harvesters.', bn: 'সরাসরি সুন্দরবনের মৌয়ালদের হাত থেকে।', note: 'Origin Authenticity' },
          { en: 'Zero Sugar Added. Ever.', bn: 'চিনির ভেজালমুক্ত ১০০% খাঁটি মধু।', note: 'Purity Guarantee' }
        ]
      },
      '7-image': {
        prompt: `Generate a 7-image Shopify listing plan for organic honey jar: 1. Pure honey drizzle, 2. Lab certificate & BSTI approval, 3. Spoon & jar size, 4. Breakfast table lifestyle, 5. Market fake syrup vs Pure Honey, 6. 10,000+ satisfied families, 7. Breakage-free delivery guarantee.`,
        hooks: [
          { en: 'Lab Certified Raw & Unpasteurized', bn: 'ল্যাব টেস্টে শতভাগ খাঁটি প্রমাণিত', note: 'Image 2 Trust' },
          { en: 'Sugar Syrup vs Sundarban Raw', bn: 'প্রক্রিয়াজাত চিনি বনাম কাঁচা মধু', note: 'Image 5 Comparison' },
          { en: 'Glass Bottle Safe Delivery', bn: 'নিরাপদ কাচের জারে স্পেশাল প্যাকেজিং', note: 'Image 7 Care' }
        ]
      },
      'competitor-audit': {
        prompt: `Address customer doubts about online food items: 'broken glass in delivery, tastes like brown sugar, expired batch'. Write 3 reassurance hooks for ad copy.`,
        hooks: [
          { en: 'Breakage-Free Bubble Box Guarantee.', bn: 'ভাঙলে সাথে সাথে নতুন জার ফ্রি!', note: 'Delivery Reassurance' },
          { en: 'Taste The Raw Forest Blossom.', bn: 'বুনো ফুলের আসল প্রাকৃতিক সুবাস।', note: 'Sensory Appeal' },
          { en: 'Freshly Harvested This Month.', bn: 'চলতি মাসের একদম ফ্রেশ কালেকশন।', note: 'Freshness Anchor' }
        ]
      }
    },
    'fashion': {
      'cold-hook': {
        prompt: `Act as a creative strategist for breathable premium cotton polo shirts in humid tropical climate. Write 5 punchy ad headlines under 6 words.`,
        hooks: [
          { en: 'Breathe Easy In 38°C Heat.', bn: 'গরমেও থাকুন সারাদিন ঘামহীন ফ্রেশ!', note: 'Heat Relief Hook' },
          { en: 'No Collar Curling After Wash.', bn: 'ধোয়ার পরেও কলার ভাঁজ হবে না।', note: 'Durability Hook' },
          { en: 'Tailored Fit For Every Gentleman.', bn: 'পারফেক্ট ফিটিং, প্রিমিয়াম লুক।', note: 'Identity Angle' }
        ]
      },
      '7-image': {
        prompt: `Draft a 7-image Shopify visual breakdown for cotton polo shirts: 1. Studio model shot, 2. 240 GSM breathable fabric closeup, 3. Size chart with chest/height guidelines, 4. Office to weekend lifestyle, 5. Cheap polyester vs Combed cotton, 6. Customer photos, 7. Easy 7-day exchange.`,
        hooks: [
          { en: '100% Combed Compact Cotton', bn: '১০০% কম্বড সুতির মোলায়েম স্পর্শ', note: 'Image 2 Fabric' },
          { en: 'Normal Polo vs PhotoPixc Standard', bn: 'সাধারণ সুতা বনাম প্রিমিয়াম ফিনিশ', note: 'Image 5 Comparison' },
          { en: 'Doorstep Size Trial & Exchange', bn: 'হোম ডেলিভারিতে সাইজ দেখে নিন', note: 'Image 7 Confidence' }
        ]
      },
      'competitor-audit': {
        prompt: `Top buyer complaints: 'color fades in 2 washes, size shrinks, synthetic polyester feel'. Write 3 counter-objection hooks for creative visuals.`,
        hooks: [
          { en: 'Colors That Stay Deep Black.', bn: '২০ ওয়াশের পরেও রঙ থাকবে একদম নতুনের মতো।', note: 'Color Fastness' },
          { en: 'Pre-Shrunk Organic Cotton.', bn: 'ধোয়ার পরে সাইজ ছোট হওয়ার ভয় নেই।', note: 'Pre-Shrunk Promise' },
          { en: 'Zero Itchy Polyester.', bn: 'পলিয়েস্টারমুক্ত আরামদায়ক অনুভূতি।', note: 'Fabric Purity' }
        ]
      }
    },
    'service': {
      'cold-hook': {
        prompt: `Direct-response copy for a local AC repair and jet-wash servicing business in Dhaka/Chattogram. Write 5 emergency hooks for hot summer under 6 words.`,
        hooks: [
          { en: 'AC Not Cooling? Same-Day Fix!', bn: 'এসি ঠান্ডা হচ্ছে না? আজই সমাধান!', note: 'Emergency Urgency' },
          { en: 'Cut 30% Off Electric Bills.', bn: 'বিদ্যুৎ বিল বাঁচান ৩০% পর্যন্ত!', note: 'Financial Benefit' },
          { en: 'Certified Tech At Your Door.', bn: 'অভিজ্ঞ টেকনিশিয়ান আপনার দরজায়।', note: 'Trust Signal' }
        ]
      },
      '7-image': {
        prompt: `Create a 7-slide service portfolio: 1. Technician with master jet pump, 2. 9-step deep cleaning checklist, 3. Fixed transparent pricing table, 4. Mess-free water protection cover, 5. Dry brush vs Jet wash comparison, 6. Verified house owner reviews, 7. 30-day service warranty.`,
        hooks: [
          { en: '9-Step High Pressure Jet Wash', bn: '৯ ধাপের হাই-প্রেশার ডিপ ওয়াশ', note: 'Image 2 Service Detail' },
          { en: 'Local Bro vs Certified Jet Tech', bn: 'সাধারণ ধোয়া বনাম প্রফেশনাল ক্লিনিং', note: 'Image 5 Comparison' },
          { en: '30-Day Cooling Guarantee', bn: '৩০ দিনের কুলিং গ্যারান্টি', note: 'Image 7 Warranty' }
        ]
      },
      'competitor-audit': {
        prompt: `Top complaints against local AC servicing: 'hidden charges, dirty walls during cleaning, cooling stopped next day'. Write 3 ad hooks addressing these transparently.`,
        hooks: [
          { en: 'Zero Hidden Fees. Fixed Rates.', bn: 'কোনো গোপন চার্জ নেই—ফিক্সড রেট চার্ট।', note: 'Pricing Honesty' },
          { en: 'Mess-Free Wall Protection Sheet.', bn: 'দেয়ালে এক ফোঁটা দাগ পড়ার সুযোগ নেই।', note: 'Cleanliness Care' },
          { en: 'Free Re-visit If Not Satisfied.', bn: 'সমস্যা না মিটলে সম্পূর্ণ ফ্রি রি-ভিজিট।', note: 'Peace of Mind' }
        ]
      }
    }
  };

  const currentPreset = presets[niche]?.[goal] || presets['skincare']['cold-hook'];
  const promptEl = document.getElementById('gen-prompt-output');
  const hooksEl = document.getElementById('gen-hooks-output');

  if (promptEl) promptEl.textContent = currentPreset.prompt;
  if (hooksEl) {
    hooksEl.innerHTML = currentPreset.hooks.map((h, i) => `
      <div style="background:var(--paper);border:1px solid var(--line);border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <div>
          <span class="ai-badge" style="background:#eaf4ed;color:var(--green);font-size:10px;margin-bottom:4px;">${h.note}</span>
          <div style="font-weight:750;font-size:14px;color:var(--ink);">🇧🇩 ${h.bn}</div>
          <div style="font-size:12px;color:var(--muted);margin-top:2px;">🇬🇧 ${h.en}</div>
        </div>
        <button class="button copy-single-hook" data-hook="${esc(h.bn)}" style="padding:4px 10px;font-size:11px;">কপি</button>
      </div>
    `).join('');

    document.querySelectorAll('.copy-single-hook').forEach(b => {
      b.onclick = () => {
        navigator.clipboard?.writeText(b.dataset.hook);
        if (typeof toast === 'function') toast('হুক কপি হয়েছে: ' + b.dataset.hook);
      };
    });
  }
}

/* Tool 2: The 3-Second Mobile Ad Readability Tester */
function renderAdReadabilityTester() {
  const st = getAIMarketingState();
  return `
    <div class="ai-tool-shell" id="tool-readability-tester">
      <div class="ai-compare-head" style="color:var(--green);font-size:18px;">
        <span>📱 টুল ০২: The 3-Second Mobile Ad Readability Tester</span>
      </div>
      <p class="small muted">মোবাইলের ছোট স্ক্রিনে ৩ সেকেন্ডের স্ক্রোলে আপনার বিজ্ঞাপনটি মানুষ সহজে পড়তে পারবে কি না তা রিয়েল-টাইমে পরীক্ষা করুন ও স্কোর যাচাই করুন।</p>
      
      <div class="ai-tool-grid" style="margin-top:16px;">
        <div>
          <label class="field">
            <span>বিজ্ঞাপনের হেডলাইন (৬ শব্দের মধ্যে রাখার চেষ্টা করুন):</span>
            <input type="text" id="ad-test-head" value="${esc(st.adTester.headline)}" class="search-input" style="font-weight:700;">
            <small id="ad-test-head-stats" class="muted">শব্দ: ০ · অক্ষর: ০</small>
          </label>

          <label class="field" style="margin-top:10px;">
            <span>সাব-অফার বা সোশ্যাল প্রুফ:</span>
            <input type="text" id="ad-test-sub" value="${esc(st.adTester.sub)}" class="search-input">
          </label>

          <label class="field" style="margin-top:10px;">
            <span>কল-টু-অ্যাকশন (CTA বাটন টেক্সট):</span>
            <input type="text" id="ad-test-cta" value="${esc(st.adTester.cta)}" class="search-input">
          </label>

          <label class="field" style="margin-top:10px;">
            <span>কনট্রাস্ট থিম নির্বাচন করুন:</span>
            <select id="ad-test-theme" class="search-input" style="padding:9px;">
              <option value="green" ${st.adTester.theme==='green'?'selected':''}>🟢 PhotoPixc High-Contrast Green (প্রাকৃতিক ও স্পষ্ট)</option>
              <option value="dark" ${st.adTester.theme==='dark'?'selected':''}>⚫ Ultra Dark Tech (আধুনিক ও বোল্ড)</option>
              <option value="amber" ${st.adTester.theme==='amber'?'selected':''}>🟡 Warm Sunshine (উষ্ণ অফার ও ডিসকাউন্ট)</option>
              <option value="coral" ${st.adTester.theme==='coral'?'selected':''}>🔴 Bold Urgency (জরুরি অ্যাকশন ও লিমিটেড অফার)</option>
            </select>
          </label>

          <div style="margin-top:16px;" class="ai-score-gauge">
            <div style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;">Thumb-Stop Score</div>
            <div class="ai-score-num" id="ad-thumb-score">85%</div>
            <div id="ad-thumb-feedback" style="font-size:13px;line-height:1.6;margin-top:6px;"></div>
          </div>
        </div>

        <div>
          <div style="text-align:center;font-size:12px;color:var(--muted);margin-bottom:8px;">
            📱 লাইভ মোবাইল ফিড সিমুলেটর (Feed Preview)
          </div>
          
          <div class="ai-phone-preview">
            <div class="ai-phone-speaker"></div>
            <div style="display:flex;align-items:center;gap:8px;font-size:11px;color:#555;">
              <div style="width:24px;height:24px;border-radius:50%;background:var(--green);color:#fff;display:grid;place-items:center;font-weight:800;font-size:11px;">P</div>
              <div>
                <strong>PhotoPixc Verified Ad</strong>
                <div style="font-size:9px;color:#888;">Sponsored · 🌐 Public</div>
              </div>
            </div>

            <div id="ai-mock-card-render" class="ai-mock-ad-card theme-${st.adTester.theme}">
              <div class="ai-mock-image-placeholder">
                <div>
                  <span style="font-size:22px;display:block;">✨</span>
                  <strong>High-Resolution Product Shot</strong>
                  <div style="font-size:10px;opacity:0.8;">(Pure Contrast · No Clutter)</div>
                </div>
              </div>
              <div class="ai-mock-body">
                <h3 class="ai-mock-headline" id="mock-preview-head">${esc(st.adTester.headline)}</h3>
                <p class="ai-mock-sub" id="mock-preview-sub">${esc(st.adTester.sub)}</p>
                <div class="ai-mock-cta-btn" id="mock-preview-cta">${esc(st.adTester.cta)} →</div>
              </div>
            </div>
            
            <div style="font-size:10px;color:#777;text-align:center;">
              ৩-সেকেন্ড টেস্ট: মোবাইলে ৫ হাত দূর থেকেও হেডলাইন পড়া যেতে হবে।
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function updateAdReadabilityLogic() {
  const headInput = document.getElementById('ad-test-head');
  const subInput = document.getElementById('ad-test-sub');
  const ctaInput = document.getElementById('ad-test-cta');
  const themeSelect = document.getElementById('ad-test-theme');

  if (!headInput) return;

  const headline = headInput.value.trim();
  const sub = subInput?.value.trim() || '';
  const cta = ctaInput?.value.trim() || '';
  const theme = themeSelect?.value || 'green';

  // Words calculation
  const words = headline ? headline.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const charCount = headline.length;

  const statsEl = document.getElementById('ad-test-head-stats');
  if (statsEl) {
    statsEl.textContent = `শব্দ: ${wordCount}টি · অক্ষর: ${charCount}টি (আদর্শ: ৬ শব্দের নিচে)`;
    statsEl.style.color = wordCount > 6 ? 'var(--ai-danger)' : 'var(--green)';
  }

  // Update preview
  const mockCard = document.getElementById('ai-mock-card-render');
  if (mockCard) {
    mockCard.className = `ai-mock-ad-card theme-${theme}`;
  }
  const previewHead = document.getElementById('mock-preview-head');
  if (previewHead) previewHead.textContent = headline || 'আপনার হেডলাইন লিখুন...';
  const previewSub = document.getElementById('mock-preview-sub');
  if (previewSub) previewSub.textContent = sub || 'সাব-অফার বা সোশ্যাল প্রুফ...';
  const previewCta = document.getElementById('mock-preview-cta');
  if (previewCta) previewCta.textContent = (cta || 'অর্ডার করুন') + ' →';

  // Score Algorithm
  let score = 20; // base score
  const warnings = [];

  // 1. Headline length
  if (wordCount > 0 && wordCount <= 6) {
    score += 40;
  } else if (wordCount <= 9) {
    score += 20;
    warnings.push('⚠️ হেডলাইন কিছুটা দীর্ঘ (৭-৯ শব্দ)। মোবাইলে দ্রুত পড়ার জন্য ৬ শব্দের মধ্যে নামিয়ে আনুন।');
  } else {
    warnings.push('❌ হেডলাইন অতিরিক্ত দীর্ঘ (' + wordCount + ' শব্দ)! দ্রুত স্ক্রোলিংয়ে মানুষ এটি এড়িয়ে যাবে।');
  }

  // 2. Clear benefit / trigger keywords
  const benefitRegex = /(পান|দিন|মিনিট|ঘণ্টা|ফ্রি|গ্যারান্টি|সহজে|মাত্র|ছাড়|উজ্জ্বল|সুন্দর|দ্রুত|বন্ধ|জিরো|লাভ|১০০%|টাকা|অফার|নতুন)/i;
  if (benefitRegex.test(headline)) {
    score += 20;
  } else {
    warnings.push('💡 পরামর্শ: হেডলাইনে নির্দিষ্ট কোনো সুবিধা (যেমন: ৭ দিনে, ফ্রি, উজ্জ্বল, সমাধান) যুক্ত করুন।');
  }

  // 3. CTA & Sub
  if (cta.length > 0 && cta.length <= 15) score += 10;
  if (sub.length > 0) score += 10;

  const scoreEl = document.getElementById('ad-thumb-score');
  const feedEl = document.getElementById('ad-thumb-feedback');
  if (scoreEl) {
    scoreEl.textContent = `${score}%`;
    scoreEl.style.color = score >= 80 ? 'var(--green)' : score >= 50 ? 'var(--ai-amber)' : 'var(--ai-danger)';
  }
  if (feedEl) {
    if (warnings.length === 0) {
      feedEl.innerHTML = `<span style="color:var(--green);font-weight:700;">🎉 পারফেক্ট! ৩ সেকেন্ডেই স্ক্রোল থামিয়ে দেওয়ার মতো ভারসাম্যপূর্ণ মোবাইল ক্রিয়েটিভ!</span>`;
    } else {
      feedEl.innerHTML = warnings.map(w => `<div style="font-size:12px;margin:2px 0;">${w}</div>`).join('');
    }
  }

  // Persist to state
  const cur = getAIMarketingState();
  cur.adTester = { headline, sub, cta, theme };
  saveAIMarketingState(cur);
}

/* Tool 3: 5-Minute Loom Audit & Outreach Script Builder */
function renderLoomAuditBuilder() {
  const st = getAIMarketingState();
  const leaksList = [
    { id: 0, text: 'মোবাইলে টেক্সট খুব ছোট—দ্রুত স্ক্রোলে পড়া কষ্টকর (Unreadable font size)', fix: 'ফন্ট সাইজ অন্তত ৩০% বাড়িয়ে হাই-কনট্রাস্ট হুক যোগ করা' },
    { id: 1, text: '২য় ইমেজে কোনো বেনিফিট নেই—শুধু প্রডাক্টের ছবি (Missing benefit in Image 2)', fix: 'কেন কিনবেন তার ৩টি বুলেট ইনফোগ্রাফিক যোগ করা' },
    { id: 2, text: 'কোনো সোশ্যাল প্রুফ বা তুলনা চার্ট নেই (Missing comparison / reviews)', fix: 'সাধারণ প্রডাক্ট বনাম আমাদের সমাধানের সাইড-বাই-সাইড চার্ট যুক্ত করা' },
    { id: 3, text: 'দুর্বল বা অস্পষ্ট কল-টু-অ্যাকশন (Vague CTA button)', fix: 'স্পষ্ট অ্যাকশন-ড্রিভেন বাটন ও মানিব্যাক ট্রাস্ট ব্যাজ দেওয়া' },
    { id: 4, text: 'অফার ও গ্যারান্টি পরিষ্কার নয় (Unclear risk reversal)', fix: '৩০ দিনের মানিব্যাক বা ডোরস্টেপ ট্রায়াল হাইলাইট করা' }
  ];

  return `
    <div class="ai-tool-shell" id="tool-loom-audit">
      <div class="ai-compare-head" style="color:var(--ai-teal);font-size:18px;">
        <span>🎯 টুল ০৩: 5-Minute Loom Audit & Outreach Script Builder</span>
      </div>
      <p class="small muted">ক্লায়েন্টের বিজ্ঞাপন বা লিস্টিংয়ের ৩টি কনভার্সন লিক সিলেক্ট করে ৫ মিনিটের পেশাদার Loom এজেন্ডা এবং বাংলা ও ইংরেজি আউটরিচ মেসেজ এক ক্লিকে জেনারেট করুন।</p>

      <div class="ai-tool-grid" style="margin-top:16px;">
        <div>
          <label class="field">
            <span>ক্লায়েন্ট ব্র্যান্ডের নাম (Client Brand Name):</span>
            <input type="text" id="audit-brand" value="${esc(st.loomAudit.brand)}" class="search-input" placeholder="যেমন: PureGlow Skincare">
          </label>

          <label class="field" style="margin-top:10px;">
            <span>প্ল্যাটফর্ম (Platform):</span>
            <select id="audit-platform" class="search-input" style="padding:9px;">
              <option value="Meta Ad Creative" ${st.loomAudit.platform==='Meta Ad Creative'?'selected':''}>Meta Ad Creative (Facebook / Instagram)</option>
              <option value="Shopify Product Page" ${st.loomAudit.platform==='Shopify Product Page'?'selected':''}>Shopify Product Page (ই-কমার্স স্টোর)</option>
              <option value="Amazon 7-Image Listing" ${st.loomAudit.platform==='Amazon 7-Image Listing'?'selected':''}>Amazon 7-Image Listing (আমাজন লিস্টিং)</option>
              <option value="Google Performance Max" ${st.loomAudit.platform==='Google Performance Max'?'selected':''}>Google Performance Max Asset Group</option>
            </select>
          </label>

          <div style="margin-top:14px;">
            <strong style="font-size:13px;display:block;margin-bottom:6px;">চিহ্নিত কনভার্সন লিকসমূহ (Conversion Leaks):</strong>
            <div class="stack" style="gap:8px;">
              ${leaksList.map(l => `
                <label class="check-label" style="background:var(--paper);padding:8px 12px;border-radius:6px;border:1px solid var(--line);">
                  <input type="checkbox" class="audit-leak-check" value="${l.id}" ${(st.loomAudit.leaks||[]).includes(l.id)?'checked':''}>
                  <span style="font-size:13px;">${l.text}</span>
                </label>
              `).join('')}
            </div>
          </div>
        </div>

        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <strong style="font-size:13px;color:var(--ink);">⏱️ ৫-মিনিটের Loom ভিডিও এজেন্ডা:</strong>
            <button id="copy-loom-agenda" class="button" style="padding:5px 10px;font-size:11px;">📋 এজেন্ডা কপি</button>
          </div>
          <pre id="audit-agenda-output" class="log" style="height:150px;overflow:auto;margin:0;"></pre>

          <div style="margin-top:14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
              <strong style="font-size:13px;color:var(--ink);">📩 রেডি-টু-সেন্ড আউটরিচ স্ক্রিপ্ট:</strong>
              <div style="display:flex;gap:6px;">
                <button id="copy-outreach-bn" class="button" style="padding:4px 8px;font-size:11px;">🇧🇩 বাংলা কপি</button>
                <button id="copy-outreach-en" class="button primary" style="padding:4px 8px;font-size:11px;">🇬🇧 English Copy</button>
              </div>
            </div>
            <div id="audit-outreach-output" style="background:var(--paper);border:1px solid var(--line);border-radius:8px;padding:12px;font-size:12.5px;line-height:1.7;max-height:160px;overflow:auto;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function updateLoomAuditLogic() {
  const brand = document.getElementById('audit-brand')?.value.trim() || 'Your Brand';
  const platform = document.getElementById('audit-platform')?.value || 'Meta Ad Creative';
  const checkedBoxes = Array.from(document.querySelectorAll('.audit-leak-check:checked')).map(c => Number(c.value));

  const leaksMap = [
    { title: 'Text too small on mobile screen', fix: 'Enlarged font size by 30% with high-contrast benefit hook' },
    { title: 'Missing clear benefit in Image 2', fix: 'Added 3 bullet infographic highlighting key transformation' },
    { title: 'Missing social proof / comparison table', fix: 'Integrated side-by-side comparison chart vs cheap alternatives' },
    { title: 'Vague or low-visibility CTA button', fix: 'High-contrast action button with money-back guarantee badge' },
    { title: 'Unclear risk reversal & guarantee', fix: 'Embedded 30-day risk-free trial and certified lab badge' }
  ];

  const activeLeaks = checkedBoxes.map(id => leaksMap[id]).filter(Boolean);
  if (activeLeaks.length === 0) {
    activeLeaks.push(leaksMap[0]);
  }

  // Loom Agenda Generator
  const agenda = `[5-Minute Loom Video Talking Points for ${brand}]
• Minute 0:00 - 0:45: Friendly Intro & Compliment. Appreciate their product quality and brand potential.
• Minute 0:45 - 2:30: The Conversion Leaks on Screen (${platform}).
  ${activeLeaks.map((l, i) => `  ${i+1}. ${l.title} (Why this hurts mobile CTR & CVR)`).join('\n')}
• Minute 2:30 - 4:00: Free Sample Redesign Reveal.
  Show your newly designed winning variation on screen side-by-side.
  ${activeLeaks.map((l, i) => `  Fix ${i+1}: ${l.fix}`).join('\n')}
• Minute 4:00 - 5:00: No-Pressure Pilot Offer.
  "I'm giving this redesign free. If you like the CTR improvement, let's test a 3-creative pilot pack at 40% off. No strings attached!"`;

  const agendaEl = document.getElementById('audit-agenda-output');
  if (agendaEl) agendaEl.textContent = agenda;

  // Outreach Templates
  const outreachBn = `প্রিয় ${brand} টিম,\n\nআপনার সাম্প্রতিক ${platform}-এর বিজ্ঞাপনটি দেখছিলাম—প্রডাক্টটি চমৎকার! তবে মোবাইলের দ্রুত স্ক্রোলিংয়ে দুটি জায়গায় কনভার্সন ড্রপ হতে পারে:\n${activeLeaks.map(l => `• ${l.title}`).join('\n')}\n\nআপনাদের সুবিধার জন্য আমি ৫ মিনিটের একটি ছোট স্ক্রিন ভিডিওতে এই সমস্যাগুলোর সহজ সমাধান এবং ১টি কমপ্লিট রিডিজাইন স্যাম্পল তৈরি করেছি।\n\nস্যাম্পলটি সম্পূর্ণ উপহার হিসেবে আপনাদের পাঠিয়েছি। ভিডিও লিংকটি কি এখানে শেয়ার করব?\n\nশুভকামনায়,\n[আপনার নাম]\nক্রিয়েটিভ স্ট্র্যাটেজিস্ট, PhotoPixc`;

  const outreachEn = `Hi ${brand} Team,\n\nCame across your recent ${platform} campaigns—love the product line!\n\nWhile reviewing the creatives on mobile, I noticed ${activeLeaks.length} quick conversion leaks that might be increasing your CPA:\n${activeLeaks.map(l => `• ${l.title}`).join('\n')}\n\nTo help, I recorded a 5-minute video breaking down the fixes along with 1 free optimized redesign asset you can test directly.\n\nHappy to drop the Loom link here if you'd like to take a look?\n\nBest,\n[Your Name]\nCreative & AI Strategist, PhotoPixc`;

  const outreachEl = document.getElementById('audit-outreach-output');
  if (outreachEl) {
    outreachEl.innerHTML = `
      <div style="margin-bottom:8px;"><strong>🇧🇩 বাংলা টেমপ্লেট:</strong><br>${outreachBn.replace(/\n/g, '<br>')}</div>
      <hr style="margin:10px 0;border:0;border-top:1px dashed var(--line);">
      <div><strong>🇬🇧 English Template:</strong><br>${outreachEn.replace(/\n/g, '<br>')}</div>
    `;
  }

  // Copy buttons
  const copyAgendaBtn = document.getElementById('copy-loom-agenda');
  if (copyAgendaBtn) {
    copyAgendaBtn.onclick = () => {
      navigator.clipboard?.writeText(agenda);
      if (typeof toast === 'function') toast('Loom এজেন্ডা কপি হয়েছে!');
    };
  }
  const copyBnBtn = document.getElementById('copy-outreach-bn');
  if (copyBnBtn) {
    copyBnBtn.onclick = () => {
      navigator.clipboard?.writeText(outreachBn);
      if (typeof toast === 'function') toast('বাংলা আউটরিচ মেসেজ কপি হয়েছে!');
    };
  }
  const copyEnBtn = document.getElementById('copy-outreach-en');
  if (copyEnBtn) {
    copyEnBtn.onclick = () => {
      navigator.clipboard?.writeText(outreachEn);
      if (typeof toast === 'function') toast('English outreach script copied!');
    };
  }

  // Persist
  const cur = getAIMarketingState();
  cur.loomAudit = { brand, platform, leaks: checkedBoxes };
  saveAIMarketingState(cur);
}

/* -------------------------------------------------------------
   PHASE 3: Cheat Sheet & Portfolio Integration
------------------------------------------------------------- */

function renderAICheatSheetContent() {
  return `
    <article class="cheat-sheet" style="margin-top:20px;" aria-label="AI and Creative Strategy Cheat Sheet">
      <div class="cheat-kicker">PhotoPixc AI Marketing পাঠশালা · স্পেশাল চিট শিট</div>
      <h2>AI, Creative Strategy & Automation Cheat Sheet</h2>
      <p class="cheat-subtitle">মেট্রিক ডায়াগনোসিস, নো-কোড এআই টুলস্ট্যাক এবং HSO কপি ফর্মুলা এক নজরে</p>

      <section style="margin:20px 0;">
        <h3 style="color:var(--green);margin-bottom:12px;">📊 ১. অ্যাড মেট্রিক ট্রাবলশুটিং ম্যাট্রিক্স (Troubleshooting Matrix)</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>লক্ষণ (Symptom)</th>
                <th>সম্ভাব্য কারণ (Root Cause)</th>
                <th>সংশোধনী অ্যাকশন (Winning Action)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Low CTR (&lt; ১%)</strong></td>
                <td>দুর্বল ভিজ্যুয়াল হুক, অতিরিক্ত লেখা, কনট্রাস্টের অভাব</td>
                <td>৬ শব্দের নিচে বোল্ড পেইনপয়েন্ট হেডলাইন এবং প্রডাক্টের হাই-কনট্রাস্ট শট টেস্ট করুন।</td>
              </tr>
              <tr>
                <td><strong>High CTR (&gt; ২.৫%) কিন্তু Low CVR (&lt; ১%)</strong></td>
                <td>অ্যাডের প্রতিশ্রুতির সাথে ল্যান্ডিং পেজের মিল নেই, সাইট স্লো, চেকআউট জটিল</td>
                <td>অ্যাডের হুক ল্যান্ডিং পেজের ব্যানারে রাখুন, আমাজন ৭-ইমেজ ফ্লো সাজান ও রিটার্ন পলিসি ব্যাজ দিন।</td>
              </tr>
              <tr>
                <td><strong>High CPA (ব্যয়বহুল কাস্টমার)</strong></td>
                <td>ক্রিয়েটিভ ফ্যাটিগ (একই ছবি বারবার দেখা), অডিয়েন্স অতিরিক্ত ন্যারো</td>
                <td>নতুন লাইফস্টাইল ও আনবক্সিং ভিডিও ক্রিয়েটিভ যুক্ত করুন এবং ব্রড অ্যাডভান্টেজ+ ট্রাই করুন।</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section style="margin:24px 0;">
        <h3 style="color:var(--ai-purple);margin-bottom:12px;">⚡ ২. ডিজাইনার ও মার্কেটারের নো-কোড এআই টুলস্ট্যাক</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>টুল (Tool)</th>
                <th>কাজের ক্ষেত্র (Use Case)</th>
                <th>সময় সাশ্রয় (Impact)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ChatGPT / Claude</strong></td>
                <td>আমাজন/দারাজ রিভিউ থেকে কাস্টমার পেইনপয়েন্ট মাইনিং ও HSO কপি ড্রাফট</td>
                <td>২ দিনে যা হতো তা ২ মিনিটে প্রস্তুত</td>
              </tr>
              <tr>
                <td><strong>Midjourney / PS Generative Fill</strong></td>
                <td>স্টুডিও-গ্রেড মার্বেল, ওয়াটার স্প্ল্যাশ ও লাইফস্টাইল প্রডাক্ট ব্যাকড্রপ</td>
                <td>ফটোগ্রাফি বাজেট ৮০% হ্রাস</td>
              </tr>
              <tr>
                <td><strong>CapCut AI & ElevenLabs</strong></td>
                <td>স্ট্যাটিক পোস্টারকে ১০ সেকেন্ডের টিকটক/রিলস ভিডিও এবং ন্যাচারাল ভয়েসওভার</td>
                <td>ভিডিও প্রোডাকশন ৫ গুণ দ্রুত</td>
              </tr>
              <tr>
                <td><strong>Canva Bulk Create</strong></td>
                <td>গুগল শিট থেকে ১ ক্লিকে ৩০টি ইউনিক সোশ্যাল ব্যানার তৈরি</td>
                <td>ঘণ্টার পর ঘণ্টা কপি-পেস্ট থেকে মুক্তি</td>
              </tr>
              <tr>
                <td><strong>ManyChat</strong></td>
                <td>পোস্টে 'Price' কমেন্ট করলেই ৩ সেকেন্ডে ইনবক্সে ডিরেক্ট অফার ডেলিভারি</td>
                <td>৮০% দ্রুত কাস্টমার এনগেজমেন্ট</td>
              </tr>
              <tr>
                <td><strong>Zapier / Make.com</strong></td>
                <td>Meta/Google ফর্ম থেকে ৫ সেকেন্ডে গুগল শিট ও সেলস হোয়াটসঅ্যাপে লিড অ্যালার্ট</td>
                <td>সেলস কনভার্সন রেট ৩৯১% বৃদ্ধি</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section style="margin:24px 0;">
        <h3 style="color:var(--ai-amber);margin-bottom:12px;">✍️ ৩. মাস্টার HSO কপিরাইটিং ফর্মুলা</h3>
        <div class="ai-lesson-grid">
          <div class="ai-lesson-card">
            <h4>🎣 The Curiosity Hook</h4>
            <p class="small muted">সাধারণ ধারণার বিপরীত প্রশ্ন তুলে স্ক্রোল থামান।</p>
            <p><strong>ফর্মুলা:</strong> "কেন [সাধারণ অভ্যাস] আপনার [ক্ষতি] করছে?"<br><strong>উদাহরণ:</strong> "কেন সাধারণ শ্যাম্পু আপনার চুল পড়া বাড়াচ্ছে?"</p>
          </div>
          <div class="ai-lesson-card">
            <h4>⏱️ The Specific Result Hook</h4>
            <p class="small muted">নির্দিষ্ট সময় ও বাস্তব ফলাফলের প্রতিশ্রুতি।</p>
            <p><strong>ফর্মুলা:</strong> "[কাঙ্ক্ষিত ফল] পান মাত্র [নির্দিষ্ট সময়]-এ!"<br><strong>উদাহরণ:</strong> "৭ দিনে ফিরে পান প্রাণবন্ত সতেজ ত্বক!"</p>
          </div>
          <div class="ai-lesson-card">
            <h4>🛡️ The Zero-Risk Offer</h4>
            <p class="small muted">ক্রেতার মনের ভীতি সম্পূর্ণ দূর করা।</p>
            <p><strong>ফর্মুলা:</strong> "ফলাফল না পেলে ১০০% মানিব্যাক!"<br><strong>উদাহরণ:</strong> "ডোরস্টেপ ট্রায়াল—পছন্দ না হলে সাথে সাথে রিটার্ন।"</p>
          </div>
        </div>
      </section>

      <aside class="cheat-remember">
        <strong>সোনালী নীতি:</strong>
        <p>বিজ্ঞাপনের সাফল্য আর্টের প্রদর্শনীতে নয়, ক্রেতার সমস্যা সমাধান এবং বাস্তব কনভার্সনের পরিসংখ্যানে নির্ধারিত হয়।</p>
      </aside>
    </article>
  `;
}

function renderAIProofCard() {
  const st = getAIMarketingState();
  const completedCount = Object.values(st.modulesCompleted || {}).filter(Boolean).length;
  const isMaster = completedCount >= 6;

  return `
    <div class="ai-proof-card" id="ai-strategist-proof">
      <div class="ai-proof-header">
        <div>
          <span class="ai-badge portfolio">VERIFIED SKILL PROOF</span>
          <h2 style="margin:8px 0 4px;font-size:24px;">Creative & AI Strategist Proof Card</h2>
          <div style="font-size:13px;color:var(--muted);">PhotoPixc Skill Lab · Performance Creative & Automation Certification</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:26px;font-weight:800;color:${isMaster?'var(--green)':'var(--ai-amber)'};">${completedCount}/৬ মডিউল</div>
          <span style="font-size:11px;color:var(--muted);">${isMaster?'সার্টিফিকেশন সম্পন্ন':'প্রোগ্রেস চলমান'}</span>
        </div>
      </div>

      <div style="margin:20px 0;">
        <strong style="font-size:14px;color:var(--ink);">৬টি মডিউলের মাস্টারি স্ট্যাটাস:</strong>
        <div class="ai-lesson-grid" style="margin-top:10px;">
          ${aiMarketingModules.map(m => {
            const ok = !!st.modulesCompleted?.[m.id];
            return `
              <div style="background:var(--white);border:1px solid ${ok?'var(--green)':'var(--line)'};border-radius:8px;padding:12px;display:flex;align-items:center;gap:10px;">
                <span style="font-size:16px;">${ok?'✅':'⏳'}</span>
                <div>
                  <div style="font-size:13px;font-weight:700;color:var(--ink);">${m.titleBn}</div>
                  <small class="muted">${ok?'সম্পন্ন হয়েছে':'অসমাপ্ত'}</small>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="ai-proof-skills">
        <span class="pill">Visual Psychology & CRO</span>
        <span class="pill">Thumb-Stopping Hooks (HSO)</span>
        <span class="pill">Generative AI Product Shoot</span>
        <span class="pill">No-Code Marketing Automation</span>
        <span class="pill">Full-Funnel Testing</span>
        <span class="pill">5-Min Loom Audit Pitch</span>
      </div>

      <div style="border-top:1px solid var(--line);padding-top:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div style="font-size:12px;color:var(--muted);">
          ID: PPX-AI-${Date.now().toString(36).toUpperCase()} · ক্লায়েন্ট-সাইড লোকালস্টোরেজ ভেরিফায়েড
        </div>
        <div style="display:flex;gap:8px;">
          <button class="button" id="copy-ai-proof-markdown">📋 রেজুমে/পোর্টফোলিও লিংক কপি</button>
          <button class="button primary" onclick="window.print()">🖨️ Proof Card প্রিন্ট / PDF</button>
        </div>
      </div>
    </div>
  `;
}

/* -------------------------------------------------------------
   PHASE 1: Main AI Marketing Renderer
------------------------------------------------------------- */

let activeAITab = 'modules'; // 'modules', 'tools', 'cheats', 'proof'
let expandedModuleId = null;

function renderAIMarketing(routeHash = '#ai-marketing') {
  const main = document.getElementById('main');
  if (!main) return;

  const st = getAIMarketingState();
  const completedCount = Object.values(st.modulesCompleted || {}).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / aiMarketingModules.length) * 100);

  // Check sub-routes
  if (routeHash.startsWith('#ai-module-')) {
    const id = Number(routeHash.replace('#ai-module-', ''));
    if (id >= 1 && id <= 6) {
      activeAITab = 'modules';
      expandedModuleId = id;
    } else {
      expandedModuleId = null;
    }
  } else if (routeHash === '#ai-tools') {
    activeAITab = 'tools';
    expandedModuleId = null;
  } else if (routeHash === '#ai-cheats') {
    activeAITab = 'cheats';
    expandedModuleId = null;
  } else if (routeHash === '#ai-proof') {
    activeAITab = 'proof';
    expandedModuleId = null;
  } else {
    activeAITab = 'modules';
    expandedModuleId = null;
  }

  // 1. ISOLATED SINGLE MODULE VIEW:
  // When a user selects a module (e.g. #ai-module-1),
  // hide the track hero banner, navigation tabs, and the overview grid completely.
  // Render ONLY the single module view with top breadcrumb & bottom Prev/Back/Next navigation.
  if (expandedModuleId) {
    main.innerHTML = `
      <div class="module-view-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:18px;padding:12px 18px;background:var(--paper);border:1px solid var(--line);border-radius:var(--radius);">
        <a href="#ai-marketing" class="button" style="padding:8px 16px;font-size:13px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">
          ← সব মডিউলে ফিরে যান (All Modules)
        </a>
        <div style="font-size:13px;font-weight:700;color:var(--muted);display:flex;align-items:center;gap:8px;">
          <span class="ai-badge friendly">মডিউল ${bn(expandedModuleId)} / ${bn(aiMarketingModules.length)}</span>
          <span>AI with Marketing Track</span>
        </div>
      </div>
      ${renderSingleModuleView(expandedModuleId)}
    `;
    initSingleModuleEvents(expandedModuleId);
    window.scrollTo({top: 0, behavior: 'smooth'});
    return;
  }

  // 2. TRACK HOME OVERVIEW:
  main.innerHTML = `
    <div class="ai-track-hero">
      ${renderAIBadges()}
      <h1>AI with Marketing, Creative Strategy & Automation Path</h1>
      <p>
        আন্তর্জাতিক মানের ভিজ্যুয়াল সাইকোলজি (CRO), ৬-শব্দের থাম্ব-স্টপিং কপিরাইটিং, মিডজার্নি ও চ্যাটজিপিটি দিয়ে ১০ গুণ দ্রুত বিজ্ঞাপন তৈরি, নো-কোড অটোমেশন এবং ৫ মিনিটের ফ্রি লুম অডিট দিয়ে বাস্তব ক্লায়েন্ট পাওয়ার পূর্ণাঙ্গ বাংলা পাঠশালা।
      </p>

      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:18px;">
        <div style="flex:1;min-width:240px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;">
            <strong>ট্র্যাক প্রোগ্রেস: ${bn(completedCount)}/${bn(aiMarketingModules.length)}টি মডিউল সম্পন্ন</strong>
            <span style="font-weight:700;color:var(--green);">${bn(progressPercent)}%</span>
          </div>
          <progress max="6" value="${completedCount}" style="height:8px;"></progress>
        </div>

        <button id="toggle-clarity-mode" class="button" style="font-size:12px;padding:8px 14px;">
          📖 ${st.clarityMode==='simple'?'ক্লাস ৫ সহজ বাংলা মোড (অন)':'স্ট্যান্ডার্ড টেকনিক্যাল মোড'}
        </button>
      </div>
    </div>

    <nav class="ai-tabs-bar" aria-label="AI Marketing Navigation">
      <button class="ai-tab-btn ${activeAITab==='modules'?'active':''}" data-tab="modules">
        📚 Modules (01–06)
      </button>
      <button class="ai-tab-btn ${activeAITab==='tools'?'active':''}" data-tab="tools">
        ✏️ AI Sandbox Tools
      </button>
      <button class="ai-tab-btn ${activeAITab==='cheats'?'active':''}" data-tab="cheats">
        📋 AI & Creative Cheat Sheet
      </button>
      <button class="ai-tab-btn ${activeAITab==='proof'?'active':''}" data-tab="proof">
        🏆 Skill Proof Card
      </button>
    </nav>

    <div id="ai-tab-content"></div>
  `;

  // Tab switching
  document.querySelectorAll('.ai-tab-btn').forEach(btn => {
    btn.onclick = () => {
      activeAITab = btn.dataset.tab;
      expandedModuleId = null;
      if (activeAITab === 'modules') {
        if (location.hash !== '#ai-marketing') location.hash = '#ai-marketing';
      } else if (activeAITab === 'tools') {
        if (location.hash !== '#ai-tools') location.hash = '#ai-tools';
      } else if (activeAITab === 'cheats') {
        if (location.hash !== '#ai-cheats') location.hash = '#ai-cheats';
      } else if (activeAITab === 'proof') {
        if (location.hash !== '#ai-proof') location.hash = '#ai-proof';
      }
      document.querySelectorAll('.ai-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === activeAITab));
      renderAITabContent();
    };
  });

  // Clarity mode toggle
  const clarityBtn = document.getElementById('toggle-clarity-mode');
  if (clarityBtn) {
    clarityBtn.onclick = () => {
      st.clarityMode = st.clarityMode === 'simple' ? 'detailed' : 'simple';
      saveAIMarketingState(st);
      renderAIMarketing(location.hash);
      if (typeof toast === 'function') toast(st.clarityMode === 'simple' ? 'সহজ বাংলা ক্লাস ৫ মোড চালু হয়েছে।' : 'স্ট্যান্ডার্ড টেকনিক্যাল মোড চালু হয়েছে।');
    };
  }

  renderAITabContent();
}

function renderAITabContent() {
  const container = document.getElementById('ai-tab-content');
  if (!container) return;

  const st = getAIMarketingState();

  if (activeAITab === 'tools') {
    container.innerHTML = `
      <div class="section-title">
        <h2>হ্যান্ডস-অন স্যান্ডবক্স টুলস (Learn by Doing)</h2>
      </div>
      ${renderPromptHookGenerator()}
      ${renderAdReadabilityTester()}
      ${renderLoomAuditBuilder()}
    `;
    initAIToolsEvents();
    return;
  }

  if (activeAITab === 'cheats') {
    container.innerHTML = renderAICheatSheetContent();
    return;
  }

  if (activeAITab === 'proof') {
    container.innerHTML = renderAIProofCard();
    const copyMdBtn = document.getElementById('copy-ai-proof-markdown');
    if (copyMdBtn) {
      copyMdBtn.onclick = () => {
        const text = `# Creative & AI Marketing Strategist Certification\nIssued by PhotoPixc Skill Lab (learn.photopixc.com)\nModules Completed: ${Object.values(st.modulesCompleted||{}).filter(Boolean).length}/6\nSkills: Visual CRO, HSO Copywriting, Generative Product Photography, No-Code Marketing Automation, Full-Funnel Testing, 5-Min Loom Audit System.`;
        navigator.clipboard?.writeText(text);
        if (typeof toast === 'function') toast('প্রুফ কার্ডের তথ্য Markdown হিসেবে কপি হয়েছে!');
      };
    }
    return;
  }

  // ActiveTab === 'modules': Home Overview grid of all 6 modules
  container.innerHTML = `
    <div class="three-col" style="margin-bottom:28px;">
      ${aiMarketingModules.map(m => {
        const isDone = !!st.modulesCompleted?.[m.id];
        return `
          <div class="card module-card" style="border-top:4px solid ${isDone?'var(--green)':'var(--ai-purple)'};display:flex;flex-direction:column;">
            <div class="card-head">
              <span class="module-num">${m.badge}</span>
              <span class="pill gray">${m.time}</span>
            </div>
            <h3 style="margin-top:10px;font-size:17px;">${m.titleBn}</h3>
            <p class="small muted" style="margin-bottom:14px;flex:1;">${m.titleEn}</p>
            <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:14px;">
              <span style="font-size:12px;font-weight:700;color:${isDone?'var(--green)':'var(--muted)'};">
                ${isDone?'✅ সম্পন্ন':'⏳ শুরু করুন'}
              </span>
              <a href="#ai-module-${m.id}" class="button primary" style="padding:8px 16px;font-size:12px;background:var(--ai-purple);border-color:var(--ai-purple);">
                মডিউল খুলুন →
              </a>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderSingleModuleView(moduleId) {
  const m = aiMarketingModules.find(x => x.id === moduleId);
  if (!m) return '';

  const st = getAIMarketingState();
  const isDone = !!st.modulesCompleted?.[m.id];
  const userNote = st.notes?.[m.id] || '';

  return `
    <article class="card" style="border:2px solid var(--green);border-radius:var(--radius);padding:30px;margin-top:20px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;border-bottom:1px solid var(--line);padding-bottom:16px;">
        <div>
          <span class="ai-badge creative">${m.badge} · বিস্তারিত পাঠ</span>
          <h2 style="font-size:26px;margin:8px 0 4px;">${m.titleBn}</h2>
          <div style="font-size:14px;color:var(--muted);">${m.titleEn}</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <button id="mark-module-complete-btn" class="button ${isDone?'':'primary'}" style="padding:10px 18px;">
            ${isDone ? '✅ মডিউল সম্পন্ন হয়েছে' : 'মডিউল সম্পন্ন হিসেবে চিহ্নিত করুন'}
          </button>
        </div>
      </div>

      <!-- Story Box ("৬০ সেকেন্ডের সহজ গল্প") -->
      <div class="ai-story-box">
        <div class="story-title">
          <span>📖 ${m.story.title}</span>
        </div>
        <p>${m.story.text}</p>
      </div>

      <!-- Core Lessons (3-4 Bite-Sized Cards) -->
      <div class="section-title" style="margin-top:24px;">
        <h3>কোর লেসনস (Bite-Sized Concepts)</h3>
      </div>
      <div class="ai-lesson-grid">
        ${m.lessons.map(l => `
          <div class="ai-lesson-card">
            <h4>${l.title}</h4>
            <ul>
              ${l.points.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <!-- Weak vs. Winning Comparison Card -->
      <div class="section-title" style="margin-top:28px;">
        <h3>বাস্তব ডিজাইনের পার্থক্য (Weak vs. Winning Comparison)</h3>
      </div>
      <div class="ai-comparison-grid">
        <div class="ai-compare-box weak">
          <div class="ai-compare-head">${m.comparison.weakTitle}</div>
          <ul>
            ${m.comparison.weakPoints.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
        <div class="ai-compare-box winning">
          <div class="ai-compare-head">${m.comparison.winTitle}</div>
          <ul>
            ${m.comparison.winPoints.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Hands-On Practice Task -->
      <div class="ai-practice-box">
        <strong style="color:var(--green);font-size:15px;display:block;">🛠️ হ্যান্ডস-অন প্র্যাকটিস টাস্ক</strong>
        <p style="font-size:14px;margin:8px 0;line-height:1.7;">${m.practiceTask}</p>
        <textarea id="ai-module-task-note" placeholder="আপনার উত্তর ও কাজের ড্রাফট এখানে লিখুন (অটোমেটিক্যালি লোকালস্টোরেজে সেভ থাকবে)...">${esc(userNote)}</textarea>
        <div id="ai-task-save-indicator" class="save-state">✓ আপনার নোট ব্রাউজারে সুরক্ষিত রয়েছে</div>
      </div>

      <!-- 3 Quick Check Questions -->
      <div class="ai-quiz-section">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
          <h3 style="margin:0;font-size:18px;">🎯 কুইক চেক কুইজ (৩টি প্রশ্ন)</h3>
          <span class="small muted">তাৎক্ষণিক ফলাফল ও সহজ বাংলা ব্যাখ্যা</span>
        </div>

        ${m.quiz.map((qItem, qIdx) => `
          <div class="ai-question-card" data-qidx="${qIdx}">
            <div style="font-weight:700;font-size:14.5px;color:var(--ink);margin-bottom:10px;">
              প্রশ্ন ${bn(qIdx+1)}: ${qItem.q}
            </div>
            <div class="ai-quiz-options">
              ${qItem.options.map((opt, oIdx) => `
                <button class="ai-opt-btn" data-module="${m.id}" data-q="${qIdx}" data-opt="${oIdx}">
                  ${opt}
                </button>
              `).join('')}
            </div>
            <div class="ai-feedback-box" id="feedback-${m.id}-${qIdx}"></div>
          </div>
        `).join('')}
      </div>

      <!-- Navigation Footer (Previous, All Modules, Next) -->
      <div class="lesson-navigation" style="display:flex;justify-content:space-between;align-items:center;margin-top:32px;gap:12px;flex-wrap:wrap;border-top:1px solid var(--line);padding-top:20px;">
        ${m.id > 1 ? `<a href="#ai-module-${m.id-1}" class="button" style="padding:10px 18px;font-weight:700;">← আগের মডিউল ${bn(m.id-1)}</a>` : '<div style="min-width:120px;"></div>'}
        <a href="#ai-marketing" class="button" style="padding:10px 18px;font-weight:700;">🏠 সব মডিউলে ফিরে যান</a>
        ${m.id < 6 ? `<a href="#ai-module-${m.id+1}" class="button primary" style="padding:10px 18px;font-weight:700;background:var(--green);border-color:var(--green);">পরের মডিউল ${bn(m.id+1)} →</a>` : `<a href="#ai-tools" class="button primary" style="padding:10px 18px;font-weight:700;background:var(--ai-purple);border-color:var(--ai-purple);">✏️ AI Sandbox Tools-এ যান →</a>`}
      </div>
    </article>
  `;
}

function initSingleModuleEvents(moduleId) {
  const m = aiMarketingModules.find(x => x.id === moduleId);
  if (!m) return;

  // Mark complete
  const completeBtn = document.getElementById('mark-module-complete-btn');
  if (completeBtn) {
    completeBtn.onclick = () => {
      const st = getAIMarketingState();
      st.modulesCompleted[m.id] = !st.modulesCompleted[m.id];
      saveAIMarketingState(st);
      renderAIMarketing(location.hash);
      if (typeof toast === 'function') {
        toast(st.modulesCompleted[m.id] ? `মডিউল ${bn(m.id)} সম্পন্ন হিসেবে সংরক্ষিত হয়েছে!` : `মডিউল ${bn(m.id)} আনমার্ক করা হয়েছে।`);
      }
    };
  }

  // Textarea auto-save
  const noteArea = document.getElementById('ai-module-task-note');
  const saveIndicator = document.getElementById('ai-task-save-indicator');
  if (noteArea) {
    noteArea.oninput = () => {
      const st = getAIMarketingState();
      st.notes[m.id] = noteArea.value;
      saveAIMarketingState(st);
      if (saveIndicator) saveIndicator.textContent = '✓ সংরক্ষিত হয়েছে (' + new Date().toLocaleTimeString('bn-BD') + ')';
    };
  }

  // Quiz buttons
  document.querySelectorAll(`.ai-opt-btn[data-module="${m.id}"]`).forEach(btn => {
    btn.onclick = () => {
      const qIdx = Number(btn.dataset.q);
      const optIdx = Number(btn.dataset.opt);
      const qData = m.quiz[qIdx];
      const feedbackBox = document.getElementById(`feedback-${m.id}-${qIdx}`);

      // Disable sibling buttons for this question
      const parentCard = btn.closest('.ai-question-card');
      parentCard.querySelectorAll('.ai-opt-btn').forEach(b => {
        b.disabled = true;
        const bOpt = Number(b.dataset.opt);
        if (bOpt === qData.ans) b.classList.add('correct');
        else if (bOpt === optIdx && optIdx !== qData.ans) b.classList.add('incorrect');
      });

      if (feedbackBox) {
        feedbackBox.classList.add('show');
        if (optIdx === qData.ans) {
          feedbackBox.className = 'ai-feedback-box show ok';
          feedbackBox.innerHTML = `<strong>🎉 সঠিক উত্তর!</strong> ${qData.why}`;
        } else {
          feedbackBox.className = 'ai-feedback-box show err';
          feedbackBox.innerHTML = `<strong>❌ সঠিক উত্তর নয়।</strong> সঠিক উত্তর: "${qData.options[qData.ans]}"।<br>${qData.why}`;
        }
      }
    };
  });
}

function initAIToolsEvents() {
  // Tool 1: Prompt Generator
  const nicheSel = document.getElementById('gen-niche');
  const goalSel = document.getElementById('gen-goal');
  const genBtn = document.getElementById('gen-prompt-btn');
  const copyPromptBtn = document.getElementById('copy-master-prompt');

  if (nicheSel) nicheSel.onchange = updatePromptGeneratorLogic;
  if (goalSel) goalSel.onchange = updatePromptGeneratorLogic;
  if (genBtn) genBtn.onclick = updatePromptGeneratorLogic;
  if (copyPromptBtn) {
    copyPromptBtn.onclick = () => {
      const text = document.getElementById('gen-prompt-output')?.textContent;
      if (text) {
        navigator.clipboard?.writeText(text);
        if (typeof toast === 'function') toast('মাস্টার প্রম্পট ক্লিপবোর্ডে কপি হয়েছে!');
      }
    };
  }
  updatePromptGeneratorLogic();

  // Tool 2: Readability Tester
  const headInp = document.getElementById('ad-test-head');
  const subInp = document.getElementById('ad-test-sub');
  const ctaInp = document.getElementById('ad-test-cta');
  const themeSel = document.getElementById('ad-test-theme');

  if (headInp) headInp.oninput = updateAdReadabilityLogic;
  if (subInp) subInp.oninput = updateAdReadabilityLogic;
  if (ctaInp) ctaInp.oninput = updateAdReadabilityLogic;
  if (themeSel) themeSel.onchange = updateAdReadabilityLogic;
  updateAdReadabilityLogic();

  // Tool 3: Loom Audit Builder
  const brandInp = document.getElementById('audit-brand');
  const platSel = document.getElementById('audit-platform');
  const leakChecks = document.querySelectorAll('.audit-leak-check');

  if (brandInp) brandInp.oninput = updateLoomAuditLogic;
  if (platSel) platSel.onchange = updateLoomAuditLogic;
  leakChecks.forEach(c => c.onchange = updateLoomAuditLogic);
  updateLoomAuditLogic();
}

/* Home Card helper to inject in renderHome() */
function renderAIHomeTrackCard() {
  const st = getAIMarketingState();
  const done = Object.values(st.modulesCompleted || {}).filter(Boolean).length;
  return `
    <section class="card" style="border:2px solid var(--ai-purple);background:linear-gradient(135deg, #fcfaff 0%, #ffffff 70%, #f2ecfa 100%);grid-column:1/-1;padding:28px;margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
        <div>
          ${renderAIBadges()}
          <h2 style="font-size:24px;margin:8px 0 6px;">AI with Marketing, Creative Strategy & Automation Path</h2>
          <p class="muted" style="max-width:750px;margin-bottom:14px;">
            ভিজ্যুয়াল সাইকোলজি (CRO), ৬-শব্দের থাম্ব-স্টপিং কপিরাইটিং, এআই প্রডাক্ট ফটোশুট, নো-কোড অটোমেশন ও ৫-মিনিটের লুম অডিট দিয়ে বাস্তব ক্লায়েন্ট পাওয়ার পূর্ণাঙ্গ শিক্ষাক্রম।
          </p>
        </div>
        <div style="text-align:right;">
          <div style="font-size:24px;font-weight:800;color:var(--green);">${bn(done)}/৬ মডিউল</div>
          <small class="muted">${bn(Math.round(done/6*100))}% সম্পন্ন</small>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:10px;">
        <a href="#ai-marketing" class="button primary" style="background:var(--ai-purple);border-color:var(--ai-purple);">
          📚 Modules (01–06) শুরু করুন →
        </a>
        <a href="#ai-tools" class="button">
          ✏️ AI Sandbox Tools
        </a>
        <a href="#ai-cheats" class="button text">
          📋 AI & Creative Cheat Sheet
        </a>
      </div>
    </section>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    aiMarketingModules,
    getAIMarketingState,
    saveAIMarketingState,
    renderAIMarketing,
    renderAIProofCard,
    renderAICheatSheetContent,
    renderAIHomeTrackCard
  };
}
