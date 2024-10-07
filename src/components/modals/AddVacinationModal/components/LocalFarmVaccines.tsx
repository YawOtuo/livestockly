import VaccineCard from "@/app/(dashboard)/components/VaccineCard";
import useVaccines from "@/lib/hooks/useVaccines";

function LocalFarmVacines() {
    const {vaccines} = useVaccines()
    return ( 
        <div className="flex flex-wrap gap-5">
            {vaccines?.map((r) => (
                <VaccineCard vaccine={r}/>
            ))}
        </div>
     );
}

export default LocalFarmVacines;