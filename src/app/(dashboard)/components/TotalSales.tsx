import { CustomLoaders } from "@/components/Loaders";
import { styled } from "@stitches/react";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";

type Props = {
  filter: string;
  amount: string | number;
  url?: string;
};

const TotalSales = ({ filter, amount, url }: Props) => {
  const router = useRouter();
  return (
    <Root
      onClick={() => {
        url && router.push(url);
      }}
      className="flex flex-col aspect-[182/109] items-center justify-center gap-3 w-full md:max-w-[182px]  
    max-h-[101px] md:max-h-[109px] cursor-pointer hover:scale-[1.05] hover:bg-green2">
      {amount && <p className="text-yellow1 font-bold text-xl">{amount}</p>}{" "}
      {!amount && <CustomLoaders colour="green1" variant="syncloader"/>}
      <p className="capitalize text-center text-sm">Total {filter}</p>
    </Root>
  );
};

const Root = styled("div", {
  // boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
});
export default TotalSales;
