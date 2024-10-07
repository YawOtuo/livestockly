import { GiFarmer, GiFarmTractor } from "react-icons/gi";
import { GrMoney, GrUserWorker } from "react-icons/gr";
import {
  MdHomeFilled,
  MdOutlineFormatListBulleted,
  MdOutlineInventory,
} from "react-icons/md";

import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";

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
    label: "farm",
    link: "/dashboard/my-farm",
    icon: <GiFarmTractor />,
    level: 1,
  },
  {
    label: "Sales",
    link: "/dashboard/my-sales",
    icon: <GrMoney />,
    level: 1,
  },
  {
    label: "Inventory",
    link: "/dashboard/my-inventory",
    icon: <MdOutlineInventory />,
    level: 1,
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
