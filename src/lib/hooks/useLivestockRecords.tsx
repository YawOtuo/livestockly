import { useGetUserFarmDetails } from "@/lib/hooks/useFarm";
import { useQueries } from "@tanstack/react-query";
import { GetAllFarmRecordsSp } from "@/lib/api/farm";
import { useAppStore } from "../store/useAppStore";

const useLivestockData = () => {
  const { data: farm } = useGetUserFarmDetails();
  const { DBDetails } = useAppStore();

  const livestockDataQueries = useQueries({
    queries:
      farm?.livestock_categories?.map((category) => ({
        queryKey: [category.name.toLowerCase()],
        queryFn: () =>
          GetAllFarmRecordsSp(
            DBDetails?.farm_id as number,
            category.name.toLowerCase()
          ),
        enabled: !!farm?.id && !!DBDetails?.farm_id,
      })) ?? [],
  });

  return livestockDataQueries;
};

export default useLivestockData;
