"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSelector } from "react-redux";

import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { useIsAdmin } from "@/lib/hooks/useIsAdmin";
import { GrUserAdmin } from "react-icons/gr";
import useFirebaseAuth from "@/lib/hooks/useFirebaseAuth";
import { RootState } from "@/lib/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { Links, Pagination } from "./navbar2";
import NotificationPopover from "./NotificationPopover";

export default function HorizontalAndMobileNabvar() {
  const { Logout } = useFirebaseAuth();
  const userSqlData = useSelector(
    (state: RootState) => state?.users?.userSqlData
  );
  const [showDetails, setShowDetails] = useState(false);

  // const {
  //   isLoading: notificationsIsLoading,
  //   error: notificationsError,
  //   data: notifications,
  // } = useQuery(["notifications"], () => fetchNotifications(userSqlData?.id), {
  //   enabled: !!userSqlData?.id,
  // });

  const isAdmin = useIsAdmin(userSqlData?.uid as string);

  return (
    <AnimatePresence>
      <motion.div
        // layout
        // // style={{
        // //   height: showDetails ? "h-full" : "h-[52px]",

        // // }}
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        className="border-b-yellow4 bg-yellow5 lg:bg-inherit border-b-2 lg:h-[52px] w-full flex flex-col items-center justify-between px-0 lg:px-10 py-2 gap-5">
        <div className="flex gap-5 w-full px-3 items-center">
          <div className="flex gap-5 items-center w-full">
            {userSqlData?.public_id && (
              <div className="relative w-full max-w-[50px] aspect-square rounded-full overflow-hidden border-2 border-yellow1">
                <Image
                  alt="Image"
                  fill
                  src={`https://res.cloudinary.com/daurieb51/image/upload/v1642082142/${
                    userSqlData?.public_id || "placeholderdog_xyfyje"
                  }.png`}
                />
              </div>
            )}

            <p className="font-semibold text-yellow1 lg:text-black">
              {userSqlData?.username}
            </p>
          </div>{" "}
          <NotificationPopover />
          <div className="hidden lg:flex gap-1  text-sm px-10  items-center">
            <IoIosLogOut />
            <button onClick={Logout}>Logout</button>
          </div>{" "}

          <button
            className="lg:hidden"
            onClick={() => setShowDetails((init) => !init)}>
            <RxHamburgerMenu size="30" className="text-primary font-bold" />
          </button>{" "}
        </div>

        {showDetails && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full h-full">
              <div>
                {Links.map((r, index) => (
                  <Pagination
                    onClick={() => setShowDetails((init) => !init)}
                    label={r?.label}
                    link={r?.link}
                    key={index}
                    icon={r?.icon}
                  />
                ))}
                {isAdmin && (
                  <Link
                    href={"/admin"}
                    className="hover:scale-[1.05] hover:bg-yellow4 w-full p-3 px-10 flex gap-5 items-center ">
                    <GrUserAdmin />
                    <p className=" font">Admin</p>
                  </Link>
                )}
                <div className="flex gap-1 px-10 mt-2 items-center">
                  <IoIosLogOut />
                  <button onClick={Logout}>Logout</button>
                </div>{" "}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
