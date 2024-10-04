import Link from "next/link";
import React from "react";
import { LuTag } from "react-icons/lu";

import CaSheep from "./icons/CaSheep";
import CaGoat from "./icons/CaGoat";
import CaCattle from "./icons/CaCattle";
import { CiCalendarDate } from "react-icons/ci";

import { Record } from "@/lib/types/record";

type Props = {
  record: Record;
};

const TagCardSpecific: React.FC<Props> = ({ record }: Props) => {
  const types: any = {
    sheep: <CaSheep width={30} />,
    goats: <CaGoat width={30} />,
    cattle: <CaCattle width={30} />,
  };
  return (
    <Link href={`/dashboard/records/${record?.category.name}/${record?.id}`}>
      <div className="flex flex-row text-center w-full items-center justify-start py-4 border-[1px] rounded-md gap-5 px-5 hover:bg-green2">
        {types[record?.category.name]}

        <span className="capitalize  ">{record?.name}</span>
        {/* <div className="flex items-center gap-5">
          <CiCalendarDate size={20} className="text-green1" />

          <p>{record.date_of_birth}</p>
        </div> */}
      </div>
    </Link>
  );
};

export default TagCardSpecific;
