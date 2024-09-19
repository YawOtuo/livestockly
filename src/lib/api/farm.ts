import { url } from "../../../weburl"
import { Farm } from "../types/farm";
import { Record } from "../types/record";
import { User } from "../types/user";

interface VerifyResponse {
  exists: boolean;
  farmId?: string;
  // Add other verification fields if necessary
}

// GetAllFarmUsers with typed id and return value
export const GetAllFarmUsers = async (id: number): Promise<User[]> => {
  const response = await fetch(`${url}farms/${id}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// GetAllFarmRecords with typed id and return value
export const GetAllFarmRecords = async (id: number): Promise<Record[]> => {
  const response = await fetch(`${url}farms/${id}/records`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// GetAllFarmRecordsSp with typed farm_id, type and return value
export const GetAllFarmRecordsSp = async (farm_id: number, type: string): Promise<Record[]> => {
  switch (type) {
    case "sheep": {
      const response = await fetch(`${url}records/farms/${farm_id}/sheep`);
      return response.json();
    }
    case "goats": {
      const responseS = await fetch(`${url}records/farms/${farm_id}/goats`);
      return responseS.json();
    }
    case "cattle": {
      const responseC = await fetch(`${url}records/farms/${farm_id}/cattle`);
      return responseC.json();
    }
    default:
      throw new Error("Invalid animal type");
  }
};

// GetAllFarmUsersAccepted with typed id and return value
export const GetAllFarmUsersAccepted = async (id: number): Promise<User[]> => {
  const response = await fetch(`${url}farms/${id}/users/accepted/yes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// GetAllFarmUsersUnaccepted with typed id and return value
export const GetAllFarmUsersUnaccepted = async (id: number): Promise<User[]> => {
  const response = await fetch(`${url}farms/${id}/users/accepted/no`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// VerifyFarmExists with typed name and return value
export const VerifyFarmExists = async (name: string): Promise<Farm> => {
  const response = await fetch(`${url}farms/verify/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
