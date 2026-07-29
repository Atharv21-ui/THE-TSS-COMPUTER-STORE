import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

let initialized = false;

function initFirebaseAdmin() {
  if (initialized || getApps().length > 0) {
    initialized = true;
    return;
  }

  try {
    let serviceAccount: any = null;

    const envBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
    const envRaw = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (envBase64) {
      try {
        const cleanBase64 = envBase64.trim().replace(/\s+/g, '');
        const jsonStr = Buffer.from(cleanBase64, 'base64').toString('utf8');
        serviceAccount = JSON.parse(jsonStr);
      } catch (e) {
        console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_BASE64:', e);
      }
    }

    if (!serviceAccount && envRaw) {
      try {
        serviceAccount = JSON.parse(envRaw);
      } catch (e) {
        console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT:', e);
      }
    }

    if (serviceAccount && serviceAccount.project_id && serviceAccount.private_key) {
      // Fix private key escaped newlines if unescaped during JSON/Base64 parsing
      if (typeof serviceAccount.private_key === 'string') {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }
      
      try {
        initializeApp({
          credential: cert(serviceAccount)
        });
        console.log('Firebase Admin initialized successfully with service account for project:', serviceAccount.project_id);
      } catch (certError) {
        console.error('Failed to initialize Firebase Admin with provided credential. Corrupted key? Falling back to default project ID.', certError);
        initializeApp({
          projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'tss-1-2b0db'
        });
      }
    } else {
      initializeApp({
        projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'tss-1-2b0db'
      });
      console.log('Firebase Admin initialized with fallback project ID: tss-1-2b0db');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    // Ensure we ALWAYS initialize an app so getFirestore() doesn't crash the server at startup
    if (getApps().length === 0) {
      initializeApp({ projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'tss-1-2b0db' });
    }
  } finally {
    initialized = true;
  }
}

// Initialize immediately
initFirebaseAdmin();

// Proxy Firestore instance so top-level collection imports never crash startup
export const db: Firestore = new Proxy({} as Firestore, {
  get(_target, prop) {
    initFirebaseAdmin();
    const instance = getFirestore();
    const value = (instance as any)[prop];
    return typeof value === 'function' ? value.bind(instance) : value;
  }
});
