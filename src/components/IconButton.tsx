import { Button } from "@mui/material";
import CaRecordTag from "./icons/CaRecordTag";
import { LuTag } from "react-icons/lu";

import { IoIosArrowRoundForward } from "react-icons/io";

import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";

type Props = {
  label: string;
  icon: any;
  url?: any;
  reverse?: boolean;
};

const options: any = {
  record: <LuTag  size="30" color="#0FA958"/>,
  "arrow-right": <IoIosArrowRoundForward size="30" color="#0FA958" />,
  "add" :""
};
function IconButton({ label, icon, url, reverse=false }: Props) {
  const router = useRouter();
  return (
    <>
      {!reverse && (
        <Button
          startIcon={options[icon]}
          className="!text-green1 !capitlize"
          onClick={() => {
            url && router.push(url);
          }}>
          {label}
        </Button>
      )}
      {reverse && (
        <Button
          endIcon={options[icon]}
          className="!text-green1 !capitalize"
          onClick={() => {
            url && router.push(url);
          }}>
          {label}
        </Button>
      )}
    </>
  );
}

export default IconButton;
