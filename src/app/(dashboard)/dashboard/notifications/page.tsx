"use client";

import NoPlaceHolder from "@/components/NoPlaceHolder";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSelector } from "react-redux";
import NotificationCard from "../../components/NotificationCard";

export default function Page() {
  const userSqlData = useSelector((state) => state.users.userSqlData);
  // const {
  //   isLoading,
  //   error,
  //   data: items,
  // } = useQuery(["notifications"], () => fetchNotifications(userSqlData?.id), {
  //   enabled: !!userSqlData?.id,
  // });
  return (
    <div className="flex flex-col gap-5 w-full justify-start px-5 lg:px-10 py-5">
      <div className="flex gap-5 font-[400] items-center">
        <p>Notifcations</p>
        {/* {items?.length > 1 && (
          <div className="bg-yellow1 rounded-full aspect-square w-[30px] flex items-center justify-center">
            <p className="text-white font-semibold">{items?.length}</p>
          </div>
        )} */}
      </div>
{/* 
      <div className="flex flex-col gap-5 w-full h-full">
        {items?.map((r, index: number) => (
          <NotificationCard notification={r} key={index} />
        ))}
        {isLoading && <p>Loading...</p>}
        {items?.length < 1 && (
          <div className="flex w-full  h-[50vh]">
            <NoPlaceHolder label="notifications" />
          </div>
        )}
      </div> */}
      <p className="text-sm ">You have no notifications yet</p>
    </div>
  );
}
