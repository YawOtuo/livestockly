import { Skeleton } from "@/components/ui/skeleton";

function SkeletonTotalSalesCard() {
    return ( 
        <div className="w-full lg:w-fit">
            <Skeleton className=" w-full lg:w-fit px-20 py-10  "  />
        </div>
     );
}

export default SkeletonTotalSalesCard