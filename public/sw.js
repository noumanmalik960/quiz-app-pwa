const CACHE_NAME = "cache-v1"
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/js/0.chunk.js',
  '/static/js/main.chunk.js',
  '/manifest.json',
  '/static/media/bg.759ecf3a.jpg',
  '/images/logo.png'
]


self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  if (!navigator.onLine) {

    event.respondWith(
      caches.match(event.request)
        .then(function (response) {
          if (response)
            return response;
          return fetch(event.request);
        })
    )
  }


})