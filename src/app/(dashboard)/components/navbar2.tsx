import Link from "next/link";
import { MdHomeFilled, MdOutlineFormatListBulleted } from "react-icons/md";


import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { useIsAdmin } from "@/lib/hooks/useIsAdmin";
import { useSelector } from "react-redux";
import { GrUserAdmin } from "react-icons/gr";
import { GrUserWorker } from "react-icons/gr";
import { RootState } from "@/lib/redux/store";
import { motion } from "framer-motion";

export const Links = [
  { label: "Home", link: "/dashboard", icon: <MdHomeFilled />, level: 1 },

  // { label: "Socials", link: "/profile/socials", icon: <TfiWrite /> },

  {
    label: "Records",
    link: "/dashboard/records",
    icon: <MdOutlineFormatListBulleted />,
    level: 1,
  },
  {
    label: "My workers",
    link: "/dashboard/workers",
    icon: <GrUserWorker />,
    level: 3,
  },
  {
    label: "Notifications",
    link: "/dashboard/notifications",
    icon: <IoIosNotificationsOutline />,
    level: 1,
  },
  {
    label: "Account",
    link: "/dashboard/account",
    icon: <CiSettings />,
    level: 1,
  },
  // { label: "Back to site", link: "/", icon: <IoReturnUpBackSharp /> },
];

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
        className=" hover:bg-primary rounded-md hover:text-white w-full p-2 px-10 flex gap-5 items-center ">
        {icon}
        <p className=" font">{label}</p>
      </motion.div>
    </Link>
  );
};

export default function Navbar2() {
  const userSqlData = useSelector(
    (state: RootState) => state?.users?.userSqlData
  );

  const isAdmin = useIsAdmin(userSqlData?.uid as string);
  return (
    <div className="bg-green2 w-full flex flex-col h-[100vh] sticky top-0 items-start py-20 justify-start gap-2">
      {Links.map(
        (r, index) =>
          Number(userSqlData?.permission) >= r?.level && (
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
