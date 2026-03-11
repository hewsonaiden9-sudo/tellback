importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAgndibpL0kRx4OVABNocI5Bv1qff1qYcI",
  authDomain: "tellback-68a28.firebaseapp.com",
  projectId: "tellback-68a28",
  storageBucket: "tellback-68a28.firebasestorage.app",
  messagingSenderId: "847309476601",
  appId: "1:847309476601:web:e2ce35491762b7012b4828"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(payload.notification?.title || 'TellBack', {
    body: payload.notification?.body || 'New message',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: payload.data?.fromUid || 'tellback',
    vibrate: [200, 100, 200]
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = self.location.href.replace('firebase-messaging-sw.js', '');
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.startsWith(url));
      if (existing) return existing.focus();
      return clients.openWindow(url);
    })
  );
});
