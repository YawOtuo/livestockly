import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/store/useAppStore";

function WorkersSearch() {
  const { DBDetails } = useAppStore();

  return (
    <div className="w-full max-w-[700px]">
      <Input className="" placeholder="Search for a worker"/>
    </div>
  );
}

export default WorkersSearch;
