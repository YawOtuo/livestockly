"use client";

import Log from "@/components/log/log";
import { PermissionComponent } from "@/components/permission-component";
import { GetOneRecord } from "@/lib/api/record";
import SlideEnterToLeft from "@/lib/framer/slideInWithGreen";
import { Button } from "@mui/material";
import { styled } from "@stitches/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useAppStore } from "@/lib/store/useAppStore";
import dynamic from "next/dynamic";
import DeleteRecordModal from "@/components/modals/DeleteRecordModal";
import { categoryIcons } from "@/lib/utils/categoryicons";
import AdditionalDetails from "./AdditionalDetails";
const AddRecordModal = dynamic(
  () => import("@/components/modals/AddRecordModal")
);

function Page() {
  const params = useParams();
  const { DBDetails } = useAppStore();
  const router = useRouter();
  const {
    isLoading,
    error,
    data: animal,
  } = useQuery(
    [`records-${params?.id}`],
    () => GetOneRecord(Number(params?.id)),
    {
      enabled: !!DBDetails?.farm_id,
    }
  );
  const {
    isLoading: isLoadingSire,
    error: errorSire,
    data: sire,
  } = useQuery(
    [`${params?.slug}-${animal?.sire}`],
    () => GetOneRecord(animal?.sire as number),
    {
      enabled: !!animal?.sire,
    }
  );
  const {
    isLoading: isLoadingDam,
    error: errorDam,
    data: dam,
  } = useQuery(
    [`${params?.slug}-${animal?.dam}`],
    () => GetOneRecord(animal?.dam as number),
    {
      enabled: !!animal?.sire,
    }
  );

  const displayInfo = () => {
    if (animal) {
      return (
        <div className="w-full flex flex-col gap-5">
          <div
            className="flex flex-col
                    justify-start items-start  w-full ">
            <div
              className="text-left flex gap-4 flex-wrap
                       capitalize ">
              <p> tag colour: {animal["tag_colour"] || "N/A"}</p>
              <p> number of kids: {animal["number_of_kids"] || "N/A"}</p>

              <p> Date Of Birth: {animal["date_of_birth"] || "N/A"}</p>
              <p> Date Purchased: {animal["date_purchased"] || "N/A"}</p>
            </div>
          </div>

          <AdditionalDetails recordId={Number(params.id)}/>
        </div>
      );
    }
  };

  return (
    <Root className="justify-center text-center bg-[#446353fa] overflow-hidden rounded-tl-2xl">
      <SlideEnterToLeft>
        <div className="relative justify-center">
          <div className="absolute flex w-full justify-between top-0 left-0">
            <Button className=" !text-green1" onClick={() => router.back()}>
              <IoIosArrowRoundBack size="30" />
              Back
            </Button>
            <PermissionComponent level={2}>
              <div className="w-full justify-center items-center flex flex-wrap gap-5">
                <div className="flex uppercase items-center">
                  {animal && (
                    <AddRecordModal edit={true} title="Edit" record={animal} />
                  )}
                </div>
              </div>
            </PermissionComponent>{" "}
          </div>
          <div className=" grid grid-cols-5 py-20 justify-center items-center text-uppercase mb-5 bg-green2  gap-5">
            <div
              className="flex flex-col col-span-5 lg:col-span-2 
                        items-center">
              <span className="text-primary text-4xl">
                {" "}
                {animal?.category && categoryIcons[animal?.category?.name]}
              </span>

              <h1 className="text-3xl font-bold uppercase"> {animal?.name}</h1>
            </div>

            <div className="flex  col-span-5 lg:col-span-1 flex-col  items-center lg:items-start gap-4 capitalize ">
              <p>
                {" "}
                Father&apos;s Tag: &nbsp;
                {sire?.id ? (
                  <Link href={`/dashboard/${sire.category.name}/${sire.id}`}>
                    <span className="font-bold brand-green-font">
                      {sire?.["name"] || "N/A"}
                    </span>
                  </Link>
                ) : (
                  <span className="font-bold brand-green-font">
                    {dam?.["name"] || "N/A"}
                  </span>
                )}
              </p>

              <p>
                {" "}
                Mother&apos;s Tag: &nbsp;
                {dam?.id ? (
                  <Link href={`/dashboard/${dam?.category.name}/${dam?.id}`}>
                    {" "}
                    <span className="font-bold brand-green-font">
                      {dam?.["name"] || "N/A"}
                    </span>
                  </Link>
                ) : (
                  <span className="font-bold brand-green-font">
                    {dam?.["name"] || "N/A"}
                  </span>
                )}
              </p>
            </div>
            <div
              className="flex-col flex 
                        col-span-5 lg:col-span-1 gap-4 lg:items-start">
              <p>
                Alive:{" "}
                <span className="brand-green-font font-bold">
                  {animal?.["alive"] ? "yes" : "no"}
                </span>
              </p>
              <p>
                Sold:{" "}
                <span className="brand-green-font font-bold">
                  {animal?.["alive"] ? "yes" : "no"}
                </span>
              </p>
            </div>

            <div
              className="flex-col flex 
                        col-span-5 lg:col-span-1 whitespace-nowrap gap-4 lg:items-start">
              <p className="whitespace-nowrap">
                castrated:{" "}
                <TextGreenBold>
                  {animal?.["castrated"] ? "yes" : "no" || "N/A"}
                </TextGreenBold>
              </p>

              <p className="whitespace-nowrap">
                {" "}
                gender:{" "}
                <TextGreenBold>{animal?.["gender"] || "N/A"}</TextGreenBold>
              </p>

              <p>
                {" "}
                colour:{" "}
                <span className="brand-green-font font-bold">
                  {animal?.["colour"] || "N/A"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full">
            <div className=" w-full ">
              {isLoading && <p>Loading...</p>}
              {displayInfo()}
              <div className="px-10">
                {/* <CoverFlow images={animal.public_id} animalId={animal?.id} /> */}
              </div>
            </div>

            <div
              className="mt-10 lg:mt-0 col-span-5 md:col-span-1 
                    
                    flex flex-col gap-10 justify-center items-center w-full">
              {/* <RecentRecords title="Recent Records" data={recents} /> */}
              {/* <RecentRecords
                title={`Other ${animal.type || "records"}`}
                data={recentsSp}
              /> */}
            </div>
          </div>
          <div className="w-full justify-end flex ">
            {" "}
            {animal && <DeleteRecordModal record={animal} />}
          </div>
        </div>
      </SlideEnterToLeft>
    </Root>
  );
}

const Root = styled("div", {
  "& .detail-header": {
    backgroundColor: "#8390891f",
    minHeight: "200px",
  },
});

const TextGreenBold = styled("p", {
  color: "#0FA958",
  fontWeight: "bold",
  display: "inline",
});

export default Page;
