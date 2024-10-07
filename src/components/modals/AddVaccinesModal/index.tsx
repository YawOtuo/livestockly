import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import CustomModal from "../../ui/CustomDialog";
import CustomInput from "@/components/ui/CustomInput";
import useVaccines from "@/lib/hooks/useVaccines";

interface AddVaccineFormValues {
  name: string;
  manufacturer: string;
  expiration_date: string;
  type: "global" | "local";
}

function AddVaccineModal() {
  const { addVaccine } = useVaccines(); // Assuming useVaccinations returns addVaccination function
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddVaccineFormValues>();

  const onSubmit = async (data: AddVaccineFormValues) => {
    data.type = "local";
    try {
      await addVaccine(data); // Call your addVaccination API
      reset(); // Reset the form fields after submission
    } catch (error) {
      console.error("Failed to add vaccine", error);
    }
  };

  return (
    <div>
      <CustomModal
        trigger={<Button variant={"secondary"}>Add Vaccine</Button>}
        body={
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4">
            <CustomInput
              label="Vaccine Name"
              {...register("name", { required: "Vaccine name is required" })}
              errorText={errors.name?.message}
            />
            <CustomInput
              label="Manufacturer"
              {...register("manufacturer", {
                required: "Manufacturer is required",
              })}
              errorText={errors.manufacturer?.message}
            />
            <CustomInput
              label="Expiration Date"
              type="date"
              {...register("expiration_date", {
                required: "Expiration date is required",
              })}
              errorText={errors.expiration_date?.message}
            />
            {/* <CustomInput
              label="Type"
              {...register("type", { required: "Type is required" })}
              errorText={errors.type?.message}
              type="select" // Update this if you want a dropdown for types
            >
              <option value="">Select Type</option>
              <option value="global">Global</option>
              <option value="local">Local</option>
            </CustomInput> */}

            <Button type="submit">Add Vaccine</Button>
          </form>
        }
      />
    </div>
  );
}

export default AddVaccineModal;
