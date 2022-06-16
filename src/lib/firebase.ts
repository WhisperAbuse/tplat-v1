// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAOEcxZR-_vI2H2bxLfil2oh5KmXSliJBg',
  authDomain: 'tplat-8b55a.firebaseapp.com',
  projectId: 'tplat-8b55a',
  storageBucket: 'tplat-8b55a.appspot.com',
  messagingSenderId: '601522752057',
  appId: '1:601522752057:web:4a6f87b8ef390bff63dbe8',
  measurementId: 'G-S6NWZHWMQB',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(app);

export const storage = getStorage(app);

export async function getUserWithUsername(username: string) {
  const usersRef = collection(firestore, 'users');
  const q = query(usersRef, where('username', '==', username), limit(1));
  const querySnapshot = await getDocs(q);
  const userDoc = querySnapshot.docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc: DocumentSnapshot) {
  const data = doc.data() as DocumentData;

  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

export const signOut = () => {
  auth.signOut();
};
