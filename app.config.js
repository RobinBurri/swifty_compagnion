import 'dotenv/config';

export default {
  expo: {
    name: "swifty_companion",
    slug: "swifty_companion",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/42_logo.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/42_logo.png",
      resizeMode: "cover",
      backgroundColor: "#226f54"
    },
    ios: {
      buildNumber: "1.0.0",
      supportsTablet: true,
      bundleIdentifier: "com.42.swiftyCompanion"
    },
    android: {
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      UID: process.env.UID,
      SECRET: process.env.SECRET,
      eas: {
        projectId: "5634d872-aa8a-4495-8cea-c8228203431f"
      }
    }
  }
};
