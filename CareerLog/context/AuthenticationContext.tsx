import { auth } from '@/services/firebase';
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';


type AuthenticationContextValue = {
  user: User | null;
  isLoading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

const AuthenticationContext = createContext<AuthenticationContextValue | undefined>(
  undefined
);

export function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Listen for authentication changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      console.log('Authentication state changed:', firebaseUser?.email ?? 'No user');
      setIsLoading(false);
    });

    // Clean up the listener on unmount
    return unsubscribe;
  }, []);

  async function signInWithGoogle() {
    if (Platform.OS !== 'web') {
      throw new Error('Google sign-in is currently only set up for web.');
    }

    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);
  }

  // Sign up with email and password
  async function signup(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  // Log in with email and password
  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  // Log out the current user
  async function logout() {
    await signOut(auth);
  }

  // Provide the authentication state and functions to the rest of the app
  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        signup,
        login,
        logout,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }

  return context;
}