import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import CustomModal from "../../ui/CustomDialog";
import CustomInput from "@/components/ui/CustomInput";

import useDisclosure from "@/lib/hooks/useDisclosure";
import { CiEdit } from "react-icons/ci";
import { useCategory } from "@/lib/hooks/useCategory";
import { AddCategoryBody } from "@/lib/api/category";
import { InventoryCategory } from "@/lib/types/inventory";

type Props = {
  category: InventoryCategory;
};

function EditCategoryModal({ category }: Props) {
  const { updateCategory } = useCategory(); // Assuming useVaccinations returns addVaccination function
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddCategoryBody>();
  const { open, setOpen } = useDisclosure();

  useEffect(() => {
    if (category) {
      reset({
        ...category,
      });
    }
  }, [category]);
  const onSubmit = async (data: AddCategoryBody) => {
    // data.type = "local";

    try {
      await updateCategory({
        category_id: category.id,
        categoryData: data,
      });
      reset(); // Reset the form fields after submission
      setOpen(false);
    } catch (error) {
      console.error("Failed to add vaccine", error);
    }
  };

  return (
    <div className="w-full lg:w-fit">
      <CustomModal
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button
            size={"sm"}
            variant={"outline"}
            className="w-full lg:w-fit text-xs  hover:bg-transparent bg-transparent">
            <CiEdit />
          </Button>
        }
        body={
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4">
            <CustomInput
              label="Category Name"
              {...register("name", {
                required: "Name is required",
              })}
              errorText={errors.name?.message}
            />

            <Button type="submit">Update category</Button>
          </form>
        }
      />
    </div>
  );
}

export default EditCategoryModal;
