'use strict';
const CACHE='google-ads-portal-v8-audit';
const ASSETS=["../shared/navigation.css","cheat-sheets.js","cheat-sheets.css","advanced-tools.js", "analytics-demo.css", "analytics-demo.js", "app-icon.svg", "app.js", "course.js", "curriculum.js", "index.html", "learning-engine.js", "learning-studio.js", "lesson-language.js", "learning.css", "manifest.webmanifest", "question-bank.js", "revision.js", "style.css"];
const ROOT=new URL('./',self.location.href);
const KEYS=new Set(ASSETS.map(p=>new URL(p,ROOT).href));
self.addEventListener('install',event=>event.waitUntil((async()=>{
 if(self.location.hostname.endsWith('chatgpt.site'))throw new Error('Private host offline caching disabled');
 const cache=await caches.open(CACHE);
 try{for(const path of ASSETS){const req=new Request(new URL(path,ROOT),{cache:'reload'});const response=await fetch(req);if(!response.ok||response.redirected)throw new Error('Asset unavailable');await cache.put(req,response);}}
 catch(e){await caches.delete(CACHE);throw e;}
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const name of await caches.keys())if(name.startsWith('google-ads-')&&name!==CACHE)await caches.delete(name);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);if(url.origin!==ROOT.origin)return;
 if(event.request.mode==='navigate'&&(url.pathname===ROOT.pathname||url.pathname===new URL('index.html',ROOT).pathname)){
 event.respondWith((async()=>await caches.match(new URL('index.html',ROOT).href)||fetch(event.request))());return;}
 if(KEYS.has(url.href))event.respondWith((async()=>await caches.match(event.request)||fetch(event.request))());
});
