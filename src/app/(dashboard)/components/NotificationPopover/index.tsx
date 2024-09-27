import CustomPopover from "@/components/ui/CustomPopover";
import FetchingState from "@/components/ui/FetchingState";
import useNotifications from "@/lib/hooks/useNotifications";
import NotificationCard from "../NotificationCard";
import SkeletonNotificationCard from "../NotificationCard/SkeletonNotificationCard";
import { IoMdNotifications } from "react-icons/io";

function NotificationPopover() {
  const { notifications, isLoading, error } = useNotifications();

  return (
    <div>
      <CustomPopover
      contentClassName="w-[500px]"
        trigger={
          <div>
            <IoMdNotifications className="text-primary text-2xl"/>
          </div>
        }
        content={
          <div>
            <FetchingState
              success={notifications?.map((r, index: number) => (
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
