import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBnWWrivGl8iymPj6NDSw9AyzfdpY1uAB0",
    authDomain: "miniblig-ea399.firebaseapp.com",
    projectId: "miniblig-ea399",
    storageBucket: "miniblig-ea399.appspot.com",
    messagingSenderId: "105424375750",
    appId: "1:105424375750:web:74088b1756575baf75ecc7"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

