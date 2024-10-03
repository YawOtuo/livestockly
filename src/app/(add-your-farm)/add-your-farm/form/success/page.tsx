import Navbar from "@/app/(app)/components/Navbar";
import InfoText from "@/components/InfoText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";

function Page() {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="grid grid-cols-3  w-full h-full">
        <div className="bg-green-50 flex flex-col items-center justify-center sticky top-0">
          <FaCircleCheck className="text-7xl text-primary" />
        </div>
        <div className="col-span-2 px-5 lg:px-10 flex flex-col gap-5 items-start justify-center">
          <div>
            <h2 className="text-primary font-semibold">Congratulations!!! </h2>
            <p>Your farm {"name"} has been added</p>
          </div>

          <InfoText size={"sm"} text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut saepe fugit est fugiat optio ad facere sapiente doloribus libero doloremque dolor nisi repudiandae ut aspernatur quidem, distinctio, consectetur ipsa non?" />
          
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
