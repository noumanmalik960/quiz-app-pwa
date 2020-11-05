const CACHE_NAME = 'my-site-cache-v1'
const urlToCache = [
  '/',
  'index.html',
  // '/static/js/bundle.js',
  // '/static/js/0.chunk.js',
  // 'static/js/main.chunk.js'
]

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log("Opened cache");
        return cache.addAll(urlToCache)
      })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // cache hit, return response
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})

self.addEventListener('activate', function (event) {
  const cacheAllowList = [CACHE_NAME]

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheAllowList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})