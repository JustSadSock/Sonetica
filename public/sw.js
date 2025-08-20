const CACHE = 'sonetica-v3';
// Placeholder replaced at build time with the list of core assets
self.__CORE_ASSETS__ = self.__CORE_ASSETS__ || [];
const CORE = self.__CORE_ASSETS__.length ? self.__CORE_ASSETS__ : ['./', './index.html'];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const urls = CORE.filter(Boolean);
    const results = await Promise.allSettled(
      urls.map(u => fetch(u, { cache: 'no-cache' }))
    );
    const okUrls = results.map((r, i) => r.status === 'fulfilled' ? urls[i] : null).filter(Boolean);
    try {
      await cache.addAll(okUrls);
    } catch (err) {
      console.warn('SW cache.addAll failed', err);
    }
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
    const clients = await self.clients.matchAll({ type: 'window' });
    for (const client of clients) client.postMessage({ type: 'sw-updated' });
  })());
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match('./index.html');
      try {
        const fresh = await fetch(request);
        cache.put('./index.html', fresh.clone());
        return fresh;
      } catch {
        return cached || Response.error();
      }
    })());
    return;
  }

  if (url.origin === location.origin) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(request);
      const fetchPromise = fetch(request).then(res => {
        cache.put(request, res.clone());
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })());
  }
});
