import TagCard from "@/components/TagCard";
import SkeletonTagCard from "@/components/TagCard/SkeletonTagCard";
import FetchingState from "@/components/ui/FetchingState";
import { GetAllFarmRecordsSp } from "@/lib/api/farm";
import { useAppStore } from "@/lib/store/useAppStore";
import { LivestockCategory } from "@/lib/types/livestockcategory";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
const AddRecordModal = dynamic(
  () => import("@/components/modals/AddRecordModal")
);

type Props = {
  category: LivestockCategory;
};
function RecordsAllTab({ category }: Props) {
  const params = useParams();
  const { DBDetails } = useAppStore();

  let type = decodeURIComponent(String(params?.slug));

  const {
    isLoading,
    error,
    data: records,
  } = useQuery(
    [type], // Query key based on dynamic type
    () => GetAllFarmRecordsSp(DBDetails?.farm_id as number, type as string),
    {
      enabled: !!type, // Enable the query only when type is available
    }
  );
  const renderList = (
    <FetchingState
      loading={<SkeletonTagCard />}
      isLoading={isLoading}
      isError={error}
      skeletonCount={10}
      className="grid grid-cols-3 gap-5 px-3"
      success={
        records &&
        records?.map((item: any, index: number) => (
          <div className="col-span-3 lg:col-span-1 items-center" key={index}>
            <TagCard record={item} />
          </div>
        ))
      }
    />
  );
  return (
    <div>
      <div className="pb-3 flex items-center justify-start">
        <p>
          Displaying all
          <span className="brand-green-font"> {records?.length}</span>{" "}
          <span className="capitalize"> {type}</span>
        </p>
        {category && <AddRecordModal variant="icon" category={category} />}{" "}
      </div>
      <div className="w-full">
        <div className="justify-center items-center">{renderList}</div>
      </div>
    </div>
  );
}

export default RecordsAllTab;
