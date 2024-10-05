import { GetAllFarmRecordsSp } from "@/lib/api/farm";
import { useGetUserFarmDetails } from "@/lib/hooks/useFarm";
import { Record } from "@/lib/types/record";
import { useQueries } from "@tanstack/react-query";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const LivestockPopulationChart = () => {
  const { data: farm } = useGetUserFarmDetails();

  // Fetch data for each livestock category
  const livestockDataQueries = useQueries({
    queries:
      farm?.livestock_categories?.map((category) => ({
        queryKey: [category.name.toLowerCase()],
        queryFn: () =>
          GetAllFarmRecordsSp(farm?.id as number, category.name.toLowerCase()),
        enabled: !!farm?.id,
      })) ?? [],
  });

  // Prepare livestock population data
  const livestockPopulationData = React.useMemo(() => {
    const populationData = farm?.livestock_categories?.map((category, index) => {
      const categoryName = category.name.toLowerCase();
      const population = livestockDataQueries[index]?.data?.length || 0; // Count records for each category
      return {
        name: categoryName,
        value: population,
      };
    }) ?? [];

    return populationData;
  }, [livestockDataQueries, farm]);

  // Define colors for each slice of the pie chart
  const COLORS = [
    "#8884d8", // Color for the first category
    "#82ca9d", // Color for the second category
    "#ffc658", // Color for the third category
    "#ff7300", // Color for the fourth category
    "#ff0000", // Color for the fifth category
    "#0000ff",
    "#ff00ff",
    "#00ff00",
  ];

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={livestockPopulationData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            label
          >
            {livestockPopulationData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LivestockPopulationChart;
