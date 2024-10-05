import { GetAllFarmUsersUnaccepted } from "@/lib/api/farm";
import { useAppStore } from "@/lib/store/useAppStore";
import { isError, useQuery } from "@tanstack/react-query";
import FetchingState from "@/components/ui/FetchingState";
import NullComponent from "@/components/ui/NullComponent";
import SkeletonWorkerCard from "./SkeletonWorkerCard";
import dynamic from "next/dynamic";
import WorkerCard from "./WorkerDialog/WorkerCard";

const WorkersDialog = dynamic(() => import("./WorkerDialog"));
function WorkersUnaccepted() {
  const { DBDetails } = useAppStore();

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
    <>
      <div className="flex flex-col gap-4 ">
        {(unaccepted?.length ?? 0 > 0) && (
          <p className="text-lg font-semibold  text-green1 mt-5 ">Pending Users</p>
        )}
        <div className="flex flex-wrap gap-5 items-center justify-start">
          <FetchingState
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5 items-center justify-start w-full"
            skeletonCount={5}
            success={
              (unaccepted?.length ?? 0 > 0) &&
              unaccepted?.map((r, index) => (
                <WorkerCard worker={r} key={index} />
              ))
            }
            isError={errorUnaccepted}
            loading={<SkeletonWorkerCard />}
            isLoading={isLoadingUnaccepted}
            nullComponent={<NullComponent />}
          />
        </div>
      </div>
    </>
  );
}

export default WorkersUnaccepted;
