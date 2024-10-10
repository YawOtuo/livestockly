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

type Props = {
  item: InventoryItem;
};

function InventoryItemCard({ item }: Props) {
  const { addTransaction } = useAddAndUpdateInventoryTransaction(item?.id);
  const { updateInventoryItem } = useInventory();
  const { farm } = useFarm();

  return (
    <div className="shadow p-5 flex flex-col gap-5 rounded-lg hover:bg-green2 transition-all duration-150">
      <div className="flex items-center justify-between gap-5">
        <h5 className="capitalize font-semibold">{item.name}</h5>
        <Link href={`/dashboard/inventory/${item?.id}`}>
          <MdOutlineKeyboardArrowRight className="text-gray-600 text-4xl" />
        </Link>{" "}
      </div>

      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <Button variant={"outline"}>-</Button>
          {item.quantity}
          <Button variant={"outline"}>+</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={"link"}
            onClick={() => {
              const qty = item?.quantity + 5;
              updateInventoryItem({
                id: item?.id,
                data: {
                  ...item,
                  quantity: qty,
                },
              });
              addTransaction({
                inventory_item_id: item?.id,
                quantity_change: qty,
                transaction_type: "ADD",
                farm_id: Number(farm?.id),
              });
            }}>
            Buy more
          </Button>
          <Button
            variant={"link"}
            onClick={() => {
              const qty = item?.quantity - 5;

              updateInventoryItem({
                id: item?.id,
                data: {
                  ...item,
                  quantity: qty,
                },
              });
              addTransaction({
                inventory_item_id: item?.id,
                quantity_change: qty,
                transaction_type: "REMOVE",
                farm_id: Number(farm?.id),
              });
            }}>
            Sell
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InventoryItemCard;
