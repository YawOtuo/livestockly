import CaRecordTag from "./icons/CaRecordTag";
import { LuTag } from "react-icons/lu";

import { IoIosArrowRoundForward } from "react-icons/io";

import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "./ui/button";
import { IoAddCircleOutline, IoCheckmarkDone } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

type Props = {
  label: string;
  icon: any;
  url?: any;
  reverse?: boolean;
} & ButtonProps;

const options: any = {
  record: <LuTag size="30" color="#0FA958" />,
  "arrow-right": <IoIosArrowRoundForward size="30" color="#0FA958" />,
  add: <IoAddCircleOutline />,
  read: <IoCheckmarkDone />,
  delete: <MdDelete />,
};
function IconButton({
  label,
  icon,
  url,
  reverse = false,
  variant = "outline",
  ...props
}: Props) {
  const router = useRouter();
  return (
    <>
      {!reverse && (
        <Button
          variant={variant}
          className="flex items-center gap-2"
          onClick={() => {
            url && router.push(url);
          }}>
          {options[icon]}
          {label}
        </Button>
      )}
      {reverse && (
        <Button
          variant={variant}
          className=" flex items-center gap-2"
          onClick={() => {
            url && router.push(url);
          }}>
          {label}
          {options[icon]}
        </Button>
      )}
    </>
  );
}

export default IconButton;
