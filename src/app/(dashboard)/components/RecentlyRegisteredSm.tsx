"use client";
import { TagCard } from "@/components/tag-card";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

export default function RecentlyRegisteredSm() {
  const userSqlData = useSelector((state) => state?.users?.userSqlData);

  // const {
  //   isLoading: userDogsIsLoading,
  //   error: userDogsIsLoadingError,
  //   data: recentDogs,
  // } = useQuery(
  //   ["dogs", userSqlData?.id], // Pass userSqlData?.id as part of the query key
  //   () => fetchDogsByUser(userSqlData?.id),
  //   {
  //     enabled: !!userSqlData?.id, // Enable the query only if userSqlData?.id is truthy
  //   }
  // );
  return (
    <div className="w-full px-5">
      <div className="flex gap-5 items-center mb-5">
        <p className="text-md ">Newly Registered </p>
        <Link href={"/profile/my-dogs"}>
          <Button variant="outlined" >See All</Button>
        </Link>{" "}
      </div>{" "}
      <Swiper spaceBetween={25} className="w-full">
        {/* {recentDogs?.slice(0, 3).map((r: any, index: any) => (
          <SwiperSlide key={index} className="w-full">
            <TagCard key={index} dog={r} />
          </SwiperSlide>
        ))} */}
      </Swiper>
    </div>
  );
}
