"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addInventoryTransaction, updateInventoryTransaction, AddInventoryTransactionBody, getInventoryTransactions, deleteInventoryTransaction } from "../api/inventory_transaction";
import useFarm from "./useFarm";

export const useAddAndUpdateInventoryTransaction = (itemId: number) => {
  const queryClient = useQueryClient();
  const { farm } = useFarm();
  const farm_id = Number(farm?.id);

  // Add new inventory transaction
  const addTransactionMutation = useMutation(
    async (transactionData: AddInventoryTransactionBody) => {
      transactionData.farm_id = farm_id;
      const response = await addInventoryTransaction(itemId, farm_id, transactionData);
      return response;
    },
    {

      onSuccess: () => {
        queryClient.invalidateQueries(["inventoryTransactions", farm_id, itemId]); // Refetch transactions after addition
        queryClient.invalidateQueries(["inventoryItems", farm_id]); // Refetch inventory items as transactions might affect item quantities
      },
    }
  );

  // Update an inventory transaction
  const updateTransactionMutation = useMutation(
    async ({ id, data }: { id: number; data: AddInventoryTransactionBody }) => {
      data.farm_id = farm_id;
      const response = await updateInventoryTransaction(id, data);
      return response;
    },
    {
      onSuccess: (data, variables) => {
        const { id } = variables;
        queryClient.invalidateQueries(["inventoryTransactions", farm_id, itemId]); // Refetch transactions list after update
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

  // Fetch inventory transactions for a specific item
  const { data: transactions, isLoading: isTransactionsLoading, error: transactionsError } = useQuery(
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
    async (transaction_id: number) => {
      const response = await deleteInventoryTransaction(transaction_id);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["inventoryTransactions", farm_id, itemId]); // Invalidate and refetch transactions after deletion
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
    refetchTransactions: () => queryClient.invalidateQueries(["inventoryTransactions", farm_id, itemId]),
  };
};
