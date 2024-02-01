import Link from "next/link";
import React from "react";
import { LuTag } from "react-icons/lu";

import CaSheep from "./icons/CaSheep";
import CaGoat from "./icons/CaGoat";
import CaCattle from "./icons/CaCattle";

type Props = {
  record: any;
};

const TagCardSpecific: React.FC<Props> = ({ record }: Props) => {
  const types: any = {
    sheep: (
        <CaSheep width={30}/>
    ),
    goats: <CaGoat width={30} />,
    cattle: <CaCattle width={30} />,
  };
  return (
    <Link href={`/dashboard/records/${record?.type}/${record?.id}`}>
      <div className="flex flex-row text-center w-full items-center justify-center py-5 shadow-sm gap-5 pr-10  hover:bg-green2">
        {types[record?.type]}

        <span className="capitalize  ">{record?.name}</span>
      </div>
    </Link>
  );
};

export default TagCardSpecific;
