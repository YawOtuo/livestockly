"use client"
import Navbar from "@/app/(app)/components/Navbar";
import InfoText from "@/components/InfoText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaCircleCheck } from "react-icons/fa6";

function Page() {
  const searchParams = useSearchParams();
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="grid grid-cols-3  w-full h-full">
        <div className="bg-green-50 flex flex-col items-center justify-center sticky top-0">
          <FaCircleCheck className="text-7xl text-primary" />
        </div>
        <div className="col-span-2 px-5 lg:px-10 flex flex-col gap-5 items-start justify-center">
          <div className="flex flex-col gap-1">
            <h2 className="text-primary font-semibold">Congratulations!!! </h2>
            <p>Your farm <span className="text-primary uppercase font-semibold">{searchParams.get("farm")}</span> has been added to Livestockly</p>
          </div>

          <InfoText
            size={"sm"}
            text="Your farm has been added now. The next step involves creating your own personal account with your personal credentials that you can use to log into your farm. If you are the owner, please use the owner's email you speicfied in the form. We will get back to you after verification so that you can start using the platform. See you soon!!!"
          />

          <div>
            <Link href="/sign-up">
              <Button variant={"link"}>Add Yourself as the first user</Button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
