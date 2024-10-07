"use client";
import { CustomLoaders } from "@/components/Loaders";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { motion } from "framer-motion";
import SkeletonFarmTotalsCard from "../dashboard/my-farm/components/SkeletonFarmTotalsCArd";
import SkeletonTotalSalesCard from "./SkeletonTotalSalesCard";

type Props = {
  filter: string;
  amount: string | number;
  url?: string;
};

const TotalSales = ({ filter, amount, url }: Props) => {
  const router = useRouter();
  return (
    <>
      {amount ? (
        <motion.div
          layout
          onClick={() => {
            url && router.push(url);
          }}
          className="flex  border-[1px] md:border-2 border-green2 rounded-2xl lg:rounded-2xl  flex-col   items-center justify-center gap-1 lg:gap-1  lg:w-fit min-w-[200px] aspect-[5/2]
       cursor-pointer hover:scale-[1.05]  hover:border-green1 transition-all duration-300">
          {<p className=" font-bold text-xl">{amount}</p>}
          <p className="capitalize text-center text-xs"> {filter}</p>
        </motion.div>
      ) : (
        <SkeletonTotalSalesCard />
      )}
    </>
  );
};

export default TotalSales;
