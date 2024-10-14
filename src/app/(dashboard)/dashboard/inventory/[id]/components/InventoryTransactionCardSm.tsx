import { InventoryTransaction } from "@/lib/types/inventory";
import EditInventoryTransactionModal from "@/components/modals/EditInventoryTransactionModal";
import DeleteInventoryTransactionModal from "@/components/modals/DeleteInventoryTransactionModal";

type Props = {
  inv_trans: InventoryTransaction;
};

function InventoryTransactionCardSm({ inv_trans }: Props) {
  return (
    <div className="hover transition-all hover:bg-secondary w-full">
      <div className="shadow px-5 py-3 rounded-lg     capitalize  flex flex-col items-start gap-2">
        <div
          className={`${
            inv_trans.transaction_type == "add"
              ? "text-primary"
              : "text-gray-900"
          } flex items-center gap-1`}>
          Type: <p className="font-semibold">{inv_trans.transaction_type}</p>
        </div>
        <div>Quantity: {inv_trans.quantity_change}</div>{" "}
        <div className="text-wrap break-all text-xs">
          Date: {inv_trans.timestamp}
        </div>{" "}
        <div className="flex items-center gap-5">
          <EditInventoryTransactionModal transaction={inv_trans} />{" "}
          <DeleteInventoryTransactionModal transaction={inv_trans} />
        </div>
      </div>
    </div>
  );
}

export default InventoryTransactionCardSm;
