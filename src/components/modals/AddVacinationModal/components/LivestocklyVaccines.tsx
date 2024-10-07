import VaccineCard from "@/app/(dashboard)/components/VaccineCard";
import useVaccines from "@/lib/hooks/useVaccines";

function LivestocklyVaccines() {
    const {vaccines} = useVaccines()
    return ( 
        <div className="flex flex-wrap gap-5">
            {vaccines?.map((r) => (
                <VaccineCard vaccine={r}/>
            ))}
        </div>
     );
}

export default LivestocklyVaccines;