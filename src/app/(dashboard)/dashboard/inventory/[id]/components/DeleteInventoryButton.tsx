import { Button } from "@/components/ui/button";
import { MdOutlineDelete } from "react-icons/md";

function DeleteInventoryButton() {
  return (
    <Button
      variant={"destructive"}
      size={"sm"}
      className="max-w-[150px] bg-gray-500">
      <MdOutlineDelete />
    </Button>
  );
}

export default DeleteInventoryButton;
