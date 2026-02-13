// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// 🔴 CONFIG FIREBASE - ISI DENGAN PUNYA ANDA!
const firebaseConfig = {
  apiKey: "AIzaSyDYPRRKTZILyLtVj-4PmULs-841OELU-lQ", // GANTI DENGAN PUNYA ANDA
  authDomain: "fecare-app.firebaseapp.com",
  projectId: "fecare-app",
  storageBucket: "fecare-app.firebasestorage.app",
  messagingSenderId: "739844438669",
  appId: "1:739844438669:web:34b7d8b879b57384f580c4"
};

// 🔴 INITIALIZE FIREBASE
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 🔴 EVENT: INSTALL - PASTIKAN LANGSUNG AKTIF!
self.addEventListener('install', (event) => {
  console.log('[SW] ✅ Installing...');
  self.skipWaiting(); // FORCE AKTIF!
  event.waitUntil(Promise.resolve());
});

// 🔴 EVENT: ACTIVATE - CLAIM CONTROL!
self.addEventListener('activate', (event) => {
  console.log('[SW] ✅ Activating...');
  event.waitUntil(
    Promise.all([
      clients.claim(), // AMBIL KENDALI!
      self.registration.showNotification('🔔 Service Worker Aktif', {
        body: 'SW siap menerima notifikasi',
        icon: '/icons/icon-192x192.png',
        tag: 'sw-active',
        silent: false
      })
    ])
  );
});

// 🔴 EVENT: FETCH - BIAR GA DIHAPUS CHROME!
self.addEventListener('fetch', (event) => {
  // Minimal fetch handler biar SW tetap hidup
  event.respondWith(fetch(event.request));
});

// 🔴 EVENT: BACKGROUND MESSAGE
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] 📨 BACKGROUND MESSAGE:', payload);

  const title = payload.data?.title || '💊 FeCare Reminder';
  const body = payload.data?.body || 'Waktunya minum tablet zat besi!';

  self.registration.showNotification(title, {
    body: body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    requireInteraction: true
  });
});

// 🔴 EVENT: NOTIFICATION CLICK
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] 👆 Notification clicked:', event);
  event.notification.close();
  
  if (event.action === 'close') return;
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            return client.focus();
          }
        }
        return clients.openWindow('/');
      })
  );
});

// 🔴 EVENT: PUSH - HANDLE PUSH TANPA PAYLOAD
self.addEventListener('push', (event) => {
  console.log('[SW] 📦 Push received:', event);

  if (!event.data) return;

  const data = event.data.json();

  const title = data.title || '💊 FeCare Reminder';
  const body = data.body || 'Waktunya minum tablet zat besi!';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [200, 100, 200],
      requireInteraction: true
    })
  );
});


console.log('[SW] 🚀 Service Worker Script Loaded!');