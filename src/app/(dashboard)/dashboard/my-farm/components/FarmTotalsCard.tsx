"use client"
import { CustomLoaders } from "@/components/Loaders";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { motion } from "framer-motion";

type Props = {
  filter: string;
  amount: string | number;
  url?: string;
};

const FarmTotalsCard = ({ filter, amount, url }: Props) => {
  const router = useRouter();
  return (
    <motion.div
      layout
  
      className="flex  border-[1px] md:border-2 border-green2 rounded-2xl lg:rounded-2xl  flex-col   items-center justify-center gap-1 lg:gap-1  lg:w-fit py-3 lg:py-6 px-5 lg:px-16
     cursor-pointer hover:scale-[1.05]  hover:border-green1 transition-all duration-300">
      {amount && <p className=" font-bold text-xl">{amount || 0}</p>}
      {amount == undefined ||
        (null && <CustomLoaders colour="green1" variant="syncloader" />)}

      <p className="capitalize text-center text-xs"> {filter}</p>
    </motion.div>
  );
};

export default FarmTotalsCard;
