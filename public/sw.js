const CACHE_NAME = "version-1";
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
  console.log('cached suxxesfully')

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