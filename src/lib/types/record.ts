export interface Record{
    id: number
    name: string
    category : {
        id: number 
        name: "cattle" | "sheep" | "goats"
    }
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
    farm_id: number
    created_at: string
}