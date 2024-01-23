"use client";

import IconButton from "@/components/Buttons/IconButton";
import DogCard from "@/components/DogCard.tsx";
import NoPlaceHolder from "@/components/NoPlaceHolder";
import { fetchDogs } from "@/lib/api/dogs";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Page() {
  const {
    isLoading,
    error,
    data: items,
  } = useQuery(["adverts"], () => fetchDogs());
  return (
    <div className="flex flex-col gap-5 w-full justify-start px-5 lg:px-10 py-5" >
      <div className="flex gap-5 font-[400] items-center">
        <p>Messages</p>
        <IconButton label="add" variant="add" />
      </div>

      <div className="flex gap-5 w-full h-full">
        <div className="flex w-full  h-[50vh]">
          <NoPlaceHolder label="messages" />
        </div>
      </div>
    </div>
  );
}
