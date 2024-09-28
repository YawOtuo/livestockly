import { Button } from "@/components/ui/button";
import Link from "next/link";

function HomeLogin() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className=" flex flex-col gap-5  px-5 lg:px-10 py-20 lg:min-h-[60vh] items-center justify-center w-full lg:w-[60%]">
        <div>
          <h3 className="text-2xl lg:text-4xl text-center leading-10 lg:leading-loose">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
            itaque omnis necessitatibus magni fugit repellendus, culpa ipsam.
          </h3>
        </div>
        <div className="flex items-center gap-5">
          <Link href={"/login"} className="">
            <Button variant={"default"}>Login</Button>
          </Link>
          <Link href={"/login"} className="">
            <Button variant={"secondary"}>Add Your Farm</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeLogin;
