"use client";
import { CustomLoaders } from "@/components/Loaders";
import { useScroll } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Comprehensive from "./components/Comprehensive";
import ThreePoints from "./components/ThreePoints";
import NewWay from "./components/NewWay";
import KeepTrack from "./components/KeepTrack";
import Updates from "./components/Updates";
import HomeLogin from "./components/HomeLogin";
import LivestockAI from "./components/LivestockAI";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import FramerWrapper from "@/components/FramerWrapper";
import { fadeUp } from "@/lib/animations";

export default function Home() {
  const router = useRouter();
  const { scrollYProgress, scrollY } = useScroll();

  useEffect(() => {
    console.log(scrollY);
    console.log("2", scrollYProgress);
  }, [router]);

  return (
    <div className="">
      <div className="mb-14 lg:mb-20">
        <Comprehensive />
      </div>{" "}
      <div className="px-5 lg:px-10">
        <FramerWrapper {...fadeUp}>
          <ThreePoints />
        </FramerWrapper>{" "}
        <NewWay />
        <div className="flex flex-col gap-20 lg:gap-20">
          <FramerWrapper {...fadeUp}>
            <KeepTrack />
          </FramerWrapper>{" "}
          <FramerWrapper {...fadeUp}>
            <Updates />
          </FramerWrapper>{" "}
          <FramerWrapper {...fadeUp}>
            <LivestockAI />
          </FramerWrapper>{" "}
          <FramerWrapper {...fadeUp}>
            <Pricing />
          </FramerWrapper>{" "}
          <FramerWrapper {...fadeUp}>
            <HomeLogin />
          </FramerWrapper>{" "}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
