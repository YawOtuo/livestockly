import Link from "next/link";
import { useDashboardMobileStore } from "./useDashboardMobileNavStore";
import { Links } from "@/app/(dashboard)/components/DashboardSideNav/dashboardLinks";
import { Button } from "@/components/ui/button";
import useFirebaseAuth from "@/lib/hooks/useFirebaseAuth";
import { IoIosLogOut } from "react-icons/io";

export const MobileMenuDetails = (props: any) => {
  // const { setToggle } = useMenuStore();
  const { setDashboardMobileMenu } = useDashboardMobileStore();
  const { Logout } = useFirebaseAuth();

  return (
    <div
      className={`flex flex-col justify-center   gap-10 px-5  ${props?.className}`}>
      {/* <Link href={"/store"}>
        {" "}
        <Button
          size={"md"}
          className="w-fit font-semibold px-8 bg-transparent text-white rounded-sm border-primary border-2 text-lg py-5">
          Add Record
        </Button>
      </Link> */}

      <div className=" grid grid-cols-2 gap-5">
        {Links?.map((link: any, index: number) => (
          <Link
            href={`${link.link}`}
            key={index}
            className="border-2 rounded-lg border-white text-white px-4 py-7 flex flex-col gap-2 items-center"
            onClick={() => setDashboardMobileMenu(false)}>
            {link?.icon}

            <p className={"text-base  capitalize text-white "}>{link.label}</p>
          </Link>
        ))}
        <button onClick={Logout} className="border-2 border-white px-4 py-2 rounded-lg text-white flex items-center justify-center">
          <IoIosLogOut className="mr-1" />
          Logout
        </button>
      </div>
    </div>
  );
};
