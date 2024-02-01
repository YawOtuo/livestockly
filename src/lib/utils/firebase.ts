import { initializeApp } from "firebase/app";
import axios from "axios";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithRedirect,
} from "firebase/auth";
import { url } from "../../../weburl";
import { AddUser } from "../api/users";
import { VerifyFarmExists } from "../api/farm";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqbEOu14Y_JDUEVm4VXae3qzmRJChMpMw",
  authDomain: "boatey-farms.firebaseapp.com",
  projectId: "boatey-farms",
  storageBucket: "boatey-farms.appspot.com",
  messagingSenderId: "432999123126",
  appId: "1:432999123126:web:6cea114d955d893a77be17",
  measurementId: "G-TPVJ6N65K0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// const googleProvider = new GoogleAuthProvider();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

const signUpWithGoogle = async (farm) => {
  const auth = getAuth();

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log(result);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential) {
      const result2 = await AddUser({
        farm_id: farm?.id,
        username: user.displayName,
        email: user.email,
        uid: user.uid,
      });
      console.log(result2);
      return result;
    } else {
      console.error("Google sign-in credential not available.");
    }
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

const loginWithGoogle = async (farm) => {
  const auth = getAuth();

  return await signInWithPopup(auth, googleProvider);
};

const logInWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const registerWithEmailAndPassword = async (
  farm,
  username,
  email,
  password
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Add the user only if createUserWithEmailAndPassword is successful
    if (res) {
      const result2 = await AddUser({
        farm_id: farm?.id,
        username: username,
        email: user.email,
        uid: user.uid,
      });
      console.log(result2);
    }

    return user;
  } catch (err) {
    console.error(err);
    alert(err.message);
    throw err;
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const Logout = () => {
  signOut(auth);
  window.location = "/login";
};


const LogoutWithoutRerouting = () => {
  signOut(auth)
}

export {
  auth,
  db,
  loginWithGoogle,
  signUpWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  Logout,LogoutWithoutRerouting
};
