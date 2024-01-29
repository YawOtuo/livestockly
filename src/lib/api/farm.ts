import { url } from "../../../weburl";

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

export const GetAllFarmRecordsSp = async (farm_id, type) => {
  switch (type) {
    case "sheep":
      let response = await fetch(`${url}records/farms/${farm_id}/sheep`);
      return response.json();
      break;
    case "goats":
      let responseS = await fetch(`${url}records/farms/${farm_id}/goats`);
      // const responseText = await responseS.text(); // Read the response body as text
      return responseS.json();
      break;

    case "cattle":
      let responseC = await fetch(`${url}records/farms/${farm_id}/cattle`);
      return responseC.json();
      break;
    default:
      break;
  }
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

export const GetAllFarmUsersUnaccepted = async (id) => {
  const response = await fetch(`${url}farms/${id}/users/accepted/no`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });
  return response.json();
};

export const VerifyFarmExists = async (name) => {
  const response = await fetch(`${url}farms/verify/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });



  return response.json();
};
