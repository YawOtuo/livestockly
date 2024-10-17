import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddVaccination, AddVaccinationBody, GetVaccinationsByCategory, UpdateVaccination } from "../api/vaccination";
import { GetVaccinationsByRecord, DeleteVaccination } from "../api/vaccination";
import { useAppStore } from "../store/useAppStore";
import { useQuery } from "@tanstack/react-query";
import { useVaccinateStore } from "@/app/(dashboard)/dashboard/records/category/[category_id]/[slug]/components.tsx/useVaccinate";

export const useAddVaccination = (records: number[]) => {
  const queryClient = useQueryClient();
  const { clearSelection} = useVaccinateStore();

  const addVaccinationMutation = useMutation(
    async (vaccinationData: AddVaccinationBody) => {
      const response = await AddVaccination(vaccinationData);
      return response;
    },
    {
      onSuccess: () => {
        clearSelection()
        queryClient.invalidateQueries(["vaccinations"]); // Refetch vaccinations after adding
      },
    }
  );

  return {
    addVaccination: addVaccinationMutation.mutate,
    isAdding: addVaccinationMutation.isLoading,
    addError: addVaccinationMutation.error,
  };
};


export const useUpdateVaccination = (records: number[]) => {
  const queryClient = useQueryClient();

  const updateVaccinationMutation = useMutation(
    async ({ id, data }: { id: number; data: AddVaccinationBody }) => {
      const response = await UpdateVaccination(id, data);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["vaccinations"]); // Refetch vaccinations after updating
      },
    }
  );

  return {
    updateVaccination: updateVaccinationMutation.mutate,
    isUpdating: updateVaccinationMutation.isLoading,
    updateError: updateVaccinationMutation.error,
  };
};

export const useAllCategoriesVaccinations = (category_id: number) => {
  const { DBDetails } = useAppStore();

 return useQuery(
    ["vaccinations-category", category_id], // Unique key for caching
    async () => {
      const response = await GetVaccinationsByCategory(category_id);
      return response;
    },
    {
      enabled: !!DBDetails && !!category_id, // Enable the query only if DBDetails and recordId are defined
    }
  );
}



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
    deleteVaccination: deleteVaccinationMutation.mutate,
    refetchVaccinations: refetch,
  };
};

export default useVaccinations;
