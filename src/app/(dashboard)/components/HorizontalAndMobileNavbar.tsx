"use client";
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { useIsAdmin } from "@/lib/hooks/useIsAdmin";
import { GrUserAdmin } from "react-icons/gr";
import useFirebaseAuth from "@/lib/hooks/useFirebaseAuth";
import { RootState } from "@/lib/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { Pagination } from "./DashboardSideNav";
import NotificationPopover from "./NotificationPopover";
import { useAppStore } from "@/lib/store/useAppStore";
import { Links } from "./DashboardSideNav/dashboardLinks";
import { useDashboardMobileStore } from "@/components/DashboardMobileNavbar/components/useDashboardMobileNavStore";

export default function HorizontalAndMobileNabvar() {
  const { Logout } = useFirebaseAuth();

  const { DBDetails } = useAppStore();

  const [showDetails, setShowDetails] = useState(false);
  const { setDashboardMobileMenu } = useDashboardMobileStore();

  // const {
  //   isLoading: notificationsIsLoading,
  //   error: notificationsError,
  //   data: notifications,
  // } = useQuery(["notifications"], () => fetchNotifications(DBDetails?.id), {
  //   enabled: !!DBDetails?.id,
  // });

  const isAdmin = useIsAdmin(DBDetails?.uid as string);

  return (
    <AnimatePresence>
      <motion.div className=" lg:bg-inherit shadow w-full flex flex-col items-center justify-between px-0 lg:px-10 py-2 gap-5">
        <div className="flex gap-5 w-full px-3 items-center">
          <div className="w-full lg:invisible">livestockly</div>
          <NotificationPopover />
          <div className="hidden lg:flex gap-1  text-sm px-10  items-center">
            <IoIosLogOut />
            <button onClick={Logout}>Logout</button>
          </div>{" "}
          <button
            className="lg:hidden"
            onClick={() => setDashboardMobileMenu(true)}>
            <RxHamburgerMenu size="30" className="text-primary font-bold" />
          </button>{" "}
        </div>

        {showDetails && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full h-full">
              <div>
                {Links.map((r, index) => (
                  <Pagination
                    onClick={() => setShowDetails((init) => !init)}
                    label={r?.label}
                    link={r?.link}
                    key={index}
                    icon={r?.icon}
                  />
                ))}
                {isAdmin && (
                  <Link
                    href={"/admin"}
                    className="hover:scale-[1.05] hover:bg-yellow4 w-full p-3 px-10 flex gap-5 items-center ">
                    <GrUserAdmin />
                    <p className=" font">Admin</p>
                  </Link>
                )}
                <div className="flex gap-1 px-10 mt-2 items-center">
                  <IoIosLogOut />
                  <button onClick={Logout}>Logout</button>
                </div>{" "}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
