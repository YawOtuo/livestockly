import { Skeleton } from "@/components/ui/skeleton";

function SkeletonFarmTotalsCard() {
    return ( 
        <div className="w-full lg:w-fit">
            <Skeleton className="w-full lg:w-fit lg:min-w-[250px] aspect-square"  />
        </div>
     );
}

export default SkeletonFarmTotalsCard;