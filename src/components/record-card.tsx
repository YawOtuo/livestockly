import Link from "next/link";
// import AddRecordModal from './add-record-modal'
import { useState } from "react";
import React from "react";
import AddRecordModal from "./AddRecordModal";
import {
  GiChicken,
  GiCow,
  GiFlatfish,
  GiGoat,
  GiPig,
  GiRabbit,
  GiSheep,
  GiSnail,
} from "react-icons/gi";
import { LivestockCategory } from "@/lib/types/livestockcategory";
import { IoFishSharp } from "react-icons/io5";

const rightArrow = "/icons/arrow-right.png";

type Props = {
  category: LivestockCategory;
  number: number;
  // icon: string;
};

const icons: any = {
  goats: <GiGoat />,
  sheep: <GiSheep />,
  cattle: <GiCow />,
  poultry: <GiChicken />,
  pigs: <GiPig />,
  tilapia: <IoFishSharp />,
  catfish: <GiFlatfish />,
  "guinea fowl": <GiChicken />,
  "guinea pig": <GiPig />,
  turkey: <GiChicken />,
  rabbit: <GiRabbit />,
  snail: <GiSnail />,
};
export const RecordCard = ({ category, number }: Props) => {
  return (
    <div className="record-card relative">
      <div className="shadow-md text-center py-5 px-5 mt-5 flex flex-row justify-between">
        <Link
          href={`/dashboard/records/${category?.name}/category/${category?.id}`}>
          <div className="flex flex-row text-center items-center gap-3  ">
            <div className="text-2xl text-primary">{icons[category?.name]}</div>
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
