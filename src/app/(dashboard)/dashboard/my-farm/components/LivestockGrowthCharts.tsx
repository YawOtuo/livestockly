import { GetAllFarmRecordsSp } from "@/lib/api/farm";
import { useGetUserFarmDetails } from "@/lib/hooks/useFarm";
import { Record } from "@/lib/types/record";
import { useQueries } from "@tanstack/react-query";
import React from "react";
import {
  LineChart,
  Line,
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
    // Create initial growthData based on livestock categories
    const growthData: GrowthData[] = Array.from(
      { length: 12 },
      (_, monthIndex) => ({
        month: new Date(0, monthIndex).toLocaleString("default", {
          month: "long",
        }), // Get month name
        ...farm?.livestock_categories?.reduce((acc, category) => {
          acc[category.name.toLowerCase()] = 0; // Initialize each category count to 0
          return acc;
        }, {} as { [key: string]: number }), // Start with an empty object
      })
    );

    livestockDataQueries.forEach((query, index) => {
      if (query.data && farm?.livestock_categories) {
        const category = farm.livestock_categories[index];
        if (category) {
          const categoryName = category.name.toLowerCase();

          query.data.forEach((record: Record) => {
            const monthIndex = new Date(record.date_of_birth).getMonth(); // Get the month index (0-11)
            if (monthIndex >= 0 && monthIndex < growthData.length) {
              (growthData[monthIndex][categoryName] as number) += 1; // Increment the count for the appropriate month
            }
          });
        }
      }
    });

    return growthData;
  }, [livestockDataQueries, farm]);

  // Define an array of colors for different categories
  const categoryColors = [
    "#8884d8", // Color for the first category
    "#82ca9d", // Color for the second category
    "#ffc658", // Color for the third category
    "#ff7300", // Color for the fourth category
    "#ff0000", // Color for the fifth category (add more colors as needed)
    "#0000ff",
    "#ff00ff",
    "#00ff00",
  ];

  return (
    <div className="w-full">
      <h4>Livestock Growth Over Time</h4>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={livestockGrowthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {farm?.livestock_categories?.map((category, index) => (
            <Line
              key={category.name}
              type="monotone"
              dataKey={category.name.toLowerCase()}
              stroke={categoryColors[index % categoryColors.length]} // Use color based on the index
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LivestockGrowthChart;
