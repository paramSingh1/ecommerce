// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUoFSPiAvXJ6er6wvnJtNxIQ5tvTDZd3w",
  authDomain: "ecom-16f53.firebaseapp.com",
  projectId: "ecom-16f53",
  storageBucket: "ecom-16f53.appspot.com",
  messagingSenderId: "1093934081364",
  appId: "1:1093934081364:web:3779e24743dec1b656d4c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
