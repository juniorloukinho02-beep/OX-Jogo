const CACHE_NAME = 'ox-game-v1';
const assetsToCache = [
  './index.html',
  './manifest.json'
];

// Instala o Service Worker e salva os arquivos no cache do celular/PC
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(assetsToCache);
      })
  );
});

// Intercepta as requisições para carregar do cache quando estiver sem internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
