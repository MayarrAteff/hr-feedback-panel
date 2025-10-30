import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsAojF4SGrvvhQwMW7WyERvN0jGywVrXc",
  authDomain: "employee-feedback-management.firebaseapp.com",
  projectId: "employee-feedback-management",
  storageBucket: "employee-feedback-management.firebasestorage.app",
  messagingSenderId: "768333205563",
  appId: "1:768333205563:web:1c5d1bb58eb23fb6544c1e",
  measurementId: "G-SS21L60TY9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;