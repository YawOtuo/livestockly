"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TotalSales from "../components/TotalSales";
import RecentlyRegistered from "../components/RecentyRegistered";
import Link from "next/link";
import { Logout } from "@/lib/utils/firebase";
import { useSelector } from "react-redux";
import LargeButtons from "../components/LargeButtons";
import RecentlyRegisteredSm from "../components/RecentlyRegisteredSm";

import { useJsonCompletenessCheck } from "@/lib/hooks/useJsonCompletenessCheck";
import IconButton from "@/components/IconButton";
import AddRecordModal from "@/components/add-record-modal";
import {
  GetAllFarmRecords,
  GetAllFarmRecordsSp,
  GetAllFarmUsersAccepted,
} from "@/lib/api/farm";
import useIsLoggedInReRoute from "@/lib/hooks/useIsLoggedInReRoute";
import { PermissionComponent } from "@/components/permission-component";

type Props = {};

export default function Profile({ searchParams }: any) {
  // const [dogs, setDogs] = useState()  const isLoggedIn = useIsLoggedInReRoute(true, '/dashboard')

  const isLoggedIn = useIsLoggedInReRoute(false, "/login");

  const userSqlData = useSelector((state) => state?.users?.userSqlData);
  const accountDataComplete = useJsonCompletenessCheck(userSqlData || {});
  const {
    isLoading: isLoadingRecords,
    error: errorRecords,
    data: records,
  } = useQuery(["records"], () => GetAllFarmRecords(userSqlData?.farm_id), {
    enabled: !!userSqlData?.farm_id,
  });

  const {
    isLoading: isLoadingCattle,
    error: errorCattle,
    data: cattle,
  } = useQuery(["cattle"], () => GetAllFarmRecordsSp("cattle"), {
    enabled: !!userSqlData?.farm_id,
  });
  const {
    isLoading: isLoadingGoats,
    error: errorGoats,
    data: goats,
  } = useQuery(["goats"], () => GetAllFarmRecordsSp("goats"), {
    enabled: !!userSqlData?.farm_id,
  });
  const {
    isLoading: isLoadingSheep,
    error: errorSheep,
    data: sheep,
  } = useQuery(["sheep"], () => GetAllFarmRecordsSp("sheep"), {
    enabled: !!userSqlData?.farm_id,
  });
  const {
    isLoading: isLoadingWorkers,
    error: errorWorkers,
    data: workers,
  } = useQuery(
    ["workers"],
    () => GetAllFarmUsersAccepted(userSqlData?.farm_id),
    {
      enabled: !!userSqlData?.farm_id,
    }
  );

  useEffect(() => {}, [userSqlData]);

  return (
    <div className="p-10 px-5 lg:px-10 w-full flex flex-col">
      <div className="flex flex-col gap-1">
        <p className="text-4xl font-semibold">
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

      <div className="flex gap-24 flex-col lg:flex-row justify-start items-center my-5 border-y-2 ">
        <TotalSales
          amount={sheep?.length}
          filter="Sheep"
          url="/dashboard/records/sheep"
        />
        <TotalSales
          amount={goats?.length}
          filter="Goats"
          url="/dashboard/records/goats"
        />
        <TotalSales
          amount={cattle?.length}
          filter="Cattle"
          url="/dashboard/records/cattle"
        />
        <TotalSales
          amount={workers?.length}
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
