import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { getApp, getApps, initializeApp } from 'firebase/app';
// @ts-ignore: getReactNativePersistence exists in the RN bundle 
import { browserLocalPersistence, getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  memoryLocalCache,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseExtra = Constants.expoConfig?.extra?.firebase ?? {};

const firebaseConfig = {
  apiKey:
    firebaseExtra.apiKey ?? process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain:
    firebaseExtra.authDomain ?? process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId:
    firebaseExtra.projectId ?? process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket:
    firebaseExtra.storageBucket ?? process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId:
    firebaseExtra.messagingSenderId ?? process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: firebaseExtra.appId ?? process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '',
  measurementId:
    firebaseExtra.measurementId ?? process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID ?? '',
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
  throw new Error('Missing Firebase configuration. Set the EXPO_PUBLIC_FIREBASE_* environment variables.');
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();


let firebaseAuth;

try {
  firebaseAuth = initializeAuth(app, {
    persistence:
      Platform.OS === 'web'
        ? browserLocalPersistence
        : getReactNativePersistence(AsyncStorage),
  });
} catch {
  firebaseAuth = getAuth(app);
}
export const auth = firebaseAuth;

const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
const hasIndexedDB = (() => {
  try {
    return (
      Platform.OS === 'web' &&
      typeof window !== 'undefined' &&
      typeof indexedDB !== 'undefined' &&
      indexedDB !== null
    );
  } catch {
    return false;
  }
})();

let firestoreDb;

const getLocalCache = () => {
  if (isExpoGo) return memoryLocalCache();
  
  if (Platform.OS === 'web') {
    return hasIndexedDB
      ? persistentLocalCache({ tabManager: persistentMultipleTabManager() })
      : memoryLocalCache();
  }

  // Native - try persistent, fall back to memory silently
  try {
    return persistentLocalCache();
  } catch {
    return memoryLocalCache();
  }
};

try {
  firestoreDb = initializeFirestore(app, {
    localCache: getLocalCache(),
    experimentalForceLongPolling: true,
  });
} catch {
  firestoreDb = getFirestore(app);
}

export const db = firestoreDb;