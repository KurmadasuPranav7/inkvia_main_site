import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXmmC4ZMiS95vM0rP6uk20nhzOcJkI_HU",
  authDomain: "inkvia-b31c1.firebaseapp.com",
  projectId: "inkvia-b31c1",
  storageBucket: "inkvia-b31c1.firebasestorage.app",
  messagingSenderId: "1093306185826",
  appId: "1:1093306185826:web:db97d364a2a035fbcff93b"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
