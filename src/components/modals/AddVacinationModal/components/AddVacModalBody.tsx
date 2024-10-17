import LocalFarmVacines from "./LocalFarmVaccines";
import { useVaccinateStore } from "@/app/(dashboard)/dashboard/records/category/[category_id]/[slug]/components.tsx/useVaccinate";
import VaccineCard from "@/app/(dashboard)/components/VaccineCard";
import CustomInput from "@/components/ui/CustomInput";
import { useForm } from "react-hook-form";
import { AddVaccinationBody } from "@/lib/api/vaccination";
import CustomSwitch from "@/components/CustomSwitch";
import { Button } from "@/components/ui/button"; // Import your button component
import useVaccinations, {
  useAddVaccination,
} from "@/lib/hooks/useVaccinations";
import { useAppStore } from "@/lib/store/useAppStore";
import useDisclosure from "@/lib/hooks/useDisclosure";

type Props = {
  setOpen: any;
};

function AddVacModalBody({ setOpen }: Props) {
  const {
    selectedVaccine,
    selectedRecords,
    setSelectedVaccine,
    clearSelection,
  } = useVaccinateStore();

  const { addVaccination } = useAddVaccination(selectedRecords);
  const { register, handleSubmit, setValue, watch } =
    useForm<AddVaccinationBody>({
      defaultValues: {
        repeat: false, 
        repeat_every_n_days: 30, 
      },
    });

  const { DBDetails } = useAppStore();

  const isRepeat = watch("repeat");

  // Submit handler
  const onSubmit = (data: AddVaccinationBody) => {
    //provide instances where these are now
    data.records = selectedRecords;
    data.vaccine_id = Number(selectedVaccine?.id);
    data.farm_id = DBDetails?.farm_id as number;
    addVaccination(data);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p>You have selected {selectedRecords?.length} records to vaccinate</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="flex flex-col gap-5 overflow-y-auto">
          {!selectedVaccine && <p>Select Vaccine</p>}{" "}
          {!selectedVaccine && <LocalFarmVacines />}{" "}
          {selectedVaccine && <VaccineCard vaccine={selectedVaccine} />}
        </div>

        <div className="h-full bg-green2 rounded-xl px-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex  justify-center items-start h-full flex-col gap-5">
            <CustomInput
              {...register("vaccination_date", {
                required: "Date is required",
              })}
              label="Vaccination Date"
              type="date"
            />

            <CustomSwitch
              id="repeat"
              label="Repeat"
              defaultChecked={false}
              onChange={(value) => setValue("repeat", value)} // Update repeat field value
            />

            {isRepeat && (
              <CustomInput
                {...register("repeat_every_n_days", {
                  required: "Number of days to repeat is required",
                  min: { value: 1, message: "Must be at least 1 day" },
                })}
                label="Repeat in how many days?"
                type="number"
              />
            )}

            {/* Submit Button */}
            <Button type="submit" variant="default">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddVacModalBody;
