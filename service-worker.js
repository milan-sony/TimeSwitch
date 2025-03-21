const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
    './index.html',
    './convert.html',
    './style.css',
    './script.js',
    './assets/images/android-chrome-192x192.png',
    './assets/images/android-chrome-512x512.png'
];

// Install the service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch resources from the cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
