"use client";
import useFarm from "@/lib/hooks/useFarm";

import React from "react";
import LivestockGrowthChart from "./components/LivestockGrowthCharts";
import LivestockPopulationChart from "./components/LivestockPopulationChart";
import FarmTotals from "./components/FarmTotals";

interface InfoComponentProps {
  label: string;
  value?: string | number; // You can change this type based on your needs
}

const InfoComponent: React.FC<InfoComponentProps> = ({ label, value }) => {
  return (
    <div className="flex items-center gap-2">
      <strong className="text-black">{label}:</strong>
      <span className="text-gray-700">{value || "N/A"}</span>
    </div>
  );
};

function Page() {
  const { farm } = useFarm();

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row gap-5 py-10 px-5 bg-slate-50 items-center justify-center">
        <div className="w-2/5 flex justify-end">
          <h2 className="uppercase text-primary">{farm?.name}</h2>
        </div>
        <LivestockPopulationChart />
      </div>

      <div className="flex flex-col items-start gap-5 p-5">
        <FarmTotals />
        <InfoComponent label="Location" value={farm?.location} />{" "}
   
        {/* <InfoComponent label="Size" value={farm?.size} /> */}
        {/* Add more InfoComponent instances as needed */}
      </div>
      <LivestockGrowthChart />
    </div>
  );
}

export default Page;
