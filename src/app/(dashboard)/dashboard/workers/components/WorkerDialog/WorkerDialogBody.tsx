import { Button } from "@/components/ui/button";
import { User } from "@/lib/types/user";
import useWorkers from "../../hooks/useWorkers";
import { useAppStore } from "@/lib/store/useAppStore";
import { MdCancel } from "react-icons/md";

type Props = {
  worker: User;
};

function WorkerDialogBody({ worker }: Props) {
  const { handleReject } = useWorkers();
  const { DBDetails } = useAppStore();

  return (
    <div>
      <h3 className="border-b-slate-100 text-black">{worker?.username}</h3>
      {DBDetails?.id != worker.id && (
        <Button variant={"destructive"} onClick={() => handleReject(worker.id)}>
          <MdCancel className="mr-1" />
          Dismiss Worker
        </Button>
      )}
    </div>
  );
}

export default WorkerDialogBody;
