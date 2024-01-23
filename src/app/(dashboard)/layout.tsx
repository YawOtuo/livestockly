"use client";
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

const montserrat = Montserrat({ subsets: ["latin"] });
export default function Layout({ children }: { children: React.ReactNode }) {
  // const isLoggedIn = useIsLoggedIn(false,'/login');
  const router = useRouter();
  // useEffect(() => {
  //   console.log(isLoggedIn)
  // }, [isLoggedIn]);

  return (
    <body className={montserrat.className}>
      <div className="grid grid-cols-5">
        <div className="hidden lg:flex">
          <Navbar2 />
        </div>
        <div className="col-span-5 lg:col-span-4 flex flex-col">
          <Navbar />
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </body>
  );
}
