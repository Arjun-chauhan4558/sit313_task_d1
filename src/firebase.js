
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuIqppS3xxPDaVyefbk9dqKDGePHu5fIo",
  authDomain: "deakin-cdafc.firebaseapp.com",
  projectId: "deakin-cdafc",
  storageBucket: "deakin-cdafc.firebasestorage.app",
  messagingSenderId: "361644877749",
  appId: "1:361644877749:web:ef96123e301e2e34a0dbfc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
