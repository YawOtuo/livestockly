import { Vaccine } from "./vaccines"

export interface Vaccination {
    id: number 
    vaccination_date: string 
    vaccine_id: Vaccine 
    record_id: number
}