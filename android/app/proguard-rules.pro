# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.

# Capacitor Bridge & Native Plugin Classes
-keep class com.getcapacitor.** { *; }
-keep interface com.getcapacitor.** { *; }
-keep class org.apache.cordova.** { *; }
-keep interface org.apache.cordova.** { *; }

# Keep JavaScript Interfaces for WebView Native Communication
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Preserve Capacitor Plugin Annotations
-keep @interface com.getcapacitor.annotation.CapacitorPlugin { *; }
-keep @interface com.getcapacitor.annotation.ActivityCallback { *; }
-keep @interface com.getcapacitor.annotation.Permission { *; }
-keep @interface com.getcapacitor.annotation.PermissionCallback { *; }
-keep @com.getcapacitor.annotation.CapacitorPlugin class * { *; }

# Strip DebugProbesKt.bin warnings
-dontwarn kotlin.coroutines.jvm.internal.DebugProbesKt
