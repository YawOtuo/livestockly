import IconButton from "@/components/IconButton";
import TagCardSpecific from "@/components/TagCardSpecific";
import TagCard from "@/components/TagCard";
import FetchingState from "@/components/ui/FetchingState";
import { GetAllFarmRecords } from "@/lib/api/farm";
import { RootState } from "@/lib/redux/store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { useSelector } from "react-redux";
import SkRecentlyRegistered from "./SkRecentlyRegistered";
import { useAppStore } from "@/lib/store/useAppStore";

export default function RecentlyRegistered() {
  const { DBDetails } = useAppStore();

  const {
    isLoading: isLoadingRecords,
    error: errorRecords,
    data: records,
  } = useQuery(
    ["records"],
    () => GetAllFarmRecords(DBDetails?.farm_id as number),
    {
      enabled: !!DBDetails?.farm_id,
    }
  );

  return (
    <div className="py-5 w-full">
      <div className="flex gap-5 items-center">
        <p>Recently Registered</p>
        <IconButton
          label="See All"
          url={"/dashboard/records"}
          reverse
          icon={"arrow-right"}
        />{" "}
      </div>{" "}
      <FetchingState
        skeletonCount={5}
        isLoading={isLoadingRecords}
        isError={errorRecords}
        loading={<SkRecentlyRegistered />}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5 justify-start w-full"
        success={records && records?.slice(0, 9).map((r: any, index: any) => (
          <TagCardSpecific key={index} record={r} />
        ))}
      />
    </div>
  );
}
