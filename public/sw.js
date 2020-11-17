const CACHE_NAME = "version-1";
const urlsToCache = [
  '/',
  '/index.html',
  '/static/media/bg.759ecf3a.jpg',
  '/static/js/2.d7a32088.chunk.js',
  '/static/js/main.cace1e96.chunk.js',


  // for localhost
  '/images/logo.png',
  '/static/js/bundle.js',
  '/static/js/0.chunk.js',
  '/static/js/main.chunk.js',
  '/manifest.json',
]


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');

        return cache.addAll(urlsToCache);
      })
  )
});


self.addEventListener('fetch', function (event) {

  event.respondWith(

    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;

        }
        return fetch(event.request);

      }
      )
  );
});


// Activate the service worker
// only keeps the cache we need and delete rest of them
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    )).catch((error) => {
      console.log("error: ", error);
    })

  )
});