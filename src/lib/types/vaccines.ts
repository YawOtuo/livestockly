export interface Vaccine {
    id: number 
    name: string 
    manufacturer :string 
    expiration_date: string 
    type: "global" | "local"
}