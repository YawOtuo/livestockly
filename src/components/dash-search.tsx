import axios from "axios";
import { useEffect, useState } from "react";
import cattleIcon from "../icons/cattle.png";
import goatIcon from "../icons/goat.png";
import sheepIcon from "../icons/sheep.png";
import CaGoat from "./icons/CaGoat";
import CaSheep from "./icons/CaSheep";
import CaCattle from "./icons/CaCattle";
import { useRouter } from "next/navigation";
import { url } from "../../weburl";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { searchRecords } from "@/lib/api/record";
import Link from "next/link";
import { RootState } from "@/lib/redux/store";
import CustomInput from "./ui/CustomInput";
import { Input } from "./ui/input";
import { useAppStore } from "@/lib/store/useAppStore";

export const DashSearch = () => {
  const [keyword, setKeyWord] = useState("");

  const { DBDetails } = useAppStore();

  const {
    isLoading: isSearching,
    error: errorSearch,
    data: searches,
  } = useQuery(
    [`search-${keyword}`],
    () => searchRecords(DBDetails?.farm_id as number, keyword),
    {
      enabled: !!DBDetails?.farm_id && !!keyword,
    }
  );

  const router = useRouter();

  const displayResults = () => {
    return searches?.map((item, index) => {
      return (
        <Link
          key={index}
          className="flex flex-row items-center gap-2 py-10 lg:py-20 px-5 min-w-[300px] "
          href={`/dashboard/records/${item?.category?.name}/${item?.["id"]}`}>
          {item?.category?.name == "goats" && <CaGoat />}
          {item?.category?.name == "sheep" && <CaSheep />}
          {item?.category?.name == "cattle" && <CaCattle />}

          {item["name"]}
        </Link>
      );
    });
  };

  return (
    <div
      className="w-full mb-10 flex flex-col 
        justify-center items-center">
      <Input
        type="text"
        onChange={(e) => setKeyWord(e.target.value)}
        placeholder="Search"
        className="
       
            w-4/5 md:w-1/2 
             py-2 pl-5 pr-2 h-[40px] rounded-2xl"
      />
      {errorSearch ? (
        <p>No results found</p>
      ) : (
        <div className="flex flex-wrap w-full justify-center bg-slate-200">
          {displayResults()}
        </div>
      )}
    </div>
  );
};
