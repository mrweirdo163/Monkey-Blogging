import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4fa5VNyW3PxavFODI0AmrZ5Irc-igpPw",
  authDomain: "monkey-blogging-eb36b.firebaseapp.com",
  projectId: "monkey-blogging-eb36b",
  storageBucket: "monkey-blogging-eb36b.appspot.com",
  messagingSenderId: "30178417602",
  appId: "1:30178417602:web:5ed3fc2573d07ceedbd45b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
