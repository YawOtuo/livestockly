import { url } from "../../../weburl"; // Adjust the import path as necessary
import { Vaccine } from "../types/vaccines";

export type AddVaccineBody = Omit<Vaccine, "id">; // Adjust based on your Vaccine model structure

// Fetch all vaccines
export const GetVaccines = async (): Promise<Vaccine[]> => {
  const response = await fetch(`${url}vaccines`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error fetching vaccines: ${response.status} - ${response.statusText}`
    );
  }

  return response.json();
};

// Add a new vaccine
export const AddVaccine = async (data: AddVaccineBody): Promise<Vaccine> => {
  const response = await fetch(`${url}vaccines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      `Error adding vaccine: ${response.status} - ${response.statusText}`
    );
  }

  return response.json();
};

// Update an existing vaccine
export const UpdateVaccine = async (
  id: number,
  data: AddVaccineBody
): Promise<Vaccine> => {
  const response = await fetch(`${url}vaccines/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      `Error updating vaccine: ${response.status} - ${response.statusText}`
    );
  }

  return response.json();
};

// Delete a vaccine
export const DeleteVaccine = async (
  id: number
): Promise<{ detail: string }> => {
  const response = await fetch(`${url}vaccines/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error deleting vaccine: ${response.status} - ${response.statusText}`
    );
  }

  return response.json();
};
