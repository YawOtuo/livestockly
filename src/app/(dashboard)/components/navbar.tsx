"use client";
import { Logout } from "@/lib/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSelector } from "react-redux";

import { IoIosNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import { Links, Pagination } from "./navbar2";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { useIsAdmin } from "@/lib/hooks/useIsAdmin";
import { GrUserAdmin } from "react-icons/gr";

export default function Navbar() {
  const userSqlData = useSelector((state) => state?.users?.userSqlData);
  const [showDetails, setShowDetails] = useState(false);

  // const {
  //   isLoading: notificationsIsLoading,
  //   error: notificationsError,
  //   data: notifications,
  // } = useQuery(["notifications"], () => fetchNotifications(userSqlData?.id), {
  //   enabled: !!userSqlData?.id,
  // });

  const isAdmin = useIsAdmin(userSqlData?.uid);

  return (
    <div className="border-b-yellow4 bg-yellow5 lg:bg-inherit border-b-2 lg:h-[52px] w-full flex flex-col items-center justify-between px-0 lg:px-10 py-2 gap-5">
      <div className="flex gap-5 w-full px-3 items-center">
        <div className="flex gap-5 items-center w-full">
          <div className="relative w-full max-w-[50px] aspect-square rounded-full overflow-hidden border-2 border-yellow1">
            <Image
              alt="Image"
              fill
              src={`https://res.cloudinary.com/daurieb51/image/upload/v1642082142/${
                userSqlData?.public_id || "placeholderdog_xyfyje"
              }.png`}
            />
          </div>
          <p className="font-semibold text-yellow1 lg:text-black">
            {userSqlData?.username}
          </p>
        </div>{" "}
        {/* {notifications && notifications?.length > 0 && (
          <Link href={"/profile/notifications"}>
            <div className="flex gap-5 font-[400] items-center relative">
              <div className="absolute top-0 right-0 bg-yellow1 rounded-full aspect-square w-[20px] flex items-center justify-center">
                <p className="text-white text-xs">{notifications?.length}</p>
              </div>
              <IoIosNotificationsOutline size="35" />
            </div>
          </Link>
        )} */}
        <div className="hidden lg:flex gap-1  text-sm px-10 mt-2 items-center">
          <IoIosLogOut />
          <button onClick={Logout}>Logout</button>
        </div>{" "}
        <button
          className="lg:hidden"
          onClick={() => setShowDetails((init) => !init)}>
          <RxHamburgerMenu size="30" />
        </button>{" "}
      </div>
      {showDetails && (
        <div className="w-full h-full">
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
        </div>
      )}
    </div>
  );
}
