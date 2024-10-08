import Link from "next/link";
import React from "react";
import { LuTag } from "react-icons/lu";

type Props = {
  record: any;
};

const TagCard: React.FC<Props> = ({ record }: Props) => {
  return (
    <Link href={`/dashboard/records/${record?.category?.name}/${record?.id}`} className="">
      <div className="flex flex-row text-center w-full items-center justify-center py-5 shadow-md shadow-green2 gap-5 pr-10 hover:bg-green2 rounded-lg">
        <LuTag size="30" className="text-green1" />

        <span className="capitalize">{record?.name}</span>
      </div>
    </Link>
  );
};

export default TagCard;
