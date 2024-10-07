"use client";
import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SlideEnter from "@/lib/framer/slideEnter";
import { DashSearch } from "@/components/dash-search";
import { RecordCard } from "@/components/record-card";
import { useQueries } from "@tanstack/react-query";
import { GetAllFarmRecordsSp } from "@/lib/api/farm";
import { useAppStore } from "@/lib/store/useAppStore";
import { useGetUserFarmDetails } from "@/lib/hooks/useFarm";

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
        <div className="flex flex-col justify-center items-center w-full">
          <div className="w-full">
            <DashSearch />
          </div>
          <div className="w-4/5 md:w-3/5 flex flex-col gap-5 lg:gap-5">
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
