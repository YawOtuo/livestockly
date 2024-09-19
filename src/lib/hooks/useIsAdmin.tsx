import { useEffect, useState } from "react";

export const useIsAdmin = (uid : string) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const admins = [
    "YWvppnAVowgY5nevz6loHwCwRTy2",
    "UzcYR590lDTmZB5fiMteOwk18am1",
    "t6FPafja6cWzZ8M9JOfzTG9LwwF3",
  ];

  useEffect(() => {
    if (uid && admins.includes(uid)) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);  
    }
  }, [uid]);

  return isAdmin;
};
