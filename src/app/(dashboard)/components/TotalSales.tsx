import { CustomLoaders } from "@/components/Loaders";
import { styled } from "@stitches/react";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { motion } from "framer-motion";

type Props = {
  filter: string;
  amount: string | number;
  url?: string;
};

const TotalSales = ({ filter, amount, url }: Props) => {
  const router = useRouter();
  return (
    <motion.div
    layout
      onClick={() => {
        url && router.push(url);
      }}
      className="flex flex-row border-2 md:border-0 rounded-2xl  lg:flex-col py-2 lg:py-0 lg:aspect-[182/109] items-center justify-center gap-3 w-full lg:max-w-[182px]  
    max-h-[101px] md:max-h-[109px] cursor-pointer hover:scale-[1.05] hover:bg-green2">
      {amount && <p className="text-yellow1 font-bold text-xl">{amount}</p>}
      {amount == undefined ||
        (null && <CustomLoaders colour="green1" variant="syncloader" />)}
      <p className="capitalize text-center text-sm"> {filter}</p>
    </motion.div>
  );
};

export default TotalSales;
