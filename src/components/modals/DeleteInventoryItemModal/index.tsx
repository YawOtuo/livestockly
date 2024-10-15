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
import { MdDeleteSweep } from "react-icons/md";
import InfoText from "@/components/InfoText";

type DeleteInventoryItemModalProps = {
  item?: InventoryItem; // Data to populate form for editing
  className?: string;
};

function DeleteInventoryItemModal({
  item,
  className,
}: DeleteInventoryItemModalProps) {
  const { addInventoryItem, updateInventoryItem, deleteInventoryItem } =
    useInventory();
  const { open, setOpen } = useDisclosure();

  return (
    <div>
      <CustomModal
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button variant={"destructive"} size={"sm"}>
            <MdDeleteSweep /> Delete {item?.name}
          </Button>
        }
        body={
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col gap-5">
              <h5>
                Are you sure you want to delete{" "}
                <span className="font-bold capitalize">{item?.name}</span> from
                your farm
              </h5>

              <InfoText text="This will delete all related sales and inventories in your farm" />
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
                  deleteInventoryItem(item as InventoryItem);
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

export default DeleteInventoryItemModal;
