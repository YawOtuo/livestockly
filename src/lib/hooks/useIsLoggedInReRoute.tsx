"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocalStorage } from "@uidotdev/usehooks";
import { RootState } from "../redux/store";

function useIsLoggedInReRoute(status?: boolean, url?: string) {
  const userData = useSelector((state: RootState) => state?.users?.userData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [prevUrl, setPrevUrl] = useState();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [previousUrl, setPreviousUrl] = useLocalStorage(
    "livestock-diary-prev-url",
    ""
  );

  useEffect(() => {
    const url = `${pathname}${searchParams}`;
    if (pathname !== "/login" && pathname !== "/sign-up") {
      setPreviousUrl(url);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (userData) {
      if (status) {
        setIsLoggedIn(true);
        router.push(previousUrl || (url as string));
      }
    } else {
      !status && router?.push(url as string);
    }
  }, [userData]);

  return isLoggedIn;
}

export default useIsLoggedInReRoute;
