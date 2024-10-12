import { Button } from "@/components/ui/button";
import useFarm from "@/lib/hooks/useFarm";
import { useInventory } from "@/lib/hooks/useInventory";
import {
  useAddAndUpdateInventoryTransaction,
  useInventoryTransactions,
} from "@/lib/hooks/useInventoryTransactions";
import { InventoryItem } from "@/lib/types/inventory";
import Link from "next/link";
import { MdArrowRightAlt, MdOutlineKeyboardArrowRight } from "react-icons/md";
import AddQuantity from "./components/AddQuantity";
import RemoveQuantity from "./components/RemoveQuantity";

type Props = {
  item: InventoryItem;
};

function InventoryItemCard({ item }: Props) {
  return (
    <div className="shadow p-5 flex flex-col gap-5 rounded-lg hover:bg-green2 transition-all duration-150 ">
      <div className="flex items-center justify-between gap-5">
        <h5 className="capitalize font-semibold">{item?.name}</h5>
        <div className="bg-bsecondary-400 px-3  text-white rounded-md text-xs py-1">
          <p>{item?.category?.name}</p>
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
          className="flex items-center gap-3 text-xs">
          <p> View Details </p>
          <MdArrowRightAlt className="text-gray-600 text-xl" />
        </Link>{" "}
      </div>
    </div>
  );
}

export default InventoryItemCard;
