import { url } from "../../../weburl";
import { User } from "../types/user";

export const AcceptUser = async (id: number): Promise<string> => {
  const response = await fetch(`${url}users/${id}/accept`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });
  return response.json();
};

export const DeAcceptUser = async (id: number): Promise<string> => {
  const response = await fetch(`${url}users/${id}/de-accept`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });
  return response.json();
};

export const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`${url}users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });
  return response.json();
};

export interface AddUserBody {
  username: string 
  uid: string 
  email: string 
  farm_id: number
}
export const AddUser = async (body: AddUserBody): Promise<User> => {
  const response = await fetch(`${url}users`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });
  return response.json();
};

export const UpdateUser = async (body: AddUserBody, id: number): Promise<User> => {
  const response = await fetch(`${url}users/${id}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });
  return response.json();
};

export const ChangeUserPermission = async (
  farm_id: number,
  user_id: number,
  level: number
): Promise<User> => {
  const response = await fetch(
    `${url}farms/${farm_id}/users/${user_id}/permission/${level}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    }
  );
  return response.json();
};
