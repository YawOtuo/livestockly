"use client";
import { CustomLoaders } from "@/components/Loaders";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // router.push("/login");
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="bg-green3 w-full h-[100vh] flex items-center justify-center flex-col text-center px-5 lg:px-0">
        <p className="text-4xl">
          <span className="text-black font-semibold lowercase">livestock</span>
          <span className="text-green1 font-bold uppercase mt-2">diary</span>
        </p>
        <p className="">Your Comprehensive Livestock Management Solution</p>
        <p className="hidden lg:block lg:max-w-[60%] text-center mt-5 text-xs text-green1 font-semibold">
          Unlock the full potential of your livestock management with
          LivestockDiary, your all-in-one platform designed to streamline
          operations, boost productivity, and ensure the well-being of your
          animals.
        </p>

        <div className="w-full mt-10 text-center uppercase">
          <Link className="font-semibold text-sm px-3 py-2 hover:bg-green1 hover:text-white rounded-md border-2 border-green1" href={'/login'}>Login</Link>
        </div>
      </div>
    </main>
  );
}
