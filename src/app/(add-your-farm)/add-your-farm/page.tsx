"use client";
import FarmsDisplaySlider from "@/app/(app)/components/FarmsDisplaySlider";
import Navbar from "@/app/(app)/components/Navbar";

import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page() {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:h-screen">
        <FarmsDisplaySlider />
        <div className="py-10 lg:py-24 bg-green2 px-5 lg:px-24 flex flex-col justify-between gap-5 h-full">
          <div className="flex flex-col gap-5 justify-end">
            <h2>
              Register your farm with{" "}
              <span className="text-primary">livestockly</span>
            </h2>{" "}
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam perspiciatis animi saepe illo sapiente aliquam aliquid
              quis, blanditiis, eligendi aperiam eos nobis enim hic voluptates
              minus impedit quisquam alias. Nemo.
            </p>
          </div>
          <div className="w-full lg:w-[40%]">
            <Link href={"/add-your-farm/form"}>
              <Button size={"lg"} className="w-full">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
