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
  const { addTransaction } = useAddAndUpdateInventoryTransaction(item?.id);
  const { updateInventoryItem } = useInventory();
  const { farm } = useFarm();

  return (
    <div className="shadow p-5 flex flex-col gap-5 rounded-lg hover:bg-green2 transition-all duration-150 ">
      <div className="flex items-center justify-between gap-5">
        <h5 className="capitalize font-semibold">{item.name}</h5>
        {/* <p>{item.category_name}</p> */}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <RemoveQuantity item={item} iconClassName={"text-2xl"} />

          {item.quantity}
          <AddQuantity item={item} iconClassName="text-2xl" />
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
