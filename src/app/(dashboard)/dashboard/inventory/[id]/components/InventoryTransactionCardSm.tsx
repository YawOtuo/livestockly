import { Button } from "@/components/ui/button";
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
          Type: <p className="font-semibold">{inv_trans.transaction_type}</p>
        </div>
        <div>Quantity: {inv_trans.quantity_change}</div>{" "}
        <div className="text-wrap break-all">Date: {inv_trans.timestamp}</div>{" "}
        <div className="flex items-center gap-5">
          <Button variant={"secondary"}>Edit</Button>
          <Button variant={"destructive"}>Delete</Button>
        </div>
      </div>
    </div>
  );
}

export default InventoryTransactionCardSm;
