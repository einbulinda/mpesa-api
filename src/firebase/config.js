import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBjQ5_AvzLXpV9J2O_3jpwvRW5PflwcbXk",
  authDomain: "daraja-api-254.firebaseapp.com",
  databaseURL: "https://daraja-api-254-default-rtdb.firebaseio.com",
  projectId: "daraja-api-254",
  storageBucket: "daraja-api-254.appspot.com",
  messagingSenderId: "322455844344",
  appId: "1:322455844344:web:0ae199e6a61d1d4c5a520d",
  measurementId: "G-6SR4ZZD3RS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const mpesaDb = getFirestore(app);

export const functions = getFunctions(app);
