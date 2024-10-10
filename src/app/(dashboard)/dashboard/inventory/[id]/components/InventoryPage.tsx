import { InventoryItemResponse } from "@/lib/api/inventory";
import { InventoryItem } from "@/lib/types/inventory";
import InventoryTransactionCard from "./InventoryTransactionCard";
import { Button } from "@/components/ui/button";
import InventoryTransactionCardSm from "./InventoryTransactionCardSm";

type Props = {
  inventory?: InventoryItemResponse;
};

function InventoryPage({ inventory }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <h3> {inventory?.item?.name}</h3>
      <p> {inventory?.item?.quantity} remaining</p>

      <div className="flex items-cente gap-5">
        <Button>Add More</Button>
        <Button variant={"destructive"}>Remove </Button>
      </div>
      <div className="hidden lg:grid grid-cols-3 gap-5 text-gray-600 px-2">
        <div>Type</div>
        <div>Quantity</div>
        <div>Date</div>
      </div>
      <div className="hidden lg:flex flex-col gap-5">
        {inventory?.transactions?.map((r) => (
          <InventoryTransactionCard inv_trans={r} />
        ))}
      </div>
      <div className="flex lg:hidden flex-col gap-5">
        {inventory?.transactions?.map((r) => (
          <InventoryTransactionCardSm inv_trans={r} />
        ))}
      </div>
    </div>
  );
}

export default InventoryPage;
