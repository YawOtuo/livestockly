import { url } from "../../../weburl";
import { Record } from "../types/record";

export const GetOneRecord = async (id: number): Promise<Record> => {
  const response = await fetch(`${url}records/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });
  return response.json();
};

export type AddRecordBody  = Omit<Record, "id">

export const AddRecord = async (data: AddRecordBody): Promise<Record> => {
  const response = await fetch(`${url}records`, {
    method: "POST", // or 'PATCH' depending on your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Using fetch
export const searchSpecificRecords = async (
  farm_id: number,
  type: string,
  searchInput: string
): Promise<Record[]> => {
  try {
    const response = await fetch(
      `${url}records/farms/${farm_id}/${type}/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchInput }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Search error:", error.message);
    throw error;
  }
};

// Using fetch
export const searchRecords = async (
  farm_id: number,
  category_id: number | "any" ,
  searchInput: string
): Promise<Record[]> => {
  try {
    const response = await fetch(`${url}records/farms/${farm_id}/${category_id}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: searchInput }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Search error:", error.message);
    throw error;
  }
};

export const updateRecord = async (
  id: number,
  data: AddRecordBody
): Promise<Record> => {
  const response = await fetch(`${url}records/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export interface RecordJsonOne {}

export const updateRecordJSON = async (
  id: number,
  data: RecordJsonOne,
  label: string
): Promise<Record> => {
  console.log(id, data, label);
  const response = await fetch(`${url}records/${id}/${label}`, {
    method: "POST", // or 'PATCH' depending on your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateRecordJSONOne = async (
  id: number,
  data: RecordJsonOne,
  label: String,
  index: number
): Promise<Record> => {
  const response = await fetch(`${url}records/${id}/${label}/index/${index}`, {
    method: "POST", // or 'PATCH' depending on your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteRecordJSONOne = async (
  id: number,
  label: string,
  index: number
): Promise<Record> => {
  const response = await fetch(`${url}records/${id}/${label}/index/${index}`, {
    method: "DELETE", // or 'PATCH' depending on your API
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const deleteImage = async (
  id: number,
  index: number
): Promise<string> => {
  const response = await fetch(`${url}records/image/${id}/index/${index}`, {
    method: "DELETE", // or 'PATCH' depending on your API
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
