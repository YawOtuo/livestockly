import { useInventoryItemsBelowThreshold } from "@/lib/hooks/useInventory";
import InventoryThresholdCard from "./InventoryThresholdCard";
import InventoryItemCard from "../dashboard/inventory/components/InventoryItemCard";

function InventoryItemsBelowThreshold() {
  const { data } = useInventoryItemsBelowThreshold();
  return (
    <>
      {(data?.length ?? 0) > 0 && (
        <div className="flex flex-col items-start gap-3  w-full lg:w-[90%]">
          <p className="text-sm text-bsecondary-400">{data && data?.length} items in low quantity</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {data?.map((r) => (
              <InventoryItemCard item={r} low />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default InventoryItemsBelowThreshold;
