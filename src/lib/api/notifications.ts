import { url } from "../../../weburl";
import { Notification, NotificationType } from "../types/notification";

// CreateNotification function with Notification type

export interface AddNotificationBody {
  content?: string;
  to_farm_id: number;
  type: NotificationType;
  subject: string;
}
export const CreateNotification = async (
  notification: AddNotificationBody
): Promise<Notification> => {
  const response = await fetch(`${url}notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notification),
  });
  return response.json();
};

// GetNotification with typed notificationId and response
export const GetNotification = async (
  notificationId: string
): Promise<Notification> => {
  const response = await fetch(`${url}notifications/${notificationId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// GetUserNotifications with typed userId and response (array of notifications)
export const GetUserNotifications = async (
  userId: number
): Promise<Notification[]> => {
  const response = await fetch(`${url}notifications/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// MarkNotificationAsRead with typed notificationId and response
export const MarkNotificationAsRead = async (
  notificationId: number
): Promise<Notification> => {
  const response = await fetch(`${url}notifications/${notificationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// DeleteNotification with typed notificationId and response
export const DeleteNotification = async (
  notificationId: number
): Promise<{ success: boolean }> => {
  const response = await fetch(`${url}notifications/${notificationId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
