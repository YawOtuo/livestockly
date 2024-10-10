import { url } from "../../../weburl";
import { InventoryItem, InventoryCategory, InventoryTransaction } from "../types/inventory";


export const getInventoryItems = async (
  farm_id: number
): Promise<InventoryItem[]> => {
  const response = await fetch(`${url}inventories/farms/${farm_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// Fetch a single category by ID


// Fetch a single inventory item by ID

export interface InventoryItemResponse {
  item: InventoryItem
  transactions: InventoryTransaction[]
}
export const getOneInventoryItem = async (
  item_id: number
): Promise<InventoryItemResponse> => {
  const response = await fetch(`${url}inventories/${item_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// Add a new category for a specific farm

// Add a new inventory item for a specific farm
export type AddInventoryItemBody = {
  name: string;
  category_name: string;
  quantity: number;
  farm_id: number;
};
export const addInventoryItem = async (
  farm_id: number,
  data: AddInventoryItemBody
): Promise<InventoryItem> => {
  const response = await fetch(`${url}inventories/farms/${farm_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export type UpdateInvItemBody = {
  name: string;
  quantity: number;
  farm_id: number;
};

export const updateInventoryItem = async (
  item_id: number,
  data: UpdateInvItemBody
): Promise<InventoryItem> => {
  const response = await fetch(`${url}inventories/${item_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Delete a specific inventory item
export const deleteInventoryItem = async (
  item_id: number
): Promise<{ message: string }> => {
  const response = await fetch(`${url}inventories/${item_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// Delete a specific category
