const CACHE_NAME = "version-1";
const urlsToCache = [
  '/',
  '/index.html',
  // '/static/js/bundle.js',
  // '/static/js/0.chunk.js',
  // '/static/js/main.chunk.js',
  // '/manifest.json',
  '/static/media/bg.759ecf3a.jpg',
  // '/images/logo.png',
  '/static/js/2.d7a32088.chunk.js',
  '/static/js/main.cace1e96.chunk.js',
  // 'react_devtools_backend.js',
  // 'inject.js'
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

// self.addEventListener('fetch', function (event) {
//   if (!navigator.onLine) {

//     event.respondWith(
//       caches.match(event.request)
//         .then(function (response) {
//           if (response)
//             return response;
//           return fetch(event.request);
//         })
//     )
//   }


// })

// // Listen for requests
// // respond to request after we listen to them
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(() => {
//         return fetch(event.request)
//           .catch(() => caches.match('offline.html'))
//       })
//   )
// });

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