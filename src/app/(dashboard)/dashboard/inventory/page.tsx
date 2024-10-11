"use client";
import { useInventory } from "@/lib/hooks/useInventory";
import InventoryItemCard from "./components/InventoryItemCard";
import AddInventoryItemModal from "@/components/modals/AddInventoryItemModal";
import FetchingState from "@/components/ui/FetchingState";
import SkeletonInventoryItemCard from "./components/InventoryItemCard/SkeletonInventoryItemCard";
import CategoryCard from "./components/CategoriesCard";
import SkeletonCategoriesCard from "./components/CategoriesCard/SkeletonCategoriesCard";
import { useCategory } from "@/lib/hooks/useCategory";

function Page() {
  const { inventoryItems, isItemsLoading, itemsError } = useInventory();
  const { categories, categoriesError, isCategoriesLoading } = useCategory();
  return (
    <div className="flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-3 items-start">
        <p className="font-semibold text-gray-500 text-lg">Categories</p>
        <FetchingState
          className="w-full flex items-center flex-wrap gap-2"
          success={
            categories &&
            categories?.map((r) => (
              <CategoryCard key={r.id} category={r} />
            ))
          }
          isLoading={isCategoriesLoading}
          isError={categoriesError}
          skeletonCount={7}
          loading={<SkeletonCategoriesCard />}
        />
      </div>
      <div className="flex flex-col gap-3 items-start w-full">
        <div className="flex items-center gap-5">
          <p className="font-semibold text-gray-600 text-lg">Items</p>

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
  );
}

export default Page;
