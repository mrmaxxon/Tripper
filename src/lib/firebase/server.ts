import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase/auth'; // Wait, server auth is from firebase-admin/auth
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

if (getApps().length === 0) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error: any) {
    console.log('Firebase admin initialization error', error.stack);
  }
}

export const adminDb = getFirestore();
export const adminAuth = getAdminAuth();
export const adminStorage = getStorage();
