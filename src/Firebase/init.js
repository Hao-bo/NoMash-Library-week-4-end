// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG4KLtqYmvZjfZ0yqkF_-h4RFww-XGhOM",
  authDomain: "week7-xinzhi.firebaseapp.com",
  projectId: "week7-xinzhi",
  storageBucket: "week7-xinzhi.appspot.com",
  messagingSenderId: "51956810655",
  appId: "1:51956810655:web:77bc989b0f3e04ff0e73aa"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore()
export default db