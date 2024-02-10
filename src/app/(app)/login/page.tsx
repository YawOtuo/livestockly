"use client";
import useIsLoggedInReRoute from "@/lib/hooks/useIsLoggedInReRoute";
import { addMessage } from "@/lib/redux/reducers/messages";
import { setUserDetails } from "@/lib/redux/reducers/users";
import { logInWithEmailAndPassword } from "@/lib/utils/firebase";
import { Button, TextField } from "@mui/material";
import { styled } from "@stitches/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FarmVerify from "./components/FarmVerify";
import LoginOptions from "./components/LoginOptions";
import { IoIosArrowBack, IoIosArrowRoundBack } from "react-icons/io";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedInReRoute(true, "/dashboard");

  const [activeIndex, setActiveIndex] = useState(0);

  const pages: JSX.Element[] = [
    <FarmVerify onSuccess={setActiveIndex} />,
    <LoginOptions />,
  ];
  return (
    <Root className=" bg-grey ">
      <div className="flex flex-col lg:flex-row  h-full ">
        <div className="flex-[0_0_50%] max-h-[50vh] lg:max-h-[100vh] lg:flex-[0_1_50%] aspect-square bg-[url('/images/livestockgrass.jpeg')] bg-cover bg-center flex flex-col justify-center items-center"></div>
        <div
          className="lg:flex-[1_1_700px]
                py-5 lg:py-5 md:py-0 flex flex-col justify-center items-center
                 bg-white relative"
          style={{ height: "max-height" }}>
          <div
            onClick={() => router.push('/')}
            className="absolute top-5 left-5 cursor-pointer z-[1000]">
            <IoIosArrowRoundBack color="#0fa958" size="20" />
          </div>
          <h1 className="mb-10   font-bold">
            <span className="font-semibold text-black lowercase">
              liveStock
            </span>
            <span className="font-bold text-green1 uppercase">Diary</span>
          </h1>
          {pages[activeIndex]}
        </div>
      </div>
    </Root>
  );
};

const Root = styled("div", {});

export default Page;
