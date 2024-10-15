import { PiWarningBold } from "react-icons/pi";
import { IoIosNotificationsOutline, IoIosWarning } from "react-icons/io";

import moment from "moment";
import { Notification, NotificationType } from "@/lib/types/notification";
import {
  IoCheckmarkCircleSharp,
  IoCheckmarkDoneSharp,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { LuAlertCircle } from "react-icons/lu";

type Props = {
  notification: Notification;
};

export default function NotificationCard({ notification }: Props) {
  const icons: Record<NotificationType, React.ReactNode> = {
    caution: <IoIosWarning  className="text-red-500" />,
    alert: <LuAlertCircle  className="text-primary-900" />,
    success: <IoCheckmarkDoneSharp  className="text-primary"/>,
    reminder: <PiWarningBold className="text-primary" />,
    info: <IoInformationCircleOutline className="text-slate-600 " />,
  };
  return (
    <div className="w-full  hover:scale-[1.0`] hover:bg-green2 cursor-pointer p-5 border-b-[1px] rounded-md">
      <div className="flex flex-col lg:flex-row items-start justify-between lg:items-center gap-3 lg:gap-0">
        <div className="flex gap-3 items-start justify-start">
          <div className="flex items-start h-full pt-2 text-2xl">
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
