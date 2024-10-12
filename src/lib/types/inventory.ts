export interface InventoryCategory {
    id: number 
    name: string 
    farm_id: number 
}

export interface InventoryItem {
    id: number 
    name: string 
    category: InventoryCategory
    quantity: number 
    farm_id: number
}

export type TransactionType = "add" | "remove" | "adjust"

export interface InventoryTransaction {
    id: number 
    inventory_item_id: number 
    farm_id: number
    quantity_change: number 
    transaction_type: TransactionType
    timestamp: string
}