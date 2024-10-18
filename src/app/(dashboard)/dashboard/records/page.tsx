"use client";
import React from "react";
import { DashSearch } from "@/components/dash-search";
import { RecordCard } from "@/components/record-card";
import { useQueries } from "@tanstack/react-query";
import { GetAllFarmRecordsSp } from "@/lib/api/farm";
import { useAppStore } from "@/lib/store/useAppStore";
import { useGetUserFarmDetails } from "@/lib/hooks/useFarm";
import dynamic from "next/dynamic";

const SlideEnter = dynamic(
  () => import("@/lib/framer/slideEnter")
);
const Page = () => {
  // const { DBDetails } = useAppStore();

  // Fetch the farm details using a custom hook
  const { data: farm } = useGetUserFarmDetails();

  // Use useQueries to fetch records for each livestock category
  const livestockDataQueries = useQueries({
    queries: farm?.livestock_categories?.map((category) => ({
      queryKey: [category.name.toLowerCase()],
      queryFn: () =>
        GetAllFarmRecordsSp(
          farm?.id as number,
          category.name.toLowerCase()
        ),
      enabled: !!farm?.id  // Ensure both IDs are available
    })) ?? [],
  });

  return (
    <>
      <SlideEnter>
        <div className="flex flex-col justify-center items-center w-full lg:w-3/5 gap-5">
          <div className="w-full flex items-start">
            <p>Displaying <span className="text-primary">{farm?.livestock_categories.length}</span> categories of livestock</p>
          </div>
          <div className="w-full flex flex-col gap-5 lg:gap-5">
            {farm?.livestock_categories?.map((category, index) => {
              const queryData = livestockDataQueries[index]; // Get the data for each category
              return (
                <div className="" key={category.name}>
                  <RecordCard
                    number={queryData.data?.length || 0} // Use the query data length
                    category={category} 
                  />
                </div>
              );
            })}
          </div>
        </div>
      </SlideEnter>
    </>
  );
};

export default Page;
