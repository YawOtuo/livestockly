import { InventoryTransaction } from "@/lib/types/inventory";

type Props = {
  inv_trans: InventoryTransaction;
};

function InventoryTransactionCardSm({ inv_trans }: Props) {
  return (
    <div className="hover transition-all hover:bg-secondary">
      <div className="border px-5 py-3 rounded-lg     capitalize  flex flex-col items-start gap-3">
        <div
          className={`${
            inv_trans.transaction_type == "add"
              ? "text-primary"
              : "text-destructive"
          }`}>
          Type: {inv_trans.transaction_type}
        </div>
        <div>Quantity: {inv_trans.quantity_change}</div>{" "}
        <div className="text-wrap break-all">Date: {inv_trans.timestamp}</div>{" "}
      </div>
    </div>
  );
}

export default InventoryTransactionCardSm;
