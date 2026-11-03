/**
 * PhotoPixC Learn - Mobile App Dedicated Controller (v2.1)
 * Drives Bottom Navigation, Continue Learning Widget, Streak Gamification,
 * and Sticky Lesson Navigation with robust file-based routing.
 */
(function() {
  'use strict';

  function onReady(fn) {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      setTimeout(fn, 1);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  const isNative = typeof window !== 'undefined' && 
                   window.Capacitor && 
                   typeof window.Capacitor.isNativePlatform === 'function' &&
                   window.Capacitor.isNativePlatform();

  // Run on native app or mobile viewport
  const isMobile = isNative || (typeof window !== 'undefined' && window.innerWidth <= 768);

  if (!isMobile) return;

  document.body.classList.add('has-mobile-app');

  // 1. Streak Tracker
  function updateAndGetStreak() {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const raw = localStorage.getItem('photopixc_streak_history');
      let history = raw ? JSON.parse(raw) : [];

      if (!history.includes(today)) {
        history.push(today);
        if (history.length > 60) history.shift();
        localStorage.setItem('photopixc_streak_history', JSON.stringify(history));
      }

      let streak = 0;
      let checkDate = new Date();
      while (true) {
        const dateStr = checkDate.toISOString().slice(0, 10);
        if (history.includes(dateStr)) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
      return Math.max(streak, 1);
    } catch (e) {
      return 1;
    }
  }

  // 2. Continue Learning Resolver
  function getContinueLearningTarget() {
    try {
      const gRaw = localStorage.getItem('ads-bangla-course-v1');
      if (gRaw) {
        const gState = JSON.parse(gRaw);
        if (gState && gState.completed && typeof gState.completed === 'object') {
          const completedCount = Object.keys(gState.completed).filter(k => gState.completed[k]).length;
          const nextLessonNum = completedCount + 1;
          if (nextLessonNum <= 102) {
            return {
              school: 'Google Ads পাঠশালা',
              title: `লেসন ${nextLessonNum}`,
              desc: `${completedCount}টি লেসন সমাপ্ত · আপনার অগ্রগতি এগিয়ে নিন`,
              url: isSubApp('google-ads') ? `#g-lesson-${nextLessonNum}` : `google-ads/index.html#g-lesson-${nextLessonNum}`
            };
          }
        }
      }

      const mRaw = localStorage.getItem('meta-bangla-course-v1');
      if (mRaw) {
        const mState = JSON.parse(mRaw);
        if (mState && mState.completed && typeof mState.completed === 'object') {
          const mCount = Object.keys(mState.completed).filter(k => mState.completed[k]).length;
          const nextMLesson = mCount + 1;
          if (nextMLesson <= 96) {
            return {
              school: 'Meta Ads পাঠশালা',
              title: `লেসন ${nextMLesson}`,
              desc: `${mCount}টি লেসন সমাপ্ত · বিজ্ঞাপন স্ট্র্যাটেজি শিখুন`,
              url: isSubApp('meta-ads') ? `#m-lesson-${nextMLesson}` : `meta-ads/index.html#m-lesson-${nextMLesson}`
            };
          }
        }
      }
    } catch (e) {
      console.warn('[Mobile App] Error reading continue target:', e);
    }

    return {
      school: 'Google Ads পাঠশালা',
      title: 'লেসন ০১: বিজ্ঞাপনের ভিত্তি ও Google Ads পরিচিতি',
      desc: 'আজকের ৫ মিনিট দিয়ে আপনার শেখার যাত্রা শুরু করুন',
      url: isSubApp('google-ads') ? '#g-lesson-1' : 'google-ads/index.html#g-lesson-1'
    };
  }

  function isSubApp(name) {
    return window.location.pathname.includes(`/${name}/`);
  }

  // 3. Render Mobile Header Bar with Streak
  function injectMobileHeader() {
    if (document.getElementById('mobile-top-bar')) return;

    const streakCount = updateAndGetStreak();

    const topBar = document.createElement('div');
    topBar.id = 'mobile-top-bar';
    topBar.className = 'mobile-app-header-bar';
    topBar.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:22px;">📚</span>
        <div>
          <strong style="font-size:16px;color:var(--color-ink,#102a43);font-family:var(--font-ui);line-height:1.2;display:block;">PhotoPixC Learn</strong>
          <span style="font-size:11px;color:var(--color-accent,#0e7c6b);font-weight:700;letter-spacing:0.5px;">OFFLINE ACTIVE</span>
        </div>
      </div>
      <div class="mobile-streak-pill" title="প্রতিদিনের ধারাবাহিকতা">
        <span class="mobile-streak-flame">🔥</span>
        <span>${streakCount} দিনের স্ট্রিক</span>
      </div>
    `;

    document.body.insertBefore(topBar, document.body.firstChild);
  }

  // 4. Render Continue Learning Card on Portal
  function injectContinueCard() {
    if (document.getElementById('mobile-continue-widget')) return;
    const isPortal = !window.location.pathname.includes('/google-ads/') && 
                     !window.location.pathname.includes('/meta-ads/') &&
                     !window.location.pathname.includes('/quranic-arabic/') &&
                     !window.location.pathname.includes('/skill-lab-45/');

    if (!isPortal) return;

    const target = getContinueLearningTarget();
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const card = document.createElement('div');
    card.id = 'mobile-continue-widget';
    card.className = 'mobile-continue-card';
    card.innerHTML = `
      <div class="mobile-continue-tag">
        <span>⚡</span> পড়া চালিয়ে যান
      </div>
      <h3 class="mobile-continue-title">${target.school} — ${target.title}</h3>
      <p class="mobile-continue-sub">${target.desc}</p>
      <button class="mobile-continue-btn" onclick="window.location.href='${target.url}'">
        <span>▶</span> লেসন ওপেন করুন
      </button>
    `;

    hero.parentNode.insertBefore(card, hero.nextSibling);
  }

  // 5. Render Bottom Navigation Bar
  function injectBottomNav() {
    if (document.getElementById('mobile-bottom-bar')) return;

    const nav = document.createElement('nav');
    nav.id = 'mobile-bottom-bar';
    nav.className = 'mobile-bottom-nav';
    nav.setAttribute('aria-label', 'Mobile Bottom Navigation');

    const inSchool = window.location.pathname.includes('/google-ads/') || 
                     window.location.pathname.includes('/meta-ads/') ||
                     window.location.pathname.includes('/quranic-arabic/') ||
                     window.location.pathname.includes('/skill-lab-45/');

    const homeUrl = inSchool ? '../index.html' : 'index.html';
    const syllabusUrl = inSchool ? '#syllabus' : 'google-ads/index.html#syllabus';
    const labsUrl = inSchool ? '#labs' : 'google-ads/index.html#labs';

    nav.innerHTML = `
      <a href="${homeUrl}" class="mobile-nav-item" id="nav-tab-home">
        <span class="mobile-nav-icon">🏠</span>
        <span>হোম</span>
      </a>
      <a href="${syllabusUrl}" class="mobile-nav-item" id="nav-tab-syllabus">
        <span class="mobile-nav-icon">📖</span>
        <span>সিলেবাস</span>
      </a>
      <a href="${labsUrl}" class="mobile-nav-item" id="nav-tab-labs">
        <span class="mobile-nav-icon">⚡</span>
        <span>ল্যাব ও টুলস</span>
      </a>
      <button class="mobile-nav-item" id="nav-tab-progress" style="background:none;border:none;cursor:pointer;">
        <span class="mobile-nav-icon">📊</span>
        <span>প্রগ্রেস</span>
      </button>
    `;

    document.body.appendChild(nav);

    if (!inSchool) {
      const homeLink = nav.querySelector('#nav-tab-home');
      if (homeLink) {
        homeLink.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    }

    const progressBtn = nav.querySelector('#nav-tab-progress');
    if (progressBtn) {
      progressBtn.addEventListener('click', showProgressModal);
    }

    updateActiveNavTab();
  }

  function updateActiveNavTab() {
    const hash = window.location.hash || '';
    const tabs = document.querySelectorAll('.mobile-nav-item');
    tabs.forEach(t => t.classList.remove('active'));

    const tabHome = document.getElementById('nav-tab-home');
    const tabSyllabus = document.getElementById('nav-tab-syllabus');
    const tabLabs = document.getElementById('nav-tab-labs');

    if (hash.includes('syllabus')) {
      if (tabSyllabus) tabSyllabus.classList.add('active');
    } else if (hash.includes('labs') || hash.includes('ai-tools') || hash.includes('analytics')) {
      if (tabLabs) tabLabs.classList.add('active');
    } else {
      if (tabHome) tabHome.classList.add('active');
    }
  }

  // 6. Sticky Lesson Navigation Bar
  function handleLessonStickyBar() {
    const hash = window.location.hash || '';
    const isLesson = hash.startsWith('#g-lesson-') || 
                     hash.startsWith('#ai-module-') || 
                     hash.startsWith('#m-lesson-') ||
                     hash.startsWith('#lesson-');

    let stickyBar = document.getElementById('mobile-lesson-bar');
    const bottomNav = document.getElementById('mobile-bottom-bar');

    if (isLesson) {
      if (bottomNav) bottomNav.style.display = 'none';

      if (!stickyBar) {
        stickyBar = document.createElement('div');
        stickyBar.id = 'mobile-lesson-bar';
        stickyBar.className = 'mobile-lesson-sticky-bar';
        document.body.appendChild(stickyBar);
      }

      const lessonNum = parseInt(hash.replace(/[^0-9]/g, ''), 10) || 1;
      const prevNum = Math.max(1, lessonNum - 1);
      const nextNum = lessonNum + 1;

      const prefix = hash.startsWith('#g-lesson-') ? '#g-lesson-' :
                     hash.startsWith('#ai-module-') ? '#ai-module-' :
                     hash.startsWith('#m-lesson-') ? '#m-lesson-' : '#lesson-';

      stickyBar.innerHTML = `
        <button class="mobile-lesson-btn" onclick="window.location.hash='${prefix}${prevNum}'" ${lessonNum <= 1 ? 'disabled style="opacity:0.4;"' : ''}>
          <span>←</span> পূর্ববর্তী
        </button>
        <button class="mobile-lesson-btn complete-toggle" id="btn-sticky-toggle-read">
          <span>✅</span> শেষ হয়েছে
        </button>
        <button class="mobile-lesson-btn primary" onclick="window.location.hash='${prefix}${nextNum}'">
          পরবর্তী <span>→</span>
        </button>
      `;

      stickyBar.style.display = 'flex';

      const completeBtn = stickyBar.querySelector('#btn-sticky-toggle-read');
      completeBtn.addEventListener('click', () => {
        const checkbox = document.querySelector('input[type="checkbox"][id*="read"], input[type="checkbox"][id*="lesson"]');
        if (checkbox) {
          checkbox.click();
          completeBtn.classList.toggle('is-completed', checkbox.checked);
        } else {
          completeBtn.classList.toggle('is-completed');
        }
      });
    } else {
      if (stickyBar) stickyBar.style.display = 'none';
      if (bottomNav) bottomNav.style.display = 'flex';
    }
  }

  // 7. Student Progress & Profile Modal
  function showProgressModal() {
    let modal = document.getElementById('mobile-progress-dashboard-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'mobile-progress-dashboard-modal';
      modal.style.cssText = `
        position: fixed; inset: 0; background: rgba(11,31,51,0.75);
        display: none; align-items: flex-end; justify-content: center;
        z-index: 100002;
      `;
      modal.innerHTML = `
        <div style="
          background: #ffffff; width: 100%; max-width: 500px;
          border-radius: 20px 20px 0 0; padding: 24px 20px calc(24px + var(--safe-bottom));
          font-family: var(--font-ui); color: #102a43; box-shadow: 0 -10px 30px rgba(0,0,0,0.25);
          animation: slideUpModal 0.25s ease-out;
        ">
          <div style="width: 40px; height: 4px; background: #d9dee8; border-radius: 4px; margin: 0 auto 16px;"></div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 18px;">
            <h3 style="margin:0; font-size: 19px; color: var(--color-ink);">📊 আমার সার্বিক অগ্রগতি</h3>
            <button id="close-progress-modal" style="background:none; border:none; font-size: 20px; cursor:pointer; color:#627d98;">✕</button>
          </div>
          <div id="progress-stats-body"></div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#close-progress-modal').addEventListener('click', () => {
        modal.style.display = 'none';
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
    }

    const statsContainer = modal.querySelector('#progress-stats-body');
    const streak = updateAndGetStreak();

    let gCount = 0;
    try {
      const g = JSON.parse(localStorage.getItem('ads-bangla-course-v1') || '{}');
      if (g.completed) gCount = Object.keys(g.completed).filter(k => g.completed[k]).length;
    } catch(e) {}

    let mCount = 0;
    try {
      const m = JSON.parse(localStorage.getItem('meta-bangla-course-v1') || '{}');
      if (m.completed) mCount = Object.keys(m.completed).filter(k => m.completed[k]).length;
    } catch(e) {}

    let qCount = 0;
    try {
      const q = JSON.parse(localStorage.getItem('photopixc.quranic-arabic.progress.v1') || '{}');
      if (q.learnedWords) qCount = q.learnedWords.length;
    } catch(e) {}

    statsContainer.innerHTML = `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
        <div style="background:#f6f9f8; border:1px solid #d9dee8; border-radius:12px; padding:14px; text-align:center;">
          <span style="font-size:24px;">🔥</span>
          <div style="font-size:22px; font-weight:800; color:#b45309; margin:4px 0;">${streak} দিন</div>
          <span style="font-size:12px; color:#627d98;">ধারাবাহিক স্ট্রিক</span>
        </div>
        <div style="background:#f6f9f8; border:1px solid #d9dee8; border-radius:12px; padding:14px; text-align:center;">
          <span style="font-size:24px;">🎯</span>
          <div style="font-size:22px; font-weight:800; color:#0e7c6b; margin:4px 0;">${gCount + mCount}টি</div>
          <span style="font-size:12px; color:#627d98;">মোট সম্পন্ন লেসন</span>
        </div>
      </div>
      <div style="background:#ffffff; border:1px solid #d9dee8; border-radius:12px; padding:16px; margin-bottom:16px; font-size:13.5px; line-height:1.7;">
        <div><b>Google Ads পাঠশালা:</b> ${gCount} / ১০২ লেসন</div>
        <div><b>Meta Ads পাঠশালা:</b> ${mCount} / ৯৬ লেসন</div>
        <div><b>কুরআনিক আরবি পাঠশালা:</b> ${qCount} / ২৬৮ শব্দ</div>
      </div>
      <button onclick="if(window.openTransferModal) window.openTransferModal(); else alert('ব্রাউজার প্রগ্রেস ট্রান্সফার রেডি');" style="
        width: 100%; padding: 12px; background: #0e7c6b; color: #ffffff;
        border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer;
      ">📱 প্রগ্রেস ব্যাকআপ বা রিস্টোর করুন</button>
    `;

    modal.style.display = 'flex';
  }

  // 8. Lifecycle Hooks
  window.addEventListener('hashchange', () => {
    updateActiveNavTab();
    handleLessonStickyBar();
  });

  onReady(() => {
    injectMobileHeader();
    injectContinueCard();
    injectBottomNav();
    handleLessonStickyBar();
  });

})();
