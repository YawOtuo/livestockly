import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import CustomModal from "../../ui/CustomDialog";
import { InventoryCategory } from "@/lib/types/inventory";

import useDisclosure from "@/lib/hooks/useDisclosure";
import { MdDeleteSweep, MdOutlineDelete } from "react-icons/md";
import InfoText from "@/components/InfoText";
import { useCategory } from "@/lib/hooks/useCategory";

type Props = {
  category: InventoryCategory;
};

function DeleteCategoryModal({ category }: Props) {
  const { deleteCategory } = useCategory(); // Assuming useVaccinations returns addVaccination function
  const { setOpen, open } = useDisclosure();
  return (
    <div className="w-full lg:w-fit">
      <CustomModal
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button
            size={"sm"}
            variant={"outline"}
            className="w-full lg:w-fit text-xs hover:bg-transparent bg-transparent">
            <MdDeleteSweep />
          </Button>
        }
        body={
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col gap-5">
              <h5>
                Are you sure you want to delete this category from your farm
              </h5>

              <InfoText
                className="bg-red-300"
                text={`
                This will remove ${category.name} and all its items
                from your inventory and account
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
                  deleteCategory(category);
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

export default DeleteCategoryModal;
