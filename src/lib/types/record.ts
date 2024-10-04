export interface Record{
    id: number
    name: string
    category : {
        id: number 
        name: "cattle" | "sheep" | "goats"
    }
    weight? : number 
    gender: "male" | "female"
    colour: string 
    castrated: boolean 
    alive : boolean  
    number_of_kids: number 
    tag_colour :string 
    date_of_birth : string 
    date_purchased: string 
    sire : number 
    dam : number
    vaccination_info :string 
    health_condition: string 
    remarks: string
    farm_id: number
}