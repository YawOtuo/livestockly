"use client";
import { addMessage } from "@/lib/redux/reducers/messages";
import { setUserDetails } from "@/lib/redux/reducers/users";
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "@/lib/utils/firebase";
import { Button, TextField } from "@mui/material";
import { styled } from "@stitches/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      farm_name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const user = await registerWithEmailAndPassword(
          values.farm_name,
          values.email,
          values.password
        );
        router.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Root className="py-5 px-4  bg-grey bg-darkened view_height_100">
      <div className="flex flex-col lg:flex-row m-1 md:m-5  h-full ">
        <div className="flex-[0_1_50%]  bg-[url('/images/livestockgrass.jpeg')] bg-cover bg-center flex flex-col justify-center items-center"></div>
        <div
          className="flex-[1_1_700px]
                py-5 md:py-0 flex flex-col justify-center items-center
                 bg-white"
          style={{ height: "max-height" }}>
          <h1 className="uppercase brand-green-font font-bold">Boatey Farms</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="py-5">
              <TextField
                className="w-full"
                label="FARM NAME"
                name="farm_name"
                required={true}
                onChange={formik.handleChange}
                value={formik.values.farm_name}
              />
            </div>
            <div className="py-5">
              <TextField
                className="w-full"
                label="EMAIL"
                name="email"
                required={true}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>

            <div className="py-5">
              <TextField
                className="w-full"
                label="PASSWORD"
                name="password"
                type="password"
                required={true}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Button
                
                onClick={formik.handleSubmit}
                className="text-green1">
                SIGN UP
              </Button>
              <div className="flex gap-5 items-center text-xs">
                <p>Already have an account already? </p>
                <Link className="uppercase" href={"/login"}>
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Root>
  );
};

const Root = styled("div", {});

export default Page;
