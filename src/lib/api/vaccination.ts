import { url } from "../../../weburl";
import { Vaccination } from "../types/vaccination";

export const GetOneRecordVaccination = async (id: number): Promise<Vaccination> => {
  const response = await fetch(`${url}vaccinations/records/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export type AddVaccinationBody = Omit<Vaccination, "id">;

export const AddVaccination = async (data: AddVaccinationBody): Promise<Vaccination> => {
  const response = await fetch(`${url}vaccinations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const UpdateVaccination = async (id: number, data: AddVaccinationBody): Promise<Vaccination> => {
  const response = await fetch(`${url}vaccinations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const DeleteVaccination = async (id: number): Promise<void> => {
  const response = await fetch(`${url}vaccinations/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
};

export const GetVaccinationsByRecord = async (recordId: number): Promise<Vaccination[]> => {
  const response = await fetch(`${url}vaccinations/records/${recordId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
