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

  // ==========================================================================
  // Reliable Progress Persistence: Sync localStorage with IndexedDB
  // ==========================================================================
  function initPersistentStorage() {
    if (typeof window === 'undefined' || !window.indexedDB || !window.localStorage) return;

    const DB_NAME = 'photopixc_progress_persistence_db';
    const DB_VERSION = 1;
    const STORE_NAME = 'progress_backup_store';
    let dbInstance = null;
    let dbOpenPromise = null;

    function getDB() {
      if (dbInstance) return Promise.resolve(dbInstance);
      if (dbOpenPromise) return dbOpenPromise;

      dbOpenPromise = new Promise((resolve, reject) => {
        try {
          const request = window.indexedDB.open(DB_NAME, DB_VERSION);
          request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              db.createObjectStore(STORE_NAME, { keyPath: 'key' });
            }
          };
          request.onsuccess = (e) => {
            dbInstance = e.target.result;
            resolve(dbInstance);
          };
          request.onerror = (e) => {
            console.warn('[Progress Persistence] IndexedDB open error:', e.target.error);
            reject(e.target.error);
          };
        } catch (err) {
          reject(err);
        }
      });
      return dbOpenPromise;
    }

    async function saveToIndexedDB(key, value) {
      try {
        const db = await getDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put({ key: String(key), value: String(value), timestamp: Date.now() });
      } catch (_) {}
    }

    async function removeFromIndexedDB(key) {
      try {
        const db = await getDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.delete(String(key));
      } catch (_) {}
    }

    async function reconcileStorage() {
      try {
        const db = await getDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();

        req.onsuccess = () => {
          const records = req.result || [];
          let restored = 0;
          for (const item of records) {
            if (item && item.key) {
              const currentVal = origGetItem.call(window.localStorage, item.key);
              if (currentVal === null && item.value !== null && item.value !== undefined) {
                origSetItem.call(window.localStorage, item.key, item.value);
                restored++;
              }
            }
          }
          if (restored > 0) {
            console.log(`[Progress Persistence] Restored ${restored} learning progress keys from IndexedDB.`);
          }

          // Backup any current localStorage keys into IndexedDB
          for (let i = 0; i < window.localStorage.length; i++) {
            const k = window.localStorage.key(i);
            if (k) {
              const v = origGetItem.call(window.localStorage, k);
              if (v !== null) saveToIndexedDB(k, v);
            }
          }
        };
      } catch (err) {
        console.warn('[Progress Persistence] Reconcile error:', err);
      }
    }

    const origSetItem = Storage.prototype.setItem;
    const origGetItem = Storage.prototype.getItem;
    const origRemoveItem = Storage.prototype.removeItem;

    Storage.prototype.setItem = function(key, value) {
      origSetItem.call(this, key, value);
      if (this === window.localStorage) {
        saveToIndexedDB(key, value);
      }
    };

    Storage.prototype.removeItem = function(key) {
      origRemoveItem.call(this, key);
      if (this === window.localStorage) {
        removeFromIndexedDB(key);
      }
    };

    reconcileStorage();

    window.PhotoPixcStorage = {
      save: saveToIndexedDB,
      remove: removeFromIndexedDB,
      reconcile: reconcileStorage
    };
  }

  // Activate persistent storage backup immediately
  initPersistentStorage();

  // ==========================================================================
  // Smart Multi-Layer Android Hardware Back Button Handler
  // ==========================================================================
  function initBackButton(App) {
    let lastBackPressTime = 0;

    App.addListener('backButton', () => {
      console.log('[Native Bridge] Hardware Back Pressed. Path:', window.location.pathname, 'Hash:', window.location.hash);

      /* ========================================================================
         Priority 1: Close active modal, drawer, cheat-sheet popup, or quiz overlay
         ======================================================================== */
      // A. Progress Modal or Data Transfer Modal
      const progressModal = document.querySelector('#mobile-progress-modal');
      if (progressModal && (progressModal.style.display === 'flex' || progressModal.classList.contains('active'))) {
        progressModal.style.display = 'none';
        progressModal.classList.remove('active');
        return;
      }

      const transferModal = document.querySelector('#photopixc-transfer-modal');
      if (transferModal && (transferModal.style.display === 'flex' || transferModal.classList.contains('active'))) {
        transferModal.style.display = 'none';
        transferModal.classList.remove('active');
        return;
      }

      // B. Skill Lab 45 Grouped Tools Drawer (#v79-tools)
      const v79Tools = document.querySelector('#v79-tools');
      if (v79Tools && !v79Tools.hidden) {
        const closeBtn = v79Tools.querySelector('.v79-close');
        if (closeBtn && typeof closeBtn.click === 'function') closeBtn.click();
        else v79Tools.hidden = true;
        return;
      }

      // C. Sidebars, Navigation Drawers & Mobile Menus
      const openSidebar = document.querySelector('#sidebar.open, .sidebar.open, .drawer.active, #mobile-menu.open, .nav-menu.active');
      if (openSidebar) {
        openSidebar.classList.remove('open', 'active');
        document.body.classList.remove('nav-open');
        return;
      }
      if (document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        return;
      }

      // D. HTML5 Dialog Elements
      const openDialog = document.querySelector('dialog[open]');
      if (openDialog) {
        if (typeof openDialog.close === 'function') openDialog.close();
        else openDialog.removeAttribute('open');
        return;
      }

      // E. Cheat-sheet modal, quiz overlay, or generic popups
      const openModal = document.querySelector(
        '.modal.active, .modal.show, .popup.open, .popup.active, ' +
        '.overlay.active, .overlay.open, .cheat-sheet-modal.open, ' +
        '.quiz-overlay.open, #cheat-modal.active, #quiz-modal.active, ' +
        '[role="dialog"][aria-modal="true"]:not([style*="display: none"])'
      );
      if (openModal) {
        const closeBtn = openModal.querySelector('.close, .btn-close, [data-close], [aria-label*="close" i], .modal-close');
        if (closeBtn && typeof closeBtn.click === 'function') {
          closeBtn.click();
        } else {
          openModal.classList.remove('active', 'open', 'show');
          openModal.style.display = 'none';
        }
        return;
      }

      /* ========================================================================
         Determine Page Location (Sub-Module vs Main Hub)
         ======================================================================== */
      const pathname = window.location.pathname || '';
      const hash = window.location.hash || '';

      const isSubApp = pathname.includes('/google-ads/') || 
                       pathname.includes('/meta-ads/') || 
                       pathname.includes('/quranic-arabic/') || 
                       pathname.includes('/skill-lab-45/');

      /* ========================================================================
         Priority 2: Inside a sub-view or tab within a sub-module
         ======================================================================== */
      if (isSubApp) {
        let isInsideSubView = false;

        if (pathname.includes('/google-ads/') || pathname.includes('/meta-ads/')) {
          isInsideSubView = !!hash && hash !== '#home';
        } else if (pathname.includes('/quranic-arabic/')) {
          isInsideSubView = !!hash && hash !== '#qa-home';
        } else if (pathname.includes('/skill-lab-45/')) {
          const activeNonHomeView = document.querySelector('.view.active:not(#view-home)');
          isInsideSubView = (!!hash && hash !== '#home' && hash !== '#view-home') || !!activeNonHomeView;
        }

        if (isInsideSubView) {
          if (window.history.length > 1) {
            window.history.back();
            return;
          } else {
            // Graceful fallback to module root
            if (pathname.includes('/quranic-arabic/')) {
              window.location.hash = '#qa-home';
            } else if (pathname.includes('/skill-lab-45/')) {
              if (typeof window.showView === 'function') window.showView('home');
              else window.location.hash = '#home';
            } else {
              window.location.hash = '#home';
            }
            return;
          }
        }

        /* ========================================================================
           Priority 3: On root page of any sub-module -> Redirect to Main Hub
           ======================================================================== */
        window.location.href = '../index.html';
        return;
      }

      /* ========================================================================
         Priority 4: Only when on Main Hub (public/index.html) -> Exit Confirmation
         ======================================================================== */
      const now = Date.now();
      if (now - lastBackPressTime < 2000) {
        if (App && typeof App.exitApp === 'function') {
          App.exitApp();
        }
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
        bottom: calc(env(safe-area-inset-bottom, 0px) + 84px);
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
