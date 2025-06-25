import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let auth: Auth | null = null;

// It's crucial to check if the essential configs are provided.
// Firebase's initializeApp throws an error if the config is invalid,
// which can crash the server during SSR.
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
} else {
  // This warning will show in the server logs if config is missing.
  console.warn("Firebase configuration is missing or incomplete. Authentication features will be disabled. Please check your .env file.");
}

// Export the auth instance. It will be null if Firebase is not configured.
export { auth };
