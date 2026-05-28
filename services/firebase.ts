import Constants from 'expo-constants';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, initializeAuth, inMemoryPersistence, } from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  memoryLocalCache,
  persistentLocalCache,
  persistentMultipleTabManager
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
        : inMemoryPersistence,
  });
} catch {
  firebaseAuth = getAuth(app);
}
export const auth = firebaseAuth;

const isExpoGo = Constants.appOwnership === 'expo';
const isBrowser = Platform.OS === 'web' && typeof window !== 'undefined';
const hasIndexedDB = isBrowser && typeof indexedDB !== 'undefined';

let firestoreDb;

try {
  firestoreDb = initializeFirestore(app, {
    localCache: hasIndexedDB
      ? persistentLocalCache({ tabManager: persistentMultipleTabManager() })
      : isExpoGo || Platform.OS === 'web'
      ? memoryLocalCache()
      : persistentLocalCache(),

    experimentalForceLongPolling: true,
  });
} catch {
  firestoreDb = getFirestore(app);
}
export const db = firestoreDb;