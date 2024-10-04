import { LivestockCategory } from "./livestockcategory"

export interface Farm {
    id? : number
    name: string
    location: string 
    size: number 
    livestocktypes : string
    number_of_workers: number
    owners_contact: string 
    owners_email : string
    livestock_categories: LivestockCategory[]
}