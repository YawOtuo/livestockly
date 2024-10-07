import useFarm from "@/lib/hooks/useFarm";

interface InfoComponentProps {
  label: string;
  value?: string | number; // You can change this type based on your needs
}

const InfoComponent: React.FC<InfoComponentProps> = ({ label, value }) => {
  return (
    <div className="flex items-center gap-2">
      <strong className="text-black">{label}:</strong>
      <span className="text-gray-700">{value || "N/A"}</span>
    </div>
  );
};

function TabFarmDetails() {
  const { farm } = useFarm();

  return (
    <div className="py-5">
      <div >
        <div className="flex flex-col items-start gap-5 ">
          <InfoComponent label="Location" value={farm?.location} />{" "}
        </div>
      </div>
    </div>
  );
}

export default TabFarmDetails;
