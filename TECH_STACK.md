# Technology Stack & Architecture — PhotoPixC Learn APK
**Application Name:** PhotoPixC Learn  
**Package Name:** `com.photopixc.learn`  
**Platform:** Android (Min SDK 22, Target SDK 34)  
**Architecture:** Offline-First Capacitor 6 Native Hybrid Container  
**Budget / Cost:** $0.00 (100% Free & Open-Source)  

---

## 1. Core Architecture

```text
+-------------------------------------------------------------+
|                Android Native Shell (Capacitor 6)            |
|  - Min SDK 22 (Android 5.1+) | Target SDK 34 (Android 14)   |
|  - AndroidManifest.xml (POST_NOTIFICATIONS, ALARMS)         |
|  - Native Splash Screen (Hardware Accelerated #0b1f33)      |
|  - Native Status Bar (#0e7c6b Teal Theme)                   |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|                Hardware Bridge (app-native-bridge.js)        |
|  - Android Hardware Back Button (Multi-layer hash routing)   |
|  - Local Scheduled Notifications (Daily 8:00 PM study alert) |
|  - Browser Progress Migration Assistant (.json Import/Export)|
|  - Native Toast Feedback                                    |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|         Sandboxed Chromium WebView (Local Assets Bundle)    |
|  - 100% Self-Contained in android/app/src/main/assets/public|
|  - Zero Network Calls Required for Core Learning Curriculum  |
|  - Persistent Client Storage (android_webview/Local Storage) |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|                     5 Learning Schools                      |
|  1. Google Ads পাঠশালা (17 modules, 102 lessons, quizzes)   |
|  2. AI Marketing পাঠশালা (6 modules, 3 interactive tools)   |
|  3. Meta Ads পাঠশালা (16 modules, 96 lessons, cheats)       |
|  4. Skill Lab 45 (45-day tracker, CAPI, GTM challenges)     |
|  5. কুরআনিক আরবি পাঠশালা (28 letters, 3D flashcards, salah)  |
+-------------------------------------------------------------+
```

---

## 2. Dependencies & Components

### A. Runtime Dependencies
* `@capacitor/core` (`^6.2.0`): Lightweight native runtime bridge.
* `@capacitor/android` (`^6.2.0`): Native Android container and Gradle harness.
* `@capacitor/app` (`^6.0.2`): Intercepts Android hardware back-button events and manages app lifecycle.
* `@capacitor/splash-screen` (`^6.0.3`): Seamless hardware splash screen preventing blank white flashes on boot.
* `@capacitor/status-bar` (`^6.0.2`): Dynamic status bar coloring (`#0e7c6b`) and light/dark mode icon contrast.
* `@capacitor/local-notifications` (`^6.1.1`): Serverless on-device scheduled reminders (Daily 8 PM study prompt & streak retention).

### B. Build & Deployment Infrastructure
* **Node.js:** Node `v20+` / `v26+` build script (`scripts/prepare-app.js`).
* **CI/CD Pipeline:** GitHub Actions (`.github/workflows/build-apk.yml`) on `ubuntu-latest` with OpenJDK 17 and Android SDK 34 (2,000 free runner minutes/month).
* **Zero Production Footprint:** All native packaging compiles from an isolated `www/` staging directory, leaving `learn.photopixc.com` production source files 100% unmodified.

---

## 3. Storage & State Management
* **Engine:** Android WebView isolated `window.localStorage` (LevelDB persistence in private app sandbox `/data/data/com.photopixc.learn/`).
* **Keys:**
  - Google Ads: `'ads-bangla-course-v1'`
  - AI Marketing: `'photopixc_ai_marketing_v1'`
  - Meta Ads: `'meta-bangla-course-v1'`
  - Skill Lab 45: `'shikharTracker45_v1'`
  - Quranic Arabic: `'photopixc.quranic-arabic.progress.v1'`, streak, weak words, last-ten surahs.
* **Migration Bridge:** Built-in JSON Import/Export engine allowing students to export their progress from mobile Chrome and import it directly into the APK in 1 click.
