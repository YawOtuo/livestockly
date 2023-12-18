import { url } from "../weburl";

export const GetAllFarmUsers = async (id) => {
  
    const response = await fetch(`${url}farms/${id}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    });
    return response.json();
  };


  export const GetAllFarmRecords = async (id) => {
  
    const response = await fetch(`${url}farms/${id}/records`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    });
    return response.json();
  };

  export const GetAllFarmUsersAccepted = async (id) => {
  
    const response = await fetch(`${url}farms/${id}/users/accepted/yes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    });
    return response.json();
  };

  export const GetAllFarmUsersUnaceppted = async (id) => {
  
    const response = await fetch(`${url}farms/${id}/users/accepted/no`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    });
    return response.json();
  };

