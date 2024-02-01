import { url } from "../../../weburl";

export const CreateNotification = async (notificationData) => {
  const response = await fetch(`${url}notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notificationData),
  });
  return response.json();
};

export const GetNotification = async (notificationId) => {
  const response = await fetch(`${url}notifications/${notificationId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const GetUserNotifications = async (userId) => {
  const response = await fetch(`${url}notifications/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const MarkNotificationAsRead = async (notificationId) => {
  const response = await fetch(`${url}notifications/${notificationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const DeleteNotification = async (notificationId) => {
  const response = await fetch(`${url}notifications/${notificationId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
