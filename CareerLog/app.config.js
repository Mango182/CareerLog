export default ({ config }) => {
  const isDev = process.env.APP_ENV === "development";
  return {
    ...config,
    name: isDev ? "CareerLog Dev" : "CareerLog",
    extra: {
      ...config.extra,
      appEnv: process.env.APP_ENV ?? "production",
      firebase: {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
      },
    },
    plugins: [
      ...(config.plugins ?? []),
      "expo-font",
      "expo-web-browser",
    ],
    ios: {
      ...config.ios,
      bundleIdentifier: isDev
        ? "com.mango1823192.CareerLog.dev"
        : "com.mango1823192.CareerLog",
    },
    android: {
      ...config.android,
      package: isDev
        ? "com.mango1823192.CareerLog.dev"
        : "com.mango1823192.CareerLog",
    },
  };
};