import React, { useEffect } from "react"; // Import useEffect
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import CustomModal from "../../ui/CustomDialog";
import CustomInput from "@/components/ui/CustomInput";
import { useInventory } from "@/lib/hooks/useInventory";
import { AddInventoryItemBody } from "@/lib/api/inventory";
import { InventoryItem } from "@/lib/types/inventory";
import useDisclosure from "@/lib/hooks/useDisclosure";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import InfoText from "@/components/InfoText";

type AddInventoryItemModalProps = {
  initialData?: InventoryItem; // Data to populate form for editing
  edit?: boolean; // Flag to indicate edit mode
  className?: string;
};

function AddInventoryItemModal({
  initialData,
  edit = false,
  className,
}: AddInventoryItemModalProps) {
  const { addInventoryItem, updateInventoryItem } = useInventory();
  const { open, setOpen } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddInventoryItemBody>();

  // Populate form with initial data when it changes
  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        category_name: initialData.category.name,
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data: AddInventoryItemBody) => {
    try {
      if (edit) {
        // If in edit mode, update the inventory item
        await updateInventoryItem({ id: Number(initialData?.id), data: data }); // Call your update function
      } else {
        // Otherwise, add a new inventory item
        await addInventoryItem(data); // Call your add function
      }
      reset(); // Reset the form fields after submission
    } catch (error) {
      console.error("Failed to save inventory item", error);
    }
    setOpen(false);
  };

  return (
    <div>
      <CustomModal
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button
            variant={"secondary"}
            size={"sm"}
            className={`${!edit ? "bg-bsecondary-400 text-white hover:bg-bsecondary-600" : "text-black"} ${className}`}>
            {!edit ? (
              <CiCirclePlus className="mr-1 text-xl" />
            ) : (
              <CiEdit className="mr-2" />
            )}
            {edit ? "Edit Item" : "Add New Item"}
          </Button>
        }
        body={
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4">
            <CustomInput
              label="Item Name"
              {...register("name", { required: "Item name is required" })}
              errorText={errors.name?.message}
            />

            <CustomInput
              label="Category"
              {...register("category_name", {
                required: "Category is required",
              })}
              errorText={errors.category_name?.message}
            />

            <CustomInput
              label="Quantity"
              type="number" // Ensure quantity is a number input
              {...register("quantity", {
                required: "Quantity is required",
              })}
              errorText={errors.quantity?.message}
            />
            <CustomInput
              label="Threshold Quantity"
              {...register("alert_threshold", {
                required: "Threshold Quantity is required",
              })}
              errorText={errors.alert_threshold?.message}
            />
            <InfoText text="Threshold quantity is the quantity that if the item is below that quantity you would receive alerts to refill" size={"xs"}  />

            <Button type="submit">{edit ? "Update Item" : "Add Item"}</Button>
          </form>
        }
      />
    </div>
  );
}

export default AddInventoryItemModal;
