"use client";
import React, { useState } from "react";
import Navbar from "./components/HorizontalAndMobileNavbar";
import "../globals.css";
// import { Open_Sans } from "next/font/google";
import "../globals.css";
import Providers from "@/lib/utils/provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { CustomLoaders } from "@/components/Loaders";
import NotAcceptedIntoFarm from "@/components/NotAcceptedIntoFarm";
import useIsLoggedInReRoute from "@/lib/hooks/useIsLoggedInReRoute";
import { RootState } from "@/lib/redux/store";
import DashboardSideNav from "./components/DashboardSideNav";
import { useAppStore } from "@/lib/store/useAppStore";

// const montserrat = Open_Sans({ subsets: ["latin"] });
// ... (other imports)

export default function Layout({ children }: { children: React.ReactNode }) {
  const { DBDetails } = useAppStore();

  useIsLoggedInReRoute(false, "/login");
  // const isLoggedIn = useIsLoggedIn()
  const router = useRouter();
  const [showNotAccepted, setShowNotAccepted] = React.useState(false);
  const [currentPage, setCurrentPage] = useState("loading");

  // useEffect(() => {
  //   if (farm?.id && DBDetails?.farm_id != farm?.id) {
  //     setCurrentPage("userDoesntBelongToFarm");
  //   }

  // }, []);

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
        <p className="uppercase font-semibold mt-10 text-primary">
          livestockly
        </p>{" "}
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
      <div className="grid grid-cols-6">
        <div className="hidden lg:flex">
          <DashboardSideNav />
        </div>
        <div className="col-span-6 lg:col-span-5 flex flex-col">
          <Navbar />
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    ),
  };
  return <div className={`!text-black  w-full`}>{options[currentPage]}</div>;
}
