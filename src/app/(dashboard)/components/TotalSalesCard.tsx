"use client";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import SkeletonTotalSalesCard from "./SkeletonTotalSalesCard";
import Link from "next/link";

type Props = {
  filter: string;
  amount: string | number;
  url?: string;
  isLoading: boolean;
};

const TotalSales = ({ filter, amount, url, isLoading }: Props) => {
  return (
    <Link href={`${url}`}>
      {!isLoading ? (
        <motion.div
          layout
          className="flex  shadow border-green2 rounded-2xl lg:rounded-lg  flex-col   items-center justify-center gap-1 lg:gap-1 py-5  lg:min-w-[200px] aspect-[5/2]
       cursor-pointer hover:scale-[1.05]  hover:border-green1 hover:bg-primary-900 hover:text-white transition-all duration-300">
          {<p className=" font-bold text-xl">{amount}</p>}
          <p className="capitalize text-center text-xs"> {filter}</p>
        </motion.div>
      ) : (
        <SkeletonTotalSalesCard />
      )}
    </Link>
  );
};

export default TotalSales;
