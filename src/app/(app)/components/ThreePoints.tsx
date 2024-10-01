import React from "react";
import { CgSmileMouthOpen } from "react-icons/cg";

type PCProps = {
  label: string;
  icon: React.ReactNode;
  text: string;
};
const PointCard = ({ label, icon, text }: PCProps) => {
  return (
    <div className="flex flex-col gap-5 items-start w-full border-[1px] shadow-primary rounded-xl px-5 lg:px-10 py-10 lg:py-20 hover:bg-green2">
      <div className=" flex items-center justify-start text-primary gap-5 text-2xl lg:text-3xl w-full ">
        {icon}
        <p className="font-semibold">{label}</p>
      </div>
      <div>{text}</div>
    </div>
  );
};
function ThreePoints() {
  return (
    <div className="flex flex-col gap-20  items-start py-24">
      <h2 className="w-full lg:w-[75%] ">
        Unlock the Potential of Your Farm with{" "}
        <span className="text-primary">Livestockly</span>
        <span className="hidden lg:block">
          —Smart Management for Every Animal.
        </span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <PointCard
          label="Simple"
          icon={<CgSmileMouthOpen />}
          text="Manage your livestock with ease. Our intuitive interface ensures you can focus on what matters most—your animals."
        />
        <PointCard
          label="Collaborative"
          icon={<CgSmileMouthOpen />}
          text="Engage with your team and partners seamlessly. Livestockly enables effective communication and coordination for optimal farm management."
        />
        <PointCard
          label="Progressive"
          icon={<CgSmileMouthOpen />}
          text="Stay ahead with innovative tools and technologies. Livestockly continuously evolves to meet the demands of modern agriculture."
        />
      </div>
    </div>
  );
}

export default ThreePoints;
