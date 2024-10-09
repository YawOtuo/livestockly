"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  getInventoryItems,
  addCategory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  deleteCategory,
  AddCategoryBody,
  AddInventoryItemBody,
} from "../api/inventory"; // Import the necessary API methods
import useFarm from "./useFarm";

export const useInventory = () => {
  const queryClient = useQueryClient();
  const {farm} = useFarm()
  const farm_id  = Number(farm?.id)
  // Fetch categories and inventory items
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useQuery(
    ["categories", farm_id], // Cache key
    async () => {
      const response = await getCategories(farm_id);
      return response;
    },
    {
      enabled: !!farm_id, // Enable query only if farm_id is provided
    }
  );

  const { data: inventoryItems, isLoading: isItemsLoading, error: itemsError } = useQuery(
    ["inventoryItems", farm_id], // Cache key
    async () => {
      const response = await getInventoryItems(farm_id);
      return response;
    },
    {
      enabled: !!farm_id, // Enable query only if farm_id is provided
    }
  );

  // Add new category
  const addCategoryMutation = useMutation(
    async (categoryData: AddCategoryBody) => {
      const response = await addCategory(farm_id, categoryData);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories", farm_id]); // Invalidate and refetch categories after addition
      },
    }
  );

  // Add new inventory item
  const addInventoryItemMutation = useMutation(
    async (itemData: AddInventoryItemBody) => {

      itemData.farm_id = farm_id
      const response = await addInventoryItem(farm_id, itemData);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["inventoryItems", farm_id]); // Invalidate and refetch items after addition
      },
    }
  );

  // Update inventory item
  const updateInventoryItemMutation = useMutation(
    async ({ id, data }: { id: number; data: AddInventoryItemBody }) => {
      data.farm_id = farm_id

      const response = await updateInventoryItem(id, data);
      return response;
    },
    {
      onSuccess: (data, variables) => {
        const { id } = variables;
        queryClient.invalidateQueries(["inventoryItems", farm_id]); // Invalidate and refetch the specific item
        queryClient.invalidateQueries(["inventoryItem", id]); // Invalidate the item list after update
      },
    }
  );

  // Delete inventory item
  const deleteInventoryItemMutation = useMutation(
    async (item_id: number) => {
      const response = await deleteInventoryItem(item_id);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["inventoryItems", farm_id]); // Invalidate and refetch items after deletion
      },
    }
  );

  // Delete category
  const deleteCategoryMutation = useMutation(
    async (category_id: number) => {
      const response = await deleteCategory(category_id);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories", farm_id]); // Invalidate and refetch categories after deletion
      },
    }
  );

  // Return the combined data, status, and mutation functions
  return {
    categories,
    inventoryItems,
    isCategoriesLoading,
    isItemsLoading,
    categoriesError,
    itemsError,
    addCategory: addCategoryMutation.mutate,
    addInventoryItem: addInventoryItemMutation.mutate,
    updateInventoryItem: updateInventoryItemMutation.mutate,
    deleteInventoryItem: deleteInventoryItemMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
    refetchCategories: () => queryClient.invalidateQueries(["categories", farm_id]),
    refetchInventoryItems: () => queryClient.invalidateQueries(["inventoryItems", farm_id]),
  };
};
