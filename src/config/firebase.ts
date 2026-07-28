import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCsPW390jKenzTAWibcGNYzofZ6lYDc8NM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "tss-1-2b0db.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "tss-1-2b0db",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "tss-1-2b0db.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "794687231217",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:794687231217:web:ad6a3744671386d5830550"
};

let app;
try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
} catch (error) {
  console.warn("Firebase initialization error caught gracefully:", error);
}

export const auth = app ? getAuth(app) : ({} as ReturnType<typeof getAuth>);
export const db = app ? getFirestore(app) : ({} as ReturnType<typeof getFirestore>);
export const googleProvider = new GoogleAuthProvider();
