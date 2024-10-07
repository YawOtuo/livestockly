"use client";
import useFarm from "@/lib/hooks/useFarm";

import React, { useState } from "react";
import CustomTabs from "@/components/ui/CustomTabs";
import TabFarmTotals from "./components/TabFarmTotals";
import TabFarmAnalytics from "./components/TabFarmAnalytics";
import TabFarmDetails from "./components/TabFarmDetails";
import TabFarmVaccines from "./components/TabFarmVaccines";
import { CustomCombobox } from "@/components/ui/CustomCombobox";
import { useQuery } from "@tanstack/react-query";
import { GetAllFarmRecordsSp } from "@/lib/api/farm";
import { useAppStore } from "@/lib/store/useAppStore";
import CustomSelect from "@/components/ui/CustomSelect";
import CustomModal from "@/components/ui/CustomDialog";

function Page() {
  const { DBDetails } = useAppStore();

  const {
    isLoading,
    error,
    data: records,
  } = useQuery(
    ["category"], // Query key based on dynamic type
    () => GetAllFarmRecordsSp(DBDetails?.farm_id as number, "sheep")
  );
  const sireOptions = records
    ? records
        .filter((rec) => rec.gender === "male")
        .map((rec) => ({ value: rec.id.toString(), label: rec.name })) // Add value and label
    : [];

  const damOptions = records
    ? records
        .filter((rec) => rec.gender === "female")
        .map((rec) => ({ value: rec.id.toString(), label: rec.name })) // Add value and label
    : [];
  const [selectedSire, setSelectedSire] = useState<string>("");

  const { farm } = useFarm();

  return (
    <div className="">
      <div className="w-full  flex justify-start ">
        <h3 className="capitalize font-semibold text-primary">{farm?.name}</h3>
      </div>
      <CustomTabs
        className="py-5"
        defaultValue="totals"
        tabs={[
          { label: "Totals", value: "totals", content: <TabFarmTotals /> },
          {
            label: "Analytics",
            value: "analytics",
            content: <TabFarmAnalytics />,
          },
          {
            label: "Details",
            value: "details",
            content: <TabFarmDetails />,
          },
          {
            label: "Vaccines",
            value: "Vaccines",
            content: <TabFarmVaccines />,
          },
        ]}
      />
      <CustomModal
        trigger={<div>as</div>}
        body={
          <CustomSelect
            valueField={"value"}
            labelField={"label"}
            label="Gender"
            data={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
            // initialValue={otherData.gender}
          />
        }
      />
    </div>
  );
}

export default Page;
