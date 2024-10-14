import { url } from "../../../weburl";
import { InventoryCategory, InventoryItem } from "../types/inventory";

export const getCategories = async (
  farm_id: number
): Promise<InventoryCategory[]> => {
  const response = await fetch(
    `${url}inventories/farms/${farm_id}/categories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const getCategoryItems = async (
  farm_id: number,
  category_id: number
): Promise<InventoryItem[]> => {
  const response = await fetch(
    `${url}inventories/farms/${farm_id}/categories/${category_id}/items`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};
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

export type AddCategoryBody = Omit<InventoryCategory, "id" | "farm_id">;

export const addCategory = async (
  farm_id: number,
  data: AddCategoryBody
): Promise<InventoryCategory> => {
  const response = await fetch(
    `${url}inventories/farms/${farm_id}/categories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

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
