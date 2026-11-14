const C='kolekta-v28',A=['./','index.html','manifest.json','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.hostname.endsWith('google.com'))return;
e.respondWith(caches.match(e.request).then(m=>{const n=fetch(e.request).then(r=>{if(r.ok||r.type==='opaque'){const cl=r.clone();caches.open(C).then(c=>c.put(e.request,cl))}return r}).catch(()=>m);return m||n}))});
