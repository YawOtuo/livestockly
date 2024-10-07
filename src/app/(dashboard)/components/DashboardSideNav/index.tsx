import Link from "next/link";

import { useIsAdmin } from "@/lib/hooks/useIsAdmin";
import { useSelector } from "react-redux";
import { GrUserAdmin } from "react-icons/gr";
import { RootState } from "@/lib/redux/store";
import { motion } from "framer-motion";
import { GiFarmer, GiFarmTractor } from "react-icons/gi";
import { useAppStore } from "@/lib/store/useAppStore";
import Image from "next/image";
import { Links } from "./dashboardLinks";



export const Pagination = ({
  label,
  link,
  icon,
  onClick,
}: {
  label: string;
  link: string;
  icon: any;
  onClick?: any;
}) => {
  return (
    <Link href={link} className="w-full">
      <motion.div
        whileHover={{
          scale: 1.04,
        }}
        onClick={() => {
          onClick && onClick();
        }}
        className=" hover:bg-primary rounded-md hover:text-white w-full p-2 flex gap-5 items-center pl-10 ">
        {icon}
        <p className=" font">{label}</p>
      </motion.div>
    </Link>
  );
};

export default function DashboardSideNav() {
  const { DBDetails } = useAppStore();

  const isAdmin = useIsAdmin(DBDetails?.uid as string);
  return (
    <div className="bg-green2 w-full flex flex-col h-[100vh] sticky top-0 items-start py-5 justify-start gap-2 px-2">
      <div className="flex flex-col w-full items-start justify-center px-5 pb-10">
        <p>
          livestock<span className="text-primary">ly</span>
        </p>

        <div className="flex gap-3 items-center w-full">
          {DBDetails?.public_id ? (
            <div className="relative w-full max-w-[50px] aspect-square rounded-full overflow-hidden border-2 border-yellow1">
              <Image
                alt="Image"
                fill
                src={`https://res.cloudinary.com/daurieb51/image/upload/v1642082142/${
                  DBDetails?.public_id || "placeholderdog_xyfyje"
                }.png`}
              />
            </div>
          ) : (
            <div className="w-[40px] bg-slate-200 rounded-lg aspect-square"></div>
          )}

          <p className="font-semibold text-yellow1 lg:text-black">
            {DBDetails?.username}
          </p>
        </div>
      </div>
      {Links.map(
        (r, index) =>
          Number(DBDetails?.permission) >= r?.level && (
            <Pagination
              label={r?.label}
              link={r?.link}
              key={index}
              icon={r?.icon}
            />
          )
      )}
      {isAdmin && (
        <Link
          href={"/admin"}
          className="hover:scale-[1.05] hover:bg-yellow4 w-full p-3 px-10 flex gap-5 items-center ">
          <GrUserAdmin />
          <p className=" font">Admin</p>
        </Link>
      )}
    </div>
  );
}
