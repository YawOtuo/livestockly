import { Button } from "@/components/ui/button";
import { InventoryTransaction } from "@/lib/types/inventory";
import { MdOutlineDelete } from "react-icons/md";
import DeleteInventoryButton from "./DeleteInventoryButton";

type Props = {
  inv_trans: InventoryTransaction;
};

function InventoryTransactionCard({ inv_trans }: Props) {
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
          <Button variant={"secondary"}>Edit</Button>
          <DeleteInventoryButton />
        </div>
      </div>
    </div>
  );
}

export default InventoryTransactionCard;
