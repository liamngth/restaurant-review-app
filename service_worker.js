let cacheName = 'restaurant-review';

self.addEventListener('install', function (event) {
  console.log('Service worker is installed');

  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll([
        './',
        './index.html',
        './restaurant.html',
        './css/styles.css',
        './js/dbhelper.js',
        './js/main.js',
        './js/restaurant_info.js',
        './data/restaurants.json',
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
        './img/9.jpg',
        './img/10.jpg'
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (name) {
          return name.startsWith('restaurant-') && name !== cacheName;
        }).map(function (name) {
          return caches.delete(name);
        })
      ).then(function () {
        console.log('Service worker is activated');
      });
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(function (err) {
      console.log('Error: ' + err);
    })
  );
});