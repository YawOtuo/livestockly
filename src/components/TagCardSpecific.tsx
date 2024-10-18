import Link from "next/link";
import React from "react";

import { Record } from "@/lib/types/record";
import { categoryIcons } from "@/lib/utils/categoryicons";

type Props = {
  record: Record;
};

const TagCardSpecific: React.FC<Props> = ({ record }: Props) => {
  return (
    <Link
      href={`/dashboard/records/category/${record?.category?.id}/${record?.category.name}/${record?.id}`}>
      <div className="flex flex-row text-center w-full items-center justify-start py-4 shadow border- rounded-md gap-5 px-5 hover:bg-green2 ">
        <span className="text-primary text-2xl">
          {" "}
          {categoryIcons[record?.category.name]}
        </span>
        <div className="flex flex-col items-start">
          <p className="capitalize  ">{record?.name}</p>
          <p className="capitalize  text-xs text-slate-600">Tag Colour: {record?.tag_colour || "N/A"}</p>
        </div>

        {/* <div className="flex items-center gap-5">
          <CiCalendarDate size={20} className="text-green1" />

          <p>{record.date_of_birth}</p>
        </div> */}
      </div>
    </Link>
  );
};

export default TagCardSpecific;
