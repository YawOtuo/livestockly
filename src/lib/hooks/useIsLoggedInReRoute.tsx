"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { useLocalStorage } from "usehooks-ts";

function useIsLoggedInReRoute(status?: boolean, reRouteUrl?: string) {
  const {  FBaseDetails } = useAppStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let previousUrl: string ;
  let setPreviousUrl: any;

  if (typeof window != undefined) {
    [previousUrl, setPreviousUrl] = useLocalStorage<any>(
      "livestockly-prev-url",
      ""
    );
  }

  useEffect(() => {
    const url = `${pathname}${searchParams}`;
    if (pathname !== "/login" && pathname !== "/sign-up") {
      setPreviousUrl(url);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (FBaseDetails?.email) {
      if (status) {
        setIsLoggedIn(true);

        router.push(previousUrl || reRouteUrl as string);
      }
    } else {
      if (reRouteUrl) {
        !status && router?.push(reRouteUrl);
      }
    }
  }, [FBaseDetails?.email]);

  return isLoggedIn;
}

export default useIsLoggedInReRoute;
