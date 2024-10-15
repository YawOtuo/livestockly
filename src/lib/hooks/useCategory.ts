"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory, // Import updateCategory API method
  AddCategoryBody,
  getCategoryItems,
} from "../api/category"; // Import API methods
import useFarm from "./useFarm";
import { toast } from "@/hooks/use-toast";
import useNotifications from "./useNotifications";
import { useAppStore } from "../store/useAppStore";
import { InventoryCategory } from "../types/inventory";

export const useGetInvItemsByCategory = (category_id: number) => {
  const { farm } = useFarm();
  const farm_id = Number(farm?.id);
  const { createNotification } = useNotifications();

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
  const { DBDetails } = useAppStore();
  const { createNotification } = useNotifications();

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
      onMutate: () => {
        toast({ title: "Updating", variant: "default" });
      },
      onSuccess: (response, categoryData) => {
        createNotification({
          type: "info",
          subject: `New Category in your inventory - ${categoryData.name}`,
          content: `${categoryData.name} added in your inventory by ${DBDetails?.username}`,
          to_farm_id: DBDetails?.farm_id as number,
        });
        toast({ title: `${categoryData.name} added`, variant: "default" });

        queryClient.invalidateQueries(["categories", farm_id]); // Invalidate and refetch categories after addition
      },
    }
  );

  // Update category
  const updateCategoryMutation = useMutation(
    async ({
      category_id,
      categoryData,
    }: {
      category_id: number;
      categoryData: AddCategoryBody;
    }) => {
      const response = await updateCategory(
        DBDetails?.farm_id as number,
        category_id,
        categoryData
      ); // Assuming updateCategory takes id and category data
      return response;
    },
    {
      onMutate: () => {
        toast({ title: "Updating category", variant: "default" });
      },
      onSuccess: (response, {category_id, categoryData}) => {
        createNotification({
          type: "info",
          subject: `Category updated - ${categoryData.name}`,
          content: `${categoryData.name} has been updated by ${DBDetails?.username}`,
          to_farm_id: DBDetails?.farm_id as number,
        });
        toast({ title: `${categoryData.name} updated`, variant: "success" });

        queryClient.invalidateQueries(["categories", farm_id]); // Invalidate and refetch categories after update
      },
    }
  );

  // Delete category
  const deleteCategoryMutation = useMutation(
    async (categoryData: InventoryCategory) => {
      const response = await deleteCategory(categoryData.id);
      return response;
    },
    {
      onMutate: () => {
        toast({ title: "Deleting", variant: "default" });
      },
      onSuccess: (response, categoryData) => {
        createNotification({
          type: "caution",
          subject: `${categoryData.name} category deleted from inventory`,
          content: `${categoryData.name} category and all its related items have been deleted from your inventory by ${DBDetails?.username}`,
          to_farm_id: DBDetails?.farm_id as number,
        });
        toast({ title: `${categoryData.name} deleted`, variant: "default" });

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
    updateCategory: updateCategoryMutation.mutate, // Add the update mutation
    deleteCategory: deleteCategoryMutation.mutate,
    refetchCategories: () =>
      queryClient.invalidateQueries(["categories", farm_id]),
  };
};
