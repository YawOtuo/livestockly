"use client";
import { useInventory } from "@/lib/hooks/useInventory";
import InventoryItemCard from "./components/InventoryItemCard";
import AddInventoryItemModal from "@/components/modals/AddInventoryItemModal";
import FetchingState from "@/components/ui/FetchingState";
import SkeletonInventoryItemCard from "./components/InventoryItemCard/SkeletonInventoryItemCard";
import CategoryCard from "./components/CategoriesCard";
import SkeletonCategoriesCard from "./components/CategoriesCard/SkeletonCategoriesCard";

function Page() {
  const {
    inventoryItems,
    isItemsLoading,
    itemsError,
    categories,
    categoriesError,
    isCategoriesLoading,
  } = useInventory();
  return (
    <div className="flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-3 items-start">
        <p className="font-semibold text-gray-600 text-lg">Categories</p>
        <FetchingState
          className="w-full flex items-center flex-wrap gap-2"
          success={categories && categories?.map((r) => (
            <CategoryCard category={r} />
          ))}
          isLoading={isCategoriesLoading}
          isError={categoriesError}
          skeletonCount={7}
          loading={<SkeletonCategoriesCard />}
        />
      </div>
      <div className="flex flex-col gap-3 items-start w-full">
        <div className="flex items-center gap-5">
          <p className="font-semibold text-green1 text-2xl">Items</p>

          <AddInventoryItemModal />
        </div>
        <FetchingState
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          success={inventoryItems?.map((r) => (
            <InventoryItemCard item={r} />
          ))}
          isLoading={isItemsLoading}
          isError={itemsError}
          skeletonCount={7}
          loading={<SkeletonInventoryItemCard />}
        />
      </div>
    </div>
  );
}

export default Page;
