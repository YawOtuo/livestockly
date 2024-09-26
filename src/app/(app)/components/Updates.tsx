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

function Updates() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 2xl:gap-20">
      <div className="order-2 lg:order-1 flex flex-col gap-5 items-start justify-center">
        <p className="text-3xl lg:text-5xl ">
          Get updates and notifications on the actvities of your farm
        </p>

        <div className="flex flex-wrap items-start gap-5">
          <Item label="Tag Details" />
          <Item label="Weight" />
          <Item label="Health and Vaccination Info" />
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <div className="relative w-full h-full aspect-[1210/1000]  rounded-xl overflow-hidden">
          <Image src={"/cattle2-home.png"} alt="Cattle " fill />
        </div>
      </div>
    </div>
  );
}

export default Updates;
