import FetchingState from "@/components/ui/FetchingState";
import useVaccinations, {
  useAllCategoriesVaccinations,
} from "@/lib/hooks/useVaccinations";
import { LivestockCategory } from "@/lib/types/livestockcategory";
import SkeletonRecordCategoryVaccinationCard from "./RecordCategoryVaccinationCard/SkeletonRecordCategoryVaccinationCard";
import RecordCategoryVaccinationCard from "./RecordCategoryVaccinationCard";

type Props = {
  category: LivestockCategory;
};
function RecordsCategoryVaccinationsSchedulesTab({ category }: Props) {
  const {
    data: vaccinations,
    isLoading,
    isError,
  } = useAllCategoriesVaccinations(category.id);
  return (
    <div className="flex flex-col gap-5  items-center justify-center ">
      <FetchingState
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full`}
        isLoading={isLoading}
        isError={isError}
        skeletonCount={10}
        success={vaccinations?.map((r) => (
          <RecordCategoryVaccinationCard vaccination={r} />
        ))}
        loading={<SkeletonRecordCategoryVaccinationCard />}
        isEmpty={vaccinations && vaccinations?.length < 1}
        nullComponent={
          <div className="col-span-3 flex items-center justify-center bg-green2 rounded-xl min-h-[50vh] w-full">
            No vaccination schedules yet
          </div>
        }
      />
    </div>
  );
}

export default RecordsCategoryVaccinationsSchedulesTab;
