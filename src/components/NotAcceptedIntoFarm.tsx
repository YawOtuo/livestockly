import { Button } from "@mui/material";
import { IoMdInformationCircle } from "react-icons/io";
import InfoText from "./InfoText";
import { useAppStore } from "@/lib/store/useAppStore";

function NotAcceptedIntoFarm() {
  const { DBDetails } = useAppStore();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-0  lg:h-screen items-center justify-center border-2  ">

      <div className="bg-green2 h-full flex items-center justify-center gap-5 px-5 lg:px-5 py-24">
        <IoMdInformationCircle className="text-7xl" />
        <p className="text-2xl font-semibold text-gray-900">
          Hello {DBDetails?.username}, you have not yet been accepted into this
          farm
        </p>
      </div>
      
      <div className="lg:col-span-2 flex flex-col gap-5 px-5 lg:px-10">
        <p className="text-2xl">This could be for the any following reasons</p>
        <ul className="text-gray-800">
          <li>1. Verification is still ongoing</li>
          <li>2. The owner/admin has blocked you</li>
        </ul>
        <InfoText text="We will alert you once verification is complete else please contact the admin to unblock you. Please reach to livestockly@gmail.com for further enquiries" />
      </div>
    </div>
  );
}

export default NotAcceptedIntoFarm;
