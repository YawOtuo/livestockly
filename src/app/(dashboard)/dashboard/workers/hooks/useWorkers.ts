import { toast } from "@/hooks/use-toast";
import { GetAllFarmUsersAccepted } from "@/lib/api/farm";
import { AcceptUser, DeAcceptUser } from "@/lib/api/users";
import useNotifications from "@/lib/hooks/useNotifications";
import { useAppStore } from "@/lib/store/useAppStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useWorkers() {
  const { DBDetails } = useAppStore();

  const { isLoading: isLoadingWorkers, data: workers } = useQuery(
    ["workers"],
    () => GetAllFarmUsersAccepted(DBDetails?.farm_id as number),
    {
      enabled: !!DBDetails?.farm_id,
    }
  );

  const queryClient = useQueryClient();

  const { createNotification } = useNotifications();

  const acceptMutation = useMutation((id: number) => AcceptUser(id), {
    onSuccess: (data) => {
      toast({
        title: "User Accepted",
      });
      createNotification({
        type: "success",
        subject: `User accepted`,
        content: `User accepted by ${DBDetails?.username}`, // // content: "",
        to_farm_id: DBDetails?.farm_id as number,
      });
      queryClient.invalidateQueries(["workers", "workers-unaccepted"]);
    },
  });

  const handleAccept = async (newItem: number) => {
    acceptMutation.mutate(newItem);
  };

  const rejectMutation = useMutation((id: number) => DeAcceptUser(id), {
    onSuccess: () => {
      toast({
        title: "User Rejected",
      });
      createNotification({
        subject: `User accepted`,
        type: "success",
        content: `User rejected by ${DBDetails?.username}`,
        // // content: "",
        to_farm_id: DBDetails?.farm_id as number,
      });
      queryClient.invalidateQueries(["workers", "workers-unaccepted"]);
    },
  });

  const handleReject = async (newItem: number) => {
    rejectMutation.mutate(newItem);
  };
  return { workers, isLoadingWorkers, handleAccept, handleReject };
}

export default useWorkers;
