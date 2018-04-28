const staticCacheName = 'restrev-v7';
/* on install of the service worker, add items to cache */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/restaurant.html',
        '/data/restaurants.json',
        '/css/styles.css',
        '/css/responsive.css',
        '/js/main.js',
        'http://localhost:8000/js/main.js',
        '/js/dbhelper.js',
        '/js/restaurant_info.js',
        '/img/2-small.jpg',
        'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'
          ]);
    })
  );

});


/*Remove old caches on activating new service worker*/
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restrev-') && cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    }).catch(function(error){console.log(error)})
  );
});




self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(staticCacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
  });
