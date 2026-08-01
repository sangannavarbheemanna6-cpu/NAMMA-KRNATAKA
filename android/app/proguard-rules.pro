# ──────────────────────────────────────────────
# ProGuard / R8 Rules for NAMMA KARNATAKA
# Capacitor + React + WebView (Android)
# ──────────────────────────────────────────────

# ── Capacitor ────────────────────────────────
-keep class com.getcapacitor.** { *; }
-keep class com.getcapacitor.annotation.** { *; }
-dontwarn com.getcapacitor.**

# ── AndroidX WebKit (Capacitor dependency) ───
-keep class androidx.webkit.** { *; }
-dontwarn androidx.webkit.**

# ── Cordova plugins (if used) ────────────────
-keep class org.apache.cordova.** { *; }
-dontwarn org.apache.cordova.**

# ── JavaScript Interface ─────────────────────
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# ── WebView & JavaScript ────────────────────
-keepclassmembers class * extends android.webkit.WebView {
    public <methods>;
}

# ── Keep app entry points ───────────────────
-keep class com.nammakarnataka.app.** { *; }

# ── General Android ─────────────────────────
-keepattributes *Annotation*
-keepattributes SourceFile,LineNumberTable
-keep public class * extends android.app.Activity
-keep public class * extends android.app.Application
-keep public class * extends android.app.Service
-keep public class * extends android.content.BroadcastReceiver
-keep public class * extends android.content.ContentProvider

# ── Remove debug logging in release ─────────
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
}
