import { styled } from "@stitches/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

type Props = {
  title: string;
  data: any;
};

const RecentRecords = ({ title, data }: Props) => {
  return (
    <Root>
      <div className="title text-left my-1 uppercase font-bold ">{title}</div>
      {data &&
        Object.keys(data).map((r) => (
          <Link
            href={`/dashboard/${data[r]["type"]}/${data[r]["id"]}`}
            className="flex gap-4 items-center">
            <div className="w-full text-left  capitalize py-2 px-2">
              {data[r]["name"]}
            </div>
            <IoIosArrowForward size={30} color="#0FA958" />
          </Link>
        ))}
    </Root>
  );
};

const Root = styled("div", {
  width: "100%",
  maxWidth: "330px",
  "& .title": {
    width: "100%",
    maxHeight: "30px",
    height: "100%",

    borderBottom: "1px solid #0FA958",
    backgroundColor: "#c0d3c029",
  },
});

export default RecentRecords;
