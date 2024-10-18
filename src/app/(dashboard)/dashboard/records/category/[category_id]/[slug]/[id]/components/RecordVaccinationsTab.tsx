import VaccinationCard from "@/components/card/VaccinationCard";
import SkeletonVaccinationCard from "@/components/card/VaccinationCard/SkeletonVaccinationCard";
import FetchingState from "@/components/ui/FetchingState";
import useVaccinations from "@/lib/hooks/useVaccinations";

type Props = {
  recordId: number;
};
function RecordVaccinationsTab({ recordId }: Props) {
  const { vaccinations, isLoading, error } = useVaccinations(Number(recordId));
  return (
    <div className="w-full">
      <FetchingState
        className="flex flex-col gap-5 w-full"
        success={vaccinations?.map((r) => (
          <VaccinationCard vaccination={r} />
        ))}
        loading={<SkeletonVaccinationCard />}
        skeletonCount={10}
        isLoading={isLoading}
        isError={error}
        isEmpty={vaccinations && vaccinations?.length < 1}
        nullComponent={
          <div className="flex items-center justify-center bg-green2 rounded-xl min-h-[50vh] w-full min-w-[90vw] lg:min-w-[70vw]">
            <p>No vaccination info data</p>
          </div>
        }
      />
    </div>
  );
}

export default RecordVaccinationsTab;
