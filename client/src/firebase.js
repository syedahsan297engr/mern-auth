// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW0kxb-i5ljPzzViHY6ZQBQr8O-bGTYSQ", //import.env.VITE_FIREBASE_API_KEY from .env file
  authDomain: "mern-auth-f72ff.firebaseapp.com",
  projectId: "mern-auth-f72ff",
  storageBucket: "mern-auth-f72ff.appspot.com",
  messagingSenderId: "387037736209",
  appId: "1:387037736209:web:0dd6db602cfc30f4cf30b0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);