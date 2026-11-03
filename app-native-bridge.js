/**
 * PhotoPixC Learn - Native Android Bridge
 * Runs inside Capacitor WebView. Safely ignored in normal desktop/mobile browsers.
 */
(function() {
  'use strict';

  // Verify Capacitor Native Environment
  const isCapacitor = typeof window !== 'undefined' && 
                      window.Capacitor && 
                      typeof window.Capacitor.isNativePlatform === 'function' &&
                      window.Capacitor.isNativePlatform();

  console.log('[PhotoPixC Native Bridge] Initialized. Native platform:', isCapacitor);

  // 1. Android Hardware Back Button Handler
  function initBackButton(App) {
    let lastBackPressTime = 0;

    App.addListener('backButton', () => {
      console.log('[Native Bridge] Hardware Back Pressed. Current hash:', window.location.hash);

      // Layer 1: Check open sidebars, drawers, or mobile menus
      const openSidebar = document.querySelector('#sidebar.open, .sidebar.open, .drawer.active, #mobile-menu.open, .nav-menu.active');
      if (openSidebar) {
        openSidebar.classList.remove('open', 'active');
        return;
      }

      // Layer 2: Check open dialogs or modals
      const openModal = document.querySelector('.modal.active, .popup.open, dialog[open], #photopixc-transfer-modal.active');
      if (openModal) {
        if (typeof openModal.close === 'function') openModal.close();
        else openModal.classList.remove('active', 'open');
        return;
      }

      // Layer 3: If inside a lesson, return to syllabus/home
      const hash = window.location.hash || '';
      if (hash.startsWith('#g-lesson-') || hash.startsWith('#ai-module-') || hash.startsWith('#m-lesson-') || hash.startsWith('#lesson-')) {
        window.location.hash = '#syllabus';
        return;
      }

      // Layer 4: If in a sub-section of a school, return to school home
      if (hash && hash !== '#home' && hash !== '#syllabus') {
        window.location.hash = '#home';
        return;
      }

      // Layer 5: If in a sub-app (Google Ads, Meta Ads, etc.), return to Root Portal
      const isSubApp = window.location.pathname.includes('/google-ads/') || 
                       window.location.pathname.includes('/meta-ads/') || 
                       window.location.pathname.includes('/quranic-arabic/') ||
                       window.location.pathname.includes('/skill-lab-45/');
      if (isSubApp) {
        window.location.href = '../index.html';
        return;
      }

      // Layer 6: Root Portal Exit confirmation (2 presses within 2 seconds)
      const now = Date.now();
      if (now - lastBackPressTime < 2000) {
        App.exitApp();
      } else {
        lastBackPressTime = now;
        showToast('অ্যাপ থেকে বের হতে আবার ব্যাক চাপুন');
      }
    });
  }

  // 2. Status Bar & Splash Screen
  async function initSystemBars(StatusBar, SplashScreen) {
    try {
      if (StatusBar) {
        await StatusBar.setBackgroundColor({ color: '#0e7c6b' });
      }
    } catch (e) {
      console.warn('[Native Bridge] StatusBar config skipped:', e);
    }

    try {
      if (SplashScreen) {
        setTimeout(async () => {
          await SplashScreen.hide();
        }, 300);
      }
    } catch (e) {
      console.warn('[Native Bridge] SplashScreen hide skipped:', e);
    }
  }

  // 3. Local Study Reminder Push Notification
  async function initStudyReminders(LocalNotifications) {
    if (!LocalNotifications) return;

    try {
      const isScheduled = localStorage.getItem('photopixc_study_reminder_set');
      if (!isScheduled) {
        const perm = await LocalNotifications.requestPermissions();
        if (perm.display === 'granted') {
          await LocalNotifications.schedule({
            notifications: [
              {
                id: 101,
                title: 'PhotoPixC Learn — আজকের ৫ মিনিট',
                body: '📖 প্রতিদিন মাত্র ৫ মিনিট! আজকের ১টি নতুন লেসন সম্পন্ন করুন ও স্কিল বাড়ান।',
                schedule: {
                  on: { hour: 20, minute: 0 }, // 8:00 PM Daily
                  repeats: true,
                  allowWhileIdle: true
                },
                smallIcon: 'ic_stat_notification'
              }
            ]
          });
          localStorage.setItem('photopixc_study_reminder_set', 'true');
          console.log('[Native Bridge] Daily 8 PM study reminder scheduled.');
        }
      }
    } catch (e) {
      console.warn('[Native Bridge] LocalNotifications setup failed:', e);
    }
  }

  // 4. Lightweight Native Toast
  function showToast(message) {
    let toast = document.getElementById('photopixc-native-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'photopixc-native-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 70px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(11, 31, 51, 0.92);
        color: #ffffff;
        padding: 10px 20px;
        border-radius: 24px;
        font-size: 13px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hind Siliguri", sans-serif;
        box-shadow: 0 4px 14px rgba(0,0,0,0.25);
        z-index: 999999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.25s ease-in-out;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    setTimeout(() => {
      toast.style.opacity = '0';
    }, 1800);
  }

  // 5. Browser-to-App Progress Migration Assistant UI
  function injectDataTransferButton() {
    // Only show on root portal or when user is in the app
    if (!document.body) return;

    // Check if migration button already exists
    if (document.getElementById('btn-photopixc-transfer')) return;

    const transferBtn = document.createElement('button');
    transferBtn.id = 'btn-photopixc-transfer';
    transferBtn.innerHTML = '📱 ব্রাউজার প্রগ্রেস ট্রান্সফার';
    transferBtn.style.cssText = `
      position: fixed;
      bottom: 16px;
      right: 16px;
      background: #0e7c6b;
      color: #ffffff;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 30px;
      padding: 8px 14px;
      font-size: 12px;
      font-weight: 600;
      font-family: "Hind Siliguri", sans-serif;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(14, 124, 107, 0.35);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 6px;
    `;

    transferBtn.addEventListener('click', openTransferModal);
    document.body.appendChild(transferBtn);
  }

  function openTransferModal() {
    let modal = document.getElementById('photopixc-transfer-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'photopixc-transfer-modal';
      modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(11, 31, 51, 0.7);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 100000;
        padding: 16px;
      `;

      modal.innerHTML = `
        <div style="
          background: #ffffff;
          max-width: 420px;
          width: 100%;
          border-radius: 12px;
          padding: 24px;
          font-family: 'Hind Siliguri', sans-serif;
          color: #102a43;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
          <h3 style="margin: 0 0 10px; font-size: 18px; color: #0e7c6b; display: flex; align-items: center; gap: 8px;">
            <span>📱</span> ব্রাউজার থেকে প্রগ্রেস ট্রান্সফার
          </h3>
          <p style="font-size: 13px; line-height: 1.5; color: #52606d; margin: 0 0 14px;">
            আপনি যদি আগে ক্রোম বা অন্য ব্রাউজারে <b>learn.photopixc.com</b> পড়ে থাকেন, তবে সেই আগের প্রগ্রেস সহজেই এই অ্যাপে ট্রান্সফার করতে পারবেন:
          </p>
          <ol style="font-size: 13px; color: #102a43; line-height: 1.6; margin: 0 0 16px; padding-left: 20px;">
            <li>ব্রাউজারে গিয়ে <b>"Backup Learning Progress"</b> থেকে ব্যাকআপ ফাইলটি (.json) ডাউনলোড করুন।</li>
            <li>নিচের বাটনে চাপ দিয়ে সেই ফাইলটি নির্বাচন করুন।</li>
          </ol>
          <input type="file" id="photopixc-import-file-input" accept=".json" style="display: none;" />
          <button id="photopixc-select-backup-btn" style="
            width: 100%;
            padding: 11px;
            background: #0e7c6b;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            margin-bottom: 10px;
          ">📂 ব্যাকআপ JSON ফাইল সিলেক্ট করুন</button>
          <button id="photopixc-close-modal-btn" style="
            width: 100%;
            padding: 9px;
            background: #f6f9f8;
            color: #52606d;
            border: 1px solid #d9dee8;
            border-radius: 8px;
            font-size: 13px;
            cursor: pointer;
          ">বন্ধ করুন</button>
        </div>
      `;

      document.body.appendChild(modal);

      const fileInput = modal.querySelector('#photopixc-import-file-input');
      modal.querySelector('#photopixc-select-backup-btn').addEventListener('click', () => fileInput.click());
      modal.querySelector('#photopixc-close-modal-btn').addEventListener('click', () => {
        modal.style.display = 'none';
        modal.classList.remove('active');
      });

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(evt) {
          try {
            const data = JSON.parse(evt.target.result);
            // Restore any matching keys in localStorage
            let restoredCount = 0;
            for (const key of Object.keys(data)) {
              if (typeof data[key] === 'object') {
                localStorage.setItem(key, JSON.stringify(data[key]));
                restoredCount++;
              } else if (typeof data[key] === 'string') {
                localStorage.setItem(key, data[key]);
                restoredCount++;
              }
            }
            alert(`✅ সফল! আপনার ${restoredCount}টি ডেটা রেকর্ড সফলভাবে ইমপোর্ট হয়েছে। অ্যাপটি রিলোড হচ্ছে...`);
            window.location.reload();
          } catch (err) {
            alert('❌ ব্যাকআপ ফাইলটি সঠিক নয়। অনুগ্রহ করে learn.photopixc.com থেকে এক্সপোর্ট করা সঠিক .json ফাইল দিন।');
          }
        };
        reader.readAsText(file);
      });
    }

    modal.style.display = 'flex';
    modal.classList.add('active');
  }

  function onReady(fn) {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      setTimeout(fn, 1);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // Initialize Native Features if inside Capacitor
  onReady(() => {
    if (isCapacitor) {
      // Disable and clear Service Workers on Native Platform to prevent stale cache
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(regs => {
          for (const r of regs) {
            console.log('[Native Bridge] Unregistering ServiceWorker on Native platform:', r.scope);
            r.unregister();
          }
        }).catch(() => {});
      }

      const plugins = window.Capacitor.Plugins || {};
      const { App, StatusBar, SplashScreen, LocalNotifications } = plugins;

      if (App) initBackButton(App);
      initSystemBars(StatusBar, SplashScreen);
      initStudyReminders(LocalNotifications);
      injectDataTransferButton();
    }
  });

})();
