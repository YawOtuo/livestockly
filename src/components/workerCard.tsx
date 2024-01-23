"use client";
import { IoIosContact } from "react-icons/io";

type Props = {
  worker: any;
  accepted?: boolean;
};

const WorkerCard = ({ worker, accepted = false }: Props) => {
  return (
    <div className="flex items-center rounded-md min-w-[300px] cursor-pointer hover:bg-green2 justify-center gap-5 px-10 py-5 border-2 ">
      {!accepted && (
        <div className="flex gap-5 items-center justify-center">
          <IoIosContact size={50} color="grey" />
          <div className="flex flex-col gap-1">
            <p>{worker?.username}</p>
            <p className="text-xs">{worker?.email}</p>
          </div>
        </div>
      )}
      {accepted && (
        <div className="flex gap-5 items-center justify-center">
          <IoIosContact size={50} color="grey" />
          <div className="flex flex-col gap-1">
            <p>{worker?.username}</p>
            <p className="text-xs">{worker?.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerCard;
