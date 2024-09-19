"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TotalSales from "../components/TotalSales";
import RecentlyRegistered from "../components/RecentyRegistered";
import Link from "next/link";
import { useSelector } from "react-redux";
import LargeButtons from "../components/LargeButtons";
import RecentlyRegisteredSm from "../components/RecentlyRegisteredSm";

import { useJsonCompletenessCheck } from "@/lib/hooks/useJsonCompletenessCheck";
import IconButton from "@/components/IconButton";
import AddRecordModal from "@/components/AddRecordModal";
import {
  GetAllFarmRecords,
  GetAllFarmRecordsSp,
  GetAllFarmUsersAccepted,
} from "@/lib/api/farm";
import useIsLoggedInReRoute from "@/lib/hooks/useIsLoggedInReRoute";
import { PermissionComponent } from "@/components/permission-component";
import useFirebaseAuth from "@/lib/hooks/useFirebaseAuth";
import { RootState } from "@/lib/redux/store";

type Props = {};

export default function Profile({ searchParams }: any) {
  // const [dogs, setDogs] = useState()  const isLoggedIn = useIsLoggedInReRoute(true, '/dashboard')

  const isLoggedIn = useIsLoggedInReRoute(false, "/login");

  const userSqlData = useSelector((state : RootState) => state?.users?.userSqlData);
  const accountDataComplete = useJsonCompletenessCheck(userSqlData || {});
  const {
    isLoading: isLoadingRecords,
    error: errorRecords,
    data: records,
  } = useQuery(["records"], () => GetAllFarmRecords(userSqlData?.farm_id as number), {
    enabled: !!userSqlData?.farm_id,
  });

  const {
    isLoading: isLoadingCattle,
    error: errorCattle,
    data: cattle,
  } = useQuery(
    ["cattle"],
    () => GetAllFarmRecordsSp(userSqlData?.farm_id as number, "cattle"),
    {
      enabled: !!userSqlData?.farm_id,
    }
  );
  const {
    isLoading: isLoadingGoats,
    error: errorGoats,
    data: goats,
  } = useQuery(
    ["goats"],
    () => GetAllFarmRecordsSp(userSqlData?.farm_id as number, "goats"),
    {
      enabled: !!userSqlData?.farm_id,
    }
  );
  const {
    isLoading: isLoadingSheep,
    error: errorSheep,
    data: sheep,
  } = useQuery(
    ["sheep"],
    () => GetAllFarmRecordsSp(userSqlData?.farm_id as number, "sheep"),
    {
      enabled: !!userSqlData?.farm_id,
    }
  );
  const {
    isLoading: isLoadingWorkers,
    error: errorWorkers,
    data: workers,
  } = useQuery(
    ["workers"],
    () => GetAllFarmUsersAccepted(userSqlData?.farm_id as number),
    {
      enabled: !!userSqlData?.farm_id,
    }
  );

  useEffect(() => {}, [userSqlData]);

  return (
    <div className="p-10 px-5 lg:px-10 w-full flex flex-col">
      <div className="flex flex-col gap-1">
        <p className="text-4xl font-semibold break-all">
          Welcome {userSqlData?.username},
        </p>
        <p className="text-md">What would you like to do today?</p>
      </div>

      <div className=" mt-5 flex gap-5 flex-wrap items-center justify-start">
        <div className="col-span-3 lg:col-span-1">
          {" "}
          <AddRecordModal title="Add a record" />
        </div>{" "}
        <div className="col-span-3 lg:col-span-1">
          {" "}
          <IconButton
            reverse
            label="View all animals"
            icon="arrow-right"
            url="/dashboard/records"
          />
        </div>
        <PermissionComponent level={3}>
          <div className="col-span-3 lg:col-span-1">
            <IconButton
              reverse
              label="View all workers"
              icon="arrow-right"
              url="/dashboard/workers"
            />
          </div>
        </PermissionComponent>
        {/* {!accountDataComplete && (
          <div className="col-span-3 lg:col-span-1">
            <IconButton
              label="Complete your profile"
              icon="profile"
              url="/profile/account"
            />
          </div>
        )} */}
      </div>

      <div className="flex gap-5 lg:gap-16 flex-col lg:flex-row justify-start items-center my-5 lg:border-y-2 ">
        <TotalSales
          amount={sheep?.length as number}
          filter="Sheep"
          url="/dashboard/records/sheep"
        />
        <TotalSales
          amount={goats?.length as number}
          filter="Goats"
          url="/dashboard/records/goats"
        />
        <TotalSales
          amount={cattle?.length as number}
          filter="Cattle"
          url="/dashboard/records/cattle"
        />
        <TotalSales
          amount={workers?.length as number}
          filter="Workers"
          url="/dashboard"
        />
      </div>
      <div className="hidden lg:flex">
        <RecentlyRegistered />
      </div>
      <div className="lg:hidden">
        <RecentlyRegisteredSm />
      </div>
    </div>
  );
}
