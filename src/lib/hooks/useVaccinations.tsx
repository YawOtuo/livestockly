import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAppStore } from "../store/useAppStore";
import {
  AddVaccination,
  AddVaccinationBody,
  DeleteVaccination,
  GetVaccinationsByRecord,
  UpdateVaccination,
} from "../api/vaccination";

export const useGetOneRecordVaccinations = (recordId: number) => {
  const { DBDetails } = useAppStore();

  return useQuery(
    ["vaccinations", recordId], // Unique key for caching
    async () => {
      const response = await GetVaccinationsByRecord(recordId);
      return response;
    },
    {
      enabled: !!DBDetails && !!recordId, // Enable the query only if DBDetails and recordId are defined
    }
  );
};

const useVaccinations = (recordId: number) => {
  const queryClient = useQueryClient();
  const { DBDetails } = useAppStore();

  const {
    data: vaccinations,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ["vaccinations", recordId], // Unique key for caching
    async () => {
      const response = await GetVaccinationsByRecord(recordId);
      return response;
    },
    {
      enabled: !!DBDetails && !!recordId, // Enable the query only if DBDetails and recordId are defined
    }
  );

  const addVaccinationMutation = useMutation(
    async (vaccinationData: AddVaccinationBody) => {
      const response = await AddVaccination(vaccinationData);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["vaccinations", recordId]); // Refetch vaccinations after adding
      },
    }
  );

  const updateVaccinationMutation = useMutation(
    async ({ id, data }: { id: number; data: AddVaccinationBody }) => {
      const response = await UpdateVaccination(id, data);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["vaccinations", recordId]); // Refetch vaccinations after updating
      },
    }
  );

  const deleteVaccinationMutation = useMutation(
    async (vaccinationId: number) => {
      const response = await DeleteVaccination(vaccinationId);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["vaccinations", recordId]); // Refetch vaccinations after deleting
      },
    }
  );

  return {
    vaccinations,
    isLoading,
    error,
    addVaccination: addVaccinationMutation.mutate,
    updateVaccination: updateVaccinationMutation.mutate,
    deleteVaccination: deleteVaccinationMutation.mutate,
    refetchVaccinations: refetch,
  };
};

export default useVaccinations;
