import { Button } from "@/components/ui/button";
import { InventoryItem, InventoryTransaction } from "@/lib/types/inventory";
import EditInventoryTransactionModal from "@/components/modals/EditInventoryTransactionModal";
import DeleteInventoryTransactionModal from "@/components/modals/DeleteInventoryTransactionModal";

type Props = {
  inv_trans: InventoryTransaction;
  item: InventoryItem;
};

function InventoryTransactionCard({ inv_trans, item }: Props) {
  return (
    <div className="hover transition-all hover:bg-secondary">
      <div className="shadow px-5 py-3 rounded-lg     capitalize  grid grid-cols-4 gap-5">
        <div
          className={`${
            inv_trans.transaction_type == "add" ? "text-primary" : "text--400"
          }`}>
          <p className="font-semibold">{inv_trans.transaction_type}</p>
        </div>
        <div>{inv_trans.quantity_change}</div>{" "}
        <div className="text-wrap break-all">{inv_trans.timestamp}</div>{" "}
        <div className="flex items-center gap-3">
          <EditInventoryTransactionModal
            transaction={inv_trans}
            item_name={item.name}
          />{" "}
          <DeleteInventoryTransactionModal
            transaction={inv_trans}
            item_name={item.name}
          />
        </div>
      </div>
    </div>
  );
}

export default InventoryTransactionCard;
