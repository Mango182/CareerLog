const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withGooglePodsModularHeaders = (config) =>
  withDangerousMod(config, [
    'ios',
    (cfg) => {
      const podfilePath = path.join(cfg.modRequest.platformProjectRoot, 'Podfile');
      let podfile = fs.readFileSync(podfilePath, 'utf-8');
      const injection =
        "  pod 'GoogleUtilities', :modular_headers => true\n" +
        "  pod 'RecaptchaInterop', :modular_headers => true";
      if (!podfile.includes("pod 'GoogleUtilities', :modular_headers => true")) {
        podfile = podfile.replace('use_expo_modules!', `use_expo_modules!\n${injection}`);
        fs.writeFileSync(podfilePath, podfile);
      }
      return cfg;
    },
  ]);

module.exports = ({ config }) => {
  const isDev = process.env.APP_ENV === "development";

  let appConfig = {
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
      ["expo-build-properties", {
        ios: {
          useModularHeaders: true,
        },
      }],
      "expo-font",
      "expo-web-browser",
      ["expo-splash-screen", {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      }],
      "expo-status-bar",
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

  appConfig = withGooglePodsModularHeaders(appConfig);

  return appConfig;
};
