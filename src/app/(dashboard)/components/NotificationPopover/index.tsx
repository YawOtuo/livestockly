import CustomPopover from "@/components/ui/CustomPopover";
import FetchingState from "@/components/ui/FetchingState";
import useNotifications from "@/lib/hooks/useNotifications";
import NotificationCard from "../NotificationCard";
import SkeletonNotificationCard from "../NotificationCard/SkeletonNotificationCard";
import { IoMdNotifications } from "react-icons/io";

function NotificationPopover() {
  const { notifications, isLoading, error } = useNotifications();

  return (
    <div className="flex items-center">
      <CustomPopover
      contentClassName="w-[90vw] md:w-[500px]"
        trigger={
          <div className="flex items-center">
            <IoMdNotifications className="text-primary text-2xl"/>
          </div>
        }
        content={
          <div>
            <FetchingState
              success={notifications && notifications?.slice(0,6).map((r, index: number) => (
                <NotificationCard notification={r} key={index} />
              ))}
              loading={<SkeletonNotificationCard />}
              isLoading={isLoading}
              isError={error}
              skeletonCount={5}
            />
          </div>
        }
      />
    </div>
  );
}

export default NotificationPopover;
