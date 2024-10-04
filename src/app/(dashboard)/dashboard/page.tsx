"use client";
import { useQueries, useQuery } from "@tanstack/react-query";
import TotalSales from "../components/TotalSales";
import RecentlyRegistered from "../components/RecentlyRegistered";
import IconButton from "@/components/IconButton";
import AddRecordModal from "@/components/AddRecordModal";
import { GetAllFarmRecordsSp, GetAllFarmUsersAccepted } from "@/lib/api/farm";
import useIsLoggedInReRoute from "@/lib/hooks/useIsLoggedInReRoute";
import { PermissionComponent } from "@/components/permission-component";
import { useAppStore } from "@/lib/store/useAppStore";
import { useGetUserFarmDetails } from "@/lib/hooks/useFarm";
import Link from "next/link";

type Props = {};

export default function Page({ searchParams }: any) {
  const isLoggedIn = useIsLoggedInReRoute(false, "/login");
  const { DBDetails } = useAppStore();
  const { data: farm } = useGetUserFarmDetails();

  const livestockDataQueries = useQueries({
    queries:
      farm?.livestock_categories?.map((category) => ({
        queryKey: [category.name.toLowerCase()],
        queryFn: () =>
          GetAllFarmRecordsSp(
            DBDetails?.farm_id as number,
            category.name.toLowerCase()
          ),
        enabled: !!farm?.id && !!DBDetails?.farm_id,
      })) ?? [],
  });

  const { isLoading: isLoadingWorkers, data: workers } = useQuery(
    ["workers"],
    () => GetAllFarmUsersAccepted(DBDetails?.farm_id as number),
    {
      enabled: !!DBDetails?.farm_id,
    }
  );

  return (
    <div className="p-5 px-5 lg:px-10 w-full flex flex-col gap-5">
      <div className="flex gap-5 lg:gap-5 justify-start items-center w-full flex-wrap">
        {/* Render TotalSales for each livestock category */}
        {livestockDataQueries?.map((query, index) => {
          const isLoading = query.isLoading;
          const records = query.data;
          const error = query.error;

          return (
            <TotalSales
              key={index}
              amount={records?.length || 0}
              filter={farm?.livestock_categories[index]?.name as string}
              url={`/dashboard/records/${farm?.livestock_categories[
                index
              ]?.name.toLowerCase()}/category/${
                farm?.livestock_categories[index]?.id
              }`}
            />
          );
        })}

        <TotalSales
          amount={workers?.length as number}
          filter="Workers"
          url="/dashboard"
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-4xl font-semibold break-all">
          Welcome <span className="text-primary ">{DBDetails?.username}</span>,
        </p>
        <p className="text-xs">What would you like to do today?</p>
      </div>

      <div className="flex gap-5 flex-wrap items-center justify-start">
        <div className="col-span-3 lg:col-span-1">
          <AddRecordModal title="Add a record" />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <Link href={"/dashboard/records"}>
            <IconButton reverse label="View all animals" icon="arrow-right" />
          </Link>{" "}
        </div>
        <PermissionComponent level={3}>
          <div className="col-span-3 lg:col-span-1">
            <Link href={"/dashboard/workers"}>
              <IconButton reverse label="View all workers" icon="arrow-right" />
            </Link>
          </div>
        </PermissionComponent>
      </div>

      <div className="">
        <RecentlyRegistered />
      </div>
    </div>
  );
}
