"use client";
import { CustomLoaders } from "@/components/Loaders";
import {
  GetAllFarmUsersAccepted,
  GetAllFarmUsersUnaccepted,
} from "@/lib/api/farm";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store/useAppStore";
import WorkersSearch from "./components/WorkersSearch";
import WorkersUnaccepted from "./components/WorkersUnaccepted";
import SkeletonWorkerCard from "./components/SkeletonWorkerCard";
import NullComponent from "@/components/ui/NullComponent";
import FetchingState from "@/components/ui/FetchingState";

const WorkersDialog = dynamic(() => import("./components/WorkerDialog"));

function Page() {
  const { DBDetails } = useAppStore();

  const {
    isLoading: isLoadingWorkers,
    error: errorWorkers,
    data: workers,
  } = useQuery(
    ["workers"],
    () => GetAllFarmUsersAccepted(DBDetails?.farm_id as number),
    {
      enabled: !!DBDetails?.id,
    }
  );

  return (
    <div className="flex flex-col gap-5 p-5">
      <WorkersSearch />
      <WorkersUnaccepted />
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-lg font-semibold  text-green1">All Workers</h2>
        <div>
          <FetchingState
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5 items-center justify-start w-full"
            skeletonCount={5}
            success={
              (workers?.length  ?? 0 > 0) &&
              workers?.map((r, index) => (
                <WorkersDialog worker={r} key={index} />
              ))
            }
            isError={errorWorkers}
            loading={<SkeletonWorkerCard />}
            isLoading={isLoadingWorkers}
            nullComponent={<NullComponent />}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
