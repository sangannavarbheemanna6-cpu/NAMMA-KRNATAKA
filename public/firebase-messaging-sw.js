importScripts("https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDHHocINSUnCYWHRyG06aamgtK1PjUZhi-I",
  authDomain: "namma-karnataka-44254.firebaseapp.com",
  projectId: "namma-karnataka-44254",
  storageBucket: "namma-karnataka-44254.firebasestorage.app",
  messagingSenderId: "241924684155",
  appId: "1:241924684155:web:78c3e65ed35c4597e125de"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background push received:", payload);

  const title =
    payload.notification?.title || "NAMMA KARNATAKA";

  const options = {
    body:
      payload.notification?.body ||
      "ಹೊಸ ಮಾಹಿತಿ ಲಭ್ಯವಿದೆ",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    data: payload.data || {}
  };

  self.registration.showNotification(title, options);
});
