"use client";
import React, { useState } from "react";
import Navbar from "./components/navbar";
import Navbar2 from "./components/navbar2";
import "../globals.css";
// import { Open_Sans } from "next/font/google";
import "../globals.css";
import Providers from "@/lib/utils/provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useIsLoggedIn from "@/lib/hooks/useIsLoggedIn";
import { CustomLoaders } from "@/components/Loaders";
import NotAcceptedIntoFarm from "@/components/NotAcceptedIntoFarm";
import useIsLoggedInReRoute from "@/lib/hooks/useIsLoggedInReRoute";
import { RootState } from "@/lib/redux/store";
import { motion } from "framer-motion";

// const montserrat = Open_Sans({ subsets: ["latin"] });
// ... (other imports)

export default function Layout({ children }: { children: React.ReactNode }) {
  const userSqlData = useSelector(
    (state: RootState) => state?.users?.userSqlData
  );
  const isLoggedInR = useIsLoggedInReRoute(false, "/login");
  // const isLoggedIn = useIsLoggedIn()
  const router = useRouter();
  const [showNotAccepted, setShowNotAccepted] = React.useState(false);
  // const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = useState("loading");

  // useEffect(() => {
  //   if (farm?.id && userSqlData?.farm_id != farm?.id) {
  //     setCurrentPage("userDoesntBelongToFarm");
  //   }

  // }, []);

  useEffect(() => {
    console.log(userSqlData?.acceptedIntoFarm);
    if (userSqlData?.acceptedIntoFarm) {
      console.log(userSqlData?.acceptedIntoFarm);

      setCurrentPage("success");
      // setLoading(false);
    }

    if (userSqlData?.acceptedIntoFarm == false) {
      setCurrentPage("showNotAccepted");
    }
  }, [userSqlData?.acceptedIntoFarm]); // Dependencies for the useEffect

  const options: any = {
    showNotAccepted: (
      <div>
        <Navbar />
        <NotAcceptedIntoFarm />
      </div>
    ),
    loading: (
      <div className="flex flex-col gap-5 items-center justify-center">
        <p className="uppercase font-semibold mt-10">Boatey Farms</p>{" "}
        <div className="min-h-[50vh] flex items-center justify-center">
          <CustomLoaders variant="syncloader" colour="green1" />
        </div>
      </div>
    ),
    userDoesntBelongToFarm: (
      <div>
        <p>User does not belong to farm</p>
      </div>
    ),
    success: (
      <motion.div className="grid grid-cols-5" layout>
        <div className="hidden lg:flex">
          <Navbar2 />
        </div>
        <div className="col-span-5 lg:col-span-4 flex flex-col">
          <Navbar />
          <div className="w-full h-full">{children}</div>
        </div>
      </motion.div>
    ),
  };
  return (
    <main className={`!text-black `}>
      {options[currentPage]}
    </main>
  );
}
