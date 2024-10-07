import { FaDollarSign } from "react-icons/fa";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";

type Props = {
  type: string;
  price: string;
  items: string[];
  label: string;
  summary: string;
};

function PricingCard({ type = "free", price, items, label, summary }: Props) {
  const bgOptions: any = {
    free: "bg-green2 b",
    premium: "bg-green3 ",
    pro: "bg-greendeep text-white",
    starter: "bg-green3",
    enterprise: "bg-black/80",
  };
  const priceStyleOptions: any = {
    free: "text-black ",
    premium: "text-primary ",
    pro: "text-greendeep ",
    starter: "text-black",
    enterprise: "text-black/80",
  };
  return (
    <div className="flex flex-col gap-5 shadow-lg  rounded-2xl overflow-hidden hover:scale-[1.01] transition-all">
      <div
        className={`uppercase text-primary text-3xl font-semibold p-5 ${bgOptions[type]}`}>
        {label}
      </div>

      <div
        className={`px-5 text-lg flex items-center gap-1 border-b pb-5 ${priceStyleOptions[type]}`}>
        <FaDollarSign className="text-xs" />
        {price}
      </div>

      <div className="p-5">{summary}</div>

      <div className=" p-5 ">
        {items?.map((r) => (
          <div className="flex items-center gap-3">
            <IoCheckmarkSharp className="text-primary text-2xl" />
            <p className="text-base">{r}</p>
          </div>
        ))}
      </div>

      <div
        className={`p-5 w-full flex justify-start items-center gap-3 text-base bg-primary-foreground ${priceStyleOptions[type]}  `}>
        <p>Start here</p> <MdArrowRightAlt />
      </div>
    </div>
  );
}

export default PricingCard;
