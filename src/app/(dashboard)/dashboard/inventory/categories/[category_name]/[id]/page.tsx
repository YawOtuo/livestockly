"use client";

import FetchingState from "@/components/ui/FetchingState";
import { useGetInvItemsByCategory } from "@/lib/hooks/useCategory";
import InventoryItemCard from "../../../components/InventoryItemCard";
import SkeletonInventoryItemCard from "../../../components/InventoryItemCard/SkeletonInventoryItemCard";
import BackButton from "@/components/ui/BackButton";

type Props = {
  params: {
    category_name: string;
    id: number;
  };
};
function Page({ params }: Props) {
  const {
    data: items,
    isError: isItemsError,
    isLoading: isItemsLoading,
  } = useGetInvItemsByCategory(params?.id);

  return (
    <div className="flex flex-col gap-5">
      <BackButton className="w-fit" icon />
      <h5 className="capitalize text-bsecondary-400">{params.category_name}</h5>
      <p>Showing {items?.length} item(s) in category</p>
      <FetchingState
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 w-full"
        isError={isItemsError}
        isLoading={isItemsLoading}
        success={items && items?.map((r) => <InventoryItemCard item={r} />)}
        skeletonCount={10}
        loading={<SkeletonInventoryItemCard />}
        nullComponent={
          (items?.length ?? 0 < 1) && <div>No items found in this category</div>
        }
      />{" "}
    </div>
  );
}

export default Page;
