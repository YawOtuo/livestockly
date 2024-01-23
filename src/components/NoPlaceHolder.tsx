type Props = {
  label: string;
};
import { IoInformationCircleOutline } from "react-icons/io5";

export default function NoPlaceHolder({ label }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center bg-yellow5 w-full h-full">
      <IoInformationCircleOutline color="#ba820873" size="70" />

      <p className="capitalize text-slate-700">No {label} yet</p>
    </div>
  );
}
