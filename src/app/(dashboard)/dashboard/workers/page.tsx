"use client";
import { CustomLoaders } from "@/components/Loaders";
import {
  GetAllFarmUsersAccepted,
  GetAllFarmUsersUnaccepted,
} from "@/lib/api/farm";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import WorkerAccordion from "./components/WorkerAccordion";
import { RootState } from "@/lib/redux/store";
import { useAppStore } from "@/lib/store/useAppStore";

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
      enabled: !!DBDetails?.farm_id,
    }
  );
  const {
    isLoading: isLoadingUnaccepted,
    error: errorUnaccepted,
    data: unaccepted,
  } = useQuery(
    ["workers-unaccepted"],
    () => GetAllFarmUsersUnaccepted(DBDetails?.farm_id as number),
    {
      enabled: !!DBDetails?.farm_id,
    }
  );
  return (
    <div className="flex flex-col gap-5 px-5">
      <div className="flex flex-col gap-4 mt-5 ">
        <p className="text-lg font-semibold border-b-2 text-green1">
          Pending Users
        </p>
        <div className="flex flex-wrap gap-5 items-center justify-start">
          {isLoadingWorkers && (
            <CustomLoaders variant="syncloader" colour="green1" />
          )}
          {unaccepted?.length &&
            unaccepted?.map((r, index) => (
              <WorkerAccordion worker={r} key={index} />
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold border-b-2 text-green1">
          All Workers
        </p>
        <div className="flex flex-wrap gap-5 items-center justify-start">
          {isLoadingWorkers && (
            <CustomLoaders variant="syncloader" colour="green1" />
          )}

          {workers?.length &&
            workers?.map((r, index) => (
              <WorkerAccordion worker={r} accepted key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
