import { Vaccination } from "@/lib/types/vaccination";

type Props = {
  vaccination: Vaccination;
};

function RecordCategoryVaccinationCard({ vaccination }: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6  w-full hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Vaccination Details</h3>
        <p className="text-sm text-gray-500">Farm ID: {vaccination.farm_id || "N/A"}</p>
      </div>
      <div className="space-y-2">
        <div>
          <span className="text-sm text-gray-600">Vaccination Date:</span>
          <p className="text-md font-medium text-gray-800">
            {new Date(vaccination.vaccination_date).toLocaleDateString()}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Vaccine Name:</span>
          <p className="text-md font-medium text-gray-800">{vaccination.vaccine.name}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Manufacturer:</span>
          <p className="text-md font-medium text-gray-800">{vaccination.vaccine.manufacturer}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Repeat:</span>
          <p className="text-md font-medium text-gray-800">
            {vaccination.repeat ? `Every ${vaccination.repeat_every_n_days} days` : "No"}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-900 transition-colors">
          View Full Record
        </button>
      </div>
    </div>
  );
}

export default RecordCategoryVaccinationCard;
