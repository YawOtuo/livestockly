"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const images = ["1.jpg", "2.jpg", "3.jpg"];

function FarmsDisplaySlider() {
  return (
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
  );
}

export default FarmsDisplaySlider;
