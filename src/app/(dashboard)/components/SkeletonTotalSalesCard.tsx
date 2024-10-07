import { Skeleton } from "@/components/ui/skeleton";

function SkeletonTotalSalesCard() {
    return ( 
        <div className="w-full lg:w-fit">
            <Skeleton className=" w-full lg:w-fit lg:min-w-[200px] aspect-[5/2] "  />
        </div>
     );
}

export default SkeletonTotalSalesCard