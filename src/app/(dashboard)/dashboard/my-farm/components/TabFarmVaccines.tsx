import VaccineCard from "@/app/(dashboard)/components/VaccineCard";
import SkeletonVaccineCard from "@/app/(dashboard)/components/VaccineCard/SkeletonVaccineCard";
import AddVaccineModal from "@/components/modals/AddVaccinesModal";
import FetchingState from "@/components/ui/FetchingState";
import useVaccines from "@/lib/hooks/useVaccines";

function TabFarmVaccines() {
  const { vaccines, isLoading, error } = useVaccines();
  return (
    <div className="flex items-start flex-col gap-5">
      <AddVaccineModal />
      <div className="flex items-center gap-5 flex-wrap">
        <FetchingState
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          skeletonCount={5}
          isError={error}
          isLoading={isLoading}
          success={vaccines?.map((r) => (
            <VaccineCard vaccine={r} />
          ))}
          loading={<SkeletonVaccineCard />}
        />
      </div>
    </div>
  );
}

export default TabFarmVaccines;
