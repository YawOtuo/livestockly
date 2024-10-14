import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import CustomModal from "@/components/ui/CustomDialog";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/ui/CustomInput";
import CustomSwitch from "@/components/CustomSwitch";
import { SelectSireModal } from "@/components/select-sire-modal";
import useRecordFormSubmission from "./useRecordFormSubmission";
import { GetOneRecord } from "@/lib/api/record";
import { LivestockCategory } from "@/lib/types/livestockcategory";
import { Record } from "@/lib/types/record";
import CustomSelect from "@/components/ui/CustomSelect";
import useLivestockData from "@/lib/hooks/useLivestockRecords";
import useFarm from "@/lib/hooks/useFarm";
import AddVaccinationModal from "../AddVacinationModal";

type Props = {
  edit?: boolean;
  record?: Record;
  category?: LivestockCategory;
  title?: string;
  variant?: "icon" | "text";
  iconClassname?: string;
};

export default function AddRecordModal({
  edit,
  record,
  title,
  variant,
  category,
  iconClassname,
}: Props) {
  const [open, setOpen] = useState(false);
  const [sire, setSire] = useState<Record>();
  const [dam, setDam] = useState<Record>();
  const [otherData, setOtherData] = useState<{
    gender: string;
    castrated: boolean;
    alive: boolean;
    category?: LivestockCategory; // Add this line
  }>({
    gender: "",
    castrated: true,
    alive: false,
  });

  const { handleSubmit: submitForm } = useRecordFormSubmission({
    edit,
    otherData,
    setOpen,
    dam,
    sire,
    record,
    category,
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: record?.name || "",
      tag_colour: record?.tag_colour || "",
      colour: record?.colour || "",
      number_of_kids: record?.number_of_kids || 0,
      date_of_birth: record?.date_of_birth || "",
    },
  });

  const { data: sire_ } = useQuery(
    [`${record?.category?.name}-${record?.sire}`],
    () => GetOneRecord(Number(record?.sire)),
    { enabled: !!record?.sire }
  );

  const { data: dam_ } = useQuery(
    [`${record?.category?.name}-${record?.dam}`],
    () => GetOneRecord(Number(record?.dam)),
    { enabled: !!record?.dam }
  );

  useEffect(() => {
    if (sire_) setSire(sire_);
    if (dam_) setDam(dam_);
  }, [sire_, dam_]);

  useEffect(() => {
    setOtherData((prevData) => ({
      ...prevData,
      category: category,
    }));
  }, []);

  useEffect(() => {
    if(record){
      setOtherData({
        gender: record?.gender,
        castrated: record?.castrated,
        alive: record?.alive,
      })
    }
  }, [record]);

  const onSubmit = (data: any) => {
    submitForm(data);
  };
  const { farm } = useFarm();

  const categories_options = farm?.livestock_categories?.map((r) => ({
    label: r.name,
    value: String(r.id),
  }));

  return (
    <div>
      <CustomModal
        onOpenChange={setOpen}
        open={open}
        trigger={
          <Button variant={variant == "icon" ? "ghost" : "default"}>
            {variant == "icon" ? (
              edit ? (
                <img src={"/icons/edit.png"} width="90%" />
              ) : (
                <IoIosAddCircleOutline
                  className={`text-primary text-xl ${iconClassname}`}
                />
              )
            ) : (
              <div className="flex gap-1 items-center">
                <p className="whitespace-nowrap">{title}</p>
              </div>
            )}
          </Button>
        }
        size={"7xl"}
        body={
          <form onSubmit={handleSubmit(onSubmit)}>
            {edit ? "EDIT RECORD" : `NEW RECORD ${category?.name || ""}`}

            <div className="pt-4 text-black grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="flex flex-col gap-5">
                <CustomInput
                  label="Tag Name"
                  type="text"
                  {...register("name", { required: true })}
                />

                <CustomInput
                  label="Tag Colour"
                  type="text"
                  {...register("tag_colour")}
                />

                <CustomInput
                  label="Colour"
                  type="text"
                  {...register("colour")}
                />

                <CustomInput
                  label="Number of Kids"
                  type="number"
                  {...register("number_of_kids")}
                />
              </div>

              <div className="flex flex-col gap-5">
                <CustomSelect
                  valueField={"value"}
                  labelField={"label"}
                  label="Gender"
                  data={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                  initialValue={otherData.gender || "male"}
                  onChange={(value) =>
                    setOtherData((prevData) => ({ ...prevData, gender: value }))
                  }
                />
                <CustomSelect
                  valueField={"value"}
                  labelField={"label"}
                  label="Castrated"
                  data={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                  ]}
                  initialValue={otherData.castrated === false ? "no" : "yes"}
                  onChange={(value) =>
                    setOtherData((prevData) => ({
                      ...prevData,
                      castrated: value === "yes",
                    }))
                  }
                />
                <CustomSelect
                  valueField={"value"}
                  labelField={"label"}
                  label="Category"
                  data={categories_options ?? []}
                  initialValue={String(otherData?.category?.id)}
                  onChange={(value) => {
                    const selectedCategory = farm?.livestock_categories?.find(
                      (category) => String(category.id) === value
                    );
                    console.log(selectedCategory);
                    setOtherData((prevData) => ({
                      ...prevData,
                      category: selectedCategory,
                    }));
                  }}
                />

                <CustomInput
                  required
                  label="Date of Birth"
                  type="date"
                  {...register("date_of_birth")}
                />
              </div>

              <div className="flex flex-col gap-5 items-start">
                <div className="flex items-start flex-col gap-5">
                  <div className="flex items-center gap-2">
                    <p> Father&apos;s Tag </p>
                    <span className="text-greendeep">{sire?.name}</span>
                  </div>
                  <SelectSireModal
                    setParent={setSire}
                    category={category?.id}
                    name="father"
                  />
                </div>
                <div className="flex items-start flex-col gap-5">
                <div  className="flex items-center gap-2">
                    <p> Mother&apos;s Tag </p>
                    <span className="text-greendeep">{dam?.name}</span>
                </div>
                  <SelectSireModal
                    category={category?.id}
                    setParent={setDam}
                    name="mother"
                  />
                </div>
                <CustomSwitch
                  id="alive"
                  label="Alive"
                  defaultChecked={otherData?.alive}
                  onChange={(value) =>
                    setOtherData((prevData) => ({
                      ...prevData,
                      alive: value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="w-full text-center mt-5 rounded-lg bg-green1">
              <Button type="submit" className="w-full">
                <span className="text-white">{edit ? "EDIT" : "ADD"}</span>
              </Button>
            </div>
          </form>
        }
      />
    </div>
  );
}
