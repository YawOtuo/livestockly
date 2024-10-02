"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddFarm, AddFarmBody, GetFarm } from "../api/farm";
import { toast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function useFarm() {
  const queryClient = useQueryClient();
  const userSqlData = useSelector(
    (state: RootState) => state?.users?.userSqlData
  );
  const {
    data: farm,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ["farm"],
    async () => {
      const response = await GetFarm(Number(userSqlData?.farm_id))
      return response;
    },
    {
      enabled: !!userSqlData,
    }
  );

  const createFarmMutation = useMutation(
    async (body: AddFarmBody) => {
      const response = await AddFarm(body);
      return response;
    },
    {
      onSuccess: () => {
        toast({
          title: "Farm created",
          description: "Please check your mail for confirmation",
        });
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
