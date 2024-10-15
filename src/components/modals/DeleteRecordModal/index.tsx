import React, { useEffect } from "react"; // Import useEffect
import { Button } from "../../ui/button";
import CustomModal from "../../ui/CustomDialog";

import useDisclosure from "@/lib/hooks/useDisclosure";
import { MdDeleteSweep } from "react-icons/md";
import InfoText from "@/components/InfoText";
import { Record } from "@/lib/types/record";
import useRecords from "@/lib/hooks/useRecords";

type DeleteRecordModalProps = {
  record: Record; // Data to populate form for editing
  className?: string;
};

function DeleteRecordModal({ record, className }: DeleteRecordModalProps) {
  const { handleDelete } = useRecords();
  const { open, setOpen } = useDisclosure();

  return (
    <div>
      <CustomModal
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button variant={"destructive"} size={"sm"}>
            <MdDeleteSweep /> Delete {record?.name}
          </Button>
        }
        body={
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col gap-5">
              <h5>
                Are you sure you want to delete{" "}
                <span className="font-bold capitalize">{record?.name}</span>{" "}
                from your farm
              </h5>

              <InfoText text="This will delete all related sales, inventories and other activities of this record in your farm" />
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
                  handleDelete(record);
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

export default DeleteRecordModal;
