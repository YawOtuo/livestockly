import { Vaccination } from "@/lib/types/vaccination";

type Props = {
  vaccination: Vaccination;
};

function VaccinationCard({ vaccination }: Props) {
  return (
    <div className="hover:bg-green2 transition-all cursor-pointer shadow border-[1px] rounded-lg shadow-green2 px-5 flex flex-col lg:flex-row py-3 items-start lg:items-center justify-between w-full gap-5">
      <div className="flex flex-col items-start">
        <p className="capitalize text-primary-900 text-lg">
          {/* Vaccine Name:{" "} */}
          <span className="font-semibold">{vaccination.vaccine.name}</span>
        </p>

        <p className="text-slate-600">Date: {vaccination.vaccination_date}</p>
      </div>
      <div className="flex flex-col gap-0 items-start">
        <div className="flex items-center gap-1 capitalize">
          <p className="text-sm">{vaccination.repeat && "repeats"}</p>
          <p>{vaccination.repeat_every_n_days} days</p>
        </div>
        <div>Next vaccination date: N/A</div>
      </div>
    </div>
  );
}

export default VaccinationCard;
