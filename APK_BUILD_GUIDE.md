# APK Build & Distribution Guide — PhotoPixC Learn
**Target App:** PhotoPixC Learn (`com.photopixc.learn`)  
**Package Type:** Android APK (Debug & Release)  
**Distribution:** Direct Download for Students (WhatsApp, Google Drive, Telegram, or Website)  

---

## ১. GitHub Actions ক্লাউড থেকে সরাসরি APK ডাউনলোড করার নিয়ম (পদ্ধতি ক — কোনো ডাউনলোড ছাড়া)

আপনার কম্পিউটারে কোনো বড় সফটওয়্যার ইনস্টল ছাড়াই GitHub Actions থেকে সরাসরি তৈরি করা APK ডাউনলোড করতে পারবেন:

### ধাপসমূহ:
1. এই কোডবেসের পরিবর্তনগুলো গিটহাবে পুশ করুন:
   ```bash
   git add .
   git commit -m "feat: setup Capacitor Android app and cloud build pipeline"
   git push origin main
   ```
2. আপনার GitHub রিপোজিটরি ওপেন করুন (`https://github.com/photopixc-spec/learn-photopixc`).
3. ওপরের মেনু থেকে **"Actions"** ট্যাবে ক্লিক করুন।
4. বাম পাশের মেনুতে **"Build PhotoPixC Learn Android APK"** দেখতে পাবেন:
   - এটি স্বয়ংক্রিয়ভাবে চলতে শুরু করবে।
   - অথবা আপনি চাইলে **"Run workflow"** বাটনে ক্লিক করে যেকোনো সময় নতুন APK বিল্ড করতে পারবেন।
5. বিল্ড হতে **৩ থেকে ৪ মিনিট** সময় লাগবে। বিল্ড সম্পন্ন হলে (সবুজ টিকচিহ্ন আসবে):
   - সেই রানটিতে ক্লিক করুন।
   - পেজের নিচে **Artifacts** সেকশনে যান।
   - **`PhotoPixC-Learn-Debug-v1.0.apk`** ফাইলে ক্লিক করলেই আপনার ফোনে/কম্পিউটারে রেডি APK ফাইলটি ডাউনলোড হয়ে যাবে!

---

## ২. শিক্ষার্থীদের সাথে APK শেয়ার ও ইনস্টলেশন গাইড (Student Distribution)

আপনার ২০–৩০ জন শিক্ষার্থীকে অ্যাপটি দেওয়ার জন্য নিচের সহজ ধাপগুলো অনুসরণ করুন:

### শিক্ষার্থীদের দেওয়ার উপায়:
1. ডাউনলোড করা `.apk` ফাইলটি সরাসরি **WhatsApp গ্রুপ**, **Telegram**, অথবা **Google Drive** লিঙ্কে আপলোড করুন।
2. শিক্ষার্থীদের বলুন ফাইলটিতে ট্যাপ করে ইনস্টল করতে।

### শিক্ষার্থীদের ফোনে ইনস্টল করার নিয়ম (Android Installation Prompt):
যেহেতু অ্যাপটি গুগল প্লে স্টোরের বাইরে সরাসরি ফাইল থেকে ইনস্টল হচ্ছে (Sideloading), অ্যান্ড্রয়েড ফোন প্রথমবার একটি নিরাপত্তা বার্তা দেবে:
1. ফাইলে চাপ দিলে বলবে: *"For your security, your phone is not allowed to install unknown apps from this source."*
2. শিক্ষার্থী **"Settings"**-এ চাপ দিয়ে **"Allow from this source"** অন করে দেবে।
3. এরপর **"Install"** বাটনে চাপ দিলেই অ্যাপটি তাদের ফোনে ইনস্টল হয়ে যাবে!
4. ইনস্টল সম্পন্ন হলে তারা সরাসরি **PhotoPixC Learn** অ্যাপ আইকন দেখতে পাবে এবং সম্পূর্ণ অফলাইনে পড়ালেখা শুরু করতে পারবে।

---

## ৩. ব্রাউজারের পুরনো প্রগ্রেস অ্যাপে নেওয়ার নিয়ম (Student Progress Migration)

যদি কোনো শিক্ষার্থী আগে মোবাইল ব্রাউজারে (`learn.photopixc.com`) কোনো কোর্স পড়ে থাকে:
1. ব্রাউজারে সাইটটি ওপেন করে নিচে **"Backup Learning Progress"** বাটনে চাপ দিয়ে `.json` ব্যাকআপ ফাইলটি ডাউনলোড করবে।
2. এরপর নতুন **PhotoPixC Learn অ্যাপ** ওপেন করবে।
3. নিচে ভেসে থাকা **"📱 ব্রাউজার প্রগ্রেস ট্রান্সফার"** বাটনে চাপ দেবে।
4. ডাউনলোড করা সেই `.json` ব্যাকআপ ফাইলটি সিলেক্ট করলেই সাথে সাথে তার পূর্বের সমস্ত কমপ্লিট করা লেসন ও কুইজ স্কোর অ্যাপে লোড হয়ে যাবে!

---

## ৪. অফলাইন লোকাল বিল্ড গাইড (পদ্ধতি খ — শুধুমাত্র ডেভেলপারদের জন্য)

ভবিষ্যতে যদি কখনো সম্পূর্ণ অফলাইনে নিজের কম্পিউটারে Gradle দিয়ে বিল্ড করতে চান:

### পূর্বশর্ত:
- OpenJDK 17 ইনস্টল করা থাকতে হবে এবং `JAVA_HOME` পাথে যুক্ত থাকতে হবে।
- Android SDK Command-line Tools বা Android Studio ইনস্টল থাকতে হবে এবং `ANDROID_HOME` সেট থাকতে হবে।

### লোকাল বিল্ড কমান্ড:
```powershell
# ১. ওয়েব অ্যাসেট বান্ডিল ও ক্যাপাসিটর সিঙ্ক
npm run cap:sync

# ২. অ্যান্ড্রয়েড ফোল্ডারে প্রবেশ
cd android

# ৩. লোকাল ডিবাগ APK বিল্ড
.\gradlew assembleDebug

# ৪. তৈরি হওয়া APK ফাইলটি খুঁজে পাবেন এই লোকেশনে:
# android/app/build/outputs/apk/debug/app-debug.apk
```
