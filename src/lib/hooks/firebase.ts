// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV8cXfd-9XZy648gcoRH53ZDyJLYKKnAs",
  authDomain: "livestockly-26.firebaseapp.com",
  projectId: "livestockly-26",
  storageBucket: "livestockly-26.appspot.com",
  messagingSenderId: "411654977755",
  appId: "1:411654977755:web:48b7cefccb05b7bf7ef4fe",
  measurementId: "G-KX4WKCZMGZ"
};

// Initialize Firebase

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
