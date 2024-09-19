import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useToast from "./useToasts";
import { RootState } from "../redux/store";

function useIsLoggedInReRoute(status?: boolean, url?: string | number) {
  const userData = useSelector((state : RootState) => state?.users?.userData);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    console.log(userData);
    if (userData) {
      status && router.push(url as string);
      setIsLoggedIn(true);
    } else {
      !status && router?.push(url as string);
    }
  }, [userData]);

  return isLoggedIn;
}

export default useIsLoggedInReRoute;

