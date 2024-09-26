import Image from "next/image";

type ItemProps = {
  label: string;
};
const Item = ({ label }: ItemProps) => {
  return (
    <div className="border-[1px] rounded-2xl border-green px-5 py-1">
      <p className="text-base">{label}</p>
    </div>
  );
};
function KeepTrack() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 ">
      <div>
        <div className="relative w-full h-full aspect-[1210/1000]  rounded-xl overflow-hidden">
          {" "}
          <Image
            src={"/cattle-home.png"}
            alt="Cattle "
            fill
            objectFit="cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 items-start justify-center">
        <h3 className="text-3xl lg:text-5xl ">
          Keep track of <br /> physical data like
        </h3>

        <div className="flex flex-wrap items-start gap-5">
          <Item label="Tag Details" />
          <Item label="Weight" />
          <Item label="Health and Vaccination Info" />
        </div>
      </div>
    </div>
  );
}

export default KeepTrack;
