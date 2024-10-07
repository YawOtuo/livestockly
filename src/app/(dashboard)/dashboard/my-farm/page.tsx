"use client";
import useFarm from "@/lib/hooks/useFarm";

import React from "react";
import CustomTabs from "@/components/ui/CustomTabs";
import TabFarmTotals from "./components/TabFarmTotals";
import TabFarmAnalytics from "./components/TabFarmAnalytics";
import TabFarmDetails from "./components/TabFarmDetails";

function Page() {
  const { farm } = useFarm();

  return (
    <div className="p-5">
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
        ]}
      />
    </div>
  );
}

export default Page;
