import { InventoryItemResponse } from "@/lib/api/inventory";
import { InventoryItem } from "@/lib/types/inventory";
import InventoryTransactionCard from "./InventoryTransactionCard";
import { Button } from "@/components/ui/button";
import InventoryTransactionCardSm from "./InventoryTransactionCardSm";
import AddQuantity from "../../components/InventoryItemCard/components/AddQuantity";
import RemoveQuantity from "../../components/InventoryItemCard/components/RemoveQuantity";
import dynamic from "next/dynamic";
import DeleteInventoryItemModal from "@/components/modals/DeleteInventoryItemModal";
import Image from "next/image";
import { PermissionComponent } from "@/components/permission-component";
const AddInventoryItemModal = dynamic(
  () => import("@/components/modals/AddInventoryItemModal")
);
type Props = {
  inventory?: InventoryItemResponse;
};

function InventoryPage({ inventory }: Props) {
  return (
    <div className="flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-1 w-full items-start">
        <h2 className="text-black capitalize"> {inventory?.item?.name}</h2>
        <div className="bg-bsecondary-400 px-3 py-1 rounded-md  w-fit text-white">
          <p className="text-sm">
            {" "}
            Category: {inventory?.item?.category?.name}{" "}
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-start gap-2 lg:gap-4 w-full items-start">
        <div className="flex items-center gap-2 lg:gap-4 ">
          <div className="flex flex-col gap-0 w-full">
            <p className="whitespace-nowrap">
              {" "}
              {inventory?.item?.quantity} remaining
            </p>
            <div className="w-full whitespace-nowrap">
              <p className="text-xs">
                Threshold value: {inventory?.item?.alert_threshold}
              </p>
            </div>
          </div>
          <AddInventoryItemModal edit initialData={inventory?.item} />
        </div>
        <div className="flex w-full flex-row gap-2 lg:gap-4">
          {inventory?.item && <AddQuantity item={inventory?.item} />}{" "}
          {inventory?.item && <RemoveQuantity item={inventory?.item} />}
        </div>
      </div>{" "}
      {(inventory?.transactions?.length ?? 0) > 0 && (
        <div className="hidden lg:grid grid-cols-4 gap-5 text-gray-600 px-2 w-full text-sm">
          <div>Type</div>
          <div>Quantity</div>
          <div>Date</div>
          <div></div>
        </div>
      )}
      {(inventory?.transactions?.length ?? 0) < 1 && (
        <div className="bg-bsecondary-400/5 flex items-center justify-center gap-5 min-h-[50vh] w-full py-20 rounded-xl flex-col">
          <div className="relative w-[400px] aspect-video ">
            <Image
              src="/images/inventory-landing-page.png"
              alt="Inventory"
              fill
            />
          </div>
          <p>No related activties</p>
        </div>
      )}
      <div className="hidden lg:flex flex-col gap-5">
        {inventory?.transactions?.map((r) => (
          <InventoryTransactionCard inv_trans={r} />
        ))}
      </div>
      <div className="flex lg:hidden flex-col gap-5 w-full">
        {inventory?.transactions?.map((r) => (
          <InventoryTransactionCardSm inv_trans={r} />
        ))}
      </div>
      <div className="flex w-full justify-end">
        <PermissionComponent level={3}>
          <DeleteInventoryItemModal item={inventory?.item} />
        </PermissionComponent>
      </div>
    </div>
  );
}

export default InventoryPage;
