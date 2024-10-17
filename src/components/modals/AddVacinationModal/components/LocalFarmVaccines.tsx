import VaccineCard from "@/app/(dashboard)/components/VaccineCard";
import SkeletonVaccineCard from "@/app/(dashboard)/components/VaccineCard/SkeletonVaccineCard";
import { useVaccinateStore } from "@/app/(dashboard)/dashboard/records/category/[category_id]/[slug]/components.tsx/useVaccinate";
import FetchingState from "@/components/ui/FetchingState";
import useVaccines from "@/lib/hooks/useVaccines";

function LocalFarmVacines() {
  const { vaccines, isLoading, error } = useVaccines();
  const { selectedVaccine, setSelectedVaccine } = useVaccinateStore();
  return (
    <div>
      <FetchingState
        className="grid grid-cols-1 lg:grid-cols-2 gap-5"
        success={vaccines?.map((r) => (
          <div onClick={() => setSelectedVaccine(r)}>
            <VaccineCard vaccine={r} />
          </div>
        ))}
        isLoading={isLoading}
        isError={error}
        skeletonCount={5}
        loading={<SkeletonVaccineCard />}
      />
    </div>
  );
}

export default LocalFarmVacines;
