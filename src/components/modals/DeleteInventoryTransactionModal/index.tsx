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
import { MdOutlineDelete } from "react-icons/md";
import InfoText from "@/components/InfoText";

type Props = {
  transaction: InventoryTransaction;
  item_name: string
};

function DeleteInventoryTransactionModal({ transaction, item_name }: Props) {
  const { deleteTransaction } = useInventoryTransactions(transaction?.id); // Assuming useVaccinations returns addVaccination function
  const { setOpen, open } = useDisclosure();
  return (
    <div>
      <CustomModal
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button
            variant={"destructive"}
            size={"sm"}
            className="max-w-[150px] bg-gray-500">
            <MdOutlineDelete />
          </Button>
        }
        body={
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col gap-5">
              <h5>
                Are you sure you want to delete this activity from your farm
              </h5>

              <InfoText
                className="bg-red-300"
                text={`
                This will ${
                  transaction?.transaction_type == "add" ? "remove" : ""
                } ${transaction?.transaction_type == "remove" ? "add" : ""}
                ${transaction?.quantity_change}
                from your inventory
                `}
              />
            </div>
            <div className="flex items-center justify-center gap-5 w-full">
              <Button
                variant={"secondary"}
                type="submit"
                onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button
                variant={"destructive"}
                type="submit"
                onClick={() => {
                  deleteTransaction({
                    transaction_id: transaction?.id as number,
                    quantity_change: transaction?.quantity_change,
                 item_name: item_name });
                  setOpen(false);
                }}>
                Delete
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default DeleteInventoryTransactionModal;
