"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import  TagCard  from "@/components/tag-card";
import { DashSearch } from "@/components/dash-search";
import Navbar from "../../../components/navbar";
import SlideEnter from "@/lib/framer/slideEnter";
import AddRecordModal from "@/components/add-record-modal";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GetAllFarmRecordsSp } from "@/lib/api/farm";
import { useSelector } from "react-redux";

type Props = {

}

const Page = ({} : Props) => {
  const params = useParams();
  const userSqlData = useSelector((state) => state?.users?.userSqlData);

  let type = params?.slug 
  console.log(type)

  const {
    isLoading: isLoadingGoats,
    error: errorGoats,
    data: goats,
  } = useQuery(["goats"], () => GetAllFarmRecordsSp("goats"), {
    enabled: !!userSqlData?.farm_id,
  });
  const {
    isLoading: isLoadingCattle,
    error: errorCattle,
    data: cattle,
  } = useQuery(["cattle"], () => GetAllFarmRecordsSp("cattle"), {
    enabled: !!userSqlData?.farm_id,
  });
  const {
    isLoading: isLoadingSheep,
    error: errorSheep,
    data: sheep,
  } = useQuery(["sheep"], () => GetAllFarmRecordsSp("sheep"), {
    enabled: !!userSqlData?.farm_id,
  });

  const renderList: any = {
    sheep: (
      <div className="grid grid-cols-3 gap-5 px-3">
        {sheep?.map((item, index) => (
          <div className="col-span-3 lg:col-span-1 items-center" key={index}>
            <TagCard record={item} />
          </div>
        ))}
      </div>
    ),
    goats: (
      <div className="grid grid-cols-3 gap-5 px-3">
        {goats?.map((item, index) => (
          <div className="col-span-3 lg:col-span-1 items-center" key={index}>
            <TagCard record={item} />
          </div>
        ))}
      </div>
    ),
    cattle: (
      <div className="grid grid-cols-3 gap-5 px-3">
        {cattle?.map((item, index) => (
          <div className="col-span-3 lg:col-span-1 items-center" key={index}>
            <TagCard record={item} />
          </div>
        ))}
      </div>
    ),
  };

  const numberOptions: any = {
    sheep: sheep?.length,
    goats: goats?.length,
    cattle: cattle?.length,
  };

  return (
    <>
      <SlideEnter>
        <div className="container mx-auto text-center ">
          <DashSearch />

          <div className="pb-3 flex items-center justify-center">
            <p>
              Displaying all
              <span className="brand-green-font">
                {" "}
                {numberOptions[type]}
              </span>{" "}
              {type}
            </p>
            <AddRecordModal type={type} />
          </div>
          <div className="">
            <div
              className="justify-center items-center">
              {renderList[type]}
            </div>
          </div>
        </div>
      </SlideEnter>
    </>
  );
};

export default Page;
