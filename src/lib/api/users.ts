import { url } from "../../../weburl";

export const AcceptUser = async (id) => {
  const response = await fetch(`${url}users/${id}/accept`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });
  return response.json();
};

export const DeAcceptUser = async (id) => {
  const response = await fetch(`${url}users/${id}/de-accept`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });
  return response.json();
};

export const fetchUser = async (id) => {
  const response = await fetch(`${url}users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });
  return response.json();
};

export const AddUser = async (body) => {
  const response = await fetch(`${url}users`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });
  return response.json();
};

export const UpdateUser = async (body, id) => {
  const response = await fetch(`${url}users/${id}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });
  console.log(body);
};

export const ChangeUserPermission = async (farm_id, user_id, level) => {
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
