const staticCacheName = 'restrev-v5';
/* on install of the service worker, add items to cache */
self.addEventListener('install', function(event) {
	if (self.skipWaiting) { self.skipWaiting(); }
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {

			return cache.addAll([
				'/index.html',
				'/restaurant.html',
				'/css/styles.css',
				'/css/responsive.css',
			//	'/js/all.js',
				'/img/404.jpg',
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
		})
	);
});



/*
TO DO: NOT WORKING!!!! still got 404 error!
Other possibility is to fix this using the dbhelper  imageUrlForRestaurant(restaurant)  and return a 404 image...
 On fetching stuff, add to cache. If responsestatus is 404 (file not found), replace with placeholder image. */

self.addEventListener('fetch', function(event) {

	event.respondWith(
		caches.open(staticCacheName).then(function(cache) {
			return cache.match(event.request).then(function (response) {
				return response || fetch(event.request).then(function(response) {
					if(response.status === 404) {
						return fetch('/img/404.jpg'); // <-- REPLACE THIS WITH 404-IMG
					}
					cache.put(event.request, response.clone());

					return response;
				});
			});
		})
	);
});
