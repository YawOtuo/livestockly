import { useRouter } from "next/navigation";
import { Button } from "./button";
import { MdKeyboardArrowLeft } from "react-icons/md";

type Props = {
  className?: string;
  icon?: boolean;
};

function BackButton({ className, icon }: Props) {
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      onClick={() => router.back()}
      className={`bg-transparent text-xs ${className}`}
      size={"sm"}>
      {icon && <MdKeyboardArrowLeft className="mr-1" />} Back
    </Button>
  );
}

export default BackButton;
