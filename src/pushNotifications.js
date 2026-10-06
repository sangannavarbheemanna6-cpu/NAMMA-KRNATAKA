import { PushNotifications } from "@capacitor/push-notifications";

export async function initPushNotifications() {
  try {
    let permission = await PushNotifications.checkPermissions();

    if (permission.receive !== "granted") {
      permission = await PushNotifications.requestPermissions();
    }

    if (permission.receive !== "granted") {
      console.log("Push notification permission denied");
      return null;
    }

    await PushNotifications.register();

    await PushNotifications.addListener("registration", (token) => {
      console.log("FCM Device Token:", token.value);
      localStorage.setItem("nk_fcm_token", token.value);
    });

    await PushNotifications.addListener("registrationError", (error) => {
      console.error("FCM registration error:", error);
    });

    await PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        console.log("Push notification received:", notification);
      }
    );

    await PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (action) => {
        console.log("Push notification opened:", action);
      }
    );

    return true;
  } catch (error) {
    console.error("Push notification setup failed:", error);
    return null;
  }
}
