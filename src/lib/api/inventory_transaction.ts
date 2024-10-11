import { url } from "../../../weburl";
import { InventoryTransaction, TransactionType } from "../types/inventory";

// Fetch all transactions for a specific inventory item
export const getInventoryTransactions = async (
  item_id: number,
  farm_id: number
): Promise<InventoryTransaction[]> => {
  const response = await fetch(`${url}inventories/transactions/${item_id}/?farm_id=${farm_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

// Add a new transaction for a specific inventory item
export type AddInventoryTransactionBody = {
  inventory_item_id: number;
  quantity_change: number;
  transaction_type: TransactionType; // Use "add", "remove", or "adjust"
  farm_id: number;
};
export const addInventoryTransaction = async (
  item_id: number,
  farm_id: number,
  data: AddInventoryTransactionBody
): Promise<InventoryTransaction> => {
  const response = await fetch(`${url}inventories/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Update an existing transaction for a specific inventory item
export const updateInventoryTransaction = async (
  transaction_id: number,
  data: AddInventoryTransactionBody
): Promise<InventoryTransaction> => {
  const response = await fetch(`${url}inventories/transactions/${transaction_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Delete a specific inventory transaction
export const deleteInventoryTransaction = async (
  transaction_id: number
): Promise<{ message: string }> => {
  const response = await fetch(`${url}inventories/transactions/${transaction_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
