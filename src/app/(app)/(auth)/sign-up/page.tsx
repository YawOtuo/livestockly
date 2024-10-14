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
import FarmsDisplaySlider from "../../components/FarmsDisplaySlider";
import { IoIosArrowRoundBack } from "react-icons/io";

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
    <div
      className="w-full
                flex flex-col justify-center items-center
                 bg-white h-full relative">
      <div
        onClick={() => router.push("/")}
        className="absolute top-2 left-5 cursor-pointer z-[1000]">
        <IoIosArrowRoundBack color="#0fa958" size="20" />
      </div>
      <h1 className="mb-10  font-bold">
        <span className="font-semibold  text-black lowercase">liveStock</span>
        <span className="font-bold text-green1">ly</span>
      </h1>
      {pages[activeIndex]}
    </div>
  );
};

const Root = styled("div", {});

export default Page;
