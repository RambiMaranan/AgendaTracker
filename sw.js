const CACHE = 'agenda-tracker-v1';
const FILES = [
  './', './index.html', './css/style.css', './manifest.webmanifest',
  './js/model.js', './js/controller.js', './js/register-sw.js',
  './js/views/View.js', './js/views/FormView.js', './js/views/AgendaListView.js',
  './js/views/StatsView.js', './js/views/FilterView.js',
  './icons/icon-192.png', './icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
