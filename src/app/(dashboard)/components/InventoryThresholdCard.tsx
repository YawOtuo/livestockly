import { InventoryItem } from "@/lib/types/inventory";
import AddQuantity from "../dashboard/inventory/components/InventoryItemCard/components/AddQuantity";
import RemoveQuantity from "../dashboard/inventory/components/InventoryItemCard/components/RemoveQuantity";

type Props = {
  inventory: InventoryItem;
};
function InventoryThresholdCard({ inventory }: Props) {
  return (
    <div className="px-5 py-3 shadow rounded-lg">
     <div className="flex items-center justify-between gap-3">
          <h5>{inventory.name}</h5>
          <div className="bg-bsecondary-400 rounded-full p-3 text-white">
            <p>{inventory.quantity}</p>
          </div>{" "}
     </div >
      <div className="flex items-center gap-5">
        <AddQuantity item={inventory} iconClassName="text-xs" />
        <RemoveQuantity item={inventory} iconClassName="text-xs" />
      </div>
    </div>
  );
}

export default InventoryThresholdCard;
