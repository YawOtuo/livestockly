"use client";

import NoPlaceHolder from "@/components/NoPlaceHolder";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSelector } from "react-redux";
import NotificationCard from "../../components/NotificationCard";
import { GetUserNotifications } from "@/lib/api/notifications";
import useNotifications from "@/lib/hooks/useNotifications";
import { RootState } from "@/lib/redux/store";
import FetchingState from "@/components/ui/FetchingState";
import SkeletonNotifications from "./components/SkeletonNotifications";

export default function Page() {
  const { notifications, isLoading, error } = useNotifications();
  return (
    <div className="flex flex-col gap-5 w-full justify-start px-5 lg:px-10 py-5">
      <div className="flex gap-5 font-[400] items-center">
        <p className="font-semibold text-green1 text-xl">Notifcations</p>
        {/* {items?.length > 1 && (
          <div className="bg-yellow1 rounded-full aspect-square w-[30px] flex items-center justify-center">
            <p className="text-white font-semibold">{items?.length}</p>
          </div>
        )} */}
      </div>

      <div className="flex flex-col gap-5 w-full h-full">
        <FetchingState
          className="flex flex-col gap-5 w-full"
          skeletonCount={10}
          success={notifications?.map((r, index: number) => (
            <NotificationCard notification={r} key={index} />
          ))}
          loading={<SkeletonNotifications />}
          isLoading={isLoading}
          isError={error}
        />
      </div>
    </div>
  );
}
