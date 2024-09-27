import IconButton from "@/components/IconButton";
import TagCardSpecific from "@/components/TagCardSpecific";
import TagCard from "@/components/tag-card";
import FetchingState from "@/components/ui/FetchingState";
import { GetAllFarmRecords } from "@/lib/api/farm";
import { RootState } from "@/lib/redux/store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { useSelector } from "react-redux";

export default function RecentlyRegistered() {
  const userSqlData = useSelector(
    (state: RootState) => state?.users?.userSqlData
  );

  const {
    isLoading: isLoadingRecords,
    error: errorRecords,
    data: records,
  } = useQuery(
    ["records"],
    () => GetAllFarmRecords(userSqlData?.farm_id as number),
    {
      enabled: !!userSqlData?.farm_id,
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
        className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5 justify-start w-full"
        success={records?.slice(0, 9).map((r: any, index: any) => (
          <TagCardSpecific key={index} record={r} />
        ))}
      />
 
    </div>
  );
}
