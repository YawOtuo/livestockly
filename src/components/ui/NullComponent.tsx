"use client";
import Image from "next/image";
import React from "react";

type Props = {
  className?: string;
  label?: string;
};

const NullComponent = ({ className, label = "No schedule/talk found" }: Props) => {
  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center">
      <div className="relative w-full max-w-[500px] min-h-[300px] aspect-square">
        <Image src={"/error.png"} alt="Eror" fill objectFit="cover" />
      </div>
      <p className="text-primary"> {label}</p>
    </div>
  );
};

export default NullComponent;
