"use client";
import { CustomLoaders } from "@/components/Loaders";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { motion } from "framer-motion";
import SkeletonFarmTotalsCard from "./SkeletonFarmTotalsCArd";

type Props = {
  filter: string;
  amount: string | number;
  url?: string;
  isLoading: boolean

};

const FarmTotalsCard = ({ filter, amount, url, isLoading }: Props) => {
  const router = useRouter();
  return (
    <>
      {!isLoading ? (
        <motion.div
          layout
          className="flex  shadow-md border-green2 rounded-2xl  items-center justify-center gap-3 lg:gap-5  
       cursor-pointer hover:scale-[1.05]  hover:border-green1 transition-all duration-300 px-5 py-3">
          {<p className=" font-bold text-xl">{amount}</p>}

          <p className="capitalize text-center text-xs"> {filter}</p>
        </motion.div>
      ) : (
        <SkeletonFarmTotalsCard />
      )}
    </>
  );
};

export default FarmTotalsCard;
