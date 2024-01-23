import { useEffect, useState } from "react";

export const useJsonCompletenessCheck = (jsonObject) => {
  const [isComplete, setIsComplete] = useState(null);

  useEffect(() => {
    const checkJsonComplete = () => {
      for (const key in jsonObject) {
        if (
          jsonObject.hasOwnProperty(key) &&
          (jsonObject[key] === null || jsonObject[key] === undefined || jsonObject[key] === "")
        ) {
          setIsComplete(false);
          return;
        }
      }
      setIsComplete(true);
    };

    checkJsonComplete();
  }, [jsonObject]);

  return isComplete;
};
