import { Skeleton } from "@/components/ui/skeleton";

function SkeletonFarmTotalsCard() {
    return ( 
        <div className="w-full lg:w-fit">
            <Skeleton className="w-full lg:w-fit px-5 py-3"  />
        </div>
     );
}

export default SkeletonFarmTotalsCard;