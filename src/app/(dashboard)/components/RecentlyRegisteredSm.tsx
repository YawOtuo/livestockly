"use client";
import TagCardSpecific from "@/components/TagCardSpecific";
import TagCard from "@/components/tag-card";
import { GetAllFarmRecords } from "@/lib/api/farm";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

export default function RecentlyRegisteredSm() {
  const userSqlData = useSelector((state) => state?.users?.userSqlData);

  const {
    isLoading: isLoadingRecords,
    error: errorRecords,
    data: records,
  } = useQuery(["records"], () => GetAllFarmRecords(userSqlData?.farm_id), {
    enabled: !!userSqlData?.farm_id,
  });

  return (
    <div className="w-full px-5">
      <div className="flex gap-5 items-center mb-5">
        <p className="text-xs ">Newly Registered </p>
        <Link href={"/profile/my-dogs"}>
          <Button variant="outlined" className="!text-green1">See All</Button>
        </Link>{" "}
      </div>{" "}
      <Swiper spaceBetween={25} className="w-full">
        {records?.slice(0, 3).map((r: any, index: any) => (
          <SwiperSlide key={index} className="w-full">
            <TagCardSpecific key={index} record={r} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
