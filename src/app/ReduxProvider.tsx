"use client";
import React from "react";

import axios from "axios";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { url } from "../../weburl";
import {
  setUserDetails,
  setUserSQLDBDetails,
} from "@/lib/redux/reducers/users";
import useFirebaseAuth from "@/lib/hooks/useFirebaseAuth";

export default function ReduxProvider() {
  const { auth } = useFirebaseAuth();
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      dispatch(setUserDetails(user));

      axios
        .get(`${url}users/getUserByUid/${user.uid}`)
        .then((res) => {
          dispatch(setUserSQLDBDetails(res.data));
        })

        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, loading]);
}
