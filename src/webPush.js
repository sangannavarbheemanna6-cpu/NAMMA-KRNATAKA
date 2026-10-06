import { getMessaging, getToken, onMessage } from "firebase/messaging";
import app from "./firebase";

const VAPID_KEY = "BMdlZGwMnGXnD_YGcaykCwW4wKXSyZskw_PQPNkMvyGdVRSJF2UIiHYwUyPvCdKZng1MQNXE_vElhNNFhHF8DTg";

export async function initWebPush() {
  try {
    if (!("Notification" in window)) {
      console.log("Notifications are not supported.");
      return null;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied.");
      return null;
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const messaging = getMessaging(app);

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log("Web FCM Token:", token);
      localStorage.setItem("nk_web_fcm_token", token);
      return token;
    }

    console.log("No FCM token received.");
    return null;
  } catch (error) {
    console.error("Web Push setup failed:", error);
    return null;
  }
}

export function listenForWebPush() {
  try {
    const messaging = getMessaging(app);

    return onMessage(messaging, (payload) => {
      console.log("Foreground web push:", payload);
    });
  } catch (error) {
    console.error("Web Push listener failed:", error);
    return null;
  }
}
