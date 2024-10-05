import { Skeleton } from "@/components/ui/skeleton";

function SkeletonWorkerCard() {
    return ( 
        <div className="w-full rounded-2xl ">
            <Skeleton className="w-full h-[300px]"/>
        </div>
     );
}

export default SkeletonWorkerCard;