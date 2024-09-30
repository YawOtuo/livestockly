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
      <p className="w-full lg:w-[75%] text-3xl lg:text-4xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
        <span className="hidden lg:block">dolorum magnam, quae iste eum quisquam quaerat molestiae</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <PointCard
          label="Simple"
          icon={<CgSmileMouthOpen />}
          text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos libero, mollitia dolor illo voluptate temporibus, ut neque, facere earum molestias hic voluptas vero odio saepe excepturi doloremque quia perferendis aspernatur."
        />
        <PointCard
          label="Collaborative"
          icon={<CgSmileMouthOpen />}
          text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos libero, mollitia dolor illo voluptate temporibus, ut neque, facere earum molestias hic voluptas vero odio saepe excepturi doloremque quia perferendis aspernatur."
        />
        <PointCard
          label="Progressive"
          icon={<CgSmileMouthOpen />}
          text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos libero, mollitia dolor illo voluptate temporibus, ut neque, facere earum molestias hic voluptas vero odio saepe excepturi doloremque quia perferendis aspernatur."
        />
      </div>
    </div>
  );
}

export default ThreePoints;
