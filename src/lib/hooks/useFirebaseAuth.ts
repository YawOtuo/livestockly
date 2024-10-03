import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUserDetails, setUserSQLDBDetails } from "../redux/reducers/users";
import { useRouter } from "next/navigation";
import { Farm } from "../types/farm";
import { auth } from "./firebase";
import { FetchOrCreateUserByUid } from "../api/users";
import useSetFarmIdInLS from "./useSetFarmIdInLS";

const useFirebaseAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account",
  });
  const { farm, setFarm } = useSetFarmIdInLS();
  const [errorText, setErrorText] = useState<string>();

  const [loading, setLoading] = useState(false);

  const signUpWithGoogle = async () => {
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (credential) {
        const result2 = await FetchOrCreateUserByUid({
          farm_id: farm?.id as number,
          username: user.displayName as string,
          email: user.email as string,
          uid: user.uid,
        });

        if (result2) {
          setLoading(false);
          router.push("/dashboard");
        }
        return result;
      } else {
        setErrorText("Google sign-in credential not available.");
      }
    } catch (error: any) {
      setErrorText(`Error signing in with Google:" ${error}`);
    }
  };

  const loginWithGoogle = async () => {
    const auth = getAuth();
    return await signInWithPopup(auth, googleProvider);
  };

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);

      router.push("/dashboard");
      return res;
    } catch (error) {
      setLoading(false);
      setErrorText("Invalid credentials");
    }
  };

  const registerWithEmailAndPassword = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);

      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      if (res) {
        const result2 = await FetchOrCreateUserByUid({
          farm_id: farm?.id as number,
          username: username,
          email: user?.email as string,
          uid: user.uid,
        });

        if (result2) {
          setLoading(false);
          dispatch(setUserDetails(res));
          router.push("/dashboard");
        }
        return user;
      } else {
        setLoading(false);
        setErrorText("Invalid credentials");
      }
    } catch (err: any) {
      setLoading(false);
      console.error("Error registering:", err);
      setErrorText(err.message);
      throw err;
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  const Logout = () => {
    signOut(auth);
    window.location.href = "/login";
  };

  const LogoutWithoutRerouting = () => {
    signOut(auth);
  };

  return {
    auth,
    loading,
    errorText,
    loginWithGoogle,
    signUpWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    Logout,
    LogoutWithoutRerouting,
  };
};

export default useFirebaseAuth;
