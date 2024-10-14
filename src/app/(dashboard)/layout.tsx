"use client";
import React, { useState } from "react";
import Navbar from "./components/HorizontalAndMobileNavbar";
import "../globals.css";
// import { Open_Sans } from "next/font/google";
import "../globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { CustomLoaders } from "@/components/Loaders";
import NotAcceptedIntoFarm from "@/components/NotAcceptedIntoFarm";
import useIsLoggedInReRoute from "@/lib/hooks/useIsLoggedInReRoute";
import { RootState } from "@/lib/redux/store";
import DashboardSideNav from "./components/DashboardSideNav";
import { useAppStore } from "@/lib/store/useAppStore";
import DashboardMobileMenuWrapper from "@/components/DashboardMobileNavbar/DashboardMobileMenuWrapper";

// const montserrat = Open_Sans({ subsets: ["latin"] });
// ... (other imports)

export default function Layout({ children }: { children: React.ReactNode }) {
  const { DBDetails } = useAppStore();

  useIsLoggedInReRoute(false, "/login");
  // const isLoggedIn = useIsLoggedIn()
  const router = useRouter();
  const [showNotAccepted, setShowNotAccepted] = React.useState(false);
  const [currentPage, setCurrentPage] = useState("loading");

  useEffect(() => {
    console.log(DBDetails?.acceptedIntoFarm);
    if (DBDetails?.acceptedIntoFarm) {
      console.log(DBDetails?.acceptedIntoFarm);

      setCurrentPage("success");
      // setLoading(false);
    }

    if (DBDetails?.acceptedIntoFarm == false) {
      setCurrentPage("showNotAccepted");
    }
  }, [DBDetails?.acceptedIntoFarm]); // Dependencies for the useEffect

  const options: any = {
    showNotAccepted: (
      <div>
        <Navbar />
        <NotAcceptedIntoFarm />
      </div>
    ),
    loading: (
      <div className="flex flex-col gap-5 items-center justify-center bg-green2 h-screen">
        <p className="uppercase font-bold mt-10 text-primary">livestockly</p>{" "}
        <div className=" flex items-center justify-center">
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
      <DashboardMobileMenuWrapper>
        <div className="grid grid-cols-10 bg-green2">
          <div className="col-span-2 hidden lg:flex">
            <DashboardSideNav />
          </div>
          <div className="col-span-10 lg:col-span-8  ">
            <div
              className="flex 
            flex-col rounded-tl-3xl bg-white overflow-hidden h-full">
              <Navbar />
              <div className="w-full h-full p-5 ">{children}</div>
            </div>
          </div>
        </div>
      </DashboardMobileMenuWrapper>
    ),
  };
  return <div className={`!text-black  w-full`}>{options[currentPage]}</div>;
}
