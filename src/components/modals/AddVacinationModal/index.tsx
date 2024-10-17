import useDisclosure from "@/lib/hooks/useDisclosure";
import { Button } from "../../ui/button";
import CustomModal from "../../ui/CustomDialog";
import AddVacModalBody from "./components/AddVacModalBody";

type Props = {
  type?: string;
  selectedRecords: number[];
};
function AddVaccinationModal({ selectedRecords }: Props) {
  const { open, setOpen } = useDisclosure();
  return (
    <div className="flex items-start">
      <CustomModal
        open={open}
        onOpenChange={setOpen}
        size={"8xl"}
        trigger={<Button>Go</Button>}
        body={<AddVacModalBody setOpen={setOpen}  />}
      />
    </div>
  );
}

export default AddVaccinationModal;
