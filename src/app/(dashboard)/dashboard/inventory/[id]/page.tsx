"use client";
import FetchingState from "@/components/ui/FetchingState";
import { useGetOneInventory, useInventory } from "@/lib/hooks/useInventory";
import InventoryPageSkeleton from "./components/InventoryPageSkeleton";
import InventoryPage from "./components/InventoryPage";

type Props = {
  params: {
    id: string;
  };
};

function Page({ params }: Props) {
  const { data, isLoading, isError } = useGetOneInventory(Number(params?.id));
  return (
    <div>
      <FetchingState
        loading={<InventoryPageSkeleton />}
        isLoading={isLoading}
        isError={isError}
        skeletonCount={1}
        className="w-full"
        success={data && <InventoryPage key={data?.item.id} inventory={data} />}
      />
    </div>
  );
}

export default Page;
