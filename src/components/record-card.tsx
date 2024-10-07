import Link from "next/link";
// import AddRecordModal from './add-record-modal'
import { useState } from "react";
import React from "react";

import { LivestockCategory } from "@/lib/types/livestockcategory";
import { IoFishSharp } from "react-icons/io5";
import dynamic from "next/dynamic";
import { categoryIcons } from "@/lib/utils/categoryicons";
import { MdKeyboardArrowRight } from "react-icons/md";
const rightArrow = "/icons/arrow-right.png";
const AddRecordModal = dynamic(() => import("./modals/AddRecordModal"));

type Props = {
  category: LivestockCategory;
  number: number;
  // icon: string;
};

export const RecordCard = ({ category, number }: Props) => {
  return (
    <div className="shadow-md shadow-green2 text-center py-3 px-5  flex flex-row justify-between items-center rounded-lg hover:bg-green2 hover:text-white group transition-all duration-200" >
      <Link
        href={`/dashboard/records/${category?.name}/category/${category?.id}`}>
        <div className="flex flex-row text-center items-center gap-3  ">
          <div className="text-2xl text-primary group-hover:text-primary">
            {categoryIcons[category?.name]}
          </div>
          <div className="text-uppercase w-full capitalize group-hover:text-primary">
            {" "}
            {category?.name} ({number})
          </div>
        </div>
      </Link>

      <div className="flex flex-row text-center items-center ">
        <div>
          <AddRecordModal variant="icon" iconClassname="group-hover:text-primary" category={category} />
        </div>

        <div>
          <Link
            href={`/dashboard/records/${category?.name}/category/${category.id}`}>
            <MdKeyboardArrowRight className="text-2xl group-hover:text-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
};
