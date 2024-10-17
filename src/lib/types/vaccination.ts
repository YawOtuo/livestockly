import { Vaccine } from "./vaccines";

export interface Vaccination {
  id: number;
  vaccination_date: string;
  vaccine_id: Vaccine;
  record_id: number;
  farm_id: number;
  repeat: boolean;
  repeat_every_n_days: number;
  vaccine: Vaccine; // This includes the full vaccine object
}
