const CACHE = 'sonetica-v1';
const ASSETS = ['/', '/index.html', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(
      (resp) =>
        resp ||
        fetch(event.request).then((fetched) => {
          const copy = fetched.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          return fetched;
        })
    )
  );
});
