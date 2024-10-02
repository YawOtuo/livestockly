"use client";
import Navbar from "@/app/(app)/components/Navbar";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const images = ["1.jpg", "2.jpg", "3.jpg"];
function Page() {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:h-screen">
        <Swiper
          className="w-full h-[50vh] lg:h-full"
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}>
          {images?.map((r) => (
            <SwiperSlide className="!w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  className=""
                  objectFit="cover"
                  fill
                  src={`/images/add-your-farm/${r}`}
                  alt="farm image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
