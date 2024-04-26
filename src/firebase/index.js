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
  projectId: "vibe-room-ui",
  storageBucket: "vibe-room-ui.appspot.com",
  messagingSenderId: "1033636199672",
  appId: "1:1033636199672:web:e19e2bb3c19e02b7890f0d",
  measurementId: "G-TEMWVXMGL2",
};

const app = initializeApp(config);
const auth = getAuth(app);

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
};
