import { Button } from "@/components/ui/button";
import Link from "next/link";

function HomeLogin() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className=" flex flex-col gap-5  px-5 lg:px-10 py-20 lg:min-h-[60vh] items-center justify-center w-full lg:w-[60%]">
        <div className="text-center flex flex-col gap-3 lg:gap-5">
          <h2 className="text-primary">Get Started today!!!</h2>
          <h3 className="text-base lg:text-2xl  text-center l">
            Join us at Livestockly and empower your farm with intelligent
            livestock management.
          </h3>
        </div>
        <div className="flex items-center gap-5">
          <Link href={"/login"} className="">
            <Button variant={"default"} size={"lg"}>Login</Button>
          </Link>
          <Link href={"/add-your-farm"} className="">
            <Button variant={"secondary"} size={"lg"}>Add Your Farm</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeLogin;
