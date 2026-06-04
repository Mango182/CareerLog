export default ({ config }) => {
  const isDev = process.env.APP_ENV === "development";
  return {
    ...config,
    name: isDev ? "CareerLog Dev" : "CareerLog",
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