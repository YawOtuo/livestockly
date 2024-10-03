
import { Farm } from "../types/farm";
import { useLocalStorage } from "usehooks-ts";

function useSetFarmIdInLS() {
  // let farm: Farm | null = null;
  // let setFarm: any;

  // if (typeof window != undefined) {
  //   [farm, setFarm] = useLocalStorage<Farm | null>("livestockly-farm", null);
  // }
  const [farm, setFarm] = useLocalStorage<Farm | null>(
    "livestockly-farm",
    null
  );

  return {
    farm,
    setFarm,
  };
}

export default useSetFarmIdInLS;
