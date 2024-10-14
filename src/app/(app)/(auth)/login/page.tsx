"use client";
import useIsLoggedInReRoute from "@/lib/hooks/useIsLoggedInReRoute";

import { styled } from "@stitches/react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FarmVerify from "./components/FarmVerify";
import LoginOptions from "./components/LoginOptions";
import { IoIosArrowBack, IoIosArrowRoundBack } from "react-icons/io";
import FarmsDisplaySlider from "../../components/FarmsDisplaySlider";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useIsLoggedInReRoute(true, "/dashboard");

  const [activeIndex, setActiveIndex] = useState(0);

  const pages: JSX.Element[] = [
    <FarmVerify onSuccess={setActiveIndex} />,
    <LoginOptions />,
  ];
  return (
    <div
      className="w-full 
               flex flex-col justify-center items-center
                 bg-white relative h-full">
      <div
        onClick={() => router.push("/")}
        className="absolute top-0 left-5 cursor-pointer z-[1000]">
        <IoIosArrowRoundBack color="#0fa958" size="20" />
      </div>
      <h1 className="mb-10   font-bold">
        <span className="font-semibold text-black lowercase">liveStock</span>
        <span className="font-bold text-green1">ly</span>
      </h1>
      {pages[activeIndex]}
    </div>
  );
};

export default Page;
