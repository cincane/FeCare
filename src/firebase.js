// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, deleteToken } from "firebase/messaging";
// import { onMessage } from "firebase/messaging";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ===========================================
// 🧹 HAPUS SEMUA SERVICE WORKER LAMA
// ===========================================
export const unregisterAllServiceWorkers = async () => {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
      console.log('✅ Service worker unregistered:', registration);
    }
    return true;
  }
  return false;
};

// ===========================================
// 📝 REGISTER SERVICE WORKER BARU - TUNGGU AKTIF!
// ===========================================
export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worker not supported');
  }

  try {
    // 1. HAPUS DULU SEMUA YANG LAMA
    await unregisterAllServiceWorkers();
    
    // 2. REGISTER YANG BARU
    console.log('📝 Registering new service worker...');
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('✅ Service worker registered:', registration);
    
    // 3. TUNGGU SAMPAI AKTIF! 🔴 INI PENTING!
    await navigator.serviceWorker.ready;
    console.log('✅ Service worker is ACTIVE and READY');
    
    // 4. TUNGGU BENTAR BUAT JAGA-JAGA
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return registration;
  } catch (error) {
    console.error('❌ Service worker registration failed:', error);
    throw error;
  }
};

// ===========================================
// 🔑 REQUEST PERMISSION DAN GET TOKEN BARU
// ===========================================
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    throw new Error('Browser tidak mendukung notifikasi');
  }

  if (!('serviceWorker' in navigator)) {
    throw new Error('Browser tidak mendukung service worker');
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Izin notifikasi ditolak');
  }

  console.log("✅ Permission granted");

  // REGISTER SERVICE WORKER DENGAN BENAR
  const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

  // TUNGGU BENAR-BENAR AKTIF
  await navigator.serviceWorker.ready;

  console.log("✅ Service worker ready & active");

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration
  });

  if (!token) {
    throw new Error('Gagal mendapatkan token');
  }

  console.log("🔥 TOKEN BARU:", token);
  return token;
};


// ===========================================
// 🔔 FOREGROUND NOTIFICATION LISTENER
// ===========================================
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('📨 Foreground message received:', payload);
      resolve(payload);
    });
  });

// ===========================================
// 🎯 SHOW FOREGROUND NOTIFICATION
// ===========================================
export const showForegroundNotification = (payload) => {
  if (!payload?.notification) return;
  if (Notification.permission !== 'granted') return;
  
  const title = payload.data?.title;
  const body = payload.data?.body;

  
  try {
    new Notification(title || '💊 FeCare Reminder', {
      body: body || 'Waktunya minum tablet zat besi!',
      icon: icon || '/icons/icon-192x192.png',
      vibrate: [200, 100, 200],
      silent: false
    });
    console.log('✅ Foreground notification shown');
  } catch (error) {
    console.error('❌ Error showing notification:', error);
  }
};


// onMessage(messaging, (payload) => {
//   console.log("📨 Foreground message:", payload);

//   const title = payload.data?.title;
//   const body = payload.data?.body;

//   if (Notification.permission === "granted") {
//     new Notification(title, {
//       body: body,
//       icon: "/icons/icon-192x192.png"
//     });
//   }
// });


export { messaging };