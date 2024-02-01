import { PiWarningBold } from "react-icons/pi";
import { FaInfoCircle } from "react-icons/fa";

import { NotificationType } from "../dashboard/notifications/types";
import { MdOutlineMessage } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";

import moment from "moment";
import IconButton from "@/components/IconButton";

type Props = {
  notification: NotificationType;
};

export default function NotificationCard({ notification }: Props) {
  const subjects: any = {
    "post-liked": "Post Liked",
    "post-created": `Post succesfully shared`,
  };

  const messages: any = {
    "post-liked": `${notification?.from_name} has just liked your post`,
    "post-created": `You created a post`,
  };
  const icons: any = {
    any: <IoIosNotificationsOutline size="30" color="#0FA958" />,
    "post-created": <IoIosNotificationsOutline size="30" color="#0FA958" />,

    "post-liked": <MdOutlineMessage size="30" color="#0FA958" />,

    // success: <SuccessCircle size="30" />,
    caution: (
      <PiWarningBold
        size="30"
        color="#E4A951
    "
      />
    ),
    info: <FaInfoCircle size="30" />,
  };
  return (
    <div className="w-full max-w-[900px] hover:scale-[1.0`] hover:bg-green2 cursor-pointer p-5">
      <div className="flex flex-col lg:flex-row items-start justify-between lg:items-center gap-3 lg:gap-0">
        <div className="flex gap-3 items-center">
          <div className="">{icons[notification?.type || "any"]}</div>

          <div className="flex flex-col gap-0 w-full">
            <p className="font-semibold text-lg">
              {subjects[notification?.type]}
            </p>
            <p className="text-xs text-gray-500">
              {moment(new Date(notification?.date_created)).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </p>

            <p className="font-semibold text-lg">
              {!notification?.type && notification?.subject}
            </p>

            <p className="text-md">
              {!notification?.type && notification?.message}
            </p>
            <p className="text-md">{messages[notification?.type]}</p>
          </div>
        </div>
        <div className="flex  gap-1">
          <IconButton label="Mark as read" variant="read" />

          <IconButton label="Delete" variant="delete2" />
        </div>{" "}
      </div>
    </div>
  );
}
