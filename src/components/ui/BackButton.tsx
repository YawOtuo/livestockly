import { useRouter } from "next/navigation";
import { Button } from "./button";

function BackButton() {
  const router = useRouter();
  return (
    <Button variant={"outline"} onClick={() => router.back()} className="bg-transparent text-xs" size={"sm"}>
      Back
    </Button>
  );
}

export default BackButton;
