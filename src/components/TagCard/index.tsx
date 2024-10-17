import React from "react";
import { LuTag } from "react-icons/lu";
import Link from "next/link";

type Props = {
  record: any;
  selected: boolean;
  asLink: boolean;
};

const TagCard: React.FC<Props> = ({
  record,
  selected,
  asLink = true,
}: Props) => {
  const classes: any = {
    selected: "bg-primary text-white transition-all duration-300 hover:bg-primary-900",
    "not-selected": "hover:bg-green2",
  };
  const iconClasses: any = {
    selected: "",
    "not-selected": "text-primary",
  };
  const cardContent = (
    <div
      className={`flex flex-row text-center w-full items-center justify-start shadow-lg border-[1px] px-5 py-5 shadow-green2 gap-5 pr-10  rounded-lg ${
        selected ? classes["selected"] : classes["not-selected"]
      }`}>
      <LuTag
        size="30"
        className={`${
          selected ? iconClasses["selected"] : iconClasses["not-selected"]
        }`}
      />
      <span className="capitalize">{record?.name}</span>
    </div>
  );

  if (!asLink) {
    return cardContent;
  }

  return (
    <Link
      href={`/dashboard/records/category/${record?.category?.id}/${record?.category?.name}/${record?.id}`}>
      {cardContent}
    </Link>
  );
};

export default TagCard;
