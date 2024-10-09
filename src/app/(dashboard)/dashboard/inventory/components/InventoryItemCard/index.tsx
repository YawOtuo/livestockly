import { Button } from "@/components/ui/button";
import { InventoryItem } from "@/lib/types/inventory";

type Props = {
  item: InventoryItem;
};

function InventoryItemCard({ item }: Props) {
  return (
    <div className="shadow p-5 flex flex-col gap-5 rounded-lg hover:bg-green2 transition-all duration-150">
      <div>
        <h5 className="capitalize font-semibold">{item.name}</h5>
        
      </div>

      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <Button variant={"outline"}>-</Button>
          {item.quantity}
          <Button variant={"outline"}>+</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={"link"}>Buy more</Button>
          <Button variant={"link"}>Sell</Button>
        </div>
      </div>
    </div>
  );
}

export default InventoryItemCard;
