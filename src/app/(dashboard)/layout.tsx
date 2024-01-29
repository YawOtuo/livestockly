"use client";
import React from "react";
import Navbar from "./components/navbar";
import Navbar2 from "./components/navbar2";
import "../globals.css";
import { Montserrat } from "next/font/google";
import "../globals.css";
import Providers from "@/lib/utils/provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useIsLoggedIn from "@/lib/hooks/useIsLoggedInReRoute";
import { CustomLoaders } from "@/components/Loaders";
import NotAcceptedIntoFarm from "@/components/NotAcceptedIntoFarm";

const montserrat = Montserrat({ subsets: ["latin"] });
// ... (other imports)

export default function Layout({ children }: { children: React.ReactNode }) {
  const userSqlData = useSelector((state) => state?.users?.userSqlData);
  const router = useRouter();
  const [showNotAccepted, setShowNotAccepted] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowNotAccepted(!userSqlData?.acceptedIntoFarm);
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount

    // Uncomment the following line if you want to check for acceptance on every render
    // console.log(isLoggedIn);
  }, [userSqlData?.acceptedIntoFarm]); // Dependencies for the useEffect

  return (
    <body className={montserrat.className}>
      <div className="grid grid-cols-5">
        <div className="hidden lg:flex">
          <Navbar2 />
        </div>
        <div className="col-span-5 lg:col-span-4 flex flex-col">
          <Navbar />
          <div className="w-full h-full">
            {loading ? (
              <div className="min-h-[50vh] flex items-center justify-center">
                <CustomLoaders variant="syncloader" colour="green1" />
              </div> // You can replace this with your loading spinner component
            ) : showNotAccepted ? (
              <NotAcceptedIntoFarm />
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </body>
  );
}
