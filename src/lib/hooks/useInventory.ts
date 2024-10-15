"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getInventoryItems,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  AddInventoryItemBody,
  getOneInventoryItem,
  getInventoryItemsBelowThreshold,
} from "../api/inventory";
import useFarm from "./useFarm";
import useDisclosure from "./useDisclosure";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import useNotifications from "./useNotifications";
import { useAppStore } from "../store/useAppStore";
import { InventoryItem } from "../types/inventory";

export const useInventoryItemsBelowThreshold = () => {
  const { farm } = useFarm();
  const farm_id = Number(farm?.id);

  return useQuery(
    ["inventoryItems-below-threshold"], // Cache key
    async () => {
      const response = await getInventoryItemsBelowThreshold(farm_id);
      return response;
    },
    {
      enabled: !!farm_id,
    }
  );
};
export const useGetOneInventory = (id: number) => {
  const { farm } = useFarm();
  const farm_id = Number(farm?.id);

  return useQuery(
    ["inventoryItem", id], // Cache key
    async () => {
      const response = await getOneInventoryItem(id);
      return response;
    },
    {
      enabled: !!farm_id,
    }
  );
};

export const useInventory = () => {
  const { createNotification } = useNotifications();
  const { DBDetails } = useAppStore();
  const queryClient = useQueryClient();
  const { farm } = useFarm();
  const router = useRouter();
  const farm_id = Number(farm?.id);
  // Fetch inventory items
  const {
    data: inventoryItems,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useQuery(
    ["inventoryItems", farm_id], // Cache key
    async () => {
      const response = await getInventoryItems(farm_id);
      return response;
    },
    {
      enabled: !!farm_id,
    }
  );

  // Add new inventory item
  const addInventoryItemMutation = useMutation(
    async (itemData: AddInventoryItemBody) => {
      itemData.farm_id = farm_id;
      const response = await addInventoryItem(farm_id, itemData);
      return response;
    },
    {
      onMutate: () => {
        toast({ title: "Adding", variant: "default" });
      },
      onSuccess: (data, itemData) => {
        createNotification({
          type: "success",
          subject: `${itemData.name} added to your inventory`,
          content: `${itemData.name} added to your inventory by ${DBDetails?.username}`,
          to_farm_id: DBDetails?.farm_id as number,
        });
        toast({ title: `${itemData.name} added`, variant: "default" });
        queryClient.invalidateQueries(["inventoryItems", farm_id]); // Invalidate and refetch items after addition
      },
    }
  );

  // Update inventory item
  const updateInventoryItemMutation = useMutation(
    async ({ id, data }: { id: number; data: AddInventoryItemBody }) => {
      data.farm_id = farm_id;
      const response = await updateInventoryItem(id, data);
      return response;
    },
    {
      onMutate: () => {
        toast({ title: "Updating", variant: "default" });
      },
      onSuccess: (response, variables) => {
        const { id, data } = variables;
        toast({ title: `${data.name} added`, variant: "default" });
        createNotification({
          type: "info",
          subject: `${data.name} updated in your inventory`,
          content: `${data.name} updated in your inventory by ${DBDetails?.username}`,
          to_farm_id: DBDetails?.farm_id as number,
        });
        queryClient.invalidateQueries(["inventoryItems", farm_id]); // Invalidate and refetch the specific item
        queryClient.invalidateQueries(["inventoryItem", id]); // Invalidate the item list after update
      },
    }
  );

  // Delete inventory item
  const deleteInventoryItemMutation = useMutation(
    async (item: InventoryItem) => {
      const response = await deleteInventoryItem(item.id);
      return response;
    },
    {
      onMutate: (item) => {
        toast({ title: `Deleting ${item.name}`, variant: "default" });
      },
      onSuccess: (data, item) => {
        toast({ title: "Deleted", variant: "default" });
        createNotification({
          type: "caution",
          subject: `${item?.name} deleted from your inventory`,
          content: `${item.name} deleted from your inventory by ${DBDetails?.username}`,
          to_farm_id: DBDetails?.farm_id as number,
        });
        router.push("/dashboard/inventory");
        queryClient.invalidateQueries(["inventoryItems", farm_id]); // Invalidate and refetch items after deletion
      },
    }
  );

  // Return the inventory-related data, loading states, and mutation functions
  return {
    inventoryItems,
    isItemsLoading,
    itemsError,
    addInventoryItem: addInventoryItemMutation.mutate,
    updateInventoryItem: updateInventoryItemMutation.mutate,
    deleteInventoryItem: deleteInventoryItemMutation.mutate,
    refetchInventoryItems: () =>
      queryClient.invalidateQueries(["inventoryItems", farm_id]),
  };
};
