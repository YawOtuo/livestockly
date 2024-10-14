import React from "react";
import FarmsDisplaySlider from "../components/FarmsDisplaySlider";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" bg-grey w-full ">
      <div className="grid grid-cols-1 lg:grid-cols-2  lg:min-h-[95vh] ">
        <div className="h-[40vh] lg:h-full">
          <FarmsDisplaySlider />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center py-10 lg:py-5">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
