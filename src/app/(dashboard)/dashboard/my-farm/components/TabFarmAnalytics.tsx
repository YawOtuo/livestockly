import LivestockGrowthChart from "./LivestockGrowthCharts";
import LivestockPopulationChart from "./LivestockPopulationChart";

function TabFarmAnalytics() {
  return (
    <div className="py-5">
      <LivestockPopulationChart />
      <LivestockGrowthChart />
    </div>
  );
}

export default TabFarmAnalytics;
