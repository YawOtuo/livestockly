import { url } from "../../../weburl";
import { Record } from "../types/record";
import { Vaccination } from "../types/vaccination";
import { Vaccine } from "../types/vaccines";

export const GetOneRecordVaccination = async (
  id: number
): Promise<Vaccination> => {
  const response = await fetch(`${url}vaccinations/records/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export interface AddVaccinationBody {
  records: number[];
  vaccination_date: string;
  vaccine_id: number;
  repeat: boolean;
  repeat_every_n_days: number;
  farm_id: number;
}

export const AddVaccination = async (
  data: AddVaccinationBody
): Promise<Vaccination> => {
  const response = await fetch(`${url}vaccinations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const UpdateVaccination = async (
  id: number,
  data: AddVaccinationBody
): Promise<Vaccination> => {
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

export const GetVaccinationsByRecord = async (
  recordId: number
): Promise<Vaccination[]> => {
  const response = await fetch(`${url}vaccinations/records/${recordId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
export interface GetVaccinationsByCategoryResponse extends Vaccination {
  records: Record[];
  vaccine: Vaccine;
}


export const GetVaccinationsByCategory = async (
  farm_id: number,
  category_id: number
): Promise<GetVaccinationsByCategoryResponse[]> => {
  const response = await fetch(
    `${url}vaccinations/farms/${farm_id}/categories/${category_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};
