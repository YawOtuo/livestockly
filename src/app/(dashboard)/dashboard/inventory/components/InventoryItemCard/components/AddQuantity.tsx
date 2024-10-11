import { Button } from "@/components/ui/button";
import useFarm from "@/lib/hooks/useFarm";
import { useInventory } from "@/lib/hooks/useInventory";
import { useAddAndUpdateInventoryTransaction } from "@/lib/hooks/useInventoryTransactions";
import { InventoryItem } from "@/lib/types/inventory";
import { GrAddCircle } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";

type Props = {
  item: InventoryItem;
  iconClassName: string
};

function AddQuantity({ item, iconClassName }: Props) {
  const { addTransaction } = useAddAndUpdateInventoryTransaction(item?.id);
  const { updateInventoryItem } = useInventory();
  const { farm } = useFarm();
  return (
    <div>
      <Button
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
        }}
        variant={"ghost"}>
        <IoMdAdd  className={iconClassName}/>
      </Button>
    </div>
  );
}

export default AddQuantity;
