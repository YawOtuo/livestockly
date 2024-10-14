import { InventoryItem } from "@/lib/types/inventory";
import Link from "next/link";
import { MdArrowRightAlt, MdOutlineKeyboardArrowRight } from "react-icons/md";
import AddQuantity from "./components/AddQuantity";
import RemoveQuantity from "./components/RemoveQuantity";
import { useEffect, useState } from "react";

type Props = {
  item: InventoryItem;
  low?: boolean;
};

function InventoryItemCard({ item, low = false }: Props) {
  const [belowThreshold, setBelowThreshold] = useState(low);
  useEffect(() => {
    if (item?.quantity < item?.alert_threshold) {
      setBelowThreshold(true);
    }
  }, [low]);
  return (
    <div
      className={`w-full cursor-pointer  shadow-md p-5 flex flex-col gap-5 rounded-lg hover:bg-bsecondary-400 hover:text-white justify-between transition-all duration-200 ${
        belowThreshold && "bg-red-700/5  "
      } `}>
      <div className="flex items-center justify-between gap-5">
        <h6 className="capitalize ">{item?.name}</h6>
        <div
          className={` px-3  text-white rounded-md text-xs py-1 `}>
          <p className="capitalize">{item?.category?.name}</p>
        </div>{" "}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <RemoveQuantity item={item} iconClassName={"text-xs"} />

          {item.quantity}
          <AddQuantity item={item} iconClassName="text-xs" />
        </div>
        <Link
          href={`/dashboard/inventory/${item?.id}`}
          className="flex items-center gap-2 text-xs">
          <p> View </p>
          <MdArrowRightAlt className=" text-sm" />
        </Link>{" "}
      </div>
    </div>
  );
}

export default InventoryItemCard;
