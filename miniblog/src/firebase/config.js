import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDkhcH_J08kaPdbz_p_b155YDlCEgScbZk",
  authDomain: "miniblog-3523b.firebaseapp.com",
  projectId: "miniblog-3523b",
  storageBucket: "miniblog-3523b.appspot.com",
  messagingSenderId: "197225777386",
  appId: "1:197225777386:web:ef46a8e407f0834c006f93",
  measurementId: "G-F4Y2PQFZZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };