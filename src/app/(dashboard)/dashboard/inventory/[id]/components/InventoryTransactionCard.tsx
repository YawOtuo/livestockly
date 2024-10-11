import { Button } from "@/components/ui/button";
import { InventoryTransaction } from "@/lib/types/inventory";

type Props = {
  inv_trans: InventoryTransaction;
};

function InventoryTransactionCard({ inv_trans }: Props) {
  return (
    <div className="hover transition-all hover:bg-secondary">
      <div className="border px-5 py-3 rounded-lg     capitalize  grid grid-cols-3 gap-5">
        <div
          className={`${
            inv_trans.transaction_type == "add"
              ? "text-primary"
              : "text-destructive"
          }`}>
          <p className="font-semibold">{inv_trans.transaction_type}</p>
        </div>
        <div>{inv_trans.quantity_change}</div>{" "}
        <div className="text-wrap break-all">{inv_trans.timestamp}</div>{" "}
        <Button variant={"secondary"}>Edit</Button>
        <Button variant={"destructive"} size={"sm"}
        className="max-w-[150px]"
        >Delete</Button>
      </div>
    </div>
  );
}

export default InventoryTransactionCard;
