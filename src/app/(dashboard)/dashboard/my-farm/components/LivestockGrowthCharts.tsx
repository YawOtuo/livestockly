import { GetAllFarmRecordsSp } from "@/lib/api/farm";
import { useGetUserFarmDetails } from "@/lib/hooks/useFarm";
import { Record } from "@/lib/types/record";
import { useQueries } from "@tanstack/react-query";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LivestockGrowthChart = () => {
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

  // Define the type for livestock growth data
  interface GrowthData {
    month: string;
    [key: string]: number | string; // Allow dynamic keys for livestock categories
  }

  // Prepare livestock growth data from queries
  const livestockGrowthData = React.useMemo(() => {
    const growthData: GrowthData[] = Array.from(
      { length: 12 },
      (_, monthIndex) => ({
        month: new Date(0, monthIndex).toLocaleString("default", {
          month: "long",
        }),
        ...farm?.livestock_categories?.reduce((acc, category) => {
          acc[category.name.toLowerCase()] = 0;
          return acc;
        }, {} as { [key: string]: number }),
      })
    );

    livestockDataQueries.forEach((query, index) => {
      if (query.data && farm?.livestock_categories) {
        const category = farm.livestock_categories[index];
        if (category) {
          const categoryName = category.name.toLowerCase();

          query.data.forEach((record: Record) => {
            const monthIndex = new Date(record.created_at).getMonth();
            const recordYear = new Date(record.created_at).getFullYear(); // Extract the year from created_at
            
            const currentYear = new Date().getFullYear(); // Get the current year
            
            // Ensure the record year matches the current year before incrementing
            if (monthIndex >= 0 && monthIndex < growthData.length && recordYear === currentYear) {
              (growthData[monthIndex][categoryName] as number) += 1;
            }
          });
        }
      }
    });

    console.log(growthData); // Debugging: Check the generated growth data
    return growthData;
  }, [livestockDataQueries, farm]);

  const categoryColors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#ff0000",
    "#0000ff",
    "#ff00ff",
    "#00ff00",
  ];

  return (
    <div className="w-full">
      <h5>Livestock Growth Over Time</h5>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={livestockGrowthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {farm?.livestock_categories?.map((category, index) => (
            <Area
              key={category.name}
              type="monotone"
              strokeWidth={2}
              dataKey={category.name.toLowerCase()}
              stroke={categoryColors[index % categoryColors.length]}
              fill={categoryColors[index % categoryColors.length]} // Fill the area with color
              activeDot={{ r: 8 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LivestockGrowthChart;
