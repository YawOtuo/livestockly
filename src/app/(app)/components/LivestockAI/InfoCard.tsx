import { BsCheckAll, BsPatchCheck } from "react-icons/bs";
import { IoCheckmarkSharp } from "react-icons/io5";
import { LuCheck } from "react-icons/lu";

type Props = {
  type: string;
  items: string[];
  about: string;
};

function InfoCard({ type = "free", items, about }: Props) {
  return (
    <div className="group flex flex-col gap-5 border-2  rounded-2xl overflow-hidden hover:scale-[1.01] transition-all group-hover:border-greendeep border-green2">
      <div
        className={`uppercase text-primary text-2xl font-semibold p-5 bg-green2 group-hover:bg-greendeep  transition-all group-hover:text-white`}>
        {type}
      </div>
      <div className="flex flex-col gap-4 py-5 px-5">
        <div className=" ">{about}</div>
        <div className="flex flex-col gap-3 ">
          {items?.map((r) => (
            <div className="flex items-start gap-3">
              <BsCheckAll className="text-gray-700 text-2xl" />

              <p className=" text-gray-700">{r}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
