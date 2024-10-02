"use client";
import useFarm from "@/lib/hooks/useFarm";

import React from "react";

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
<div className="p-5 lg:p-10">
        <div className="flex flex-col items-start gap-5">
          <InfoComponent
            label="Farm Name"
            value={farm?.name }
          />
          <InfoComponent
            label="Livestock Types"
            value={farm?.livestocktypes}
          />
          <InfoComponent
            label="Location"
            value={farm?.location}
          />{" "}
          <InfoComponent
            label="Number of workers"
            value={farm?.number_of_workers}
          />{" "}
          <InfoComponent
            label="Size"
            value={farm?.size}
          />
          {/* Add more InfoComponent instances as needed */}
        </div>
</div>
  );
}

export default Page;
