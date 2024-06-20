// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaKIeWlpXxItpQsdWwoHuN99ZDwNEGHMQ",
  authDomain: "moviesflix-fdde7.firebaseapp.com",
  projectId: "moviesflix-fdde7",
  storageBucket: "moviesflix-fdde7.appspot.com",
  messagingSenderId: "441728058737",
  appId: "1:441728058737:web:6adb52fc2961ab58bc62d0",
  measurementId: "G-RN3ECKBWKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();