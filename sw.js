// Retire the old root-scoped Google school cache. Never touch localStorage.
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const key of await caches.keys())if(key.startsWith('ads-bangla-'))await caches.delete(key);
 await self.clients.claim();await self.registration.unregister();
 for(const client of await self.clients.matchAll({type:'window'})){
  const u=new URL(client.url);if(u.origin===self.location.origin&&(u.pathname==='/'||u.pathname==='/index.html'))await client.navigate(client.url);
 }
})()));
