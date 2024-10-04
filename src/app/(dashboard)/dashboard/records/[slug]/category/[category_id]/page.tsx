"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import TagCard from "@/components/tag-card";
import { DashSearch } from "@/components/dash-search";
import Navbar from "../../../../../components/HorizontalAndMobileNavbar";
import SlideEnter from "@/lib/framer/slideEnter";
import AddRecordModal from "@/components/AddRecordModal";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GetAllFarmRecordsSp } from "@/lib/api/farm";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useAppStore } from "@/lib/store/useAppStore";
import { LivestockCategory } from "@/lib/types/livestockcategory";

type Props = {};

const Page = ({}: Props) => {
  const params = useParams();
  const { DBDetails } = useAppStore();

  // Extracting the type dynamically from params
  let type = decodeURIComponent(String(params?.slug));
  const [category, setCategory] = useState<LivestockCategory>({
    id: Number(params?.category_id),
    name: params?.category as string,
  });

  // Fetching records based on the farm ID and the dynamic type
  const {
    isLoading,
    error,
    data: records,
  } = useQuery(
    [type], // Query key based on dynamic type
    () => GetAllFarmRecordsSp(DBDetails?.farm_id as number, type as string),
    {
      enabled: !!type, // Enable the query only when type is available
    }
  );

  // Dynamic rendering of records
  const renderList = (
    <div className="grid grid-cols-3 gap-5 px-3">
      {records &&
        records?.map((item: any, index: number) => (
          <div className="col-span-3 lg:col-span-1 items-center" key={index}>
            <TagCard record={item} />
          </div>
        ))}
    </div>
  );

  return (
    <>
      <SlideEnter>
        <div className="container mx-auto text-center py-5">
          <DashSearch />

          <div className="pb-3 flex items-center justify-center">
            <p>
              Displaying all
              <span className="brand-green-font"> {records?.length}</span>{" "}
            <span className="capitalize">  {type}</span>
            </p>
            {category && <AddRecordModal variant="icon" category={category} />}{" "}
          </div>
          <div className="">
            <div className="justify-center items-center">{renderList}</div>
          </div>
        </div>
      </SlideEnter>
    </>
  );
};

export default Page;
