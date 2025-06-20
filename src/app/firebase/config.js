import firebase, { getApps, getApp } from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, connectAuthEmulator } from "firebase/auth"
import { getFirestore, collection, getDoc, getDocs, initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)




export {app,auth}