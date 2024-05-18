import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const config = {
  apiKey: "AIzaSyBCSLfIIi0F9novIsRR7L1QWFdnoWccHBE",
  authDomain: "vibe-room-ui.firebaseapp.com",
  databaseURL:
    "https://vibe-room-ui-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vibe-room-ui",
  storageBucket: "vibe-room-ui.appspot.com",
  messagingSenderId: "1033636199672",
  appId: "1:1033636199672:web:e19e2bb3c19e02b7890f0d",
  measurementId: "G-TEMWVXMGL2",
};

const app = initializeApp(config);
const auth = getAuth(app);
const database = getDatabase(app);
const GoogleAuthProviderInit = new GoogleAuthProvider();
GoogleAuthProviderInit.addScope(
  "https://www.googleapis.com/auth/contacts.readonly"
);
const GithubAuthProviderInit = new GithubAuthProvider();
const FacebookAuthProviderInit = new FacebookAuthProvider();

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  database,
  FacebookAuthProviderInit,
  GithubAuthProviderInit,
  GoogleAuthProviderInit,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
};
