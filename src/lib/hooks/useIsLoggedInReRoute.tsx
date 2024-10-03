"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useAppStore } from "../store/useAppStore";

function useIsLoggedInReRoute(status?: boolean, reRouteUrl?: string) {
  const { DBDetails } = useAppStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [prevUrl, setPrevUrl] = useState();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [previousUrl, setPreviousUrl] = useLocalStorage<any>(
    "livestockly-prev-url",
    ""
  );

  useEffect(() => {
    const url = `${pathname}${searchParams}`;
    if (pathname !== "/login" && pathname !== "/sign-up") {
      setPreviousUrl(url);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (DBDetails?.email) {
      if (status) {
        setIsLoggedIn(true);
        router.push(previousUrl || reRouteUrl);
      }
    } else {
      if (reRouteUrl) {
        !status && router?.push(reRouteUrl);
      }
    }
  }, [DBDetails?.email]);

  return isLoggedIn;
}

export default useIsLoggedInReRoute;
