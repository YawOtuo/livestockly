export interface InventoryCategory {
    id: number 
    name: string 
    farm_id: number 

}

export interface InventoryItem {
    id: number 
    name: string 
    category_id: number
    quantity: number 
    farm_id: number
}


export interface InventoryTransaction {
    id: number 
    inventory_item_id: number 
    farm_id: number
    quantity_change: number 
    transaction_type: "add" | "remove" | "adjust"
    timestamp: string
}