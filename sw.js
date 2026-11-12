/**
 * Service worker de SiloGest — red primero, caché como respaldo.
 * En cada versión nueva cambie CACHE_NAME para limpiar el caché de los dispositivos.
 */
const CACHE_NAME = 'silogest-2026-11-11-a';
const APP_SHELL = ['./', './index.html', './manifest.json', './three.min.js', './icon-192.png', './icon-512.png'];
self.addEventListener('install', (event) => { self.skipWaiting(); event.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(APP_SHELL))); });
self.addEventListener('activate', (event) => { event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request, { cache: 'no-store' }).then((r) => { const cl = r.clone(); caches.open(CACHE_NAME).then((c) => c.put(event.request, cl)); return r; }).catch(() => caches.match(event.request)));
});
