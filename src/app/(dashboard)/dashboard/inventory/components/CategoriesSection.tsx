import FetchingState from "@/components/ui/FetchingState";
import { useCategory } from "@/lib/hooks/useCategory";
import SkeletonCategoriesCard from "./CategoriesCard/SkeletonCategoriesCard";
import CategoryCard from "./CategoriesCard";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { FreeMode } from "swiper/modules";

function CategoriesSection() {
  const { categories, categoriesError, isCategoriesLoading } = useCategory();
  const ref = useRef<SwiperRef>(null);

  return (
    <div className="flex flex-col gap-3 items-start w-full">
      <p className="font-semibold text-gray-600 text-base">Categories</p>

      <FetchingState
        nullComponent={<div>No categories added yet</div>}
        className="w-full flex gap-2"
        success={
          categories && (
            <div className="flex  items-center justify-center gap-5 w-full">
              <Swiper
                spaceBetween={10}
                ref={ref}
                className="w-full  pb-2"
                freeMode
                modules={[FreeMode]}>
                {categories?.map((r) => (
                  <SwiperSlide className="!w-fit">
                    <CategoryCard key={r.id} category={r} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Link
                href={"/dashboard/inventory/categories"}
                className="w-full min-w-[40%] flex items-center justify-start">
                <Button
                  className="text-bsecondary-400 text-xs !px-0"
                  variant={"link"}
                  size={"sm"} >
                  See All
                  <FaArrowRightLong className="ml-2" />
                </Button>
              </Link>
            </div>
          )
        }
        isLoading={isCategoriesLoading}
        isError={categoriesError}
        skeletonCount={7}
        loading={<SkeletonCategoriesCard />}
      />
    </div>
  );
}

export default CategoriesSection;
