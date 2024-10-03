"use client";
import useIsLoggedInReRoute from "@/lib/hooks/useIsLoggedInReRoute";
import { addMessage } from "@/lib/redux/reducers/messages";
import { setUserDetails } from "@/lib/redux/reducers/users";
import { Button, TextField } from "@mui/material";
import { styled } from "@stitches/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FarmVerify from "../login/components/FarmVerify";
import LoginOptions from "../login/components/LoginOptions";
import FarmsDisplaySlider from "../components/FarmsDisplaySlider";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedInReRoute(true, "/dashboard");

  const [activeIndex, setActiveIndex] = useState(0);

  const pages: JSX.Element[] = [
    <FarmVerify onSuccess={setActiveIndex} page="sign-up" />,
    <LoginOptions page="sign-up" />,
  ];
  return (
    <Root className=" bg-grey bg-darkened h-screen w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2  h-full ">
        <div className="w-full h-full col">
          {" "}
          <FarmsDisplaySlider />
        </div>
        <div
          className="
                py-0 lg:py-5 md:py-0 flex flex-col justify-center items-center
                 bg-white">
          <h1 className="mb-10  font-bold">
            <span className="font-semibold  text-black lowercase">
              liveStock
            </span>
            <span className="font-bold text-green1">ly</span>
          </h1>
          {pages[activeIndex]}
        </div>
      </div>
    </Root>
  );
};

const Root = styled("div", {});

export default Page;
