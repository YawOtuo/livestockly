import { PiWarningBold } from "react-icons/pi";
import { FaInfoCircle } from "react-icons/fa";

import { NotificationType } from "../../dashboard/notifications/types";
import { MdOutlineMessage } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";

import moment from "moment";
import IconButton from "@/components/IconButton";
import { Notification } from "@/lib/types/notification";
import {
  IoCheckmarkCircleSharp,
  IoInformationCircleOutline,
} from "react-icons/io5";

type Props = {
  notification: Notification;
};

export default function NotificationCard({ notification }: Props) {
  const icons: any = {
    // any: <IoIosNotificationsOutline  className="text-primary" />,
    alert: <IoIosNotificationsOutline size="30" className="text-primary" />,
    success: <IoCheckmarkCircleSharp />,
    warning: <PiWarningBold className="text-red-500" />,
    info: <IoInformationCircleOutline className="text-yellow-500 text-2xl" />,
  };
  return (
    <div className="w-full  hover:scale-[1.0`] hover:bg-green2 cursor-pointer p-5">
      <div className="flex flex-col lg:flex-row items-start justify-between lg:items-center gap-3 lg:gap-0">
        <div className="flex gap-3 items-start justify-start">
          <div className="flex items-start h-full pt-2">
            {icons[notification?.type || "info"]}
          </div>

          <div className="flex flex-col gap-0 w-full">
            <p className="text-xs text-gray-500 capitalize">
              {moment(notification?.createdAt).fromNow()}
            </p>

            <p
              className={`text-lg capitalize ${
                notification.read && "font-semibold"
              }`}>
              {notification?.subject}
            </p>

            <p className="text-sm">
              {" "}
              {notification?.content} at{" "}
              {moment(notification?.createdAt).format("hh:mm A DD/MM/YYYY")}
            </p>
            {/* <p className="text-md">{content[notification?.type]}</p> */}
          </div>
        </div>
        <div className="flex  gap-1">
          {/* <IconButton  label="Mark as read" icon="read" /> */}

          {/* <IconButton label="Delete" icon="delete" /> */}
        </div>{" "}
      </div>
    </div>
  );
}
