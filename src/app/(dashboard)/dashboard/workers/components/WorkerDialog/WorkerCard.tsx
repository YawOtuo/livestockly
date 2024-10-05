import { Button } from "@/components/ui/button";
import { User } from "@/lib/types/user";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdCancel, MdOutlineMarkEmailRead } from "react-icons/md";
import useWorkers from "../../hooks/useWorkers";
import { useAppStore } from "@/lib/store/useAppStore";

type Props = {
  worker: User;
};
function WorkerCard({ worker }: Props) {
  const { DBDetails } = useAppStore();
  const { handleAccept, handleReject } = useWorkers();
  return (
    <div className="flex flex-col gap-5 w-full border px-3 border-slate-100 py-3 rounded-2xl">
      <div className="w-full aspect-[3/3] bg-slate-100 rounded-xl  "></div>
      <div className="flex flex-col gap-0 items-start">
        <div className="flex items-start gap-1">
          <p className="font-semibold">{worker.username}</p>
          {worker.id == DBDetails?.id && (
            <p className="text-primary font-semibold">(me)</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <MdOutlineMarkEmailRead />
          <p className="text-xs"> {worker.email}</p>
        </div>
      </div>
      {!worker.acceptedIntoFarm && (
        <div className="w-full flex justify-end gap-3">
          <Button variant={"default"} onClick={() => handleAccept(worker.id)}>
            {" "}
            <IoCheckmarkDone className="mr-1" />
            Accept
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => handleReject(worker.id)}>
            <MdCancel className="mr-1" />
            Dismiss Invite
          </Button>
        </div>
      )}
    </div>
  );
}

export default WorkerCard;
