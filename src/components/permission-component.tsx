import { RootState } from "@/lib/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  level: number;
  children: React.ReactNode;
};
export const PermissionComponent = ({ level, children }: Props) => {
  const userSqlData = useSelector(
    (state: RootState) => state?.users?.userSqlData
  );
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    // console.log(userSqlData?.permission)
    if (Number(userSqlData?.permission) >= level) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [userSqlData]);

  return <div className="">{display && children}</div>;
};
