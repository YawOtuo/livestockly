"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addInventoryTransaction,
  updateInventoryTransaction,
  AddInventoryTransactionBody,
  getInventoryTransactions,
  deleteInventoryTransaction,
} from "../api/inventory_transaction";
import useFarm from "./useFarm";
import useNotifications from "./useNotifications";
import { useAppStore } from "../store/useAppStore";
import { toast } from "@/hooks/use-toast";

export const useAddAndUpdateInventoryTransaction = (itemId: number) => {
  const queryClient = useQueryClient();
  const { farm } = useFarm();
  const farm_id = Number(farm?.id);
  const { createNotification } = useNotifications();
  const { DBDetails } = useAppStore();

  // Add new inventory transaction
  const addTransactionMutation = useMutation(
    async ({
      transactionData,
      item_name,
    }: {
      transactionData: AddInventoryTransactionBody;
      item_name: string;
    }) => {
      transactionData.farm_id = farm_id;
      const response = await addInventoryTransaction(
        itemId,
        farm_id,
        transactionData
      );
      return response;
    },
    {
      onMutate: ({transactionData}) => {
        toast({
          title: `${
            transactionData.transaction_type == "add" ? "Added" : "Removed"
          }`,
          variant: "default",
        });
      },

      onSuccess: (data, { transactionData, item_name }) => {
        toast({
          title: `${
            transactionData.transaction_type == "add" ? "Added" : "Removed"
          }`,
          variant: "default",
        });

        createNotification({
          type: "caution",
          subject: `${
            transactionData.quantity_change
          } of ${item_name} have been ${
            transactionData.transaction_type == "add" ? "added" : "removed"
          } from your inventory`,
          content: `${
            transactionData.quantity_change
          } of ${item_name} have been  ${
            transactionData.transaction_type == "add" ? "added" : "removed"
          } from your inventory by ${DBDetails?.username}`,
          to_farm_id: DBDetails?.farm_id as number,
        });
        queryClient.invalidateQueries([
          "inventoryTransactions",
          farm_id,
          itemId,
        ]); // Refetch transactions after addition
        queryClient.invalidateQueries(["inventoryItems", farm_id]); // Refetch inventory items as transactions might affect item quantities
      },
    }
  );

  // Update an inventory transaction
  const updateTransactionMutation = useMutation(
    async ({
      id,
      data,
      item_name,
    }: {
      id: number;
      data: AddInventoryTransactionBody;
      item_name: string;
    }) => {
      data.farm_id = farm_id;
      const response = await updateInventoryTransaction(id, data);
      return response;
    },
    {
      onMutate: () => {
        toast({ title: "Updating", variant: "default" });
      },
      onSuccess: (response, variables) => {
        const { id, data, item_name } = variables;
        toast({ title: "Updated", variant: "default" });

        createNotification({
          type: "info",
          subject: `Inventory Record Update`,
          content: `${data.quantity_change} of ${item_name} have been updated in your inventory of ${item_name} by ${DBDetails?.username}`,
          to_farm_id: DBDetails?.farm_id as number,
        });
        queryClient.invalidateQueries([
          "inventoryTransactions",
          farm_id,
          itemId,
        ]); // Refetch transactions list after update
        queryClient.invalidateQueries(["inventoryTransaction", id]); // Invalidate individual transaction cache
      },
    }
  );

  return {
    addTransaction: addTransactionMutation.mutate,
    updateTransaction: updateTransactionMutation.mutate,
  };
};

export const useInventoryTransactions = (itemId: number) => {
  const queryClient = useQueryClient();
  const { farm } = useFarm();
  const farm_id = Number(farm?.id);
  const { createNotification } = useNotifications();
  const { DBDetails } = useAppStore();

  // Fetch inventory transactions for a specific item
  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    error: transactionsError,
  } = useQuery(
    ["inventoryTransactions", farm_id, itemId], // Cache key based on farm and item ID
    async () => {
      const response = await getInventoryTransactions(itemId, farm_id);
      return response;
    },
    {
      enabled: !!farm_id && !!itemId, // Enable query only if farm_id and itemId are provided
    }
  );

  // Delete an inventory transaction
  const deleteTransactionMutation = useMutation(
    async ({
      transaction_id,
      quantity_change,
      item_name,
    }: {
      transaction_id: number;
      quantity_change: number;
      item_name: string;
    }) => {
      const response = await deleteInventoryTransaction(
        transaction_id,
        quantity_change
      );
      return response;
    },
    {
      onMutate: () => {
        toast({ title: "Deleting", variant: "default" });
      },
      onSuccess: (data, { item_name, quantity_change }) => {
        toast({ title: "Deleted", variant: "default" });
        createNotification({
          type: "caution",
          subject: `${quantity_change} ${item_name}s deleted from your inventory`,
          content: `${quantity_change} ${item_name}s have been deleted from your inventory by ${DBDetails?.username}`,
          to_farm_id: DBDetails?.farm_id as number,
        });
        queryClient.invalidateQueries([
          "inventoryTransactions",
          farm_id,
          itemId,
        ]); // Invalidate and refetch transactions after deletion
        queryClient.invalidateQueries(["inventoryItems", farm_id]); // Refetch inventory items list if quantities are affected
      },
    }
  );

  // Return the combined data, status, and mutation functions
  return {
    transactions,
    isTransactionsLoading,
    transactionsError,
    deleteTransaction: deleteTransactionMutation.mutate,
    refetchTransactions: () =>
      queryClient.invalidateQueries(["inventoryTransactions", farm_id, itemId]),
  };
};
