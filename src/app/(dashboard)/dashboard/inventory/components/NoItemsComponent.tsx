import useFarm from "@/lib/hooks/useFarm";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MdOutlineInventory } from "react-icons/md";
const AddInventoryItemModal = dynamic(
  () => import("@/components/modals/AddInventoryItemModal")
);

function NoItemsComponent() {
  const { farm } = useFarm();
  return (
    <div className="flex flex-col w-full bg-bsecondary-400/5 px-10 py-10 lg:py-24 rounded-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full py-10">
        <div className="flex flex-col gap-2 w-full items-start">
          <h3>Welcome to {farm?.name}&apos;s Inventory Management System</h3>
          <p className="text-sm">
            Efficiently manage your farm's resources, track inventory, and
            streamline operations all in one place. Whether you're managing
            crops, livestock, equipment, or supplies, our system helps you stay
            organized, maximize productivity, and make informed decisions.
          </p>
          <div className="mt-2">
            <AddInventoryItemModal className="bg-bsecondary-400 text-white hover:bg-bsecondary-600" />
          </div>{" "}
        </div>
        <div className="relative w-full aspect-video">
          <Image
            src="/images/inventory-landing-page.png"
            alt="Inventory"
            fill
          />
        </div>
      </div>
    </div>
  );
}

export default NoItemsComponent;
