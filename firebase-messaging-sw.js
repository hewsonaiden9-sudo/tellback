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

// Handle background notifications (app is closed or in background)
messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'TellBack', {
    body: body || 'You have a new message',
    icon: icon || '/icon-192.png',
    badge: '/icon-192.png',
    tag: payload.data?.conversationId || 'tellback-msg',
    data: payload.data || {},
    vibrate: [200, 100, 200],
    actions: [{ action: 'open', title: 'Open' }]
  });
});

// Notification click — open or focus the app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = self.location.origin + self.location.pathname.replace('firebase-messaging-sw.js','');
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.startsWith(url));
      if (existing) return existing.focus();
      return clients.openWindow(url);
    })
  );
});
