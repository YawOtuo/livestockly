import VaccineCard from "@/app/(dashboard)/components/VaccineCard";
import AddVaccineModal from "@/components/modals/AddVaccinesModal";
import useVaccines from "@/lib/hooks/useVaccines";

function TabFarmVaccines() {
  const { vaccines } = useVaccines();
  return (
    <div className="flex items-start flex-col gap-5">
      <AddVaccineModal />
      <div className="flex items-center gap-5 flex-wrap">
        {vaccines?.map((r) => (
          <VaccineCard vaccine={r}/>
        ))}
      </div>
    </div>
  );
}

export default TabFarmVaccines;
