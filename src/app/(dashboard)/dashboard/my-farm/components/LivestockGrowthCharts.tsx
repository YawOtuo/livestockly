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
  LineChart,
  Line,
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
            if (
              monthIndex >= 0 &&
              monthIndex < growthData.length &&
              recordYear === currentYear
            ) {
              (growthData[monthIndex][categoryName] as number) += 1;
            }
          });
        }
      }
    });

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
      {/* Combined Area Chart */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {farm?.livestock_categories?.map((category, index) => {
          const categoryName = category.name.toLowerCase();
          const categoryData = livestockGrowthData.map((data) => ({
            month: data.month,
            [categoryName]: data[categoryName],
          }));

          return (
            <div key={category.name} className="my-8">
              <h6 className="capitalize">
                <span className="font-bold text-primary">{category.name}</span>{" "}
                Growth Over Time
              </h6>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey={categoryName}
                    stroke={categoryColors[index % categoryColors.length]}
                    fill={categoryColors[index % categoryColors.length]}
                    activeDot={{ r: 8 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>

      <div className="my-8">
        <h6>Combined Growth of All Livestock Categories</h6>
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
                stroke={categoryColors[index % categoryColors.length]}
                fill={categoryColors[index % categoryColors.length]}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LivestockGrowthChart;
