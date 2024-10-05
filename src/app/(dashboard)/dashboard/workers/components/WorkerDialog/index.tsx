import CustomModal from "@/components/ui/CustomDialog";
import { User } from "@/lib/types/user";
import WorkerCard from "./WorkerCard";
import WorkerDialogBody from "./WorkerDialogBody";

type Props = {
  worker: User;
};
function WorkersDialog({ worker }: Props) {
  return (
    <div className="w-full">
      <CustomModal
        size={"6xl"}
        trigger={<WorkerCard worker={worker} />}
        body={<WorkerDialogBody  worker={worker}/>}
      />
    </div>
  );
}

export default WorkersDialog;
