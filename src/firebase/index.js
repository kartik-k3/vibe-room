import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

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
const GoogleAuthProviderInit = new GoogleAuthProvider();
GoogleAuthProviderInit.addScope(
  "https://www.googleapis.com/auth/contacts.readonly"
);
const GithubAuthProviderInit = new GithubAuthProvider();
const FacebookAuthProviderInit = new FacebookAuthProvider();

export {
  app,
  auth,
  GoogleAuthProviderInit,
  FacebookAuthProviderInit,
  GithubAuthProviderInit,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
};
