"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  addCategory,
  deleteCategory,
  AddCategoryBody,
  getCategoryItems,
} from "../api/category"; // Import API methods
import useFarm from "./useFarm";

export const useGetInvItemsByCategory = (category_id: number) => {
  const { farm } = useFarm();
  const farm_id = Number(farm?.id);


  return useQuery(
    ["categories", category_id, "items"], // Cache key
    async () => {
      const response = await getCategoryItems(farm_id, category_id);
      return response;
    },
    {
      enabled: !!farm_id, // Enable query only if farm_id is provided
    }
  );
};

export const useCategory = () => {
  const queryClient = useQueryClient();
  const { farm } = useFarm();
  const farm_id = Number(farm?.id);

  // Fetch categories
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery(
    ["categories", farm_id], // Cache key
    async () => {
      const response = await getCategories(farm_id);
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

  // Return category-related data, loading states, and mutation functions
  return {
    categories,
    isCategoriesLoading,
    categoriesError,
    addCategory: addCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
    refetchCategories: () =>
      queryClient.invalidateQueries(["categories", farm_id]),
  };
};
