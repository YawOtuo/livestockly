import TotalSales from "@/app/(dashboard)/components/TotalSalesCard";
import { useGetUserFarmDetails } from "@/lib/hooks/useFarm";
import useLivestockData from "@/lib/hooks/useLivestockRecords";
import useWorkers from "../../workers/hooks/useWorkers";
import FarmTotalsCard from "./FarmTotalsCard";

function FarmTotals() {
  const { data: farm } = useGetUserFarmDetails();
  const { workers, isLoadingWorkers } = useWorkers();

  const livestockDataQueries = useLivestockData();
  return (
    <div className="flex  gap-5 lg:gap-5 justify-start items-center w-full flex-wrap">
      {/* Render TotalSales for each livestock category */}
      {livestockDataQueries?.map((query, index) => {
        const isLoading = query.isLoading;
        const records = query.data;
        const error = query.error;

        return (
          <FarmTotalsCard
            isLoading={isLoading}
            key={index}
            amount={records?.length || 0}
            filter={farm?.livestock_categories[index]?.name as string}
            url={`/dashboard/records/category/${
              farm?.livestock_categories[index]?.id
            }/${farm?.livestock_categories[index]?.name.toLowerCase()}`}
          />
        );
      })}

      <FarmTotalsCard
        isLoading={isLoadingWorkers}
        amount={workers?.length as number}
        filter="Workers"
        url="/dashboard"
      />
    </div>
  );
}

export default FarmTotals;
