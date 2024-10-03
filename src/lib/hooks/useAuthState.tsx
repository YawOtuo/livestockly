"use client"
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppStore } from "../store/useAppStore";
import { FetchOrCreateUserByUid } from "../api/users";
import useSignUpStore from "../store/useSignUpStore";
import { useToast } from "@/hooks/use-toast";
import useSetFarmIdInLS from "./useSetFarmIdInLS";

export default function useAuthState(auth: any) {
  const { toast } = useToast();
  const { username, setUsername } = useSignUpStore();

  const { setDBDetails, setFBaseDetails, error, setError, setIsLoading } =
    useAppStore();
  
  const { farm, setFarm } = useSetFarmIdInLS();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (userAuth: any) => {
    
        try {
          if (userAuth) {
            setFBaseDetails(userAuth);

            // Fetch or create user by UID
            const userData = await FetchOrCreateUserByUid({
              username: userAuth?.displayName || username || "User",
              email: userAuth?.email || userAuth?.providerData?.[0]?.email,
              uid: userAuth?.uid,
              farm_id: farm?.id as number ,
            });

            setDBDetails(userData);
          }
          setIsLoading(false);
        } catch (error) {
          setError(error);
          setIsLoading(false);
        }
      },
      (error: any) => {
        setError(error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth, setFBaseDetails, setDBDetails ,farm]);

  // Display authentication error toast
  useEffect(() => {
    if (error) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
        duration: 5000,
        // isClosable: true,
      });
    }
  }, [error, toast]);
 
}
