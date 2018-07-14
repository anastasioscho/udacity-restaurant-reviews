const cacheName = 'urr-static-v1';

const allowedURLOrigins = [
    location.origin,
    'https://api.tiles.mapbox.com',
    'https://unpkg.com'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                'css/styles.css',
                'css/layout.css',
                'js/dbhelper.js',
                'js/main.js',
                'js/restaurant_info.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    const requestURL = new URL(event.request.url);
    if (!allowedURLOrigins.includes(requestURL.origin)) return;

    event.respondWith(
        caches.open(cacheName).then(function(cache) {
            return cache.match(event.request).then(function(response) {
                return response || fetch(event.request).then(function(response) {
                    if (response.status !== 404) {
                        cache.put(event.request, response.clone());
                    }
                    return response;
                });
            });
        })
    );
});