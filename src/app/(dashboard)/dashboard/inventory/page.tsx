"use client";
import { useInventory } from "@/lib/hooks/useInventory";
import InventoryItemCard from "./components/InventoryItemCard";
import FetchingState from "@/components/ui/FetchingState";
import SkeletonInventoryItemCard from "./components/InventoryItemCard/SkeletonInventoryItemCard";
import dynamic from "next/dynamic";
import NoItemsComponent from "./components/NoItemsComponent";
const AddInventoryItemModal = dynamic(
  () => import("@/components/modals/AddInventoryItemModal")
);
const CategoriesSection = dynamic(
  () => import("./components/CategoriesSection")
);

function Page() {
  const { inventoryItems, isItemsLoading, itemsError } = useInventory();
  return (
    <div className="flex flex-col gap-5 items-start w-full">
      {isItemsLoading || (inventoryItems?.length ?? 0) > 0 ? (
        <div className="flex flex-col gap-5 w-full">
          <CategoriesSection />
          <div className="flex flex-col gap-3 items-start w-full">
            <div className="flex items-center gap-5">
              <p className="font-semibold text-gray-600 ">Items</p>

              <AddInventoryItemModal />
            </div>
            <FetchingState
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              success={inventoryItems?.map((r) => (
                <InventoryItemCard key={r.id} item={r} />
              ))}
              isLoading={isItemsLoading}
              isError={itemsError}
              skeletonCount={7}
              loading={<SkeletonInventoryItemCard />}
            />
          </div>
        </div>
      ) : (
        <NoItemsComponent />

        // <>
        //   {!isItemsLoading ? (
        //   ) : (
        //     Array.from({ length: 9 }).map((r) => <SkeletonInventoryItemCard />)
        //   )}
        // </>
      )}
    </div>
  );
}

export default Page;
