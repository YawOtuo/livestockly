import { url } from "../../../weburl";
import { InventoryItem, InventoryCategory } from "../types/inventory";

// Fetch all categories for a specific farm
export const getCategories = async (
  farm_id: number
): Promise<InventoryCategory[]> => {
  const response = await fetch(`${url}inventories/farms/${farm_id}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// Fetch all inventory items for a specific farm
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
export const getCategory = async (
  category_id: number
): Promise<InventoryCategory> => {
  const response = await fetch(`${url}inventories/categories/${category_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// Fetch a single inventory item by ID
export const getInventoryItem = async (
  item_id: number
): Promise<InventoryItem> => {
  const response = await fetch(`${url}inventories/${item_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// Add a new category for a specific farm
export type AddCategoryBody = Omit<InventoryCategory, "id" | "farm_id">;

export const addCategory = async (
  farm_id: number,
  data: AddCategoryBody
): Promise<InventoryCategory> => {
  const response = await fetch(`${url}inventories/farms/${farm_id}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

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

// Update an existing inventory item
export const updateInventoryItem = async (
  item_id: number,
  data: AddInventoryItemBody
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
export const deleteCategory = async (
  category_id: number
): Promise<{ message: string }> => {
  const response = await fetch(`${url}inventories/categories/${category_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
