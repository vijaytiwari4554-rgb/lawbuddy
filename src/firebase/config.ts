import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// These values are sourced from the provisioned Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF2gccXY3WZJiyTWx7HuLJ1s02ygIcxWE",
  authDomain: "gen-lang-client-0020603661.firebaseapp.com",
  projectId: "gen-lang-client-0020603661",
  storageBucket: "gen-lang-client-0020603661.firebasestorage.app",
  messagingSenderId: "284082877800",
  appId: "1:284082877800:web:1b34945a018ba724a552dd"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore
export const db = getFirestore(app);

export default app;
