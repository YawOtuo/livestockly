import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecord } from "../api/record";
import { useAppStore } from "../store/useAppStore";
import useNotifications from "./useNotifications";
import { useToast } from "react-toastify";
import { toast } from "@/hooks/use-toast";
import { Record } from "../types/record";
import { useRouter } from "next/navigation";

function useRecords() {
  const { DBDetails } = useAppStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { createNotification } = useNotifications();

  const deleteMutation = useMutation(
    (record: Record) => deleteRecord(record.id), // Call deleteRecord API
    {
      onMutate: (record) => {
        toast({ title: "Deleting", variant: "default" });
      },
      onSuccess: (data, record) => {
        toast({ title: `${record.name} deleted`, variant: "default" });
        router.push(
          `/dashboard/records/category/${record.category.id}/${record.category.name}`
        );
        queryClient.invalidateQueries([`records`]); // Invalidate records cache
      },
      onError: (error, record) => {
        toast({
          title: `Error deleting ${record.name}`,
          variant: "destructive",
        });
      },
    }
  );

  const handleDelete = async (record: Record) => {
    await deleteMutation.mutateAsync(record);

    createNotification({
      type: "caution",
      subject: `Record deleted by ${DBDetails?.username}`,
      content: `Record has been deleted`,
      to_farm_id: DBDetails?.farm_id as number,
    });
  };
  return {
    handleDelete, // Return the handleDelete function
  };
}

export default useRecords;
