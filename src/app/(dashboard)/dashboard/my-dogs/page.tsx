"use client";
import DogCard from "@/components/DogCard.tsx";
import SearchInput from "@/components/SearchInput";
import { SearchForDogByUser, fetchDogs, fetchDogsByUser } from "@/lib/api/dogs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const userSqlData = useSelector((state) => state.users.userSqlData);
  const [keyword, setKeyWord] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const {
    isLoading: searchLoading,
    error: itemError,
    data: results,
  } = useQuery(
    ["search", keyword],
    () => SearchForDogByUser(userSqlData?.id, keyword),
    {
      enabled: !!keyword,
    }
  );
  const {
    isLoading,
    error,
    data: dogs,
  } = useQuery(
    ["dogs", userSqlData?.id], // Pass userSqlData?.id as part of the query key
    () => fetchDogsByUser(userSqlData?.id),
    {
      enabled: !!userSqlData?.id, // Enable the query only if userSqlData?.id is truthy
    }
  );

  useEffect(() => {
    setSearchResults(dogs);
  }, [dogs]);

  useEffect(() => {
    setSearchResults(results);
  }, [results]);
  return (
    <div className="p-10 px-5 lg:px-10 flex flex-col gap-5">
      <SearchInput action={(e) => setKeyWord(e.target.value)} />
      <div
        className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-10 gap-y-10 items-center justify-center
  ">
        {searchResults?.map((r, index) => (
          <div key={index} className="col-span-2 lg:col-span-1">
            <DogCard dog={r} edit />
          </div>
        ))}
        {isLoading && <p>Loading...</p>}
        {searchResults?.length < 1 && <p>No dog found</p>}
      </div>
    </div>
  );
}
