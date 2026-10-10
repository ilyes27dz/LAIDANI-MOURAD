const CACHE_NAME = 'deputy-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/home.css',
  '/js/main.js',
  '/js/data.js',
  '/js/supabase-client.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found, else fetch from network
        return response || fetch(event.request);
      })
  );
});
