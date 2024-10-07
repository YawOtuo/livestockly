import { Skeleton } from "@/components/ui/skeleton";

function SkeletonFarmTotalsCard() {
    return ( 
        <div className="w-full lg:w-fit">
            <Skeleton className="w-full lg:w-fit lg:min-w-[150px] aspect-square"  />
        </div>
     );
}

export default SkeletonFarmTotalsCard;