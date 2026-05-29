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

const firebaseConfig = {
  apiKey: "AIzaSyDUtp5DDUF1MGhlilUtlPK4HTLcmAoGJfM",
  authDomain: "careerlog-7ec0e.firebaseapp.com",
  projectId: "careerlog-7ec0e",
  storageBucket: "careerlog-7ec0e.firebasestorage.app",
  messagingSenderId: "268417061830",
  appId: "1:268417061830:web:82400f2b961e04915758c7",
  measurementId: "G-0L58S6RT5F"
};

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