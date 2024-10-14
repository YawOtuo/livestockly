import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import CustomModal from "../../ui/CustomDialog";
import CustomInput from "@/components/ui/CustomInput";
import useVaccines from "@/lib/hooks/useVaccines";
import { InventoryTransaction } from "@/lib/types/inventory";
import {
  useAddAndUpdateInventoryTransaction,
  useInventoryTransactions,
} from "@/lib/hooks/useInventoryTransactions";
import { AddInventoryTransactionBody } from "@/lib/api/inventory_transaction";
import useDisclosure from "@/lib/hooks/useDisclosure";

type Props = {
  transaction: InventoryTransaction;
};

function EditInventoryTransactionModal({ transaction }: Props) {
  const { updateTransaction } = useAddAndUpdateInventoryTransaction(
    transaction?.id
  ); // Assuming useVaccinations returns addVaccination function
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddInventoryTransactionBody>();
  const { open, setOpen } = useDisclosure();

  useEffect(() => {
    if (transaction) {
      reset({
        ...transaction,
      });
    }
  }, [transaction]);
  const onSubmit = async (data: AddInventoryTransactionBody) => {
    // data.type = "local";

    try {
      await updateTransaction({ id: transaction?.id, data: data }); // Call your addVaccination API
      reset(); // Reset the form fields after submission
      setOpen(false)
    } catch (error) {
      console.error("Failed to add vaccine", error);
    }
  };

  return (
    <div>
      <CustomModal
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button variant={"secondary"} className="text-black">
            Edit
          </Button>
        }
        body={
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4">
            <CustomInput
              label="Quantity"
              {...register("quantity_change", {
                required: "Quantity is required",
              })}
              errorText={errors.quantity_change?.message}
            />

            <Button type="submit">Update Transaction</Button>
          </form>
        }
      />
    </div>
  );
}

export default EditInventoryTransactionModal;
