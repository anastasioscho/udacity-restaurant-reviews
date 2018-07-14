const cacheName = 'urr-static-v1';

self.addEventListener('fetch', function(event) {
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