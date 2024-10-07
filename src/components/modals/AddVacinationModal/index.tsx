import { Button } from "../../ui/button";
import CustomModal from "../../ui/CustomDialog";
import AddVacModalBody from "./components/AddVacModalBody";


function AddVaccinationModal() {
  return (
    <div className="flex items-start">
      <CustomModal
        trigger={<Button variant={"outline"}>Add Vaccination</Button>}
        body={<AddVacModalBody />}
      />
    </div>
  );
}

export default AddVaccinationModal;
