"use client";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/CustomTextArea";
import { AddFarmBody } from "@/lib/api/farm";
import { Button } from "@/components/ui/button";
import FormErrorText from "@/components/ui/FormErrorText";
import BackButton from "@/components/ui/BackButton";
import useFarm from "@/lib/hooks/useFarm";

function Page() {
  const { createFarm } = useFarm();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddFarmBody>();

  const onSubmit = async (data: AddFarmBody) => {
    await createFarm(data);
    reset()
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 w-full relative">
      <div className="bg-green2 flex items-start lg:items-center justify-center flex-col gap-3 px-5 lg:px-10 lg:sticky top-0 left-0  max-h-screen py-24">
        <div className="absolute top-5 left-5 lg:left-10">
          <BackButton />
        </div>
        <h2 className="text-primary">Register your farm</h2>
        <p className="text-gray-800 text-sm lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, eaque
          necessitatibus. Beatae explicabo corporis fuga consequuntur officia!
        </p>
      </div>
      <div className="col-span-2 w-full px-5 lg:px-24 py-5 lg:py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:w-[70%] flex flex-col gap-5">
          <CustomInput
            errorText={errors.name && errors.name.message}
            label="Farm Name"
            {...register("name", { required: "Farm Name is required" })}
          />

          <CustomInput
            errorText={errors.location && errors.location.message}
            label="Location"
            {...register("location", { required: "Location is required" })}
          />

          {errors.location && <p>{errors.location.message}</p>}

          <CustomInput
            type="number"
            errorText={errors.size && errors.size.message}
            label="Size (in acres)"
            {...register("size", { required: "Size is required" })}
          />

          <CustomInput
            type="number"
            errorText={
              errors.number_of_workers && errors.number_of_workers.message
            }
            label="Number of workers (approximate number)"
            {...register("number_of_workers", {
              required: "number_of_workers is required",
            })}
          />

          <CustomInput
            placeholder="eg: sheep, goats, poultry"
            errorText={errors.livestocktypes && errors.livestocktypes.message}
            label="Different Types of Livestock"

            {...register("livestocktypes", {
              required: "Types of Livestock is required",
            })}
          />

          <Button className="w-full" variant={"default"} type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
