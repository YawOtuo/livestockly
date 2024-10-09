import { Skeleton } from "@/components/ui/skeleton";

function SkeletonInventoryItemCard() {
    return ( 
        <div className="w-full">
            <Skeleton className="w-full h-40" />
        </div>
     );
}

export default SkeletonInventoryItemCard;