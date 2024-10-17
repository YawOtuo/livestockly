import TagCard from "@/components/TagCard";
import SkeletonTagCard from "@/components/TagCard/SkeletonTagCard";
import { Button } from "@/components/ui/button";
import FetchingState from "@/components/ui/FetchingState";
import { GetAllFarmRecordsSp } from "@/lib/api/farm";
import { useAppStore } from "@/lib/store/useAppStore";
import { LivestockCategory } from "@/lib/types/livestockcategory";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useVaccinateStore } from "./useVaccinate";
import { motion } from "framer-motion";
import AddVaccinationModal from "@/components/modals/AddVacinationModal";

const AddRecordModal = dynamic(
  () => import("@/components/modals/AddRecordModal")
);

type Props = {
  category: LivestockCategory;
};

function RecordsAllTab({ category }: Props) {
  const params = useParams();
  const { DBDetails } = useAppStore();
  const {
    readyToVaccinate,
    setReadyToVaccinate,
    selectedRecords,
    addRecord,
    removeRecord,
    clearSelection,
  } = useVaccinateStore();

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

  // Handle record selection by toggling the ID
  const handleSelectRecord = (recordId: number) => {
    const isSelected = selectedRecords.includes(recordId);
    if (isSelected) {
      removeRecord(recordId); // Deselect if already selected
    } else {
      addRecord(recordId); // Add to selection
    }
  };

  const renderList = (
    <FetchingState
      loading={<SkeletonTagCard />}
      isLoading={isLoading}
      isError={error}
      skeletonCount={10}
      className="grid grid-cols-3 gap-5 py-3"
      success={
        records &&
        records?.map((item: any, index: number) => (
          <div className="col-span-3 lg:col-span-1 items-center" key={index}>
            <div
              className={`cursor-pointer`}
              onClick={() => handleSelectRecord(item.id)} // Pass only the ID
            >
              <TagCard
                record={item}
                asLink={!readyToVaccinate} // Disable link when ready to vaccinate
                selected={selectedRecords.includes(item.id)} // Check by ID
              />
            </div>
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

      <motion.div
        layout
        className="w-full justify-start flex gap-3 items-center ">
        <Button
          variant={`${readyToVaccinate ? "secondary" : "primary-900"}`}
          onClick={() => {
            setReadyToVaccinate(true);
          }}>
          Vaccinate
        </Button>
        {!readyToVaccinate && <Button variant={"primary-900"}>Feed</Button>}{" "}
        {readyToVaccinate && (
          <Button onClick={() => clearSelection()} variant={"destructive"}>
            Cancel
          </Button>
        )}
        {readyToVaccinate && (
          <AddVaccinationModal selectedRecords={selectedRecords} />
        )}
      </motion.div>

      <div className="w-full">
        <div className="justify-center items-center">{renderList}</div>
      </div>
    </div>
  );
}

export default RecordsAllTab;
