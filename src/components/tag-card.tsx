import Link from "next/link";
import React from "react";
import { LuTag } from "react-icons/lu";

type Props = {
  record: any;
};

const TagCard: React.FC<Props> = ({ record }: Props) => {
  return (
    <Link href={`/dashboard/records/${record?.type}/${record?.id}`}>
      <div className="flex flex-row text-center w-full items-center justify-center py-5 shadow-sm gap-5 pr-10 ">
        <LuTag size="30" color="#0FA958" />
        <span className="capitalize">{record?.name}</span>
      </div>
    </Link>
  );
};

export default TagCard;
