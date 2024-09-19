"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useToast from "./useToasts";
import { RootState } from "../redux/store";

function useIsLoggedIn() {
  const { showToast } = useToast();
  const userData = useSelector((state : RootState) => state?.users?.userData);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userData) {
      showToast("Welcome!!!", "success");
      setIsLoggedIn(true);
    } else {
    }
  }, [userData]);

  return isLoggedIn;
}

export default useIsLoggedIn;
