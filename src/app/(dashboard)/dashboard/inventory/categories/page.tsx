"use client";

import { useCategory } from "@/lib/hooks/useCategory";
import CategoriesAllCard from "./components/CategoriesAllCard";
import FetchingState from "@/components/ui/FetchingState";
import SkeletonCategoriesAllCard from "./components/SkeletonCategoriesAllCard";

function Page() {
  const { categories, categoriesError, isCategoriesLoading } = useCategory();

  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-bsecondary-400">My Categories</h4>

      <FetchingState
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 w-full"
        isError={categoriesError}
        isLoading={isCategoriesLoading}
        success={categories?.map((r) => (
          <CategoriesAllCard category={r} />
        ))}
        skeletonCount={10}
        loading={<SkeletonCategoriesAllCard />}
      />

      <div></div>
    </div>
  );
}

export default Page;
