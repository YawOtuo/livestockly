import { url } from "../weburl";

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
