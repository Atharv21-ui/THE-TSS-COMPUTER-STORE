import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

if (getApps().length === 0) {
  try {
    let serviceAccount: any = null;

    if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
      const cleanBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64.trim().replace(/\s+/g, '');
      const jsonStr = Buffer.from(cleanBase64, 'base64').toString('utf8');
      serviceAccount = JSON.parse(jsonStr);
    } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    }

    if (serviceAccount) {
      initializeApp({
        credential: cert(serviceAccount)
      });
      console.log('Firebase Admin initialized successfully.');
    } else {
      initializeApp();
      console.log('Firebase Admin initialized with default credentials.');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

export const db = getFirestore();
