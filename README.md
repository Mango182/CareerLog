# CareerLog

A mobile app for tracking job applications. Log every role you apply to and professional information in one place. Built with React Native, Expo and Firebase.

## Features

- **Accounts:** sign up and log in with email and password or Google, with password reset.
- **Dashboard:** Breakdowns of job applications and recent activity
- **Application tracking:** add, edit and delete applications with company, position, location, status and notes
- **Status:** Saved, Applied, Interview, Offer, or Rejected / Ghosted
- **Profile:** save LinkedIn, GitHub and email links 
- **Resume:** upload a PDF resume to Firebase Storage and preview it in the app
- **Cloud sync:** data is stored in Firestore with real time updates

<!-- ## Screenshots -->

## Project Structure

```
CareerLog/
├── .github/workflows/   # GitHub Actions
└── CareerLog/           # Expo app
    ├── app/             # Screens (Expo Router, file-based routing)
    │   └── (tabs)/      # Dashboard, Applications, Profile, Login
    ├── components/      # Reusable UI
    ├── context/         # Auth and applications state (React Context)
    ├── services/        # Firebase setup
    ├── types/           # Shared TypeScript types
    ├── constants/       # Colors and theme
    ├── assets/          # Icons, splash screen, fonts
    └── app.config.js    # Expo config (dev & production)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- A [Firebase](https://firebase.google.com/) project with **Authentication** (Email/Password and Google), **Firestore** and **Storage** enabled
- **Android:** Android Studio with an emulator or a connected device
- **iOS:** a Mac with Xcode (latest version)

> This app uses native modules (Google Sign-In, PDF viewer), so it runs as a development build not in Expo Go.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mango182/CareerLog.git
   cd CareerLog/CareerLog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add Firebase config**

   Copy `.env.example` to `.env` and fill in the values from your Firebase project settings:
   ```bash
   cp .env.example .env
   ```
   Set `APP_ENV=development` to build the dev version so it can be installed alongside the production app.

4. **Run the app**
   ```bash
   npx expo run:android # For Android
   npx expo run:ios     # For ios
   ```
   This builds the native app and installs it on your emulator or device. `npm start` to start the dev server.

## Building for Release

Builds run on **GitHub Actions** ([`.github/workflows/build.yml`](.github/workflows/build.yml)):

- **Automatic:** every push to `master` builds production versions for Android and iOS.
- **Manual:** go to **Actions** then **Build CareerLog** then **Run workflow** and pick a branch and a platform (`both`, `android` or `ios`). `master` builds production, and any other branch builds development.

Before every build, the TypeScript check (`tsc --noEmit`) has to pass.

Download the finished builds from the Artifacts section at the bottom of the workflow run.

Firebase config comes from the `production` and `development` GitHub Environments, which each hold the seven `EXPO_PUBLIC_FIREBASE_*` secrets.

### Android

The workflow produces an `.apk` that you can install directly on an Android device.

### iOS

The workflow produces an unsigned `.ipa`. Install it with [AltStore](https://altstore.io/) or [SideStore](https://sidestore.io/), which sign it with your Apple ID.

## Key Dependencies

| Package | Purpose |
|---|---|
| [Expo](https://expo.dev/) SDK 57 / React Native 0.86 | App framework |
| [Expo Router](https://docs.expo.dev/router/introduction/) | File-based navigation |
| [Firebase](https://firebase.google.com/) | Auth, Firestore database, file storage |
| [Google Sign-In](https://github.com/react-native-google-signin/google-signin) | Sign in with Google |
| [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) | Forms and validation |
| [react-native-pdf](https://github.com/wonday/react-native-pdf) | Resume preview |
| [react-native-toast-message](https://github.com/calintamas/react-native-toast-message) | In-app notifications |

## Version

Current Version: 1.0.0

## License

This is a personal project. All rights reserved.
