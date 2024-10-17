import { Vaccine } from "@/lib/types/vaccines";
import { MdOutlineDriveFileRenameOutline, MdOutlinePrecisionManufacturing } from "react-icons/md";
import { TbVaccine } from "react-icons/tb";

type Props = {
  vaccine: Vaccine;
};

function VaccineCard({ vaccine }: Props) {
  return (
    <div className="shadow-md p-5 flex flex-col w-full rounded-2xl cursor-pointer hover:bg-green2 ">
      <div className="w-[200px] aspect-[3/2] flex items-center justify-center roudned-lg">
        <TbVaccine className="text-primary text-5xl" />
      </div>
      <div className="flex flex-col gap-0 border-t-[1px] pt-1">
        <div className="flex items-center gap-1 capitalize">
          <MdOutlineDriveFileRenameOutline />
          <p>{vaccine?.name}</p>
        </div>
        {/* <p>{vaccine?.expiration_date}</p> */}
        <div className="flex items-center gap-2 text-gray-700 text-xs">
          <MdOutlinePrecisionManufacturing />

          <p>{vaccine?.manufacturer}</p>
        </div>{" "}
      </div>
    </div>
  );
}

export default VaccineCard;
