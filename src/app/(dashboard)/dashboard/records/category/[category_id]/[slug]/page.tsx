"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import TagCard from "@/components/TagCard";
import { DashSearch } from "@/components/dash-search";
import Navbar from "../../../../../components/HorizontalAndMobileNavbar";
import SlideEnter from "@/lib/framer/slideEnter";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GetAllFarmRecordsSp } from "@/lib/api/farm";
import { useAppStore } from "@/lib/store/useAppStore";
import { LivestockCategory } from "@/lib/types/livestockcategory";
import CustomTabs from "@/components/ui/CustomTabs";
import RecordsAllTab from "./components.tsx/RecordsAllTab";
import RecordsCatFeedingSchedulesTab from "./components.tsx/RecordsCatFeedingSchedulesTab";
import RecordsCategoryVaccinationsSchedulesTab from "./components.tsx/RecordsCategoryVaccinationsSchedulesTab";

type Props = {};

const Page = ({}: Props) => {
  const { DBDetails } = useAppStore();
  const params = useParams();
  let type = decodeURIComponent(String(params?.slug));

  // Extracting the type dynamically from params
  const [category, setCategory] = useState<LivestockCategory>({
    id: Number(params?.category_id),
    name: params?.category as string,
  });

  // Fetching records based on the farm ID and the dynamic type

  // Dynamic rendering of records

  return (
    <>
      <SlideEnter>
        <div className="flex flex-col items-start gap-5 text-center py-5">
          <p>My {type}</p>

          <div className="flex flex-col gap-5 items-start w-full">
            <CustomTabs
            className="flex justify-start flex-col"
              defaultValue="all"
              tabs={[
                {
                  label: "All",
                  value: "all",
                  content: <RecordsAllTab category={category} />,
                },
                {
                  label: "Vaccination Schedules",
                  value: "vaccination",
                  content: <RecordsCategoryVaccinationsSchedulesTab  category={category}/>,
                },
                {
                  label: "Feeding Schedules",
                  value: "feeding",
                  content: <RecordsCatFeedingSchedulesTab />,
                },
              ]}
            />
          </div>
        </div>
      </SlideEnter>
    </>
  );
};

export default Page;
