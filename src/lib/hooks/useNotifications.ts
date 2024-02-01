import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateNotification,
  DeleteNotification,
  GetUserNotifications,
  MarkNotificationAsRead,
} from "../api/notifications";
import { useSelector } from "react-redux";

type notificationData = {
  subject: string;
  content: string;
  from_id?: number;
  to_id?: number;
  to_farm_id? : number
};

const useNotifications = () => {
  const queryClient = useQueryClient();
  const userSqlData = useSelector((state) => state.users.userSqlData);

  const {
    data: notifications,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ["notifications"],
    async () => {
      console.log("first");
      const response = await GetUserNotifications(userSqlData?.id);
      return response;
    },
    {
      enabled: !!userSqlData, // Enable the query only if userSqlData is defined
    }
  );

  const createNotificationMutation = useMutation(
    async (notificationData: notificationData) => {
      const response = await CreateNotification(notificationData);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["notifications"]);
      },
    }
  );

  const markAsReadMutation = useMutation(
    async (notificationId) => {
      const response = await MarkNotificationAsRead(notificationId);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["notifications"]);
      },
    }
  );

  const deleteNotificationMutation = useMutation(
    async (notificationId) => {
      const response = await DeleteNotification(notificationId);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["notifications"]);
      },
    }
  );

  return {
    notifications,
    isLoading,
    error,
    createNotification: createNotificationMutation.mutate,
    markAsRead: markAsReadMutation.mutate,
    deleteNotification: deleteNotificationMutation.mutate,
    refetchNotifications: refetch,
  };
};

export default useNotifications;
