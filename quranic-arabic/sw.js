/* Service Worker for PhotoPixc Quranic Arabic Learning Platform
   Provides 100% offline access to all lessons, quizzes, word breakdown, and audio fallbacks. */
const CACHE_NAME = 'photopixc-quranic-v7';
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './learning-v4.css',
  './app.js',
  './learning-v4.js',
  './data/alphabet.js',
  './data/words.js',
  './data/salah.js',
  './assets/favicon.svg',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // For external Quran audio files, cache them as they are played for offline replay
  if (url.hostname.includes('qurancdn.com') || url.hostname.includes('everyayah.com')) {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(networkRes => {
          if (networkRes && networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
          }
          return networkRes;
        }).catch(() => cached);
      })
    );
    return;
  }

  // Stale-while-revalidate for local static assets
  event.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(networkRes => {
        if (networkRes && networkRes.status === 200 && req.method === 'GET') {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
        }
        return networkRes;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
