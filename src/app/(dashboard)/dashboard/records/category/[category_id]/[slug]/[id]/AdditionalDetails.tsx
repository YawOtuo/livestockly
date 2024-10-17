import CustomTabs from "@/components/ui/CustomTabs";
import RecordVaccinationsTab from "./components/RecordVaccinationsTab";
import RecordFeedingTab from "./components/RecordFedingTab";
import RecordWeightTab from "./components/RecordWeightTab";
import RecordGeneralInfoTab from "./components/RecordGeneralInfoTab";
import RecordHealthConditionTab from "./components/RecordHealthConditionTab";

type Props = {
  recordId: number;
};

function AdditionalDetails({ recordId }: Props) {
  return (
    <div className="w-full flex flex-col items-start">
      <CustomTabs
        className="w-full flex items-start justify-start flex-col "
        defaultValue="vaccinations"
        tabs={[
          {
            label: "Vaccinations",
            value: "vaccinations",
            content: <RecordVaccinationsTab recordId={recordId} />,
          },
          {
            label: "Feeding",
            value: "feeding",
            content: <RecordFeedingTab />,
          },
          {
            label: "Weight",
            value: "weight",
            content: <RecordWeightTab />,
          },
          {
            label: "General Information",
            value: "general",
            content: <RecordGeneralInfoTab />,
          },
          {
            label: "Health Condition",
            value: "health",
            content: <RecordHealthConditionTab />,
          },
        ]}
      />
    </div>
  );
}

export default AdditionalDetails;
