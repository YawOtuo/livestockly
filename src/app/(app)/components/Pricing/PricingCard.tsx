import { IoCheckmarkSharp } from "react-icons/io5";

type Props = {
  type: string;
  price: string;
  items: string[];
};

function PricingCard({ type = "free", price, items }: Props) {
  const bgOptions: any = {
    free: "bg-green2 b",
    premium: "bg-green3 ",
    pro: "bg-greendeep text-white",
  };
  const priceStyleOptions: any = {
    free: "text-black b",
    premium: "text-primary ",
    pro: "text-greendeep ",
  };
  return (
    <div className="flex flex-col gap-5 border-2  rounded-2xl overflow-hidden hover:scale-[1.01] transition-all">
      <div
        className={`uppercase text-primary text-3xl font-semibold p-5 ${bgOptions[type]}`}>
        {type}
      </div>
      <div className=" p-5 ">
        {items?.map((r) => (
          <div className="flex items-center gap-3">
            <IoCheckmarkSharp className="text-primary text-2xl" />
            <p className="text-lg">{r}</p>
          </div>
        ))}
      </div>
      <div className={`px-5 text-2xl ${priceStyleOptions[type]}`}><span className="text-lg text-black">Price: </span>{price}</div>

      <div className={`p-5 w-full flex justify-start text-lg bg-primary-foreground ${priceStyleOptions[type]}  `}>Start here</div>
    </div>
  );
}

export default PricingCard;
