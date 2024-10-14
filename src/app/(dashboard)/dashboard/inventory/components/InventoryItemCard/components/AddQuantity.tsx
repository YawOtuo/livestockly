import { Button } from "@/components/ui/button";
import CustomModal from "@/components/ui/CustomDialog";
import CustomInput from "@/components/ui/CustomInput";
import useFarm from "@/lib/hooks/useFarm";
import { useInventory } from "@/lib/hooks/useInventory";
import { useAddAndUpdateInventoryTransaction } from "@/lib/hooks/useInventoryTransactions";
import { InventoryItem } from "@/lib/types/inventory";
import { GrAddCircle } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { useForm } from "react-hook-form";
import useDisclosure from "@/lib/hooks/useDisclosure";

type Props = {
  item: InventoryItem;
  iconClassName?: string;
};

function AddQuantity({ item, iconClassName }: Props) {
  const { addTransaction } = useAddAndUpdateInventoryTransaction(item?.id);
  const { updateInventoryItem } = useInventory();
  const { farm } = useFarm();
  const { open, setOpen } = useDisclosure();
  
  // Use useForm hook from React Hook Form
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      quantity: 5, // Default quantity
    },
  });

  const onSubmit = (data: { quantity: number }) => {
    const qty = Number(item?.quantity) + Number(data.quantity);

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
      transaction_type: "add",
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
          <Button  size={"sm"} variant={"outline"} className="bg-transparent w-full lg:w-fit hover:text-black">
            <IoMdAdd className={iconClassName} />
          </Button>
        }
        body={
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              {...register("quantity", { required: "Quantity is required" })}
              label="Quantity"
              type="number"
            />
            <Button type="submit">Add Quantity</Button>
          </form>
        }
      />
    </div>
  );
}

export default AddQuantity;
