"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddFarm, AddFarmBody, GetFarm } from "../api/farm";
import { toast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Record } from "../types/record";
import { useRouter } from "next/navigation";
import { Farm } from "../types/farm";
import { useAppStore } from "../store/useAppStore";

function useFarm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { DBDetails } = useAppStore();

  const {
    data: farm,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ["farm"],
    async () => {
      const response = await GetFarm(Number(DBDetails?.farm_id));
      return response;
    },
    {
      enabled: !!DBDetails,
    }
  );

  const createFarmMutation = useMutation<
    Farm, // Response type (you can update this based on your API response)
    Error, // Error type
    AddFarmBody, // Variable type (input data)
    { reset: () => void } // Context type (reset function)
  >(
    async (body: AddFarmBody) => {
      toast({
        title: "Loading...",
      });
      const response = await AddFarm(body);
      return response;
    },
    {
      onSuccess: (response, _, context) => {
        // Reset the form on success
        router.push(`/add-your-farm/form/success?farm=${response.name}`);

        if (context) {
          context.reset(); // Safely reset the form on success
        }

        toast({
          title: "Farm created succesfully",
          // description: "Please check your mail for confirmation",
        });
        // Invalidate queries to refetch farm data
        queryClient.invalidateQueries(["farm"]);
      },
      onError: (error: Error) => {
        // work on putting better error messages our there
        console.log("error", error.message);
        toast({
          variant: "destructive",
          title: "Oops",
          description: `${error.message}`,
        });
      },
    }
  );
  return {
    farm,
    isLoading,
    error,
    createFarm: createFarmMutation.mutate,
  };
}

export default useFarm;
