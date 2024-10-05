import Link from "next/link";
// import AddRecordModal from './add-record-modal'
import { useState } from "react";
import React from "react";

import { LivestockCategory } from "@/lib/types/livestockcategory";
import { IoFishSharp } from "react-icons/io5";
import dynamic from "next/dynamic";
import { categoryIcons } from "@/lib/utils/categoryicons";
const rightArrow = "/icons/arrow-right.png";
const AddRecordModal = dynamic(() => import("./AddRecordModal"));

type Props = {
  category: LivestockCategory;
  number: number;
  // icon: string;
};



export const RecordCard = ({ category, number }: Props) => {
  return (
    <div className="record-card relative">
      <div className="shadow-md text-center py-5 px-5 mt-5 flex flex-row justify-between">
        <Link
          href={`/dashboard/records/${category?.name}/category/${category?.id}`}>
          <div className="flex flex-row text-center items-center gap-3  ">
            <div className="text-2xl text-primary">{categoryIcons[category?.name]}</div>
            <div className="text-uppercase w-full capitalize">
              {" "}
              {category?.name} ({number})
            </div>
          </div>
        </Link>

        <div className="flex flex-row text-center items-center ">
          <div>
            <AddRecordModal variant="icon" category={category} />
          </div>

          <div>
            <Link
              href={`/dashboard/records/${category?.name}/category/${category.id}`}>
              <div className="">
                <img src={rightArrow} width="50%" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
