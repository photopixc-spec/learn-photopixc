/* All business figures below are FICTIONAL training assumptions, not market benchmarks. */
window.PHOTOPIXC_CAPSTONE_V78 = Object.freeze({
 version:'7.8',
 clients:[
 {id:'fashion',title:'Aster Wear · D2C Fashion',sector:'E-commerce',goal:'purchase',goalLabel:'Completed Purchase',budget:120000,baseCpc:24,convRate:2.5,value:2200,margin:42,
  objective:'অর্ডার বৃদ্ধি, কিন্তু contribution margin দেখে সিদ্ধান্ত',target:'CPA ≤ ৳৯৫০ (কাল্পনিক লক্ষ্য)',audience:'ঢাকার ২২–৩৫ বছর বয়সী অনলাইন পোশাক ক্রেতা; রিটার্নিং ও নতুন ক্রেতা আলাদা করে বিবেচনা',
  constraints:['নিজস্ব Product Photo Shoot সার্ভিস নেই—ক্লায়েন্টের দেওয়া Creative Asset ব্যবহার','Purchase value ও currency যাচাই না করলে ROAS বিশ্বাসযোগ্য নয়','Delivery, Returns ও Discount Cost-এর হিসাব দেওয়া নেই'],
  problem:'আগের ১৪ দিনের CPA বেড়েছে; Checkout Drop-off বাড়ছে। Browser Pixel ও CAPI উভয়ই আছে, কিন্তু event_id মিলছে কি না নিশ্চিত নয়।',
  channels:['Google Search','Meta Prospecting','Meta Retargeting','YouTube'],weights:[36000,48000,24000,12000],
  mustEvents:['purchase','add_to_cart','consent'],recommended:'tracking',optChoices:['শুধু Budget দ্বিগুণ করে বিক্রি বাড়ানোর চেষ্টা','Purchase Event, Checkout Funnel ও Mobile UX পরীক্ষা করে সীমিত Test','সব Ads বন্ধ, কোনো Evidence সংগ্রহ নয়'],
  explanation:'যে CPA বেড়েছে তা প্রকৃত Conversion সমস্যা নাকি Measurement সমস্যা—প্রথমে বোঝা দরকার। Purchase, value, currency, event_id এবং Mobile Checkout QA করে hypothesis তৈরি করো।',
  csv:'capstone-data/fashion-practice.csv'},
 {id:'dental',title:'Bright Dental · Local Clinic',sector:'Local service',goal:'lead',goalLabel:'Qualified Appointment',budget:60000,baseCpc:30,convRate:5,value:4000,margin:55,
  objective:'Qualified Appointment বাড়ানো; শুধু Form Submit নয়',target:'Qualified CPA ≤ ৳৬৫০ (কাল্পনিক লক্ষ্য)',audience:'ক্লিনিক থেকে ৮ কিমি ব্যাসার্ধের সম্ভাব্য রোগী; ভাষা ও যোগাযোগের সময় বিবেচনা',
  constraints:['রোগীর ব্যক্তিগত স্বাস্থ্য তথ্য Ads Platform-এ পাঠানো যাবে না','Consultation Booked এবং Actual Attendance আলাদা Status','ফোন ও Form—উভয় Channel-এর Consent এবং Quality যাচাই করতে হবে'],
  problem:'Form CPL ভালো, কিন্তু Booking কম। CRM ও Ads Platform-এ Lead Count এক নয়; Mobile Form-এর error-এর অভিযোগ আছে।',
  channels:['Google Search','Meta Leads','Meta Retargeting','Local Video'],weights:[30000,21000,6000,3000],
  mustEvents:['qualified_lead','consent','form_submit'],recommended:'crm',optChoices:['Lead Quality ও CRM Stage, Form Failure এবং Response Time যাচাই','শুধু সস্তা CPL দেখে Budget বাড়ানো','সব Consent বাদ দেওয়া'],
  explanation:'Form CPL ব্যবসায়িক সফলতার যথেষ্ট প্রমাণ নয়। Qualified CPL, Appointment Show-up এবং CRM Reconciliation আগে পর্যালোচনা করো; সংবেদনশীল স্বাস্থ্য ডেটা শেয়ার কোরো না।',
  csv:'capstone-data/dental-practice.csv'},
 {id:'saas',title:'Northstar SaaS · B2B Leads',sector:'B2B SaaS',goal:'lead',goalLabel:'Sales Qualified Lead (SQL)',budget:180000,baseCpc:120,convRate:4,value:38000,margin:65,
  objective:'Sales-Qualified Lead তৈরি, শুধু Whitepaper Download নয়',target:'SQL CPA ≤ ৳৩,২০০ (কাল্পনিক লক্ষ্য)',audience:'SMB Operations Manager ও Procurement Lead; উচ্চ intent ও কম volume',
  constraints:['Sales Cycle ৩০–৯০ দিন; তাৎক্ষণিক ROAS নির্ভরযোগ্য নয়','CRM-এর MQL, SQL, Won-এর সংজ্ঞা আগে ঠিক করতে হবে','বিক্রয় ও বিপণন দলের অনুমতি ছাড়া CRM ডেটা শেয়ার নয়'],
  problem:'Website Lead বেড়েছে, কিন্তু SQL কম। Paid Search Query Mix বদলেছে; CRM stage reporting ঠিকভাবে মেলে না।',
  channels:['Google Search','Meta Awareness','Remarketing','YouTube Explainer'],weights:[105000,30000,30000,15000],
  mustEvents:['qualified_lead','consent','form_submit'],recommended:'crm',optChoices:['সস্তা Whitepaper Lead-কে SQL বলে রিপোর্ট','Query Intent, CRM stage mapping ও Qualified CPL যাচাই','Tracking বন্ধ করে শুধু CTR দেখা'],
  explanation:'B2B-তে SQL ও Won মেট্রিক গুরুত্বপূর্ণ; Lead Quality, Keyword Intent, CRM Stage ও attribution lag যাচাই করে সিদ্ধান্ত নাও।',
  csv:'capstone-data/saas-practice.csv'}
 ],
 steps:[
  {id:'brief',title:'Client Brief বুঝি',desc:'Business outcome ও সীমাবদ্ধতা পড়ে audience-এর পরিকল্পনা লেখো'},
  {id:'strategy',title:'Campaign Strategy',desc:'কোন Channel কেন এবং কত Budget পাবে তা সাজাও'},
  {id:'tracking',title:'Tracking & Consent',desc:'Event, Conversion Source এবং Data Privacy যাচাই করো'},
  {id:'numbers',title:'Budget & KPI Validation',desc:'অনুমান থেকে CPA হিসাব করো এবং Cost/Revenue-এর সীমা বুঝো'},
  {id:'optimize',title:'Optimization Diagnosis',desc:'সমস্যার জন্য সবচেয়ে কম ঝুঁকির প্রথম পদক্ষেপ ঠিক করো'},
  {id:'report',title:'Client Report & Next Action',desc:'Evidence, সুপারিশ ও মাপার পরিকল্পনা নিজের ভাষায় লেখো'},
  {id:'review',title:'Final QA & Portfolio',desc:'নিজের কাজের সীমা যাচাই করে Simulation Report Export করো'}
 ]
});
