"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { FaRegFlag } from "react-icons/fa";
import EditProfileModal from "./components/EditProfileModal";
import { SyncLoader } from "react-spinners";
import { useAppStore } from "@/lib/store/useAppStore";

export default function Page() {
  const { DBDetails } = useAppStore();

  return (
    <div className="flex flex-col gap-5 w-full justify-between px-5 lg:px-10 py-5  items-start">
      {/* <p className=" font-semibold text-2xl w-full text-left">
        My Account
      </p> */}
      <div>{!DBDetails && <SyncLoader color="#0FA958" />}</div>
      <div className="flex flex-col justify-start items-start gap-5 h-full w-full ">
        <div className="flex  items-center justify-start gap-5 w-full ">
          <div className="relative w-full max-w-[250px] aspect-square rounded-2xl overflow-hidden border-2 ">
            {DBDetails?.public_id ? (
              <Image
                src={`https://res.cloudinary.com/daurieb51/image/upload/v1642082142/${DBDetails?.public_id}.png`}
                fill
                alt="DBDetails"
              />
            ) : (
              <div className="w-full bg-slate-100 h-full"></div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-2xl text-yellow1 font-semibold border-b border-b-yellow4">
              {DBDetails?.username}
            </p>
            <Detail
              label="Email"
              icon={<MdOutlineMailOutline />}
              value={DBDetails?.email ?? ""}
            />
            <Detail
              label="Phone"
              icon={<MdOutlineLocalPhone />}
              value={DBDetails?.phone_number ?? ""}
            />
            <div className="col-span-2">
              <Detail
                label="Address1"
                icon={<FaRegAddressCard />}
                value={DBDetails?.contact_address ?? ""}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start">
       
          <div className="mt-5">
            {/* <EditProfileModal DBDetails={DBDetails} />{" "} */}
          </div>
        </div>

        {/* {isLoading && <p>Loading...</p>} */}
      </div>
    </div>
  );
}
type DetailProps = {
  label: string;
  icon: any;
  value: string | null;
};

const Detail = ({ label, icon, value }: DetailProps) => {
  return (
    <div className="flex gap-1 items-center">
      {icon} {label}: <span className="text-[#333] font-semibold">{value}</span>
    </div>
  );
};
