"use client";

import IconButton from "@/components/Buttons/IconButton";
import DogCard from "@/components/DogCard.tsx";
import NoPlaceHolder from "@/components/NoPlaceHolder";
import { fetchDogs } from "@/lib/api/dogs";
import { fetchUserOne } from "@/lib/api/users";
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

export default function Page() {
  const user = useSelector((state) => state?.users?.userSqlData);

  return (
    <div className="flex flex-col gap-5 w-full justify-between px-5 lg:px-10 py-10  items-start">
      <p className="text-yellow1 border-b py-2 font-semibold text-2xl w-full text-left">
        My Account
      </p>
      <div>
        {!user && <SyncLoader  color="#0FA958"/>}
      </div>
      <div className="flex flex-col justify-start items-start gap-5 h-full py-10">
        <div className="flex flex-col items-start justify-center gap-1 w-full ">
          <div className="relative w-full max-w-[250px] aspect-square rounded-full overflow-hidden border-2 ">
            <Image
              src={`https://res.cloudinary.com/daurieb51/image/upload/v1642082142/${
                user?.public_id || "placeholderdog_xyfyje"
              }.png`}
              fill
              alt="USer"
            />{" "}
          </div>
          <p className="text-2xl text-yellow1 font-semibold border-b border-b-yellow4">
            {user?.username}
          </p>
        </div>
        {user && (
          <div className="flex flex-col items-start">
            <div className="grid grid-cols-2 gap-5 items-center justify-center">
              <Detail
                label="Email"
                icon={<MdOutlineMailOutline />}
                value={user?.email}
              />
              <div className="col-span-2">
                <Detail
                  label="Country"
                  icon={<FaRegFlag />}
                  value={user?.country}
                />
              </div>
              <div className="col-span-2">
                <Detail
                  label="Phone"
                  icon={<MdOutlineLocalPhone />}
                  value={user?.phone_number}
                />
              </div>
              <div className="col-span-2">
                <Detail
                  label="Address1"
                  icon={<FaRegAddressCard />}
                  value={user?.contact_address}
                />
              </div>
              {/* <div className="col-span-2">
                <Detail
                  label="Address2"
                  icon={<FaRegAddressCard />}
                  value={user?.phone_number}
                />
              </div> */}
            </div>
            <div className="mt-5">
              <EditProfileModal user={user} />{" "}
            </div>
          </div>
        )}
        {/* {isLoading && <p>Loading...</p>} */}
      </div>
    </div>
  );
}
type DetailProps = {
  label: string;
  icon: any;
  value: string;
};

const Detail = ({ label, icon, value }: DetailProps) => {
  return (
    <div className="flex gap-1 items-center">
      {icon} {label}: <span className="text-[#333] font-semibold">{value}</span>
    </div>
  );
};
