"use client";
import { CustomLoaders } from "@/components/Loaders";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login")
  }, [router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      BOATEY FARMS...
      <CustomLoaders variant="syncloader" colour="green1" />

      <Link className="" href={'/login'}>Go to Login</Link>
    </main>
  );
}
