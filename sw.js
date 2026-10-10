const CACHE_NAME = 'deputy-pwa-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/home.css'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // تجاهل أي طلبات للروابط الخارجية (مثل Supabase أو CDN) لمنع أخطاء CORS
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // للطلبات الهامة (HTML, JS) نحاول الشبكة أولاً لتجنب مشكلة الـ Cache
  if (event.request.destination === 'document' || event.request.destination === 'script') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
