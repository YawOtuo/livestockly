import { Button } from "@/components/ui/button";
import Link from "next/link";

function PilotGetInvolved() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-primary"> How to Get Involved</h2>
      <p>
        If you&apos;e interested in participating in the Livestockly AI Pilot
        Program, we&apos;d love to hear from you! Please click {" "}
        <Link href={"/add-your-farm"}>
          <Button variant={"link"} size={"lg"} className="px-0" >here</Button>
        </Link>{" "}
        to register your farm link to get started or contact us at
        livestockly@gmail.com for more information.
      </p>
    </div>
  );
}

export default PilotGetInvolved;
