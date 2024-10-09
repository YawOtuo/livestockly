import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import CustomModal from "../../ui/CustomDialog";
import CustomInput from "@/components/ui/CustomInput";
import useVaccines from "@/lib/hooks/useVaccines";
import { AddVaccineBody } from "@/lib/api/vaccines";
import { useInventory } from "@/lib/hooks/useInventory";
import { AddInventoryItemBody } from "@/lib/api/inventory";

function AddInventoryItemModal() {
  const { addInventoryItem } = useInventory(); // Assuming useVaccinations returns addVaccination function
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddInventoryItemBody>();

  const onSubmit = async (data: AddInventoryItemBody) => {

    try {
      await addInventoryItem(data); // Call your addVaccination API
      reset(); // Reset the form fields after submission
    } catch (error) {
      console.error("Failed to add vaccine", error);
    }
  };

  return (
    <div>
      <CustomModal
        trigger={<Button variant={"default"} size={"sm"}>Add  New Item</Button>}
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
                required: "Expiration date is required",
              })}
              errorText={errors.category_name?.message}
            />

            <CustomInput
              label="Quantity"
              {...register("quantity", {
                required: "Expiration date is required",
              })}
              errorText={errors.quantity?.message}
            />

            <Button type="submit">Add Item</Button>
          </form>
        }
      />
    </div>
  );
}

export default AddInventoryItemModal;
