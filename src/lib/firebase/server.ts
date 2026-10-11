import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getStorage, Storage } from 'firebase-admin/storage';

function getAdminApp(): App | null {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.warn("Firebase Admin credentials not fully configured");
    return null;
  }

  try {
    // Strip surrounding quotes if present from .env or Vercel UI
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    privateKey = privateKey.replace(/\\n/g, '\n');

    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error?.message || error);
    return null;
  }
}

// Proxy wrapper so accessing adminDb/adminAuth/adminStorage never crashes at import time
function createSafeProxy<T extends object>(getter: () => T | null, name: string): T {
  return new Proxy({} as T, {
    get(_target, prop) {
      const instance = getter();
      if (!instance) {
        console.warn(`[Firebase Admin] Attempted to access ${name}.${String(prop)} without active Firebase Admin App.`);
        // Return a mock function that safely resolves or returns an empty query
        return (..._args: any[]) => ({
          get: async () => ({ docs: [], exists: false, data: () => null }),
          where: () => ({ get: async () => ({ docs: [] }) }),
          doc: () => ({ get: async () => ({ exists: false, data: () => null }), set: async () => {} }),
        });
      }
      const val = (instance as any)[prop];
      if (typeof val === 'function') {
        return val.bind(instance);
      }
      return val;
    }
  });
}

export const adminDb = createSafeProxy<Firestore>(() => {
  const app = getAdminApp();
  return app ? getFirestore(app) : null;
}, 'adminDb');

export const adminAuth = createSafeProxy<Auth>(() => {
  const app = getAdminApp();
  return app ? getAuth(app) : null;
}, 'adminAuth');

export const adminStorage = createSafeProxy<Storage>(() => {
  const app = getAdminApp();
  return app ? getStorage(app) : null;
}, 'adminStorage');
