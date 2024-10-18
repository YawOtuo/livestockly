"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useAppStore } from "@/lib/store/useAppStore";
import { LivestockCategory } from "@/lib/types/livestockcategory";
import CustomTabs from "@/components/ui/CustomTabs";
import RecordsAllTab from "./components.tsx/RecordsAllTab";
import dynamic from "next/dynamic";
const SlideEnter = dynamic(() => import("@/lib/framer/slideEnter"));
const RecordsCatFeedingSchedulesTab = dynamic(
  () => import("./components.tsx/RecordsCatFeedingSchedulesTab")
);
const RecordsCategoryVaccinationsSchedulesTab = dynamic(
  () => import("./components.tsx/RecordsCategoryVaccinationsSchedulesTab")
);
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
                  content: (
                    <RecordsCategoryVaccinationsSchedulesTab
                      category={category}
                    />
                  ),
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
