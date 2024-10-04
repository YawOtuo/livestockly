"use client"
import { useAppStore } from "@/lib/store/useAppStore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  level: number;
  children: React.ReactNode;
};
export const PermissionComponent = ({ level, children }: Props) => {
  const { DBDetails } = useAppStore();

  const [display, setDisplay] = useState(true);

  useEffect(() => {
    // console.log(DBDetails?.permission)
    if (Number(DBDetails?.permission) >= level) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [DBDetails]);

  return <div className="">{display && children}</div>;
};
