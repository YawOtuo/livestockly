import Link from "next/link";
// import AddRecordModal from './add-record-modal'
import { useState } from "react";
import React from "react";
import AddRecordModal from "./AddRecordModal";

const rightArrow = "/icons/arrow-right.png";

type Props = {
  type: string;
  number: number;
  icon: string;
};
export const RecordCard = ({ type, icon, number }: Props) => {
  return (
    <div className="record-card relative">
      <div className="shadow-md text-center py-5 px-5 mt-5 flex flex-row justify-between">
        <Link href={`/dashboard/records/${type}`}>
          <div className="flex flex-row text-center items-center ">
            <div className="">
              <img src={icon} width="50%" />
            </div>
            <div className="text-uppercase w-full">
              {" "}
              {type} ({number})
            </div>
          </div>
        </Link>

        <div className="flex flex-row text-center items-center ">
          <div>
            <AddRecordModal type={type} />
          </div>

          <div>
            <Link href={`/dashboard/records/${type}`}>
              <div className="">
                <img src={rightArrow} width="50%" />
              </div>
            </Link>
          </div>
          {/* <div className='absolute right-0 h-full' >
                        <img src='/greenFrame.svg' width={"100"} height={"100%"}></img>
                    </div> */}
        </div>
      </div>
    </div>
  );
};
