import { Button } from "@/components/ui/button";
import CustomModal from "@/components/ui/CustomDialog";
import CustomInput from "@/components/ui/CustomInput";
import useFarm from "@/lib/hooks/useFarm";
import { useInventory } from "@/lib/hooks/useInventory";
import { useAddAndUpdateInventoryTransaction } from "@/lib/hooks/useInventoryTransactions";
import { InventoryItem } from "@/lib/types/inventory";
import { GrSubtract } from "react-icons/gr";
import { useForm } from "react-hook-form";
import useDisclosure from "@/lib/hooks/useDisclosure";

type Props = {
  item: InventoryItem;
  iconClassName?: string;
};

function RemoveQuantity({ item, iconClassName }: Props) {
  const { addTransaction } = useAddAndUpdateInventoryTransaction(item?.id);
  const { updateInventoryItem } = useInventory();
  const { farm } = useFarm();
  const { open, setOpen } = useDisclosure();

  // Use useForm hook from React Hook Form
  const { register, handleSubmit } = useForm({
    defaultValues: {
      quantity: 5,
    },
  });

  const onSubmit = (data: { quantity: number }) => {
    const qty = item?.quantity - data.quantity; // Calculate new quantity

    // Ensure quantity does not go below zero
    if (qty < 0) {
      alert("Quantity cannot be negative.");
      return;
    }

    // Update inventory item and add transaction
    updateInventoryItem({
      id: item?.id,
      data: {
        ...item,
        category_name: item?.category?.name,
        quantity: qty,
      },
    });

    addTransaction({
      inventory_item_id: item?.id,
      quantity_change: qty,
      transaction_type: "remove",
      farm_id: Number(farm?.id),
    });
    setOpen(false);
  };

  return (
    <div className="w-full lg:w-fit">
      <CustomModal
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button variant={"outline"} size={"sm"} className="bg-transparent w-full lg:w-fit hover:text-black">
            <GrSubtract className={iconClassName} />
          </Button>
        }
        body={
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Minimum quantity is 1" },
              })}
              label="Quantity to Remove"
              type="number"
            />
            <Button type="submit">Remove Quantity</Button>
          </form>
        }
      />
    </div>
  );
}

export default RemoveQuantity;
