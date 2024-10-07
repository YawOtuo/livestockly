import CustomTabs from "@/components/ui/CustomTabs";
import LivestocklyVaccines from "./LivestocklyVaccines";
import LocalFarmVacines from "./LocalFarmVaccines";

function AddVacModalBody() {
  return (
    <div>
      <CustomTabs
        defaultValue="local-farm-vaccines"
        tabs={[
          {
            label: "livestockly-vaccines",
            value: "livestockly-vaccines",
            content: <LivestocklyVaccines />,
          },
          {
            label: "local-farm-vaccines",
            value: "local-farm-vaccines",
            content: <LocalFarmVacines />,
          },
        ]}
      />
    </div>
  );
}

export default AddVacModalBody;
