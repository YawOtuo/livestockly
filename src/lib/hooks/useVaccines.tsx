import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "../store/useAppStore";
import {
  AddVaccine,
  AddVaccineBody,
  DeleteVaccine,
  GetVaccinesByFarm,
  UpdateVaccine,
} from "../api/vaccines"; // Make sure to import the correct API methods

// const useGetOneVaccine = (id: number) =>
//   useQuery(
//     ["vaccines", id], // Unique key for caching
//     async () => {
//       const response = await GetVaccines();
//       return response;
//     }
//   );
export const useVaccines = () => {
  const queryClient = useQueryClient();
  const { DBDetails } = useAppStore();

  const {
    data: vaccines,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ["vaccines"], // Unique key for caching
    async () => {
      const response = await GetVaccinesByFarm(DBDetails?.farm_id as number);
      return response;
    },
    {
      enabled: !!DBDetails?.farm_id, // Enable the query only if DBDetails is defined
    }
  );

  const addVaccineMutation = useMutation(
    async (vaccineData: AddVaccineBody) => {
      vaccineData.farm_id = Number(DBDetails?.farm_id);
      const response = await AddVaccine(vaccineData);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["vaccines"]); // Refetch vaccines after adding
      },
    }
  );

  const updateVaccineMutation = useMutation(
    async ({ id, data }: { id: number; data: AddVaccineBody }) => {
      const response = await UpdateVaccine(id, data);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["vaccines"]); // Refetch vaccines after updating
      },
    }
  );

  const deleteVaccineMutation = useMutation(
    async (vaccineId: number) => {
      const response = await DeleteVaccine(vaccineId);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["vaccines"]); // Refetch vaccines after deleting
      },
    }
  );

  return {
    vaccines,
    isLoading,
    error,
    addVaccine: addVaccineMutation.mutate,
    updateVaccine: updateVaccineMutation.mutate,
    deleteVaccine: deleteVaccineMutation.mutate,
    refetchVaccines: refetch,
  };
};

export default useVaccines;
